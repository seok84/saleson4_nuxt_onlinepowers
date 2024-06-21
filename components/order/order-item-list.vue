<template>
    <div class="product-info-group">
        <itemInfo
            :buy-item="buyItem"
            :disabled="disabled"
            @freeGiftItemPopupOpen="freeGiftItemPopupOpen"
        />

        <OrderItemPrice
            :item-price="itemPrice"
            :buy-item="buyItem"
        />

        <itemButton
            :item-price="itemPrice"
            :buy-item="buyItem"
            @availableCouponsCheck="availableCouponsCheck"
        />
    </div>
</template>

<script>


import itemInfo from "@/components/order/parts/item-info.vue";
import OrderItemPrice from "@/components/order/parts/order-item-price.vue";
import itemButton from "@/components/order/parts/item-button.vue";

let $s, vm;



export default {
    components: {itemButton, OrderItemPrice, itemInfo},
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
                this.itemPrice = this.buyItem.itemPrice;
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
    mounted() {
        this.$nextTick(() => {
            console.log(this.buyItem);
        });
    },
    methods: {
        redirectByItem(itemUserCode) {
            this.$saleson.redirect(`/item/${itemUserCode}`);
        },

        freeGiftItemPopupOpen(id) {
            this.$emit('freeGiftItemPopupOpen', id);
        },

        availableCouponsCheck(buyItem){
            this.$emit('availableCouponsCheck', buyItem);
        }
    }
}
</script>
