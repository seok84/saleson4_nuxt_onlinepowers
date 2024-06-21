<template>
    <section class="mypage-recent">
        <div class="title-container">
            <h2 class="title-h2">최근 본 상품</h2>
        </div>
        <!-- // 상품 영역 -->
        <div class="all-items">
            <span>총 <strong>{{formatNumber(latelyItemList.length)}}</strong>개</span>
        </div>
        <div class="item-list-container vertical">
            <div class="item-list item-list-3" v-for="(data, index) in latelyItemList" :key="data.itemId">
                <!-- 아이템 썸네일 영역 -->
                <item-part-thumbnail :item="data"/>
                <!-- 아이템 정보 영역 -->
                <div class="info-container">
                    <div class="title-main paragraph-ellipsis">
                         <span v-if="data.brand !== ''">
                            [{{data.brand}}]
                        </span>
                        {{data.itemName}}
                    </div>
                    <div class="title-sub paragraph-ellipsis">
                        {{ data.itemSummary }}
                    </div>
                    <div class="discounted" v-if="data.discountRate > 0">
                        {{ formatNumber(data.salePrice) }}원
                    </div>
                    <div class="price-wrap">
                        <p class="price">
                            <span>{{ formatNumber(data.presentPrice) }}</span>
                            <span>원</span>
                        </p>
                        <p class="sale" v-if="data.discountRate > 0">
                            {{ data.discountRate }}%
                        </p>
                    </div>
<!--                    <div class="tag-wrap" v-if="data.labels.length > 0">
                        <div v-for="(label, labelIndex) in data.labels"
                             class="tag" :style="'background-color:'+ label.color">{{ label.label }}
                        </div>
                    </div>-->
                </div>
            </div>

        </div>

    </section>
</template>
<script>

let $s, vm;

export default {
    layout: 'mypage',
    name: 'mypage-recent',

    data() {
        return {
            latelyItemList: [],
            param: {
                arrayRequiredItems: []
            }
        }

    },
    head(){
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'최근 본 상품'}
            ]
        }
    },
    beforeCreate() {
        $s = this.$saleson;
        vm = this;
    },
    mounted: function() {
        this.$nextTick(function () {



            this.latelyItemInfo(this);
            this.getLatelyItems();
        });
    },

    methods : {
        async getLatelyItems() {

            try{
                let param = {
                    ids: this.latelyItems.toString(),
                    limit: 6
                }
                const {data} = await this.$salesonApi().display.getLatelyItems(param);
                vm.latelyItemList = data.list;
            }catch (e) {
                console.log(e)
            }

        },



    }

}
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_main.scss";
</style>