<template>
    <section class="mypage-point">
        <div class="title-container">
            <h2 class="title-h2">포인트</h2>
        </div>
        <div class="m-line-divider">
            <div class="useable-point-box">
                <p>사용가능 포인트<em>{{formatNumber(userPoint)}}P</em></p>
            </div>
        </div>
        <!-- // 활성화 -->
        <div class="tabs">
            <a class="tab-item"  :class="{ active: param.pointType === 'EARN_POINT' }" @click="changePointType('EARN_POINT')">사용 가능</a>
            <a class="tab-item" :class="{ active: param.pointType === 'USED_POINT' }" @click="changePointType('USED_POINT')" >사용 완료</a>
        </div>
        <div class="tabs-content">
            <div class="period-container">
                <label class="date"><input type="date" v-model="param.searchStartDate" class="form-basic"><i></i></label>
                <span class="divider">~</span>
                <label class="date"><input type="date" v-model="param.searchEndDate" class="form-basic"><i></i></label>
                <div class="form-line box">
                    <div class="flex">
                        <div class="select-wrap">
                            <select v-model="selectedPeriod" class="input-select" @change="bindSearchDate()">
                                <option value="">조회기간</option>
                                <option value="1">1개월</option>
                                <option value="3">3개월</option>
                                <option value="6">6개월</option>
                                <option value="12">1년</option>
                            </select>
                        </div>
                        <button  @click="paging(1)" class="btn btn-black">조회</button>
                    </div>
                </div>
            </div>
            <p class="all-items">총 <strong>{{formatNumber(point.pagination.totalElements)}} </strong>개</p>
            <ul class="point-list" v-if="point.content != null && point.content.length > 0">
                <li class="list" v-if="param.pointType === 'EARN_POINT'"
                    v-for="(data,index) in point.content" :key="data.pointId">
                    <p class="title">
                        <strong>{{data.reason}} </strong>
                        <span class="point">+{{formatNumber(data.savedPoint)}}P</span>
                    </p>
                    <p class="info">
                        <span class="sub">잔여포인트</span>
                        <span>{{data.point}} P</span>
                    </p>
                    <p class="info">
                        <span class="sub">적립일</span>
                        <span>{{dateFormat(data.createdDate)}}</span>
                    </p>
                    <p class="info">
                        <span class="sub">소멸예정일</span>
                        <span>{{dateFormat(data.expirationDate, 'date')}}</span>
                    </p>
                </li>
                <li class="list" v-if="param.pointType === 'USED_POINT'"
                    v-for="(data,index) in point.content" :key="data.pointId">
                <p class="title">
                    <strong>{{data.reason}} </strong>
                    <span class="point used">-{{formatNumber(data.point)}}P</span>
                </p>
                <p class="info">
                    <span class="sub">사용일</span>
                    <span>{{dateFormat(data.createdDate)}}</span>
                </p>
                </li>
            </ul>
            <div class="common_none" v-else><p>조회 된 포인트가 없습니다.</p></div>
            <!-- 포인트 발행 내역 -->
            <!-- 페이징 -->
            <ui-pagination :current-page="point.pagination.currentPage" :total-pages="point.pagination.totalPages" @change="paging"/>
        </div>
    </section>
</template>
<script>
import LocalDate from "@/modules/utils/LocalDate";
import Pagination from "@/components/ui/pagination";

let $s, vm;
export default {
    watchQuery:true,
    components: {Pagination},
    layout: 'mypage',
    async asyncData({$salesonApi, query}) {
        try {
            const param = {
                page : query.page ?? 1,
                size : 5,
                pointType : query.pointType ?? 'EARN_POINT',
                searchStartDate : query.searchStartDate,
                searchEndDate : query.searchEndDate,
            }

            const {data} = await $salesonApi().mypage.getPoints(param);
            return {
                param : param,
                userPoint : data.userPoint,
                point : data.pointPageResponse,
                selectedPeriod: query.selectedPeriod || ""
            }
        } catch (e) {
            console.log(e);
        }

    },
    data() {
        return {
            selectedPeriod : "",
            userPoint : 0,
            param : {
                page : 1,
                size : 5,
                pointType : "",
                searchStartDate : "",
                searchEndDate : "",


            },
            point : {
                content : [],
                pagination : []
            },

        }
    },
    head() {
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'포인트'}
            ]
        };
    },
    beforeCreate() {
        $s = this.$saleson;
        vm = this;
    },
    mounted() {
        vm.$nextTick(() => {})

    },
    methods:{
        bindSearchDate() {
            if (vm.selectedPeriod === "") {
                vm.param.searchStartDate = "";
                vm.param.searchEndDate = "";
            } else {
                vm.param.searchStartDate = LocalDate.now().minusMonths(vm.selectedPeriod).toString();
                vm.param.searchEndDate = LocalDate.now().toString();
            }
        },
        paging(page) {
            const query = {
                page: page,
                size : this.param.size,
                pointType : this.param.pointType,
                searchStartDate : this.param.searchStartDate,
                searchEndDate : this.param.searchEndDate,
                selectedPeriod : this.selectedPeriod
            }
            this.$router.push({path: this.$route.fullPath, query: query});
        },

        changePointType(pointType){
           vm.param.searchStartDate = '';
           vm.param.searchEndDate = '';
           vm.selectedPeriod = '';
           vm.param.pointType = pointType;
           vm.param.page = 1;

           vm.paging(1)

        },


    },

}
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_point.scss";
</style>