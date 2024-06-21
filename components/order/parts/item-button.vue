<template>
    <div class="product-info info3">
        <template v-if="itemCoupons.length > 1">
            <p class="op-used-coupon" :class="`itemCouponUsedArea-${buyItem.itemSequence} coupon-apply`"></p>
            <button class="btn btn-round btn-coupon" type="button" @click="availableCouponsCheck(buyItem)">상품 쿠폰 적용</button>
        </template>
        <template v-else>
            <p class="coupon-none">적용 쿠폰 없음</p>
        </template>
    </div>
</template>

<script>

let $s, vm;

export default {
    data() {
        return {
            itemCoupons: []
        };
    },
    props: {
        buyItem: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },
    watch:{
        buyItem: {
            deep: true,
            handler(value) {
                this.buyItem = value;
                this.itemCoupons = this.buyItem.itemCoupons;
            }
        },
        itemPrice: {
            deep: true,
            handler(value) {
                this.itemPrice = value;
            }
        }
    },
    beforeCreate: function () {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    mounted() {
    },
    methods: {
        availableCouponsCheck(buyItem){
            this.$emit('availableCouponsCheck', buyItem);
        }
    }
}
</script>
