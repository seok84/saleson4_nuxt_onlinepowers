<template>
    <section class="mypage-main">
        <div class="title-container">
            <h2 class="title-h2">최근 주문 내역</h2>
            <a href="/mypage/order" class="link">전체보기<i class="arrow"></i></a>
        </div>
        <!-- // 최근 주문 내역 -->
        <div class="order-item-wrapper">
            <div class="order-item">
                <div class="info">
                    <span class="date">{{dateFormat(content.orderList[0].createdDate)}}</span>
                    <a :href="'/mypage/order/' + content.orderList[0].orderSequence + '/' + content.orderList[0].orderCode" class="detail">
                        <span>{{content.orderList[0].orderCode}}</span>
                        주문상세
                        <i class="arrow"></i>
                    </a>
                </div>
                <div class="order-status">
                    <template v-for="(data, index) in content.orderList" v-if="index == 0">
                        <OrderItem :item="data.items[0]" :btn-flag="false" />
                    </template>
                </div>
            </div>
        </div>
        <div class="title-container">
            <h2 class="title-h2">관심상품</h2>
            <a href="/mypage/wishlist" class="link">전체보기<i class="arrow"></i></a>
        </div>
        <!-- // 관심상품 -->
        <div class="liked-item-list">
            <div class="item-list-container vertical">

                <div class="item-list item-list-3" v-for="(data, index) in content.wishlists" v-if="index < 2">
                    <!-- 아이템 썸네일 영역 -->
                    <item-part-thumbnail :item="data.item" />

                    <!-- 아이템 정보 영역 -->
                    <div class="info-container">
                        <div class="title-main paragraph-ellipsis">
                            <template v-if="data.item.brand != ''">
                                [{{data.item.brand}}]
                            </template>
                             {{data.item.itemName}}
                        </div>
                        <div class="title-sub paragraph-ellipsis">

                        </div>
                        <div class="discounted" v-if="data.item.discountRate > 0">
                            {{data.item.salePrice}}원
                        </div>
                        <div class="price-wrap">
                            <p class="price">
                                <span>{{data.item.presentPrice}}</span>
                                <span>원</span>
                            </p>
                            <p class="sale" v-if="data.item.discountRate > 0">
                                {{ data.item.discountRate }}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>
<script>

import OrderItem from "@/components/order/order-item.vue";
import ItemPartThumbnail from "@/components/item/part/thumbnail.vue";

export default {
    layout: 'mypage',
    name: 'mypage-index',
    title: '마이페이지',
    head(){
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'마이페이지'}
            ]
        }
    },
    middleware: 'auth',
    components: {ItemPartThumbnail, OrderItem},
    async asyncData({ $salesonApi, store }) {
        try {

            const user = store.$auth.user;

            /*const seo = await $salesonApi().$seo();*/

            const {data} = await $salesonApi().mypage.getMypage();
            debugger
            return {
                content : data
            };

            // seo: seo

        } catch (error) {
            console.log("[index.vue] asyncData error: ", error);
            return {}
        }
    },
    data(){
        return{
            content : {
                orderList : [
                    {
                        orderCode : "",
                        orderSequence : 0,
                        orderStatus : null,
                        createdDate : "",
                        items : []
                    }
                ],
                wishlists : []
            },
            checkPhotoList: true,
            //모달
            reviewModalShow: false,
            buyConfirmModalShow: false,
            cancelModalShow: false,
            exchangeModalShow: false,
            returnModalShow: false,
            itemModalShow: false,
            deliveryOption: 'return', // 기본값 설정
            pageTitle: '',
        }
    },
    methods: {
        hideModal(e) {
            e.target.closest('.modal').classList.remove('show');
        }
    },
}
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_order.scss";
</style>