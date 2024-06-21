<template>
    <div class="mypage-lnb">
        <div class="mobile list-divider">
            <ul class="quick-link">
                <li>
                    <img src="~/assets/image/mypage/ico_quick_order.png" alt="주문배송 조회">
                    <p>주문/배송 조회</p>
                </li>
                <li>
                    <img src="~/assets/image/mypage/ico_quick_liked.png" alt="관심상품">
                    <p>관심상품</p>
                </li>
                <li>
                    <img src="~/assets/image/mypage/ico_quick_inquiry.png" alt="1: 1 문의">
                    <p>1: 1 문의</p>
                </li>
                <li>
                    <img src="~/assets/image/mypage/ico_quick_latest.png" alt="최근 본 상품">
                    <p>최근 본 상품</p>
                </li>
            </ul>
        </div>
        <h4 class="title">쇼핑정보</h4>
        <ul class="list list-divider">
            <li>
                <nuxt-link to="/mypage/order">주문/배송 조회</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/mypage/order-cancel">취소/교환/반품 조회</nuxt-link>
            </li>
            <li><nuxt-link to="/mypage/wishlist">관심상품</nuxt-link></li>
            <li><nuxt-link to="/mypage/recent">최근 본 상품</nuxt-link></li>
            <li><nuxt-link to="/mypage/address">배송주소록 관리</nuxt-link></li>
        </ul>
        <h4 class="title">쇼핑혜택</h4>
        <ul class="list list-divider">
            <li><nuxt-link to="/mypage/coupon">쿠폰</nuxt-link></li>
            <li><nuxt-link to="/mypage/point">포인트</nuxt-link></li>
            <li><nuxt-link to="/mypage/grade">나의 등급/혜택</nuxt-link></li>
        </ul>
        <h4 class="title">정보관리</h4>
        <ul class="list list-divider">
            <li><nuxt-link to="/mypage/myInfo">내 정보 관리</nuxt-link></li>
            <li><nuxt-link to="/mypage/password">비밀번호 변경</nuxt-link></li>
            <li><nuxt-link to="/mypage/sns-manage">SNS 연동관리</nuxt-link></li>
            <li><nuxt-link to="/mypage/inquiry-item">상품문의</nuxt-link></li>
            <li><nuxt-link to="/mypage/review">이용후기</nuxt-link></li>
        </ul>
        <a href="" class="customer-link">
            <div class="ico">
                <img src="~/assets/image/common/ico_customer.svg" alt="고객센터">
            </div>
            <div class="info">
                <p><strong>sailseon</strong><span>고객센터 바로가기</span><i class="arrow"></i></p>
                <p>운영시간 09:00~18:00 주말, 공휴일 휴무</p>
            </div>
        </a>
    </div>
</template>
<script>
export default {
    name:'mypage-lnb'
}
</script>
<style></style>