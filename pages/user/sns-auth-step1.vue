<template>
    <div class="sns-auth-page step1">
        <h1 class="title-h1">회원가입</h1>
        <p class="title-auth">SNS 인증</p>
        <div class="sns-auth-wrap">
            <button type="button" @click="connectSns('kakao', 'join',target)">
                <div class="img-wrap"><img src="~/assets/image/ico/ico_sns_kakao.svg" alt="kakao"></div>
                <p>카카오톡</p>
            </button>
            <button type="button" @click="connectSns('naver', 'join',target)">
                <div class="img-wrap"><img src="~/assets/image/ico/ico_sns_naver.svg" alt="naver"></div>
                <p>네이버</p>
            </button>
            <button type="button" @click="connectSns('apple', 'join',target)">
                <div class="img-wrap"><img src="~/assets/image/ico/ico_sns_apple.svg" alt="apple"></div>
                <p>애플</p>
            </button>
        </div>
        <button type="button" class="btn btn-default btn-prev">이전으로</button>
    </div>
</template>
<script>
import Sns from "@/modules/op.sns";
let $s, vm;
export default {
    name: 'sns-auth-step1',
    async asyncData({$seo}) {
        try {
            const seo = await $seo();
            return {
                seo: seo
            }

        } catch (error) {
            console.log("[sns-auth-step1.vue] asyncData error: ", error);
            return {}
        }
    },

    data() {
        return {
            target: $s.pages.INDEX,
        }
    },

    head(){
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'SNS 인증'}
            ],
            script: [
                { src: 'https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.min.js'},
                { src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'}
            ],
            seo: this.seo
        }
    },
    beforeCreate() {
        $s = this.$saleson;
        vm = this;
    },
    mounted() {
        Sns.initSns($s, this.$salesonApi());
    },
    methods: {

        connectSns(snsType, state, target) {
            Sns.loginWithSns(snsType, state, target);
        },
    }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/user/user.scss";
</style>