<template>
    <div class="directLinkWrapper">
        <!-- 
            임시 링크맵
            실 반영 X
        -->
        <ul v-show="openLinkWrap">
            <li v-for="(category, index) in categories" :key="index" class="depth01">
                <strong>{{ category.title }}</strong>
                <ul class="depth02-wrap">
                    <li v-for="(link, subIndex) in category.links" :key="subIndex" class="depth02">
                        <nuxt-link :to="link.to">{{ link.label }}</nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
        <button type="button" @click="openLinkWrap = !openLinkWrap">열기</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            openLinkWrap:false,
            categories: [
                {
                    title: 'cart',
                    links: [
                        { label: '장바구니', to: '/cart' }
                    ]
                },
                {
                    title: 'customer',
                    links: [
                        { label: '질문', to: '/customer/faq' },
                        { label: '1:1문의', to: '/customer/inquiry' },
                        { label: '공지사항', to: '/customer/notice' },
                        { label: '입점문의', to: '/customer/store-inquiry' }
                    ]
                },
                {
                    title: 'display',
                    links: [
                        { label: '브랜드', to: '/display/brand' },
                        { label: '브랜드 상세', to: '/display/brand/_id' },
                        { label: 'best', to: '/display/best' },
                        { label: 'md', to: '/display/md' },
                        { label: 'new', to: '/display/new' },
                        { label: 'review', to: '/display/review' },
                        { label: 'timedeal', to: '/display/timedeal' }
                    ]
                },
                {
                    title: 'featured',
                    links: [
                        { label: '이벤트', to: '/featured' },
                        { label: '이벤트 상세', to: '/featured/pages/_id' }
                    ]
                },
                {
                    title: 'items',
                    links: [
                        { label: '아이템 리스트', to: '/items' },
                        { label: '아이템 상세', to: '/items/_id' }
                    ]
                },
                {
                    title: 'main',
                    links: [
                        { label: '메인', to: '/main' }
                    ]
                },
                {
                    title: 'mypage',
                    links: [
                        { label: '메인', to: '/mypage' },
                        { label: '주문/배송조회', to: '/mypage/order' },
                        { label: '주문/배송 상세조회', to: '/mypage/order/_id' },
                        { label: '취소/교환/반품', to: '/mypage/order-cancel' },
                        { label: '관심상품', to: '/mypage/wishlist' },
                        { label: '최근 본 상품', to: '/mypage/recent' },
                        { label: '배송주소록', to: '/mypage/address' },
                        { label: '쿠폰', to: '/mypage/coupon' },
                        { label: '포인트', to: '/mypage/point' },
                        { label: '나의 등급/혜택', to: '/mypage/grade' },
                        { label: '내 정보 관리', to: '/mypage/myinfo' },
                        { label: '비밀번호 변경', to: '/mypage/password' },
                        { label: 'sns 연동관리', to: '/mypage/sns-manage' },
                        { label: '상품문의', to: '/mypage/inquiry-item' },
                        { label: '이용후기', to: '/mypage/review' }
                    ]
                },
                {
                    title: 'order',
                    links: [
                        { label: '주문', to: '/order' },
                        { label: '비회원 주문', to: '/order/non-member' },
                        { label: '주문 완료', to: '/order/completed' }
                    ]
                },
                {
                    title: 'sub',
                    links: [
                        { label: '로딩', to: '/sub/loading' }
                    ]
                },
                {
                    title: 'terms',
                    links: [
                        { label: '마케팅', to: '/terms/marketing' },
                        { label: '개인정보', to: '/terms/policy' },
                        { label: '수신거부', to: '/terms/refuse-email' },
                        { label: '이용약관', to: '/terms/terms' }
                    ]
                },
                {
                    title: 'user',
                    links: [
                        { label: '접근 권한 안내', to: '/user/access' },
                        { label: '회원가입 방식선택', to: '/user/certify-join' },
                        { label: '비밀번호 변경', to: '/user/change-password' },
                        { label: '90일 경과 비밀번호 변경하기', to: '/user/expired-password' },
                        { label: '아이디 찾기 완료', to: '/user/find-id-complete' },
                        { label: '아이디 찾기', to: '/user/find-id' },
                        { label: '비밀번호 찾기 완료', to: '/user/find-pw-complete' },
                        { label: '비밀번호 찾기', to: '/user/find-pw' },
                        { label: '회원가입 완료', to: '/user/join-complete' },
                        { label: '회원가입', to: '/user/join' },
                        { label: '로그인', to: '/user/login' },
                        { label: '탈퇴하기', to: '/user/secede' },
                        { label: 'SMS인증', to: '/user/sms-certify' },
                        { label: 'SNS 인증 - 1', to: '/user/sns-auth-step1' },
                        { label: 'SNS 인증 - 2', to: '/user/sns-auth-step2' }
                    ]
                },
                {
                    title: 'index',
                    links: [
                        { label: '메인으로', to: '/' }
                    ]
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.directLinkWrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: 50vh;
    overflow-y: auto;
    z-index: 999999;

    >button {
        position: fixed;
        bottom: 9rem;
        left: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        border-radius: 50px;
        background-color: black;
        color: white;
        box-shadow: 0 0 1rem #ff000050;
    }

    >ul {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: auto;
        background: pink;
        font-size: 12px;
    }

    .depth {

        &01 {
            flex: none;
            width: 20%;
            padding: 1rem;

            @include mobile {
                width: 33.3%;
            }

            >strong {
                display: block;
                font-weight: bolder;
                margin-bottom: 1rem;
            }
        }

        &02 {
            padding-left: 2rem;

            a {
                line-height: 1.5;
            }
        }
    }



}
</style>