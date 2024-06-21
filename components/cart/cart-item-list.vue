<template>
    <div class="product-info-group">
        <itemInfo
            :buy-item="buyItem"
            :disabled="disabled"
            :selected-items.sync="selectedItems"
            @update:selectedItems="changeSelectedItems"
            @freeGiftItemPopupOpen="freeGiftItemPopupOpen"
        />
        <ItemPrice
            :item-price="itemPrice"
            :buy-item="buyItem"
        />
        <itemButton
            :item-price="itemPrice"
            :buy-item="buyItem"
            :selected-items.sync="selectedItems"
            @buyOrder="buyOrder"
        />

    </div>
</template>

<script>

import itemInfo from "@/components/cart/parts/item-info.vue";
import itemButton from "@/components/cart/parts/item-button.vue";
import ItemPrice from "@/components/cart/parts/item-price.vue";

let $s, vm;

export default {
    components: {ItemPrice, itemButton, itemInfo},
    data() {
        return {
            itemDetail: {},
            freeGiftItemList: [],
            itemPrice: {}
        }
    },
    props: {
        buyItem: {
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
        disabled: {
            type: Boolean,
            default: () => {
                return false;
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

    mounted() {},
    methods: {
        redirectByItem(itemUserCode) {
            this.$saleson.redirect(`/item/${itemUserCode}`);
        },
        freeGiftItemPopupOpen(cartId) {
            vm.$emit('freeGiftItemPopupOpen', cartId);
        },
        changeSelectedItems(value) {
            this.selectedItem = value;
        },
        buyOrder(value) {
            this.$emit("buyOrder", value);
        }
    }
}
</script>
