<template>
    <!-- 아이템 썸네일 영역 -->

    <div :class="{ 'thumbnail-container ': true, 'sold-out': itemSoldOutFlag }">
        <div class="sold-out-wrap" v-if="itemSoldOutFlag">
            <span><img src="~/assets/image/sample/sold-out.png" alt="품절"/></span>
        </div>
        <div v-if="rank !== ''" class="rank best">{{rank}}</div>
        <nuxt-link :to="'/item/'+item.itemUserCode" class="thumbnail-wrap redirect-item-view">
            <img class="thumbnail" :src="itemImage(item.itemImage)" :alt="item.itemImage" @error="errorImage" loading="lazy" decoding="async"/>
        </nuxt-link>
        <div class="user-action" v-if="type != 'order'">
            <div class="user-ico user-attention"
                 :id="'wish_' + item.itemId"
                 @click.prevent="addToWishList(item.itemId)">
                관심상품
            </div>
            <div class="user-ico user-basket"
                 :id="'cart_' + item.itemId"
                 v-if="item.itemSoldOutFlag !== 'Y' && item.itemOptionFlag !== 'Y' && item.itemType !== '3'"
                 @click.prevent="addToCart(item.itemId, item.orderMinQuantity)">
                장바구니
            </div>
        </div>
    </div>
</template>

<script>
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
                    nonmemberOrderType: "1",
                    param: {
                        arrayRequiredItems: []
                    }
                }
            }
        },
        type : {
            type : String,
            default : ""
        },
        rank : {
          type: String,
          default: () =>{
            return '';
          }
        }
    },

    data() {
        return {
            param: {
                arrayRequiredItems: []
            }
        };
    },
    computed: {
        itemSoldOutFlag() {
            return 'Y' == this.item.itemSoldOutFlag;
        }
    },
    mounted() {
    },
    methods: {
        async addToCart(itemId, orderMinQuantity) {

            const quantity = Number(orderMinQuantity) > 1 ? Number(orderMinQuantity) : 1;

            this.param.arrayRequiredItems.push(itemId + '||' + quantity + '||');

            try {
                await this.$salesonApi().cart.addToCart(this.param);
                this.param.arrayRequiredItems.splice(0, this.param.arrayRequiredItems.length);

                const element = document.getElementById('cart_' + itemId);
                if (!element.classList.contains('active')) {
                    element.classList.add('active');
                }
                // document.getElementById('cart_' + itemId).className = 'btn_cart on'; // active?

                const { data }  = await this.$salesonApi().common.getCartInfo();
                this.updateDisplayCartQuantity(this, data.cartQuantity);

            } catch (e) {
                console.error('[item-part-thumbnail] 장바구니 담기: ', e);
            }

            this.$saleson.toast('해당 상품이 장바구니에 담겼습니다.');
            this.param.arrayRequiredItems = [];
        },

        async addToWishList(itemId) {

            if (!this.$saleson.isLogin()) {
                this.$saleson.confirm(this.$saleson.const.LOGIN_MESSAGE, () => {
                    // 확인 버튼 클릭 시 실행 로직
                    this.$router.push({path: this.$saleson.pages.LOGIN, query: {target: this.$route.path}});
                });
                return;
            }

            try {
                await this.$salesonApi().wishlist.addWishlist(itemId);

                const element = document.getElementById('wish_' + itemId);
                /*if (!element.classList.contains('active')) {
                    element.classList.add('active');
                }*/ // css 가 깨지는 것같음 확인필요
                // document.getElementById('wish_' + itemId).className = 'btn_wish on'; // active?

                const { data } = await this.$salesonApi().common.getQuickInfo();
                this.updateDisplayWishlistCount(this, data.wishlistCount);

            } catch (e) {
                console.error('[item-part-thumbnail] 관심상품 담기: ', e);
            }

            this.$saleson.toast('해당 상품이 관심상품에 담겼습니다.');
        },
    }
}
</script>
