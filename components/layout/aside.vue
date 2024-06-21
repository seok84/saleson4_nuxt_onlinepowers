<template>
    <div>
        <aside id="aside-menu">
            <nav class="quick-menu">
                <div class="toggle-area" :class="{ on: isVisible === true }">
                    <nuxt-link to="/mypage" class="menu ico-mypage"><span>마이페이지</span></nuxt-link>
                    <nuxt-link to="/mypage/wishlist" class="menu ico-heart"><i
                            class="number">{{ wishlistCount }}</i><span>관심상품</span></nuxt-link>
                    <nuxt-link to="/mypage/recent" class="menu ico-recent"><i>{{latelyItemsCount}}</i><span>최근 본 상품</span></nuxt-link>
                    <nuxt-link to="/mypage/inquiry-item" class="menu ico-talk"><span>1:1문의</span></nuxt-link>
                </div>
                <button type="button" class="btn-toggle" v-if="isVisible == true" @click="isVisible = !isVisible">
                    접기
                </button>
                <button type="button" class="btn-toggle" v-if="isVisible == false" @click="isVisible = !isVisible">
                    열기
                </button>
            </nav>
            <button type="button" class="btn-top" @click="topScroll">TOP</button>
        </aside>

    </div>
</template>

<script>
let $s;
export default {
    name: 'AsideUi',
    created() {
        let self = this;
        this.$nuxt.$on('updateQuickCartQuantity', (quantity = 0) => {
            self.quick.cartQuantity = quantity;
        });
        this.$nuxt.$on('updateQuickWishlistCount', (count = 0) => {
            self.quick.wishlistCount = count;
        });

        this.$nuxt.$on('updateQuickLatelyItemsItems', () => {
            this.getLatelyItemInfo();
        });
    },
    data() {
        return {
            isVisible: true,
            event: {
                hide: true
            },
            quick: {
                cartQuantity: 0,
                wishlistCount: 0
            },
            latelyItems : []
        };
    },
    watch: {
        $route(to, from) {
            this.getQuickInfo();
        }
    },
    methods: {
        topScroll() {
            if (window.pageYOffset > 0) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        },
        getLatelyItemInfo() {
            if (process.client) {
                this.latelyItemInfo(this);
            }
        },
        async getQuickInfo() {
            let self = this;

            try {
                const response = await this.$salesonApi().common.getQuickInfo();
                const data =  response.data;
                self.quick.cartQuantity = data.cartQuantity;
                self.quick.wishlistCount = data.wishlistCount;
            } catch (e) {}
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            $s = this.$saleson;
            this.getQuickInfo();
            this.getLatelyItemInfo();
        });
    },
    computed: {
        cartQuantity() {
            return this.formatNumber(this.quick.cartQuantity);
        },
        wishlistCount() {
            return this.formatNumber(this.quick.wishlistCount);
        },
        displayCartQuantites() {
            return this.formatNumber(this.quick.cartQuantity);
        },
        latelyItemsCount(){
            return this.formatNumber(this.latelyItems.length);
        }
    }
}

</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/layout/aside.scss";
</style>