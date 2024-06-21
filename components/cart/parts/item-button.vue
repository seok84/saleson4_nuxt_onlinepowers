<template>
    <div class="product-info info3">
        <div class="quantity-wrap">
            <div class="quantity-box">
                <button type="button" class="btn-quantity btn-minus" @click="decreaseQuantity(buyItem, 'decrease')"></button>
                <input type="number" title="수량" readonly :value="itemPrice.quantity" maxlength="999"
                       class="quantity number">
                <button type="button" class="btn-quantity btn-plus" @click="increaseQuantity(buyItem, 'increase')"></button>
            </div>

            <button class="btn btn-change" type="button" @click="changeQuantity(buyItem)">변경</button>
        </div>
        <button v-if="disabled == false" class="btn btn-primary-line btn-buynow" type="button" @click="buyOrder(buyItem)">바로구매</button>
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
        disabled: {
            type: Boolean,
            default: () => {
                return false;
            }

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
    computed: {
        selectedItem: {
            get() {
                return this.selectedItems;
            },
            set(value) {
                this.$emit("update:selectedItems", value)
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
        /**
         * 수량 감소 처리 (-)
         * @param buyItem
         */
        decreaseQuantity(buyItem) {
            const quantity = buyItem.itemPrice.quantity - 1;
            this.buyItem.itemPrice.quantity = quantity;

            this.$emit("decreaseQuantity", this.buyItem);
        },

        /**
         * 수량 추가 처리 (+)
         * @param buyItem
         */
        increaseQuantity(buyItem) {
            const quantity = buyItem.itemPrice.quantity;
            this.buyItem.itemPrice.quantity = quantity + 1;

            this.$emit("increaseQuantity", this.buyItem);
        },
        changeQuantity(buyItem) {
            this.$emit("changeQuantity", buyItem);
        },

        /**
         * 바로구매
         * @param buyItem
         */
        buyOrder(buyItem) {
            this.$emit("buyOrder", buyItem.cartId);
        }
    }
}
</script>
