<template>
    <section class="mypage-sns">
        <div class="title-container">
            <h2 class="title-h2">SNS 연동관리</h2>
        </div>
        <ul class="sns-interlock">
            <li>
                <p><img src="~/assets/image/common/sns_kakao.svg" alt="kakao" class="ico">
                    <span>
                        <strong>카카오</strong><span class="status">{{ dateFormat(sns.kakao.createdDate) }}</span>
                    </span>
                </p>
                <button type="button" class="switch-btn" :class="{ 'active': toggleStatus.kakao }"
                    @click="connectSns('kakao', 'connect', sns.kakao.snsUserId)"><span class="circle"></span></button>
            </li>
            <li>
                <p><img src="~/assets/image/common/sns_naver.svg" alt="naver" class="ico">
                    <span>
                        <strong>네이버</strong><span class="status">{{ dateFormat(sns.naver.createdDate) }}</span>
                    </span>
                </p>
                <button type="button" class="switch-btn" :class="{ 'active': toggleStatus.naver }"
                        @click="connectSns('naver', 'connect', sns.naver.snsUserId)"><span class="circle"></span></button>
            </li>
            <li>
                <p><img src="~/assets/image/common/sns_apple.svg" alt="apple" class="ico">
                    <span>
                        <strong>애플</strong><span class="status">{{ dateFormat(sns.apple.createdDate) }}</span>
                    </span>
                </p>
                <button type="button" class="switch-btn" :class="{ 'active': toggleStatus.apple }"
                        @click="connectSns('apple', 'connect', sns.apple.snsUserId)"><span class="circle"></span></button>
            </li>
        </ul>
        <ul class="dot-list large-dot">
            <li>SNS연결 해제는 'SNS 연동관리' 메뉴 또는 각 SNS 설정에서 가능합니다.</li>
            <li>네이버 / 카카오/ 애플 로그인을 할 때 각 SNS 플랫폼 인증 절차가 필요합니다.</li>
        </ul>
    </section>
</template>
<script>
import Sns from '@/modules/op.sns.js';

let $s, vm;
export default {
    layout: 'mypage',
    name: 'mypage-sns',
    async asyncData({$salesonApi}) {
        try{
            const response = await $salesonApi().auth.getSnsInfo();
            const sns = {


                naver : response.data.list.filter(sns => sns.snsType === 'naver')[0] || {},
                kakao : response.data.list.filter(sns => sns.snsType === 'kakao')[0] || {},
                apple : response.data.list.filter(sns => sns.snsType === 'apple')[0] || {}
            }


            return {
                sns : sns
            };
        }catch (e) {
            console.log(e)
        }

    },
    data() {
        return {
            sns : {
                naver : {
                    snsUserId : 0,
                    snsType : "",
                    createdDate : "미연동"
                },
                kakao : {
                    snsUserId : 0,
                    snsType : "",
                    createdDate : "미연동"

                },
                apple : {
                    snsUserId : 0,
                    snsType : "",
                    createdDate : "미연동"
                }
            },
            toggleStatus:{
                kakao: false,
                naver: false,
                apple: false,
            }
        }
    },
    head(){
        return {
            script: [
                { src: 'https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.min.js'},
                { src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'}
                // { src: 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'}
            ],
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'SNS 연동관리'}
            ]
        }
    },
    beforeCreate() {
        $s = this.$saleson;
        vm = this;
    },


    mounted() {
        Sns.initSns($s, this.$salesonApi());
        vm.toggleStatus.naver = !!vm.sns.naver.snsUserId;
        vm.toggleStatus.kakao = !!vm.sns.kakao.snsUserId;
        vm.toggleStatus.apple = !!vm.sns.apple.snsUserId;
    },
    methods: {
        connectSns(snsType, state, snsUserId) {
            if (snsType === 'naver') {
                this.toggleStatus.naver = !this.toggleStatus.naver;
            } else if (snsType === 'kakao') {
                this.toggleStatus.kakao = !this.toggleStatus.kakao;
            } else if (snsType === 'apple') {
                this.toggleStatus.apple = !this.toggleStatus.apple;
            }


            Sns.connectSns(snsType, state, snsUserId)
        }

    }

}
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_myinfo.scss";
</style>