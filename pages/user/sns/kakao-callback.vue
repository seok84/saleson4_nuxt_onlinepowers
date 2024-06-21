<template>

</template>

<script>
import Sns from '@/modules/op.sns.js';
let $s, vm;

export default {
    layout:'blank-client',
    beforeCreate () {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    mounted () {
        this.$nextTick( () => {
            console.log('kakao-callback mounted');
            Sns.initSns($s, this.$salesonApi());
            const { code } = this.$route.query;
            const { state } = this.$route.query;
            let req = {
                grantType : "authorization_code",
                clientId : $s.config.kakaoRestApiKey,
                code : code,
                redirectUri : $s.config.frontDomain+ $s.config.kakaoLoginCallback
            }
            $s.axios.post($s.config.apiDomain+"/api/auth/kakao-user",req).then((response) =>{
                const {snsId, nickname, email} = response.data;
                let snsUser = {
                    "email" : email,
                    "snsId" : snsId,
                    "snsName" : nickname,
                    "snsType" : "kakao",
                    "state" : state,
                    "token" : ''
                };

                const purpose = state.split("_")[0];

                if(purpose == 'login' || purpose == 'join') {
                    Sns.snsLogin(snsUser);
                } else if (purpose == 'connect') {
                    Sns.snsConnect(snsUser);
                }

            }).catch((error) => {
                $s.alert(error?.response?.data?.message, () => {
                    $s.router.push($s.pages.LOGIN);
                });
            })
        });
    }
}
</script>