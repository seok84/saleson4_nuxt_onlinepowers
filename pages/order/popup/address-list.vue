<template>
    <!-- 배송지 목록 -->
    <div class="modal modal-address-list" :class="show ? 'show' : ''">
        <div class="dimmed-bg" @click="hideModal($event)"></div>
        <div class="modal-wrap">
            <button class="modal-close" @click="hideModal($event)">닫기</button>
            <div class="modal-header">
                배송지 목록
            </div>
            <div class="modal-body">
                <ul class="address-container" v-if="shippingContent.content.length > 0">
                    <li class="address-list" v-for="shipping in shippingContent.content">
                        <div class="radio-wrap">
                            <label class="input-radio"><input type="radio" name="userAddress" :checked="shipping.defaultFlag == 'Y' ? 'checked' : ''" @change="shipping.checked = true"><i></i></label>
                        </div>
                        <div class="address-content">
                            <div class="title"><strong>{{shipping.title}}</strong><span class="default" v-if="shipping.defaultFlag == true">기본배송지</span></div>
                            <p>[{{shipping.zipcode}}] {{shipping.address}} {{shipping.addressDetail}}</p>
                            <p>{{shipping.phone}}</p>
                        </div>
                    </li>
                </ul>
                <div v-else>
                    등록된 배송지가 없습니다.
                </div>
                <div class="btn-wrap gap">
                    <button class="btn btn-primary" type="button" @click="setDefaultAddress(shippingContent.content)">적용</button>
                    <button class="btn btn-default" @click="hideModal">취소</button>
                </div>
                <button class="btn btn-default btn-add-address" @click="showModalAddAddress">배송지 추가</button>
                <ui-pagination :current-page="shippingContent.pagination.currentPage" :total-pages="shippingContent.pagination.totalPages" @change="paging"/>
            </div>
        </div>
    </div>
</template>
<script>

let $s, vm;

export default {
    watchQuery:true,
    data() {
        return {
            shippingContent: {
                content: [],
                pagination: {}
            },
            param: {
                orderBy: '',
                sort: '',
                page: 1,
                size: 5
            },
        };
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        buy: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    watch: {
        show: {
            deep: true,
            handler(newValue) {
                return newValue;
            }
        },
        buy: {
            deep: true,
            handler(newValue) {
                return newValue;
            },
        }
    },
    beforeCreate: function() {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    mounted() {
        this.$nextTick(async () => {
            try {
                let {data} = await this.$salesonApi().shipping.getShippingsByUser(this.param);

                this.shippingContent = data;
            } catch (error) {
                console.log(error);
            }
        })
    },
    methods: {
        hideModal($event) {
            this.$emit('close');
        },
        showModalAddAddress() {
            this.$emit('showModalAddAddress');
        },
        paging(page) {
            this.param.page = page
            this.$salesonApi().shipping.getShippingsByUser(this.param)
            .then(function(response){
                if (response.status === 200) {
                    vm.shippingContent = response.data;
                }
            })
            .catch(function(error){
                console.error("Error paging:", error);
            });
        },

        setDefaultAddress() {
            let addressSet = false;

            this.shippingContent.content.forEach((shipping) => {
                if (shipping.checked != undefined && shipping.checked == true) {
                    this.buy.receivers[0].receiveName = shipping.userName;
                    this.buy.receivers[0].receiveZipcode = shipping.zipcode;
                    this.buy.receivers[0].receiveMobile = shipping.mobile;
                    this.buy.receivers[0].receiveAddress = shipping.address;
                    this.buy.receivers[0].receiveAddressDetail = shipping.addressDetail;

                    addressSet = true;
                }
            })

            if (addressSet) {
                this.hideModal();
            }
        }
    }
}
</script>
