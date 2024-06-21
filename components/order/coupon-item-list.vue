<template>
    <div class="product-info-group">
        <itemInfo
            :buy-item="buyItem"
            :disabled="disabled"
        />

        <CouponItemPrice
            :buy-item="buyItem"
            :discount-amount="discountAmount"
            :sale-amount="saleAmount"
        />

    </div>
</template>

<script>


import itemInfo from "@/components/order/parts/item-info.vue";
import CouponItemPrice from "@/components/order/parts/coupon-item-price.vue";

let $s, vm;



export default {
    components: {CouponItemPrice, itemInfo},
    data() {
        return {
            itemDetail: {},
            freeGiftItemList: [],
            itemPrice: {}
        };
    },
    props: {
        buyItem: {
            type: Object,
            default: () => {
                return {}
            }
        },
        discountAmount: {
            type: Array,
            default: () => {
                return []
            }
        },
        saleAmount: {
            type: Array,
            default: () => {
                return []
            }
        },
        disabled: {
            type: Boolean,
            default: () => {
                return false;
            }
        }

    },
    beforeCreate: function() {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    mounted() {
        this.$nextTick(() => {
            console.log('now order item info list ');
            console.log(this.buyItem);
        });
    },
    methods: {
    }
}
</script>
