<template>
    <div class="item-detail-page">
        <div class="category-tab-all">
            <!-- deps1에 클래스 on으로 토글 -->
            <div class="deps1"><nuxt-link to="/">홈</nuxt-link></div>
            <div class="deps1" :class="{ 'on': isDeps1 }"
                 @click="toggleInfoPanel('isDeps1')"
                 >{{ itemCategoryInfo.categoryName1 }}<i></i>
                <div class="select-wrap">
                    <ul class="select-option">
                        <li  v-for="(category1, index) of getCategories(0)">
                            <nuxt-link :to="category1.link">{{ category1.name }}</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="deps1" :class="{ 'on': isDeps2 }" @click="toggleInfoPanel('isDeps2')" v-if="itemCategoryInfo.categoryName2 != ''">
                {{ itemCategoryInfo.categoryName2 }}<i></i>
                <div class="select-wrap">
                    <ul class="select-option">
                        <li v-for="(category2, index) of getCategories(1)">
                            <nuxt-link :to="category2.link">{{ category2.name }}</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="deps1" :class="{ 'on': isDeps3 }" @click="toggleInfoPanel('isDeps3')" v-if="itemCategoryInfo.categoryName3 != ''">
                {{ itemCategoryInfo.categoryName3 }}<i></i>
                <div class="select-wrap">
                    <ul class="select-option">
                        <li v-for="(category3, index) of getCategories(2)">
                            <nuxt-link :to="category3.link">{{ category3.name }}</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 상단컨텐츠 -->
        <div class="detail-content-area top">
            <!-- 타임딜 -->
            <div class="timedeal top mobile weekend" v-if="item.spotFlag && item.spotDateType === '1'">
                <p>
                    <span>TIME</span>
                    <span>SALE</span>
                </p>
                <p>
                    <span>{{ item.displaySpotStartTime }} ~ {{ item.displaySpotEndTime }}</span>
                    <span>{{ item.spotWeekDays }}</span>
                </p>
            </div>
            <div class="timedeal top mobile time-limit" v-if="item.spotFlag && item.spotDateType === '2'">
                <p>
                    <span>TIME</span>
                    <span>SALE</span>
                </p>
                <p class="d-day">
                    <span class="timer-day">00D</span>
                    <span class="timer-time">00 : 00 : 00</span>
                </p>
            </div>
            <!-- 상단-썸네일 영역 -->
            <div class="thumbnail-detail">
                <!-- 썸네일 메인 -->
                <div class="swiper thumbnail-main-swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(image, index) in item.images">
                            <!-- 아이템 썸네일 영역 -->
                            <div class="thumbnail-container sold-out">
                                 <div class="sold-out-wrap" v-if="item.itemSoldOutFlag === 'Y'">
                                    <span>
                                        <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                    </span>
                                </div>
                                <div to="/" @click.prevent class="thumbnail-wrap">
<!--                                    <div class="thumbnail-area">
                                        <img class="top-left" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                        <img class="top-right" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                        <img class="bottom-left" src="~/assets/image/sample/thum.png" alt="플로팅이미지" />
                                        <img class="bottom-right" src="~/assets/image/sample/thum.png" alt="플로팅이미지" />
                                        <img class="center-center">
                                    </div>-->
                                    <img class="thumbnail" :src="itemImage(image)" :alt="unescapeHtml(item.itemName)" @error="errorImage"/>
                                </div>
                            </div>
                        </div>

<!--                        <div class="swiper-slide" v-for="(image, index) in item.images">
                            <div class="thumbnail-container" :class="item.itemSoldOutFlag === 'Y' ? 'sold-out' : ''">
                                <div class="sold-out-wrap">
                                    <span>
                                        <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                    </span>
                                </div>
                                <div class="thumbnail-wrap">
&lt;!&ndash;                                    <div class="thumbnail-area">
                                        <img class="top-left" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                        <img class="top-right" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                        <img class="bottom-left" src="~/assets/image/sample/thum_area.png"
                                             alt="플로팅이미지" />
                                        <img class="bottom-right" src="~/assets/image/sample/thum_area.png"
                                             alt="플로팅이미지" />
                                    </div>&ndash;&gt;
                                    <img class="thumbnail" :src="itemImage(image)" :alt="unescapeHtml(item.itemName)" @error="errorImage"/>
                                </div>
                            </div>
                        </div>-->
                    </div>
                </div>

                <!-- 썸네일 리스트 -->
                <div class="swiper thumbnail-list-swiper swiper-visible">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(image, index) in item.images">
                            <!-- 아이템 썸네일 영역 -->
                            <div class="thumbnail-container" :class="item.itemSoldOutFlag === 'Y' ? 'sold-out' : ''">
                                <div class="sold-out-wrap" v-if="item.itemSoldOutFlag === 'Y'">
                                    <span>
                                        <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                    </span>
                                </div>
                                <div to="/" @click.prevent class="thumbnail-wrap">
<!--                                    <div class="thumbnail-area">
                                        <img class="top-left" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                        <img class="top-right" src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                        <img class="bottom-left" src="~/assets/image/sample/thum_area.png"
                                             alt="플로팅이미지" />
                                        <img class="bottom-right" src="~/assets/image/sample/thum_area.png"
                                             alt="플로팅이미지" />
                                        <img class="center-center">
                                    </div>-->
                                    <img class="thumbnail" :src="itemImage(image)" :alt="unescapeHtml(item.itemName)" @error="errorImage"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-controls">
                        <div class="swiper-prev">이전</div>
                        <div class="swiper-next">다음</div>
                    </div>
                </div>
            </div>
            <!-- 상단-정보 영역 -->
            <div class="info-detail">
                <!-- 태그 -->
                <div class="tag-wrap">
                    <div class="tag" v-for="(label, index) in item.labels"
                         :style="{background: label.color}">{{ label.label }}</div>
                    <div class="tag delivery" v-if="item.shippingType === '1'">무료배송</div>
                    <div class="tag timesale" v-if="item.spotFlag">타임세일</div>

<!--                    <div class="tag new">신상품</div>
                    <div class="tag md">MD추천</div>
                    <div class="tag coupon">쿠폰</div>
                    <div class="tag delivery">무료배송</div>
                    <div class="tag best">베스트</div>
                    <div class="tag only">ONLY</div>
                    <div class="tag salegoods">행사상품</div>
                    <div class="tag timesale">타임세일</div>
                    <div class="tag event">이벤트</div>-->
                </div>
                <!-- 타임딜 -->
                <div class="timedeal top pc weekend" v-if="item.spotFlag && item.spotDateType === '1'">
                    <p>
                        <span>TIME</span>
                        <span>SALE</span>
                    </p>
                    <p>
                        <span>{{ item.displaySpotStartTime }} ~ {{ item.displaySpotEndTime }}</span>
                        <span>{{ item.spotWeekDays }}</span>
                    </p>
                </div>
                <div class="timedeal top pc time-limit" v-if="item.spotFlag && item.spotDateType === '2'">
                    <p>
                        <span>TIME</span>
                        <span>SALE</span>
                    </p>
                    <p class="d-day">
                        <span class="timer-day">00D</span>
                        <span class="timer-time">00 : 00 : 00</span>
                    </p>
                </div>
                <!-- 브랜드 -->
                <div class="brand-area" >
                    <div class="brand-name" v-if="!isEmpty(item.brand)">
                        <nuxt-link :to="'/brand/' + item.brandId">
                            <span>{{ item.brand }}</span></nuxt-link>
                        <nuxt-link :to="'/brand/' + item.brandId">
                            <span class="ico-link"></span>
                        </nuxt-link>
                    </div>
                    <div class="brand-action">
                        <span class="ico-heart2" @click="addToWishList(item.itemId)"></span>
                        <span class="link-copy" @click="copyUrl"></span>
                    </div>
                </div>
                <!-- 타이틀 -->
                <div class="title-area">
                    <p class="title-main paragraph-ellipsis">{{ item.displayItemName }}</p>
                    <p class="title-option paragraph-ellipsis" v-if="item.originCountry !== null && item.originCountry !== ''">원산지 : {{ item.originCountry }}</p>
                    <p class="title-sub paragraph-ellipsis">{{ item.itemSummary }}
                    </p>

                </div>
                <!-- 가격 -->
                <div class="price-area">
                    <div class="price-info">
                        <div class="cost" v-if="item.discountRate > 0">{{ formatNumber(item.salePrice) }}<strong>원</strong></div>
                        <div class="price">
                            <span>{{ formatNumber(item.presentPrice) }}<strong>원</strong></span>
                            <span v-if="item.discountRate > 0">
                                {{ item.discountRate }}<strong>%</strong>
                            </span>
                            <span class="tooltip-handler" @click="toggleTooltip" v-if="item.discountRate > 0">?</span>
                            <div :class="{ 'tooltip-wrap ': true, active: isTooltipActive }">
                                <div class="dimmed-bg" @click="closeTooltip"></div>
                                <div class="tooltip-content tooltip-benefit">
                                    <button class="btn-tooltip-close" @click="closeTooltip">닫기</button>
                                    <p class="text-center tooltip-tit">할인혜택</p>
                                    <ul>
                                        <li class="default">
                                            <p>정상가</p>
                                            <p>{{ formatNumber(item.itemPrice) }}원</p>
                                        </li>
                                        <li class="txt1 sale">
                                            <p>판매가</p>
                                            <p>{{ formatNumber(item.salePrice) }}원</p>
                                        </li>
                                        <li class="txt2" v-if="item.spotFlag === 'Y' && item.spotDiscountAmount > 0">
                                            <p>타임세일</p>
                                            <p>{{ formatNumber(item.spotDiscountAmount) }}원</p>
                                        </li>
                                        <li class="txt2" v-if="item.sellerDiscountFlag === 'Y'">
                                            <p>즉시할인</p>
                                            <p>{{ formatNumber(item.sellerDiscountPrice) }}원</p>
                                        </li>
                                        <li class="txt2" v-if="item.userLevelDiscountAmount > 0">
                                            <p>회원추가할인(silver 10%)</p>
                                            <p>{{ formatNumber(item.userLevelDiscountAmount) }}원</p>
                                        </li>
                                        <li class="txt1 max">
                                            <p>최대혜택가</p>
                                            <p>{{ formatNumber(item.presentPrice) }}원</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-round btn-primary-line btn-coupondown"
                            v-if="isLogin && item.couponUseFlag === 'Y'" @click="getItemCoupons(1)"
                    >쿠폰다운<i></i>
                    </button>
                </div>
                <!-- 카드혜택 -->

                <div class="select-wrap card-benefit-wrap" v-if="!isEmpty(cardBenefits.subject)">
                    <!--  -->
                    <div class="input-select" @click="toggleActiveCard" :class="{ 'active': isActiveCard }">카드혜택<p>
                        {{ cardBenefits.subject }}</p>
                    </div>
                    <div class="select-option card-benefit">
                       {{ cardBenefits.content }}
                    </div>
                </div>

                <!-- 상품정보 -->
                <div class="item-info-area">
                    <table>
                        <tr v-if="itemEarnPoint.point > 0">
                            <th>적립예정포인트</th>
<!--                            <td>3,766P (1% 적립 + SILVER 0.5%)</td>-->
                            <td v-if="!isEmpty(itemEarnPoint.levelName) && itemEarnPoint.levelPointRate > 0">
                                {{ formatNumber(itemEarnPoint.point) }}P ({{ itemEarnPoint.pointRate }}% 적립 + {{ itemEarnPoint.levelName }} {{ formatNumber(itemEarnPoint.levelPointRate)  }}%)
                            </td>
                            <td v-else>
                                {{ formatNumber(itemEarnPoint.point) }}P ({{ itemEarnPoint.pointRate }}% 적립)
                            </td>
                        </tr>
                        <tr>
                            <th>상품코드</th>
                            <td>{{ item.itemUserCode }}</td>
                        </tr>
                        <tr>
                            <th>배송정보</th>
                            <td>
                                <template v-if="item.shippingType === '1'">무료배송</template>
                                <template v-else-if="item.shippingType === '2' || item.shippingType === '3' || item.shippingType === '4'">
                                    {{ formatNumber(item.shipping) }}원({{ formatNumber(item.shippingFreeAmount) }}원이상 무료배송)
                                </template>
                                <template v-else-if="item.shippingType === '5'">
                                    {{ formatNumber(item.shippingItemCount) }} 개당 {{ formatNumber(item.shipping) }}원
                                </template>
                                <template v-else-if="item.shippingType === '6'">
                                    {{ formatNumber(item.shipping) }}원
                                </template>
                                <br>

                                <template  v-if="getShippingExtraText !== ''">
                                    {{ getShippingExtraText }}
                                    <br>
                                </template>

                                <span class="delivery-info" @click="getIslands(1)">도서산간 지역보기</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- 옵션 선택 영역컨테이너 -->
                <article class="select-option-container" :class="{ 'active': isMobileBuyNowActive }">
                    <div class="dimmed-bg mobile" @click="toggleMobileBuyNowActive"></div>
                    <p class="product-title mobile">[슈스스 추천템] 소녀의세계 x 뷰티비기닝무선 미니고데기</p>
                    <form>
                        <div class="form-inner">
                            <!-- 옵션 미사용 - 수량 -->
                            <div class="quantity-wrap">
                                <p>수량</p>
                                <div class="quantity-box-round">
                                    <button type="button" class="btn-quantity btn-minus"></button>
                                    <input type="number" title="수량" value="10" readonly maxlength="999"
                                           class="quantity number">
                                    <button type="button" class="btn-quantity btn-plus"></button>
                                </div>
                            </div>
                            <!-- 옵션 -->

                            <div class="txt_box">
                                <p>*상품을 구매하려면 필수 옵션을 작성하세요.</p>
                            </div>

                            <!-- 옵션-텍스트형 -->
                            <div class="option-text">
                                <div class="form-line">
                                    <input type="text" class="form-basic" placeholder="옵션-텍스트형" />
                                    <!-- <span class="feedback">유효성 메시지</span> -->
                                </div>

                                <div class="form-line">
                                    <input type="text" class="form-basic" placeholder="옵션-텍스트형" />
                                    <!-- <span class="feedback">유효성 메시지</span> -->
                                </div>
                                <div class="form-line">
                                    <div class="flex">
                                        <input type="text" class="form-basic" placeholder="옵션-텍스트형" />
                                        <button class="btn btn-black">추가</button>
                                    </div>
                                    <!-- <span class="feedback">유효성 메시지</span> -->
                                </div>
                            </div>


                            <!-- 옵션-드롭다운(선택형) -->
                            <div class="option-dropdown">
                                <!-- 버튼 -->
                                <div class="dropdown-title select-wrap" @click="toggleDropdownActive($event)">
                                    <a class="input-select">옵션-선택형</a>
                                </div>
                                <!-- 내용 -->
                                <div class="option-contents">
                                    <div class="select-wrap" @click="toggleDropdownActive($event)">
                                        <a class="input-select">옵션-선택형</a>
                                    </div>
                                    <div class="option-inner">
                                        <div class="dropdown-area">
                                            <button class="option-title" @click="toggleOptionActive($event)">옵션
                                                선택1</button>
                                            <div class="option-item">
                                                <button>옵션1</button>
                                                <button>옵션2</button>
                                                <button>옵션3</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 옵션-드롭다운(조합형) -->
                            <div class="option-dropdown">
                                <!-- 버튼 -->
                                <div class="dropdown-title select-wrap" @click="toggleDropdownActive($event)">
                                    <a class="input-select">옵션-조합형</a>
                                </div>
                                <!-- 내용 -->
                                <div class="option-contents">
                                    <div class="select-wrap" @click="toggleDropdownActive($event)">
                                        <a class="input-select">옵션-조합형</a>
                                    </div>
                                    <div class="option-inner">
                                        <div class="dropdown-area">
                                            <button class="option-title" @click="toggleOptionActive($event)">옵션
                                                선택1</button>
                                            <div class="option-item">
                                                <button>옵션1</button>
                                                <button>옵션2</button>
                                                <button>옵션3</button>
                                            </div>
                                        </div>
                                        <div class="dropdown-area">
                                            <button class="option-title" @click="toggleOptionActive($event)">옵션
                                                선택2</button>
                                            <div class="option-item">
                                                <button>옵션1</button>
                                                <button>옵션2</button>
                                                <button>옵션3</button>
                                            </div>
                                        </div>
                                        <div class="dropdown-area">
                                            <button class="option-title" @click="toggleOptionActive($event)">옵션
                                                선택3</button>
                                            <div class="option-item">
                                                <button>옵션1</button>
                                                <button>옵션2</button>
                                                <button>옵션3</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 구성상품 -->
                            <div class="composition-pruduct active">
                                <div class="composition-title">구성상품</div>
                                <ul class="composition-list-container">
                                    <li class="composition-list">
                                        <div class="item-list-container horizon">
                                            <!-- 반복요소 item-list -->
                                            <div class="item-list">
                                                <!-- 아이템 썸네일 영역 -->
                                                <div class="thumbnail-container sold-out">
                                                    <div class="sold-out-wrap">
                                                        <span>
                                                            <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                                        </span>
                                                    </div>
                                                    <div @click.prevent class="thumbnail-wrap">
                                                        <div class="thumbnail-area">
                                                            <img class="top-left"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="top-right"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="bottom-left"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="bottom-right"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="center-center">
                                                        </div>
                                                        <img class="thumbnail" src="~/assets/image/sample/thum.png"
                                                             alt="썸네일">
                                                    </div>
                                                </div>
                                                <!-- 아이템 정보 영역 -->
                                                <div class="info-container">
                                                    <div class="title-main paragraph-ellipsis">
                                                        [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] :
                                                        option1,
                                                        option 2
                                                        / [옵션3] : option1, option2
                                                    </div>
                                                    <div class="title-sub paragraph-ellipsis">
                                                        (구성 상품의 설명)
                                                    </div>
                                                    <div class="purchase-amount">
                                                        <p class="amount-only">
                                                            <string>999</string>개
                                                        </p>
                                                    </div>
                                                </div>
                                                <!-- 옵션-드롭다운(조합형) -->
                                                <div class="option-dropdown">
                                                    <!-- 버튼 -->
                                                    <div class="dropdown-title select-wrap"
                                                         @click="toggleDropdownActive($event)">
                                                        <a class="input-select">옵션-조합형</a>
                                                    </div>
                                                    <!-- 내용 -->
                                                    <div class="option-contents">
                                                        <div class="select-wrap" @click="toggleDropdownActive($event)">
                                                            <a class="input-select">옵션-조합형</a>
                                                        </div>
                                                        <div class="option-inner">
                                                            <div class="dropdown-area">
                                                                <button class="option-title"
                                                                        @click="toggleOptionActive($event)">옵션 선택1</button>
                                                                <div class="option-item">
                                                                    <button>옵션1</button>
                                                                    <button>옵션2</button>
                                                                    <button>옵션3</button>
                                                                </div>
                                                            </div>
                                                            <div class="dropdown-area">
                                                                <button class="option-title"
                                                                        @click="toggleOptionActive($event)">옵션 선택2</button>
                                                                <div class="option-item">
                                                                    <button>옵션1</button>
                                                                    <button>옵션2</button>
                                                                    <button>옵션3</button>
                                                                </div>
                                                            </div>
                                                            <div class="dropdown-area">
                                                                <button class="option-title"
                                                                        @click="toggleOptionActive($event)">옵션 선택3</button>
                                                                <div class="option-item">
                                                                    <button>옵션1</button>
                                                                    <button>옵션2</button>
                                                                    <button>옵션3</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="item-list">
                                                <!-- 아이템 썸네일 영역 -->
                                                <div class="thumbnail-container sold-out">
                                                    <div class="sold-out-wrap">
                                                        <span>
                                                            <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                                        </span>
                                                    </div>
                                                    <div @click.prevent class="thumbnail-wrap">
                                                        <div class="thumbnail-area">
                                                            <img class="top-left"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="top-right"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="bottom-left"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="bottom-right"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="center-center">
                                                        </div>
                                                        <img class="thumbnail" src="~/assets/image/sample/thum.png"
                                                             alt="썸네일">
                                                    </div>
                                                </div>
                                                <!-- 아이템 정보 영역 -->
                                                <div class="info-container">
                                                    <div class="title-main paragraph-ellipsis">
                                                        [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] :
                                                        option1,
                                                        option 2
                                                        / [옵션3] : option1, option2
                                                    </div>
                                                    <div class="title-sub paragraph-ellipsis">
                                                        (구성 상품의 설명)
                                                    </div>
                                                </div>
                                                <!-- 옵션-드롭다운(조합형) -->
                                                <div class="option-dropdown">
                                                    <!-- 버튼 -->
                                                    <div class="dropdown-title select-wrap"
                                                         @click="toggleDropdownActive($event)">
                                                        <a class="input-select">옵션-조합형</a>
                                                    </div>
                                                    <!-- 내용 -->
                                                    <div class="option-contents">
                                                        <div class="select-wrap" @click="toggleDropdownActive($event)">
                                                            <a class="input-select">옵션-조합형</a>
                                                        </div>
                                                        <div class="option-inner">
                                                            <div class="dropdown-area">
                                                                <button class="option-title"
                                                                        @click="toggleOptionActive($event)">옵션 선택1</button>
                                                                <div class="option-item">
                                                                    <button>옵션1</button>
                                                                    <button>옵션2</button>
                                                                    <button>옵션3</button>
                                                                </div>
                                                            </div>
                                                            <div class="dropdown-area">
                                                                <button class="option-title"
                                                                        @click="toggleOptionActive($event)">옵션 선택2</button>
                                                                <div class="option-item">
                                                                    <button>옵션1</button>
                                                                    <button>옵션2</button>
                                                                    <button>옵션3</button>
                                                                </div>
                                                            </div>
                                                            <div class="dropdown-area">
                                                                <button class="option-title"
                                                                        @click="toggleOptionActive($event)">옵션 선택3</button>
                                                                <div class="option-item">
                                                                    <button>옵션1</button>
                                                                    <button>옵션2</button>
                                                                    <button>옵션3</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                            <!-- 옵션리스트 -->
                            <ul class="option-list-container">
                                <!-- 옵션리스트 - 썸네일형 -->
                                <li class="option-list">
                                    <i class="btn-close"></i>
                                    <div class="item-list-container horizon">
                                        <!-- 반복요소 item-list -->
                                        <div class="item-list">
                                            <!-- 아이템 썸네일 영역 -->
                                            <div class="thumbnail-container sold-out">
                                                <div class="sold-out-wrap">
                                                    <span>
                                                        <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                                    </span>
                                                </div>
                                                <div @click.prevent class="thumbnail-wrap">
                                                    <div class="thumbnail-area">
                                                        <img class="top-left" src="~/assets/image/sample/thum_area.png"
                                                             alt="플로팅이미지" />
                                                        <img class="top-right" src="~/assets/image/sample/thum_area.png"
                                                             alt="플로팅이미지" />
                                                        <img class="bottom-left"
                                                             src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                                        <img class="bottom-right"
                                                             src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                                        <img class="center-center">
                                                    </div>
                                                    <img class="thumbnail" src="~/assets/image/sample/thum.png"
                                                         alt="썸네일">
                                                </div>
                                            </div>
                                            <!-- 아이템 정보 영역 -->
                                            <div class="info-container">
                                                <div class="title-main paragraph-ellipsis">
                                                    [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] : option1,
                                                    option 2
                                                    / [옵션3] : option1, option2
                                                </div>
                                                <div class="title-sub paragraph-ellipsis">
                                                    추가 텍스트 옵션작성 (+22,000원 추가)
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item-list">
                                            <!-- 아이템 썸네일 영역 -->
                                            <div class="thumbnail-container sold-out">
                                                <div class="sold-out-wrap">
                                                    <span>
                                                        <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                                    </span>
                                                </div>
                                                <div @click.prevent class="thumbnail-wrap">
                                                    <div class="thumbnail-area">
                                                        <img class="top-left" src="~/assets/image/sample/thum_area.png"
                                                             alt="플로팅이미지" />
                                                        <img class="top-right" src="~/assets/image/sample/thum_area.png"
                                                             alt="플로팅이미지" />
                                                        <img class="bottom-left"
                                                             src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                                        <img class="bottom-right"
                                                             src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                                        <img class="center-center">
                                                    </div>
                                                    <img class="thumbnail" src="~/assets/image/sample/thum.png"
                                                         alt="썸네일">
                                                </div>
                                            </div>
                                            <!-- 아이템 정보 영역 -->
                                            <div class="info-container">
                                                <div class="title-main paragraph-ellipsis">
                                                    [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] : option1,
                                                    option 2
                                                    / [옵션3] : option1, option2
                                                </div>
                                                <div class="title-sub paragraph-ellipsis">
                                                    추가 텍스트 옵션작성 (+22,000원 추가)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="option-price-wrap">
                                        <div class="quantity-box">
                                            <button type="button" class="btn-quantity btn-minus"></button>
                                            <input type="number" title="수량" value="1" readonly maxlength="999"
                                                   class="quantity number">
                                            <button type="button" class="btn-quantity btn-plus"></button>
                                        </div>
                                        <div class="option-price">
                                            <span>9,999,999,999</span>
                                            <span>원</span>
                                        </div>

                                    </div>
                                </li>
                                <li class="option-list">
                                    <i class="btn-close"></i>
                                    <div class="item-list-container horizon">
                                        <div class="item-list">
                                            <!-- 아이템 썸네일 영역 -->
                                            <div class="thumbnail-container sold-out">
                                                <div class="sold-out-wrap">
                                                    <span>
                                                        <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                                    </span>
                                                </div>
                                                <div @click.prevent class="thumbnail-wrap">
                                                    <div class="thumbnail-area">
                                                        <img class="top-left" src="~/assets/image/sample/thum_area.png"
                                                             alt="플로팅이미지" />
                                                        <img class="top-right" src="~/assets/image/sample/thum_area.png"
                                                             alt="플로팅이미지" />
                                                        <img class="bottom-left"
                                                             src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                                        <img class="bottom-right"
                                                             src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                                        <img class="center-center">
                                                    </div>
                                                    <img class="thumbnail" src="~/assets/image/sample/thum.png"
                                                         alt="썸네일">
                                                </div>
                                            </div>
                                            <!-- 아이템 정보 영역 -->
                                            <div class="info-container">
                                                <div class="title-main paragraph-ellipsis">
                                                    [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] : option1,
                                                    option 2
                                                    / [옵션3] : option1, option2
                                                </div>
                                                <div class="title-sub paragraph-ellipsis">
                                                    추가 텍스트 옵션작성 (+22,000원 추가)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="option-price-wrap">
                                        <div class="quantity-box">
                                            <button type="button" class="btn-quantity btn-minus"></button>
                                            <input type="number" title="수량" value="1" readonly maxlength="999"
                                                   class="quantity number">
                                            <button type="button" class="btn-quantity btn-plus"></button>
                                        </div>
                                        <div class="option-price">
                                            <span>9,999,999,999</span>
                                            <span>원</span>
                                        </div>

                                    </div>
                                </li>
                                <!-- 옵션리스트 - 번호형 -->
                                <li class="option-list">
                                    <i class="btn-close"></i>
                                    <div class="item-list-container horizon">
                                        <!-- 반복요소 item-list -->
                                        <div class="item-list">
                                            <!-- 아이템 상품 번호 -->
                                            <div class="option-number">상품01</div>
                                            <!-- 아이템 정보 영역 -->
                                            <div class="info-container">
                                                <div class="title-main paragraph-ellipsis">
                                                    [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] : option1,
                                                    option 2
                                                    / [옵션3] : option1, option2
                                                </div>
                                                <div class="title-sub paragraph-ellipsis">
                                                    추가 텍스트 옵션작성 (+22,000원 추가)
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item-list">
                                            <!-- 아이템 상품 번호 -->
                                            <div class="option-number">상품01</div>
                                            <!-- 아이템 정보 영역 -->
                                            <div class="info-container">
                                                <div class="title-main paragraph-ellipsis">
                                                    [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] : option1,
                                                    option 2
                                                    / [옵션3] : option1, option2
                                                </div>
                                                <div class="title-sub paragraph-ellipsis">
                                                    추가 텍스트 옵션작성 (+22,000원 추가)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="option-price-wrap">
                                        <div class="quantity-box">
                                            <button type="button" class="btn-quantity btn-minus"></button>
                                            <input type="number" title="수량" value="1" readonly maxlength="999"
                                                   class="quantity number">
                                            <button type="button" class="btn-quantity btn-plus"></button>
                                        </div>
                                        <div class="option-price">
                                            <span>9,999,999,999</span>
                                            <span>원</span>
                                        </div>

                                    </div>
                                </li>
                                <li class="option-list">
                                    <i class="btn-close"></i>
                                    <div class="item-list-container horizon">
                                        <div class="item-list">
                                            <!-- 아이템 상품 번호 -->
                                            <div class="option-number">상품01</div>
                                            <!-- 아이템 정보 영역 -->
                                            <div class="info-container">
                                                <div class="title-main paragraph-ellipsis">
                                                    [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] : option1,
                                                    option 2
                                                    / [옵션3] : option1, option2
                                                </div>
                                                <div class="title-sub paragraph-ellipsis">
                                                    추가 텍스트 옵션작성 (+22,000원 추가)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="option-price-wrap">
                                        <div class="quantity-box">
                                            <button type="button" class="btn-quantity btn-minus"></button>
                                            <input type="number" title="수량" value="1" readonly maxlength="999"
                                                   class="quantity number">
                                            <button type="button" class="btn-quantity btn-plus"></button>
                                        </div>
                                        <div class="option-price">
                                            <span>9,999,999,999</span>
                                            <span>원</span>
                                        </div>

                                    </div>
                                </li>
                            </ul>
                            <!-- 옵션총금액 -->
                            <div class="total-price">
                                <p>
                                    합계
                                </p>
                                <p>
                                    <span>9,999,999,999</span>
                                    <span>원</span>
                                </p>
                            </div>
                        </div>
                        <!-- 버튼 -->
                        <div class="btn-option-buy btn-wrap gap pc">
                            <button class="btn btn-round btn-primary-line">장바구니</button>
                            <button class="btn btn-round btn-primary">바로구매</button>
                        </div>
                        <div class="btn-option-buy btn-wrap gap mobile">
                            <button class="btn btn-round btn-primary-line" v-if="!isMobileBuyNowActive"
                                    @click.prevent="toggleMobileBuyNowActive">장바구니</button>
                            <button class="btn btn-round btn-primary" @click.prevent="toggleMobileBuyNowActive"
                                    v-if="!isMobileBuyNowActive">바로구매</button>
                            <button class="btn btn-round btn-primary-line" v-if="isMobileBuyNowActive">장바구니</button>
                            <button class="btn btn-round btn-primary" v-if="isMobileBuyNowActive">
                                <nuxt-link to="/order">바로구매</nuxt-link>
                            </button>
                        </div>
                    </form>
                </article>

            </div>
        </div>

        <!-- 연관상품 -->
        <div class="recommend-container" v-if="relationItems !== null && relationItems.length > 0">
            <h4 class="recommend-title">
                다른 고객들이 많이 본 상품
            </h4>
            <div class="swiper relation-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(relation, index) in relationItems">
                        <itemPartThumbnail :item="relation"/>
                        <itemPartInfo :item="relation"/>
                    </div>
                </div>
                <div class="swiper-controls">
                    <button class="swiper-prev show">이전</button>
                    <button class="swiper-next show">다음</button>
                </div>
            </div>
        </div>

        <!-- 하단컨텐츠 -->
        <section ref="targetElement" :class="{ 'detail-contents-area bottom': true, 'active': isTargetActive }">
            <div class="contents-left" ref="leftElement">
                <!-- 탭메뉴 -->
                <div class="tabs type-b">
                    <a v-for="(tab, index) in tabs" :key="index"
                       :class="{ 'tab-item': true, 'active': tabIndex === index }" @click="toggleTab(index)">
                        {{ tab }}{{ index === 2 ? ' (' + item.reviewCount + ')' : '' }}
                    </a>
                </div>
                <!-- 상세정보 -->
                <!-- 상품정보 더보기 클릭 시 detail-info-contents에 active-->
                <section v-show="tabIndex === 0" class="detail-info-contents" :class="{ 'active': isShowDetailInfo }">
                    <div class="admin-content-wrap">
                        <div class="admin-content"  v-if="item.detailContent != ''"
                             v-html="appendCdnDomain(unescapeHtml(item.detailContent))">
<!--                            html 관리자 컨텐츠 내용
                            <img src="~/assets/image/sample/detail_info.png" alt="html 관리자 컨텐츠 이미지 예시">-->
                        </div>
                        <button class="btn btn-primary-line btn-round btn-more" @click="showDetailInfo"><span>상품정보
                                더보기</span></button>
                    </div>
                    <div class="detail-table">
                        <table>
                            <tbody>
                            <tr v-for="(itemInfo, index) in item.infos">
                                <th scope="row"><span>{{ itemInfo.title }}</span></th>
                                <td><span>{{ itemInfo.description }}</span></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </section>
                <!-- 기본정보 -->
                <section v-show="tabIndex === 1" class="detail-basic-contents">

                    <div class="detail-table">
                        <table>
                            <tbody>
                            <tr>
                                <th>대표자명</th>
                                <td>{{ item.representativeName }}</td>
                            </tr>
                            <tr>
                                <th>사업자번호</th>
                                <td>{{ item.businessNumber }}</td>
                            </tr>
                            <tr>
                                <th>소재지</th>
                                <td>{{ item.businessLocation }}</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>

                    <div class="detail-title-main">배송 반품교환 상세정보</div>
                    <div v-html="deliveryInfo"></div>

                </section>
                <!-- 후기(1,955) -->
                <section v-show="tabIndex === 2" class="detail-review-contents">
                    <!-- 총 평점 -->
                    <div class="total-rating">
                        <p>총 평점</p>
                        <div class="star-group">
                            <div class="star-wrap">
                                <div class="star">
                                    <i :class="'star'+item.displayReviewScore"></i>
                                </div>
                            </div>
                            <div class="score">
                                <span>{{ item.displayReviewScore }}</span>/<span>5</span>
                            </div>
                        </div>
                    </div>
                    <!-- 필터 탭 -->
                    <div class="filter-wrap">
                        <p>총 <b>{{ formatNumber(item.reviewCount) }}</b>개 후기</p>
                        <ul class="">
                            <li :class="reviewParam.orderBy === '' ? 'active' : ''" @click="setReviewSort(0)">전체</li>
                            <li :class="reviewParam.orderBy === 'CREATED_DATE' ? 'active' : ''" @click="setReviewSort(1)">최신순</li>
                            <li :class="reviewParam.orderBy === 'LIKE_COUNT' ? 'active' : ''" @click="setReviewSort(2)">추천순</li>
                        </ul>
                    </div>
                    <p class="btn-edit-review">
                        <nuxt-link to="/mypage/order">후기작성하기</nuxt-link>
                    </p>
                    <div class="view-option">
                        <div class="check-wrap">
                            <label class="circle-input-checkbox"><input type="checkbox" @click="setReviewPhotoFlag($event)"><i></i>사진후기 보기</label>
                        </div>
                        <div class="select-wrap">
                            <select class="input-select" name="score" @change="setReviewScore($event)">
                                <option value="0">리뷰점수</option>
                                <option value="1">☆☆☆☆★</option>
                                <option value="2">☆☆☆★★</option>
                                <option value="3">☆☆★★★</option>
                                <option value="4">☆★★★★</option>
                                <option value="5">★★★★★</option>
                            </select>
                        </div>
                    </div>
                    <!-- 리뷰 리스트 -->
                    <div v-if="itemReviews.content.length > 0">
                        <ul class="review-content">
                            <li class="review-item" v-for="(review, index) in itemReviews.content">
                                <!-- 작성자 정보 -->
                                <div class="creation-info">
                                    <div>
                                        <p>{{ review.maskUsername }}</p>
                                        <p>{{ dateFormat(review.createdDate, 'date') }}</p>
                                    </div>
                                    <p v-show="!review.writtenMeFlag" @click="openReport('REVIEW', review.itemReviewId, review.blockFlag)">신고/차단</p>
                                </div>
                                <!-- 별점 -->
                                <div class="star-group">
                                    <div class="star-wrap">
                                        <div class="star">
                                            <i :class="'star'+review.score"></i>
                                        </div>
                                    </div>
                                    <div class="score">{{ review.score }}</div>
                                </div>
                                <!-- 썸네일 -->
                                <ul class="photo-list" v-if="review.images.length > 0">
                                    <li class="photo-item" v-for="(reviewImg, index) in review.images">
                                        <img :src="reviewImg" alt="fileName" @error="errorImage" class="thumbnail">
                                    </li>
                                </ul>
                                <!-- 사용자리뷰 -->
                                <div class="user-writing">
                                    <p class="content">
                                        {{ review.content }}
                                    </p>
                                </div>
                                <!-- 관리자 답변 -->
                                <div class="admin-answer" v-if="!isEmpty(review.adminComment)">
                                    <p class="administrator">관리자 답변</p>
                                    <div class="content">
                                        {{ review.adminComment }}
                                    </div>
                                    <!-- <p class="date">답변일 2022-06-14</p>-->
                                </div>
                            </li>
                        </ul>

                        <ui-pagination :current-page="itemReviews.pagination.currentPage" :total-pages="itemReviews.pagination.totalPages"
                                       :scroll-top-flag="false" @change="getItemReviews"/>
                    </div>
                    <div class="no-contents" v-else>
                        <p>상품리뷰가 없습니다.</p>
                    </div>


                </section>
                <!-- 상품문의 -->
                <section v-show="tabIndex === 3" class="detail-inquire-contents">
                    <!-- 필터 탭 -->
                    <div class="filter-wrap">
                        <p>총 <b>{{ formatNumber(itemInquiries.pagination.totalElements) }}</b>개</p>
                        <span class="btn-edit-qna" @click="toggleInquiryForm">Q&A 쓰기</span>
                    </div>

                    <!-- q&a작성 -->
                    <ValidationObserver ref="observer" v-slot="{ validate }">
                        <form class="edit-qna-wrap" v-if="isLogin" v-show="showInquiryForm" @submit.prevent="inquirySubmit(validate)">
                            <div class="qna-option">
                                <div class="select-wrap">
                                    <select class="input-select" title="문의 유형" v-model="inquiryFormParam.qnaGroup">
                                        <option value="">문의 유형을 선택하세요</option>
                                        <option v-for="qnaGroup in qnaGroups" :value="qnaGroup.id">{{ qnaGroup.label }}</option>
                                    </select>
                                </div>
                                <div class="check-wrap">
                                    <label class="circle-input-checkbox"><input type="checkbox" @click="setInquirySecretFlag($event)"><i></i>비밀글</label>
                                </div>
                            </div>

                            <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                                <div class="form-line" :class="{ 'invalid': errors.length }">
                                    <input type="text" class="form-basic" placeholder="제목을 입력해 주세요" v-model="inquiryFormParam.subject"/>
                                    <span class="feedback">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>

                            <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                                <div class="form-line" :class="{ 'invalid': errors.length }">
                                    <textarea class="form-basic text-area" placeholder="내용을 입력해주세요" v-model="inquiryFormParam.question"/>
                                    <span class="feedback">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>

                            <div class="btn-wrap gap">
                                <button type="submit" class="btn btn-primary">등록</button>
                                <button type="button" class="btn btn-default" @click="toggleInquiryForm">취소</button>
                            </div>
                        </form>
                    </ValidationObserver>
                    <div v-if="itemInquiries.content.length > 0">
                        <!-- 상품문의 리스트 -->
                        <ul class="review-content">
                            <li class="review-item" v-for="(inquiry, index) in itemInquiries.content">
                                <!-- 작성자 정보 -->
                                <div class="creation-info">
                                    <div>
                                        <p>{{ inquiry.userName }}</p>
                                        <p>{{ inquiry.date }}</p>
                                    </div>
                                    <p v-if="!inquiry.writtenMeFlag" @click="openReport('QNA', inquiry.id, inquiry.blockFlag)">신고/차단</p>
                                </div>
                                <!-- 답변 상태 -->
                                <div class="delivery-status-wrap">
                                    <p class="status answer-waiting" v-if="!inquiry.answerFlag">답변대기</p>
                                     <p class="status answer-completed" v-else>답변완료</p>
                                </div>
                                <!-- 사용자 문의 -->
                                <div class="user-writing" v-if="!inquiry.secretFlag || inquiry.writtenMeFlag">
                                    <p class="title"><strong>[{{ inquiry.label }}]</strong><span>{{ inquiry.subject }}</span></p>
                                    <p class="content">{{ inquiry.question }}
                                    </p>
                                </div>
                                <!-- 관리자 답변 -->
                                 <div class="admin-answer" v-if="inquiry.answerFlag && (!inquiry.secretFlag || inquiry.writtenMeFlag)">
                                    <p class="administrator">{{ inquiry.answer.title }}</p>
                                    <div class="content">
                                        {{ inquiry.answer.answer }}
                                    </div>
                                    <p class="date">답변일 {{ inquiry.answer.date }}</p>
                                </div>
                                <!-- 관리자 답변 비밀글 -->
                                <p class="administrator-secret" v-if="inquiry.secretFlag && !inquiry.writtenMeFlag">비밀글입니다.</p>
                            </li>
                        </ul>
                        <ui-pagination :current-page="itemInquiries.pagination.currentPage" :total-pages="itemInquiries.pagination.totalPages"
                                       :scroll-top-flag="false" @change="getItemInquiries"/>
                    </div>
                    <!-- 문의 없음 -->
                    <div class="no-contents" v-else>
                        <img src="~/assets/image/common/img_noQna.png" alt="게시글 없음">
                        <p>상품문의가 없습니다.</p>
                    </div>
                </section>
            </div>
            <div class="contents-right" ref="offsetElement">
                <article class="select-option-container" ref="rightElement">
                    <form>
                        <div class="scroll-y">
                            <!-- 옵션 미사용 - 수량 -->
                            <div class="quantity-wrap">
                                <p>수량</p>
                                <div class="quantity-box-round">
                                    <button type="button" class="btn-quantity btn-minus"></button>
                                    <input type="number" title="수량" value="1" readonly maxlength="999"
                                           class="quantity number">
                                    <button type="button" class="btn-quantity btn-plus"></button>
                                </div>
                            </div>

                            <!-- 옵션 -->
                            <div class="txt_box">
                                <p>*상품을 구매하려면 필수 옵션을 작성하세요.</p>
                            </div>

                            <!-- 옵션-텍스트형 -->
                            <div class="option-text">
                                <div class="form-line">
                                    <input type="text" class="form-basic" placeholder="옵션-텍스트형" />
                                    <!-- <span class="feedback">유효성 메시지</span> -->
                                </div>

                                <div class="form-line">
                                    <input type="text" class="form-basic" placeholder="옵션-텍스트형" />
                                    <!-- <span class="feedback">유효성 메시지</span> -->
                                </div>
                                <div class="form-line">
                                    <div class="flex">
                                        <input type="text" class="form-basic" placeholder="옵션-텍스트형" />
                                        <button class="btn btn-black">추가</button>
                                    </div>
                                    <span class="feedback">유효성 메시지</span>
                                </div>
                            </div>

                            <!-- 옵션-드롭다운(선택형) -->
                            <div class="option-dropdown">
                                <!-- 버튼 -->
                                <div class="dropdown-title select-wrap" @click="toggleDropdownActive($event)">
                                    <a class="input-select">옵션-선택형</a>
                                </div>
                                <!-- 내용 -->
                                <div class="option-contents">
                                    <div class="select-wrap" @click="toggleDropdownActive($event)">
                                        <a class="input-select">옵션-선택형</a>
                                    </div>
                                    <div class="option-inner">
                                        <div class="dropdown-area">
                                            <button class="option-title" @click="toggleOptionActive($event)">옵션
                                                선택1</button>
                                            <div class="option-item">
                                                <button>옵션1</button>
                                                <button>옵션2</button>
                                                <button>옵션3</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 옵션-드롭다운(조합형) -->
                            <div class="option-dropdown">
                                <!-- 버튼 -->
                                <div class="dropdown-title select-wrap" @click="toggleDropdownActive($event)">
                                    <a class="input-select">옵션-조합형</a>
                                </div>
                                <!-- 내용 -->
                                <div class="option-contents">
                                    <div class="select-wrap" @click="toggleDropdownActive($event)">
                                        <a class="input-select">옵션-조합형</a>
                                    </div>
                                    <div class="option-inner">
                                        <div class="dropdown-area">
                                            <button class="option-title" @click="toggleOptionActive($event)">옵션
                                                선택1</button>
                                            <div class="option-item">
                                                <button>옵션1</button>
                                                <button>옵션2</button>
                                                <button>옵션3</button>
                                            </div>
                                        </div>
                                        <div class="dropdown-area">
                                            <button class="option-title" @click="toggleOptionActive($event)">옵션
                                                선택2</button>
                                            <div class="option-item">
                                                <button>옵션1</button>
                                                <button>옵션2</button>
                                                <button>옵션3</button>
                                            </div>
                                        </div>
                                        <div class="dropdown-area">
                                            <button class="option-title" @click="toggleOptionActive($event)">옵션
                                                선택3</button>
                                            <div class="option-item">
                                                <button>옵션1</button>
                                                <button>옵션2</button>
                                                <button>옵션3</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 구성상품 -->
                            <div class="composition-pruduct active">
                                <div class="composition-title">구성상품</div>
                                <ul class="composition-list-container">
                                    <li class="composition-list">
                                        <div class="item-list-container horizon">
                                            <!-- 반복요소 item-list -->
                                            <div class="item-list">
                                                <!-- 아이템 썸네일 영역 -->
                                                <div class="thumbnail-container sold-out">
                                                    <div class="sold-out-wrap">
                                                        <span>
                                                            <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                                        </span>
                                                    </div>
                                                    <div @click.prevent class="thumbnail-wrap">
                                                        <div class="thumbnail-area">
                                                            <img class="top-left"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="top-right"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="bottom-left"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="bottom-right"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="center-center">
                                                        </div>
                                                        <img class="thumbnail" src="~/assets/image/sample/thum.png"
                                                             alt="썸네일">
                                                    </div>
                                                </div>
                                                <!-- 아이템 정보 영역 -->
                                                <div class="info-container">
                                                    <div class="title-main paragraph-ellipsis">
                                                        [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] :
                                                        option1,
                                                        option 2
                                                        / [옵션3] : option1, option2
                                                    </div>
                                                    <div class="title-sub paragraph-ellipsis">
                                                        (구성 상품의 설명)
                                                    </div>
                                                    <div class="purchase-amount">
                                                        <p class="amount-only">
                                                            <string>999</string>개
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="option-dropdown">
                                                    <!-- 버튼 -->
                                                    <div class="dropdown-title select-wrap"
                                                         @click="toggleDropdownActive($event)">
                                                        <a class="input-select">옵션-선택형</a>
                                                    </div>
                                                    <!-- 내용 -->
                                                    <div class="option-contents">
                                                        <div class="select-wrap" @click="toggleDropdownActive($event)">
                                                            <a class="input-select">옵션-선택형</a>
                                                        </div>
                                                        <div class="option-inner">
                                                            <div class="dropdown-area">
                                                                <button class="option-title"
                                                                        @click="toggleOptionActive($event)">옵션 선택1</button>
                                                                <div class="option-item">
                                                                    <button>옵션1</button>
                                                                    <button>옵션2</button>
                                                                    <button>옵션3</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="item-list">
                                                <!-- 아이템 썸네일 영역 -->
                                                <div class="thumbnail-container sold-out">
                                                    <div class="sold-out-wrap">
                                                        <span>
                                                            <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                                        </span>
                                                    </div>
                                                    <div @click.prevent class="thumbnail-wrap">
                                                        <div class="thumbnail-area">
                                                            <img class="top-left"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="top-right"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="bottom-left"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="bottom-right"
                                                                 src="~/assets/image/sample/thum_area.png"
                                                                 alt="플로팅이미지" />
                                                            <img class="center-center">
                                                        </div>
                                                        <img class="thumbnail" src="~/assets/image/sample/thum.png"
                                                             alt="썸네일">
                                                    </div>
                                                </div>
                                                <!-- 아이템 정보 영역 -->
                                                <div class="info-container">
                                                    <div class="title-main paragraph-ellipsis">
                                                        [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] :
                                                        option1,
                                                        option 2
                                                        / [옵션3] : option1, option2
                                                    </div>
                                                    <div class="title-sub paragraph-ellipsis">
                                                        (구성 상품의 설명)
                                                    </div>
                                                </div>
                                                <!-- 옵션-드롭다운(조합형) -->
                                                <div class="option-dropdown">
                                                    <!-- 버튼 -->
                                                    <div class="dropdown-title select-wrap"
                                                         @click="toggleDropdownActive($event)">
                                                        <a class="input-select">옵션-조합형</a>
                                                    </div>
                                                    <!-- 내용 -->
                                                    <div class="option-contents">
                                                        <div class="select-wrap" @click="toggleDropdownActive($event)">
                                                            <a class="input-select">옵션-조합형</a>
                                                        </div>
                                                        <div class="option-inner">
                                                            <div class="dropdown-area">
                                                                <button class="option-title"
                                                                        @click="toggleOptionActive($event)">옵션 선택1</button>
                                                                <div class="option-item">
                                                                    <button>옵션1</button>
                                                                    <button>옵션2</button>
                                                                    <button>옵션3</button>
                                                                </div>
                                                            </div>
                                                            <div class="dropdown-area">
                                                                <button class="option-title"
                                                                        @click="toggleOptionActive($event)">옵션 선택2</button>
                                                                <div class="option-item">
                                                                    <button>옵션1</button>
                                                                    <button>옵션2</button>
                                                                    <button>옵션3</button>
                                                                </div>
                                                            </div>
                                                            <div class="dropdown-area">
                                                                <button class="option-title"
                                                                        @click="toggleOptionActive($event)">옵션 선택3</button>
                                                                <div class="option-item">
                                                                    <button>옵션1</button>
                                                                    <button>옵션2</button>
                                                                    <button>옵션3</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </li>
                                </ul>
                            </div>

                            <!-- 옵션리스트 -->
                            <ul class="option-list-container">
                                <!-- 옵션리스트 - 썸네일형 -->
                                <li class="option-list">
                                    <i class="btn-close"></i>
                                    <div class="item-list-container horizon">
                                        <!-- 반복요소 item-list -->
                                        <div class="item-list">
                                            <!-- 아이템 썸네일 영역 -->
                                            <div class="thumbnail-container sold-out">
                                                <div class="sold-out-wrap">
                                                    <span>
                                                        <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                                    </span>
                                                </div>
                                                <div @click.prevent class="thumbnail-wrap">
                                                    <div class="thumbnail-area">
                                                        <img class="top-left" src="~/assets/image/sample/thum_area.png"
                                                             alt="플로팅이미지" />
                                                        <img class="top-right" src="~/assets/image/sample/thum_area.png"
                                                             alt="플로팅이미지" />
                                                        <img class="bottom-left"
                                                             src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                                        <img class="bottom-right"
                                                             src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                                        <img class="center-center">
                                                    </div>
                                                    <img class="thumbnail" src="~/assets/image/sample/thum.png"
                                                         alt="썸네일">
                                                </div>
                                            </div>
                                            <!-- 아이템 정보 영역 -->
                                            <div class="info-container">
                                                <div class="title-main paragraph-ellipsis">
                                                    [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] : option1,
                                                    option 2
                                                    / [옵션3] : option1, option2
                                                </div>
                                                <div class="title-sub paragraph-ellipsis">
                                                    추가 텍스트 옵션작성 (+22,000원 추가)
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item-list">
                                            <!-- 아이템 썸네일 영역 -->
                                            <div class="thumbnail-container sold-out">
                                                <div class="sold-out-wrap">
                                                    <span>
                                                        <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                                    </span>
                                                </div>
                                                <div @click.prevent class="thumbnail-wrap">
                                                    <div class="thumbnail-area">
                                                        <img class="top-left" src="~/assets/image/sample/thum_area.png"
                                                             alt="플로팅이미지" />
                                                        <img class="top-right" src="~/assets/image/sample/thum_area.png"
                                                             alt="플로팅이미지" />
                                                        <img class="bottom-left"
                                                             src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                                        <img class="bottom-right"
                                                             src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                                        <img class="center-center">
                                                    </div>
                                                    <img class="thumbnail" src="~/assets/image/sample/thum.png"
                                                         alt="썸네일">
                                                </div>
                                            </div>
                                            <!-- 아이템 정보 영역 -->
                                            <div class="info-container">
                                                <div class="title-main paragraph-ellipsis">
                                                    [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] : option1,
                                                    option 2
                                                    / [옵션3] : option1, option2
                                                </div>
                                                <div class="title-sub paragraph-ellipsis">
                                                    추가 텍스트 옵션작성 (+22,000원 추가)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="option-price-wrap">
                                        <div class="quantity-box">
                                            <button type="button" class="btn-quantity btn-minus"></button>
                                            <input type="number" title="수량" value="1" readonly maxlength="999"
                                                   class="quantity number">
                                            <button type="button" class="btn-quantity btn-plus"></button>
                                        </div>
                                        <div class="option-price">
                                            <span>9,999,999,999</span>
                                            <span>원</span>
                                        </div>

                                    </div>
                                </li>
                                <li class="option-list">
                                    <i class="btn-close"></i>
                                    <div class="item-list-container horizon">
                                        <div class="item-list">
                                            <!-- 아이템 썸네일 영역 -->
                                            <div class="thumbnail-container sold-out">
                                                <div class="sold-out-wrap">
                                                    <span>
                                                        <img src="~/assets/image/sample/sold-out.png" alt="품절">
                                                    </span>
                                                </div>
                                                <div @click.prevent class="thumbnail-wrap">
                                                    <div class="thumbnail-area">
                                                        <img class="top-left" src="~/assets/image/sample/thum_area.png"
                                                             alt="플로팅이미지" />
                                                        <img class="top-right" src="~/assets/image/sample/thum_area.png"
                                                             alt="플로팅이미지" />
                                                        <img class="bottom-left"
                                                             src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                                        <img class="bottom-right"
                                                             src="~/assets/image/sample/thum_area.png" alt="플로팅이미지" />
                                                        <img class="center-center">
                                                    </div>
                                                    <img class="thumbnail" src="~/assets/image/sample/thum.png"
                                                         alt="썸네일">
                                                </div>
                                            </div>
                                            <!-- 아이템 정보 영역 -->
                                            <div class="info-container">
                                                <div class="title-main paragraph-ellipsis">
                                                    [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] : option1,
                                                    option 2
                                                    / [옵션3] : option1, option2
                                                </div>
                                                <div class="title-sub paragraph-ellipsis">
                                                    추가 텍스트 옵션작성 (+22,000원 추가)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="option-price-wrap">
                                        <div class="quantity-box">
                                            <button type="button" class="btn-quantity btn-minus"></button>
                                            <input type="number" title="수량" value="1" readonly maxlength="999"
                                                   class="quantity number">
                                            <button type="button" class="btn-quantity btn-plus"></button>
                                        </div>
                                        <div class="option-price">
                                            <span>9,999,999,999</span>
                                            <span>원</span>
                                        </div>

                                    </div>
                                </li>
                                <!-- 옵션리스트 - 번호형 -->
                                <li class="option-list">
                                    <i class="btn-close"></i>
                                    <div class="item-list-container horizon">
                                        <!-- 반복요소 item-list -->
                                        <div class="item-list">
                                            <!-- 아이템 상품 번호 -->
                                            <div class="option-number">상품01</div>
                                            <!-- 아이템 정보 영역 -->
                                            <div class="info-container">
                                                <div class="title-main paragraph-ellipsis">
                                                    [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] : option1,
                                                    option 2
                                                    / [옵션3] : option1, option2
                                                </div>
                                                <div class="title-sub paragraph-ellipsis">
                                                    추가 텍스트 옵션작성 (+22,000원 추가)
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item-list">
                                            <!-- 아이템 상품 번호 -->
                                            <div class="option-number">상품01</div>
                                            <!-- 아이템 정보 영역 -->
                                            <div class="info-container">
                                                <div class="title-main paragraph-ellipsis">
                                                    [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] : option1,
                                                    option 2
                                                    / [옵션3] : option1, option2
                                                </div>
                                                <div class="title-sub paragraph-ellipsis">
                                                    추가 텍스트 옵션작성 (+22,000원 추가)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="option-price-wrap">
                                        <div class="quantity-box">
                                            <button type="button" class="btn-quantity btn-minus"></button>
                                            <input type="number" title="수량" value="1" readonly maxlength="999"
                                                   class="quantity number">
                                            <button type="button" class="btn-quantity btn-plus"></button>
                                        </div>
                                        <div class="option-price">
                                            <span>9,999,999,999</span>
                                            <span>원</span>
                                        </div>

                                    </div>
                                </li>
                                <li class="option-list">
                                    <i class="btn-close"></i>
                                    <div class="item-list-container horizon">
                                        <div class="item-list">
                                            <!-- 아이템 상품 번호 -->
                                            <div class="option-number">상품01</div>
                                            <!-- 아이템 정보 영역 -->
                                            <div class="info-container">
                                                <div class="title-main paragraph-ellipsis">
                                                    [구성상품1] 상품명이 노출됩니다 / [옵션1] : option 1, option 2 / [옵션2] : option1,
                                                    option 2
                                                    / [옵션3] : option1, option2
                                                </div>
                                                <div class="title-sub paragraph-ellipsis">
                                                    추가 텍스트 옵션작성 (+22,000원 추가)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="option-price-wrap">
                                        <div class="quantity-box">
                                            <button type="button" class="btn-quantity btn-minus"></button>
                                            <input type="number" title="수량" value="1" readonly maxlength="999"
                                                   class="quantity number">
                                            <button type="button" class="btn-quantity btn-plus"></button>
                                        </div>
                                        <div class="option-price">
                                            <span>9,999,999,999</span>
                                            <span>원</span>
                                        </div>

                                    </div>
                                </li>
                            </ul>

                        </div>
                        <!-- 옵션총금액 -->
                        <div class="total-price">
                            <p>
                                합계
                            </p>
                            <p>
                                <span>9,999,999,999</span>
                                <span>원</span>
                            </p>
                        </div>
                        <!-- 버튼 -->
                        <div class="btn-option-buy btn-wrap gap">
                            <button class="btn btn-round btn-primary-line">장바구니</button>
                            <button class="btn btn-round btn-primary">바로구매</button>
                        </div>
                    </form>
                </article>
            </div>
        </section>

        <!-- 쿠폰 다운 모달 -->
        <div class="modal modal-coupon" :class="{'show': showModal.coupon}">
            <div class="dimmed-bg" @click="showModal.coupon=false"></div>
            <div class="modal-wrap">
                <button class="modal-close" @click="showModal.coupon=false">닫기</button>
                <div class="modal-header">쿠폰 다운로드</div>
                <div class="p-2 modal-body">
                    <button type="button" class="btn btn-default-line btn-all-down" @click="downloadAllCoupons()">
                        <img src="~/assets/image/ico/ico_download_black_02.svg" class="ico-down">
                        <span>모든 쿠폰 다운({{ formatNumber(itemCoupons.pagination.totalElements) }})</span>
                    </button>
                    <p class="all-items">총 <strong>{{ formatNumber(itemCoupons.pagination.totalElements) }}</strong>개</p>
                    <!-- 쿠폰리스트 -->
                    <ul class="coupon-list-container">
                        <!-- 상품 -->
                        <li class="coupon-list line">
                            <div class="coupon-list-wrap">
                                <div class="item">
                                    <div class="price-area"><span class="number"><em>10</em>%</span></div>
                                    <div class="tag-area product"></div>
                                </div>
                                <div class="info">
                                    <strong class="desc title">[패밀리] 10%할인(최대 5천원)</strong>
                                    <span class="desc sub">상품 쿠폰이 노출되고 있습니다.</span>
                                    <p class="pc">
                                        <span class="desc date">2019-01-01 ~ 2019-06-03 / 50,000원 이상 구매시 사용가능</span>
                                    </p>
                                </div>
                            </div>
                            <button type="button" class="download">
                                <img src="~/assets/image/ico/ico_download_black.svg" class="ico-down"><span>쿠폰받기</span>
                            </button>
                            <div class="mobile">
                                <span class="desc date">2019-01-01 ~ 2019-06-03 / 50,000원 이상 구매시 사용가능</span>
                            </div>
                        </li>
                        <!-- 주문 -->
                        <li class="coupon-list line">
                            <div class="coupon-list-wrap">
                                <div class="item">
                                    <div class="price-area"><span class="number"><em>3,000</em>원</span></div>
                                    <div class="tag-area order"></div>
                                </div>
                                <div class="info">
                                    <strong class="desc title">[패밀리] 10%할인(최대 5천원)</strong>
                                    <span class="desc sub">상품 쿠폰이 노출되고 있습니다.</span>
                                    <p class="pc">
                                        <span class="desc date">2019-01-01 ~ 2019-06-03 / 50,000원 이상 구매시 사용가능</span>
                                    </p>
                                </div>
                            </div>
                            <button type="button" class="download">
                                <img src="~/assets/image/ico/ico_download_black.svg" class="ico-down"><span>쿠폰받기</span>
                            </button>
                            <div class="mobile">
                                <span class="desc date">2019-01-01 ~ 2019-06-03 / 50,000원 이상 구매시 사용가능</span>
                            </div>
                        </li>
                        <!-- 카테고리 -->
                        <li class="coupon-list line">
                            <div class="coupon-list-wrap">
                                <div class="item">
                                    <div class="price-area"><span class="number"><em>10</em>%</span></div>
                                    <div class="tag-area category"></div>
                                </div>
                                <div class="info">
                                    <strong class="desc title">[패밀리] 10%할인(최대 5천원)</strong>
                                    <span class="desc sub">상품 쿠폰이 노출되고 있습니다.</span>
                                    <p class="pc">
                                        <span class="desc date">2019-01-01 ~ 2019-06-03 / 50,000원 이상 구매시 사용가능</span>
                                    </p>
                                </div>
                            </div>
                            <button type="button" class="download">
                                <img src="~/assets/image/ico/ico_download_black.svg" class="ico-down"><span>쿠폰받기</span>
                            </button>
                            <div class="mobile">
                                <span class="desc date">2019-01-01 ~ 2019-06-03 / 50,000원 이상 구매시 사용가능</span>
                            </div>
                        </li>
                    </ul>
                    <!-- 노 컨텐츠 -->
                    <div class="no-contents">
                        다운로드 가능한 쿠폰이 없습니다.
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

                    <ul class="dot-list large-dot">
                        <li>다운로드한 쿠폰은 마이페이지 > 쿠폰에서 확인하실 수 있습니다.</li>
                        <li>다운로드한 쿠폰의 유효기간 경과 시 사용할 수 없습니다.</li>
                    </ul>
                </div>
            </div>
        </div>


        <!-- 배송산간지역 모달 -->
        <div class="modal modal-delivery" :class="{'show': showModal.island}">
            <div class="dimmed-bg" @click="showModal.island=false"></div>
            <div class="modal-wrap">
                <button class="modal-close" @click="showModal.island=false">닫기</button>
                <div class="modal-header">제주/도서산간지역</div>
                <div class="modal-body">
                    <div class="form-wrap">
                        <div class="select-wrap">
                            <select class="input-select" v-model="islandParam.where">
                                <option value="ADDRESS">주소</option>
                                <option value="ZIPCODE">우편번호</option>
                            </select>
                        </div>
                        <div class="form-line">
                            <input type="text" class="form-basic" placeholder="주소를 입력해주세요." v-model="islandParam.query"/>
                            <button type="button" @click="getIslands(1)">
                                <i class="ico-search"></i>
                            </button>
                            <span class="feedback">유효성 메시지</span>
                        </div>
                    </div>
                    <div>
                        <table>
                            <colgroup>
                                <col style="width: 60%" />
                                <col />
                                <col />
                            </colgroup>
                            <thead>
                            <tr>
                                <th>우편번호/주소</th>
                                <th>제주</th>
                                <th>도서산간</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, index) in islands.content" :key="'island-'+index">
                                    <td>
                                        <p class="address">{{ data.zipcode }}</p>
                                        <p>{{ data.address }}</p>
                                    </td>
                                    <td>{{ data.islandType === 'JEJU' ? '○' :'' }}</td>
                                    <td>{{ data.islandType === 'ISLAND' ? '○' :'' }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- 페이징 -->
                         <ui-pagination :current-page="islands.pagination.currentPage" :total-pages="islands.pagination.totalPages"
                                       :scroll-top-flag="false" @change="getIslands" v-if="islands.content.length > 0"/>
                    </div>

                    <!-- 노 컨텐츠 -->
                    <div class="no-contents" v-show="islands.content.length === 0">
                        등록된 자료가 없습니다.
                    </div>
                </div>
            </div>
        </div>
        <!-- 공유하기 모달 -->
        <div class="modal modal-copy" :class="{'show': showModal.share}">
            <div class="dimmed-bg" @click="showModal.share=false"></div>
            <div class="modal-wrap">
                <button class="modal-close" @click="showModal.share=false">닫기</button>
                <div class="modal-header">
                    공유하기
                </div>
                <div class="p-2 modal-body">
                    <div class="sns-wrap">
                        <a href="javascript:;">
                            <span class="circle"><img src="~/assets/image/common/sns_kakao.svg" alt="카카오톡"></span>
                        </a>
                        <a href="javascript:;">
                            <span class="circle"><img src="~/assets/image/common/sns_naver.svg" alt="네이버"></span>
                        </a>
                        <a href="javascript:;">
                            <span class="circle">URL</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <modal-report
            :show="reportParam.show"
            :content-id="reportParam.contentId"
            :content-type="reportParam.contentType"
            :block-flag="reportParam.blockFlag"
            @reload="reloadReport"
            @close="closeReport"/>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import SwiperCore, {
    Navigation,
    Pagination,
    Autoplay,
    Scrollbar,
    Controller
} from "swiper/core";

SwiperCore.use([Navigation, Pagination, Autoplay, Scrollbar, Controller]);
export default {
    // setup() {
    //     return {
    //         modules: [Navigation, Pagination, Autoplay, Scrollbar],
    //     };
    // },
    async asyncData({$salesonApi, $seo, $axios, params, error, route, query}) {

        try {
            const itemUserCode =  params.id;
            console.log('itemUserCode : ' +  itemUserCode);
            console.log(query);

            const [seo, { data }, qnaGroups] = await Promise.all(
                [
                    $seo(route.path, $axios),
                    $salesonApi().item.getItem(itemUserCode),
                    $salesonApi().inquiry.getQnaGroups()
                ]);

            const breadcrumbs = data.breadcrumbs ;
            let itemCategoryInfo = {};
            if (breadcrumbs != null && breadcrumbs.length > 0) {
                const mainCategoryId = breadcrumbs[0].categoryClass;
                const childCategories = breadcrumbs[0].breadcrumbCategories;
                let mainCategoryUrl = '';
                if (childCategories.length > 0) {
                    childCategories.forEach((child, index) => {
                        if (mainCategoryId === child.categoryId) {
                            mainCategoryUrl = child.categoryUrl;
                            return false;
                        }
                    });
                    const { data } = await $salesonApi().category.getAllCategories();
                    const info = $salesonApi().category.getCategoryInfo(data, mainCategoryUrl);

                    itemCategoryInfo = {
                        title : info.title,
                        categoryName1: info.categoryName1,
                        categoryName2: info.categoryName2,
                        categoryName3: info.categoryName3,
                        selectedCategoryDepth: info.selectedCategoryDepth,
                        categories: info.categories
                    };
                }
            }

            let dataSet = {
                itemUserCode: itemUserCode,
                seo: seo,
                itemId: data.item.itemId,
                item: data.item,
                breadcrumbs: data.breadcrumbs,
                itemEarnPoint: data.itemEarnPoint,
                cardBenefits: data.cardBenefits,
                deliveryInfo: data.deliveryInfo,
                itemCategoryInfo: itemCategoryInfo, // 카테고리 정보
                qnaGroups: qnaGroups.data.list
            }

            return dataSet;
        } catch (e) {
            console.log(e)
            error({statusCode: 404, message: 'Page Not Found'})
        }
    },
    data() {
        return {
            thumbnailMainSwiper: null,
            thumbnailSwiper: null,
            thumbnailListSwiper: null,
            relationSwiper: null,
            isActiveCard: false,
            isTooltipActive: false,
            tabIndex: 0,
            tabs: ['상세정보', '기본정보', '후기', '상품문의'],
            isShowDetailInfo: false,
            targetElement: null,
            leftElement: null,
            rightElement: null,
            offsetElement: null,
            isTargetActive: false,
            isMobileBuyNowActive: false,
            isDeps1: false,
            isDeps2: false,
            isDeps3: false,

            showInquiryForm: true,
            itemCategoryInfo: {},
            qnaGroups: {},
            relationItems: {}, // 다른 고객들이 많이 본 상품
            itemReviews: {  // 상품후기
                content:[],
                pagination: {
                    currentPage:1,
                    first:true,
                    last:true,
                    size:10,
                    totalElements:0,
                    totalPages:0
                }
            },
            reviewParam: {
                page: 1,
                photoFlag: '',
                score: 0,
                orderBy: '',
            },
            itemInquiries: {  // 상품문의 리스트
                content: [],
                pagination: {
                    currentPage:1,
                    first:true,
                    last:true,
                    size:10,
                    totalElements:0,
                    totalPages:1,
                }
            },
            inquiryFormParam: {  // 상품문의 등록 parameter
                itemId: 0,
                qnaGroup: '',
                subject: '',
                question: '',
                secretFlag: 'N'
            },
            showModal: {
                share: false,
                island: false,
                coupon: false,
            },
            itemCoupons: {  // 다운가능 쿠폰리스트
                pagination: {},
                content: {}
            },
            islands: {  // 도서산간 리스트
                pagination: {},
                content: {}
            },
            islandParam: {  // 도서산간 파라메터
                page: 1,
                itemsPerPage: 5,
                query: '',
                where: 'ADDRESS',
                size: 5
            },
            showReportDetailModal: false,
            showReportContentType:'',
            reportParam:{
                contentType: '',
                contentId: 0,
                blockFlag: false,
                show: false
            },
            isLogin: false,
        };
    },
    computed: {
        getShippingExtraText: function() {
            let shippingExtraCharge1 = this.item.shippingExtraCharge1;
            let shippingExtraCharge2 = this.item.shippingExtraCharge2;
            let text = "";

            if (shippingExtraCharge1 > 0) text += "제주 지역 추가 " + this.formatNumber(shippingExtraCharge1) + "원";
            if (shippingExtraCharge1 > 0 && shippingExtraCharge2 > 0) text += " / ";
            if (shippingExtraCharge2 > 0) text += "도서산간 지역 추가 " + this.formatNumber(shippingExtraCharge2) + "원";

            return text;
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.isLogin = this.$saleson.isLogin();
        this.getRelationItems();
        this.getItemInquiries(1);
        this.getItemReviews(1);

        this.setSwiper();

    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        setSwiper() {
            // 썸네일 메인 스와이퍼
            const thumbnailMainSwiper = new Swiper('.thumbnail-main-swiper', {
                slidesPerView: 1,
                controller: {
                    control: this.thumbnailListSwiper,
                },
            });

            // 썸네일 리스트 스와이퍼
            const thumbnailListSwiper = new Swiper('.thumbnail-list-swiper', {
                slidesPerView: 5,
                slidesPerGroup: 1,
                navigation: {
                    prevEl: '.thumbnail-list-swiper .swiper-prev',
                    nextEl: '.thumbnail-list-swiper .swiper-next',
                },
                controller: {
                    control: this.thumbnailMainSwiper,
                },
            });

            thumbnailMainSwiper.controller.control = thumbnailListSwiper;
            thumbnailListSwiper.controller.control = thumbnailMainSwiper;

            this.thumbnailMainSwiper = thumbnailMainSwiper;
            this.thumbnailListSwiper = thumbnailListSwiper;

            // 스와이퍼 슬라이드 클릭 이벤트
            const slides = document.querySelectorAll('.thumbnail-list-swiper .swiper-slide');
            slides.forEach((slide, index) => {
                slide.addEventListener('click', () => {

                    slides.forEach(s => s.classList.remove('swiper-slide-thumb-active'));
                    slide.classList.add('swiper-slide-thumb-active');

                    thumbnailMainSwiper.slideToLoop(index);
                });
            });

            // 연관상품 스와이퍼
            this.relationSwiper = new Swiper(".swiper.relation-swiper", {
                slidesPerView: 2,
                spaceBetween: 14,
                enabled: true,
                navigation: {
                    prevEl: '.relation-swiper .swiper-prev',
                    nextEl: '.relation-swiper .swiper-next',
                },
                breakpoints: {
                    767: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    }
                }
            });

        },
        toggleInfoPanel(panelName) {
            if (panelName === 'isDeps1') {
                this.isDeps1 = !this.isDeps1;
                this.isDeps2 = false;
                this.isDeps3 = false;

            } else if (panelName === 'isDeps2') {
                this.isDeps2 = !this.isDeps2;
                this.isDeps1 = false;
                this.isDeps3 = false;
            } else if (panelName === 'isDeps3') {
                this.isDeps3 = !this.isDeps3;
                this.isDeps1 = false;
                this.isDeps2 = false;
            }
            this.isVisible = false;
            // this[panelName] = !this[panelName];
        },
        showDetailInfo() {
            this.isShowDetailInfo = true
        },
        toggleTab(index) {
            this.tabIndex = index;
        },
        handleScroll() {
            const targetElement = this.$refs.targetElement;
            const leftElement = this.$refs.leftElement;
            const rightElement = this.$refs.rightElement;
            const offsetElement = this.$refs.offsetElement;

            const rect = targetElement.getBoundingClientRect();
            const leftRect = leftElement.getBoundingClientRect();
            const rightRect = rightElement.getBoundingClientRect();

            if (leftRect.height > rightRect.height && rect.top < 250) {
                this.isTargetActive = true;

                const footerElement = document.getElementById('footer');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            targetElement.classList.add('offset');
                            if (leftElement && offsetElement) {
                                const leftElementHeight = leftElement.clientHeight;
                                offsetElement.style.height = `${leftElementHeight}px`;
                            }
                        } else {
                            targetElement.classList.remove('offset');
                        }
                    });
                }, {
                    rootMargin: '150px',
                    threshold: 0
                });
                observer.observe(footerElement);
            } else {
                this.isTargetActive = false;
            }
        },

        toggleOptionActive(e) {
            const dropdownArea = e.currentTarget.closest('.dropdown-area');
            dropdownArea.classList.toggle('active');
        },
        toggleDropdownActive(e) {
            const optionDropdown = e.currentTarget.closest('.option-dropdown');
            optionDropdown.classList.toggle('active');
        },
        toggleMobileBuyNowActive() {
            this.isMobileBuyNowActive = !this.isMobileBuyNowActive;
            console.log(" this.isMobileBuyNowActive", this.isMobileBuyNowActive)
        },
        toggleActiveCard() {
            this.isActiveCard = !this.isActiveCard;
        },
        toggleTooltip() {
            this.isTooltipActive = !this.isTooltipActive;
        },
        closeTooltip() {
            this.isTooltipActive = false;
        },
        getCategories(index) {
            if (this.itemCategoryInfo != null && this.itemCategoryInfo.categories) {
                let arr = this.itemCategoryInfo.categories[index];
                if (arr == null || arr.length == 0) {
                    arr = null;
                }
                return arr;
            }
            return null;
        },
        async getRelationItems() {
            // 다른 고객들이 많이 본 상품 리스트 조회 (연관상품)
            try {
                const { data } = await this.$salesonApi().item.getRelationItems(this.item.itemUserCode);
                this.relationItems = data.list;
            } catch (e) {
                console.error('[상품 상세] : 다른 고객들이 많이 본 상품 리스트 조회', e);
            }
        },
        async getItemInquiries(page) {
            // 상품문의
            if (page == null || page < 0) {
                page = 1;
            }

            let params = {
                page: page,
                itemUserCode: this.item.itemUserCode
            };

            try {
                const { data } = await this.$salesonApi().item.getItemInquiries(params);
                this.itemInquiries = data;
                console.log(data.content);
            } catch (e) {
                console.error('[상품 상세] : 상품문의 리스트 조회', e);
            }
        },
        toggleInquiryForm() {
            // Q&A 작성폼 display on/off
            this.showInquiryForm = !this.showInquiryForm;
        },
        setInquirySecretFlag(event) {
            // Q&A 작성폼 비밀글 param set
            if (event.target.checked) {
                this.inquiryFormParam.secretFlag = 'Y';
            } else {
                this.inquiryFormParam.secretFlag = 'N';
            }
        },
        async inquirySubmit(validate) {
            const isValid = await validate();

            let qnaGroup = this.inquiryFormParam.qnaGroup;
            if (qnaGroup === null || qnaGroup === '') {
                this.$saleson.alert('문의 유형을 선택하세요.', () => {
                    return false;
                });

            } else {
                if (isValid) {
                    this.$saleson.confirm("등록하시겠습니까?", () => {
                        // 상품 문의 저장 진행
                        this.saveInquiry();
                    });

                    return false;
                }
            }
        },
        async saveInquiry() {
            try {
                this.inquiryFormParam.itemId = this.item.itemId;
          /*      let params = {
                    itemId: this.inquiryFormParam.itemId,
                    qnaGroup: this.inquiryFormParam.qnaGroup,
                    subject: this.inquiryFormParam.subject,
                    question: this.inquiryFormParam.question,
                    secretFlag: this.inquiryFormParam.secretFlag
                };*/

                const formData = new FormData();
                formData.append("itemId", this.inquiryFormParam.itemId);
                formData.append("qnaGroup", this.inquiryFormParam.qnaGroup);
                formData.append("subject", this.inquiryFormParam.subject);
                formData.append("question", this.inquiryFormParam.question);
                formData.append("secretFlag", this.inquiryFormParam.secretFlag);

                const { data } = await this.$salesonApi().inquiry.writeItemInquiry(formData);

                if (data.message === 'OK') {
                    this.showInquiryForm = false; // Q&A쓰기 폼 접음
                    this.$saleson.alert('등록되었습니다.');

                    // 등록 파라메터 초기화
                    this.inquiryFormParam = {
                        itemId: 0,
                        qnaGroup: '',
                        subject: '',
                        question: '',
                        secretFlag: 'N'
                    };

                    // 문의 리스트 재조회
                    this.getItemInquiries(1);
                }

            } catch (e) {
                console.error('[상품 상세] : 상품 문의 등록', e);
            }
        },
        async getItemReviews(page) {
            // 상품 후기 조회

            if (page == null || page < 0) {
                page = 1;
            }

            let params = {
                page: page,
                itemUserCode: this.item.itemUserCode,
                photoFlag: this.reviewParam.photoFlag,
                score: this.reviewParam.score,
                orderBy: this.reviewParam.orderBy
            };

            try {
                const { data } = await this.$salesonApi().item.getItemReviews(params);
                this.itemReviews = data;
            } catch (e) {
                console.error('[상품 상세] : 상품 리뷰 리스트 조회', e);
            }
        },
        setReviewPhotoFlag(event) {
            // 사진후기 보기 on/off 조회조건에 따라 상품 후기 재조회
            if (event.target.checked) {
                this.reviewParam.photoFlag = 'Y';
            } else {
                this.reviewParam.photoFlag = '';
            }

            this.reviewParam.page = 1;
            this.getItemReviews(1);
        },
        setReviewSort(sortIndex) {
            // 사진후기 보기 on/off 조회조건에 따라 상품 후기 재조회
            if (sortIndex === 1) {
                this.reviewParam.orderBy = 'CREATED_DATE';
            } else if (sortIndex === 2) {
                this.reviewParam.orderBy = 'LIKE_COUNT';
            } else {
                this.reviewParam.orderBy = '';
            }

            this.reviewParam.page = 1;
            this.getItemReviews(1);
        },
        setReviewScore(event) {
            // 선택된 정렬 조건에 따라 상품 후기 재조회
            let score = event.target.value;

            this.reviewParam.score = score;

            this.reviewParam.page = 1;
            this.getItemReviews(1);
        },

        openReport(contentType, contentId, blockFlag) {

            if (!this.$saleson.isLogin()) {
                this.$saleson.confirm(this.$saleson.const.LOGIN_MESSAGE, () => {
                    // 확인 버튼 클릭 시 실행 로직
                    this.$router.push({path: this.$saleson.pages.LOGIN, query: {target: this.$route.path}});
                });
                return;
            }

            this.showReportContentType = contentType;
            this.reportParam.contentId = contentId;
            this.reportParam.contentType = contentType;
            this.reportParam.blockFlag = blockFlag;
            this.reportParam.show = true;
        },
        async getItemCoupons(page) {
            // 상품상세 쿠폰리스트

            if (!this.isLogin) {
                return false;
            }

            const param = {
                itemId: this.item.itemId,
                page: page,
            };

            try {
                const { data } = await this.$salesonApi().coupon.getDownloadCoupons(param);
                // console.log(data);
                this.itemCoupons = data.couponPageResponse;
                this.showModal.coupon = true;
            } catch (e) {
                console.error('[상품 상세] : 쿠폰 리스트 조회', e);
            }
        },
        async downloadAllCoupons() {

            const param = {
                itemUserCode: this.item.itemUserCode
            };

            try {
                const { data } = await this.$salesonApi().item.downloadAllItemCouponList(param);
                // console.log(data);
                this.itemCoupons = data.couponPageResponse;

                // 작업중
               // this.$saleson.alert(formatNumber(response.downloadCount) + '개 쿠폰을 다운로드 받았습니다');

            } catch (e) {
                console.error('[상품 상세] :  쿠폰 모두 다운', e);
            }
        },
        async getIslands(page) {
            // 도서산간 리스트

            try {
                this.islandParam.page = page;
                const { data } = await this.$salesonApi().common.getIslands(this.islandParam);
                this.islands = data;
                this.showModal.island = true;
            } catch (e) {
                console.error('[상품 상세] : 도서산간 리스트 조회', e);
            }

        },
        async addToCart(itemId, orderMinQuantity) {

            const quantity = Number(orderMinQuantity) > 1 ? Number(orderMinQuantity) : 1;

            this.param.arrayRequiredItems.push(itemId + '||' + quantity + '||');

            try {
                await this.$salesonApi().cart.addToCart(this.param);
                this.param.arrayRequiredItems.splice(0, this.param.arrayRequiredItems.length);

                const element = document.getElementById('cart_' + itemId);
                if (!element.classList.contains('active')) {
                    element.classList.add('active');
                }
                // document.getElementById('cart_' + itemId).className = 'btn_cart on'; // active?

                const { data }  = await this.$salesonApi().common.getCartInfo();
                this.updateDisplayCartQuantity(this, data.cartQuantity);

            } catch (e) {
                console.error('[상품 상세] 장바구니 담기: ', e);
            }

            this.$saleson.toast('해당 상품이 장바구니에 담겼습니다.');
            this.param.arrayRequiredItems = [];
        },

        async addToWishList(itemId) {

            if (!this.$saleson.isLogin()) {
                this.$saleson.confirm(this.$saleson.const.LOGIN_MESSAGE, () => {
                    // 확인 버튼 클릭 시 실행 로직
                    this.$router.push({path: this.$saleson.pages.LOGIN, query: {target: this.$route.path}});
                });
                return;
            }

            try {
                await this.$salesonApi().wishlist.addWishlist(itemId);

                const element = document.getElementById('wish_' + itemId);
                /*if (!element.classList.contains('active')) {
                    element.classList.add('active');
                }*/ // css 가 깨지는 것같음 확인필요
                // document.getElementById('wish_' + itemId).className = 'btn_wish on'; // active?

                const { data } = await this.$salesonApi().common.getQuickInfo();
                this.updateDisplayWishlistCount(this, data.wishlistCount);

            } catch (e) {
                console.error('[상품 상세] 관심상품 담기: ', e);
            }

            this.$saleson.toast('해당 상품이 관심상품에 담겼습니다.');
        },
        isEmpty(value) {
            if (typeof value !== "undefined" && value !== null) {
                value = value.split(' ').join('');
                if (value !== '') {
                    return false;
                }
            }
            return true;
        },
        async copyUrl() {
            // 링크 복사
            let url = this.$saleson.config.frontDomain + this.$route.path;
            try {
                await this.$copyText(url);
            } catch (e) {
                console.error(e);
            }
            this.$saleson.toast('클립보드에 복사 되었습니다.');
        },
        closeReport() {
            /*  showReportModal: false,
                  reportDetailModal: false,*/

            this.reportParam.contentId = 0;
            this.reportParam.contentType = '';
            this.reportParam.blockFlag = false;
            this.reportParam.show=false;
        },
        reloadReport() {
            let contentType = this.reportParam.contentType;

            if (contentType == '') {
                contentType = this.showReportContentType;
            }

            // 차단/차단해제 후에 해당 리스트 재조회
            if ('REVIEW' == contentType) {
                this.getItemReviews(this.itemReviews.pagination.currentPage);
                return;
            } else {
                this.getItemInquiries(this.itemInquiries.pagination.currentPage);
            }
        },
    },

};
</script>

<style lang="scss">
@import "~/assets/scss/pages/items/item_list.scss";
@import "~/assets/scss/pages/mypage/mypage_coupon.scss";
</style>