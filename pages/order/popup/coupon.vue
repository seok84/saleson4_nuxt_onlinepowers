<template>
    <!-- 팝업 -->
    <!-- show 클래스로 노출여부 제어 -->
    <!-- 상품쿠폰적용 -->
    <div class="modal modal-apply-coupon" :class="show ? 'show' : ''">
        <div class="dimmed-bg" @click="hideModal"></div>
        <div class="modal-wrap">
            <button class="modal-close" @click="hideModal">닫기</button>
            <div class="modal-header">
                상품쿠폰적용
            </div>
            <div class="p-2 modal-body">
                <p class="modal-desc">상품쿠폰 적용 <span>사용 가능한 쿠폰만 보여집니다.</span></p>
                <div class="toggle-content brand-container"
                     v-for="(sellerShipping, sellerShippingIndex) in buy.receivers[0].sellerShipping">
                    <!-- 반복요소 brand-container -->
                    <div class="brand-wrap">
                        <div class="product-list-container">
                            <!-- 반복요소 product-list-container -->
                            <ul class="product-list-wrap">
                                <template v-for="(shipping, shippingIndex) in sellerShipping.shippings">
                                    <template v-if="shipping.singleShipping">
                                        <li class="product-list order-list">
                                            <BuyItemList
                                                :scope="'coupon-list'"
                                                :item="shipping.buyItem"
                                                :item-shipping="shipping"
                                                :shipping-index="shippingIndex"
                                                :couponInfo.sync="couponInfo"
                                                :discount-amount="discountAmount"
                                                :sale-amount="saleAmount"
                                                @couponSelect="couponSelect"
                                            />
                                            <itemPrice
                                                :item="shipping.buyItem"
                                                :item-shipping="shipping"
                                                :total-item-price="sellerShipping.totalPrice[shippingIndex]"
                                            />

                                        </li>
                                    </template>
                                    <template v-else>
                                        <template v-for="(buyItem, itemIndex) in shipping.buyItems">
                                            <li class="product-list order-list">
                                                <BuyItemList
                                                    :scope="'coupon-list'"
                                                    :item="buyItem"
                                                    :item-shipping="shipping"
                                                    :shipping-index="shippingIndex"
                                                    :couponInfo.sync="couponInfo"
                                                    :discount-amount="discountAmount"
                                                    :sale-amount="saleAmount"
                                                    @couponSelect="couponSelect"
                                                />

                                                <itemPrice v-if="itemIndex == shipping.buyItems.length - 1"
                                                           :item.sync="buyItem"
                                                           :item-shipping="shipping"
                                                           :total-item-price="sellerShipping.totalPrice[shippingIndex]"
                                                />
                                            </li>
                                        </template>
                                    </template>
                                </template>
                            </ul>
                        </div>
                    </div>
                </div>


                <div class="btn-wrap gap">
                    <button class="btn btn-primary" @click="setCoupon">적용</button>
                    <button class="btn btn-default" @click="hideModal">취소</button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

import ItemPrice from "@/components/order/item-price.vue";
import BuyItemList from "@/components/order/buy-item-list.vue";

let $s, vm;

export default {
    components: {BuyItemList, ItemPrice},
    data() {
        return {
            discountAmount: [],
            saleAmount: []
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        buy: {
            type: Object,
            default: () => {
                return {}
            }
        },
        couponInfo: {
            type: Array,
            default: () => {
                return []
            }
        },
        selectedCoupon: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    watch: {
        show: {
            deep: true,
            handler(newValue) {
                return newValue;
            }
        },
        couponInfo: {
            deep: true,
            handler(newValue) {
                return newValue;
            }
        }
    },
    beforeCreate: function() {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    mounted() {
        this.$nextTick(() => {});
    },
    methods: {
        hideModal() {
            this.couponClear();
            this.$emit('close');
        },
        couponSelect(itemSequence) {
            let select = document.getElementById(`coupon-${itemSequence}`);
            let couponAreaKey = select.getAttribute('id');
            let selectedCouponUserId = select.value.split('.', 1).toString();
            let itemCount = this.buy.receivers[0].buyItems.length;

            for (let i = 0; i < itemCount; i++) {
                let checkCouponAreaKey = `coupon-${i}`;
                let itemCoupons = this.couponInfo[i];

                if (itemCoupons && itemCoupons.length > 0) {
                    itemCoupons.forEach(coupon => {
                        coupon.disabled = false;

                        if (couponAreaKey == checkCouponAreaKey) {
                            coupon.selected = coupon.couponUserId == selectedCouponUserId ? true : false;
                        } else {
                            coupon.selected = coupon.couponUserId == selectedCouponUserId ? false : coupon.selected
                        }
                    });
                }
            }

            for (let i = 0; i < itemCount; i++) {
                let itemCoupons = this.couponInfo[i];

                itemCoupons.forEach(coupon => {
                    if (coupon.selected) {
                        let selectedCouponUserId = coupon.couponUserId;

                        for (let j = 0; j < itemCount; j++) {
                            if (i !== j) {
                                let otherItemCoupons = this.couponInfo[j];

                                otherItemCoupons.forEach(otherCoupon => {
                                    if (otherCoupon.couponUserId == selectedCouponUserId) {
                                        otherCoupon.disabled = true;
                                    }
                                });
                            }
                        }
                    }
                });
            }

            this.setCouponDiscountData('', itemSequence);
        },

        setCouponDiscountData(type) {
            let itemCount = this.buy.receivers[0].buyItems.length;

            for(let i=0;i<itemCount;i++) {

                let differentPlaceSelectedCoupons = [];
                let differentPlaceSelectNotCoupons = [];

                let selectId = 0;

                let itemCoupons = this.couponInfo[i];
                let select = document.getElementsByClassName('op-item-coupon', 'select')[i];

                itemCoupons.forEach(coupon => {
                   if (coupon.selected) {
                       selectId = coupon.couponUserId;
                   }

                    if (coupon.disabled == true) {
                        differentPlaceSelectedCoupons.push(coupon);
                    } else {
                        differentPlaceSelectNotCoupons.push(coupon);
                    }
                });

                while (document.getElementsByClassName('op-item-coupon', 'select')[i].firstChild != null) {
                    document.getElementsByClassName('op-item-coupon', 'select')[i].removeChild(document.getElementsByClassName('op-item-coupon', 'select')[i].firstChild);
                }

                if (differentPlaceSelectedCoupons.length > 0) {
                    let usedOptgroup = document.createElement('optgroup');
                    usedOptgroup.label = "다른 상품에 적용된 쿠폰";

                    differentPlaceSelectedCoupons.forEach(selectedCoupon => {
                        usedOptgroup.appendChild(this.makeOption(selectedCoupon, selectId));
                    })

                    select.appendChild(usedOptgroup);

                    let optgroup = document.createElement('optgroup');
                    optgroup.label = "사용 가능 쿠폰";

                    let defaultOption = document.createElement('option');
                    defaultOption.text = "쿠폰을 선택해주세요.";
                    defaultOption.value = 'clear';

                    if (selectId == 0) {
                        defaultOption.selected = true;
                    }

                    optgroup.insertBefore(defaultOption, optgroup.firstChild);

                    select.appendChild(defaultOption);

                    if (differentPlaceSelectNotCoupons.length > 0) {
                        differentPlaceSelectNotCoupons.forEach(coupon => {
                            optgroup.append(this.makeOption(coupon, selectId));
                        });
                    }

                    select.appendChild(optgroup);

                } else {
                    let optgroup = document.createElement('optgroup');
                    optgroup.label = "사용 가능 쿠폰";

                    let defaultOption = document.createElement('option');
                    defaultOption.text = "쿠폰을 선택해주세요.";
                    defaultOption.value = 'clear';

                    if (selectId == 0) {
                        defaultOption.selected = true;
                    }

                    optgroup.insertBefore(defaultOption, optgroup.firstChild);

                    if (differentPlaceSelectNotCoupons.length > 0) {
                        for (let l=0;l<differentPlaceSelectNotCoupons.length;l++) {
                            optgroup.appendChild(this.makeOption(differentPlaceSelectNotCoupons[l], selectId));
                        }
                    }

                    select.appendChild(optgroup);
                }
            }

            // selectCouponSetting
            for(let i = 0; i < itemCount; i++) {
                let itemCoupons = this.couponInfo[i];
                let itemSequence = this.buy.receivers[0].buyItems[i].itemSequence;

                let select = document.getElementsByClassName('op-item-coupon', 'select')[i];

                for (let j = 0; j < itemCoupons.length; j++) {
                    let coupon = itemCoupons[j];

                    if (coupon.selected == true && select.value != 'clear') {
                        this.selectedCoupon[i] = coupon;
                        this.selectedCoupon[i].itemDiscountAmount = coupon.discountAmount + this.buy.receivers[0].buyItems[itemSequence].itemPrice.discountAmount;
                        this.selectedCoupon[i].saleAmount = this.buy.receivers[0].buyItems[itemSequence].itemPrice.itemSaleAmount - coupon.discountAmount
                    }

                    if (select.value == 'clear') {
                        this.selectedCoupon[i] = 'clear';
                    }
                }
            }

            if (type == 'clear') {
                this.setItemPrice('all');
            } else {
                // 쿠폰 할인 계산식
                this.setItemPrice('coupon');
            }

        },
        makeOption(coupon, selectId) {
            let optionText = coupon.couponUserId + '. ' + coupon.couponName;
            optionText += ' - ' + this.formatNumber(coupon.discountAmount) + '원 할인';

            if (coupon.couponConcurrently == '1') {
                optionText += ' [1개 수량만 적용]';
            } else {
                optionText += ' [구매 수량 할인]';
            }

            let option = document.createElement('option');
            option.textContent = optionText;

            if (coupon.couponType == null || coupon.couponType == undefined) {
                coupon.couponType = "";
            }

            if (coupon.selected == true && selectId == coupon.couponUserId) {
                option.selected = true;
            }

            return option;
        },

        // 쿠폰 계산
        setItemPrice(scope) {
            let itemCount = this.buy.receivers[0].buyItems.length;

            for (let i = 0; i < itemCount; i++) {
                let itemCoupons = this.couponInfo[i];

                let couponDiscountAmount = 0;
                let couponShippingIndex = 0;

                itemCoupons.forEach(coupon => {
                    if (coupon.selected) {
                        couponDiscountAmount = coupon.discountAmount;
                        couponShippingIndex = coupon.shippingIndex;
                    }
                });

                let buyItem = this.buy.receivers[0].buyItems[i];
                let itemPrice = buyItem.itemPrice;
                let itemSequence = buyItem.itemSequence;

                if (scope != 'all') {
                    vm.$set(vm.discountAmount, itemSequence, itemPrice.itemDiscountAmount + couponDiscountAmount);
                    vm.$set(vm.saleAmount, itemSequence, itemPrice.itemSaleAmount - couponDiscountAmount);
                } else {
                    // 할인가 및 판매가 초기화
                    vm.$set(vm.discountAmount, itemSequence, itemPrice.itemDiscountAmount + 0);
                    vm.$set(vm.saleAmount, itemSequence, itemPrice.itemSaleAmount - 0);
                }
            }
        },

        setCoupon() {
            let itemCoupons = [];
            let addItemCoupons = [];
            let cartCoupons = [];

            for (let i=0;i<this.selectedCoupon.length;i++) {
                let coupon = this.selectedCoupon[i];
                if (coupon != 'clear') {
                    itemCoupons.push(coupon);
                }
            }

            this.setItemPrice('order');

            this.$emit('close');
            this.$emit('setCouponDiscountAmount', itemCoupons, addItemCoupons, cartCoupons);
        },

        couponClear() {
            this.$saleson.confirm('쿠폰과 관련된 할인 금액들이 전부 초기화 상태로 변경됩니다.', () => {
                let itemCount = this.buy.receivers[0].buyItems.length;

                for(let i=0; i < itemCount; i++) {
                    let itemCoupons = this.couponInfo[i];

                    for (let j = 0; j < itemCoupons.length; j++) {
                        let coupon = itemCoupons[j];

                        if (coupon.selected) {
                            coupon.selected = false;
                        }

                        if (coupon.disabled) {
                            coupon.disabled = false;
                        }
                    }
                }


                this.setCouponDiscountData('clear');
            })
        },
    }
}
</script>
