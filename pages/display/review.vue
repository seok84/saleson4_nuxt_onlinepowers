<template>
    <div class="item-list-page display-page display-review">
        <h1 class="title-h1">리뷰</h1>
        <!-- btn-display-tab-more 클릭 시 더보기 활성화 -> display-tab-wrap.on  -->
        <!-- 탭메뉴 개수가 적으면 less 클래스 붙여야함 -> display-tab-wrap.less (더보기 버튼 없어짐)  -->
        <div class="display-tab-wrap">
            <ul class="display-tab">
                <li v-for="(brand, index) in brandList" :key="`${brand}${index}`"
                    :class="{ 'on': activeBrand === index }" @click="activeBrandFN(index)">
                    {{ brand.name }}
                </li>
            </ul>
            <div class="btn-display-tab-more"><i></i></div>
        </div>
        <div class="filter-wrap">
            <p>총 <b>123</b>개 상품</p>
        </div>
        <!-- 리뷰템리스트 -->
        <section class="review-container">
            <!-- item 01 -->
            <div class="review-box">
                <div class="thumbnail">
                    <img src="~/assets/image/sample/sample_01.png" class="thumb-img">
                </div>
                <div class="content">
                    <img src="~/assets/image/ico/ico_review_quotes.svg" class="ico-quotes">
                    <p class="review-text">
                        쓰던 제품 추가로 구매했는데 배송이 빨라 너무 맘에 마음에 들어요! 색 너무 예뻐서 너무 만족스럽고불량아니라서 넘 좋고 잘 사용하겠습니다~
                    </p>
                    <div class="score-wrap">
                        <span class="star active"></span>
                        <span class="star active"></span>
                        <span class="star active"></span>
                        <span class="star active"></span>
                        <span class="star"></span>
                    </div>
                    <p class="item-title">[아이카사] 카페 세트_얼그레이 밀크티 세트</p>
                </div>
            </div>
            <!-- item 02 -->
            <div class="review-box">
                <div class="thumbnail">
                    <img src="~/assets/image/sample/no_content_720480.png" class="thumb-img">
                </div>
                <div class="content">
                    <img src="~/assets/image/ico/ico_review_quotes.svg" class="ico-quotes">
                    <p class="review-text">
                        이 상품은 내 기대를 충족시켰습니다. 디자인이 멋지고, 기능이 매우 효과적입니다. 사용하기 쉬우며, 품질도 매우 훌륭합니다. 이 제품을 사용하면서 전반적으로 만족스러운
                        경험을 했습니다. 가격 대비 가치가 뛰어나고, 배송도 빠르게 이루어져서 좋았습니다. 다음에도 이 브랜드의 제품을 구매할 의향이 있습니다.
                    </p>
                    <div class="score-wrap">
                        <span class="star active"></span>
                        <span class="star active"></span>
                        <span class="star"></span>
                        <span class="star"></span>
                        <span class="star"></span>
                    </div>
                    <p class="item-title">[플라워마켓] 로즈 가든_화이트 로즈 부케 10송이</p>
                </div>
            </div>
            <!-- item 03 -->
            <div class="review-box">
                <div class="thumbnail">
                    <img src="~/assets/image/sample/item_sample_01.png" class="thumb-img">
                </div>
                <div class="content">
                    <img src="~/assets/image/ico/ico_review_quotes.svg" class="ico-quotes">
                    <p class="review-text">
                        정말 훌륭해요! 강추합니다!
                    </p>
                    <div class="score-wrap">
                        <span class="star active"></span>
                        <span class="star active"></span>
                        <span class="star active"></span>
                        <span class="star active"></span>
                        <span class="star"></span>
                    </div>
                    <p class="item-title">[키친마스터] 프리미엄 새우_냉동 생선가게 직송 5kg</p>
                </div>
            </div>
            <!-- item 04 -->
            <div class="review-box">
                <div class="thumbnail">
                    <img src="~/assets/image/sample/thum.png" class="thumb-img">
                </div>
                <div class="content">
                    <img src="~/assets/image/ico/ico_review_quotes.svg" class="ico-quotes">
                    <p class="review-text">
                        쓰던 제품 추가로 구매했는데 배송이 빨라 너무 맘에 마음에 들어요! 색 너무 예뻐서 너무 만족스럽고불량아니라서 넘 좋고 잘 사용하겠습니다~
                    </p>
                    <div class="score-wrap">
                        <span class="star active"></span>
                        <span class="star active"></span>
                        <span class="star active"></span>
                        <span class="star active"></span>
                        <span class="star"></span>
                    </div>
                    <p class="item-title">[스마트홈] 보안 카메라_1080p WiFi 야외 모션 감지</p>
                </div>
            </div>
        </section>
        <!-- 페이징 -->
        <ul class="pagination">
            <li class="page-item"><span class="page-prev">이전페이지</span></li>
            <li class="page-item active"><span class="page-link">1</span></li>
            <li class="page-item"><span class="page-link">2</span></li>
            <li class="page-item"><span class="page-link">3</span></li>
            <li class="page-item"><span class="page-link">4</span></li>
            <li class="page-item"><span class="page-link">5</span></li>
            <li class="page-item"><span class="page-next">이전페이지</span></li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'review-event',
    head(){
        return {
            meta: [
                {hid:'pageTitle', name:'pageTitle', content: '이벤트'}
            ]
        }
    },
    data() {
        return {
            isVisible: false,
            activeBrand: 0,
            brandList: [
                { name: '브랜드01'},
                { name: '브랜드 브랜드 브랜드  브랜드 02'},
                { name: '브랜드03'},
                { name: '브랜드04'},
                { name: '브랜드05'},
                { name: '브랜드06'},
                { name: '브랜드07'},
                { name: '브랜드08'},
                { name: '브랜드 브랜드 09'},
                { name: '브랜드10'},
                { name: '브랜드11'},
                { name: '브랜드12'},
                { name: '브랜드13'},
            ]
        }
    },
    methods: {
        activeBrandFN(index){
            this.activeBrand = index;
        }
    },
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/items/item_list.scss";
@import "~/assets/scss/pages/display/display.scss";
</style>