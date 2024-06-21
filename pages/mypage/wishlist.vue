<template>
    <section class="mypage-favorite">
        <div class="title-container">
            <h2 class="title-h2">관심상품</h2>
        </div>
        <!-- // 상품 영역 -->
        <div class="check-wrap m-line-divider">
            <label class="circle-input-checkbox" ><input type="checkbox" id="checkAll" @click="checkAll()"><i></i>전체선택({{wishlist.pagination.totalElements}}개)</label>
            <div class="btn btn-default btn-action" @click="delWishlist">선택삭제</div>
        </div>
        <div class="item-list-container vertical">
            <div class="item-list item-list-3" v-for="(data, index) in wishlist.content" :key="data.wishlistId">
                <!-- 체크박스 -->
                <label class="checkbox"><input type="checkbox" :id="data.wishlistId"
                                               @change="updateCheckStatus(data.wishlistId)"><i></i></label>
                <!-- 아이템 썸네일 영역 -->
                <nuxt-link :to="'/item/'+data.item.itemUserCode">
                <div class="thumbnail-container" :class="{ 'sold-out': data.item.itemSoldOutFlag ==='Y'}">
                    <div class="sold-out-wrap" v-if="data.item.itemSoldOutFlag === 'Y'">
                           <span>
                            <img src="~/assets/image/sample/sold-out.png" alt="품절">
                           </span>
                    </div>

                    <nuxt-link :to="'/item/'+data.item.itemUserCode" class="thumbnail-wrap">
                        <div class="thumbnail-area">
                            <img class="top-left" src="~/assets/image/sample/thum_area.png"
                                 alt="플로팅이미지" />
                            <img class="top-right" src="~/assets/image/sample/thum_area.png"
                                 alt="플로팅이미지" />
                            <img class="bottom-left" src="~/assets/image/sample/thum_area.png"
                                 alt="플로팅이미지" />
                            <img class="bottom-right" src="~/assets/image/sample/thum_area.png"
                                 alt="플로팅이미지" />
                            <img class="center-center">
                        </div>
                        <img class="thumbnail" :src="itemImage(data.item.itemImage)" alt="썸네일" @error="errorImage"/>
                    </nuxt-link>
                    <div class="user-action">
                        <div class="user-ico user-basket"
                             :id="'cart_' + data.item.itemId"
                             @click.prevent="addToCart(data.item.itemId,data.item.orderMinQuantity)">장바구니 </div>
                    </div>
                </div>
                </nuxt-link>
                <!-- 아이템 정보 영역 -->
                <div class="info-container">
                    <div class="title-main paragraph-ellipsis">
                        <span v-if="data.item.brand !== ''">
                            [{{data.item.brand}}]
                        </span>
                         {{data.item.itemName}}
                    </div>
                    <div class="title-sub paragraph-ellipsis">
                        {{ data.item.itemSummary }}
                    </div>
                    <div class="discounted" v-if="data.item.discountRate > 0">
                        {{ formatNumber(data.item.salePrice) }}원
                    </div>
                    <div class="price-wrap">
                        <p class="price">
                            <span>{{ formatNumber(data.item.presentPrice) }}</span>
                            <span>원</span>
                        </p>
                        <p class="sale" v-if="data.item.discountRate > 0">
                            {{ data.item.discountRate }}%
                        </p>
                    </div>
                    <div class="tag-wrap" v-if="data.item.labels.length > 0">
                        <div v-for="(label, labelIndex) in data.item.labels"
                             class="tag" :style="'background-color:'+ label.color">{{ label.label }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- // 페이징 -->
        <ul class="pagination">
            <pagination :current-page="wishlist.pagination.currentPage"
                        :total-pages="wishlist.pagination.totalPages"
                        @change="paging"></pagination>
        </ul>
    </section>
</template>

<script>
import Pagination from "@/components/ui/pagination";

let $s, vm;
    export default {
        components: {Pagination},
        layout: 'mypage',
        name: 'mypage-favorite',
        async asyncData({$salesonApi, query}) {
            try {
                const param = {
                    page: query.page ?? 1,
                    size: 6
                }

                const {data} = await $salesonApi().wishlist.getWishlist(param);

                return {
                    wishlistParam: param,
                    wishlist: data

                }
            } catch (e) {
                console.log(e);
            }
        },
        data() {
            return {
                param: {
                    arrayRequiredItems: []
                },
                wishlistParam: {
                    size: 6,
                    page: 1
                },

                wishlist: {
                    content: [],
                    pagination : []
                },
                selectedItems: []

            }
        },
        head() {
            return {
                meta: [
                    {hid: 'pageTitle', name: 'pageTitle', content: '관심상품'}
                ]
            }
        },

        beforeCreate() {
            $s = this.$saleson;
            vm = this;
        },
        mounted() {

        },
        methods : {
            paging(page) {
                const query = {
                    page: page,
                    size : this.param.size,
                }
                this.$router.push({path: this.$route.fullPath, query: query});
            },

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

                $s.toast("해당 상품이 장바구니에 담겼습니다.");
                this.param.arrayRequiredItems = [];
            },


            checkAll(){
                const checkAll = document.getElementById('checkAll');
                const checkboxes = document.querySelectorAll('.item-list-container input[type="checkbox"]');
                const isChecked = checkAll.checked;

                this.selectedItems = [];

                checkboxes.forEach(checkbox => {
                    checkbox.checked = isChecked;
                    if (isChecked && !this.selectedItems.includes(checkbox.id)) {
                        this.selectedItems.push(checkbox.id);
                    }
                });

            },
            updateCheckStatus(itemId) {
                itemId = String(itemId);
                if (this.selectedItems.includes(itemId)) {
                    this.selectedItems = this.selectedItems.filter(id => id !== itemId);
                } else {
                    this.selectedItems.push(itemId);
                }

            },
            delWishlist() {
                if (this.selectedItems.length > 0) {
                    $s.confirm("삭제하시겠습니까?", async ()=> {
                        try{
                            const {data} = await this.$salesonApi().wishlist.delWishlist(this.selectedItems);
                            if(data.status === 200) {
                                $s.alert("삭제되었습니다.", () => {
                                    location.reload();
                                });
                            }
                        } catch (e) {
                            $s.alert(e.message ||e);
                        }
                    })
                } else {
                    $s.alert("선택된 항목이 없습니다.");
                }
            }
        }
    }
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_main.scss";
</style>