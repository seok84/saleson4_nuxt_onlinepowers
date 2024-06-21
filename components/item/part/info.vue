<template>
    <!-- 아이템 정보 영역 -->
    <nuxt-link :to="'/item/'+item.itemUserCode" tag="div" class="info-container">
        <div class="title-main paragraph-ellipsis">
            {{ item.displayItemName }}
        </div>
        <div class="title-sub paragraph-ellipsis">
            {{ item.itemSummary }}
        </div>
        <div class="discounted" v-if="item.discountRate > 0">
            {{ formatNumber(item.salePrice) }}원
        </div>
        <div class="price-wrap">
            <p class="price">
                <span>{{ formatNumber(item.presentPrice) }}</span>
                <span>원</span>
            </p>
            <p class="sale" v-if="item.discountRate > 0">
                {{ item.discountRate }}%
            </p>
        </div>
        <div class="tag-wrap" v-if="item.labels.length > 0">
            <div v-for="(label, labelIndex) in item.labels"
                 class="tag" :style="'background-color:'+ label.color">{{ label.label }}
            </div>
        </div>
    </nuxt-link>
</template>
<script>

let $s;
export default {
    props: {
        item: {
            type: Object,
            default: () => {
                return {
                    itemId: 0,
                    itemName: "",
                    itemSummary: "",
                    itemImage: "",
                    itemUserCode: "",
                    discountRate: 0,
                    presentPrice: 0,
                    salePrice: 0,
                    brand: "",
                    itemSoldOutFlag: "N",
                    wishlistFlag: false,
                    labels: [],
                    nonmemberOrderType: "1"
                }
            }
        }
    },
    computed: {

    },
    methods: {},

}
</script>