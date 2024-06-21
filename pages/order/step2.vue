<template>
    <div class="order-completed-page">
        <h1 class="title-h1 pc">주문/결제</h1>
        <div class="w-582">
            <div class="info-order">
                <img src="~/assets/image/cart/ico_completed.svg" alt="competed">
                <span>고객님의 주문이 정상적으로 완료되었습니다.</span>
                <div class="order-number">
                    <p>주문번호</p>
                    <p>{{orderCode}}</p>
                </div>
                <div class="order-date">{{dateFormat(content.createdDate)}}</div>
            </div>
            <div class="content-table list info-freebank"
                 v-for="payment in content.paymentList"
                 v-if="payment.approvalType == 'bank' || payment.approvalType == 'vbank'" >
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
            </div>
            <!-- 배송지 정보 -->
            <h3 class="content-title"><i class="ico"><img src="~/assets/image/ico/ico_location.svg" alt="배송지 정보"></i>배송지 정보
            </h3>
            <div class="content-table list">
                <table>
                    <tr>
                        <th>받는 분</th>
                        <td>{{content.shippingInfo.receiveName}}</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>[{{content.shippingInfo.receiveZipcode}}] {{content.shippingInfo.receiveAddress}} {{content.shippingInfo.receiveAddressDetail}}</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>{{content.shippingInfo.receiveMobile}}</td>
                    </tr>
                    <tr v-if="content.shippingInfo.memo != null">
                        <th>배송메세지</th>
                        <td>{{content.shippingInfo.memo}}</td>
                    </tr>
                </table>
            </div>
            <!-- 결제정보 -->
            <h3 class="content-title"><i class="ico"><img src="~/assets/image/ico/ico_money.svg" alt="결제정보"></i>결제정보</h3>
            <ul class="info-payment-detail">
                <template v-for="payment in content.paymentList" >
                    <li v-if="payment.approvalType == 'bank' || payment.approvalType == 'vbank'">
                        <div class="method">
                            <span>{{payment.approvalTypeLabel}}</span>
                            <span v-if="payment.payDate != null">결제완료</span>
                            <span v-else>입금대기</span>
                        </div>
                        <div class="amount">
                            <span>{{formatNumber(payment.amount)}}<b>원</b></span>
                        </div>
                        <div class="date">{{dateFormat(payment.payDate, 'time')}}</div>
                    </li>
                    <li v-else>
                        <div class="method">
                            <span>{{payment.approvalTypeLabel}}</span>
                            <span>결제완료</span>
                            <span v-if="payment.approvalType == 'card'">
                                <button type="button" class="btn-recipe" onclick="receiptIssuance(content.nicepayReceipt)">영수증 보기</button>
                            </span>
                        </div>
                        <div class="amount">
                            <span>{{formatNumber(payment.amount)}}<b>원</b></span>
                        </div>
                        <div class="date">{{dateFormat(payment.payDate, 'time')}}</div>
                    </li>
                </template>
            </ul>
            <div class="btn-wrap gap">
                <button class="btn btn-round btn-large btn-primary-line" @click="redirect(`/mypage/info/order-detail/${content.orderCode}`)">주문내역 확인</button>
                <button class="btn btn-round btn-large btn-primary" @click="redirect()">쇼핑 계속하기</button>
            </div>
        </div>
    </div>
</template>

<script>


import Sns from "@/modules/op.sns";

let $s, vm;

export default {
    async asyncData({$salesonApi, $seo, route, $axios}) {
        try {
            const seo = await $seo(route.path, $axios);

            return {
                seo: seo
            }
        } catch (error) {
            console.log(error);
        }
    },
    data() {
        return {
            isActive: false,
            orderCode: '',
            orderSequence: '',
            content: {
                shippingInfo: {},
                paymentList: [],
                nicepayReceipt: {}
            },
            seo: {}
        }
    },
    head() {
        return {
            seo: this.seo,
            script: [],
            link: [
                { rel: 'stylesheet', href: '/static/css/order.css' }
            ]
        }
    },
    beforeCreate: function() {
        $s = this.$saleson;
        vm = this;
    },
    beforeMount() {
        this.$nextTick(async () => {
            this.orderSequence = $s.core.getParameter("orderSequence");
            this.orderCode = $s.core.getParameter("orderCode");

            try {
                let param = {
                    orderCode : this.orderCode,
                    orderSequence: this.orderSequence
                };

                const response = await this.$salesonApi().order.getOrderDetail(param);
                this.content = response.data;

                console.log(response);
            } catch (error) {
                console.log(error);
            }
        });
    },
    mounted() {},
    methods: {
        toggleActive() {
            this.isActive = !this.isActive;
        },
        receiptIssuance(receipt) {
            const option = 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no';
            window.open(receipt, '영수증', option);
        },
        redirect(url) {
            if (url !== '' && url !== undefined) {
                this.$saleson.redirect(url);
            } else {
                this.$saleson.redirect(this.$saleson.pages.INDEX);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/cart/cart.scss";
@import "~/assets/scss/pages/cart/cart-modal.scss";
@import "~/assets/scss/pages/items/item_list.scss";
</style>

