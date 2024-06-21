<template>
    <div class="gnb-mobile-container">
        <div class="m-category-menu">
            <nuxtLink class="m-category-menu-item" to="/" @click.native="categoryMenu = true">메뉴</nuxtLink>
            <nuxtLink class="m-category-menu-item" to="/mypage/wishlist">즐겨찾기</nuxtLink>
            <nuxtLink class="m-category-menu-item" to="/">홈</nuxtLink>
            <nuxtLink class="m-category-menu-item" to="/mypage">마이페이지</nuxtLink>
            <nuxtLink class="m-category-menu-item" to="/">검색</nuxtLink>
        </div>
        <div class="m-gnb-wrap" :class="{ on: categoryMenu == true }">
            <header>
                <button type="button" class="m-gnb-close" @click="categoryMenu = false">닫기</button>
                <div class="my-menu">
                    <nuxtLink to="/user/login">
                        로그인
                    </nuxtLink>
                    <nuxtLink to="/">
                        로그아웃
                    </nuxtLink>
                    <nuxtLink to="/mypage">
                        마이페이지
                    </nuxtLink>
                </div>
            </header>

            <div class="m-gnb">
                <div class="depth1">
                    <button class="menu-item" v-for="(category1, category1Index) in categories" :key="category1Index"
                        @click="itemActive(category1.categoryId)" :class="{ on: category1.categoryId === selectedCategoryId || selectedCategoryId === 0 && category1Index === 0}">
                        {{  category1.name }}
                    </button>
                </div>

                <div class="depth2">
                    <ul v-for="(category1, category1Index) in categories" :key="category1Index" :class="{ on: category1.categoryId === selectedCategoryId || selectedCategoryId === 0 && category1Index === 0}">
                        <li>
                            <a class="submenu-item" @click="subItemActive(category1.categoryId)"
                                :class="{ on: category1.categoryId === selectedSubCategoryId }" :href="category1.link">
                                전체
                            </a>
                        </li>
                        <li v-for="(category2, category2Index) in category1.childCategories" :key="category2Index">

                            <a class="submenu-item" v-if="category2.childCategories.length <= 0" @click="subItemActive(category2.categoryId)"
                                :class="{ on: category2.categoryId === selectedSubCategoryId }" :href="category2.link">
                                {{ category2.name }}
                            </a>
                            <button class="submenu-item" v-else @click="subItemActive(category2.categoryId)"
                                :class="{ on: category2.categoryId === selectedSubCategoryId }">
                                {{ category2.name }}
                            </button>

                            <div class="depth3" v-if="category2.childCategories.length > 0"
                                :class="{ on: category2.categoryId === selectedSubCategoryId }">
                                <a class="thirdmenu-item" :href="category3.link"
                                    v-for="(category3, category3Index) in category2.childCategories" :key="category3Index">
                                    {{ category3.name }}
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>





            <div class="service-area">
                <h3 class="service-title">서비스</h3>
                <div class="flex">
                    <nuxtLink class="service-link" to="/">NEW</nuxtLink>
                    <nuxtLink class="service-link" to="/">BEST</nuxtLink>
                    <nuxtLink class="service-link" to="/">TIME SAEL</nuxtLink>
                    <nuxtLink class="service-link" to="/">MD PICK</nuxtLink>
                    <nuxtLink class="service-link" to="/">EVENT</nuxtLink>
                    <nuxtLink class="service-link" to="/">REVIEW</nuxtLink>
                </div>
            </div>
            <div class="footer">
                <h3 class="footer-title">고객 서비스 센터</h3>
                <a href="tel: 1599-7751" class="cs-tel">1599-7751</a>
                <ul class="cs-time">
                    <li>상담시간. 평일 오전 8시 30분 ~ 오후 4시 30분 (주말, 공휴일 휴무)</li>
                    <li>점심시간. 오후 12시 ~ 오후 1시</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'gnbMobileLayout',
    data() {
        return {
            categories: [],
            selectedCategoryId: 0,
            selectedSubCategoryId: -1,

            gnbMenu: false,
            categoryMenu: false,
            categoryIndex: 0,
            subMenuIndex: '',
           /* gnbMenus: [
                { 
                    menu: "가구/수납", link: "/guide", // 임시 메뉴
                    subGnbItems: [
                        {submenu: "2차 카테고리1", link: "/"},
                        {submenu: "노트/메모", link: "/"},
                        {
                            submenu: "플래너/컨셉북", link: "/",
                            thirdCategorys: [
                                {thirdMenu: "3차 카테고리", link: "/",
                                    fourthCategorys: [
                                        {fourthMenu: "4차 카테고리", link: "/"},
                                        {fourthMenu: "캐쉬북", link: "/"},
                                        {fourthMenu: "티켓북", link: "/"},
                                        {fourthMenu: "테마북", link: "/"},
                                        {fourthMenu: "다이어트 플래너", link: "/"},
                                        {fourthMenu: "트래블노트", link: "/"},
                                        {fourthMenu: "단어장/오답노트", link: "/"},
                                        {fourthMenu: "스티커북", link: "/"},

                                    ]
                                },
                                {thirdMenu: "캐쉬북", link: "/"},
                                {thirdMenu: "티켓북", link: "/"},
                                {thirdMenu: "테마북", link: "/"},
                                {thirdMenu: "다이어트 플래너", link: "/"},
                                {thirdMenu: "트래블노트", link: "/"},
                                {thirdMenu: "단어장/오답노트", link: "/"},
                                {thirdMenu: "스티커북", link: "/"},
                            ]
                        },
                        {submenu: "데코/포장", link: "/"},
                        {submenu: "필기구", link: "/"},
                        {submenu: "필통/펜파우치", link: "/"},
                        {submenu: "데스크용품", link: "/"},
                        {submenu: "앨범/사진", link: "/"},
                        {submenu: "독서용품", link: "/"},
                        {submenu: "사무용품", link: "/"},
                        {submenu: "파일/바인더", link: "/"},
                        {submenu: "명함/사원증", link: "/"},
                        {submenu: "카드/편지", link: "/"},
                        {submenu: "미술용품", link: "/"},
                        {submenu: "캐쉬용품", link: "/"},
                         
                    ]
                },
                { 
                    menu: "가전/생활", link: "/", // 임시 메뉴
                    subGnbItems: [
                        {submenu: "2차 카테고리2", link: "/"},
                        {submenu: "menu2", link: "/"},
                        {submenu: "menu3", link: "/"}
                    ]
                },
                { 
                    menu: "디자인문구", link: "/", // 임시 메뉴
                    subGnbItems: [
                        {submenu: "2차 카테고리3", link: "/"},
                        {
                            submenu: "menu2", link: "/",

                        },
                        {submenu: "menu3", link: "/"}
                    ]
                },
                { 
                    menu: "디지털", link: "/", // 임시 메뉴
                    subGnbItems: [
                        {submenu: "2차 카테고리4", link: "/"},
                        {submenu: "menu2", link: "/"},
                        {submenu: "menu3", link: "/"}
                    ]
                },
                { 
                    menu: "뷰티/헬스", link: "/", // 임시 메뉴
                    subGnbItems: [
                        {submenu: "2차 카테고리5", link: "/"},
                        {submenu: "menu2", link: "/"},
                        {submenu: "menu3", link: "/"}
                    ]
                },
                { 
                    menu: "여행/레포츠", link: "/", // 임시 메뉴
                    subGnbItems: [
                        {submenu: "2차 카테고리6", link: "/"},
                        {submenu: "menu2", link: "/"},
                        {submenu: "menu3", link: "/"}
                    ]
                },
                { 
                    menu: "유아동", link: "/", // 임시 메뉴
                    subGnbItems: [
                        {submenu: "2차 카테고리7", link: "/"},
                        {submenu: "menu2", link: "/"},
                        {submenu: "menu3", link: "/"}
                    ]
                },
                { 
                    menu: "인테리어", link: "/", // 임시 메뉴
                    subGnbItems: [
                        {submenu: "2차 카테고리8", link: "/"},
                        {submenu: "menu2", link: "/"},
                        {submenu: "menu3", link: "/"}
                    ]
                },
                { 
                    menu: "주방/푸드", link: "/", // 임시 메뉴
                    subGnbItems: [
                        {submenu: "2차 카테고리9", link: "/"},
                        {submenu: "menu2", link: "/"},
                        {submenu: "menu3", link: "/"}
                    ]
                },
                { 
                    menu: "펫샵", link: "/", // 임시 메뉴
                    subGnbItems: [
                        {submenu: "2차 카테고리10", link: "/"},
                        {submenu: "menu2", link: "/"},
                        {submenu: "menu3", link: "/"}
                    ]
                },

            ],*/
            linkAreaSwiper: '',
            linkAreas: [
                {linkMenu: '신상품', link: '/display/new'},
                {linkMenu: '베스트', link: '/display/best'},
                {linkMenu: '타임세일', link: '/display/timedeal'},
                {linkMenu: '이벤트', link: '/featured'},
                {linkMenu: 'MD추천', link: '/display/md'},
                {linkMenu: '리뷰', link: '/customer/faq'},
            ],
        }
    },
    mounted() {
        this.$nextTick(() => {

            this.categoryInfo(this);

            // this.itemActive(-1);
        });
    },
    methods: {
        itemActive(categoryId) {
            this.selectedCategoryId = categoryId;
            // this.categoryIndex = index;
        },
        subItemActive(categoryId) {
            this.selectedSubCategoryId = categoryId;
            // this.subMenuIndex = index;
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/layout/mobile_gnb.scss";
</style>