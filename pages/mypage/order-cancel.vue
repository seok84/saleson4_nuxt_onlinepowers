<template>
    <section class="mypage-order order-cancel">
        <div class="title-container">
            <h2 class="title-h2">취소/반품/교환 신청</h2>
        </div>
        <ul class="dot-list pc">
            <li>제품 구매 후, 14일이 지나면 자동으로 '구매확정'이 됩니다.</li>
            <li>[주문상세]를 클릭하시면 주문 상세 내역 및 상품별 배송현황을 조회하실 수 있습니다.</li>
        </ul>

        <ul class="tabs">
            <li class="tab-item" :class="{ 'active': tabActive === 0 }" @click="claimTab('cancel-process')">취소신청</li>
            <li class="tab-item" :class="{ 'active': tabActive === 1 }" @click="claimTab('return-process')">반품신청</li>
            <li class="tab-item" :class="{ 'active': tabActive === 2 }" @click="claimTab('exchange-process')">교환신청</li>
        </ul>

        <!-- 취소신청 -->
        <div class="tabs-content tab-cancel" v-show="tabActive === 0">
            <period-search @paging="paging" @param="search" />
            <!-- // 주문 내역 -->
            <template v-if="order.result.content != null">
                <div class="order-item-wrapper">
                    <template v-for="(o, index) in order.result.content">
                        <div class="order-item">
                            <div class="info">
                                <span class="date">{{dateFormat(o.createdDate)}}</span>
                                <a :href="'/mypage/order/' + o.orderSequence + '/' + o.orderCode" class="detail">
                                    <span>{{o.orderCode}}</span>
                                    <span class='detail-linked'>주문상세</span>
                                    <i class="arrow"></i>
                                </a>
                            </div>
                            <div class="order-status">
                                <template v-for="(data, index) in o.items">
                                    <OrderItem :item="data" :btn-flag="false" />
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
                <ui-pagination :current-page="order.result.pagination.currentPage" :total-pages="order.result.pagination.totalPages" @change="paging"/>
            </template>
            <div class="common_none" v-else>
                <p>주문내역이 없습니다.</p>
            </div>
        </div>

        <!-- 반품신청 -->
        <div class="tabs-content tab-cancel" v-show="tabActive === 1">
            <div class="period-container">
                <label class="date"><input type="date" class="form-basic"><i></i></label>
                <span class="divider">~</span>
                <label class="date"><input type="date" class="form-basic"><i></i></label>
                <div class="select-wrap box">
                    <select class="input-select">
                        <option value="">조회기간</option>
                        <option value="">옵션</option>
                    </select>
                </div>
                <div class="form-line box">
                    <div class="flex">
                        <input type="text" class="form-basic" placeholder="검색어를 입력하세요" />
                        <button class="btn btn-black">조회</button>
                    </div>
                </div>
            </div>
            <!-- // 주문 내역 -->
            <template v-if="order.result.content != null">
                <div class="order-item-wrapper">
                    <template v-for="(o, index) in order.result.content">
                        <div class="order-item">
                            <div class="info">
                                <span class="date">{{dateFormat(o.createdDate)}}</span>
                                <a :href="'/mypage/order/' + o.orderSequence + '/' + o.orderCode" class="detail">
                                    <span>{{o.orderCode}}</span>
                                    <span class='detail-linked'>주문상세</span>
                                    <i class="arrow"></i>
                                </a>
                            </div>
                            <div class="order-status">
                                <template v-for="(data, index) in o.items">
                                    <OrderItem :item="data" :btn-flag="false" />
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
                <ui-pagination :current-page="order.result.pagination.currentPage" :total-pages="order.result.pagination.totalPages" @change="paging"/>
            </template>
            <div class="common_none" v-else>
                <p>주문내역이 없습니다.</p>
            </div>
        </div>

        <!-- 교환신청 -->
        <div class="tabs-content tab-cancel" v-show="tabActive === 2">
            <div class="period-container">
                <label class="date"><input type="date" class="form-basic"><i></i></label>
                <span class="divider">~</span>
                <label class="date"><input type="date" class="form-basic"><i></i></label>
                <div class="select-wrap box">
                    <select class="input-select">
                        <option value="">조회기간</option>
                        <option value="">옵션</option>
                    </select>
                </div>
                <div class="form-line box">
                    <div class="flex">
                        <input type="text" class="form-basic" placeholder="검색어를 입력하세요" />
                        <button class="btn btn-black">조회</button>
                    </div>
                </div>
            </div>
            <!-- // 주문 내역 -->
            <template v-if="order.result.content != null">
                <div class="order-item-wrapper">
                    <template v-for="(o, index) in order.result.content">
                        <div class="order-item">
                            <div class="info">
                                <span class="date">{{dateFormat(o.createdDate)}}</span>
                                <a :href="'/mypage/order/' + o.orderSequence + '/' + o.orderCode" class="detail">
                                    <span>{{o.orderCode}}</span>
                                    <span class='detail-linked'>주문상세</span>
                                    <i class="arrow"></i>
                                </a>
                            </div>
                            <div class="order-status">
                                <template v-for="(data, index) in o.items">
                                    <OrderItem :item="data" :btn-flag="false" />
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
                <ui-pagination :current-page="order.result.pagination.currentPage" :total-pages="order.result.pagination.totalPages" @change="paging"/>
            </template>
            <div class="common_none" v-else>
                <p>주문내역이 없습니다.</p>
            </div>
        </div>

    </section>
</template>
<script>
    import OrderItem from "@/components/order/order-item.vue";
    import Pagination from "@/components/ui/pagination.vue";
    import PeriodSearch from "@/components/form/period-search.vue";

    export default {
        components: {OrderItem,Pagination,PeriodSearch},
        layout: 'mypage',
        name: 'order-cancel',
        head(){
            return {
                meta: [
                    {hid: 'pageTitle', name:'pageTitle', content:'취소/반품/교환 신청'}
                ]
            }
        },
        async asyncData({ $salesonApi }) {
            const self = this;
            try {
                const api = $salesonApi().order;
                const response = await api.getOrderList({
                    page: 1,
                    statusType : 'cancel-process'
                });
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
        data() {
            return {
                order: {
                    result : {}
                },
                param : {
                    searchStartDate : '',
                    searchEndDate : '',
                    query : '',
                    where : 'ITEM_NAME',
                    page : 1,
                    statusType : 'cancel-process'
                },
                tabActive:0
            }
        },
        methods: {
            claimTab(statusType){
                debugger
                this.param.statusType = statusType;
                switch (statusType) {
                    case 'cancel-process':
                        this.tabActive = 0;
                        break;
                    case 'return-process':
                        this.tabActive = 1;
                        break;
                    case 'exchange-process':
                        this.tabActive = 2;
                        break;
                    default:
                        break;
                }
                this.paging(this.param);
            },
            paging(param){
                debugger
                let localParam = {};
                // 페이징 이면
                if (typeof param == 'number'){
                    localParam = {
                        ...this.param,
                        page : param
                    };
                } else {
                    localParam = {
                        ...param,
                        statusType : this.param.statusType
                    };
                }
                const self = this;
                this.$salesonApi().order.getOrderList(localParam)
                .then(function(response){
                    if (response.status === 200) {
                        debugger
                        return self.order.result = response.data;
                    }
                })
                .catch(function(error){
                    console.error("Error paging:", error);
                });
            },
            search(param) {
                this.param.searchStartDate = param.searchStartDate = this.searchDateFormat(param.searchStartDate);
                this.param.searchEndDate = param.searchEndDate = this.searchDateFormat(param.searchEndDate);
            },
            searchDateFormat(date){
                return date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
            }
        }
    }
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_order.scss";
</style>