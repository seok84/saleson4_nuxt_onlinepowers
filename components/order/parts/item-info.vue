<template>
    <div class="product-info info1">
        <!-- 아이템 -->
        <div class="product-item">
            <div class="item-list-container horizon">
                <div class="item-list">
                    <!-- 아이템 썸네일 영역 -->
                    <div class="thumbnail-container sold-out">
                        <div v-if="disabled == true" class="sold-out-wrap">
                                    <span>
                                        <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                    </span>
                        </div>
                        <div class="thumbnail-wrap" @click="redirectByItem(buyItem.itemUserCode)">
                            <img class="thumbnail" :src="itemImage(itemDetail.itemImage)" :alt="itemDetail.itemName">
                        </div>
                    </div>

                    <!-- 아이템 정보 영역 -->
                    <div class="info-container">
                        <div class="title-main paragraph-ellipsis">
                            <b v-if="buyItem.brand != ''">[{{buyItem.brand}}]</b>
                            {{buyItem.itemName}}
                        </div>
                        <div class="title-sub paragraph-ellipsis" v-html="buyItem.options"></div>
                        <template v-if="buyItem.setItemFlag == 'Y'">
                            <div class="underline red" @click="freeGiftItemPopupOpen(buyItem)">
                                구성 상품 보기
                            </div>
                        </template>
                    </div>

                </div>
            </div>
            <div class="item-gift" v-if="freeGiftItemList.length > 0">
                <span><i>선물</i>구매 사은품</span>
                <span>{{buyItem.freeGiftItemText}}</span>
            </div>
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
        freeGiftItemPopupOpen(buyItem) {
            vm.$emit('freeGiftItemPopupOpen', buyItem.itemId);
        },
    }
}
</script>
