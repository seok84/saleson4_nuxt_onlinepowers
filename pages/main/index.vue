<template>
    <div class="main">
        <h1 class="hidden">메인화면</h1>
        <!-- visual -->
        <div class="main-visual pc" ref="mainPCSwiper"> <!-- type-carosel class 추가시 carosel type -->
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <nuxt-link to="/" class="pc"><img src="~/assets/image/_temp/main_visual01.png" alt=""></nuxt-link>
                </div>
                <div class="swiper-slide">
                    <nuxt-link to="/" class="pc"><img src="~/assets/image/_temp/main_visual02.png" alt=""></nuxt-link>
                </div>
                <div class="swiper-slide">
                    <nuxt-link to="/" class="pc"><img src="~/assets/image/_temp/main_visual03.png" alt=""></nuxt-link>
                </div>
            </div>
            
            <div class="swiper-controls">
                <button class="swiper-prev">이전</button>
                <button class="swiper-next">다음</button>
            </div>

            <div class="main-swiper-pagination-wrap">
                <button @click.prevent="autoplaySlideMain($event)" class="btn-pause"></button>

                <div class="main-swiper-pagination"></div>
            </div>

        </div>
        <div class="main-visual mobile" ref="mainMSwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <nuxt-link to="/" class="mobile"><img src="~/assets/image/_temp/m_main_visual01.png" alt=""></nuxt-link>
                </div>
                <div class="swiper-slide">
                    <nuxt-link to="/" class="mobile"><img src="~/assets/image/_temp/m_main_visual02.png" alt=""></nuxt-link>
                </div>
                <div class="swiper-slide">
                    <nuxt-link to="/" class="mobile"><img src="~/assets/image/_temp/m_main_visual03.png" alt=""></nuxt-link>
                </div>
            </div>
        </div>

        <!-- 신상품 -->
        <div class="main-title-wrap">
            <nuxt-link class="main-title" to="/">갓- 들어 온 신상품</nuxt-link>
            <p>나오자마자 호감도 상승</p>
        </div>
        <section class="main-new-item-list">
            <ul>
                <li>
                    <div class="thumb"><img src="~/assets/image/_temp/main_new_item01.png" alt=""></div>
                    <div class="hover">
                        <div class="info">
                            <div class="user-action">
                                <div class="user-ico user-attention">관심상품</div>
                                <div class="user-ico user-basket">장바구니</div>
                            </div>
                            <nuxt-link to="/">
                                <div class="goods-title">[브랜드명] 제품명이 노출되는 영역 50g X 2</div>
                                <div class="discounted">138,000원</div>
                                <div class="price-wrap">
                                    <span class="price">
                                        <span>108,000</span>원
                                    </span>
                                    <span class="sale">27%</span>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="thumb"><img src="~/assets/image/_temp/main_new_item02.png" alt=""></div>
                    <div class="hover">
                        <div class="info">
                            <div class="user-action">
                                <div class="user-ico user-attention">관심상품</div>
                                <div class="user-ico user-basket">장바구니</div>
                            </div>
                            <nuxt-link to="/">
                                <div class="goods-title">[브랜드명] 제품명이 노출되는 영역 50g X 2</div>
                                <div class="discounted">138,000원</div>
                                <div class="price-wrap">
                                    <span class="price">
                                        <span>108,000</span>원
                                    </span>
                                    <span class="sale">27%</span>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="thumb"><img src="~/assets/image/_temp/main_new_item03.png" alt=""></div>
                    <div class="hover">
                        <div class="info">
                            <div class="user-action">
                                <div class="user-ico user-attention">관심상품</div>
                                <div class="user-ico user-basket">장바구니</div>
                            </div>
                            <nuxt-link to="/">
                                <div class="goods-title">[브랜드명] 제품명이 노출되는 영역 50g X 2</div>
                                <div class="discounted">138,000원</div>
                                <div class="price-wrap">
                                    <span class="price">
                                        <span>108,000</span>원
                                    </span>
                                    <span class="sale">27%</span>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="thumb"><img src="~/assets/image/_temp/main_new_item04.png" alt=""></div>
                    <div class="hover">
                        <div class="info">
                            <div class="user-action">
                                <div class="user-ico user-attention">관심상품</div>
                                <div class="user-ico user-basket">장바구니</div>
                            </div>
                            <nuxt-link to="/">
                                <div class="goods-title">[브랜드명] 제품명이 노출되는 영역 50g X 2</div>
                                <div class="discounted">138,000원</div>
                                <div class="price-wrap">
                                    <span class="price">
                                        <span>108,000</span>원
                                    </span>
                                    <span class="sale">27%</span>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="thumb"><img src="~/assets/image/_temp/main_new_item05.png" alt=""></div>
                    <div class="hover">
                        <div class="info">
                            <div class="user-action">
                                <div class="user-ico user-attention">관심상품</div>
                                <div class="user-ico user-basket">장바구니</div>
                            </div>
                            <nuxt-link to="/">
                                <div class="goods-title">[브랜드명] 제품명이 노출되는 영역 50g X 2</div>
                                <div class="discounted">138,000원</div>
                                <div class="price-wrap">
                                    <span class="price">
                                        <span>108,000</span>원
                                    </span>
                                    <span class="sale">27%</span>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="thumb"><img src="~/assets/image/_temp/main_new_item06.png" alt=""></div>
                    <div class="hover">
                        <div class="info">
                            <div class="user-action">
                                <div class="user-ico user-attention">관심상품</div>
                                <div class="user-ico user-basket">장바구니</div>
                            </div>
                            <nuxt-link to="/">
                                <div class="goods-title">[브랜드명] 제품명이 노출되는 영역 50g X 2</div>
                                <div class="discounted">138,000원</div>
                                <div class="price-wrap">
                                    <span class="price">
                                        <span>108,000</span>원
                                    </span>
                                    <span class="sale">27%</span>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </li>
            </ul>
        </section>

        <!-- 타임세일 -->
        <div class="main-timesale-bg">
            <div class="main-timesale-area">
                <div class="main-title-wrap">
                    <nuxt-link class="main-title" to="/">찐 혜택 യ 타임세일</nuxt-link>
                    <p>이 순간만 할인하는 상품을 모았어요</p>
                </div>
                <section class="swiper-wrap">
                    <div class="main-timesale" ref="timesaleSwiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="thum">
                                    <img src="~/assets/image/_temp/main_timesale01.png" alt="">
                                </div>
                                <div class="info-container">
                                    <div class="time-area">
                                        <span class="day">99DAY</span>
                                        <span class="time">06 : 18 : 42</span>
                                    </div>

                                    <div class="title-main paragraph-ellipsis">
                                        <b>[브랜드명]</b>제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이
                                        노출되는 영역
                                        50g X 2
                                    </div>
                                    <div class="discounted">
                                        <span>138,000</span>원
                                    </div>
                                    <div class="flex justify-between">
                                        <div class="price-wrap">
                                            <p class="price">
                                                <span>108,000</span>
                                                <span>원</span>
                                            </p>
                                            <p class="sale">
                                                27%
                                            </p>
                                        </div>
                                        <div class="user-action">
                                            <div class="user-ico user-attention">관심상품</div>
                                            <div class="user-ico user-basket">장바구니</div>
                                        </div>
                                    </div>
                                    <div class="tag-wrap type-underline">
                                        <div class="tag new">신상품</div>
                                        <div class="tag md">MD추천</div>
                                        <div class="tag coupon">쿠폰</div>
                                        <div class="tag delivery">무료배송</div>
                                        <div class="tag best">베스트</div>
                                        <div class="tag only">ONLY</div>
                                        <div class="tag salegoods">행사상품</div>
                                        <div class="tag timesale">타임세일</div>
                                        <div class="tag event">이벤트</div>
                                    </div>
                                </div>
                            </div>

                            <div class="swiper-slide">
                                <div class="thum">
                                    <img src="~/assets/image/_temp/main_timesale02.png" alt="">
                                </div>
                                <div class="info-container">
                                    <div class="time-area">
                                        <span class="day">99DAY</span>
                                        <span class="time">06 : 18 : 42</span>
                                    </div>

                                    <div class="title-main paragraph-ellipsis">
                                        <b>[브랜드명]</b>제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이
                                        노출되는 영역
                                        50g X 2
                                    </div>
                                    <div class="discounted">
                                        138,000원
                                    </div>
                                    <div class="flex justify-between">
                                        <div class="price-wrap">
                                            <p class="price">
                                                <span>108,000</span>
                                                <span>원</span>
                                            </p>
                                            <p class="sale">
                                                27%
                                            </p>
                                        </div>
                                        <div class="user-action">
                                            <div class="user-ico user-attention">관심상품</div>
                                            <div class="user-ico user-basket">장바구니</div>
                                        </div>
                                    </div>
                                    <div class="tag-wrap type-underline">
                                        <div class="tag new">신상품</div>
                                        <div class="tag md">MD추천</div>
                                        <div class="tag coupon">쿠폰</div>
                                        <div class="tag delivery">무료배송</div>
                                        <div class="tag best">베스트</div>
                                        <div class="tag only">ONLY</div>
                                        <div class="tag salegoods">행사상품</div>
                                        <div class="tag timesale">타임세일</div>
                                        <div class="tag event">이벤트</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="timesale-swiper-pagination"></div>
                    </div>
                </section>
                <div class="swiper-controls">
                    <button class="swiper-prev">이전</button>
                    <button class="swiper-next">다음</button>
                </div>

            </div>
        </div>


        <!-- 배너영역 -->
        <section class="main-ad-banner-area">
            <div class="flex">
                <nuxt-link to="/" class="img-banner">
                    <img src="~/assets/image/_temp/ad_banner_01.png" alt="" class="pc">
                    <img src="~/assets/image/_temp/ad_banner_01m.png" alt="" class="mobile">
                </nuxt-link>
                <nuxt-link to="/" class="img-banner">
                    <img src="~/assets/image/_temp/ad_banner_02.png" alt="" class="pc">
                    <img src="~/assets/image/_temp/ad_banner_02m.png" alt="" class="mobile">
                </nuxt-link>
                <!-- <nuxt-link to="/" class="txt-banner">
                    <img src="~\assets\image\sample\item_sample_01.png">
                    <p class="banner-title">
                        <em class="category">럭셔리 라이프 스타일</em>
                        <strong class="title">원하는 것이 있다면 끝까지 버텨라</strong>
                        <span class="desc">03.20 MON - 04.02 SUN · 20명 증정</span>
                    </p>
                </nuxt-link>
                <nuxt-link to="/" class="txt-banner">
                    <img src="~\assets\image\sample\item_sample_02.png">
                    <p class="banner-title">
                        <em class="category">럭셔리 라이프 스타일</em>
                        <strong class="title">원하는 것이 있다면 끝까지 버텨라</strong>
                        <span class="desc">03.20 MON - 04.02 SUN · 20명 증정</span>
                    </p>
                </nuxt-link> -->
            </div>
            <div class="full-banner hidden">
                <nuxt-link to="/" class="img-banner">
                    <img src="~/assets/image/_temp/ad_banner_01.png" alt="">
                </nuxt-link>
            </div>
        </section>


        <!-- 베스트상품 -->
        <div class="main-title-wrap">
            <nuxt-link class="main-title" to="/">핫해핫해~ 베스트상품</nuxt-link>
            <p>BEST상품만 골라서 모았어요!</p>
        </div>
        <div class="main-bestitem-area">
            <section class="swiper-wrap">
                <div class="main-bestitem" ref="bestitemSwiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide category-all on">ALL</div>
                        <div class="swiper-slide category1">가구/수납</div>
                        <div class="swiper-slide category2">가전/생활</div>
                        <div class="swiper-slide category3">디자인문구</div>
                        <div class="swiper-slide category4">디지털</div>
                        <div class="swiper-slide category5">뷰티/헬스</div>
                        <div class="swiper-slide category6">여행/레포츠</div>
                        <div class="swiper-slide category7">유아동</div>
                        <div class="swiper-slide category8">인테리어</div>
                        <div class="swiper-slide category9">주방/푸드</div>
                        <div class="swiper-slide category10">키덜트/취미</div>
                        <div class="swiper-slide category11">패브릭</div>
                        <div class="swiper-slide category12">패션의류</div>
                        <div class="swiper-slide category13">패션잡화</div>
                        <div class="swiper-slide category14">펫샵</div>
                    </div>
                </div>
            </section>
            <div class="swiper-controls">
                <button class="swiper-prev">이전</button>
                <button class="swiper-next">다음</button>
            </div>

            <section class="item-list-container">
                <div class="col-left">
                    <div class="item-list">
                        <!-- 아이템 썸네일 영역 -->
                        <div class="thumbnail-container">
                            <div class="thumbnail-wrap">
                                <div class="rank best">01</div>
                                <img class="thumbnail" src="~/assets/image/sample/thum.png" alt="썸네일">
                            </div>
                            <div class="user-action">
                                <div class="user-ico user-attention">관심상품</div>
                                <div class="user-ico user-basket">장바구니</div>
                            </div>
                        </div>
                        <!-- 아이템 정보 영역 -->
                        <div class="info-container">
                            <div class="title-main paragraph-ellipsis">
                                [브랜드명] 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X
                                2
                            </div>
                            <div class="title-sub paragraph-ellipsis">
                                서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브
                                타이틀
                                서브 타이틀 서브
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

                <div class="col-right">
                    <div class="item-list">
                        <!-- 아이템 썸네일 영역 -->
                        <div class="thumbnail-container">
                            <div class="thumbnail-wrap">
                                <div class="rank">02</div>
                                <img class="thumbnail" src="~/assets/image/sample/thum.png" alt="썸네일">
                            </div>
                            <div class="user-action">
                                <div class="user-ico user-attention">관심상품</div>
                                <div class="user-ico user-basket">장바구니</div>
                            </div>
                        </div>
                        <!-- 아이템 정보 영역 -->
                        <div class="info-container">
                            <div class="title-main paragraph-ellipsis">
                                [브랜드명] 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X
                                2
                            </div>
                            <div class="title-sub paragraph-ellipsis">
                                서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브
                                타이틀
                                서브 타이틀 서브
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
                    <div class="item-list">
                        <!-- 아이템 썸네일 영역 -->
                        <div class="thumbnail-container">
                            <div class="thumbnail-wrap">
                                <div class="rank">03</div>
                                <img class="thumbnail" src="~/assets/image/sample/thum.png" alt="썸네일">
                            </div>
                            <div class="user-action">
                                <div class="user-ico user-attention">관심상품</div>
                                <div class="user-ico user-basket">장바구니</div>
                            </div>
                        </div>
                        <!-- 아이템 정보 영역 -->
                        <div class="info-container">
                            <div class="title-main paragraph-ellipsis">
                                [브랜드명] 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X
                                2
                            </div>
                            <div class="title-sub paragraph-ellipsis">
                                서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브
                                타이틀
                                서브 타이틀 서브
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
                    <div class="item-list">
                        <!-- 아이템 썸네일 영역 -->
                        <div class="thumbnail-container">
                            <div class="thumbnail-wrap">
                                <div class="rank">04</div>
                                <img class="thumbnail" src="~/assets/image/sample/thum.png" alt="썸네일">
                            </div>
                            <div class="user-action">
                                <div class="user-ico user-attention">관심상품</div>
                                <div class="user-ico user-basket">장바구니</div>
                            </div>
                        </div>
                        <!-- 아이템 정보 영역 -->
                        <div class="info-container">
                            <div class="title-main paragraph-ellipsis">
                                [브랜드명] 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X
                                2
                            </div>
                            <div class="title-sub paragraph-ellipsis">
                                서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브
                                타이틀
                                서브 타이틀 서브
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
                    <div class="item-list">
                        <!-- 아이템 썸네일 영역 -->
                        <div class="thumbnail-container">
                            <div class="thumbnail-wrap">
                                <div class="rank">05</div>
                                <img class="thumbnail" src="~/assets/image/sample/thum.png" alt="썸네일">
                            </div>
                            <div class="user-action">
                                <div class="user-ico user-attention">관심상품</div>
                                <div class="user-ico user-basket">장바구니</div>
                            </div>
                        </div>
                        <!-- 아이템 정보 영역 -->
                        <div class="info-container">
                            <div class="title-main paragraph-ellipsis">
                                [브랜드명] 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X 2 제품명이 노출되는 영역 50g X
                                2
                            </div>
                            <div class="title-sub paragraph-ellipsis">
                                서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브
                                타이틀
                                서브 타이틀 서브
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
            </section>

            <div class="btn-area">
                <button type="button" class="btn-more">더보기</button>
            </div>
        </div>


        <!-- 브랜드 -->
        <div class="focus-brand-area">
            <section>
                <div class="main-title-wrap">
                    <h2 class="main-title">관심 집중 브랜드ꕤ</h2>
                    <p>세일즈온이 골라본 주목해야 할 브랜드</p>
                </div>
                <div class="brand-list">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide on" data-index="0">
                            <div class="thum"><img src="~/assets/image/_temp/main_focus_brand01.png" alt=""></div>
                            <div class="text">
                                로마네
                            </div>
                        </div>
                        <div class="swiper-slide" data-index="1">
                            <div class="thum"><img src="~/assets/image/_temp/main_focus_brand02.png" alt=""></div>
                            <div class="text">
                                로마네
                            </div>
                        </div>
                        <div class="swiper-slide" data-index="2">
                            <div class="thum"><img src="~/assets/image/_temp/main_focus_brand03.png" alt=""></div>
                            <div class="text">
                                로마네
                            </div>
                        </div>
                        <div class="swiper-slide" data-index="3">
                            <div class="thum"><img src="~/assets/image/_temp/main_focus_brand04.png" alt=""></div>
                            <div class="text">
                                로마네
                            </div>
                        </div>
                        <div class="swiper-slide" data-index="4">
                            <div class="thum"><img src="~/assets/image/_temp/main_focus_brand05.png" alt=""></div>
                            <div class="text">
                                로마네
                            </div>
                        </div>
                        <div class="swiper-slide" data-index="5">
                            <div class="thum"><img src="~/assets/image/_temp/main_focus_brand06.png" alt=""></div>
                            <div class="text">
                                로마네
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


        <!-- banner -->
        <section class="ad-area">
            <nuxt-link to="/">
                <img src="~/assets/image/_temp/ad_banner_03.png" alt="">
            </nuxt-link>
        </section>


        <!-- recommend -->
        <div class="main-title-wrap">
            <nuxt-link class="main-title" to="/">취향 단박에 캐치ఇ</nuxt-link>
            <p>세일즈온에서 추천하는 제품들을 모았어요</p>
        </div>
        <section class="main-tabs">
            <div class="main-tab-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <nuxt-link class="main-tabitem active" to="/">#클리어런스</nuxt-link>
                    </div>
                    <div class="swiper-slide">
                        <nuxt-link class="main-tabitem" to="/">#스누지</nuxt-link>
                    </div>
                    <div class="swiper-slide">
                        <nuxt-link class="main-tabitem" to="/">#디저트</nuxt-link>
                    </div>
                    <div class="swiper-slide">
                        <nuxt-link class="main-tabitem" to="/">#리프레시</nuxt-link>
                    </div>
                    <div class="swiper-slide">
                        <nuxt-link class="main-tabitem" to="/">#피크닉세트</nuxt-link>
                    </div>
                    <div class="swiper-slide">
                        <nuxt-link class="main-tabitem" to="/">#스마트톡</nuxt-link>
                    </div>
                    <div class="swiper-slide">
                        <nuxt-link class="main-tabitem" to="/">#귀욤파우치</nuxt-link>
                    </div>
                </div>
            </div>
        </section>
        <div class="main-tabcontent">
            <div class="item-list-container vertical" :class="{on: moreItemsView == true}">
                <div class="item-list item-list-5">
                    <!-- 아이템 썸네일 영역 -->
                    <div class="thumbnail-container">
                        <div class="sold-out-wrap">
                            <span>
                                <img src="~/assets/image/sample/sold-out.png" alt="품절">
                            </span>
                        </div>
                        <div to="/" @click.prevent class="thumbnail-wrap">
                            <img class="thumbnail" src="~/assets/image/sample/thum.png" alt="썸네일">
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
                            서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀
                            서브
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
                    </div>
                </div>
                <div class="item-list item-list-5">
                    <!-- 아이템 썸네일 영역 -->
                    <div class="thumbnail-container">
                        <div class="sold-out-wrap">
                            <span>
                                <img src="~/assets/image/sample/sold-out.png" alt="품절">
                            </span>
                        </div>
                        <div to="/" @click.prevent class="thumbnail-wrap">
                            <img class="thumbnail" src="~/assets/image/sample/thum.png" alt="썸네일">
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
                            서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀
                            서브
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
                    </div>
                </div>
                <div class="item-list item-list-5">
                    <!-- 아이템 썸네일 영역 -->
                    <div class="thumbnail-container">
                        <div class="sold-out-wrap">
                            <span>
                                <img src="~/assets/image/sample/sold-out.png" alt="품절">
                            </span>
                        </div>
                        <div to="/" @click.prevent class="thumbnail-wrap">
                            <img class="thumbnail" src="~/assets/image/sample/thum.png" alt="썸네일">
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
                            서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀
                            서브
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
                    </div>
                </div>
                <div class="item-list item-list-5">
                    <!-- 아이템 썸네일 영역 -->
                    <div class="thumbnail-container">
                        <div class="sold-out-wrap">
                            <span>
                                <img src="~/assets/image/sample/sold-out.png" alt="품절">
                            </span>
                        </div>
                        <div to="/" @click.prevent class="thumbnail-wrap">
                            <img class="thumbnail" src="~/assets/image/sample/thum.png" alt="썸네일">
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
                            서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀
                            서브
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
                    </div>
                </div>
                <div class="item-list item-list-5">
                    <!-- 아이템 썸네일 영역 -->
                    <div class="thumbnail-container">
                        <div class="sold-out-wrap">
                            <span>
                                <img src="~/assets/image/sample/sold-out.png" alt="품절">
                            </span>
                        </div>
                        <div to="/" @click.prevent class="thumbnail-wrap">
                            <img class="thumbnail" src="~/assets/image/sample/thum.png" alt="썸네일">
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
                            서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀 서브 타이틀
                            서브
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
                    </div>
                </div>
            </div>

            <div class="btn-area">
                <button type="button" class="btn-more" @click="moreItemsView = true">더보기</button>
            </div>
        </div>

        <!-- review -->
        <div class="main-title-wrap">
            <nuxtLink class="main-title" to="/">써 본 사람들의 진짜 리뷰</nuxtLink>
            <p>세일즈온의 생생한 후기를 확인해보세요</p>
        </div>
        <section class="main-review-area">
            <div class="main-review-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="thum">
                            <img src="~/assets/image/_temp/img_review_sample01.png" alt="">
                        </div>
                        <div class="review">
                            <p>
                                쓰던 제품 추가로 구매했는데 배송이 빨라 너무 맘에 마음에 들어요! 색 너무 예뻐서 너무 만족스럽고불량아니라서 넘 좋고 잘 사용하겠습니다~
                            </p>
                            <div class="star-wrap">
                                <div class="star">
                                    <i class="star5"></i>
                                </div>
                            </div>
                            <p class="text-ellipsis">
                                [아이카사] 카페 세트_얼그레이밀크
                            </p>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="thum">
                            <img src="~/assets/image/_temp/img_review_sample01.png" alt="">
                        </div>
                        <div class="review">
                            <p>
                                3병을 구매해서 할머니, 엄마, 저까지 셋이서 2달 이상 써봤는데요. 처음에는 효과가 미미하다가 점점 피부 에 텐션이 생겼달까? 만지면 탱탱해진게 느껴지...
                            </p>
                            <div class="star-wrap">
                                <div class="star">
                                    <i class="star4"></i>
                                </div>
                            </div>
                            <p class="text-ellipsis">
                                [더퓨어로터스] 제주 연꽃잎 브라이 제주 연꽃잎 브라이
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- event -->
        <div class="main-title-wrap">
            <nuxtLink class="main-title" to="/">눈여겨볼 ᴥ 만한 기획전</nuxtLink>
            <p>풍성한 이벤트를 만나보세요!</p>
        </div>
        <section class="event-list-wrap">
            <ul class="event-list">
                <li class="event-item">
                    <nuxt-link to="/featured/pages/_id">
                        <div class="event-thumbnail">
                            <img src="~/assets/image/sample/banner_01.png" alt="간편하게 하나로 완성하는 스타일, 미쏘 썸머드레스">
                        </div>
                    </nuxt-link>
                </li>
                <li class="event-item">
                    <nuxt-link to="/featured/pages/_id">
                        <div class="event-thumbnail">
                            <img src="~/assets/image/sample/banner_02.png" alt="간편하게 하나로 완성하는 스타일, 미쏘 썸머드레스">
                        </div>
                    </nuxt-link>
                </li>
                <li class="event-item">
                    <nuxt-link to="/featured/pages/_id">
                        <div class="event-thumbnail">
                            <img src="~/assets/image/sample/banner_03.png" alt="간편하게 하나로 완성하는 스타일, 미쏘 썸머드레스">
                        </div>
                    </nuxt-link>
                </li>
                <li class="event-item">
                    <nuxt-link to="/featured/pages/_id">
                        <div class="event-thumbnail">
                            <img src="~/assets/image/sample/banner_04.png" alt="당신이 사랑하는 카페, 한 여름날의 홈카페" srcset="">
                        </div>
                    </nuxt-link>
                </li>
                <li class="event-item">
                    <nuxt-link to="/featured/pages/_id">
                        <div class="event-thumbnail">
                            <img src="~/assets/image/sample/banner_05.png" alt="당신이 사랑하는 카페, 한 여름날의 홈카페" srcset="">
                        </div>
                    </nuxt-link>
                </li>
                <li class="event-item event-information">
                    <nuxt-link to="/featured/pages/_id">
                        <div class="event-thumbnail">
                            <span class="label progress">Event</span>
                            <div class="dimmed" style="display: none;"></div>
                            <img src="~/assets/image/sample/no_content_720480.png" alt="간편하게 하나로 완성하는 스타일, 미쏘 썸머드레스">
                        </div>
                        <div class="event-info">
                            <strong class="title">간편하게 하나로 완성하는 스타일, 미쏘 썸머드레스</strong>
                            <span class="sub" style="display: none;"></span> <!-- 내용 없을 시 display:none 처리 -->
                            <span class="date">2023.06.04 ~ 2023.06.30</span>
                        </div>
                    </nuxt-link>
                </li>
            </ul>
        </section>

    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import SwiperCore, {
    Navigation,
    Pagination,
    Autoplay,
    Scrollbar
} from "swiper/core";
import { ReactiveFlags } from "vue";
SwiperCore.use([Navigation, Pagination, Autoplay, Scrollbar]);

let MainFlag = true;

export default {
    name: "main-page",
    setup() {
        return {
            modules: [Navigation, Pagination, Autoplay, Scrollbar],
        };
    },
    data() {
        return {
            mainPCSwiperItems: null,
            mainMobileSwiper: null,
            swiperAction: false,
            moreItemsView: false,
        }
    },
    beforeDestroy() { },
    mounted() {
        // mainVisualSwiper
        let mainVisualSwiperOption = {
            //slidesPerView: 1,
            slidesPerView: "auto",
            loop: 'true',
            centeredSlides: 'true',
            spaceBetween: 30,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                clickable: true,
                el: ".main-swiper-pagination",
                type: "fraction"
            },
            navigation: { 
                enabled: true, 
                prevEl: '.main-visual .swiper-prev', 
                nextEl: '.main-visual .swiper-next' 
            },
            watchSlidesProgress: 'true',
        }
        this.mainPCSwiper = new Swiper(".main-visual.pc", mainVisualSwiperOption);
        this.mainMobileSwiper = new Swiper(".main-visual.mobile", mainVisualSwiperOption);

        this.setSwiper();
    },
    methods: {
        // mainSwiper
        setSwiper() { 
            // mainTimesaleSwiper
            this.mainTimesaleSwiper = new Swiper(".main-timesale", {
                slidesPerView: '1',
                loop: 'false',
                pagination: {
                    clickable: true,
                    el: '.timesale-swiper-pagination',
                },
                navigation: {
                    enabled: true,
                    prevEl: '.main-timesale-area .swiper-prev',
                    nextEl: '.main-timesale-area .swiper-next'
                }
            });
        
            // mainBestitemSwiper
            this.mainBestitemSwiper = new Swiper(".main-bestitem",  {
                slidesPerView: '11', 
                loop: 'false', 
                navigation: {
                    enabled: true,
                    prevEl: '.main-bestitem-area .swiper-prev',
                    nextEl: '.main-bestitem-area .swiper-next'
                },
                breakpoints:{
                    '320': {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                    '767': {
                        slidesPerView: 8,
                        spaceBetween: 10,
                    },
                    '1194': {
                        slidesPerView: 11,
                        spaceBetween: 10,
                    },
                }
            });

            // mainBrandListSwiper
            this.mainBrandListSwiper = new Swiper(".brand-list",  {
                slidesPerView: '6', 
                loop: 'false', 
                spaceBetween: '30',
                breakpoints:{
                    '320': {
                        slidesPerView: 2,
                        spaceBetween: 14,
                    },
                    '767': {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    '1194': {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                }
            });

            // mainTabSwiper
            this.mainTabSwiper = new Swiper(".main-tab-swiper",  {
                slidesPerView: 7, 
                loop: false, 
                spaceBetween: 30,
                breakpoints:{
                    '320': {
                        slidesPerView: 'auto',
                        spaceBetween: 10,
                    },
                    '767': {
                        slidesPerView: 'auto',
                        spaceBetween: 10,
                    },
                }
            });
            
            // mainReviewSwiper
            this.mainReviewSwiper = new Swiper(".main-review-swiper",  {
                slidesPerView: 2, 
                loop: false, 
                spaceBetween: 30,
                breakpoints:{
                    '320': {
                        slidesPerView: 'auto',
                        spaceBetween: 10,
                    },
                    '767': {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                }
            });
            
        },

        autoplaySlide(e, flag, swiper) {
            this.flag = !this.flag;
            if (this.flag) {
                e.target.classList.remove("btn-pause");
                e.target.classList.add("btn-play");
                swiper.autoplay.stop();
            } else {
                e.target.classList.remove("btn-play");
                e.target.classList.add("btn-pause");
                swiper.autoplay.start();
            }
        },

        autoplaySlideMain(e) {
            this.autoplaySlide(e, MainFlag, this.mainPCSwiper);
        },


        setActive(index) {
            this.activeIndex = index;
        },
    },
    computed: {},
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/main/main";
</style>