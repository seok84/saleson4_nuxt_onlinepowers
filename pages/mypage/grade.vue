<template>
    <section class="mypage-grade">
        <div class="title-container">
            <h2 class="title-h2">나의 등급/혜택</h2>
        </div>
        <div class="grade-info">
            <div class="info">
                <span>고객님의 회원 등급은</span>
                <strong>{{grade.userLevel}}</strong>

            </div>

        </div>
        <p class="page-sub-title">회원 등급 혜택</p>
        <!-- pc -->
        <table class="grade-table grade-content">
            <colgroup>
                <col width="13.5%">
                <col v-for="grade in grade.list" :key="grade.levelId">
            </colgroup>
            <thead>
            <tr class="bg">
                <th></th>
                <th v-for="grade in grade.list" :key="grade.levelId">
                    <p class="grade">
                        <img :src="(itemImage(grade.fileSrc))" :alt="grade.levelName" >
                        <strong>{{ grade.levelName }}</strong>
                    </p>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr class="desc">
                <th class="bold">적립혜택</th>
                <td v-for="grade in grade.list" :key="grade.levelId">{{formatNumber(grade.pointRate)}}%</td>
            </tr>
            <tr class="desc">
                <th class="bold">구매시할인</th>
                <td v-for="grade in grade.list" :key="grade.levelId">{{formatNumber(grade.discountRate)}}%</td>
            </tr>


            </tbody>
        </table>
        <ul class="dot-list large-dot">
            <li class="title">회원 등급 선정 기준 및 혜택 이용안내</li>
            <li>회원등급은 등급산정일로부터 6개월간의 구매확정 된 구매실적을 기준으로 산정됩니다.</li>
            <li>구매실적은 쿠폰, 포인트 등을 할인적용한 후의 최종 결제 금액을 기준으로 산정됩니다.</li>
            <li>적립은 '상품 적립', '등급 별 추가 적립'순으로 적립됩니다.</li>
            <li>쿠폰은 등급 변경 후 매월 1일 00:00 시에 적립됩니다.</li>
            <li>회원 등급, 쿠폰, 포인트 이용에 대한 궁금하신 사항은 고객센터의 FAQ를 참고해 주시기 바랍니다.</li>

        </ul>
    </section>
</template>
<script>
export default {
    layout: 'mypage',
    async asyncData({$salesonApi}){
        try{
            const {data} = await $salesonApi().mypage.getGrade();
            return {
                grade : data
            }
        } catch (e) {
            console.log(e);
        }


    },
    data() {
        return {
        isTooltipActive: false,
        grade : {
            list : {},
            userLevel : ""
        }
        };
    },
    head(){
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'나의 등급/혜택'}
            ]
        }
    },
    methods: {
        showModalCoupon() {
        document.querySelector('.modal-coupon').classList.add('show');
        },
        hideModal(e) {
        e.target.closest('.modal').classList.remove('show');
        },
        toggleTooltip() {
        this.isTooltipActive = !this.isTooltipActive;
        },
        closeTooltip() {
        this.isTooltipActive = false;
        },

    },
};
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_grade.scss";
</style>