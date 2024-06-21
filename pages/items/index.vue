<template>
    <div class="item-list-page item-index-page">
        <div class="category-tab-all">
            <!-- deps1에 클래스 on으로 토글 -->
            <div class="deps1">홈</div>
            <div
                class="deps1"
                :class="{ on: isDeps1 }"
                @click="toggleInfoPanel('isDeps1')"
            >
                1차 카테고리<i></i>
                <div class="select-wrap">
                    <ul class="select-option">
                        <li>1차 카테고리</li>
                        <li>1차 카테고리</li>
                        <li>1차 카테고리</li>
                    </ul>
                </div>
            </div>
            <div
                class="deps1"
                :class="{ on: isDeps2 }"
                @click="toggleInfoPanel('isDeps2')"
            >
                2차 카테고리<i></i>
                <div class="select-wrap">
                    <ul class="select-option">
                        <li>2차 카테고리</li>
                        <li>2차 카테고리</li>
                        <li>2차 카테고리</li>
                    </ul>
                </div>
            </div>
            <div
                class="deps1"
                :class="{ on: isDeps3 }"
                @click="toggleInfoPanel('isDeps3')"
            >
                3차 카테고리<i></i>
                <div class="select-wrap">
                    <ul class="select-option">
                        <li>3차 카테고리</li>
                        <li>3차 카테고리</li>
                        <li>3차 카테고리</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- category-tabs-current에 클래스 on으로 토글 -->
        <div
            class="category-tabs-current"
            @click="isVisible = !isVisible"
            :class="{ on: isVisible }"
        >
            <h2>1차 카테고리<i></i></h2>
            <div class="select-wrap" v-show="isVisible">
                <div class="triangle"></div>
                <ul class="select-option">
                    <li>1차 카테고리</li>
                    <li>1차 카테고리</li>
                    <li>1차 카테고리</li>
                </ul>
            </div>
        </div>

        <!-- pc용 카테고리 -->
        <!-- <Swiper class="category-tabs-next-swiper swiper-visible pc" :modules="modules" :slidesPerView="'auto'"
            :spaceBetween="30" :navigation="{
                prevEl: '.swiper-prev',
                nextEl: '.swiper-next',
            }" @slideChange="onSlide" ref="categorySwiper">
            <SwiperSlide>2차 카테고리1</SwiperSlide>
            <SwiperSlide>2차 카테고리2</SwiperSlide>
            <SwiperSlide>2차 카테고리3</SwiperSlide>
            <SwiperSlide>2차 카테고리4</SwiperSlide>
            <SwiperSlide>2차 카테고리5</SwiperSlide>
            <div class="swiper-controls">
                <div class="swiper-prev">이전</div>
                <div class="swiper-next">다음</div>
            </div>
        </Swiper> -->

        <div class="swiper category-tabs-next-swiper swiper-visible pc">
            <div class="swiper-wrapper">
                <div class="swiper-slide">2차 카테고리1</div>
                <div class="swiper-slide">2차 카테고리2</div>
                <div class="swiper-slide">2차 카테고리3</div>
                <div class="swiper-slide">2차 카테고리4</div>
                <div class="swiper-slide">2차 카테고리5</div>
                <div class="swiper-slide">2차 카테고리1</div>
                <div class="swiper-slide">2차 카테고리2</div>
                <div class="swiper-slide">2차 카테고리3</div>
                <div class="swiper-slide">2차 카테고리4</div>
                <div class="swiper-slide">2차 카테고리5</div>
                <div class="swiper-slide">2차 카테고리1</div>
                <div class="swiper-slide">2차 카테고리2</div>
                <div class="swiper-slide">2차 카테고리3</div>
                <div class="swiper-slide">2차 카테고리4</div>
                <div class="swiper-slide">2차 카테고리5</div>
                <div class="swiper-slide">2차 카테고리1</div>
                <div class="swiper-slide">2차 카테고리2</div>
                <div class="swiper-slide">2차 카테고리3</div>
                <div class="swiper-slide">2차 카테고리4</div>
                <div class="swiper-slide">2차 카테고리5</div>
            </div>
            <div class="swiper-controls">
                <div class="swiper-prev">이전</div>
                <div class="swiper-next">다음</div>
            </div>
        </div>

        <!-- mobile용 카테고리 -->
        <ul class="category-tabs-next mobile" :class="{ active: isActive }">
            <li>2차 카테고리</li>
            <li>2차 카테고리</li>
            <li>2차 카테고리</li>
            <li>2차 카테고리</li>
            <li>2차 카테고리</li>
            <li>2차 카테고리</li>
            <li>2차 카테고리</li>
            <li>2차 카테고리</li>
            <li>2차 카테고리</li>
            <li>2차 카테고리</li>
            <li>2차 카테고리</li>
        </ul>
        <div class="btn-more-category mobile" @click="toggleActive">
            <i></i>
        </div>

        <div class="filter-wrap">
            <p>총 <b>123</b>개 상품</p>
            <div class="select-wrap">
                <select class="input-select">
                    <option value="">인기순</option>
                    <option value="">추천순</option>
                    <option value="">최신순</option>
                    <option value="">높은가격순</option>
                    <option value="">낮은가격순</option>
                    <option value="">옵션</option>
                </select>
            </div>
        </div>
        <!-- 아이템리스트 -->
        <itemList />
        <!-- 페이징 -->
    </div>
</template>

<script>
import { ref } from "vue";
import Swiper from "swiper";
import SwiperCore, {
    Navigation,
    Pagination,
    Autoplay,
    Scrollbar,
} from "swiper/core";
SwiperCore.use([Navigation, Pagination, Autoplay, Scrollbar]);
import "swiper/swiper-bundle.css";

export default {
    data() {
        return {
            isDeps1: false,
            isDeps2: false,
            isDeps3: false,
            isVisible: ref(false),
            modules: [Navigation],
            categoryTabsNextSwiper: null,
            isActive: ref(false),

            itemInfo: [
                // {
                //     rank: false,
                //     thumbnailArea:
                //     {
                //         floatingClass: "top_left",
                //         floatingImage: require("~/static/img/sample/mc_sample_img.png"),
                //         itemThumbnail: require("~/static/img/sample/sample_thumbnail_img.png"),
                //         date: "3/14"
                //     },
                //     descArea:
                //     {
                //         brand: "스트로베리 쇼콜라 갸또",
                //         title: "묵직한 초콜릿 풍미의 갸또 시트에 밀크 가나슈 생크림과 연유 생크림, 새콤달콤 딸기가 조화를 이룬 케이크",
                //         sale: "999,999",
                //         price: "888,888",
                //         discounted: "99",
                //         roasting: "2022.12.31",
                //         storage: "ICE",
                //         // (DIRECT_DELEVERY:직배송, SELLER_DELEVERY:업체배송)
                //         delevery: "DIRECT_DELEVERY",
                //         newFlag: true,
                //         recommend: true,
                //         coupon: true,
                //         freeDelivery: true,
                //         best: true,
                //         onlycnt: true,
                //         deal: true,
                //         limited: true,
                //     },
                // },
            ],
        };
    },

    mounted() {
        const categoryTabsNextSwiperOption = {
            slidesPerView: "auto",
            slidesPerGroup: "1",
            loopedSlides: "2",
            loop: "true",
            navigation: {
                enabled: true,
                nextEl: ".category-tabs-next-swiper .swiper-next",
                prevEl: ".category-tabs-next-swiper .swiper-prev",
            },
            ///watchSlidesProgress: 'true',
        };

        this.categoryTabsNextSwiper = new Swiper(
            ".category-tabs-next-swiper",
            categoryTabsNextSwiperOption
        );
    },

    methods: {
        toggleActive() {
            this.isActive.value = !this.isActive.value;
        },
        toggleInfoPanel(panelName) {
            this[panelName] = !this[panelName];
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/guide.scss";
@import "~/assets/scss/pages/items/item_list.scss";
</style>
