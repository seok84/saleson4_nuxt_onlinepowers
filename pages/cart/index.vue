 <template>
    <div class="contents-area-page cart-page">
        <h1 class="title-h1 pc">장바구니</h1>
        <div v-if="!isCartEmpty" class="contents-area" ref="targetElement" :class="{ active: isTargetActive }">
            <div class="contents-left">
                <!-- 전체선택 -->
                <div class="select-all-wrap">
                    <div class="select-all">
                        <label class="circle-checkbox">
                            <input type="checkbox" v-model="isCheckedAllItems"><i></i>
                        </label>
                        전체선택
                    </div>
                    <button class="btn btn-default btn-round btn-delete" type="button" @click="deleteCartIds">선택삭제</button>
                </div>
                <!-- 장바구니/주문서 리스트 -->
                <div class="brand-container" v-for="(cartGroup, cartGroupIndex) in cartGroups" :key="cartGroupIndex"> <!-- 반복요소 brand-container -->
                    <div class="brand-name">
                        <label class="circle-checkbox">
                            <input type="checkbox" class="checkbox main"
                                   :value="cartGroup.sellerId"
                                   :groupIndex="cartGroupIndex"
                                   :checked="toggleMainItems(cartGroupIndex)"
                                   @change="toggleMainItems(cartGroupIndex, $event.target.checked)"
                            ><i></i>
                        </label>
                        {{cartGroup.sellerName}}({{cartGroup.itemQuantity}})
                    </div>

                    <div class="brand-wrap">
                        <div class="product-list-container"> <!-- 반복요소 product-list-container -->
                            <ul class="product-list-wrap">
                                <template v-for="(itemGroup, groupIndex) in cartGroup.itemGroups">
                                    <li class="product-list cart-list" v-for="buyItem in itemGroup" :class="buyItem.soldOutFlag ? 'sold-out' : ''">
                                        <BuyItemList
                                            :scope="'cart-list'"
                                            :item.sync="buyItem.item"
                                            :selectedItems.sync="selectedItems"
                                            :item-shipping="buyItem.shipping"
                                            :shipping-index="cartGroupIndex"
                                            @freeGiftItemPopupOpen="getFreegiftItemPopupByScope"
                                            @deleteCart="deleteCart"
                                            @update:item="immediateDetectionItem"
                                            @changeQuantity="clickDetectionItem"
                                            @buyOrder="saveOrderItemTemp"/>

                                        <itemPrice
                                            v-if="buyItem.lastItem == true"
                                                   :item.sync="buyItem.item"
                                                   :total-item-price="cartGroup.totalPrice[groupIndex]"
                                                   :item-shipping="buyItem.shipping"
                                                   :is-tooltip-active="isTooltipActive"
                                                   @toggleTooltip="toggleTooltipActive"
                                                   @closeTooltip="closeTooltipActive"/>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 총금액 -->
                <div class="total-product pc">
                    <h3 class="content-title"><i class="ico"><img src="~/assets/image/ico/ico_money.svg"
                                                                  alt="전체 상품 합계"></i>전체 상품 합계</h3>
                    <div class="price-info-wrap">
                        <div class="price-info">
                            <p>총 상품금액</p>
                            <p>{{formatNumber(totalPrice.totalItemAmountBeforeDiscounts)}}<b>원</b></p>
                        </div>
                        <div class="operator">+</div>
                        <div class="price-info">
                            <p>배송비</p>
                            <p>{{formatNumber(totalPrice.totalShippingAmount)}}<b>원</b></p>
                        </div>
                        <div class="operator">-</div>
                        <div class="price-info">
                            <p>할인혜택</p>
                            <p>{{formatNumber(totalPrice.totalDiscountAmount)}}<b>원</b></p>
                        </div>
                        <div class="operator">=</div>
                        <div class="price-info final">
                            <p>최종 결제금액</p>
                            <p>{{formatNumber(totalPrice.orderPayAmount)}}<b>원</b></p>
                        </div>
                    </div>
                </div>
                <div class="total-product mobile">
                    <h3 class="content-title"><i class="ico"><img src="~/assets/image/ico/ico_money.svg"
                                                                  alt="전체 상품 합계"></i>전체 상품 합계</h3>
                    <div class="price-info-wrap">
                        <div class="price-info">
                            <p>총 상품금액</p>
                            <p>{{formatNumber(totalPrice.totalItemAmountBeforeDiscounts)}}<b>원</b></p>
                        </div>
                        <div class="price-info">
                            <p>배송비</p>
                            <p>{{formatNumber(totalPrice.totalShippingAmount)}}<b>원</b></p>
                        </div>
                        <div class="price-info">
                            <p>할인혜택</p>
                            <p>{{formatNumber(totalPrice.totalDiscountAmount)}}<b>원</b></p>
                        </div>
                    </div>
                </div>
                <div class="floating-bottom mobile">
                    <div class="price-info final">
                        <p>최종 결제금액</p>
                        <p>{{formatNumber(totalPrice.orderPayAmount)}}<b>원</b></p>
                    </div>
                    <button class="btn btn-primary btn-buy" type="button" @click="saveOrderItemTemp">주문하기</button>
                </div>
            </div>

            <div class="contents-right">
                <!-- 플로팅 어사이드 총금액-->
                <div class="floating-aside">
                    <div class="floating-contents">
                        <div class="title">최종 결제금액</div>
                        <ul class="content">
                            <li>
                                <p>총 상품금액</p>
                                <p>{{formatNumber(totalPrice.totalItemAmountBeforeDiscounts)}}<b>원</b></p>
                            </li>
                            <li>
                                <p>배송비</p>
                                <p>{{formatNumber(totalPrice.totalShippingAmount)}}<b>원</b></p>
                            </li>
                            <li class="benefit">
                                <p>총 할인혜택</p>
                                <p>- {{formatNumber(totalPrice.totalDiscountAmount)}}<b>원</b></p>
                            </li>
                            <li class="point">
                                <p>적립예정 포인트</p>
                                <p>{{formatNumber(totalPrice.totalEarnPoint)}} P</p>
                            </li>
                        </ul>
                        <div class="total">
                            <p>{{formatNumber(totalPrice.orderPayAmount)}}<b>원</b></p>
                        </div>
                        <button class="btn btn-primary btn-round btn-floating" type="button" @click="saveOrderItemTemp">주문하기</button>
                    </div>
                </div>
            </div>

        </div>
        <!-- 구성상품 -->
        <DetailPopup :free-gift-item="freeGiftItem" :view="isPopupActive" @hideModal="hideModal"/>
    </div>
</template>

<script>
import {Autoplay, Navigation, Pagination, Scrollbar} from "swiper";

import BuyItemList from "@/components/order/buy-item-list";
import itemPrice from "@/components/order/item-price";
import DetailPopup from "@/pages/cart/popup/detail";


let $s, vm;

export default {
    components: {BuyItemList, DetailPopup, itemPrice},
    async asyncData({$salesonApi, $seo, route, $axios}) {
        try {
            const {data} = await $salesonApi().cart.getCartItems();
            const seo = await $seo(route.path, $axios);

            return {
                displayNaverPayFlag: data.displayNaverPayFlag,
                cartResponse: data,
                orderPrice: data.orderPrice,
                receivers: data.receivers,
                seo: seo
            }
        } catch (error) {
            console.log(error);
        }
    },
    data() {
        return {
            MAIN_GROUP: 'MAIN_GROUP',
            SUB_GROUP: 'SUB_GROUP',

            seo: {},
            isTargetActive: false,
            isTooltipActive: false,
            isPopupActive: false,
            cartRespoonse: {},
            displayNaverPayFlag: false,
            receivers: {},
            orderPrice: {},
            freeGiftItem: [],
            allMainGroupCartIds: [],
            selectedItems: [],

            cartGroups: [],
            buyItems: [],
            updateCartQuantityFlag: false,

            totalPrice: {
                totalItemAmountBeforeDiscounts: 0,
                totalShippingAmount: 0,
                totalDiscountAmount: 0,
                totalEarnPoint: 0,
                orderPayAmount: 0
            }
        };
    },
    head() {
        return this.seo;
    },
    beforeCreate() {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    async created() {

        // 장바구니용 데이터를 만들기 위해 원 데이터 가공
        await this.getCartItemList();
        await this.orderPriceDefaultSet();
        await this.calculateEventHandler();
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    computed: {
        isCartEmpty() {
            return this.cartGroups.length === 0;
        },
        isCheckedAllItems: {
            get() {
                return this.buyItems.length > 0 && this.selectedItems.length === this.buyItems.length;
            },
            set(value) {
                const selected = [];

                if (value) {
                    const cartIds = this.getSelectCartItems();

                    cartIds.forEach(cartId => {
                        selected.push(cartId);
                    });
                }

                this.selectedItems = selected;
                this.calculateEventHandler();
            }
        }
    },
    watch: {
        selectedItems() {
            this.calculateEventHandler();
        }
    },
    methods: {
        handleScroll() {
            const targetElement = this.$refs.targetElement;
            const rect = targetElement.getBoundingClientRect();
            this.isTargetActive = rect.top <= -100 && rect.bottom >= 500;
        },
        hideModal() {
            vm.isPopupActive = false;
            //e.target.closest('.modal').classList.remove('show');
        },
        toggleTooltipActive(isTooltipActive) {
            this.isTooltipActive = !this.isTooltipActive;
        },

        closeTooltipActive(isTooltipActive) {
            this.isTooltipActive = false;
        },

        subItemCheckByCartIds(cartIds) {
            vm.checkedItems = cartIds;
        },
        getCartItemList() {
            this.receivers.sellerShipping.forEach((sellerShipping, index) => {
                let shippings = sellerShipping.shippings;

                let itemGroups = [];
                let itemGroup = [];

                shippings.forEach((shipping) => {
                    let items = shipping.singleShipping ? [shipping.buyItem] : shipping.buyItems;

                    let buyItemGroup = [];
                    let buyItem = {};
                    items.forEach((item, index) => {
                        buyItem = {
                            sellerId: item.sellerId,
                            cartId: item.cartId,
                            item: item,
                            lastItem: (index === items.length - 1),
                            soldOutFlag: item.orderQuantity.soldOutFlag,
                            shipping: this.shippingInfoDataSet(shipping)
                        };

                        // 품절상품은 제외
                        if (!item.orderQuantity.soldOutFlag) {
                            this.buyItems.push(item);
                        }

                        buyItemGroup.push(buyItem);
                    });

                    itemGroup.push(buyItemGroup);
                });

                itemGroups.itemGroups = itemGroup;
                itemGroups.sellerName = sellerShipping.sellerName;
                itemGroups.itemQuantity = sellerShipping.itemQuantity;
                itemGroups.sellerId = sellerShipping.sellerId;
                itemGroups.totalPrice = sellerShipping.totalPrice;
                itemGroups.shippingIndex = index;

                this.cartGroups.push(itemGroups);
            });

            // 기본 데이터 초기화
            this.selectedItems = [];

            // 첫 진입시 전체선택 활성화
            if (this.selectedItems.length == 0) {
                this.selectedItems = this.getSelectCartItems();
            }

            // sellerGrouping
            if (this.allMainGroupCartIds.length == 0) {
                this.setGroupCartIds();
            }
        },

        shippingInfoDataSet(shipping) {
            let tempObject = {};
            tempObject = shipping;

            // 배송비
            if (shipping.shippingPaymentType === '1') {
                tempObject.displayShipping = shipping.realShipping;
            } else {
                tempObject.displayShipping = 0;
            }

            return tempObject;
        },

        async getFreegiftItemPopupByScope(id){
            try {
                const {data} = await this.$salesonApi().cart.getFreegiftItemByCartId(id);
                this.freeGiftItem = data.buyItems;

                if (this.freeGiftItem != null) {
                    vm.isPopupActive = true;
                } else {
                    throw new Error();
                }

            } catch (error) {
                console.error(error);
            }
        },

        // 체크된 것들 삭제
        deleteCartIds() {
            this.$saleson.confirm('상품을 장바구니에서 삭제하시겠습니까?', () => {
                if (vm.selectedItem.length > 0) {
                    let cartIds = vm.selectedItem;

                    let param = {
                        'id': cartIds
                    }

                    this.deleteAction(param);
                }
            });
        },

        // 카트 삭제
        deleteCart(cartId) {
            this.$saleson.confirm('상품을 장바구니에서 삭제하시겠습니까?', () => {
                let cartIds = new Array();
                cartIds.push(cartId);

                let param = {
                    'id' : cartIds
                }

                this.deleteAction(param);
            });
        },

        deleteAction(param) {
            this.$salesonApi().cart.deleteCartItems(param)
            .then((response)=> {
                if (response.data.status == 200) {
                    this.$saleson.reload();
                }
            })
            .catch((err) => {console.error(err)});
        },

        getSelectCartItems() {
            const selected = [];
            this.buyItems.forEach(buyItem => {
                if (!buyItem.orderQuantity.soldOutFlag) {
                    selected.push(buyItem.cartId);
                }
            });
            return selected;
        },

        setGroupCartIds() {
            this.cartGroups.forEach((cartGroup, cartGroupIndex) => {
                let sellerId = cartGroup.sellerId;

                let cartIds = [];
                cartGroup.itemGroups.forEach(itemGroup => {
                    itemGroup.forEach(item => {
                        cartIds.push(item.cartId);
                    })
                })

                let mainGroup = {
                    sellerId: sellerId,
                    cartIds: cartIds
                }

                this.allMainGroupCartIds.push(mainGroup);
            });
        },

        async saveOrderItemTemp() {
            const availableItem = this.selectedItems;
            const buyItems = this.buyItems;

            if (this.updateCartQuantityFlag) {
                this.$saleson.alert('수량 변경한 상품이 존재합니다.\n해당 상품의 수량 변경 버튼을 눌러주세요!');
                return;
            }

            if (availableItem.length === 0) {
                this.$saleson.alert("구매할 상품을 선택해 주세요.");
                return;
            }

            let quantityErrorCount = 0;
            availableItem.forEach(cartId => {
                const buyItem = buyItems.find(buyItem => buyItem.cartId === cartId);

                if (buyItem === undefined || buyItem.itemPrice.quantity <= 0) {
                    quantityErrorCount++;
                }
            })

            const params = {
                'cartIds': this.selectedItems
            };

            try {
                let response = await this.$salesonApi().order.buyOrder(params);

                if (response.status == 200) {
                    let url = '/order/step1';

                    /*
                    if (!self.$saleson.isLogin()) {
                        url = '/order/no-member';
                    }*/

                    // 성공함
                    this.$saleson.redirect(url);
                } else {
                    throw new Error('주문이 실패하였습니다.')
                }

            } catch(error) {
                console.log(error.response.data.message);
                this.$saleson.alert(error.response.data.message);
            }
        },

        orderPriceDefaultSet() {
            this.totalPrice.totalItemAmountBeforeDiscounts = 0;
            this.totalPrice.totalShippingAmount = 0;
            this.totalPrice.totalDiscountAmount = 0;
            this.totalPrice.totalEarnPoint = 0;
            this.totalPrice.orderPayAmount = 0;
        },

        immediateDetectionItem(newValue) {
            //this.calculateEventHandler();

            let param = {
                cartId : newValue.cartId,
                quantity : newValue.itemPrice.quantity
            }

            this.updateCartQuantityAction(param);
        },

        clickDetectionItem(buyItem) {
            let param = {
                cartId : buyItem.cartId,
                quantity : buyItem.itemPrice.quantity
            }

            this.updateCartQuantityAction(param);
        },

        async updateCartQuantityAction(param) {
            try {
                const {data} = await this.$salesonApi().cart.updateQuantity(param);

                // 성공시
                if (data.status == 200 && data.message === "OK") {
                    this.calculateEventHandler();
                } else {
                    throw new Error('Failed to update quantity');
                }
            }catch (error) {
                console.error(error);
            }
        },

        calculateEventHandler() {
            try {
                const getCalculateObject = () => {
                    // 객체를 초기화하고, setShipping 메서드를 추가
                    const calculateObject = {
                        item: 0,
                        shipping: 0,
                        discount: 0,
                        earnPoint: 0,
                        shippingType: ''
                    };

                    return calculateObject;
                };

                const appendMap = (map = {}, key='', data = {}, quantity = 0) => {
                    const keys = Object.keys(map);
                    const co = keys.includes(key) ? map[key] : getCalculateObject();

                    let itemPrice = data.itemPrice;
                    let itemShipping = data.itemShipping;
                    const shippingType = itemShipping.shippingType.toString();

                    co.item += Number(itemPrice.itemSalePrice  + itemPrice.optionPrice) * quantity;
                    co.discount += Number(itemPrice.discountAmount);
                    co.earnPoint += Number(itemPrice.earnPoint) * quantity;
                    co.shippingType = shippingType;


                    let shipping = 0;
                    const originShipping = Number(itemShipping.shipping);

                    const shippingFreeAmount = Number(itemShipping.shippingFreeAmount);
                    const shippingItemCount = Number(itemShipping.shippingItemCount);

                    switch (shippingType) {
                        case '2': // 판매자 조건부
                        case '3': // 출고지 조건부
                        case '4': // 상품 조건부
                            shipping = co.item >= shippingFreeAmount ? 0 : originShipping;
                            co.shippingFreeAmountFlag = co.item >= shippingFreeAmount ? true : false;
                            break;
                        case '5': // 개당 배송비
                            let count = Math.floor(quantity / shippingItemCount);
                            count += quantity % shippingItemCount > 0 ? 1 : 0;

                            shipping = originShipping * count;
                            break;
                        case '6': // 고정 배송비
                            shipping = co.shipping + originShipping;
                            break;
                        default:
                    }

                    co.shipping = shipping;

                    map[key] = co;
                }

                const map = {};
                if (this.selectedItems.length > 0) {
                    let filteredItems = [];
                    let currentGroup = [];

                    // 체크 상품 필터링
                    this.cartGroups.forEach(cartGroup => {
                        cartGroup.itemGroups.forEach((itemGroup, itemGroupIndex) => {
                            itemGroup.forEach((buyItem, itemIndex) => {
                                if (this.selectedItems.includes(buyItem.cartId) && !buyItem.soldOutFlag) {
                                    buyItem.groupIndex = itemGroupIndex;
                                    filteredItems.push(buyItem);
                                }
                            });
                        });
                    });

                    filteredItems.forEach(buyItem => {
                        let key = '';

                        let data = {};

                        data.itemShipping = buyItem.shipping;
                        data.itemPrice = buyItem.item.itemPrice

                        const quantity = buyItem.item.itemPrice.quantity;

                        switch (buyItem.shipping.shippingType.toString()) {
                            case '1': // 무료배송
                                key = 'freeShipping';
                                break;
                            case '2': // 판매자 조건부
                            case '3': // 출고지 조건부
                            case '4': // 상품 조건부
                            case '5': // 개당 배송비
                                key = buyItem.shipping.shippingGroupCode;
                                break;
                            case '6': // 고정 배송비
                                key = 'fixShipping';
                                break;
                            default:
                        }

                        appendMap(map, key, data, quantity);
                    });
                }

                let itemAmount = 0;
                let shippingAmount = 0;
                let discountAmount = 0;
                let earnPoint = 0;

                const values = Object.values(map);

                if (typeof values != 'undefined' && values != null && values.length > 0) {
                    values.forEach(co=>{
                        itemAmount += co.item;
                        shippingAmount += co.shipping;
                        discountAmount += co.discount;
                        earnPoint += co.earnPoint;
                    });
                }

                this.totalPrice.totalItemAmountBeforeDiscounts = itemAmount;
                this.totalPrice.totalShippingAmount = shippingAmount;
                this.totalPrice.totalDiscountAmount = discountAmount;
                this.totalPrice.totalEarnPoint = earnPoint;
                this.totalPrice.orderPayAmount = (itemAmount + shippingAmount) - discountAmount;

            } catch (e) {
                console.log(e);
            }
        },

        toggleMainItems(index, checked) {
            let target = this.allMainGroupCartIds[index];

            if (checked != undefined && checked != null) {
                if (checked) {
                    target.cartIds.forEach(cartId => {
                        if (this.selectedItems.indexOf(cartId) < 0) {
                            this.selectedItems.push(cartId);
                        }
                    });

                } else {
                    target.cartIds.forEach(cartId => {
                        const index = this.selectedItems.indexOf(cartId);

                        if (index > -1) {
                            this.selectedItems.splice(index, 1);
                        }
                    });
                }

                return checked;
            } else {
                let matchedCount = 0;

                target.cartIds.forEach(cartId => {
                    if (this.selectedItems.indexOf(cartId) > -1) {
                        matchedCount++;
                    }
                })

                return matchedCount > 0;
            }
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/pages/cart/cart.scss";
@import "@/assets/scss/pages/cart/cart-modal.scss";
@import "@/assets/scss/pages/items/item_list.scss";
</style>