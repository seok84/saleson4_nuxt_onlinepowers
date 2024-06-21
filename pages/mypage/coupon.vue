<template>
    <section class="mypage-coupon">
        <div class="title-container m-line-divider">
            <h2 class="title-h2">쿠폰</h2>
            <div class="btn-wrap">
                <button type="button" class="btn btn-black btn-action" @click="getCouponDownload(1)">
                    <img src="~/assets/image/ico/ico_download.png" class="ico-down">쿠폰 다운
                </button>
                <button type="button" class="btn btn-default btn-action" @click="toggleCouponArea($event)">오프라인쿠폰등록</button>
            </div>
            <div class="coupon-input-area">
                <h3 class="form-title">등록할 쿠폰이 있으신가요?</h3>
                <div class="form-line">
                    <div class="flex">
                        <input type="text" v-model="offlineCoupon" class="form-basic" placeholder="'-'없이 쿠폰 번호 입력" />
                        <button class="btn btn-black" @click="addOfflineCoupon" >조회</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- // 활성화 -->
        <div class="tabs">
            <a class="tab-item" :class="{ 'active': !param.complete }" @click="pagingComplete(false)">사용 가능</a>
            <a class="tab-item" :class="{ 'active': param.complete }" @click="pagingComplete(true)">사용 완료</a>
        </div>
        <div class="tabs-content">
            <!-- 정렬 -->
            <div class="sort-wrap">
                <p class="all-items">사용가능 쿠폰 ({{coupons.pagination.totalElements}})</p>
                <ul class="sort-list">
                    <li><button type="button" class="sort-item active">전체</button></li>
                    <!--                    <li><button type="button" class="sort-item">상품 쿠폰</button></li>-->
                    <!--                    <li><button type="button" class="sort-item">주문서 쿠폰</button></li>-->
                    <!--                    <li><button type="button" class="sort-item">카테고리쿠폰</button></li>-->
                </ul>
            </div>
            <!-- 쿠폰 영역 -->
            <ul class="coupon-container" :class="{ 'deactive' : param.complete}">
                <li class="coupon-item" v-for="(coupon,index) in coupons.content" :key="index">
                    <div class="flex">
                        <p class="discount"><b>{{formatNumber(coupon.couponPay)}}</b>
                            <span v-if="coupon.couponPayType === '1'">원</span>
                            <span v-else-if="coupon.couponPayType === '2'">%</span>
                        </p>
                        <span class="coupon-type item">상품 쿠폰</span>
                    </div>
                    <p class="title">
                        {{ coupon.couponName }}
                        <span class="sub-title">{{ coupon.couponComment }}</span>
                    </p>
                    <p class="condition" v-if="coupon.couponPayRestriction > 0">{{formatNumber(coupon.couponPayRestriction)}}원 이상 사용가능</p>
                    <p class="condition" v-if="coupon.couponApplyStartDate !== '' && coupon.couponApplyEndDate !== ''">
                        {{dateFormat(coupon.couponApplyStartDate)}} ~ {{dateFormat(coupon.couponApplyEndDate)}}</p>
                    <div class="flex align-end" v-if="param.complete">
                        <span class="used-complete" v-if="coupon.couponUseDate == null">기한 만료</span>
                        <span class="used-complete" v-else>{{coupon.couponUseDate}}</span>
                    </div>
                    <div class="flex align-end" v-if="!param.complete && coupon.couponTargetItemType === '2'">
                           <button type="button" class="coupon-btn" @click="getAppliesTo(coupon.couponId)">적용 상품 보기<i class="arrow"></i>
                           </button>
                    </div>
                </li>

            </ul>
            <!-- 페이징 -->
            <ui-pagination :current-page="coupons.pagination.currentPage" :total-pages="coupons.pagination.totalPages" @change="paging"/>
        </div>
        <!-- // 비활성화 -->

        <ul class="dot-list large-dot">
            <li>사용 기간 내에 사용하지 않은 쿠폰은 삭제됩니다.</li>
            <li>사용 가능 금액 이상으로 주문 시 쿠폰 혜택 적용이 가능합니다.</li>
        </ul>
        <!-- 쿠폰 다운 모달 -->
        <modal-default :class="{'show':modal.couponShow}" :title="'쿠폰 다운로드'" :bodyClass="'p-2'" @modalClose="modal.couponShow=false" class="modal-coupon">
            <button type="button" class="btn btn-default-line btn-all-down" @click="downloadAllCoupon">
                <img src="~/assets/image/ico/ico_download_black_02.svg" class="ico-down">
                <span>모든 쿠폰 다운({{couponDownload.downloadAvailableCount}})</span>
            </button>
            <p class="all-items">총 <strong>{{couponDownload.downloadAvailableCount}}</strong>개</p>
            <!-- 쿠폰리스트 -->
            <ul class="coupon-list-container" v-if="couponDownload.couponPageResponse.content.length > 0">
                <li class="coupon-list line" v-for="(data, index) in couponDownload.couponPageResponse.content">
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
            <template v-if="couponDownload.couponPageResponse.content.length > 0">
                <pagination :current-page="couponDownload.couponPageResponse.pagination.currentPage"
                            :total-pages="couponDownload.couponPageResponse.pagination.totalPages" @change="getCouponDownload" />
            </template>
            <ul class="dot-list large-dot">
                <li>다운로드한 쿠폰은 마이페이지 > 쿠폰에서 확인하실 수 있습니다.</li>
                <li>다운로드한 쿠폰의 유효기간 경과 시 사용할 수 없습니다.</li>
            </ul>
        </modal-default>
        <!-- //쿠폰 다운 모달 -->
        <!--적용상품 모달-->
                <div class="modal item-grid" :class="{'show':modal.itemShow}" >
                    <div class="modal-wrap">
                        <button class="modal-close" @click="modal.itemShow = false">닫기</button>
                        <div class="modal-header">
                            적용상품 보기
                        </div>
                        <div class="modal-body" >
                            <div class="item-list-container vertical" v-if="items.content.length > 0">
                                <div class="item-list item-list-4" v-for="(item, index) in items.content" :key="item.itemId">
                                    <!-- 아이템 썸네일 영역 -->
                                    <item-part-thumbnail :item="item"/>
                                    <!-- 아이템 정보 영역 -->
                                    <item-part-info :item="item"/>
                                </div>
                            </div>
                            <div class="no-contents" v-else>
                                적용 가능한 상품이 없습니다.
                            </div>
                            <!-- // 페이징 -->
                            <ul class="pagination" v-if="items.content.length > 0">
                                    <pagination :current-page="items.pagination.currentPage"
                                                :total-pages="items.pagination.totalPages" @change="getItems" />
                            </ul>
                        </div>
                    </div>
                    <div class="dimmed-bg" @click="this.modal.itemShow = false"></div>
                </div>
    </section>
</template>
<script>
let $s, vm;
import ModalDefault from "@/components/modal/default.vue";
import Pagination from "@/components/ui/pagination.vue";

export default {
    components: {Pagination, ModalDefault},
    watchQuery:true,
    layout: 'mypage',
    name: 'mypage-coupon',
    async asyncData({$salesonApi, query}) {
        const param = {
            page : query.page ?? 1,
            complete : query.complete ==='true',
        }
        const {data} = await $salesonApi().coupon.getCoupons(param);
        console.log(data,"123123122")
        return {
            param : param,
            coupons : {
                content : data.couponPageResponse.content,
                pagination : data.couponPageResponse.pagination
            }
        }

    },
    data() {
        return {
            param : {
                page : 1,
                complete : false,
            },
            coupons : {
                content: [],
                pagination : []
            },

            itemParam : {
                page : 1,
                couponId : 0,
                size : 8
            },
            items : {
                content: [],
                pagination : []
            },
            modal : {
                couponShow : false,
                itemShow : false
            },

            couponDownload : {
                availableCount : 0,
                completedUserCouponCount : 0,
                couponPageResponse : {
                    content : [],
                    pagination : {}
                },
                downloadAvailableCount : 0
            },
            offlineCoupon : "",


        }


    },
    head(){
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'쿠폰'}
            ]
        }
    },
    beforeCreate() {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    methods: {
        pagingComplete(complete) {
            this.param.complete = complete;
            this.paging(1);
        },
        paging(page) {
            const query = {
                page: page,
                complete : this.param.complete,
            }
            this.$router.push({path: this.$route.fullPath, query: query});
        },
        toggleCouponArea() {
            document.querySelector('.coupon-input-area').classList.toggle('show')
        },



        getCouponDownload(page) {
            let param = {
                page: page,
                complete: true
            };
            this.$salesonApi().coupon.getDownloadCoupons(param)
            .then((response) => {
                if (response.status === 200) {
                    vm.modal.couponShow = true;
                    vm.couponDownload = response.data;
                }
            })
            .catch( (error)  =>{
                console.error("Error getDownloadCoupons:", error);
            });

        },
        downloadAllCoupon(){
            const self = this;
            this.$salesonApi().coupon.downloadAllCoupon()
            .then((response) =>{
                if (response.status === 200) {
                    self.$saleson.alert("쿠폰이 다운로드 되었습니다.",  () => {
                        location.reload();
                    });
                }
            })
            .catch((error) =>{
                console.error("Error downloadAllCoupon:", error);
            });
        },
        async downloadCoupon(couponId){

            try{
                let param = {couponId : couponId};
                const {data} = await this.$salesonApi().coupon.downloadCoupon(param);

                if(data.status === 200) {
                    $s.alert('쿠폰받기가 완료 되었습니다.', () =>{
                        location.reload()

                    });
                } else {
                    $s.alert(data.message);
                }
            } catch (e) {
                $s.alert(e.message || e);
            }


        },
        addOfflineCoupon() {
            if (vm.offlineCoupon === "") {
                $s.alert("쿠폰번호를 입력해주세요.");
                return false;
            }

            let param = {
                offlineCode : vm.offlineCoupon
            }
            $s.confirm('등록하시겠습니까?', async ()=> {
                try {
                    const {data} = await this.$salesonApi().coupon.offlineCouponExchange(param);
                    if(data.status === 200) {
                        $s.alert("쿠폰이 등록되었습니다.",() =>{
                            location.reload();
                        });
                    } else {
                        $s.alert(data.message);
                    }
                } catch (e) {
                    $s.alert(e.message || e);
                }

            })

        },




        getItems(page) {
            vm.itemParam.page = page;
            this.getAppliesTo(vm.itemParam.couponId)
        },
        async getAppliesTo(couponId){
            vm.itemParam.couponId = couponId;

            try {
                const {data} = await this.$salesonApi().coupon.getAppliesTo(vm.itemParam);
                vm.items = data.pageContent;
                vm.modal.itemShow = true;
            } catch (e) {
                $s.alert(e.message || e)
            }
        },

        hideModal(){
            this.modal.itemShow = false;
        },
    },
}
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_coupon.scss";
</style>