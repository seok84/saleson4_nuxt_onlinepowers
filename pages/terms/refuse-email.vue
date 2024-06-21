<template>
    <section class="terms">
        <div class="title-h1">이용약관</div>
        <termsTab></termsTab>
        <div class="container">

            본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나<br/>
            그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며,<br/>
            이를 위반 시 정보통신망 법에 의해 형사처벌 됨을 유념하시기 바랍니다.<br/>
            <br/>
        </div>
    </section>
</template>
<script>
    export default {
        name:'terms-refuse-email',
        head(){
            return {
                meta: [
                    {hid: 'pageTitle', name:'pageTitle', content:'이메일수신거부'}
                ]
            }
        },
        data() {
            return {

            }
        },
    }
</script>
<style lang="scss">
@import '~/assets/scss/pages/terms/terms_main.scss';
</style>