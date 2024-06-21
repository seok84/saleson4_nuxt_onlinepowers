<template>
    <section class="mypage-inquiry">
        <div class="title-container">
            <h2 class="title-h2">상품문의</h2>
        </div>
        <!-- <div class="all-items">전체 <strong>123</strong>개</div> -->
        <div class="select-wrap">
            <div class="flex">
                <select class="input-select" v-model="selectedQnaGroup" @change="setQnaGroup">
                    <option value="">문의 유형을 선택하세요</option>
                    <option v-for="(group, index) in qnaGroups" :key="index" :value="group.id">{{ group.label }}</option>
                </select>
                <button @click="paging(1)" class="btn btn-form m-w-98">조회</button>
            </div>
        </div>
        <ul class="review-content" v-if ="result.content != null && result.content.length > 0">
            <li v-for="(data, index) in result.content" :key="data.id">
                <!-- 상품영역 -->
                <div class="item-list-container horizon">
                    <div class="item-list">
                        <!-- 아이템 썸네일 영역 -->
                        <div class="thumbnail-container">
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
                                <img  class="thumbnail" :src="itemImage(data.itemImage)" :alt="unescapeHtml(data.itemName)" @error="errorImage">
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
                <!-- 답변 상태 -->
                <div class="delivery-status-wrap">
                    <p class="status answer-waiting" v-if="data.answerFlag !== true">답변대기</p>
                    <p class="status answer-completed" v-else >답변완료</p>
                    <div class="util">
                        <span class="date">{{ data.date }}</span>
                        <span class="divider"></span>
                        <button type="button" class="delete-inquiry" @click="deleteItemQna(data.id)" >삭제</button>
                    </div>
                </div>
                <!-- 사용자 문의 -->
                <div class="user-writing">
                    <p class="title"><strong>[{{data.label}}]</strong><span>{{data.subject}}</span></p>
                    <p class="content">{{data.question}} </p>
                </div>

                <div class="admin-answer" v-if="data.answerFlag === true">
                    <p class="administrator">관리자 답변</p>
                    <p class="title">{{data.answer.title}} </p>
                    <div class="content"> {{data.answer.answer}} </div>
                    <p class="date">{{data.answer.date}}</p>
                </div>
            </li>
        </ul>
        <div class="common_none" v-else><p>조회 된 QnA가 없습니다.</p></div>

        <ui-pagination :current-page="result.pagination.currentPage" :total-pages="result.pagination.totalPages" @change="paging"/>

    </section>
</template>
<script>
import Pagination from "@/components/ui/pagination.vue";

let $s, vm;
export default {
    watchQuery:true,
    components: {Pagination},
    layout: 'mypage',
    name: 'mypage-inquiry-item',
    async asyncData({$salesonApi, query}) {
        try{
            const qnaGroups = await $salesonApi().qna.getQnaGroups();

            const param = {
                page: query.page ?? 1,
                size: 5
            }
            const {data} = await $salesonApi().qna.getItemInquiries(param)
            return {
                qnaGroups : qnaGroups.data.list,
                result : {
                        content : data.content,
                        pagination : data.pagination
                }
            }
        } catch (e) {
            console.log(e);
        }

    },

    data() {
        return {
            param : {
                    page: 1,
                    size : 5,
                    qnaGroup: ''
            },

            result: {
                content: [],
                pagination: []
            },
            selectedQnaGroup: ""
        }
    },
    head(){
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'상품문의'}
            ]
        }
    },
    beforeCreate () {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    mounted () {
        vm.$nextTick(() => {});
    },
    methods : {
        paging(page) {

            const query = {
                page: page,
                size : this.param.size,
                qnaGroup : this.param.qnaGroup
            }
            this.$router.push({path: this.$route.fullPath, query: query});
        },

        setQnaGroup() {
            if (vm.selectedQnaGroup === '') {
                vm.param.qnaGroup = '';
            } else {
                vm.param.qnaGroup = vm.selectedQnaGroup;
            }
        },
        deleteItemQna (id) {
            $s.confirm('문의를 삭제하시겠습니까?', async () => {
                try {
                    const {data} = await this.$salesonApi().qna.delItemInquiry(id);
                    if(data.status === 200) {
                        $s.alert("삭제되었습니다.",  () => {
                            location.reload();
                        });
                    } else {
                        $s.alert(data.status,"답변완료된 문의는 삭제할 수 없습니다.");
                    }

                } catch(e) {
                    $s.alert(e.message || e);
                }

            });
        },
    }
}
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_review.scss";
</style>