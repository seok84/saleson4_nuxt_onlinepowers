<template>
    <div class="modal modal-product-detail" :class="view == true ? 'show' : ''">
        <div class="dimmed-bg" @click="hideModal($event)"></div>
        <div class="modal-wrap">
            <button class="modal-close" @click="hideModal($event)">닫기</button>
            <div class="modal-header">
                구성상품
            </div>
            <div class="p-2 modal-body">
                <!-- 아이템 리스트 horizon -->
                <div class="item-list-container horizon" v-for="(item, index) in freeGiftItem">
                    <!-- 반복 요소 item-list -->
                    <div class="item-list">
                        <!-- 아이템 썸네일 영역 -->
                        <div class="thumbnail-container sold-out">
                            <div v-if="item.orderQuantity.soldOutFlag == true" class="sold-out-wrap">
                                    <span>
                                        <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                    </span>
                            </div>
                            <div to="/" @click.prevent class="thumbnail-wrap">
                                <img class="thumbnail" :src="item.itemDetailResponse.itemImage" :alt="item.itemName">
                            </div>
                        </div>
                        <!-- 아이템 정보 영역 -->
                        <div class="info-container">
                            <div class="title-main paragraph-ellipsis">
                                <b v-if="item.brand != ''">[{{item.brand}}]</b>
                                {{item.itemName}}
                            </div>
                            <div class="title-sub paragraph-ellipsis" v-html="item.options"></div>
                            <div class="purchase-amount">
                                <p class="price">{{formatNumber(item.itemDetailResponse.salePrice)}}원</p>
                                <p class="amount">수량 {{formatNumber(item.itemPrice.quantity)}}개</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

let $s, vm;

export default {
    data() {
        return {
            buyItem: {},
            itemDetail: {},
            itemPrice: {},
            itemDetailShipping: {},
            isTooltipActive: false,
            disabled: '',
            checkboxArray: []
        };
    },
    props: {
        view: {
            type: Boolean,
            default: false
        },
        freeGiftItem: {
            type: Array,
            default: () => {
                return new Array();
            }
        }
    },
    watch: {
        view() {
            console.log(this.view);
        }
    },
    beforeCreate: function() {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    mounted() {},
    methods: {
        hideModal() {
            this.$emit('close');
        }
    }
}
</script>
