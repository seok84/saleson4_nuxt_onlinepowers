<template>
    <section class="mypage-review">
        <div class="title-container">
            <h2 class="title-h2">이용후기</h2>
        </div>
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
        <ul class="review-content" v-if ="review.content != null && review.content.length > 0">
            <li v-for="(data, index) in review.content" :key="data.itemReviewId">
                <!-- 상품영역 -->
                <div class="item-list-container horizon">
                    <div class="item-list">
                        <!-- 아이템 썸네일 영역 -->
                        <div class="thumbnail-container" :class="{'sold-out': data.itemSoldOutFlag==='Y' }" >
                            <div class="sold-out-wrap" v-if="data.itemSoldOutFlag==='Y'">
                                <span>
                                    <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                </span>
                            </div>
                            <nuxt-link :to="'/item/'+ data.itemUserCode" class="thumbnail-wrap">
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
                                <img  class="thumbnail" :src="itemImage(data.itemImageSrc)" :alt="unescapeHtml(data.itemName)" @error="errorImage">
                            </nuxt-link>
                        </div>
                        <!-- 아이템 정보 영역 -->
                        <div class="info-container">
                            <div class="title-main paragraph-ellipsis">
                                {{data.itemName}}
                            </div>
                        </div>
                    </div>
                </div>
                <span class="divider"></span>
                <!-- 평점 상태 -->
                <div class="eval">
                    <div class="score-wrap">
                         <span v-for="n in 5" :key="n" :class="['star', { active: n <= data.score }]"
                         ></span>
                    </div>
                    <div class="util">
                        <span class="date">{{ dateFormat(data.createdDate, 'date') }}</span>
                        <span class="divider"></span>
                        <button type="button" @click ="deleteReview(data.itemReviewId)" class="delete-inquiry">삭제</button>
                    </div>
                </div>
                <!-- 사용자 리뷰 -->
                <div class="user-writing">
                    <p class="content">
                        {{data.content}}
                    </p>
                    <ul class="photo-list">
                        <li class="photo-item" v-for="(image, index) in data.images" :key="'img_' + index" @click.prevent="showReviewImage(data.images)" >
                            <div>
                                <img :src="itemImage(image)" :alt="'img_' + image" class="thumbnail" @error="errorImage">
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 관리자 답변 -->
                <div class="admin-answer" v-if="data.adminComment != null">
                    <p class="administrator">관리자 답변</p>
                    <div class="content">
                        {{data.adminComment}}
                    </div>
                    <!--                    <p class="date">2022-06-14</p>-->
                </div>

            </li>
        </ul>
        <ul v-else>
            <p>조회 된 이용후기가 없습니다.</p>
        </ul>
        <reviewImage :showFlag="showImageModal.show" @close="showImageModal.show=false" :imageList="showImageModal.image" ></reviewImage>
        <ui-pagination :current-page="review.pagination.currentPage" :total-pages="review.pagination.totalPages" @change="paging"/>
    </section>
</template>
<script>
import Pagination from "@/components/ui/pagination";
import reviewImage from "~/components/modal/review-image-modal.vue";
import LocalDate from "@/modules/utils/LocalDate";
let $s, vm;

export default {
    watchQuery:true,
    components: {Pagination, reviewImage},
    layout: 'mypage',
    name: 'mypage-review',
    async asyncData({$salesonApi, query}) {
        try{
            const param = {
                page : query.page ?? 1,
                size : 5,
                searchStartDate : query.searchStartDate,
                searchEndDate : query.searchEndDate,
            }


            const {data} = await $salesonApi().mypage.getItemReviews(param);
            return {
                param : param,
                review : data.reviewPageResponse
            }
        }catch (e) {
            console.log(e)
        }


    },
    data() {
        return {
            selectedPeriod: '',
            param: {
                page: 1,
                size: 5,
                searchStartDate: "",
                searchEndDate: "",
            },

            // 등록된 이용후기
            review: {
                content: [],
                pagination: []
            },

            showImageModal: {
                show: false,
                image: []
            },
        }
    },
    head(){
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'이용후기'}
            ]
        }
    },
    beforeCreate () {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    mounted () {
        vm.$nextTick(() => {


        });
    },
    methods : {
        paging(page) {
            const query = {
                page: page,
                size : this.param.size,
                searchStartDate : this.param.searchStartDate,
                searchEndDate : this.param.searchEndDate,
                selectedPeriod : this.selectedPeriod
            }
            this.$router.push({path: this.$route.fullPath, query: query});
        },

        deleteReview (id){
            $s.confirm('후기를 삭제하시겠습니까?', async () => {
                
                try{
                    const {data} = await this.$salesonApi().mypage.deleteReview(id);
                            if(data.status === 200) {
                                $s.alert("삭제되었습니다.", () => {
                                    location.reload();
                                });
                            }
                }catch (e) {
                    $s.alert(e.message || e);
                }
                



            });
        },
        bindSearchDate() {
            if (vm.selectedPeriod === '') {
                vm.param.searchStartDate = '';
                vm.param.searchEndDate = '';
            } else {
                vm.param.searchStartDate = LocalDate.now().minusMonths(vm.selectedPeriod).toString();
                vm.param.searchEndDate = LocalDate.now().toString();
            }
        },
        showReviewImage(image){
            vm.showImageModal.show = true;
            vm.showImageModal.image = image;
        },
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_review.scss";
</style>