<template>
    <div class="mypage-container-top">
        <div class="user-info">
            <p class="user-name"><strong class="user">{{$store.$auth.user.name}}님</strong>안녕하세요!</p>
            <div class="user-grade">
                <div class="grad-wrap">
                    <i class="ico"><img src="~/assets/image/mypage/grade_welcome.svg" alt="WELCOME"></i>
                    <strong>{{$store.getters.grade}}</strong>
                </div>
                <span class="divider"></span>
                <nuxt-link to="/mypage/grade">
                    <span>회원등급별 혜택<i class="arrow"></i></span>
                </nuxt-link>
            </div>
        </div>
        <div class="user-benefits">
            <div class="box">
                <nuxt-link to="/mypage/point" class="title"><i class="ico"><img src="~/assets/image/mypage/ico_point.svg"
                            alt="포인트"></i><span>포인트</span><i class="arrow"></i></nuxt-link>
                <p class="amount"><strong>{{formatNumber($store.getters.point)}}</strong><span class="unit en">P</span></p>
            </div>
            <span class="divider"></span>
            <div class="box">
                <nuxt-link to="/mypage/coupon" class="title"><i class="ico"><img src="~/assets/image/mypage/ico_coupon.svg"
                            alt="쿠폰"></i><span>쿠폰</span><i class="arrow"></i></nuxt-link>
                <p class="amount"><strong>{{ formatNumber($store.getters.couponCount + $store.getters.shippingCouponCount) }}</strong><span class="unit kr">장</span>
                    <span class="able-alert">
                        <button type="button" @click="getCouponDownload(1)">다운가능쿠폰</button>
                    </span>
                </p>
            </div>
            <span class="divider"></span>
            <div class="box liked-item">
                <nuxt-link to="/mypage/wishlist" class="title"><i class="ico"><img src="~/assets/image/mypage/ico_heart.svg"
                            alt="관심상품"></i><span>관심상품</span><i class="arrow"></i></nuxt-link>
                <p class="amount"><strong>6</strong></p>
            </div>
        </div>
        <div class="user-event">
            <i class="ico"></i>
            <strong>이벤트</strong>
            <span>플러스 친구 추가하면 3,000원 쿠폰 증정!</span>
        </div>

        <modal-default :class="{'show':modal.couponShow}" :title="'쿠폰 다운로드'" :bodyClass="'p-2'" @modalClose="modal.couponShow=false" class="modal-coupon">
            <button type="button" class="btn btn-default-line btn-all-down" @click="downloadAllCoupon">
                <img src="~/assets/image/ico/ico_download_black_02.svg" class="ico-down">
                <span>모든 쿠폰 다운(NN)</span>
            </button>
            <p class="all-items">총 <strong>{{coupon.result.downloadAvailableCount}}</strong>개</p>
            <!-- 쿠폰리스트 -->
            <ul class="coupon-list-container" v-if="couponResponse.content.length > 0">
                <li class="coupon-list line" v-for="(data, index) in couponResponse.content">
                    <div class="coupon-list-wrap">
                        <div class="item">
                            <div class="price-area"><span class="number">
                                <em>{{formatNumber(data.couponPay)}}</em>
                                {{data.couponPayType == '1' ? '원' : '%'}}
                            </span></div>
                            <div class="tag-area product"></div>
                        </div>
                        <div class="info">
                            <strong class="desc title">{{data.couponName}}</strong>
                            <span class="desc sub">{{data.couponComment}}</span>
                            <p class="pc">
                                <span class="desc date">
                                    <template v-if="data.couponApplyType == '1'">
                                        {{data.couponApplyStartDate}} ~ {{data.couponApplyEndDate}} /
                                    </template>
                                    <template v-if="data.couponPayRestriction > 0">
                                        {{formatNumber(data.couponPayRestriction)}} 원 이상 구매 시 사용가능
                                    </template>
                                </span>
                            </p>
                        </div>
                    </div>
                    <button type="button" class="download" @click="downloadCoupon(data.couponId)">
                        <img src="~/assets/image/ico/ico_download_black.svg" class="ico-down"><span>쿠폰받기</span>
                    </button>
                    <div class="mobile">
                        <span class="desc date">
                            <template v-if="data.couponApplyType == '1'">
                                {{data.couponApplyStartDate}} ~ {{data.couponApplyEndDate}} /
                            </template>
                            <template v-if="data.couponPayRestriction > 0">
                                {{formatNumber(data.couponPayRestriction)}} 원 이상 구매 시 사용가능
                            </template>
                        </span>
                    </div>
                </li>
            </ul>
            <!-- 노 컨텐츠 -->
            <div class="no-contents" v-else>
                다운로드 가능한 쿠폰이 없습니다.
            </div>
            <template v-if="couponResponse.content.length > 0">
                <pagination :current-page="couponResponse.pagination.currentPage" :total-pages="couponResponse.pagination.totalPages" @change="getCouponDownload" />
            </template>
            <ul class="dot-list large-dot">
                <li>다운로드한 쿠폰은 마이페이지 > 쿠폰에서 확인하실 수 있습니다.</li>
                <li>다운로드한 쿠폰의 유효기간 경과 시 사용할 수 없습니다.</li>
            </ul>
        </modal-default>
    </div>
</template>
<script>

import ModalDefault from "@/components/modal/default.vue";
import Pagination from "@/components/ui/pagination.vue";

export default {
    components: {ModalDefault, Pagination},
    data(){
        return {
            modal : {
                couponShow : false
            },
            coupon : {
                result : {
                    availableCount : 0,
                    completedUserCouponCount : 0,
                    couponPageResponse : {
                        content : [],
                        pagination : {}
                    },
                    downloadAvailableCount : 0
                }
            }
        }
    },
    methods: {
        getCouponDownload(page){
            const self = this;
            let param = {
                page : page,
                complete : true
            };
            this.$salesonApi().coupon.getDownloadCoupons(param)
            .then(function(response){
                if (response.status === 200) {
                    self.modal.couponShow = true;
                    self.coupon.result = response.data;
                }
            })
            .catch(function(error){
                console.error("Error getDownloadCoupons:", error);
            });
        },
        downloadCoupon(couponId){
            const self = this;
            let param = {
                couponId : couponId
            };
            this.$salesonApi().coupon.downloadCoupon(param)
            .then(function(response){
                if (response.status === 200) {
                    self.$saleson.alert("쿠폰이 다운로드 되었습니다.", function () {
                        location.reload();
                    });
                }
            })
            .catch(function(error){
                console.error("Error downloadCoupon:", error);
            });
        },
        downloadAllCoupon(){
            const self = this;
            this.$salesonApi().coupon.downloadAllCoupon()
            .then(function(response){
                if (response.status === 200) {
                    self.$saleson.alert("쿠폰이 다운로드 되었습니다.", function () {
                        location.reload();
                    });
                }
            })
            .catch(function(error){
                console.error("Error downloadAllCoupon:", error);
            });
        }
    },
    computed : {
        couponResponse(){
            return this.coupon.result.couponPageResponse
        }
    }
}
</script>
<style></style>