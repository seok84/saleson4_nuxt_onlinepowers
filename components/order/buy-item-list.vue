<template>
    <div>
        <!-- 장바구니 영역 -->
        <template v-if="scope == 'cart-list'">
            <i class="btn-close" @click="deleteCart(buyItem.cartId)"></i>
            <CartItemList
                :buy-item="buyItem"
                :disabled="disabled"
                :selected-items.sync="selectedItems"
                @update:selectedItems="changeSelectedItems"
                @freeGiftItemPopupOpen="freeGiftItemPopupOpen"
                @buyOrder="buyOrder"
            />
        </template>

        <!-- 주문영역 -->
        <template v-else-if="scope == 'order-list'">
            <OrderItemList
                :buy-item.sync="buyItem"
                :disabled="disabled"
                @availableCouponsCheck="availableCouponsCheck"
                @freeGiftItemPopupOpen="freeGiftItemPopupOpen"
            />
        </template>

        <!-- 쿠폰영역 -->
        <template v-else-if="scope == 'coupon-list'">
            <CouponItemList
                :buy-item.sync="buyItem"
                :disabled="disabled"
                :sale-amount="saleAmount"
                :discount-amount="discountAmount"
            />

            <CouponList
                :shippingIndex="shippingIndex"
                :buy-item.sync="buyItem"
                :couponInfo="couponInfo"
                @couponSelect="couponSelect"
            />
        </template>
    </div>
</template>

<script>

import CartItemList from "@/components/cart/cart-item-list.vue";
import OrderItemList from "@/components/order/order-item-list.vue";
import CouponItemList from "@/components/order/coupon-item-list.vue";
import CouponList from "@/components/order/parts/coupon-list.vue";

let $s, vm;

export default {
    components: {CouponItemList, CartItemList, OrderItemList, CouponList},
    data() {
        return {
            buyItem: {},
            itemPrice: {},
            disabled: false,
            orderQuantity: {},
            subCheckboxesByCartId: [],
            subCheckboxesBySellerId: []
        };
    },
    props: {
        scope: {
            type: String,
            default: ""
        },
        item: {
            type: Object,
            default: () => {
                return {}
            }
        },
        selectedItems: {
            type: Array,
            default: () => {
                return []
            }
        },
        shippingIndex: {
            type: Number,
            default: 0
        },
        itemShipping: {
            type: Object,
            default: 0
        },
        couponInfo: {
            type: Array,
            default: () => {
                return []
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
        }
    },
    beforeCreate: function() {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    computed: {
        selectedItem: {
            get() {
                return this.selectedItems;
            },
            set(value) {
                this.$emit("update:selectedItems", value);
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.buyItem = this.item;
            this.orderQuantity = this.buyItem.orderQuantity;
            this.itemPrice = this.buyItem.itemPrice;

            this.disabledCheck();
        });
    },
    methods: {
        redirectByItem(itemUserCode) {
            this.$saleson.redirect(`/item/${itemUserCode}`);
        },
        freeGiftItemPopupOpen(id) {
            vm.$emit('freeGiftItemPopupOpen', id);
        },
        disabledCheck() {
            this.disabled = this.orderQuantity.soldOutFlag == true ? true : false;
        },

        /**
         * 삭제
         * @param buyItem
         */
        deleteCart(cartId) {
            vm.$emit('deleteCart', cartId);
        },

        /**
         * 수량 감소 처리 (-)
         * @param buyItem
         */
        decreaseQuantity(buyItem) {
            this.buyItem = buyItem;
            if (this.isQuantityValid(this.buyItem)) {
                this.$emit("update:item", this.buyItem);
            }
        },

        /**
         * 수량 추가 처리 (+)
         * @param buyItem
         */
        increaseQuantity(buyItem) {
            this.buyItem = buyItem;
            if (this.isQuantityValid(this.buyItem)) {
                this.$emit("update:item", this.buyItem);
            }
        },

        /**
         * 수량 변경 처리 (+)
         * @param buyItem
         */
        changeQuantity(buyItem) {
            if (this.isQuantityValid(buyItem)) {
                this.$emit("changeQuantity", buyItem);
            }
        },


        /**
         * 설정한 상품 수량으로 변경이 가능 한가? (검증 로직)
         * @param buyItem
         */
        isQuantityValid(buyItem) {
            const quantity = this.itemPrice.quantity;
            const orderMinQuantity = this.orderQuantity.minQuantity;
            const orderMaxQuantity = this.orderQuantity.maxQuantity;

            if (orderMinQuantity > 0 && quantity < orderMinQuantity) {
                this.$saleson.alert('최소 구매 수량은 ' + orderMinQuantity + '개 입니다.');
                buyItem.itemPrice.quantity = orderMinQuantity;
                return false;
            }
            if (orderMaxQuantity > 0 && quantity > orderMaxQuantity) {
                this.$saleson.alert('최대 구매 수량은 ' + orderMaxQuantity + '개 입니다.');
                buyItem.itemPrice.quantity = orderMaxQuantity;
                return false;
            }
            return true;
        },

        /**
         * 바로 주문
         * @param id
         */
        buyOrder(id) {
            this.selectedItem = [id];
            this.$emit("buyOrder");
        },

        /**
         * 체크 상품 변경
         * @param cartId
         */
        changeSelectedItems(value) {
            this.selectedItem = value
        },

        /**
         * 상품 쿠폰
         * @param cartId
         */
        availableCouponsCheck(buyItem){
            this.$emit('availableCouponsCheck', buyItem);
        },

        couponSelect(itemSequence, itemId) {
            this.$emit('couponSelect', itemSequence, itemId);
        }
    }
}
</script>
