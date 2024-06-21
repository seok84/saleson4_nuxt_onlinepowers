<template>
    <!-- 배송지 추가 -->
    <div class="modal address-modal" :class="show ? 'show' : ''">
        <div class="dimmed-bg" @click="hideModal"></div>
        <div class="modal-wrap">
            <button class="modal-close" type="button" @click="hideModal">닫기</button>
            <div class="modal-header">
                배송지 추가
            </div>
            <div class="modal-body">
                <ValidationObserver ref="observer" v-slot="{ validate }">
                    <form id="newReceiveAddress" @submit.prevent="submit(validate)">
                        <div class="btn-wrap gap ">
                            <div class="btn btn-default btn-middle check-wrap">
                                <label class="circle-input-checkbox purple">
                                    <input type="checkbox" id="defaultFlag" name="defaultFlag" v-model="newAddress.defaultFlag"><i></i>기본 배송지로 설정
                                </label>
                            </div>
                            <div class="btn btn-default btn-middle check-wrap">
                                <label class="circle-input-checkbox purple"><input type="checkbox" @change="getDefaultAddress($event)"><i></i>기본 배송지
                                    가져오기</label>
                            </div>
                        </div>

                        <ValidationProvider tag="div" name="title" rules="required" v-slot="{ errors }" >
                            <div class="form-line">
                                <input type="text" name="title" class="form-basic" v-model="newAddress.title" placeholder="배송지" />
                                <span v-if="errors.length" class="feedback invalid" style="display: block">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>

                        <ValidationProvider tag="div" name="userName" rules="required" v-slot="{ errors }" >
                            <div class="form-line">
                                <input type="text" name="userName" class="form-basic" placeholder="받는사람" v-model="newAddress.userName" />
                                <span v-if="errors.length" class="feedback invalid" style="display: block">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>

                        <ValidationProvider tag="div" name="zipcode" rules="required" v-slot="{ errors }" >
                            <div class="form-line">
                                <div class="flex">
                                    <input type="text" class="form-basic" name="zipcode" v-model="newAddress.zipcode" placeholder="우편번호 찾기" />
                                    <button class="btn btn-black" type="button" @click="openDaumPostcode" >우편번호</button>
                                </div>
                                <span v-if="errors.length" class="feedback invalid" style="display: block">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>

                        <ValidationProvider tag="div" name="address" rules="required" v-slot="{ errors }" >
                            <div class="form-line">
                                <input type="text" class="form-basic" name="address" v-model="newAddress.address"  placeholder="기본주소" />
                                <span v-if="errors.length" class="feedback invalid" style="display: block">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>

                        <ValidationProvider tag="div" name="addressDetail" rules="required" v-slot="{ errors }" >
                            <div class="form-line">
                                <input type="text" name="addressDetail" v-model="newAddress.addressDetail" class="form-basic" placeholder="상세주소" />
                                <span v-if="errors.length" class="feedback invalid" style="display: block">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>

                        <ValidationProvider tag="div" name="mobile" rules="required" v-slot="{ errors }" >
                            <div class="form-line">
                                <input type="text" class="form-basic" name="mobile" v-model="newAddress.mobile" placeholder="휴대폰 또는 전화번호 숫자만 입력" />
                                <span v-if="errors.length" class="feedback invalid" style="display: block">{{ errors[0] }}</span>
                            </div>
                        </ValidationProvider>

                        <div class="btn-wrap">
                            <button type="submit" class="btn btn-primary w-160">저장</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
        <address-layer></address-layer>
    </div>
</template>
<script>

import AddressLayer from "@/components/ui/daum/address-layer.vue";

let $s, vm;

export default {
    components: {AddressLayer},
    data() {
        return {
            newAddress: {
                defaultFlag: false,
                title: '',
                userName: '',
                zipcode: '',
                address: '',
                addressDetail: '',
                mobile: '',
                sido: '',
                sigungu: '',
                eupmyeondong: '',
                newZipcode: ''
            }
        };
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        show: {
            deep: true,
            handler(newValue) {
                console.log(newValue);

                return newValue;
            }
        }
    },
    beforeCreate: function() {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    mounted() {},
    methods: {
        hideModal() {
            this.$emit('close');
        },
        async getDefaultAddress(event){
            if (event.target.checked) {
                await this.$salesonApi().shipping.getDefaultAddress()
                .then((response) => {
                    vm.newAddress.title = response.data.title;
                    vm.newAddress.userName = response.data.userName;
                    vm.newAddress.mobile = response.data.mobile;


                    vm.newAddress.zipcode = response.data.zipcode;
                    vm.newAddress.newZipcode = response.data.newZipcode;
                    vm.newAddress.address = response.data.address;
                    vm.newAddress.addressDetail = response.data.addressDetail;
                    vm.newAddress.sido = response.data.sido;
                    vm.newAddress.sigungu = response.data.sigungu;
                    vm.newAddress.eupmyeondong = response.data.eupmyeondong;
                })
                .catch((error) => { console.log(error);})
            }
        },

        openDaumPostcode() {
            let child = vm.getChild("address-layer");
            if (child != null) {
                child.openDaumAddress((response) => {
                    vm.newAddress.zipcode = response.zipcode;
                    vm.newAddress.newZipcode = response.newZipcode;
                    vm.newAddress.address = response.jibunAddress;
                    vm.newAddress.addressDetail = response.jibunAddressDetail;
                    vm.newAddress.sido = response.sido;
                    vm.newAddress.sigungu = response.sigungu;
                    vm.newAddress.eupmyeondong = response.eupmyeondong;
                });
            }
        },

        submit(validate) {
            this.$saleson.confirm('배송지를 추가하시겠습니까?', async () => {
                const isValid = await validate();

                if (isValid) {
                    this.newAddress.defaultFlag = this.newAddress.defaultFlag ? 'Y' : 'N';

                    await this.$salesonApi().shipping.saveShipping(this.newAddress)
                    .then((response) => {
                        if (response.status == 200) {
                            this.$saleson.alert('등록되었습니다.', () => {
                                this.$saleson.reload();
                            });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        this.$saleson.alert(error);
                    });
                }
            });
        }
    }
}
</script>
