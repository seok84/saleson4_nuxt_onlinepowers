<template>
    <div class="wrapper">
        <p class="delivery-status-wrap"><span class="status deposit-waiting">{{item.orderStatusLabel}}</span></p>
        <div class="item-wrap" >
            <div class="item-list-container horizon">
                <div class="item-list">
                    <!-- 아이템 썸네일 영역 -->
                   <item-part-thumbnail :item="item" :type="'order'"/>

                    <!-- 아이템 정보 영역 -->
                    <div class="info-container">
                        <div class="title-main paragraph-ellipsis">
                            <template v-if="item.brand != ''">
                                <b>[{{item.brand}}]</b>
                            </template>
                            {{item.itemName}}
                        </div>
                        <div class="title-sub paragraph-ellipsis" v-html="unescapeHtml(item.options)"></div>
                        <div class="purchase-amount">
                            <p class="price">{{formatNumber(item.itemAmount)}}원</p>
                            <p class="amount">수량 {{formatNumber(item.quantity)}}개</p>
                        </div>
                    </div>
                </div>
            </div>
            <order-button :order-code="orderCode" :item="item" v-if="btnFlag"
                @orderPopup="orderPopup"
                @deliveryLink="deliveryLink"
            />
        </div>
    </div>
</template>

<script>

import OrderButton from "@/components/order/order-button.vue";
import ItemPartThumbnail from "@/components/item/part/thumbnail.vue";

let $s, vm;

export default {
    components: {OrderButton, ItemPartThumbnail},
    data() {
        return {

        };
    },
    props: {
        orderCode: {
            type: String,
            default: () => {
                return ""
            }
        },
        item: {
            type: Object,
            default: () => {
                return {}
            }
        },
        btnFlag: {
            type: Boolean,
            default: true
        },
    },
    beforeCreate: function() {
        $s = this.$saleson;
        vm = this;
    },
    mounted() {
        this.$nextTick(() => {

        });
    },
    methods: {
        orderPopup(param){
            this.$emit('orderPopup', param);
        },
        deliveryLink(param){
            this.$emit('deliveryLink', param);
        }
    }
}
</script>
