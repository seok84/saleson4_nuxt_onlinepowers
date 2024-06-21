<template>
    <div class="terms-lnb">
        <nuxt-link to="/terms/terms" class="link"><span>이용약관</span></nuxt-link> <!-- active 활성화 -->
        <nuxt-link to="/terms/policy" class="link en"><span>개인정보<br class="mobile">처리방침</span></nuxt-link>
        <nuxt-link to="/terms/refuse-email" class="link"><span>이메일<br class="mobile">수신거부</span></nuxt-link>
        <nuxt-link to="/terms/marketing" class="link"><span>마케팅<br class="mobile">수신동의</span></nuxt-link>
    </div>
</template>
<script>
</script>
<style lang="scss">
@import '~/assets/scss/pages/terms/terms_main.scss';
</style>