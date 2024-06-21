<template>
    <div>
        <footer id="footer">
            <div class="pc">
                <div class="link-area">
                    <section class="flex">
                        <div class="col-left">
                            <nuxt-link to="/">회사소개</nuxt-link>
                            <nuxt-link to="/customer/notice">공지사항</nuxt-link>
                            <nuxt-link to="/customer/notice">고객센터</nuxt-link>
                            <nuxt-link to="/terms/terms">이용약관</nuxt-link>
                        </div>
                        <div class="col-right">
                            <nuxt-link to="/terms/policy">개인정보처리방침</nuxt-link>
                            <nuxt-link to="/customer/store-inquiry">제휴/입점문의</nuxt-link>
                            <nuxt-link to="/terms/refuse-email">이메일수집거부</nuxt-link>
                            <nuxt-link to="/customer/faq">자주하는 질문</nuxt-link>
                            <nuxt-link to="/customer/inquiry">1:1문의</nuxt-link>
                        </div>
                    </section>
                </div>
                <section class="footer-info">
                    <div class="footer-brand">
                        <img src="~/assets/image/common/brand.svg" alt="세일즈온">
                    </div>
                    <div class="cs-center">
                        <div class="cs-tel">
                            고객센터
                            <a class="tel" href="tel:02-6737-9200">02-6737-9200</a>
                        </div>
                        <p class="cs-time">
                            평일 AM 09:00 ~ PM 06:00 (점심 PM 12:00 ~ PM 01:00)<br>
                            주말 및 공휴일은 휴무입니다.
                        </p>
                    </div>
                    <div class="info">
                        <p class="company">온라인파워스㈜ 사업자정보</p>
                        <p class="business-info">
                            <span class="owner">대표이사 : 배동혁,박종진</span>
                            <span class="business-number">사업자등록번호 : 123-12-12345</span>
                            <span class="business-type">통신판매신고번호 : 2012-서울구로-00989</span>
                            <nuxt-link to="/">사업자정보 확인</nuxt-link>
                        </p>
                        <p class="company-info">
                            <span class="address">
                                주소 : 서울 구로구 디지털로 27길 24(벽산디지털밸리 1차) 711호
                            </span>
                            <span class="security">
                                개인정보 보호책임자 : 운영자
                                <a href="mailto: E-mail : solah@daesang.com">E-mail : solah@daesang.com</a>
                            </span>
                        </p>
                        <p class="copyright">COPYRIGHT © ONLINEPOWERS. All rights reserved.</p>
                    </div>
                </section>
            </div>
            <div class="mobile">
                <div class="link-area">
                    <nuxt-link to="/">회사소개</nuxt-link>
                    <nuxt-link to="/customer/notice">공지사항</nuxt-link>
                    <nuxt-link to="/customer">고객센터</nuxt-link>
                    <nuxt-link to="/terms/terms">이용약관</nuxt-link>
                </div>
                <div class="cs-center">
                    <div class="cs-tel">
                        고객센터
                        <a class="tel" href="tel:02-6737-9200">02-6737-9200</a>
                    </div>
                    <p class="cs-time">
                        평일 AM 09:00 ~ PM 06:00 (점심 PM 12:00 ~ PM 01:00)<br>
                        주말 및 공휴일은 휴무입니다.
                    </p>
                </div>
                <div class="info">
                    <div class="mobile">
                        <div class="footer-brand">
                            <img src="~/assets/image/common/brand.svg" alt="세일즈온">
                        </div>
                    </div>
                    <p class="company" :class="{ 'on': toggleFooterContent }"
                        @click="toggleFooterContent = !toggleFooterContent">온라인파워스㈜ 사업자정보</p>
                    <p class="business-info toggle-footer-info">
                        <span class="owner">대표이사 : 배동혁,박종진</span>
                        <span class="business-number">사업자등록번호 : 123-12-12345</span>
                        <span class="business-type">통신판매신고번호 : 2012-서울구로-00989</span>
                        <nuxt-link to="/">사업자정보 확인</nuxt-link>
                    </p>
                    <p class="company-info  toggle-footer-info">
                        <span class="address">
                            주소 : 서울 구로구 디지털로 27길 24(벽산디지털밸리 1차) 711호
                        </span>
                        <span class="security">
                            개인정보 보호책임자 : 운영자
                            <a href="mailto: E-mail : solah@daesang.com">E-mail : solah@daesang.com</a>
                        </span>
                    </p>
                </div>
                <div class="link-area bottom">
                    <nuxt-link to="/">개인정보처리방침</nuxt-link>
                    <nuxt-link to="/">제휴/입점문의</nuxt-link>
                    <nuxt-link to="/">이메일수집거부</nuxt-link>
                    <nuxt-link to="/">자주하는 질문</nuxt-link>
                    <nuxt-link to="/">1:1문의</nuxt-link>
                </div>
                <p class="copyright">COPYRIGHT © ONLINEPOWERS. All rights reserved.</p>
            </div>
        </footer>
        <!-- <mobile-gnb></mobile-gnb> -->
        <!-- 화면 확인용 - 실제 개발반영 X -->
        <direct-link></direct-link>
        <!-- //화면 확인용 - 실제 개발반영 X -->
    </div>
</template>

<script>

export default {
    name:'footerLayout',
    data() {
        return {
            toggleFooterContent: true,
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/layout/footer.scss";
</style>