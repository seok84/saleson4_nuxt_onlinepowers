<template>
    <div class="product-info info2" :class="`-${buyItem.itemSequence}-${shippingIndex}`"
         :item-sale-amount="itemPrice.itemSaleAmount"
         :item-quantity="itemPrice.quantity"
         :item-sale-price="itemPrice.itemSalePrice"
         :item-discount-amount="itemPrice.discountAmount"
    >
        <div class="product-info2-price">
            <p>상품가 {{formatNumber(calcItemSaleAmount())}}원</p>
            <p>할인 {{formatNumber(itemPrice.discountAmount)}}원</p>
        </div>
        <p class="discounted">할인적용가 {{formatNumber(calcItemSaleDiscount())}}원</p>
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
