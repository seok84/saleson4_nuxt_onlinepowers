<template>
    <section class="mypage-order mypage-order-detail">
        <div class="title-container">
            <h2 class="title-h2">주문/배송 상세조회</h2>
            <button type="button" class="btn btn-default btn-middle btn-action" onclick="window.print()">화면출력</button>
        </div>
        <h2 class="title-h2 print">주문/배송 상세조회</h2>
        <!-- // 주문 내역 -->
        <div class="order-item-wrapper">
            <!-- 복수 아이템 -->
            <div class="order-item">
                <div class="info">
                    <span class="date">{{dateFormat(order.result.createdDate)}}</span>
                    <span class="detail">
                        <span>주문번호</span><span>{{order.result.orderCode}}</span>
                    </span>
                </div>
                <div class="order-status">
                    <template v-for="(data, index) in order.result.item">
                        <OrderItem
                            :order-code="order.result.orderCode"
                            :item="data" @orderPopup="orderPopup" @deliveryLink="deliveryLink"
                        />
                    </template>
                </div>
            </div>
        </div>
        <div class="order-info">
            <!-- //배송지 정보 -->
            <h3 class="content-title"><i class="ico"><img src="~/assets/image/ico/ico_location.svg" alt="배송지 정보"></i>배송지
                정보
            </h3>
            <div class="content-table list">
                <table>
                    <tr>
                        <th>받는 분</th>
                        <td>{{order.result.shippingInfo.receiveName}}</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>[{{order.result.shippingInfo.receiveNewZipcode}}] {{order.result.shippingInfo.receiveAddress}} {{order.result.shippingInfo.receiveAddressDetail}}</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>{{order.result.shippingInfo.receiveMobile}}</td>
                    </tr>
                    <tr>
                        <th>배송메세지</th>
                        <td>{{order.result.shippingInfo.memo}}</td>
                    </tr>
                </table>
            </div>
            <!-- //주문자 정보 -->
            <h3 class="content-title"><i class="ico"><img src="~/assets/image/ico/ico_user.svg" alt="주문자 정보"></i>주문자 정보
            </h3>
            <div class="content-table list">
                <table>
                    <tr>
                        <th>이름</th>
                        <td>{{order.result.userName}}</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>{{order.result.mobile}}</td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td>{{order.result.email}}</td>
                    </tr>
                </table>
            </div>
            <!-- 결제정보 -->
            <h3 class="content-title"><i class="ico"><img src="~/assets/image/ico/ico_money.svg" alt="결제정보"></i>결제정보
            </h3>
            <div class="payment">
                <div class="payment-info content-table">
                    <dl class="sub-title">
                        <dt>총 상품금액</dt>
                        <dd><span>{{formatNumber(order.result.totalItemAmount)}}</span>원</dd>
                    </dl>
                    <dl class="sub">
                        <dt>상품할인</dt>
                        <dd><span>{{formatNumber(order.result.totalItemDiscountAmount)}}</span>원</dd>
                    </dl>
                    <dl class="sub">
                        <dt>세트할인</dt>
                        <dd><span>{{formatNumber(order.result.totalSetDiscountAmount)}}</span>원</dd>
                    </dl>
                    <dl class="sub">
                        <dt>회원할인(FAMILY)</dt>
                        <dd><span>{{ formatNumber(order.result.totalUserLevelDiscountAmount) }}</span>원</dd>
                    </dl>
                    <dl class="title">
                        <!-- //배송비 -->
                        <dt>배송비</dt>
                        <dd><span>{{formatNumber(order.result.totalShippingAmount)}}</span>원</dd>
                    </dl>
                    <dl class="sub-title">
                        <dt>쿠폰할인</dt>
                        <dd><span>{{formatNumber(order.result.totalCouponDiscountAmount)}}</span>원</dd>
                    </dl>
                    <dl class="sub">
                        <dt>상품쿠폰</dt>
                        <dd><span>{{formatNumber(order.result.totalCouponDiscountAmount)}}</span>원</dd>
                    </dl>
                    <dl class="title">
                        <dt>포인트 사용</dt>
                        <dd><span>{{order.result.orderUsePoint}}</span>P</dd>
                    </dl>
                    <dl class="title total">
                        <dt>총 결제금액</dt>
                        <dd><b>{{formatNumber(order.result.totalOrderAmount)}}</b>원</dd>
                    </dl>
                </div>
                <div class="payment-method content-table">
                    <template v-for="(payment, index) in order.result.paymentList">
                        <dl>
                            <dt>
                                <p>
                                    <strong>{{payment.approvalTypeLabel}}</strong>
                                    <template v-if="payment.payDate == null">
                                        <span class="status waiting">입금대기</span>
                                    </template>
                                    <template v-else>
                                        <span class="status complete" v-if="payment.paymentType == '1'">결제완료</span>
                                        <span class="status cancel" v-else>결제취소</span>
                                        <button type="button" class="btn-recipe" @click="receiptIssuance" v-if="order.result.receipt != null">영수증 보기</button>
                                    </template>
                                </p>
                                <p class="amount"><b>{{payment.amount}}</b>원</p>
                            </dt>
                            <template v-if="payment.payDate != null">
                                <dd>
                                    <p class="date">{{dateFormat(payment.payDate)}}</p>
                                </dd>
                            </template>
                            <template v-if="payment.bankVirtualNo != null">
                                <dd class="deposit-table">
                                    <table>
                                        <tr>
                                            <th>계좌</th>
                                            <td>{{payment.bankVirtualNo}}</td>
                                        </tr>
                                        <tr>
                                            <th>예금주</th>
                                            <td>{{payment.bankInName}}</td>
                                        </tr>
                                        <tr>
                                            <th>금액</th>
                                            <td>{{formatNumber(payment.amount)}}원</td>
                                        </tr>
                                        <tr>
                                            <th>입금기한</th>
                                            <td>{{dateFormat(payment.bankDate, 'date')}}</td>
                                        </tr>
                                    </table>
                                </dd>
                            </template>
                        </dl>
                    </template>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-large btn-primary-line btn-round btn-back print-none" @click="getOrderList">목록으로</button>

        <!-- 구매확정 모달 -->
        <modal-default :class="{'show': modal.confirmShow, 'modal-product': true}" :title="'구매확정'" :bodyClass="'p-2'" @modalClose="modal.confirmShow=false">
            <form @submit.prevent="reviewProcess">
                <p class="buy-confirm-txt">
                    <strong>구매확정해 주셔서 감사합니다.</strong>
                    <span>
                        지금 바로 고객님의 소중한 후기를 남겨주세요.<br />
                        작성해 주시는 이용후기는 다른 분의 쇼핑에 소중한 정보가 됩니다.
                    </span>
                </p>

                <!-- 아이템 영역 -->
                <PopupItem v-bind="reviewProp" />
                <span class="article-divider"></span>
                <p class="eval-txt">상품은 어떠셨나요?</p>
                <div class="score-wrap">
                        <span v-for="(data, index) in popup.reviewInfo.stars"
                              :class="['star', { active : index < activeStar }]"
                              @click="checkActiveStar(index + 1)" />
                </div>
                <textarea cols="30" rows="10" class="form-basic text-area"
                          placeholder="내용을 입력하세요" v-model="popup.reviewInfo.param.content"></textarea>
                <label for="reviewFile" class="btn btn-default btn-add-photo">
                    <input type="file" id="reviewFile" class="hidden" @change="fileSelect($event, 'review')" multiple>
                    <img src="~/assets/image/ico/ico_camera.svg" alt="사진 첨부하기" class="ico"><span>사진 첨부하기</span>
                    <span class="benefit-balloon">포토후기 +2,000P</span>
                </label>
                <ul class="photo-list">
                    <li class="photo-item" v-for="(file, index) in popup.reviewInfo.param.files" :key="index">
                        <img :src="popup.reviewInfo.param.fileImages[index]" alt="fileName" class="thumbnail">
                        <button type="button" class="btn-delete" @click="fileDelete(index, 'review')"></button>
                    </li>
                </ul>
                <ul class="dot-list large-dot">
                    <li>5MB 이하의 사진 4장까지 첨부 가능</li>
                    <li>이용후기는 구매확정 된 상품에 한하여 주문일로부터 90일내 작성 가능합니다.</li>
                    <li><em>일반후기 1,000P / 포토후기 2,000P</em> 적립해드립니다.</li>
                </ul>
                <div class="link-wrap">
                    <button type="submit" class="btn btn-primary link-item w-half">등록</button>
                    <button type="button" class="btn btn-default link-item w-half"
                            @click="modal.reviewShow=false">취소</button>
                </div>
            </form>
        </modal-default>

        <!-- 반품신청 모달 -->
        <modal-default :class="{'show':modal.returnShow}" :title="'반품신청'" :bodyClass="'p-2 type-return'" @modalClose="modal.returnShow=false" class="modal-product">
            <ValidationObserver ref="observer" v-slot="{ validate }">
                <form @submit.prevent="returnProcess(validate)">
                    <PopupItem v-bind="returnProp"
                               :type="'return'"
                               @apply-quantity="updateApplyQuantity"
                    />
                    <div class="article-divider"></div>
                    <!-- 취소사유 -->
                    <h3 class="form-title">반품사유</h3>
                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="select-wrap">
                        <select class="input-select" @change="claimChange($event, 'return')" v-model="popup.returnInfo.param.claimReasonText">
                            <option disabled value="">반품 사유를 선택하세요</option>
                            <option :value="claim.label" :class="claim.id" v-for="claim in popup.returnInfo.result.claimReasons">
                                {{ claim.label }}
                            </option>
                        </select>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line" v-show="popup.returnInfo.param.claimReasonTextShow">
                        <input type="text" class="form-basic" placeholder="반품 사유를 입력하세요" v-model="popup.returnInfo.param.claimReasonText" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <label for="returnFile" class="btn btn-default btn-add-photo">
                        <input type="file" id="returnFile" class="hidden" @change="fileSelect($event, 'return')" multiple>
                        <img src="~/assets/image/ico/ico_camera.svg" alt="사진 첨부하기" class="ico"><span>사진 첨부하기</span>
                    </label>
                    <ul class="photo-list">
                        <li class="photo-item" v-for="(file, index) in popup.returnInfo.param.files" :key="index">
                            <img :src="popup.returnInfo.param.fileImages[index]" alt="fileName" class="thumbnail">
                            <button type="button" class="btn-delete" @click="fileDelete(index, 'return')"></button>
                        </li>
                    </ul>
                    <ul class="dot-list large-dot">
                        <li>5MB 이하의 사진 4장까지 첨부 가능</li>
                    </ul>
                    <!-- 반송방법 -->
                    <h3 class="form-title">반송 송장 정보 </h3>
                    <div class="radio-wrap">
                        <label class="input-radio">
                            <input type="radio" v-model="popup.returnInfo.param.returnShippingAskType" value="1"><i></i>회수요청
                        </label>
                        <label class="input-radio">
                            <input type="radio" v-model="popup.returnInfo.param.returnShippingAskType" value="2"> <i></i>직접발송
                        </label>
                    </div>
                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" v-if="popup.returnInfo.param.returnShippingAskType == '2'">
                        <div class="form-line package" v-show="popup.returnInfo.param.returnShippingAskType != '1'">
                            <div class="flex">
                                <div class="select-wrap">
                                    <select class="input-select" v-model="popup.returnInfo.param.deliveryCompanyName">
                                        <option value="">선택</option>
                                        <option v-for="data in popup.returnInfo.result.deliveryCompanyList" :value="data.deliveryCompanyName" v-if="data.useFlag == 'Y'">
                                            {{data.deliveryCompanyName}}
                                        </option>
                                    </select>
                                </div>
                                <input type="text" class="form-basic" placeholder="송장번호" v-model="popup.returnInfo.param.returnShippingNumber">
                            </div>
                        </div>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="홍길동" v-model="returnApplyProp.returnReserveName" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="'-'없이 번호만 입력" v-model="returnApplyProp.returnReserveMobile" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <div class="flex">
                            <input type="text" class="form-basic" placeholder="우편번호 찾기" readonly v-model="returnApplyProp.returnReserveZipcode"/>
                            <button type="button" class="btn btn-black" @click="openDaumPostcode('return')">우편번호</button>
                        </div>
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="기본주소" readonly v-model="returnApplyProp.returnReserveAddress" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="상세주소" v-model="returnApplyProp.returnReserveAddress2" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <!-- 환불정보 -->
                    <div class="return-content">
                        <h3 class="form-title">환불정보</h3>
                        <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                            <input type="text" class="form-basic" placeholder="예금주명" v-model="returnApplyProp.returnBankInName"/>
                            <span class="feedback">{{ errors[0] }}</span>
                        </ValidationProvider>

                        <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line bank">
                            <div class="flex">
                                <div class="select-wrap">
                                    <select class="input-select" v-model="returnApplyProp.returnBankName" >
                                        <option disabled value="null">은행선택</option>
                                        <option v-for="data in common.banks" :value="data.key">
                                            {{data.label}}
                                        </option>
                                    </select>
                                </div>
                                <input type="text" class="form-basic" placeholder="계좌번호" v-model="returnApplyProp.returnVirtualNo" />
                            </div>
                        </ValidationProvider>

                        <ul class="dot-list large-dot">
                            <li>부분취소가 불가능한 결제방식(카드)의 경우 위에 입력하신 계좌로 취소금액을 입금해드립니다.</li>
                            <li>통장입금의 경우 택배가 판매자에게 도착한 후, 2~3일 이내에 반품 신청하신 계좌로 입금됩니다.</li>
                        </ul>
                    </div>
                    <div class="link-wrap">
                        <button type="submit" class="btn btn-primary link-item w-half">신청</button>
                        <button type="button" class="btn btn-default link-item w-half" @click="modal.returnShow=false">취소</button>
                    </div>
                </form>
            </ValidationObserver>
        </modal-default>

        <!-- 교환신청 모달 -->
        <modal-default :class="{ 'show': modal.exchangeShow }" :title="'교환신청'" :bodyClass="'p-2 type-exchange'"  @modalClose="modal.exchangeShow = false" class="modal-product">
            <ValidationObserver ref="observer" v-slot="{ validate }">
                <form @submit.prevent="exchangeProcess(validate)">
                    <!-- 아이템 영역 -->
                    <PopupItem v-bind="exchangeProp"
                               :type="'exchange'"
                               @apply-quantity="updateApplyQuantity"
                    />
                    <div class="article-divider"></div>
                    <!-- 취소사유 -->
                    <h3 class="form-title">교환사유</h3>
                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="select-wrap">
                        <select class="input-select" @change="claimChange($event, 'exchange')" v-model="popup.exchangeInfo.param.claimReasonText">
                            <option disabled value="">교환 사유를 선택하세요</option>
                            <option :value="claim.label" :class="claim.id" v-for="claim in popup.exchangeInfo.result.claimReasons">
                                {{ claim.label }}
                            </option>
                        </select>
                    </ValidationProvider>
                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line" v-show="popup.cancelInfo.param.claimReasonTextShow">
                        <input type="text" class="form-basic" placeholder="교환 사유를 입력하세요" v-model="popup.exchangeInfo.param.claimReasonText" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <label for="exchangeFile" class="btn btn-default btn-add-photo">
                        <input type="file" id="exchangeFile" class="hidden" @change="fileSelect($event, 'exchange')" multiple>
                        <img src="~/assets/image/ico/ico_camera.svg" alt="사진 첨부하기" class="ico"><span>사진 첨부하기</span>
                    </label>
                    <ul class="photo-list">
                        <li class="photo-item" v-for="(file, index) in popup.exchangeInfo.param.files" :key="index">
                            <img :src="popup.exchangeInfo.param.fileImages[index]" alt="fileName" class="thumbnail">
                            <button type="button" class="btn-delete" @click="fileDelete(index, 'exchange')"></button>
                        </li>
                    </ul>
                    <ul class="dot-list large-dot">
                        <li>5MB 이하의 사진 4장까지 첨부 가능</li>
                    </ul>
                    <!-- 반송방법 -->
                    <h3 class="form-title">반송방법 </h3>
                    <div class="radio-wrap">
                        <label class="input-radio">
                            <input type="radio" v-model="popup.exchangeInfo.param.exchangeShippingAskType" value="1"><i></i>회수요청
                        </label>
                        <label class="input-radio">
                            <input type="radio" v-model="popup.exchangeInfo.param.exchangeShippingAskType" value="2"> <i></i>직접발송
                        </label>
                    </div>
                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" v-if="popup.exchangeInfo.param.exchangeShippingAskType == '2'" class="form-line package">
                        <div class="flex">
                            <div class="select-wrap">
                                <select class="input-select" v-model="popup.exchangeInfo.param.deliveryCompanyName">
                                    <option value="">선택</option>
                                    <option v-for="data in popup.exchangeInfo.result.deliveryCompanyList" :value="data.deliveryCompanyName" v-if="data.useFlag == 'Y'">
                                        {{data.deliveryCompanyName}}
                                    </option>
                                </select>
                            </div>
                            <input type="text" class="form-basic" placeholder="송장번호" v-model="popup.exchangeInfo.param.exchangeShippingNumber">
                        </div>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="홍길동" v-model="exchangeApplyProp.exchangeReceiveName" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="'-'없이 번호만 입력" v-model="exchangeApplyProp.exchangeReceiveMobile" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <div class="flex">
                            <input type="text" class="form-basic" placeholder="우편번호 찾기" readonly v-model="exchangeApplyProp.exchangeReceiveZipcode" />
                            <button type="button" class="btn btn-black" @click="openDaumPostcode('exchange')">우편번호</button>
                        </div>
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="기본주소" readonly v-model="exchangeApplyProp.exchangeReceiveAddress" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                        <input type="text" class="form-basic" placeholder="상세주소" v-model="exchangeApplyProp.exchangeReceiveAddress2" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <div class="link-wrap">
                        <button type="submit" class="btn btn-primary link-item w-half">신청</button>
                        <button type="button" class="btn btn-default link-item w-half" @click="modal.exchangeShow = false">취소</button>
                    </div>
                </form>
            </ValidationObserver>
        </modal-default>

        <!-- 취소신청 모달 -->
        <modal-default :class="{ 'show': modal.cancelShow }" :title="'취소신청'" :bodyClass="'p-2 type-cancel'" @modalClose="modal.cancelShow=false" class="modal-product">
            <ValidationObserver ref="observer" v-slot="{ validate }">
                <form @submit.prevent="cancelProcess(validate)">
                    <div class="check-wrap all-check">
                        <label class="input-checkbox"><input type="checkbox" @change="cancelCheckAll"><i></i> 전체선택</label>
                    </div>
                    <!-- 아이템 영역 -->
                    <template v-for="(data,index) in cancelProp">
                        <PopupItem v-bind="data" :type="'cancel'"
                                   :is-checked-all="popup.cancelInfo.allChecked"
                                   @cancel-values="cancelRefundChange"
                        />
                    </template>
                    <div class="article-divider"></div>
                    <!-- 취소사유 -->
                    <h3 class="form-title">취소사유</h3>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="select-wrap">
                        <select class="input-select" @change="claimChange($event, 'cancel')">
                            <option value="">취소 사유를 선택하세요</option>
                            <option :value="claim.label" :class="claim.id" v-for="claim in popup.cancelInfo.result.claimReasons">
                                {{ claim.label }}
                            </option>
                        </select>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line" v-show="popup.cancelInfo.param.claimReasonTextShow">
                        <input type="text" class="form-basic" placeholder="취소 사유를 입력하세요" v-model="popup.cancelInfo.param.claimReasonText" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ul class="dot-list large-dot">
                        <li>주문 시 사용한 쿠폰과 적립금은 취소 시 복구됩니다. (단, 쿠폰의 경우 유효기간이 남은 쿠폰에 한함)</li>
                        <li>이미 상품이 발송된 것으로 확인되면 취소 요청이 자동으로 철회되며, 이 경우 상품을 받으신 후 반품신청을 하실 수 있습니다.</li>
                    </ul>
                    <!-- 환불정보 -->
                    <div class="return-content">
                        <h3 class="form-title">환불정보</h3>
                        <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="form-line">
                            <input type="text" class="form-basic" placeholder="예금주명" v-model="cancelApplyProp.returnBankInName"/>
                            <span class="feedback">{{ errors[0] }}</span>
                        </ValidationProvider>

                        <div class="form-line bank">
                            <div class="flex">
                                <ValidationProvider tag="div" rules="required" v-slot="{ errors }" class="select-wrap">
                                    <select class="input-select" v-model="cancelApplyProp.returnBankName">
                                        <option disabled value="null">은행선택</option>
                                        <option v-for="data in common.banks" :value="data.key">
                                            {{data.label}}
                                        </option>
                                    </select>
                                    <span class="feedback">{{ errors[0] }}</span>
                                </ValidationProvider>
                                <input type="text" class="form-basic" placeholder="계좌번호" v-model="cancelApplyProp.returnVirtualNo" />
                            </div>
                        </div>
                        <ul class="dot-list large-dot">
                            <li>부분취소가 불가능한 결제방식(카드)의 경우 위에 입력하신 계좌로 취소금액을 입금해드립니다.</li>
                            <li>통장입금의 경우 택배가 판매자에게 도착한 후, 2~3일 이내에 반품 신청하신 계좌로 입금됩니다.</li>
                        </ul>
                    </div>
                    <div class="cancel-product">
                        <table>
                            <tbody>
                            <tr class="list">
                                <th>취소상품금액</th>
                                <td>{{ formatNumber(cancelRefund.totalItemReturnAmount) }} 원</td>
                            </tr>
                            <tr class="list">
                                <th>추가배송비</th>
                                <td>{{ formatNumber(cancelRefund.totalAddShippingAmount) }} 원</td>
                            </tr>
                            <tr class="total">
                                <th>총 환불금액</th>
                                <td>{{ formatNumber(cancelRefund.totalReturnAmount) }} 원</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <ul class="dot-list large-dot">
                        <li>환불 금액에 대한 내용이 노출되고 있습니다. 환불 금액에 대한 내용이 노출되고 있습니다. 환불 금액에 대한 내용이 노출되고 있습니다. </li>
                    </ul>
                    <div class="link-wrap">
                        <button type="submit" class="btn btn-primary link-item w-half">신청</button>
                        <button type="button" class="btn btn-default link-item w-half"
                                @click="modal.cancelShow=false">취소</button>
                    </div>
                </form>
            </ValidationObserver>
        </modal-default>

        <!-- 후기작성 모달 -->
        <modal-default :class="{'show': modal.reviewShow, 'modal-product': true}" :title="'후기작성'" :bodyClass="'p-2'" @modalClose="modal.reviewShow=false">
            <form @submit.prevent="reviewProcess">
                    <!-- 아이템 영역 -->
                    <PopupItem v-bind="reviewProp" />
                    <span class="article-divider"></span>
                    <p class="eval-txt">상품은 어떠셨나요?</p>
                    <div class="score-wrap">
                        <span v-for="(data, index) in popup.reviewInfo.stars"
                              :class="['star', { active : index < activeStar }]"
                              @click="checkActiveStar(index + 1)" />
                    </div>
                    <textarea cols="30" rows="10" class="form-basic text-area"
                              placeholder="내용을 입력하세요" v-model="popup.reviewInfo.param.content"></textarea>
                    <label for="reviewFile" class="btn btn-default btn-add-photo">
                        <input type="file" id="reviewFile" class="hidden" @change="fileSelect($event, 'review')" multiple>
                        <img src="~/assets/image/ico/ico_camera.svg" alt="사진 첨부하기" class="ico"><span>사진 첨부하기</span>
                        <span class="benefit-balloon">포토후기 +2,000P</span>
                    </label>
                    <ul class="photo-list">
                        <li class="photo-item" v-for="(file, index) in popup.reviewInfo.param.files" :key="index">
                            <img :src="popup.reviewInfo.param.fileImages[index]" alt="fileName" class="thumbnail">
                            <button type="button" class="btn-delete" @click="fileDelete(index, 'review')"></button>
                        </li>
                    </ul>
                    <ul class="dot-list large-dot">
                        <li>5MB 이하의 사진 4장까지 첨부 가능</li>
                        <li>이용후기는 구매확정 된 상품에 한하여 주문일로부터 90일내 작성 가능합니다.</li>
                        <li><em>일반후기 1,000P / 포토후기 2,000P</em> 적립해드립니다.</li>
                    </ul>
                    <div class="link-wrap">
                        <button type="submit" class="btn btn-primary link-item w-half">등록</button>
                        <button type="button" class="btn btn-default link-item w-half"
                                @click="modal.reviewShow=false">취소</button>
                    </div>
            </form>
        </modal-default>

        <address-layer></address-layer>
    </section>
</template>
<script>

import CommonApi from "@/modules/api/CommonApi";

let $s, vm;

import OrderItem from "@/components/order/order-item.vue";
import PopupItem from "@/components/order/popup-item.vue";
import ModalDefault from "@/components/modal/default.vue";
import AddressLayer from "@/components/ui/daum/address-layer.vue";

export default {
    layout: 'mypage',
    name: 'mypage-order-detail',
    title: '주문/배송 조회',
    head(){
        return {
            script: [
                { src:'https://spi.maps.daum.net/imap/map_js_init/postcode.v2.js'}
            ],
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'주문/배송 조회'}
            ]
        }
    },
    components: {OrderItem, ModalDefault, PopupItem, AddressLayer},
    async asyncData({ $salesonApi, params }) {
        try {
            const api = $salesonApi().order;
            const param = {
                orderCode : params.id
            };
            const response = await api.getOrderDetail(param);
            return {
                order: {
                    result: response.data
                }
            }
        } catch (error) {
            console.log("[asyncData] order asyncData error: ", error);
            return {}
        }
    },
    beforeCreate () {
        $s = this.$saleson;
    },
    data() {
        return {
            order: {
                result: {},
                param: {}
            },
            modal : {
                reviewShow: false,
                confirmShow: false,
                cancelShow: false,
                exchangeShow: false,
                returnShow: false
            },
            popup : {
                exchangeInfo : {
                    result : {
                        deliveryCompanyList : [],
                        claimReasons : [],
                        exchangeApply : {
                            orderItem : {}
                        }
                    },
                    param : {
                        shipmentReturnId : "",
                        applyQuantity : "",
                        claimReasonText : "",
                        exchangeShippingAskType : "1",
                        exchangeShippingNumber : "",
                        exchangeReceiveZipcode : "",
                        exchangeReceiveAddress : "",
                        exchangeReceiveAddress2 : "",
                        exchangeReceiveSido : "",
                        exchangeReceiveSigungu : "",
                        exchangeReceiveEupmyeondong : "",
                        deliveryCompanyName : "",
                        exchangeReceiveName : "",
                        exchangeReceiveMobile : "",
                        exchangeReceivePhone : "",
                        claimReasonTextShow: false,
                        files : [],
                        fileImages : [],
                        orderClaimImageFiles : []
                    },
                    validMsg : {
                        applyQuantity : "수량을 선택하세요.",
                        claimReasonText : "교환사유를 선택해주세요.",
                        deliveryCompanyName : "반송 송장 정보를 입력해주세요.",
                        exchangeShippingNumber : "송장번호를 입력하세요.",
                        exchangeReceiveName : "이름을 입력해주세요.",
                        exchangeReceiveMobile : "연락처를 입력해주세요.",
                        exchangeReceiveAddress : "반송지 정보를 입력해주세요.",
                        exchangeReceiveAddress2 : "반송지 정보를 입력해주세요."
                    },
                    validOrder : ['applyQuantity', 'claimReasonText', 'shippingAskType', 'deliveryCompanyName'
                        , 'exchangeShippingNumber', 'exchangeReceiveName', 'exchangeReceiveMobile', 'exchangeReceiveAddress', 'exchangeReceiveAddress2'
                    ]
                },
                returnInfo : {
                    result : {
                        deliveryCompanyList : [],
                        claimReasons : [],
                        returnApply : {
                            orderItem : {},
                            returnBankInName : "",
                            returnBankName : "",
                            returnVirtualNo : ""
                        },
                        paymentType : false
                    },
                    param : {
                        applyQuantity : "",
                        claimReasonText : "",
                        returnShippingAskType : "1",
                        returnShippingNumber : "",
                        deliveryCompanyName : "",
                        returnReserveName : "",
                        returnReserveMobile : "",
                        returnReserveZipcode : "",
                        returnReserveAddress : "",
                        returnReserveAddress2 : "",
                        returnBankInName : "",
                        returnBankName : "",
                        returnVirtualNo : "",
                        claimReasonTextShow: false,
                        files : [],
                        fileImages : [],
                        orderClaimImageFiles : []
                    },
                    validMsg : {
                        applyQuantity : "수량을 선택하세요.",
                        claimReasonText : "반품사유를 선택해주세요.",
                        deliveryCompanyName : "반송 송장 정보를 입력해주세요.",
                        returnShippingNumber : "송장번호를 입력하세요.",
                        returnReserveName : "이름을 입력해주세요.",
                        returnReserveMobile : "연락처를 입력해주세요.",
                        returnReserveAddress : "반송지 정보를 입력해주세요.",
                        returnReserveAddress2 : "반송지 정보를 입력해주세요.",
                        returnBankInName : "환불계좌 정보를 입력해주세요.",
                        returnBankName : "환불계좌 정보를 입력해주세요.",
                        returnVirtualNo : "환불계좌 정보를 입력해주세요."
                    },
                    validOrder : [
                        'applyQuantity','claimReasonText','shippingAskType','deliveryCompanyName','returnShippingNumber','returnReserveName',
                        'returnReserveMobile','returnReserveAddress','returnReserveAddress2','returnBankInName','returnBankName','returnVirtualNo',
                    ]
                },
                cancelInfo : {
                    result : {
                        claimReasons : [],
                        claimApply : {
                            orderCode : "",
                            claimType : "",
                            orderItems : [],
                            returnBankInName : "",
                            returnBankName : "",
                            returnVirtualNo : ""
                        }
                    },
                    param : {
                        orderCode : "",
                        orderSequence : "",
                        id : [],
                        claimReasonText : "",
                        claimReason : "",
                        claimType : "",
                        claimRefundType : "",
                        returnBankInName : "",
                        returnBankName : "",
                        returnVirtualNo : "",
                        claimReasonTextShow: false,
                        claimApplyItemMap : {},
                        claimQuantity : []
                    },
                    validMsg : {
                        id : "취소상품을 선택해주세요.",
                        applyQuantity : "수량을 선택하세요.",
                        claimReasonText : "취소사유를 선택해주세요.",
                        returnBankInName : "환불계좌 정보를 입력해주세요.",
                        returnBankName : "환불계좌 정보를 입력해주세요.",
                        returnVirtualNo : "환불계좌 정보를 입력해주세요."
                    },
                    validOrder : [
                        'id','claimReasonText','returnBankInName','returnBankName','returnVirtualNo'
                    ],
                    allChecked: false,
                    refund : {
                        partCancel : "",
                        returnAmount : 0,
                        totalReturnAmount : 0,
                        autoCancel : false,
                        totalAddShippingAmount : 0,
                        totalItemReturnAmount : 0,
                        writeBankInfo : false,
                        claimApplyQuantity : 0,
                        totalOrderQuantity : 0
                    }
                },
                reviewInfo : {
                    result : {},
                    param : {
                        content : "",
                        score : "",
                        files : [],
                        fileImages : []
                    },
                    stars : Array(5).fill(null),
                    activeStarIndex : 5
                }
            },
            common : {
                banks : []
            },
            //사진첨부
            checkPhotoList: true,
            deliveryOption: 'return', // 기본값 설정
        }
    },
    methods: {
        orderPopup(param){
            switch (param.type) {
                case 'confirm':
                    this.confirmPopup(param);
                    break;
                case 'exchange':
                    this.exchangePopup(param);
                    break;
                case 'return':
                    this.returnPopup(param);
                    break;
                case 'cancel':
                    this.cancelPopup(param);
                    break;
                case 'orderCancel':
                    this.orderCancel(param);
                    break;
                case 'review':
                    this.reviewPopup(param);
                    break;
                default:
                    this.deliveryLink(param)
                    break;
            }
        },
        // 구매확정 팝업
        confirmPopup(param){
            const self = this;
            $s.confirm("해당 상품을 구매확정 하시겠습니까?", function(){
                self.$salesonApi().order.confirmPurchase(param)
                .then(function(response) {
                    if (response.data.status === 200) {
                        self.modal.confirmShow = true;
                        self.popup.reviewInfo.result = self.order.result.item.filter(i => i.itemSequence == param.itemSequence)[0];
                    }
                })
                .catch(function(error) {
                    console.error("Error confirmPurchase:", error);
                });
            });
        },
        // 교환신청
        exchangePopup(param){
            const self = this;
            this.$salesonApi().order.getExchangeApply(param)
            .then(function(response){
                if (response.status === 200) {
                    self.modal.exchangeShow = true;
                    self.popup.exchangeInfo.result = response.data;
                }
            })
            .catch(function(error){
                console.error("Error getExchangeApply:", error);
            });
        },
        // 취소신청
        cancelPopup(param){
            const self = this;
            this.$salesonApi().order.getCancelApply(param)
            .then(function(response){
                if (response.status === 200) {
                    self.modal.cancelShow = true;
                    self.popup.cancelInfo.result = response.data;
                    self.getCommonBank();
                }
            })
            .catch(function(error){
                console.error("Error getCancelApply:", error);
            });
        },
        // 반품신청
        returnPopup(param){
            const self = this;
            this.$salesonApi().order.getReturnApply(param)
            .then(function(response){
                if (response.status === 200) {
                    self.modal.returnShow = true;
                    self.popup.returnInfo.result = response.data;
                    self.getCommonBank();
                }
            })
            .catch(function(error){
                console.error("Error getReturnApply:", error);
            });
        },
        // 후기작성
        reviewPopup(param){
            const reviewItem = this.order.result.item.filter(i=> i.itemSequence == param.itemSequence)[0];
            this.popup.reviewInfo.result = reviewItem;
            this.modal.reviewShow = true;
        },
        getCommonBank(){
            const self = this;
            this.$salesonApi().common.getBankInfo()
            .then(function(response){
                if (response.status === 200) {
                    self.common.banks = response.data.list;
                }
            })
            .catch(function(error){
                console.error("Error getCommonBank:", error);
            });
        },
        updateApplyQuantity(param){
            if (param.type == 'exchange'){
                this.popup.exchangeInfo.param.applyQuantity = param.quantity;
            }
            if (param.type == 'return'){
                this.popup.returnInfo.param.applyQuantity = param.quantity;
            }
            if (param.type == 'cancel'){
                this.popup.cancelInfo.param.claimQuantity.push(param);
            }
        },
        async returnProcess(validate){
            const param = this.returnParamDataConverter();
            const isValid = await validate();
            if (!isValid) {
                return this.validateParams(param, 'return');
            }

            const formData = this.formDataConverter(param);
            this.$salesonApi().order.returnProcess(formData)
            .then(function(response){
                if (response.status === 200) {
                    $s.alert("반품신청 되었습니다.", function () {
                        location.reload();
                    });
                }
            })
            .catch(function(error){
                console.error("Error returnProcess:", error);
            });
        },
        async exchangeProcess(validate){
            const param = this.exchangeParamDataConverter();
            const isValid = await validate();
            if (!isValid) {
                return this.validateParams(param, 'exchange');
            }
            const formData = this.formDataConverter(param);
            this.$salesonApi().order.exchangeProcess(formData)
            .then(function(response){
                if (response.status === 200) {
                    $s.alert("교환신청 되었습니다.", function () {
                        location.reload();
                    });
                }
            })
            .catch(function(error){
                console.error("Error exchangeProcess:", error);
            });
        },
        async cancelProcess(validate){
debugger
            const param = this.cancelParamDataConverter();
            const isValid = await validate();
            if (!isValid) {
                let t = "";
                debugger
                return this.validateParams(param, 'cancel');
            }
            console.log("test@@");
            debugger
            // this.$salesonApi().order.cancelProcess(param)
            // .then(function(response){
            //     if (response.status === 200) {
            //         $s.alert("취소신청 되었습니다.", function () {
            //             location.reload();
            //         });
            //     }
            // })
            // .catch(function(error){
            //     console.error("Error cancelProcess:", error);
            // });
        },
        reviewProcess(){
            const self = this;
            const param = this.reviewParamDataConverter();

            if (param.content == '' || param.content == null){
                $s.alert("내용을 작성해주세요.");
                return false;
            }

            const formData = this.formDataConverter(param);
            $s.confirm("리뷰를 작성하시겠습니까?", function(){
                self.$salesonApi().item.insertItemReview(formData)
                .then(function(response) {
                    if (response.data.status === 200) {
                        $s.alert("후기가 작성되었습니다.", function () {
                            location.reload();
                        });
                    }
                })
                .catch(function(error) {
                    console.error("Error insertItemReview:", error);
                });
            });
        },
        orderCancel(param){
            const self = this;
            $s.confirm("주문취소 하시겠습니까?", function(){
                self.$salesonApi().order.orderCancel(param)
                .then(function(response) {
                    if (response.data.status === 200) {
                        $s.alert("주문취소되었습니다.", function () {
                            location.reload();
                        });
                    }
                })
                .catch(function(error) {
                    console.error("Error orderCancel:", error);
                });
            });
        },
        getRefundAmount(){
            const self = this;
            const param = this.popup.cancelInfo.param
            this.$salesonApi().order.getRefundAmount(param)
            .then(function(response){
                if (response.status === 200) {
                    self.popup.cancelInfo.refund = response.data;
                }
            })
            .catch(function(error){
                console.error("Error getRefundAmount:", error);
            });
        },
        cancelRefundChange(obj){
            const order = this.order.result;
            this.popup.cancelInfo.param.orderCode = order.orderCode;
            this.popup.cancelInfo.param.orderSequence = order.orderSequence;

            // 체크박스 체크여부
            if (!obj.checked){
                // 체크해제 인 경우 해제한 ID 제거
                this.popup.cancelInfo.param.id =
                    this.popup.cancelInfo.param.id.filter(i => i!==obj.itemSequence);

                // 체크해제한 ID Map 삭제
                delete this.popup.cancelInfo.param.claimApplyItemMap[obj.itemSequence];

                // 제거 후 남은 ID가 있다면 계산요청
                if (this.popup.cancelInfo.param.id.length > 0){
                    this.getRefundAmount();
                } else {
                    // 제거 후 남은 ID가 없다면 상세정보 초기화
                    this.popup.cancelInfo.refund = {
                        partCancel : "",
                        returnAmount : 0,
                        totalReturnAmount : 0,
                        autoCancel : false,
                        totalAddShippingAmount : 0,
                        totalItemReturnAmount : 0,
                        writeBankInfo : false,
                        claimApplyQuantity : 0,
                        totalOrderQuantity : 0
                    };
                }
            } else {
                // 체크한 값이 ID에 저장되어 있지 않은 경우만 저장 - 수량(select) 변경 시
                if (!this.popup.cancelInfo.param.id.includes(obj.itemSequence)){
                    this.popup.cancelInfo.param.id.push(obj.itemSequence);
                }
                this.popup.cancelInfo.param.claimApplyItemMap[obj.itemSequence] = {
                    orderCode : order.orderCode,
                    orderSequence : order.orderSequence,
                    applyQuantity : obj.quantity,
                    itemSequence : obj.itemSequence
                };

                // 전체선택인 경우
                if (this.popup.cancelInfo.allChecked){
                    //  취소상품 건수와 선택 된 ID 건수가 동일할때 요청
                    if (this.cancelProp.length == this.popup.cancelInfo.param.id.length){
                        this.getRefundAmount();
                    }
                } else {
                    this.getRefundAmount();
                }
            }
        },
        fileSelect(e, type){

            let size = 5;
            let limit = 4;
            let extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
            let selectFiles = this.popup[`${type}Info`].param.files;
            let images = this.popup[`${type}Info`].param.fileImages;
            let fileList = e.target.files;

            // 파일 첨부 개수 체크
            if (limit < selectFiles.length + fileList.length) {
                $s.alert('사진은 ' + limit + '장까지 첨부 가능합니다.');
                return;
            }

            for (let i = 0; i < fileList.length; i++) {
                let file = fileList[i];
                let fileExt = fileList[i].name;

                // 사이즈 체크
                if (fileExt != "") {
                    if (file.size > (size * 1024 * 1024)) {
                        $s.alert("파일크기는 " + size + "MB 이내로 등록 가능합니다.");
                        return;
                    }
                }

                // 확장자 체크
                fileExt = fileExt.slice(fileExt.indexOf(".") + 1).toLowerCase();
                if (!extensions.includes(fileExt)) {
                    $s.alert("이미지 파일(jpg, png, gif, bmp, jpeg) 만 등록 가능합니다.");
                    return;
                }

                // 미리보기 생성
                try {
                    let reader = new FileReader();
                    let self = this;

                    reader.onload = function (ie) {
                        images.push(ie.target.result);
                        self.popup[`${type}Info`].param.fileImages = images;
                    };

                    selectFiles.push(file);
                    self.popup[`${type}Info`].param.files = selectFiles;

                    reader.readAsDataURL(file);
                } catch (e) {

                }
            }
        },
        fileDelete(index, type){
            let files, images = "";
            files = this.popup[`${type}Info`].param.files;
            images = this.popup[`${type}Info`].param.fileImages;

            files.splice(index, 1);
            images.splice(index, 1);
        },
        claimChange(e, type){
            let index = e.target.selectedIndex;
            if (e.target.value == '기타'){
                this.popup[`${type}Info`].param.claimReasonTextShow = true;
            } else {
                this.popup[`${type}Info`].param.claimReasonTextShow = false;
            }
            this.popup[`${type}Info`].param.claimReasonText = e.target.value;
            this.popup[`${type}Info`].param.claimReason = e.target.options[index].className;
        },
        exchangeParamDataConverter(){
            let param = this.popup.exchangeInfo.param;
            const baseData = this.exchangeApplyProp;

            param = {
                orderCode : baseData.orderCode,
                orderSequence : baseData.orderSequence,
                itemSequence : baseData.itemSequence,
                shipmentReturnId : "",
                applyQuantity : param.applyQuantity,
                claimReasonText : param.claimReasonText,
                claimReason : param.claimReason,
                exchangeShippingCompanyName : param.deliveryCompanyName,
                exchangeShippingAskType : param.exchangeShippingAskType,
                exchangeShippingNumber : param.exchangeShippingNumber,
                exchangeReceiveZipcode : param.exchangeReceiveZipcode == '' ? baseData.exchangeReceiveZipcode : param.exchangeReceiveZipcode,
                exchangeReceiveAddress : param.exchangeReceiveAddress == '' ? baseData.exchangeReceiveAddress : param.exchangeReceiveAddress,
                exchangeReceiveAddress2 : baseData.exchangeReceiveAddress2,
                exchangeReceiveSido : param.exchangeReceiveSido == '' ? baseData.exchangeReceiveSido : param.exchangeReceiveSido,
                exchangeReceiveSigungu : param.exchangeReceiveSigungu == '' ? baseData.exchangeReceiveSigungu : param.exchangeReceiveSigungu,
                exchangeReceiveEupmyeondong : param.exchangeReceiveEupmyeondong == '' ? baseData.exchangeReceiveEupmyeondong : param.exchangeReceiveEupmyeondong,
                deliveryCompanyName : param.deliveryCompanyName,
                exchangeReceiveName : baseData.exchangeReceiveName,
                exchangeReceiveMobile : baseData.exchangeReceiveMobile,
                exchangeReceivePhone : baseData.exchangeReceiveMobile,
                orderClaimImageFiles : this.popup.exchangeInfo.param.files
            };

            return param;
        },
        returnParamDataConverter(){
            let param = this.popup.returnInfo.param;
            const baseData = this.returnApplyProp;
            param = {
                orderCode : baseData.orderCode,
                orderSequence : baseData.orderSequence,
                itemSequence : baseData.itemSequence,
                shipmentReturnId : "",
                returnReserveMobile : baseData.returnReserveMobile,
                returnReserveName : baseData.returnReserveName,
                returnShippingCompanyName : param.deliveryCompanyName,
                returnReserveZipcode : param.returnReserveZipcode == '' ? baseData.returnReserveZipcode : param.returnReserveZipcode,
                returnReserveAddress : param.returnReserveAddress == '' ? baseData.returnReserveAddress : param.returnReserveAddress,
                returnReserveAddress2 : baseData.returnReserveAddress2,
                returnReserveSido : param.returnReserveSido == '' ? baseData.returnReserveSido : param.returnReserveSido,
                returnReserveSigungu : param.returnReserveSigungu == '' ? baseData.returnReserveSigungu : param.returnReserveSigungu,
                returnReserveEupmyeondong : param.returnReserveEupmyeondong == '' ? baseData.returnReserveEupmyeondong : param.returnReserveEupmyeondong,
                applyQuantity : param.applyQuantity,
                claimReasonText : param.claimReasonText,
                claimReason : param.claimReason,
                returnShippingAskType : param.returnShippingAskType,
                deliveryCompanyName : param.deliveryCompanyName,
                returnShippingNumber : param.returnShippingNumber,
                returnBankName : baseData.returnBankName,
                returnBankInName : baseData.returnBankInName,
                returnVirtualNo : baseData.returnVirtualNo,
                orderClaimImageFiles : this.popup.returnInfo.param.files,
            };

            return param;
        },
        cancelParamDataConverter(){

            let param = this.popup.cancelInfo.param;
            const baseData = this.cancelApplyProp;
            param.claimType = "1";
            param.returnBankName = this.cancelApplyProp.returnBankName;
            param.returnBankInName = this.cancelApplyProp.returnBankInName;
            param.returnVirtualNo = this.cancelApplyProp.returnVirtualNo;

            return param;
        },
        reviewParamDataConverter(){
            let order = this.order.result;
            let info = this.popup.reviewInfo;
            let param = {
                orderCode : order.orderCode,
                orderSequence : order.orderSequence,
                itemSequence : info.result.itemSequence,
                itemId : info.result.itemId,
                content : info.param.content,
                itemReviewImageFile : this.popup.reviewInfo.param.files,
                score : info.activeStarIndex,
                type : 'review'
            };
            return param;
        },
        validateParams(param, type) {
            let alertMsg = {};
            let order = {};

            alertMsg = this.popup[`${type}Info`].validMsg;
            order = this.popup[`${type}Info`].validOrder;

            if (param[`${type}ShippingAskType`] == '1'){
                order = order.filter(key => key !== 'deliveryCompanyName' && key !== `${type}ShippingNumber`);
            }

            for (const key of order){
                if (type == 'cancel' && key == 'id'
                    && param[key].length == 0){
                    this.$saleson.alert(alertMsg[key]);
                    return false;
                }
                if (!param[key] && key != 'shippingAskType'){
                    this.$saleson.alert(alertMsg[key]);
                    return false;
                }
            }
            return true;
        },
        checkActiveStar(index){
            this.popup.reviewInfo.activeStarIndex = index;
        },
        formDataConverter(obj){
            const formData = new FormData();
            const type = obj.type;
            for(let key in obj){
                // file 인 경우 (이미지파일만 Array type 으로 넘어옴)
                if (Array.isArray(obj[key])){
                    for (let i = 0; i < obj[key].length; i++){
                        if (type != null){
                            formData.append(`${key}s[${i}]`, obj[key][i]);
                        } else {
                            formData.append(`${key}[${i}]`, obj[key][i]);
                        }
                    }
                } else {
                    formData.append(key, obj[key]);
                }
            }
            return formData;
        },
        cancelCheckAll(){
            this.popup.cancelInfo.allChecked = !this.popup.cancelInfo.allChecked;
        },
        openDaumPostcode(type){
            let child = this.getChild("address-layer");
            if (child != null) {
                child.openDaumAddress(function(response, type) {
                    let subName = type == 'exchange' ? 'Receive' : 'Reserve';

                    this.popup[`${type}Info`].param[`${type}${subName}Sido`] = response.sido;
                    this.popup[`${type}Info`].param[`${type}${subName}Sigungu`] = response.sigungu;
                    this.popup[`${type}Info`].param[`${type}${subName}Eupmyeondong`] = response.eupmyeondong;
                    this.popup[`${type}Info`].param[`${type}${subName}Zipcode`] = response.newZipcode;
                    this.popup[`${type}Info`].param[`${type}${subName}Address`] = response.roadAddress;

                    this[`${type}ApplyProp`][`${type}${subName}Zipcode`] = response.newZipcode;
                    this[`${type}ApplyProp`][`${type}${subName}Address`] = response.roadAddress;
                    this[`${type}ApplyProp`][`${type}${subName}Address2`] = "";

                }.bind(this), type);
            }
        },
        deliveryLink(param){
            location.href = param.url + param.number;
        },
        receiptIssuance() {
            const url = this.order.result.receipt;
            const option = 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no';
            window.open(url, option);
        },
        getOrderList(){
            location.href = "/mypage/order";
        }
    },
    mounted() {
    },
    computed: {
        cancelApplyProp(){
            return this.popup.cancelInfo.result.claimApply
        },
        exchangeApplyProp(){
            return this.popup.exchangeInfo.result.exchangeApply
        },
        returnApplyProp(){
            return this.popup.returnInfo.result.returnApply
        },
        cancelProp(){
            return this.cancelApplyProp.orderItems.map(orderItem => {
                return {
                    item : orderItem,
                    initialQuantity : (orderItem.quantity).toString()
                };
            });
        },
        exchangeProp(){
            return {
                item : this.exchangeApplyProp.orderItem,
                initialQuantity : this.popup.exchangeInfo.param.applyQuantity
            }
        },
        returnProp(){
            return {
                item : this.returnApplyProp.orderItem,
                initialQuantity : this.popup.returnInfo.param.applyQuantity
            }
        },
        reviewProp(){
            return {
                item : this.popup.reviewInfo.result,
                initialQuantity : "",
                type : 'review'
            }
        },
        activeStar(){
            return this.popup.reviewInfo.activeStarIndex;
        },
        cancelRefund(){
            return this.popup.cancelInfo.refund;
        }
    }
}
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_order.scss";
</style>