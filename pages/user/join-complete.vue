<template>
    <div class="user-page join-complete">
        <h1 class="title-h1">회원가입</h1>
        <p class="sub-title">
            <em>세일즈온 스토어</em> 회원가입이<br class="mobile" /> 완료되었습니다.
        </p>
        <p class="user-page-info">
            세일즈온에 가입해 주셔서 감사합니다.<br />
            고객님께서 만족스러운 쇼핑을 하실 수 있도록 노력하겠습니다.<br />
            지금부터 세일즈온에서 고객님만의 특별한 혜택을 누리세요.<br />
        </p>
        <div class="btn-wrap gap link-wrap">
            <a href="/user/login" class="btn btn-default btn-primary link-item">로그인</a>
            <a href="/" class="btn btn-default link-item">메인화면</a>
        </div>
    </div>
</template>
<script>
    export default {
            name: 'join-complete',
        async asyncData({$seo}) {
            try {
                const seo = await $seo();
                return {
                    seo: seo
                }
            } catch (error) {
                console.log("[join-complete.vue] asyncData error: ", error);
                return {}
            }
        },
            head(){
            return {
                meta: [
                    {hid: 'pageTitle', name:'pageTitle', content:'회원가입'}
                ],
                seo: this.seo
            }
        },
    }
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/user/user.scss";
</style>