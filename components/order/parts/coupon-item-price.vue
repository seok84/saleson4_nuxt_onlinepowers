<template>
    <div class="product-info info2" :class="`item-price-info-${buyItem.itemSequence}-${shippingIndex}`">
        <div class="info2-list">
            <p>상품가 {{formatNumber(calcItemSaleAmount())}}원</p>
            <p>할인 {{formatNumber(appliedDiscount)}}원</p>
            <p class="discounted">할인적용가 {{formatNumber(appliedSaleAmount)}}원</p>
        </div>
        <p class="quantity">수량:{{itemPrice.quantity}}개</p>
    </div>
</template>

<script>

import buyItemList from "@/components/order/buy-item-list.vue";

let $s, vm;

export default {
    data() {
        return {
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
        shippingIndex: {
            type: Number,
            default: 0
        },
        scope: {
            type: String,
            default: ''
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
        }

    },
    computed: {
        appliedDiscount() {
            return vm.discountAmount[this.buyItem.itemSequence] || 0;
        },
        appliedSaleAmount() {
            return vm.saleAmount[this.buyItem.itemSequence] || 0;
        }
    },
    watch:{
        buyItem: {
            deep: true,
            handler(value) {
                this.buyItem = value;
                this.updateItemPrice();
            }
        },
        discountAmount: {
            deep: true,
            handler(newVal) {
                this.discountAmount = newVal;
            }
        },
        saleAmount: {
            deep: true,
            handler(newVal) {
                this.saleAmount = newVal;
            }
        }
    },
    beforeCreate: function () {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    created() {
    },
    mounted() {
        this.$nextTick(() => {});
    },
    methods: {
        calcItemSaleAmount() {
            let optionPrice = this.itemPrice.optionPrice;
            let quantity = this.itemPrice.quantity
            let itemSaleAmount = this.itemPrice.itemSalePrice * quantity;

            return (itemSaleAmount + optionPrice);
        },
        updateItemPrice() {
            this.itemPrice = this.buyItem.itemPrice;

            if (this.discountAmount[this.buyItem.itemSequence] === undefined) {
                this.discountAmount[this.buyItem.itemSequence] = this.itemPrice.discountAmount;
            }

            if (this.saleAmount[this.buyItem.itemSequence] === undefined) {
                this.saleAmount[this.buyItem.itemSequence] = this.itemPrice.saleAmount;
            }

        },
        handleItemsUpdate(discount, saleamount) {
            console.log('rhkd');
        }
    }
}
</script>
