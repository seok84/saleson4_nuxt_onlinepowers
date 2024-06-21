<template>
    <div class="select-coupon">
        <div class="select-wrap">
            <template v-if="buyItem.itemCoupons != undefined">
                <select class="input-select op-item-coupon" :id="getId('coupon', buyItem.itemSequence)"
                        @change="couponSelect(buyItem.itemSequence, buyItem.itemId)">
                    <option value="clear">쿠폰을 선택해주세요.</option>
                    <option v-for="coupon in buyItem.itemCoupons" :value="coupon.couponUserId">
                        {{coupon.couponUserId}}. {{coupon.couponName}} - {{(formatNumber(coupon.discountAmount))}}원 할인

                        <template v-if="coupon.couponConcurrently == '1'">
                            [1개 수량만 적용]
                        </template>
                        <template v-else>
                            [구매 수량 할인]
                        </template>
                    </option>
                </select>
            </template>
            <template v-else >
                <p>사용가능한 쿠폰이 없습니다.</p>
            </template>
        </div>
    </div>
</template>

<script>

let $s, vm;

export default {
    data() {
        return {
            itemDetail: {},
            freeGiftItemList: []
        }
    },
    props: {
        buyItem: {
            type: Object,
            default: () => {
                return {}
            }
        },
        shippingIndex: {
            type: Number,
            default: 0
        }
    },
    computed: {},
    watch:{
        buyItem: {
            deep: true,
            handler(value) {
                this.buyItem = value;
                this.itemDetail = this.buyItem.itemDetailResponse;
                this.freeGiftItemList = this.buyItem.freeGiftItemList;
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
        redirectByItem(itemUserCode) {
            this.$saleson.redirect(`/item/${itemUserCode}`);
        },
        getId: function (title, sequence) {
            return title + "-" + sequence;
        },
        couponSelect(itemSequence, itemId) {
            this.$emit('couponSelect', itemSequence, itemId);
        }
    }
}
</script>
