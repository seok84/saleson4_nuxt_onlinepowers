<template></template>
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
        this.$nextTick(() => {
            Sns.initSns($s, this.$salesonApi());
            const { code } = this.$route.query;
            const { state } = this.$route.query;
            let req = {
                grant_type : "authorization_code",
                client_id : $s.config.naverLoginAppId,
                client_secret : $s.config.naverClientSecret,
                code : code
            }

            $s.axios
            .post($s.config.apiDomain+"/api/auth/naver-user",req)
            .then((response) => {
                const {id, name, email} = response.data;
                let snsUser = {
                    "email" : email,
                    "snsId" : id,
                    "snsName" : name,
                    "snsType" : "naver",
                    "state" : state,
                    "token" : '',
                };
                const purpose = state.split("_")[0];
                    // 부모창 페이지 종류 조회 (mypage, login...)
                    //const pageType = opener.$("#naverIdLogin").data('page-type');
                    console.log(response, "naver-callback response");
                    if(purpose == 'login' || purpose == 'join') {
                        Sns.snsLogin(snsUser);
                    } else if (purpose == 'connect') {
                        Sns.snsConnect(snsUser);
                    }
                //self.close();
            }).catch((error) => {
                $s.alert(error?.response?.data?.message, () => {
                    if(!$s.isMobile()) {
                        opener.parent.location = $s.pages.LOGIN;
                        window.close();
                    } else {
                        $s.router.push($s.pages.LOGIN);
                    }
                });
            })
        });
    }
}
</script>