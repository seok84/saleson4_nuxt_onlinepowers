<template>
    <div>
        <div class="product-price">
            <div class="price-info info1 op-shipping-text-" :class="shipping.shippingSequence">
                <p>
                    <span>
                        상품금액 {{formatNumber(totalItemPrice?.groupTotalItemSalePrice)}}원
                    </span>
                    +
                    <span>배송비 {{formatNumber(totalItemPrice.groupTotalShippingPrice)}}원</span>
                    <span><b>= {{formatNumber(totalItemPrice.groupTotalPrice)}}원</b></span>
                </p>
                <p v-if="itemShipping.shippingType != 1 && itemShipping.realShipping != 0 && itemShipping.shippingFreeAmount > 0">
                    (<b>{{formatNumber(itemShipping.shippingFreeAmount)}}원 이상</b> 무료배송)
                </p>
            </div>
            <div class="price-info info2">
                <p>{{itemShipping.shippingTypeLabel}}
                    <b v-if="deliveryCompanyName != ''">({{deliveryCompanyName }})</b>
                </p>
                <span v-if="itemShipping.shippingTypeMessage != ''">
                <i class="tooltip-handler" @click="toggleTooltip">!</i>
                <div :class="{ 'tooltip-wrap': true, active: isTooltipActive }">
                    <div class="dimmed-bg" @click="closeTooltip"></div>
                    <div class="text-center tooltip-content tooltip-delivery">
                        <button class="btn-tooltip-close" @click="closeTooltip">닫기</button>
                        <p class="tooltip-tit">{{itemShipping.shippingTypeLabel}}</p>
                        <p class="txt2" v-html="itemShipping.shippingTypeMessage"></p>
                    </div>
                </div>
            </span>
            </div>
        </div>
    </div>
</template>
<script>


let $s, vm;

export default {
    data() {
        return {
            itemDetail: {},
            deliveryCompanyName: '',
            itemPrice: {},
            shipping: {}
        };
    },
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            }
        },
        totalItemPrice: {
            type: Object,
            default: () => {
                return {}
            }
        },
        isTooltipActive: {
            type: Boolean,
            default: function () {
                return false;
            }
        },
        itemShipping: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    watch: {
        isTooltipActive() {
            vm.isTooltipActive = this.isTooltipActive;
        },
        shipping(newVal, oldVal) {
            vm.shipping = newVal;
        },
        item:{
            deep: true,
                handler(val){
                this.item = val;
            }
        },
        totalItemPrice:{
            deep: true,
            handler(val){
                this.totalItemPrice = val;
            }
        }
    },
    beforeCreate: function() {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson,
        vm = this;
    },
    created() {
        this.getCompanyName();
    },
    beforeMount() {
    },
    mounted() {},
    methods: {
        toggleTooltip() {
            this.$emit('toggleTooltip', this.isTooltipActive);
        },
        closeTooltip() {
            this.$emit('closeTooltip', this.isTooltipActive);
        },
        getCompanyName() {
            vm.itemDetail = vm.item.itemDetailResponse;

            if (vm.itemDetail.deliveryType == '1') {
                vm.deliveryCompanyName = '본사';
            } else {
                vm.deliveryCompanyName = vm.itemDetail.deliveryCompanyName;
            }
        }
    }
}
</script>
