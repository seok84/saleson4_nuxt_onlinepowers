<template>
    <div class="item-list-page display-page">
        <h1 class="title-h1">타임세일</h1>
        <div class="display-ad pc">
            <img src="~/assets/image/item/timesale_banner.png" alt="banner-pc">
        </div>
        <div class="display-ad mobile">
            <img src="~/assets/image/item/timesale_banner_mo.png" alt="banner-mobile">
        </div>

        <div class="filter-wrap">
            <p>총 <b>123</b>개 상품</p>
            <div class="select-wrap">
                <select class="input-select">
                    <option value="">인기순</option>
                    <option value="">추천순</option>
                    <option value="">최신순</option>
                    <option value="">높은가격순</option>
                    <option value="">낮은가격순</option>
                    <option value="">옵션</option>
                </select>
            </div>
        </div>
        <!-- 아이템리스트 -->
        <div class="item-list-container vertical">
            <div class="item-list item-list-3 timedeal-list">
                <!-- 아이템 썸네일 영역 -->
                <div class="thumbnail-container sold-out">
                    <div class="sold-out-wrap">
                        <span>
                            <img src="~/assets/image/sample/sold-out.png" alt="품절">
                        </span>
                    </div>
                    <!-- <div class="rank">01</div> -->
                    <div to="/" @click.prevent class="thumbnail-wrap">
                        <div class="thumbnail-area">
                            <img class="top-left" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                            <img class="top-right" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                            <img class="bottom-left" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                            <img class="bottom-right" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                            <img class="center-center">
                        </div>
                        <img class="thumbnail" src="~/assets/image/sample/thum.png" alt="썸네일">
                    </div>
                    <div class="timedeal">
                        <p>
                            <span>TIME</span>
                            <span>SALE</span>
                        </p>
                        <p>
                            <span>09:38 ~ 11:59</span>
                            <span>월 · 화 · 수 · 목 · 금 · 토 · 일</span>
                        </p>
                    </div>
                    <!-- <div class="timedeal">
                        <p>
                            <span>TIME</span>
                            <span>SALE</span>
                        </p>
                        <p class="d-day">
                            <span>09:38 ~ 11:59</span>
                            <span>월 · 화 · 수 · 목 · 금 · 토 · 일</span>
                        </p>
                    </div> -->
                    <div class="user-action">
                        <div class="user-ico user-attention">관심상품</div>
                        <div class="user-ico user-basket">장바구니</div>
                    </div>
                </div>
                <!-- 아이템 정보 영역 -->
                <div class="info-container">
                    <div class="title-main paragraph-ellipsis">
                        [브랜드명] 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2
                    </div>
                    <div class="title-sub paragraph-ellipsis">
                        서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브
                        타이틀 서브
                        타이틀
                        서브
                        타이틀
                    </div>
                    <div class="discounted">
                        138,000원
                    </div>
                    <div class="price-wrap">
                        <p class="price">
                            <span>108,000</span>
                            <span>원</span>
                        </p>
                        <p class="sale">
                            27%
                        </p>
                    </div>
                    <div class="tag-wrap">
                        <div class="tag new">신상품</div>
                        <div class="tag md">MD추천</div>
                        <div class="tag coupon">쿠폰</div>
                        <div class="tag delivery">무료배송</div>
                        <div class="tag best">베스트</div>
                        <div class="tag timesale">타임세일</div>
                        <div class="tag event">이벤트</div>
                    </div>
                </div>
            </div>
            <div class="item-list item-list-3 timedeal-list">
                <!-- 아이템 썸네일 영역 -->
                <div class="thumbnail-container sold-out">
                    <div class="sold-out-wrap">
                        <span>
                            <img src="~/assets/image/sample/sold-out.png" alt="품절">
                        </span>
                    </div>
                    <!-- <div class="rank">01</div> -->
                    <div to="/" @click.prevent class="thumbnail-wrap">
                        <div class="thumbnail-area">
                            <img class="top-left" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                            <img class="top-right" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                            <img class="bottom-left" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                            <img class="bottom-right" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                            <img class="center-center">
                        </div>
                        <img class="thumbnail" src="~/assets/image/sample/thum.png" alt="썸네일">
                    </div>
                    <!-- <div class="timedeal">
                        <p>
                            <span>TIME</span>
                            <span>SALE</span>
                        </p>
                        <p>
                            <span>09:38 ~ 11:59</span>
                            <span>월 · 화 · 수 · 목 · 금 · 토 · 일</span>
                        </p>
                    </div> -->
                    <div class="timedeal">
                        <p>
                            <span>TIME</span>
                            <span>SALE</span>
                        </p>
                        <p class="d-day">
                            <span>00D</span>
                            <span>00 : 00 : 00</span>
                        </p>
                    </div>
                    <div class="user-action">
                        <div class="user-ico user-attention">관심상품</div>
                        <div class="user-ico user-basket">장바구니</div>
                    </div>
                </div>
                <!-- 아이템 정보 영역 -->
                <div class="info-container">
                    <div class="title-main paragraph-ellipsis">
                        [브랜드명] 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2
                    </div>
                    <div class="title-sub paragraph-ellipsis">
                        서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브
                        타이틀 서브
                        타이틀
                        서브
                        타이틀
                    </div>
                    <div class="discounted">
                        138,000원
                    </div>
                    <div class="price-wrap">
                        <p class="price">
                            <span>108,000</span>
                            <span>원</span>
                        </p>
                        <p class="sale">
                            27%
                        </p>
                    </div>
                    <div class="tag-wrap">
                        <div class="tag new">신상품</div>
                        <div class="tag md">MD추천</div>
                        <div class="tag coupon">쿠폰</div>
                        <div class="tag delivery">무료배송</div>
                        <div class="tag best">베스트</div>
                        <div class="tag timesale">타임세일</div>
                        <div class="tag event">이벤트</div>
                    </div>
                </div>
            </div>
        </div>
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
    name:'timedeal',
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
        }
    },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/items/item_list.scss";
@import "~/assets/scss/pages/display/display.scss";
</style>