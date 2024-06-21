<template>
    <section class="mypage-address">
        <!-- //본문 -->
        <div class="title-container m-line-divider">
            <h2 class="title-h2">배송주소록 관리</h2>
            <div class="btn-wrap ">
                <button type="button" class="btn btn-default btn-action" @click="showShippingModal('add')">
                    <img src="~/assets/image/ico/ico_plus.svg" class="ico-plus">새 배송지 추가
                </button>
                <button type="button" class="btn btn-black btn-action btn-set-default" @click="setDefaultFlag">기본 배송지로 설정</button>
            </div>
        </div>
        <!-- //주소록 리스트 -->
        <ul class="address-container" v-if="result.content.length > 0">
            <li v-for="(data, index) in result.content" :key="index" class="address-list" :class="{ active: index === selectedAddressIndex }">
                <div class="radio-wrap">
                    <label class="input-radio">
                        <input type="radio" :name="'userAddress' + index" v-model="param.userDeliveryId" :value="data.userDeliveryId">
                        <i></i>
                    </label>
                </div>
                <div class="address-content">
                    <div class="title">
                        <strong>{{data.title}}</strong>
                        <span class="default" v-if="data.defaultFlag == 'Y'">기본배송지</span>
                    </div>
                    <p>[{{data.newZipcode}}] {{data.address}} {{data.addressDetail}}</p>
                    <p>{{data.mobile}}</p>
                </div>
                <div class="btn-wrap">

                    <button type="button" class="btn btn-default btn-middle" @click="showShippingModal('edit', data.userDeliveryId)">수정</button>
                    <button type="button" class="btn btn-default btn-middle" @click="deleteUserDelivery(data.userDeliveryId)">삭제</button>
                </div>
            </li>
        </ul>
        <div class="no-contents" v-else>
            <p class="info">등록된 배송지 정보가 없습니다.</p>
        </div>
        <div class="mobile">
            <div class="btn-wrap">
                <button type="button" class="btn btn-default btn-black2 btn-set-default">기본 배송지로 설정</button>
            </div>
        </div>
        <ui-pagination :current-page="result.pagination.currentPage" :total-pages="result.pagination.totalPages" @change="paging"/>

        <modal-default :class="{ 'show': modal.addAddressModal }" :title="modal.title" @modalClose="modal.addAddressModal=false" class="address-modal">
            <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
                <form @submit.prevent="saveShipping(validate)">
                    <div class="btn-wrap gap m-section-divider">
                        <div class="btn btn-default btn-middle check-wrap">
                            <label class="circle-input-checkbox purple"><input type="checkbox" v-model="defaultChecked"><i></i>기본 배송지로 설정</label>
                        </div>
                        <div class="btn btn-default btn-middle check-wrap">
                            <label class="circle-input-checkbox purple"><input type="checkbox"><i></i>기본 배송지 가져오기</label>
                        </div>
                    </div>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="배송지" v-model="param.title"/>
                        <span v-if="errors.length" class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="받는사람" v-model="param.userName"/>
                        <span v-if="errors.length" class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <div class="flex">
                            <input type="text" class="form-basic" placeholder="우편번호 찾기" readonly v-model="param.newZipcode"/>
                            <button type="button" class="btn btn-black"
                                    @click="openDaumPostcode">우편번호</button>
                        </div>
                        <span v-if="errors.length" class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="기본주소" readonly v-model="param.address"/>
                        <span v-if="errors.length" class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="상세주소" v-model="param.addressDetail"/>
                        <span v-if="errors.length" class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="휴대폰 또는 전화번호 숫자만 입력" v-model="param.mobile"/>
                        <span v-if="errors.length" class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <div class="btn-wrap">
                        <button type="submit" class="btn btn-primary w-160">저장</button>
                    </div>
                </form>
            </ValidationObserver>
        </modal-default>

        <address-layer></address-layer>

    </section>
</template>
<script>
    import ModalDefault from "@/components/modal/default.vue";
    import Pagination from "@/components/ui/pagination.vue";
    import AddressLayer from "@/components/ui/daum/address-layer.vue";

    export default {
        components: {ModalDefault, Pagination, AddressLayer},
        layout: 'mypage',
        name: 'mypage-address',
        head(){
            return {
                script: [
                    { src:'https://spi.maps.daum.net/imap/map_js_init/postcode.v2.js'}
                ],
                meta: [
                        {hid: 'pageTitle', name:'pageTitle', content:'배송주소록 관리'}
                ]
            }
        },
        async asyncData({ $salesonApi }) {
            const self = this;
            try {
                debugger
                const api = $salesonApi().shipping;
                const response = await api.getShipping({
                    page: 1
                });
                return {
                    result: response.data
                }
            } catch (error) {
                console.log("[asyncData] shipping asyncData error: ", error);
                return {}
            }
        },
        data() {
            return {
                result : {
                    content : []
                },
                param : {
                    userDeliveryId: 0,
                    mode: "",
                    title: "",
                    userName: "",
                    zipcode: "",
                    newZipcode: "",
                    address: "",
                    addressDetail: "",
                    addressInfo: "",
                    frontMobile: "",
                    backMobile: "",
                    mobile: "",
                    phone: "",
                    defaultFlag: "N"
                },
                modal : {
                    addAddressModal : false,
                    title : "배송지 추가"
                },
                defaultChecked : false,
                selectedAddressIndex: 0,
                searchAddressModal: false
            }
        },
        watch: {
            defaultChecked(newVal) {
                this.param.defaultFlag = newVal ? 'Y' : 'N';
            }
        },
        methods: {
            showShippingModal(type, userDeliveryId){
                this.modal.addAddressModal = true;
                this.param.mode = type;
                if (type == 'add'){
                    this.modal.title = "배송지 추가";
                } else {
                    this.modal.title = "배송지 수정";
                    this.shippingDetail(userDeliveryId);
                }
            },
            async saveShipping(validate){
                const self = this;
                const isValid = await validate();
                if (!isValid) {
                    this.$saleson.alert("필수 입력 항목을 입력해 주세요.");
                    return;
                }

                let param = this.shippingParamDataConverter();
                this.$salesonApi().shipping.saveShipping(param)
                .then(function(response){
                    if (response.status === 200) {
                        let msg = "배송지가 등록되었습니다.";
                        if (self.param.userDeliveryId > 0){
                            msg = "배송지가 수정되었습니다.";
                        }
                        self.$saleson.alert(msg, function () {
                            location.reload();
                        });
                    }
                })
                .catch(function(error){
                    console.error("Error saveShipping:", error);
                });
            },
            shippingParamDataConverter(){
                let param = {
                    ...this.param,
                    zipcode : this.param.newZipcode,
                    phone : this.param.mobile
                };
                return param;
            },
            deleteUserDelivery(userDeliveryId){
                const self = this;
                this.$saleson.confirm("해당 배송지를 삭제하시겠습니까?", function(){
                    self.$salesonApi().shipping.deleteShipping({userDeliveryId : userDeliveryId})
                    .then(function(response) {
                        if (response.data.status === 200) {
                            self.$saleson.alert("배송지가 삭제되었습니다.", function () {
                                location.reload();
                            });
                        }
                    })
                    .catch(function(error) {
                        console.error("Error deleteShipping:", error);
                    });
                });
            },
            setDefaultFlag(){
                const self = this;

                if (this.param.userDeliveryId === 0) {
                    this.$saleson.alert("배송지를 선택해주세요.");
                    return false;
                }

                this.$salesonApi().shipping.setDefaultShipping(this.param)
                .then(function(response){
                    if (response.status === 200) {
                        self.$saleson.alert("기본배송지가 설정되었습니다.", function () {
                            location.reload();
                        });
                    }
                })
                .catch(function(error){
                    console.error("Error setDefaultShipping:", error);
                });
            },
            shippingDetail(userDeliveryId){
                this.modal.title = "배송지 수정";
                this.modal.addAddressModal = true;
                this.modal.edit = "edit";
                let delivery = this.result.content.filter(d => d.userDeliveryId == userDeliveryId)[0];
                this.param = {
                    ...delivery
                };
            },
            paging(page){
                const self = this;
                this.$salesonApi().shipping.getShipping({page : page})
                .then(function(response){
                    if (response.status === 200) {
                        self.result = response.data;
                    }
                })
                .catch(function(error){
                    console.error("Error setDefaultShipping:", error);
                });
            },
            openDaumPostcode(){
                let child = this.getChild("address-layer");
                if (child != null) {
                    child.openDaumAddress(function(response) {

                        this.param.zipcode = response.newZipcode;
                        this.param.newZipcode = response.newZipcode;
                        this.param.address = response.roadAddress;

                    }.bind(this));
                }
            },
        },
    }
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_address.scss";
</style>