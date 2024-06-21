<template>
    <div class="contents-area-page order-page" v-if="buy.receivers != null">
        <h1 class="title-h1 pc">주문/결제</h1>
        <ValidationObserver ref="observer" v-slot="{ validate }">
            <form id="buy" name="buy" @submit.prevent="submit(validate)">
                <input type="hidden" id="orderCode" name="orderCode"/>
                <div class="toss-input-area" v-if="isMobile === false">
                    <input type="hidden" name="CST_MID" id="CST_MID">
                    <input type="hidden" name="CST_PLATFORM" id="CST_PLATFORM">
                    <input type="hidden" name="CST_WINDOW_TYPE" id="CST_WINDOW_TYPE">
                    <input type="hidden" name="LGD_AMOUNT" id="LGD_AMOUNT">
                    <input type="hidden" name="LGD_BUYER" id="LGD_BUYER">
                    <input type="hidden" name="LGD_BUYEREMAIL" id="LGD_BUYEREMAIL">
                    <input type="hidden" name="LGD_CASNOTEURL" id="LGD_CASNOTEURL">
                    <input type="hidden" name="LGD_CUSTOM_PROCESSTYPE" id="LGD_CUSTOM_PROCESSTYPE">
                    <input type="hidden" name="LGD_CUSTOM_SKIN" id="LGD_CUSTOM_SKIN">
                    <input type="hidden" name="LGD_CUSTOM_SWITCHINGTYPE" id="LGD_CUSTOM_SWITCHINGTYPE">
                    <input type="hidden" name="LGD_CUSTOM_USABLEPAY" id="LGD_CUSTOM_USABLEPAY">
                    <input type="hidden" name="LGD_DOMAIN_URL" id="LGD_DOMAIN_URL">
                    <input type="hidden" name="LGD_HASHDATA" id="LGD_HASHDATA">
                    <input type="hidden" name="LGD_MID" id="LGD_MID">
                    <input type="hidden" name="LGD_OID" id="LGD_OID">
                    <input type="hidden" name="LGD_OSTYPE_CHECK" id="LGD_OSTYPE_CHECK">
                    <input type="hidden" name="LGD_PAYKEY" id="LGD_PAYKEY">
                    <input type="hidden" name="LGD_PRODUCTINFO" id="LGD_PRODUCTINFO">
                    <input type="hidden" name="LGD_RESPCODE" id="LGD_RESPCODE">
                    <input type="hidden" name="LGD_RESPMSG" id="LGD_RESPMSG">
                    <input type="hidden" name="LGD_RETURNURL" id="LGD_RETURNURL">
                    <input type="hidden" name="LGD_TAXFREEAMOUNT" id="LGD_TAXFREEAMOUNT">
                    <input type="hidden" name="LGD_TIMESTAMP" id="LGD_TIMESTAMP">
                    <input type="hidden" name="LGD_VERSION" id="LGD_VERSION">
                    <input type="hidden" name="LGD_WINDOW_TYPE" id="LGD_WINDOW_TYPE">
                    <input type="hidden" name="LGD_WINDOW_VER" id="LGD_WINDOW_VER">
                    <input type="hidden" name="USE_ESCROW" id="USE_ESCROW">
                </div>

                <div class="toss-input-area" v-else>
                    <input type="hidden" name="CST_MID" id="CST_MID">
                    <input type="hidden" name="CST_PLATFORM" id="CST_PLATFORM">
                    <input type="hidden" name="CST_WINDOW_TYPE" id="CST_WINDOW_TYPE">
                    <input type="hidden" name="LGD_AMOUNT" id="LGD_AMOUNT">
                    <input type="hidden" name="LGD_BUYER" id="LGD_BUYER">
                    <input type="hidden" name="LGD_BUYEREMAIL" id="LGD_BUYEREMAIL">
                    <input type="hidden" name="LGD_CASNOTEURL" id="LGD_CASNOTEURL">
                    <input type="hidden" name="LGD_CUSTOM_PROCESSTYPE" id="LGD_CUSTOM_PROCESSTYPE">
                    <input type="hidden" name="LGD_CUSTOM_SKIN" id="LGD_CUSTOM_SKIN">
                    <input type="hidden" name="LGD_CUSTOM_SWITCHINGTYPE" id="LGD_CUSTOM_SWITCHINGTYPE">
                    <input type="hidden" name="LGD_CUSTOM_USABLEPAY" id="LGD_CUSTOM_USABLEPAY">
                    <input type="hidden" name="LGD_DOMAIN_URL" id="LGD_DOMAIN_URL">
                    <input type="hidden" name="LGD_HASHDATA" id="LGD_HASHDATA">
                    <input type="hidden" name="LGD_MID" id="LGD_MID">
                    <input type="hidden" name="LGD_OID" id="LGD_OID">
                    <input type="hidden" name="LGD_OSTYPE_CHECK" id="LGD_OSTYPE_CHECK">
                    <input type="hidden" name="LGD_PAYKEY" id="LGD_PAYKEY">
                    <input type="hidden" name="LGD_PRODUCTINFO" id="LGD_PRODUCTINFO">
                    <input type="hidden" name="LGD_RESPCODE" id="LGD_RESPCODE">
                    <input type="hidden" name="LGD_RESPMSG" id="LGD_RESPMSG">
                    <input type="hidden" name="LGD_RETURNURL" id="LGD_RETURNURL">
                    <input type="hidden" name="LGD_TAXFREEAMOUNT" id="LGD_TAXFREEAMOUNT">
                    <input type="hidden" name="LGD_TIMESTAMP" id="LGD_TIMESTAMP">
                    <input type="hidden" name="LGD_VERSION" id="LGD_VERSION">
                    <input type="hidden" name="LGD_WINDOW_TYPE" id="LGD_WINDOW_TYPE">
                    <input type="hidden" name="LGD_WINDOW_VER" id="LGD_WINDOW_VER">
                    <input type="hidden" name="USE_ESCROW" id="USE_ESCROW">
                </div>

                <div class="contents-area" ref="targetElement" :class="{ active: istargetActive, offset: istargetOffset }">
                    <div class="contents-left">

                        <!-- 비회원 주문시 -->
                        <template v-if="!isLogin">
                            <!-- 주문자정보 -->
                            <div class="toggle-title" :class="{ 'active': isOrderInfoActive }"
                                 @click="toggleInfoPanel('isOrderInfoActive')">
                                <h2>주문자정보</h2>
                                <button type="button" class="toggle-arr" :class="{ 'active': isOrderInfoActive }"></button>
                            </div>

                            <div class="toggle-content info-delivery" v-if="isOrderInfoActive">
                                <!-- 이름 -->
                                <div class="form-line">
                                    <input type="text" class="form-basic disabled" placeholder="홍길동" disabled />
                                    <span class="feedback">유효성 메시지</span>
                                </div>
                                <!-- 전화번호 -->
                                <div class="form-line">
                                    <input type="text" class="form-basic disabled" placeholder="01011112222" />
                                    <span class="feedback">유효성 메시지</span>
                                </div>
                                <!-- 이메일 -->
                                <div class="form-line">
                                    <input type="email" class="form-basic disabled" placeholder="abc@abc.com" />
                                    <span class="feedback">유효성 메시지</span>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <!-- 배송정보 -->
                            <div class="toggle-title" :class="{ 'active': isDeliveryInfoActive }"
                                 @click="toggleInfoPanel('isDeliveryInfoActive')">

                                <h2>배송정보</h2>
                                <button type="button" class="toggle-arr" :class="{ 'active': isDeliveryInfoActive }"></button>
                            </div>

                            <div class="toggle-content info-delivery" v-if="isDeliveryInfoActive">

                                <!-- 이름 -->
                                <!-- 비회원은 disabled x -->
                                <ValidationProvider tag="div" name="receiveName" rules="required" v-slot="{ errors }" >
                                    <div class="form-line">
                                        <input type="text" name="receiveName" class="form-basic" :class="` ${disabled}`" placeholder="홍길동"  v-model="buy.receivers[0].receiveName"/>
                                        <span class="feedback">받는사람을 입력해주세요</span>
                                    </div>
                                    <span v-if="errors.length" class="feedback invalid">{{ errors[0] }}</span>
                                </ValidationProvider>

                                <!-- 전화번호 -->
                                <!-- 비회원은 disabled x -->
                                <ValidationProvider tag="div" name="receiveMobile" rules="required|max:11" v-slot="{ errors }" >
                                    <div class="form-line">
                                        <input type="text" name="receiveMobile" class="form-basic" :class="` ${disabled}`" placeholder="01011112222" v-model="buy.receivers[0].receiveMobile"/>
                                        <span v-if="errors.length" class="feedback invalid">{{ errors[0] }}</span>
                                    </div>
                                </ValidationProvider>

                                <!-- 주소 (회원)-->
                                <ValidationProvider tag="div" name="zipcode" rules="required" v-slot="{ errors }" >
                                    <div class="form-line">
                                        <div class="flex">
                                            <input type="text" name="zipcode" class="form-basic disabled" placeholder="08318" v-model="buy.receivers[0].receiveZipcode"/>
                                            <button class="btn btn-black" type="button" @click="showModalAddressList">주소변경</button>
                                        </div>
                                        <span v-if="errors.length" class="feedback invalid">{{ errors[0] }}</span>
                                    </div>
                                </ValidationProvider>

                                <ValidationProvider tag="div" name="receiveAddress" rules="required" v-slot="{ errors }" >
                                    <div class="form-line">
                                        <input type="text" name="receiveAddress" class="form-basic disabled" placeholder="서울 구로구 디지털로27길 24(벽산디지털밸리)"
                                               disabled v-model="buy.receivers[0].receiveAddress"/>
                                        <span class="feedback">주소를 입력해주세요</span>
                                    </div>
                                </ValidationProvider>

                                <ValidationProvider tag="div" name="receiveAddressDetail" rules="required" v-slot="{ errors }" >
                                    <div class="form-line">
                                        <input type="text" name="receiveAddressDetail" class="form-basic" placeholder="711호 온라인파워스" v-model="receivers[0].receiveAddressDetail" />
                                        <span class="feedback">주소를 입력해주세요</span>
                                    </div>
                                </ValidationProvider>

                                <!-- 배송문구 -->
                                <div class="select-wrap">
                                    <select class="input-select" v-model="shippingContent">
                                        <option value="">직접입력</option>
                                        <option value="집앞">집앞</option>
                                        <option value="경비실">경비실</option>
                                    </select>
                                </div>

                                <!-- 배송문구 - 직접입력 선택일 때만 노출 -->
                                <div class="form-line" v-show="shippingContent == ''" >
                                    <input type="text" class="form-basic" placeholder="직접입력"v-model="receivers[0].content" />
                                    <span class="feedback">유효성 메시지</span>
                                </div>

                            </div>
                        </template>

                        <!-- 주문 상품리스트 -->
                        <div class="toggle-title" :class="{ 'active': isProductInfoActive }"
                             @click="toggleInfoPanel('isProductInfoActive')">
                            <h2>주문상품 정보 ({{buy.receivers[0].totalShippingCount}}개)</h2>
                            <button type="button" class="toggle-arr" :class="{ 'active': isProductInfoActive }"></button>
                        </div>
                        <div class="toggle-content brand-container" v-if="isProductInfoActive"
                             v-for="(sellerShipping, sellerShippingIndex) in buy.receivers[0].sellerShipping">
                            <!-- 반복요소 brand-container -->
                            <div class="brand-name">{{sellerShipping.sellerName}}({{sellerShipping.itemQuantity}})</div>
                            <div class="brand-wrap">
                                <div class="product-list-container">
                                    <!-- 반복요소 product-list-container -->
                                    <ul class="product-list-wrap">
                                        <template v-for="(shipping, shippingIndex) in sellerShipping.shippings">
                                            <template v-if="shipping.singleShipping">
                                                <li class="product-list order-list">
                                                        <BuyItemList
                                                            :scope="'order-list'"
                                                            :item.sync="shipping.buyItem"
                                                            :item-shipping="shipping"
                                                            :shipping-index="shippingIndex"
                                                            @freeGiftItemPopupOpen="getFreegiftItemPopup"
                                                            @availableCouponsCheck="showItemCouponPopupActive"
                                                        />

                                                        <itemPrice
                                                            :item="shipping.buyItem"
                                                            :item-shipping="shipping"
                                                            :is-tooltip-active="isTooltipActive"
                                                            :total-item-price="sellerShipping.totalPrice[shippingIndex]"
                                                            @toggleTooltip="toggleTooltipActive"
                                                            @closeTooltip="closeTooltipActive"/>
                                                </li>
                                            </template>
                                            <template v-else>
                                                <template v-for="(buyItem, itemIndex) in shipping.buyItems">
                                                    <li class="product-list order-list">
                                                        <BuyItemList
                                                            :scope="'order-list'"
                                                            :item="buyItem"
                                                            :item-shipping="shipping"
                                                            :shipping-index="shippingIndex"
                                                            @freeGiftItemPopupOpen="getFreegiftItemPopup"
                                                            @availableCouponsCheck="showItemCouponPopupActive"
                                                        />

                                                        <itemPrice v-if="itemIndex == shipping.buyItems.length - 1"
                                                                   :item="buyItem"
                                                                   :item-shipping="shipping"
                                                                   :total-item-price="sellerShipping.totalPrice[shippingIndex]"
                                                                   :is-tooltip-active="isTooltipActive"
                                                                   @toggleTooltip="toggleTooltipActive"
                                                                   @closeTooltip="closeTooltipActive"/>
                                                    </li>
                                                </template>
                                            </template>
                                        </template>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- 포인트 -->
                        <template v-if="buy.buyPayments['point'] != ''">
                            <div class="toggle-title" :class="{ 'active': isPointInfoActive }"
                                 @click="toggleInfoPanel('isPointInfoActive')">
                                <h2>포인트</h2>
                                <button type="button" class="toggle-arr" :class="{ 'active': isPointInfoActive }"></button>
                            </div>
                            <div class="toggle-content" v-if="isPointInfoActive">
                                <div class="info-point">
                                    <div class="point-status">
                                        <p>보유 포인트</p>
                                        <p>{{formatNumber(buy.userTotalPoint)}}P</p>
                                    </div>
                                    <div class="use-point-wrap">
                                        <div class="check-wrap">
                                            <label class="circle-input-checkbox"><input type="checkbox"><i></i>모두 사용</label>
                                        </div>
                                        <div class="use-point">
                                            <label class="input-point">
                                                <input type="text" value="0">
                                            </label>
                                            <!-- <button class="btn-point">포인트 사용</button> -->
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </template>

                        <!-- 결제수단 -->
                        <div class="toggle-title" :class="{ 'active': isPaymentInfoActive }"
                             @click="toggleInfoPanel('isPaymentInfoActive')">
                            <h2>결제수단</h2>
                            <button type="button" class="toggle-arr" :class="{ 'active': isPaymentInfoActive }"></button>
                        </div>

                        <div class="toggle-content info-payment-method" v-if="isPaymentInfoActive">
                            <p v-if="isLogin">최근 결제수단으로 결제 : {{recentOrderPayment.approvalTypeLabel}}</p>
                            <ul class="payment-wrap">
                                <li v-for="(payment, index) in paymentMethods" :key="index"
                                    v-if="buy.buyPayments[`${payment.type}`] != undefined && isNaverPayActive(payment.type)"
                                    :class="{ 'active': payType === payment.type , [payment.alt]: true, [payment.class]: true }"
                                    @click="payTypeSelect(payment.type)" class="payment">
                                    <img :src="payment.image" :alt="payment.alt">
                                    <span v-if="payment.name">{{ payment.name }}</span>
                                </li>
                            </ul>

                            <!-- 무통장입금 분리 X -->
                            <div class="payment-form-wrap" v-if="payType == 'bank'">
                                <ul class="dot-list">
                                    <li>무통장 입금시 발생하는 수수료는 손님 부담입니다.</li>
                                    <li>인터넷 뱅킹 또는 은행창구 입금시 의뢰인(송금인)명은 ‘입금인 입력’ 란에 입금하신 성함과 동일하게 기재해 주시기 바랍니다. <br>
                                        ( 만약 다를 경우 고객센터 1234-5678로 꼭 연락주시기 바랍니다.)</li>
                                    <li>무통장 입금시 입금자와 입금 예정일을 입력해주세요.</li>
                                    <li>현금영수증 미신청시 현금영수증 발급이 되지 않습니다.</li>
                                </ul>
                                <div class="payment-form">
                                    <h3 class="form-title">입금은행</h3>
                                    <ValidationProvider tag="div" name="bankVirtualNo" rules="required" v-slot="{ errors }" >
                                        <div class="select-wrap">
                                            <select class="input-select" name="bankVirtualNo" v-model="buy.buyPayments[payType].bankVirtualNo">
                                                <option disabled value="">은행을 선택하세요</option>
                                                <option v-for="(list,index) in buy.buyPayments[payType].accountNumbers">
                                                    {{list.bankName + ' 계좌번호: ' + list.accountNumber +'(' + list.accountHolder + ')'}}
                                                </option>
                                            </select>
                                        </div>
                                        <span v-if="errors.length" class="feedback invalid">{{ errors[0] }}</span>
                                    </ValidationProvider>


                                    <h3 class="form-title">입금자명</h3>
                                    <ValidationProvider tag="div" name="bankInName" rules="required" v-slot="{ errors }" >
                                        <div class="form-line">
                                            <input type="text" class="form-basic" placeholder="입금자명" name="bankInName" v-model="buy.buyPayments[payType].bankInName">
                                        </div>
                                        <span v-if="errors.length" class="feedback invalid">{{ errors[0] }}</span>
                                    </ValidationProvider>

                                    <h3 class="form-title">입금예정일</h3>
                                    <ValidationProvider tag="div" name="bankExpirationDate" rules="required" v-slot="{ errors }" >
                                        <div class="select-wrap">
                                                <select class="input-select" name="bankExpirationDate" v-model="buy.buyPayments[payType].bankExpirationDate">>
                                                <option disabled value="">선택</option>
                                                <option :value="date" v-for="date in buy.buyPayments[payType].expirationDates">{{dateFormat(date, 'date')}}</option>
                                            </select>
                                        </div>
                                        <span v-if="errors.length" class="feedback invalid">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                    <!--
                                    <h3 class="form-title">현금영수증 신청</h3>
                                    <div class="radio-wrap">
                                        <label class="input-radio"><input type="radio"><i></i>신청안함</label>
                                        <label class="input-radio"><input type="radio"><i></i>개인 소득공제용</label>
                                        <label class="input-radio"><input type="radio"><i></i>사업자 증빙용</label>
                                    </div>
                                    <div class="form-line">
                                        <input type="text" class="form-basic" placeholder="휴대전화 또는 사업자등록번호 숫자만 입력" />
                                        &lt;!&ndash; <span class="feedback">유효성 메시지</span> &ndash;&gt;
                                    </div>
                                    -->
                                </div>
                            </div>

                            <!-- 신용카드 -->
                            <template v-if="payType === 'card'">
                                <PaymentCard />
                            </template>

                            <!-- 가상계좌 -->
                            <template v-if="payType == 'vbank'">
                                <PaymentVBank />
                            </template>

                            <!-- 휴대전화 -->
                            <template v-if="payType == 'hp'">
                                <PaymentMobile />
                            </template>

                            <!-- 실시간계좌이체 -->
                            <template v-if="payType == 'realtimebank'">
                                <PaymentRealTimeBank />
                            </template>
                        </div>

                        <!-- 결제 예정 금액 -->
                        <div class="total-expected">
                            <h3 class="content-title"><i class="ico"><img src="@/assets/image/ico/ico_money.svg"
                                                                          alt="결제 예정 금액"></i>결제 예정 금액</h3>
                            <ul class="expected-info-wrap">
                                <li class="expected-info primary first">
                                    <p>총 상품금액</p>
                                    <p>{{formatNumber(order.buy.totalItemPrice)}}<b>원</b></p>
                                </li>
                                <li class="expected-info" v-if="order.buy.totalItemDiscountAmount > 0">
                                    <p>상품할인</p>
                                    <p>-{{formatNumber(order.buy.totalItemDiscountAmount)}}<b>원</b></p>
                                </li>
                                <li class="expected-info" v-if="order.buy.totalSetDiscountAmount > 0" >
                                    <p>세트할인</p>
                                    <p>-{{formatNumber(order.buy.totalSetDiscountAmount)}}<b>원</b></p>
                                </li>
                                <li class="expected-info" v-if="isLogin">
                                    <p>회원할인(FAMILY)</p>
                                    <p>-{{formatNumber(order.buy.totalUserLevelDiscountAmount)}}<b>원</b></p>
                                </li>

                                <li class="expected-info primary">
                                    <p>배송비</p>
                                    <p>{{formatNumber(order.buy.totalShippingAmount + order.buy.totalShippingCouponDiscountAmount)}}<b>원</b></p>
                                </li>

                                <li class="expected-info primary" v-if="order.buy.totalItemCouponDiscountAmount > 0">
                                    <p>쿠폰할인</p>
                                    <p>{{formatNumber(order.buy.totalItemCouponDiscountAmount + order.buy.totalCartCouponDiscountAmount)}}<b>원</b></p>
                                </li>
                                <li class="expected-info">
                                    <p>상품 쿠폰</p>
                                    <p>-{{formatNumber(order.buy.totalItemCouponDiscountAmount)}}<b>원</b></p>
                                </li>
                                <li class="expected-info primary">
                                    <p>포인트 사용</p>
                                    <p>9,999,999<b>P</b></p>
                                </li>
                                <li class="expected-info primary last">
                                    <p>최종 결제금액</p>
                                    <p>{{formatNumber(order.buy.orderPayAmount)}}<b>원</b></p>
                                </li>

                            </ul>
                        </div>
                        <div class="agree-terms mobile" v-if="isMobile">
                            <ValidationProvider tag="div" name="terms1" rules="checkbox_order_terms:PRIVACY" v-slot="{ errors }" >
                                <div class="agree toggle-wrap check-wrap" :class="{ 'active': isAgree }">
                                    <label class="circle-input-checkbox">
                                        <input type="checkbox" name="terms1" value="PRIVACY" v-model="terms.pc.privacy"><i></i>
                                        개인정보 제 3자 제공동의
                                    </label>
                                    <div class="toggle-arr" @click="toggleInfoPanel('isAgree')"></div>
                                    <div class="toggle-content">
                                        개인정보 제 3자 제공동의 내용 자리입니다 개인정보 제 3자 제공동의 내용 자리입니다 개인정보 제 3자 제공동의 내용 자리입니다
                                    </div>
                                </div>
                            </ValidationProvider>
                            <ValidationProvider tag="div" name="terms2" rules="checkbox_order_terms:FINAL_CHECK" v-slot="{ errors }" >
                                <div class="agree check-wrap">
                                    <label class="circle-input-checkbox">
                                        <input type="checkbox" name="terms2" value="FINAL_CHECK" v-model="terms.pc.finalCheck"><i></i>
                                    </label>
                                    주문할 상품의 상품명, 상품가격, 배송정보를 확인하였으며, 구매에 동의 하시겠습니까?
                                </div>
                            </ValidationProvider>
                        </div>

                        <div class="floating-bottom mobile" v-if="isMobile">
                            <div class="price-info final">
                                <p>총 결제금액({{buy.receivers[0].totalShippingCount}})</p>
                                <p>{{formatNumber(order.buy.orderPayAmount)}}<b>원</b></p>
                            </div>
                            <button class="btn btn-primary btn-buy" type="submit">결제하기</button>
                        </div>
                    </div>

                    <div class="contents-right">
                        <!-- 플로팅 어사이드 -->
                        <div class="floating-aside" ref="offsetElement">
                            <div class="floating-contents">
                                <div class="title">최종 결제금액</div>
                                <ul class="content expected-info-wrap">

                                    <li class="expected-info primary first">

                                        <p class="toggle-wrap" @click="toggleInfoPanel('isAllPrice')">총 상품금액<i
                                            class="toggle-arr" :class="{ 'active': isAllPrice }"></i></p>
                                        <p>{{formatNumber(order.buy.totalItemPrice)}}<b>원</b></p>
                                    </li>

                                    <li class="expected-info sub" v-if="isAllPrice && order.buy.totalItemDiscountAmount > 0">
                                        <p>상품할인</p>
                                        <p>-{{formatNumber(order.buy.totalItemDiscountAmount)}}<b>원</b></p>
                                    </li>
                                    <li class="expected-info sub" v-if="isAllPrice && order.buy.totalSetDiscountAmount > 0">
                                        <p>세트할인</p>
                                        <p>-{{formatNumber(order.buy.totalSetDiscountAmount)}}<b>원</b></p>
                                    </li>
                                    <li class="expected-info sub" v-if="isAllPrice && isLogin">
                                        <p>회원할인(FAMILY)</p>
                                        <p>-{{formatNumber(order.buy.totalUserLevelDiscountAmount)}}<b>원</b></p>
                                    </li>
                                    <li class="expected-info primary dashed-none">
                                        <p>배송비</p>ㄴ
                                        <p>+ {{formatNumber(order.buy.totalShippingAmount + order.buy.totalShippingCouponDiscountAmount)}}<b>원</b></p>
                                    </li>
                                    <li class="expected-info primary dashed-none"  v-if="order.buy.totalItemCouponDiscountAmount > 0">
                                        <p class="toggle-wrap" @click="toggleInfoPanel('isCoupon')">
                                            쿠폰할인<i class="toggle-arr" :class="{ 'active': isCoupon }"></i></p>
                                        <p>- {{formatNumber(order.buy.totalItemCouponDiscountAmount + order.buy.totalCartCouponDiscountAmount)}}<b>원</b></p>
                                    </li>
                                    <li class="expected-info sub" v-if="isCoupon">
                                        <p>상품 쿠폰</p>
                                        <p>-{{formatNumber(order.buy.totalItemCouponDiscountAmount)}}<b>원</b></p>
                                    </li>
                                    <li class="expected-info primary">
                                        <p>포인트 사용</p>
                                        <p>9,999,999<b>P</b></p>
                                    </li>
                                    <li class="expected-info primary last">
                                        <p>적립 예정 포인트</p>
                                        <p>9,999,999<b>P</b></p>
                                    </li>
                                </ul>

                                <div class="agree-terms" v-if="!isMobile">
                                    <ValidationProvider tag="div" name="terms1" rules="checkbox_order_terms:PRIVACY" v-slot="{ errors }" >
                                        <div class="agree toggle-wrap check-wrap" :class="{ 'active': isAgree }"> <label
                                            class="circle-input-checkbox">
                                            <input type="checkbox" name="terms1" value="PRIVACY" v-model="terms.pc.privacy"><i></i>개인정보 제 3자 제공동의</label>
                                            <div class="toggle-arr" @click="toggleInfoPanel('isAgree')"></div>
                                            <div class="toggle-content">
                                                개인정보 제 3자 제공동의 내용 자리입니다 개인정보 제 3자 제공동의 내용 자리입니다 개인정보 제 3자 제공동의 내용 자리입니다
                                            </div>
                                        </div>
                                    </ValidationProvider>
                                    <ValidationProvider tag="div" name="terms2" rules="checkbox_order_terms:FINAL_CHECK" v-slot="{ errors }" >
                                        <div class="agree check-wrap">
                                            <label class="circle-input-checkbox">
                                                <input type="checkbox" name="terms2" value="FINAL_CHECK" v-model="terms.pc.finalCheck"><i></i>
                                            </label>
                                            주문할 상품의 상품명, 상품가격, 배송정보를 확인하였으며, 구매에 동의 하시겠습니까?
                                        </div>
                                    </ValidationProvider>
                                </div>
                                <button class="btn btn-primary btn-round btn-floating" type="submit">{{formatNumber(order.buy.orderPayAmount)}}원 결제하기</button>
                            </div>
                        </div>
                    </div>
               </div>
            </form>
        </ValidationObserver>

        <!-- 회원의 주소 목록 -->
        <AddressListPopup
            :show="isAddressListPopupActive"
            :buy.sync="buy"
            @close="isAddressListPopupActive = !isAddressListPopupActive"
            @showModalAddAddress="showModalAddAddress"
        />

        <!-- 회원의 주소 추가 창 -->
        <AddressPopup
            :show="isAddressPopupActive"
            @close="isAddressPopupActive = !isAddressPopupActive"
        />

        <!-- 상품 쿠폰 팝업창 -->
        <CouponPopup
            :show="isItemCouponPopupActive"
            :buy="buy"
            :couponInfo="couponInfo"
            :selectedCoupon="selectedCoupon"
            @close="isItemCouponPopupActive = !isItemCouponPopupActive"
            @setCouponDiscountAmount="setCouponDiscountAmount"
        />

        <!-- 구성상품 -->
        <DetailPopup
            :free-gift-item="freeGiftItem"
            :view="isItemDetailPopupActive"
            @close="isItemDetailPopupActive = !isItemDetailPopupActive"/>
    </div>
</template>

<script>

import AddressListPopup from "@/pages/order/popup/address-list.vue";
import AddressPopup from "@/pages/order/popup/address.vue";
import CouponPopup from "@/pages/order/popup/coupon.vue";


import BuyItemList from "@/components/order/buy-item-list.vue";
import ItemPrice from "@/components/order/item-price.vue";
import DetailPopup from "@/pages/cart/popup/detail.vue";

import PaymentCard from "@/pages/order/payment/card.vue"
import PaymentVBank from "@/pages/order/payment/vbank.vue"
import PaymentMobile from "@/pages/order/payment/mobile.vue"
import PaymentRealTimeBank from "@/pages/order/payment/realtimebank.vue"

let $s, vm;

export default {
    components: {DetailPopup, ItemPrice, BuyItemList, AddressListPopup, AddressPopup, CouponPopup, PaymentCard, PaymentVBank, PaymentMobile, PaymentRealTimeBank},
    async asyncData({$salesonApi, $seo, route, $axios, query}) {
       try {
           const tosspayErrorCode = await route.query.tosspayErrorCode;

           const seo = await $seo(route.path, $axios);
           const {data} = await $salesonApi().order.getPaymentStep();

           const snsInfo = await $salesonApi().order.getSnsInfo();
           let snsFlag = snsInfo?.snsFlag ? true : false;

           return {
               seo: seo,
               data: data,
               isSns: snsFlag,
               pgErrorCode: tosspayErrorCode
           }
       } catch (error) {
           // 결제가능 상품이 없을 시
           if (error.response.message.indexOf("결제가능") > -1) {
               this.$saleson.redirect('/');
           } else {
               error(error.response.data);
           }
       }
    },
    head() {
        return {
            seo: vm.seo,
            script: [
                { src: 'https://js.tosspayments.com/v1/payment', body: true },
                { src: '/static/js/pg/op.tosspay.js', body: true },
                { src: 'https://nsp.pay.naver.com/sdk/js/naverpay.min.js', body: true }
            ],
        }
    },
    beforeCreate() {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    data() {
        return {
            isAllPrice: true,
            isCoupon: true,
            isPaymentInfoActive: true,
            isProductInfoActive: true,
            isOrderInfoActive: true,
            isDeliveryInfoActive: true,
            isPointInfoActive: true,
            istargetActive: true,
            istargetOffset: true,
            isTooltipActive: false,
            isAgree: true,
            payType: '',
            paymentMethods: [{
                image: require("~/assets/image/cart/payment_bank_free.svg"),
                alt: "default",
                name: "무통장입금",
                type: "bank",
                class: null
                },
                {
                    image: require("~/assets/image/cart/payment_card.svg"),
                    alt: "default",
                    name: "card",
                    type: "card",
                    class: null
                },
                {
                    image: require("~/assets/image/cart/payment_virtual.svg"),
                    alt: "default",
                    name: "가상계좌",
                    type: "vbank",
                    class: null
                },
                {
                    image: require("~/assets/image/cart/payment_phone.svg"),
                    alt: "default",
                    name: "휴대전화",
                    type: "hp",
                    class: null
                },
                {
                    image: require("~/assets/image/cart/payment_realtime.svg"),
                    alt: "default",
                    name: "실시간 계좌이체",
                    type: "realtimebank",
                    class: null
                }
            ],
            seo: {},
            data: {},
            buy: {},
            cashbillTypes: [],
            receivers: [],
            userSnsInfo: {},
            checkoutSteps:[],

            isLogin: false,
            isSns: false,
            userDeliveryList: [],
            useCoupon: false,
            selectedCoupon: [],
            useEscrow: '',
            autoCashReceipt: '',
            config: {},
            configPg: {},
            pgType: '',
            recentOrderPayment: {},
            order: {
                buy: {
                    orderPayAmount: 0
                },
                pgType: '',
                totalItemPriceByCoupon: 0,
                minimumPaymentAmount: 0,
                pointUseMin: 0,
                pointUseMax: 0,
                pointUseRatio : 0,
                orgReceivers: null,
                useItemCoupons: [],
                useAddItemCoupons: [],
                useCartCoupons: [],
                notMixPayType: [],
                saveReceiverHtml: '',
                orgZipcode: ''
            },
            searchAddress:{
                order: {
                    zipcode: '',
                    newZipcode: '',
                    address: '',
                    addressDetail: '',
                    addressInfo: '',
                    mobile: '',
                    phone: '',
                    email: '',
                },
                receivers:[{
                    zipcode: '',
                    newZipcode: '',
                    address: '',
                    addressDetail: '',
                    addressInfo: '',
                    mobile: '',
                    phone: '',
                    email: '',
                }]
            },
            isUseNpayPayment: false,
            isMobile: false,
            isAddressListPopupActive: false,
            isAddressPopupActive: false,
            isItemDetailPopupActive: false,
            isItemCouponPopupActive: false,

            defaultUserDelivery: {},
            disabled: '',
            submitCheck : false,

            buyItems: [],
            shippingContent: '',
            freeGiftItem: [],
            terms: {
                pc: {
                    privacy: false,
                    finalCheck: false,
                    isAllCheck: false
                },
                mobile: {
                    privacy: false,
                    finalCheck: false,
                    isAllCheck: false
                }
            },
            pgErrorCode: '',
            termsError: '',
            addressList: {},
            couponInfo: [],
            includeTaxFreeItem: false
        };
    },
    async fetch() {
        await this.init();
        await this.paymentInfoInit();
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        toggleInfoPanel(panelName) {
            this[panelName] = !this[panelName];
        },
        handleScroll() {
            const targetElement = this.$refs.targetElement;
            const offsetElement = this.$refs.offsetElement;
            if (!targetElement || !offsetElement) return;
            const rect = targetElement.getBoundingClientRect();
            const rectO = offsetElement.getBoundingClientRect();

            if (rect.top < 100) {
                this.istargetActive = true;
                if (rect.bottom < 1000) {
                    this.istargetOffset = true;
                    // document.querySelector('.floating-aside').style.top = rect.height - rectO.height + 250 + 'px';
                    document.querySelector('.floating-aside').style.top = rect.height - rectO.height + 130 + 'px';
                } else {
                    this.istargetOffset = false;
                    // document.querySelector('.floating-aside').style.top = '25rem';
                    document.querySelector('.floating-aside').style.top = '13rem';
                }
            } else {
                this.istargetActive = false;
            }
        },

        // 모달 관련 메서드
        toggleTooltipActive(isTooltipActive) {
            this.isTooltipActive = !this.isTooltipActive;
        },

        closeTooltipActive(isTooltipActive) {
            this.isTooltipActive = false;
        },
        showModalAddressList() {
            this.isAddressListPopupActive = true;
        },
        showModalAddAddress() {
            this.isAddressListPopupActive = false;
            this.isAddressPopupActive = true;
        },

        showItemCouponPopupActive() {
            this.isItemCouponPopupActive = true;
        },

        async init() {
            this.isLogin = this.$saleson.isLogin();
            this.disabled = this.isLogin ? 'disabled' : '';

            this.buy.failUrl = $s.config.virtualDomain + '/order/step1';
            this.buy.successUrl = $s.config.vi1rtualDomain + '/order/step2';

            let tosspayErrorCode = $s.core.getParameter('tosspayErrorCode');
            if (tosspayErrorCode != '') {
                vm.submitCheck = false;
                let message = '서버 내부 에러가 발생하였습니다. 신속히 조치하겠습니다.';

                if (tosspayErrorCode === 'BAD_REQUEST_PAY_MIN_FAIL') {
                    message = '최소 결제 금액을 확인해주세요.';
                } else if (tosspayErrorCode === 'userCancel') {
                    message = '결제를 취소하셨습니다.';
                } else if (tosspayErrorCode === 'webhookFail') {
                    message = '호출 응답에 실패하였습니다.';
                } else if (tosspayErrorCode === 'paymentTimeExpire') {
                    message = '결제 시간이 초과되었습니다.';
                } else if (tosspayErrorCode === 'OwnerAuthFail') {
                    message = '본인 카드 인증 오류가 발생했습니다.';
                }

                setTimeout(function() {
                    $s.alert(message);
                }, 500);
            }


        },

        paymentInfoInit() {
            this.buy = this.data.buy;
            this.cashbillTypes = this.data.cashbillTypes;
            this.receivers = this.buy.receivers;

            this.useCoupon = this.data.useCoupon;
            this.selectedCoupon = [];
            this.userDeliveryList = this.data.userDeliveryList;
            this.config = this.data.config;
            this.configPg = this.data.configPg;

            this.pgType = this.configPg.pgType;
            this.recentOrderPayment = this.data.recentOrderPayment;

            this.orderInit(this.data.userData);

            if (this.$saleson.isLogin()) {
                this.addressInfoInit();

                if (this.buy.defaultUserDelivery != null) {
                    this.defaultUserDelivery = this.buy.defaultUserDelivery;
                }
            }

            this.isUseNpayPayment = this.data.isUseNpayPayment;


            this.payTypeSelect(this.buy.defaultPaymentType);

            if (this.$saleson.isMobile()) {
                this.isMobile = true;
                this.buy.deviceType = 'MOBILE';
            }

            // 상품 쿠폰 set
            for (let i = 0; i < this.buy.receivers[0].sellerShipping.length; i++) {
                let shippingIndex = this.buy.receivers[0].shippingIndex;
                let sellerShipping = this.buy.receivers[0].sellerShipping[i];

                for (let j = 0; j < sellerShipping.shippings.length; j ++) {
                    vm.selectedCoupon[j] = 'clear';
                    let shipping = sellerShipping.shippings[j];

                    if (shipping.singleShipping) {
                        this.itemCouponSet(shipping.buyItem, shippingIndex);
                    } else {
                        let buyItems = shipping.buyItems;
                        buyItems.forEach(item => {
                            this.itemCouponSet(item, shippingIndex);
                        });
                    }
                }
            }

            this.tossError(this.pgErrorCode);

            this.buy.receivers[0].sellerShipping.forEach((sellerShipping, index) => {
                sellerShipping.shippings.forEach((shipping, shippingIndex) => {
                    if (shipping.singleShipping) {
                        if(shipping.buyItem.taxType === '2') {
                            vm.includeTaxFreeItem = true;
                            return false;
                        }
                    } else {
                        shipping.buyItems.forEach((buyItem, itemIndex) => {
                            if (buyItem.taxType === '2') {
                                vm.includeTaxFreeItem = true;
                                return false;
                            }
                        });
                    }
                });
            });
        },

        itemCouponSet(item, shippingIndex) {
            if (item.itemCoupons !== null && item.setItemFlag != 'Y') {
                let couponIndex = vm.couponInfo.length;
                let itemCoupons = new Array(item.itemCoupons.length);

                for (let i = 0; i < item.itemCoupons.length; i++) {
                    let coupon = item.itemCoupons[i];
                    itemCoupons[i] = {
                        'couponKey': 'item-coupon-' + coupon.couponUserId + '-' + item.itemSequence + '-' + shippingIndex,
                        'couponUserId': coupon.couponUserId,
                        'couponType': 'default',
                        'couponConcurrently': coupon.couponConcurrently,
                        'discountPrice': coupon.discountPrice,
                        'discountAmount': coupon.discountAmount,
                        'couponName': coupon.couponName,
                        'itemSequence': item.itemSequence,
                        'shippingIndex': shippingIndex,
                        'disabled': false,
                        'selected': false,
                        'couponApplyAmount': item.itemPrice.saleAmount - coupon.discountAmount
                    }
                }

                vm.couponInfo[couponIndex] = itemCoupons;
            }
        },

        orderInit(buy) {
            buy = JSON.parse(buy);
            let minimumPaymentAmount = this.config.minimumPaymentAmount;
            let pointUseMin = this.config.pointUseMin;
            let pointUseMax = this.config.pointUseMax;
            let pointUseRatio = this.config.pointUseRatio;
            let pgType = this.pgType;

            this.order.buy = buy;
            this.order.pgType = pgType;
            this.order.totalItemPriceByCoupon = buy.totalItemAmountBeforeDiscounts;

            if (!isNaN(minimumPaymentAmount) == false) {
                minimumPaymentAmount = 0;
            }

            this.order.minimumPaymentAmount = Number(minimumPaymentAmount);

            if (!isNaN(pointUseMin) == false) {
                pointUseMin = 0;
            }

            if (!isNaN(pointUseMax) == false) {
                pointUseMax = 0;
            }

            this.order.notMixPayType = buy.notMixPayType;
            this.order.orgReceivers = buy.receivers;
            this.order.pointUseMin = Number(pointUseMin);
            this.order.pointUseMax = Number(pointUseMax);
            this.order.pointUseRatio = Number(pointUseRatio);
        },

        addressInfoInit() {
            if(!this.isSns) {
                const buyer = this.buy.buyer;

                let addressInfo = '[' + buyer.newZipcode + ']' + buyer.address;
                this.searchAddress.order.addressInfo = addressInfo;

                addressInfo = '[' + this.buy.receivers[0].receiveNewZipcode + ']' + this.buy.receivers[0].receiveAddress;
                this.searchAddress.receivers[0].addressInfo = addressInfo;

                this.searchAddress.order.mobile = buyer.mobile2 + buyer.mobile3;
                this.searchAddress.receivers[0].mobile = this.buy.receivers[0].receiveMobile2 + this.buy.receivers[0].receiveMobile3;
                this.searchAddress.order.phone = buyer.phone2 + buyer.phone3;
                this.searchAddress.order.email = buyer.email;

                if (addressInfo === "" || addressInfo === undefined) {
                    document.getElementById("order_address_placeholder").textContent = "우편번호 찾기";
                    document.getElementById("receive0_address_placeholder").textContent = "우편번호 찾기";
                }
            }
        },

        payTypeSelect(payType) {
            this.payType = payType;
            let payAmount = this.buy.orderPrice.orderPayAmount

            for (let type in this.buy.buyPayments) {
                if (type == payType) {
                    this.buy.buyPayments[type].amount = payAmount;
                } else if (type != 'point') {
                    this.buy.buyPayments[type].amount = 0;
                }
            }
        },

        isNaverPayActive(paymentType) {
            if (paymentType == 'naverpay') {
                if (!this.isUseNpayPayment)
                    return false;
            }

            return true;
        },

        setCouponDiscountAmount(itemCoupons, addItemCoupons, cartCoupons) {
            // 쿠폰 적용 시 포인트 할인금액 초기화
            // 포인트 적용 후 쿠폰적용시 결제 금액이 마이너스가 나오는 경우가 있음
            this.pointUsed(0);

            // 복합 배송 설정때 쿠폰 사용 할인금액을 각각 설정하기 위함
            let order = this.order;
            order.useItemCoupons = itemCoupons;
            order.useAddItemCoupons = addItemCoupons;
            order.useCartCoupon = cartCoupons;

            // 상품 쿠폰 할인액
            let totalItemCouponDiscountAmount = 0;
            let totalItemSaleAmount = 0;

            // 전체 상품쿠폰 할인금액 초기화
            order.buy.totalItemCouponDiscountAmount = 0;

            let couponKeys = [];

            for (let i = 0;i<order.buy.receivers.length;i++) {
                let receiver = order.buy.receivers[i];


                debugger

                for (let j=0;j<receiver.shippingList.length;j++) {
                    let shipping = receiver.shippingList[j];

                    if (shipping.singleShipping) {
                        shipping.buyItem.saleAmount = shipping.buyItem.beforeDiscountAmount;
                        shipping.buyItem.couponDiscountAmount = 0;
                        shipping.buyItem.couponDiscountPrice = 0;

                        let key = this.setItemCouponDiscountAmount(itemCoupons, shipping.buyItem, receiver.shippingIndex);

                        if (key != '') {
                            let isInsert = true;
                            for (let z=0;z<couponKeys.length;z++) {
                                if (couponKeys[z] == key) {
                                    isInsert = false;
                                }
                            }

                            if (isInsert) {
                                couponKeys.push(key);
                            }
                        }

                        key = this.setItemCouponDiscountAmount(addItemCoupons, shipping.buyItem, receiver.shippingIndex);

                        if (key != '') {
                            let isInsert = true;
                            for (let z=0;z<couponKeys.length;z++) {
                                if (couponKeys[z] == key) {
                                    isInsert = false;
                                }
                            }

                            if (isInsert) {
                                couponKeys.push(key);
                            }
                        }

                        totalItemSaleAmount += shipping.buyItem.saleAmount;
                        totalItemCouponDiscountAmount += shipping.buyItem.couponDiscountAmount;

                    } else {
                        for (let k=0;k<shipping.buyItems.length;k++) {
                            let item = shipping.buyItems[k];

                            item.saleAmount = item.beforeDiscountAmount;
                            item.couponDiscountAmount = 0;
                            item.couponDiscountPrice = 0;

                            let key = this.setItemCouponDiscountAmount(itemCoupons, item, receiver.shippingIndex);

                            if (key != '') {
                                let isInsert = true;
                                for (let l=0;l<couponKeys.length;l++) {
                                    if (couponKeys[l] == key) {
                                        isInsert = false;
                                    }
                                }

                                if (isInsert) {
                                    couponKeys.push(key);
                                }
                            }

                            key = this.setItemCouponDiscountAmount(addItemCoupons, item, receiver.shippingIndex);

                            if (key != '') {
                                let isInsert = true;
                                for (let l=0;l<couponKeys.length;l++) {
                                    if (couponKeys[l] == key) {
                                        isInsert = false;
                                    }
                                }

                                if (isInsert) {
                                    couponKeys.push(key);
                                }
                            }

                            totalItemSaleAmount += item.saleAmount;
                            totalItemCouponDiscountAmount += item.couponDiscountAmount;

                        }
                    }

                }
            }
        },

        /**
         * 상품쿠폰 금액 Set
         */
        setItemCouponDiscountAmount(itemCoupons, item, shippingIndex) {
            let order = this.order;
            let itemSequence = item.itemSequence;


            debugger
            // 상품쿠폰 사용 처리
            let coupon = this.getItemCoupon(itemCoupons, itemSequence, shippingIndex);
            let couponKey = '';

            if (coupon != null) {
                item.couponDiscountPrice += coupon.discountPrice;
                item.couponDiscountAmount += coupon.discountAmount;

                item.saleAmount = item.beforeDiscountAmount - item.couponDiscountAmount;
                order.buy.totalItemCouponDiscountAmount = item.couponDiscountAmount;
                couponKey = coupon.key;
            }

            return couponKey;
        },

        /**
         * 상품별 사용 쿠폰 리턴
         */
        getItemCoupon(itemCoupons, itemSequence, shippingIndex) {
            if (itemCoupons.length > 0) {
                for(let i = 0; i < itemCoupons.length; i++) {
                    let coupon = itemCoupons[i];

                    if (coupon.itemSequence == itemSequence && coupon.shippingIndex == shippingIndex) {
                        return coupon;
                    }
                }
            }

            return null;
        },

        pointUsed(usePoint) {
            this.setPointDiscountAmount(usePoint);
            this.setAmountText();
        },

        setPointDiscountAmount (usePoint) {
            let order = this.order;

            if (typeof(usePoint) == 'number') {

                let retentionPoint = order.buy.retentionPoint;

                retentionPoint = parseInt(retentionPoint);
                usePoint = parseInt(usePoint);
                if (retentionPoint == 0) {
                    order.buy.totalPointDiscountAmount = 0;
                }

                if (retentionPoint < usePoint) {
                    usePoint = retentionPoint;
                }

                // 이미 적용된 포인트 금액은 더해서 계산함
                let orderPayAmount = order.buy.orderPayAmount + order.buy.totalPointDiscountAmount;

                let ratioPointAmount = Math.floor((orderPayAmount/100)*order.pointUseRatio);

                if (orderPayAmount - order.minimumPaymentAmount < usePoint) {
                    usePoint = orderPayAmount - order.minimumPaymentAmount;
                }

                if(usePoint > ratioPointAmount){
                    usePoint = ratioPointAmount;
                }

                if (usePoint < 0) {
                    usePoint = 0;
                }

                if (order.pointUseMin > usePoint) {
                    usePoint = 0;
                }

                if (order.pointUseMax > 0) {
                    if (order.pointUseMax < usePoint) {
                        usePoint = order.pointUseMax;
                    }
                }

                if (usePoint > 0) {
                    // 100원단위 사용 가능
                    usePoint = Math.floor(usePoint * 0.01) * 100;
                }

                order.buy.totalPointDiscountAmount = usePoint;

                return;

            }

            order.buy.totalPointDiscountAmount = 0;
        },

        /**
         * 가격정보를 세팅
         */
        setAmountText(isClear) {

            let order = this.order;
            if (isClear == undefined) {
                isClear = true;
            }

            let totalItemQuantities = 0;

            // 적립 예정 포인트에 쿠폰 사용금액을 차감후 계산하는 경우
            if (order.buy.isPointApplyCouponDiscount == true) {
                order.buy.totalEarnPoint = 0;
            }

            let tempItems = this.getTotalItems();

            console.log(tempItems);

            for (let i=0;i<tempItems.length;i++) {
                totalItemQuantities = tempItems[i].quantity;
                this.setItemAmountText(tempItems[i]);
            }

            // 배송비를 정책별로 합산한다. <상품 목록에 데이터 갱신용!!>
            let groupShippings = [];

            for (let i=0;i<order.buy.receivers.length;i++) {
                for (let j=0;j<order.buy.receivers[i].shippingList.length;j++) {
                    let shipping = order.buy.receivers[i].shippingList[j];
                    let realShipping = Number(shipping.realShipping);
                    let isSet = false;

                    if (groupShippings.length > 0) {
                        for (let j=0;j<groupShippings.length;j++) {

                            if (groupShippings[j].shippingSequence == shipping.shippingSequence) {
                                groupShippings[j].realShipping += realShipping;
                                isSet = true;
                            }
                        }
                    }

                    if (isSet == false) {
                        let tempShipping = {
                            'shippingSequence'		: shipping.shippingSequence,
                            'realShipping'			: realShipping,
                            'shippingPaymentType'	: shipping.shippingPaymentType
                        }

                        groupShippings.push(tempShipping);
                    }
                }
            }

            for (let i=0;i<groupShippings.length;i++) {
                let shipping = groupShippings[i];
                let realShipping = this.formatNumber(shipping.realShipping) + '원';

                if (shipping.shippingPaymentType == '2') {
                    realShipping += '(착불)';
                }

                if (shipping.realShipping == 0) {
                    realShipping = "무료배송";
                }

            }

            let totalItemDiscountAmount = order.buy.totalItemDiscountAmount;
            let totalUserLevelDiscountAmount = order.buy.totalUserLevelDiscountAmount;
            let totalItemCouponDiscountAmount = order.buy.totalItemCouponDiscountAmount;
            let totalCartCouponDiscountAmount = order.buy.totalCartCouponDiscountAmount;
            let totalPointDiscountAmount = order.buy.totalPointDiscountAmount;
            let totalShippingCouponDiscountAmount = order.buy.totalShippingCouponDiscountAmount;
            let totalCouponDiscountAmount = totalItemCouponDiscountAmount + totalCartCouponDiscountAmount;
            let totalDiscountAmount = totalItemDiscountAmount + totalUserLevelDiscountAmount + totalItemCouponDiscountAmount + totalCartCouponDiscountAmount + totalPointDiscountAmount + totalShippingCouponDiscountAmount;


            // 상품 쿠폰 할인 금액
            // $('.op-total-item-coupon-discount-amount-text').html(Common.numberFormat(totalItemCouponDiscountAmount));

            // 할인 안된 금액
            // let noDiscountOrderPayAmount = Order.buy.totalItemAmountBeforeDiscounts + Order.buy.totalShippingAmount;
            // $('.op-noDiscount-order-pay-amount-text').html(Common.numberFormat(noDiscountOrderPayAmount));

            // 장바구니 쿠폰 할인 금액
            // $('.op-total-cart-coupon-discount-amount-text').not('input').html(Common.numberFormat(totalCartCouponDiscountAmount));

            // 전체 쿠폰 할인 금액
            order.buy.totalCouponDiscountAmount = totalCouponDiscountAmount;

            // 포인트 금액

            // 배송비 할인액
            // $('.op-total-shipping-coupon-discount-amount-text').not('input').html(Common.numberFormat(totalShippingCouponDiscountAmount));
            // $('input.totalShippingCouponUseCountText').val(Common.numberFormat(Order.buy.totalShippingCouponUseCount));

            // 전체 할인 금액
            order.buy.totalDiscountAmount = totalDiscountAmount;

            // 결제금액 계산
            this.setOrderPayAmount(isClear);

            // 결제 금액


            // 총 적립 금액
        },

        /**
         * 상품 금액 View처리
         */
        setItemAmountText(item) {


            debugger
            // 상품 토탈 할인 금액 (스팟, 즉시, 쿠폰)
            let itemDiscountAmount = item.discountAmount;

            if (item.couponDiscountAmount > 0) {
                itemDiscountAmount += item.couponDiscountAmount
            }
            let itemDiscountAmountText = this.formatNumber(itemDiscountAmount) + "원";
            let itemPayAmountText = this.formatNumber(item.saleAmount);

            // 포인트 금액을 반영하는 경우
            if (item.isPointApplyCouponDiscount == true) {

                let itemEarnPoint = 0;

                // 기본 포인트
                if (Number(item.point) > 0) {
                    if (item.pointType == '1') {

                        itemEarnPoint += Math.floor(Number(item.sumPrice - item.couponDiscountPrice) * (Number(item.point) / 100));
                    } else {
                        // CJH 2016.11.12 금액으로 지정되어있으면?
                    }
                }

                // 회원 포인트
                if (Number(item.userLevelPointRate > 0)) {
                    itemEarnPoint += Math.floor(Number(item.sumPrice - item.couponDiscountPrice) * (Number(item.userLevelPointRate) / 100));
                }

                this.order.buy.totalEarnPoint += Number(itemEarnPoint * item.quantity);
            }
        },

        getTotalItems() {
            let order = this.order;
            let tempItems = [];

            for (let i=0;i<order.buy.receivers.length;i++) {
                let receiver = order.buy.receivers[i];

                for (let j=0;j<receiver.shippingList.length;j++) {
                    let shipping = receiver.shippingList[j];
                    if (shipping.singleShipping) {
                        let quantity = shipping.buyItem.quantity;

                        let isSet = false;
                        if (tempItems.length > 0) {
                            for (let k=0;k<tempItems.length;k++) {
                                let tempItem = tempItems[k];

                                if (tempItem.itemSequence == shipping.buyItem.itemSequence) {
                                    quantity = Number(quantity) + Number(tempItem.quantity);

                                    tempItems[k] = {
                                        'itemSequence'					: tempItem.itemSequence,
                                        'couponDiscountPrice'			: tempItem.couponDiscountPrice,
                                        'couponDiscountAmount'			: Number(tempItem.couponDiscountAmount),
                                        'quantity'						: quantity,
                                        'beforeDiscountAmount'			: Number(tempItem.sumPrice) * quantity,
                                        'saleAmount'					: (Number(tempItem.sumPrice) * quantity) - (Number(tempItem.couponDiscountAmount)),
                                        'sumPrice'						: tempItem.sumPrice,
                                        'itemName'						: tempItem.itemName,
                                        'itemUserCode'					: tempItem.itemUserCode,
                                        'optionText'					: tempItem.optionText,
                                        'itemImageSrc'					: tempItem.itemImageSrc,
                                        'shipmentGroupType'				: tempItem.shipmentGroupType,
                                        'isPointApplyCouponDiscount'	: tempItem.isPointApplyCouponDiscount,
                                        'pointType'						: tempItem.pointType,
                                        'point'							: tempItem.point,
                                        'userLevelPointRate'			: tempItem.userLevelPointRate,

                                        'itemSaleAmount'				: tempItem.itemSaleAmount,
                                        'baseAmountForShipping'			: tempItem.baseAmountForShipping,
                                        'discountAmount'				: tempItem.discountAmount,
                                        'itemDiscountAmount'			: tempItem.itemDiscountAmount,
                                        'userLevelDiscountAmount'		: tempItem.userLevelDiscountAmount
                                    };

                                    isSet = true;
                                }
                            }
                        }

                        if (isSet == false) {
                            let tempItem = {
                                'itemSequence'					: shipping.buyItem.itemSequence,
                                'couponDiscountPrice'			: shipping.buyItem.couponDiscountPrice,
                                'couponDiscountAmount'			: Number(shipping.buyItem.couponDiscountAmount),
                                'quantity'						: quantity,
                                'beforeDiscountAmount'			: Number(shipping.buyItem.sumPrice) * quantity,
                                'saleAmount'					: (Number(shipping.buyItem.sumPrice) * quantity) - (Number(shipping.buyItem.couponDiscountAmount)),
                                'sumPrice'						: shipping.buyItem.sumPrice,
                                'itemName'						: shipping.buyItem.itemName,
                                'itemUserCode'					: shipping.buyItem.itemUserCode,
                                'optionText'					: shipping.buyItem.optionText,
                                'itemImageSrc'					: shipping.buyItem.itemImageSrc,
                                'shipmentGroupType'				: shipping.buyItem.shipmentGroupType,
                                'isPointApplyCouponDiscount'	: shipping.buyItem.isPointApplyCouponDiscount,
                                'pointType'						: shipping.buyItem.pointType,
                                'point'							: shipping.buyItem.point,
                                'userLevelPointRate'			: shipping.buyItem.userLevelPointRate,

                                'itemSaleAmount'				: shipping.buyItem.itemSaleAmount,
                                'baseAmountForShipping'			: shipping.buyItem.baseAmountForShipping,
                                'discountAmount'				: shipping.buyItem.discountAmount,
                                'itemDiscountAmount'			: shipping.itemDiscountAmount,
                                'userLevelDiscountAmount'		: shipping.userLevelDiscountAmount
                            };
                            tempItems.push(tempItem);
                        }
                    } else {
                        for (let k=0;k<shipping.buyItems.length;k++) {
                            let item = shipping.buyItems[k];
                            let quantity = item.quantity;
                            let isSet = false;

                            if (tempItems.length > 0) {
                                for (let l=0;l<tempItems.length;l++) {
                                    let tempItem = tempItems[l];
                                    if (tempItem.itemSequence == item.itemSequence) {
                                        quantity = Number(quantity) + Number(tempItem.quantity);
                                        tempItems[l] = {
                                            'itemSequence'					: tempItem.itemSequence,
                                            'couponDiscountPrice'			: tempItem.couponDiscountPrice,
                                            'couponDiscountAmount'			: Number(tempItem.couponDiscountAmount),
                                            'quantity'						: quantity,
                                            'beforeDiscountAmount'			: Number(tempItem.sumPrice) * quantity,
                                            'saleAmount'					: (Number(tempItem.sumPrice) * quantity) - (Number(tempItem.couponDiscountAmount)),
                                            'sumPrice'						: tempItem.sumPrice,
                                            'itemName'						: tempItem.itemName,
                                            'itemUserCode'					: tempItem.itemUserCode,
                                            'optionText'					: tempItem.optionText,
                                            'itemImageSrc'					: tempItem.itemImageSrc,
                                            'shipmentGroupType'				: tempItem.shipmentGroupType,
                                            'isPointApplyCouponDiscount'	: tempItem.isPointApplyCouponDiscount,
                                            'pointType'						: tempItem.pointType,
                                            'point'							: tempItem.point,
                                            'userLevelPointRate'			: tempItem.userLevelPointRate,

                                            'itemSaleAmount'				: tempItem.itemSaleAmount,
                                            'baseAmountForShipping'			: tempItem.baseAmountForShipping,
                                            'discountAmount'				: tempItem.discountAmount,
                                            'itemDiscountAmount'			: tempItem.itemDiscountAmount,
                                            'userLevelDiscountAmount'		: tempItem.userLevelDiscountAmount
                                        };
                                        isSet = true;
                                    }
                                }
                            }

                            if (isSet == false) {
                                let tempItem = {
                                    'itemSequence'					: item.itemSequence,
                                    'couponDiscountPrice'			: item.couponDiscountPrice,
                                    'couponDiscountAmount'			: Number(item.couponDiscountAmount),
                                    'quantity'						: quantity,
                                    'beforeDiscountAmount'			: Number(item.sumPrice) * quantity,
                                    'saleAmount'					: (Number(item.sumPrice) * quantity) - (Number(item.couponDiscountAmount)),
                                    'sumPrice'						: item.sumPrice,
                                    'itemName'						: item.itemName,
                                    'itemUserCode'					: item.itemUserCode,
                                    'optionText'					: item.optionText,
                                    'itemImageSrc'					: item.itemImageSrc,
                                    'shipmentGroupType'				: item.shipmentGroupType,
                                    'isPointApplyCouponDiscount'	: item.isPointApplyCouponDiscount,
                                    'pointType'						: item.pointType,
                                    'point'							: item.point,
                                    'userLevelPointRate'			: item.userLevelPointRate,

                                    'itemSaleAmount'				: item.itemSaleAmount,
                                    'baseAmountForShipping'			: item.baseAmountForShipping,
                                    'discountAmount'				: item.discountAmount,
                                    'itemDiscountAmount'			: item.itemDiscountAmount,
                                    'userLevelDiscountAmount'		: item.userLevelDiscountAmount
                                };

                                tempItems.push(tempItem);
                            }
                        }
                    }
                }
            }

            return tempItems;
        },

        /**
         * 결제금액 계산
         *
         */
        setOrderPayAmount(isClear) {
            let order = this.order;
            let orderPrice = this.buy.orderPrice;
            let orderPayAmount = order.buy.totalItemSaleAmount + order.buy.totalShippingAmount - order.buy.totalCartCouponDiscountAmount - order.buy.totalPointDiscountAmount;
            order.buy.orderPayAmount = orderPayAmount;

            this.order = order;

            if (isClear == true) {
                // this.setOrderPayAmountClear();
            }

            orderPrice.totalItemSaleAmount = order.buy.totalItemSaleAmount;
            orderPrice.totalItemCouponDiscountAmount = order.buy.totalItemCouponDiscountAmount;
            orderPrice.totalCartCouponDiscountAmount = order.buy.totalCartCouponDiscountAmount;
            orderPrice.totalPointDiscountAmount = order.buy.totalPointDiscountAmount;
            orderPrice.totalUserLevelDiscountAmount = order.buy.totalUserLevelDiscountAmount;
            orderPrice.totalShippingAmount = order.buy.totalShippingAmount;
            orderPrice.orderPayAmount = orderPayAmount;

            let useCouponKeys = new Array();

            for (let i = 0; i < this.selectedCoupon.length; i++) {
                let selectedCoupon = this.selectedCoupon[i];

                if (selectedCoupon == 'clear') {
                    if (this.buy.useCouponKeys !== null) {
                        this.buy.useCouponKeys.splice(i, 1);
                    }
                    continue;
                }

                useCouponKeys.push(selectedCoupon.couponKey);
                this.buy.useCouponKeys = useCouponKeys;

            }

            if (vm.buy.isLogin) {
                // 배송비쿠폰 할인 적용
                this.buy.buyPayments['point'].amount = order.buy.totalPointDiscountAmount;
            }

        },

        async submit(validate) {
            const isValid = await validate();
            if (isValid) {
                if (Object.keys(TossPay.TOSS_PAYMENTS).length == 0) {
                    TossPay.TOSS_PAYMENTS = TossPayments($s.config.tosspayClientKey);
                    TossPay.data.VALIDHOURS = vm.config.bankDepositDueDay;
                }

                vm.payTypeSelect(vm.payType);

                let campaignCode = $s.core.getState($s.const.CAMPAIGN_CODE);
                vm.buy.campaignCode = campaignCode;

                if (vm.shippingContent != ''){
                    vm.buy.receivers[0].content = vm.shippingContent;
                }

                if (vm.payType === 'bank') {
                    let array = [];
                    array[0] = vm.buy.buyPayments[`${this.payType}`].bankExpirationDate

                    vm.buy.buyPayments[`${this.payType}`].bankExpirationDate = array;
                }

                if(!vm.submitCheck){
                    try {
                        let response = await this.$salesonApi().order.saveOrder(vm.buy);
                        let data = response.data.data;

                        if (response.status != 200) {
                            throw new Error("상품주문을 실패하였습니다. ")
                        } else {

                            debugger
                            // 결제 진행 중 여부 한 번 더 체크 (포인트로만 결제 시 결제하기 버튼 연속으로 클릭하면 중복 결제되는 이슈 있음)
                            if (vm.submitCheck) {
                                $s.alert("결제가 진행중입니다.");
                                return false;
                            }

                            vm.submitCheck = true;

                            let orderCode = data.orderCode;
                            document.getElementById('orderCode').value = orderCode;
                            vm.encryptedString = response.data.encryptedString;
                            if (vm.getApprovalType(data.savePaymentType, 'naverpay')) {

                                if (vm.order.buy.orderPayAmount < 100) {
                                    vm.$saleson.alert("총 결제금액이 100원 미만일 경우 네이버페이를 이용 할 수 없습니다.");
                                    return false;
                                }


                                let oPay = Naver.Pay.create({
                                    "mode": "production",
                                    "clientId": vm.buy.buyPayments['naverpay'].mid,
                                    "openType": "page"
                                });

                                let returnParam = '?orderCode=' + orderCode + '&amount='
                                    + response.data.naverpay.totalPayAmount + '&encryptedString='
                                    + vm.encryptedString;
                                oPay.open({
                                    "returnUrl": $s.config.apiDomain + '/api/order/naverpay/payment'
                                        + returnParam,
                                    "merchantPayKey": response.data.orderCode,
                                    "productName": response.data.naverpay.productName,
                                    "totalPayAmount": response.data.naverpay.totalPayAmount,
                                    "taxScopeAmount": response.data.naverpay.taxScopeAmount,
                                    "taxExScopeAmount": response.data.naverpay.taxExScopeAmount,
                                    "productItems": response.data.naverpay.productItems,
                                    "deliveryFee": vm.order.buy.totalShippingAmount,
                                    "productCount": response.data.naverpay.productCount
                                });

                            }

                            if (vm.getApprovalType(data.savePaymentType, 'bank')
                                || vm.order.buy.orderPayAmount === 0) {

                                let formData = new FormData();
                                formData.append('orderCode', document.getElementsByName('orderCode')[0].value);
                                let payResponse = await this.$salesonApi().order.setOrderPay(formData);

                                if (payResponse.status == 200) {
                                    let url = '/order/step2?orderSequence=' + payResponse.data.orderSequence
                                        + '&orderCode=' + payResponse.data.orderCode;

                                    this.$saleson.redirect(url);
                                } else {
                                    throw new Error('상품주문을 실패하였습니다. ');
                                }
                            } else {
                                // pg
                                const pgData = data.pgData;

                                for (const key in pgData) {
                                    const input = document.querySelector('.toss-input-area > input[name="' + key + '"]');
                                    if (input) {
                                        input.value = pgData[key];
                                    }
                                }

                                // 현금영수증 미발행
                                TossPay.data.CASH_RECEIPT_TYPE = "미발행";

                                TossPay.data.CHECKED_TYPE = vm.payType;
                                TossPay.data.ADD_SUC_PARAM = '?encryptedString=' + vm.encryptedString;
debugger
                                TossPay.module().pay(pgData, function (data) {
                                    debugger
                                    vm.submitCheck = false;
                                    TossPay.module().error(data);
                                });
                                debugger
                            }

                        }

                    } catch (error) {
                        vm.submitCheck = false;
                        console.log(error);
                    }
                } else {
                    $s.alert("결제가 진행중입니다.");
                    return false;
                }
            } else {
                this.termsAgreeCheck();
            }
        },

        termsAgreeCheck() {
            const terms1 = this.$refs.observer.refs['terms1'];
            const terms2 = this.$refs.observer.refs['terms2'];

            let termsValid = terms1.errors[0] != undefined || terms2.errors[0] != undefined;
            if (termsValid) {
                let message = '';
                if (terms1.errors[0] != undefined && terms2.errors[0] != undefined) {
                    message = terms1.errors[0]; // 우선 terms1의 오류 메시지를 사용
                } else if (terms1.errors[0] != undefined) {
                    message = terms1.errors[0];
                } else {
                    message = terms2.errors[0];
                }

                this.$saleson.alert(message);
            }
        },

        getApprovalType(array, type) {
            let approvalType = '';
            for (let i = 0; i < array.length; i++) {
                if (array[i] == type) {
                    approvalType = array[i];
                    return true;
                }
                return (approvalType == "" ? false : true);
            }
        },

        tossError(data) {
            // if (data != null && data != ''){
            //     if (TossPay.module().getErrorMsg(data) != null){
            //         this.$saleson.alert(TossPay.module().getErrorMsg(data), function(){
            //             history.replaceState({}, null, location.pathname);
            //         });
            //     }
            //     if (data != null && data != '') {
            //         if (data == 'BELOW_MINIMUM_AMOUNT') {
            //             this.$saleson.alert("신용카드는 100원, 계좌는 200원 이상부터 결제 가능합니다.");
            //         }
            //         history.replaceState({}, null, location.pathname);
            //     }
            // }
        },

        async getFreegiftItemPopup(id){
            try {
                const {data} = await this.$salesonApi().order.getFreegiftItemByCartId(id);

                this.freeGiftItem = data.buyItems;

                if (this.freeGiftItem != null) {
                    this.isItemDetailPopupActive = true;
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.error(error);
            }
        },

    },
};
</script>



<style lang="scss">
@import "~/assets/scss/pages/cart/cart.scss";
@import "~/assets/scss/pages/cart/cart-modal.scss";
@import "~/assets/scss/pages/items/item_list.scss";
</style>