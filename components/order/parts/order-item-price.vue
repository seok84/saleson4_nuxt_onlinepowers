<template>
    <div class="product-info info2" :class="`item-price-info-${buyItem.itemSequence}-${shippingIndex}-order`">
        <div class="info2-list">
            <p>상품가 {{formatNumber(calcItemSaleAmount())}}원</p>
            <p>할인 <span class="expected-discount-amount-order">{{formatNumber(itemPrice.discountAmount)}}</span>원</p>
            <p class="discounted">할인적용가 <span class="op-expected-item-sale-amount" :class="`${buyItem.itemSequence}-${shippingIndex}`">{{formatNumber(itemPrice.saleAmount)}}</span>원</p>
        </div>
        <p class="quantity">수량:{{itemPrice.quantity}}개</p>
    </div>
</template>

<script>

let $s, vm;

export default {
    data() {
        return {
        };
    },
    props: {
        itemPrice: {
            type: Object,
            default: () => {
                return {}
            }
        },
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
        }
    },
    watch:{
        buyItem: {
            deep: true,
            handler(value) {
                this.buyItem = value;
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
    mounted() {},
    methods: {
        calcItemSaleAmount() {
            let optionPrice = this.itemPrice.optionPrice;
            let quantity = this.itemPrice.quantity
            let itemSaleAmount = this.itemPrice.itemSalePrice * quantity;

            return (itemSaleAmount + optionPrice);
        },
        calcItemSaleDiscount() {
            let quantity = this.itemPrice.quantity
            let itemSaleAmount = this.itemPrice.itemSalePrice * quantity;
            let optionPrice = this.itemPrice.optionPrice;
            let discountAmount = this.itemPrice.discountAmount;

            return (itemSaleAmount + optionPrice) - discountAmount;
        }
    }
}
</script>
