<template>
    <div :class="{ 'fixed-header': isHeaderFixed === true, 'hide-banner': topBanner == null, 'is-main': checkMain === true }"
        ref="topBanner">
        <!-- 탑배너영역 -->
        <div id="top-banner" ref="topBanner" v-if="topBanner != null">
            <section>
                <!-- 이미지형 -->
                <div v-if="!!topBanner.image" class="flex type1">
                    <div class="bg-left" :style="'background: ' + topBanner.color"></div>
                    <div class="bg-right" :style="'background: ' + topBanner.color"></div>

                    <button type="button" class="top-banner-close white" @click="alert('close')">닫기</button>

                    <a :href="topBanner.url" v-if="topBanner.url.trim().startsWith('http')" ><img :src="topBanner.image" alt="Top Banner"></a>
                    <nuxt-link :to="topBanner.url" v-else ><img :src="topBanner.image" alt="Top Banner"></nuxt-link>
                </div>

                <!-- 텍스트형 -->
                <div v-else class="flex type-text">
                    <button type="button" class="top-banner-close" @click="showTopBanner = false">닫기</button>
                    {{ topBanner.content }}
                </div>
            </section>
        </div>
        <header id="header" ref="headerTop" :class="headerMobileStyle">
            <!--
                pageback :: page back button show
                brand :: brand(logo) show
                page-title :: page title show
                searching :: searching-area show
                basket :: basket ico show
                quicklink :: quick-link show
             -->
            <section class="flex space-between">
                <div class="col-left">
                    <button type="button" class="btn-gnb" @click="gnbToggle()">메뉴 열기</button>
                    <button type="button" class="btn-back btn-history" @click="backHistory()">
                        <img src="~/assets/image/ico/ico_arr_back.svg" alt="뒤로가기">
                    </button>
                    <nuxt-link to="/" class="brand"><img src="~/assets/image/common/brand.svg"
                                                         alt="세일즈온"></nuxt-link>

                    <h1 class="title-h1-mobile">{{ propsPageTitle }}</h1>
                </div>

                <div class="col-right">
                    <div class="searching-area">
                        <form @submit.prevent="headerSearch">
                            <button type="button" class="btn-close" @click="showMobileSearch()">
                                <img src="~/assets/image/ico/ico_arr_back.svg" alt="뒤로가기">
                            </button>
                            <input type="search" name="query" :placeholder="recommend.content" @focus="showSearchList = true" v-model="keyword">
                            <button type="button" class="btn-search mobile-search-open"
                                    @click="showMobileSearch()">모바일 검색창 열기
                            </button>
                            <button type="submit" class="btn-search">검색</button>
                        </form>
                    </div>
                    <ul class="util-menu">
                        <li class="favorite">
                            <nuxt-link to="/mypage/wishlist">찜 상품</nuxt-link>
                        </li>
                        <li class="mypage">
                            <nuxt-link to="/mypage">마이페이지</nuxt-link>
                        </li>

                        <li class="mycart">
                            <nuxt-link to="/cart">장바구니 <span class="count">{{ cartCount }}</span></nuxt-link>
                        </li>
                    </ul>
                    <div class="searching-list" v-show="showSearchList" ref="searList">
                        <button type="button" class="delete-all" @click="deleteAllSearch">전체삭제</button>
                        <div class="list list-popular">
                            <p>인기검색어</p>
                            <ol>
                                <li v-for="(keyword, index) of keywords">
                                    <em class="number">{{ index + 1 }}</em>
                                    <a @click.prevent="search(keyword.keyword)" class="text">{{ keyword.keyword }}</a>
                                </li>
                            </ol>
                        </div>
                        <div class="list list-recent">
                            <p>최근 검색어</p>
                            <ul v-if="latelySearch.length > 0">
                                <li v-for="(keyword, index) of latelySearch">
                                    <a @click.prevent="search(keyword)" class="text">{{ keyword }}</a>
                                    <button class="delete" @click="deleteSearch(keyword)"></button>
                                </li>
                            </ul>
                        </div>
                        <div class="list-footer">
                            <button type="button" @click="showSearchList = false">닫기</button>
                        </div>
                    </div>
                </div>
            </section>
            <section class="quick-link">
                <div class="link-area" ref="linkAreaSwiper">
                    <div class="swiper-wrapper">
                        <nuxt-link :to="linkArea.link" v-for="(linkArea, index) in linkAreas" :key="index"
                                   class="swiper-slide">
                            {{ linkArea.linkMenu }}
                        </nuxt-link>
                    </div>
                </div>
                <div class="my-menu">
                    <nuxt-link to="/mypage/order">
                        주문배송
                    </nuxt-link>
                    <nuxt-link to="/customer">
                        고객센터
                    </nuxt-link>
                    <a href="#" class="btn_logout d-none d-md-block" v-if="!showLogin" @click.prevent="logout">
                        로그아웃
                    </a>
                    <a href="/user/login" class="btn_login d-none d-md-block" v-else-if="showLogin">
                    로그인
                    </a>
                </div>
            </section>
            <nav class="gnb" @mouseleave="itemActive(null)" ref="headerGnb">
                <section class="depth1">
                    <div class="menu-item" v-for="(category1, category1Index) in categories"
                         :class="{ on: category1Index === categoryIndex }" @mouseenter="itemActive(category1Index)">
                        <nuxt-link :to="category1.link">{{ category1.name }}</nuxt-link>
                        <div v-if="category1.childCategories.length > 0"
                             class="depth2"  :class="{ on: category1Index === categoryIndex }">
                            <ul>
                                <li v-for="(category2, category2Index) in category1.childCategories"
                                    :class="{ on: category2Index === subMenuIndex }"
                                    @mouseenter="subItemActive(category2Index)">
                                    <nuxt-link :to="category2.link">{{ category2.name }}</nuxt-link>
                                    <div class="depth3" v-if="category2.childCategories.length > 0">
                                        <div class="depth3-menu"
                                             v-for="(category3, category3Index) in category2.childCategories"
                                             :class="{ on: category3Index === thirdMenuIndex }">
                                            <nuxt-link :to="category3.link" @mouseenter="thirdItemActive(category3Index)">
                                                {{ category3.name }}
                                            </nuxt-link>
                                            <div class="depth4" v-if="category3.childCategories.length > 0">
                                                <div class="depth4-menu"
                                                     v-for="(category4, category4Index) in category3.childCategories">
                                                    <nuxt-link :to="category4.link">
                                                        {{ category4.name }}
                                                    </nuxt-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </nav>
        </header>

        <!-- mobile-gnb -->
        <div class="gnb-mobile-container">
            <div class="m-category-menu">
                <nuxtLink class="m-category-menu-item" to="/" @click.native="categoryMenu = true, categoryIndex = 0">메뉴</nuxtLink>
                <nuxtLink class="m-category-menu-item" to="/mypage/wishlist">즐겨찾기</nuxtLink>
                <nuxtLink class="m-category-menu-item" to="/">홈</nuxtLink>
                <nuxtLink class="m-category-menu-item" to="/mypage">마이페이지</nuxtLink>
                <nuxtLink class="m-category-menu-item" to="/" @click.native="showMobileSearch()">검색</nuxtLink>
            </div>
            <div class="m-gnb-wrap" :class="{ on: categoryMenu == true }">
                <header>
                    <button type="button" class="m-gnb-close" @click="categoryMenu = false">닫기</button>
                    <div class="my-menu">
                        <nuxtLink to="/user/login" v-if="showLogin">
                            로그인
                        </nuxtLink>
                        <nuxtLink to="/" v-if="!showLogin">
                            로그아웃
                        </nuxtLink>
                        <nuxtLink to="/mypage" v-if="!showLogin">
                            마이페이지
                        </nuxtLink>
                    </div>
                </header>
                <div class="m-gnb">
                    <div class="depth1">
                        <button class="menu-item"  v-for="(category1, category1Index) in categories" :key="category1Index"
                            @click="itemActive(category1Index)" :class="{ on: categoryIndex === category1Index }">
                            {{ category1.name }}
                        </button>
                    </div>
                    <div class="depth2">
                        <ul v-for="(category1, category1Index) in categories" :key="category1Index" :class="{ on: categoryIndex === category1Index }">
                            <li>
                                <a class="submenu-item" @click="subItemActive(-1)"
                                   :class="{ on: -1 === category1Index }" :href="category1.link">
                                    전체
                                </a>
                            </li>
                            <li v-for="(category2, category2Index) in category1.childCategories" :key="category2Index">

                                <a class="submenu-item" v-if="category2.childCategories.length <= 0" @click="subItemActive(category2Index)"
                                   :class="{ on: category2Index === subMenuIndex }" :href="category2.link">
                                    {{ category2.name }}
                                </a>
                                <button class="submenu-item" v-else @click="subItemActive(category2Index)"
                                        :class="{ on: category2Index === subMenuIndex }">
                                    {{ category2.name }}
                                </button>

                                <div class="depth3" v-if="category2.childCategories.length > 0"
                                     :class="{ on: category2Index === subMenuIndex }">
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
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {

    data() {
        return {
            //categories: [],
            propsPageTitle: '',
            currentPage: '',
            routerName: this.$route.name,
            checkMain: true, //메인체크
            isVisible: true,
            isHeaderFixed: true,
            isHeaderGnbOn: true,
            //showTopBanner: true,
            topBannerInfo: {
                list: {}
            },
            latelySearch: [], // 최근 검색어
            keywords : [],  // 인기검색어
            recommend : {
                blankFlag: false,
                content: '',
                link: ''
            }, // 추천검색어
            keyword: '',
            isLogin: false,
            isGuestLogin: false,
            gnbMenu: false,
            categoryMenu: false,
            categoryIndex: '',
            subMenuIndex: '',
            thirdMenuIndex: '',
            showSearchList: false,
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

    computed: {
        cartCount() {
            return this.$store.state.cart.cartCount;
        },

        categories() {
            return this.$store.state.category.categories;
        },

        topBanner() {
            return  this.$store.state.display.topBanner;
        },

        headerMobileStyle() {
            const defaultHeader = 'header-detail';
            const type01Header = 'header-default';
            const type02Header = 'header-search';

            switch (this.routerName) {
                case 'index':
                    return type01Header;
                case 'items':
                case 'items-id':
                case 'search':
                case 'display':
                    return type02Header;
                    break;
                default:
                    return defaultHeader;
            }

        },
        showLogin ()  {
            return !(this.isLogin || this.isGuestLogin);
        }
    },
    watch: {
        '$route'(to) {
            this.currentPage = to.name;
            //메인 체크
            if (to.name === 'index') {
                console.log(' to name is index');
                this.checkMain = true;
            } else {
                this.checkMain = false;
            }
            this.pageName = this.getRestOfName(to.name);
            this.propsPageTitle = this.getPageTitle(to);
            this.isLogin = this.$saleson.isLogin()
            //this.categoryInfo(this);
            this.itemActive(-1);
        }
    },
    created() {

    },
    mounted() {

        this.$nextTick(() => {
            //메인 체크
            if (this.routerName === 'index') {
                this.checkMain = true;
            } else {
                this.checkMain = false;
            }
            this.propsPageTitle = this.getPageTitle(this.$route);
            const topBanner = this.$refs.topBanner
            const headerGnb = this.$refs.headerGnb
            let headerGnbTop = headerGnb.getBoundingClientRect().top;


            window.addEventListener('scroll', function () {
                let scrollY = window.scrollY;
                // console.log('scrollY : ', scrollY)
                if (scrollY > headerGnbTop) {
                    topBanner.classList.add('scroll')
                } else {
                    topBanner.classList.remove('scroll')
                }
            });

            this.isLogin = this.$saleson.isLogin();
            this.isGuestLogin = this.$saleson.isGuestLogin();

            //this.categoryInfo(this);

            // 탑배너
            //this.setTopBannerDisplay();

            // 최근 검색어
            this.latelyInfo(this);

            // 추천 검색어.
            this.bindSearchKeyword();

            this.itemActive(-1);
        });
    },
    methods: {
        getPageTitle(route) {
            try {
                const routeMeta = route.matched.map(r => r.components.default).find(
                    c => c.options.head);
                if (routeMeta && routeMeta.options.head) {
                    const head = routeMeta.options.head();
                    if (head.meta) {
                        const pageTitleMeta = head.meta.find(m => m.hid === 'pageTitle');
                        if (pageTitleMeta) {
                            return pageTitleMeta.content;
                        }
                    }
                }
            } catch (e) {
                console.log(e.message);
            }
            return '';
        },
        getRestOfName(name) {
            const parts = name.split('-');
            if (parts.length === 2) {
                return name;
            } else if (parts.length > 2) {
                return parts.slice(1).join('-');
            }
        },
        backHistory() {
            window.history.back();
        },
        isActive(route) {
            return this.$route.path === route;
        },
        itemActive(index) {
            this.categoryIndex = index;
        },
        subItemActive(index) {
            this.subMenuIndex = index;
        },
        thirdItemActive(index) {
            this.thirdMenuIndex = index;
        },
        showMobileSearch() {
            this.showSearchList = !this.showSearchList;
            if (this.showSearchList) {
                this.showTopBanner = false;
                document.querySelector('body').classList.add('scroll-fixed');
                this.$refs.headerTop.classList.add('mobile-search-active');
            } else {
                this.showTopBanner = true;
                document.querySelector('body').classList.remove('scroll-fixed');
                this.$refs.headerTop.classList.remove('mobile-search-active');
            }
        },
        gnbToggle() {
            document.querySelector('.fixed-header').classList.toggle('on');
        },

        // 추천 검색어, 인기검색어 조회
        async bindSearchKeyword() {
            try {
                const { data } = await this.$salesonApi().search.getSearchKeywords();
                if (data == null) {
                    this.keywords = [];
                    this.recommend = {};
                } else {
                    this.keywords = data.keywords;
                    this.recommend = data.recommend;
                }
            } catch (e) {
                console.error('[header] 추천검색어: ', e);
            }
        },
        // 탑배너 정보 조회
        async getTopBanner() {
            try {
                const { data } = await this.$salesonApi().display.getTopBanner();

                // topBanner == null인 경우 오류 발생 => try/catch로 처리함.
                this.topBannerInfo.list = data.list;
                this.showTopBanner = true;

            } catch (e) {
                //    console.error('[header-getTopBAnner] ', e.message,  e);
                this.showTopBanner = false;
            }
        },
        closeTopBanner() {
            this.showTopBanner = false;
            // 탑배너 닫기 쿠키 처리
            Cookies.set('TOP_BANNER_COOKIE', 'close', { expires: 1, secure: false });
        },
        // 최근 검색어 개별 삭제
        deleteSearch(keyword) {
            let latelySearchKeywords = this.latelySearch;
            let index = latelySearchKeywords.indexOf(keyword);

            latelySearchKeywords.splice(index, 1);

            Cookies.set(this.$saleson.const.LATELY_SEARCH, JSON.stringify(latelySearchKeywords));
            this.latelySearch = latelySearchKeywords;
        },
        // 최근 검색어 전체 삭제
        deleteAllSearch() {
            Cookies.set(this.$saleson.const.LATELY_SEARCH, '');
            this.latelySearch = [];
        },

        // 검색
        search(keyword) {
            // 최근 검색어 추가
            this.latelyInfo(this);

            let lately = this.latelySearch;
            if (lately === null || lately.length === 0) {
                lately = [];
            }

            if (lately.indexOf(keyword) < 0) {
                // 최근 검색어에 keyword가 존재하지 않는 경우
                lately.unshift(keyword);

                Cookies.set(this.$saleson.const.LATELY_SEARCH, JSON.stringify(lately));
            }

            this.showSearchList = false;
            //keyword = encodeURIComponent(keyword);
            this.$router.push({ path: '/item/result', query: { query: keyword } });
        },

        headerSearch() {
            // 조회아이콘으로 조회실행
            let keyword = this.keyword;
            let url = '';

            if (keyword === '') {
                // 검색어가 입력되지 않은 경우

                if (this.recommend !== null) {
                    this.showSearchList = false; // 인기검색어, 최근검색어 리스트 미표시
                    url = this.recommend.link;

                    if (url !== null && url !== '') {
                        // 설정된 추천검색어가 있는 경우
                        if (this.recommend.blankFlag) {
                            // 새창으로 열기 (_blank)
                            window.open(url);
                        } else {
                            // nuxt 링크이동
                            this.$router.push(url);
                        }
                    } else {
                        // 설정된 추천검색어도 없는 경우 (입력 검색어 & 추천검색어 없음)
                        // this.showSearchList = true;
                        return false;
                    }
                }

            } else {
                // 검색어가 입력된 경우
                this.search(keyword);
            }
            this.keyword = '';
        },
        logout: function () {
            this.$saleson.logout();
        },
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/layout/header';
@import "~/assets/scss/pages/layout/mobile_gnb.scss";
</style>