<template>
    <div class="customer-tab">
        <nuxt-link to="/customer/notice" class="link"><span>공지사항</span></nuxt-link> <!-- active 활성화 -->
        <nuxt-link to="/customer/faq" class="link en"><span>FAQ</span></nuxt-link>
        <nuxt-link to="/customer/inquiry" class="link"><span>1:1문의</span></nuxt-link>
        <nuxt-link to="/customer/store-inquiry" class="link"><span>제휴/입점문의</span></nuxt-link>
    </div>
</template>
<script>
</script>
<style lang="scss">
@import '~/assets/scss/pages/customer/customer_main.scss';
</style>