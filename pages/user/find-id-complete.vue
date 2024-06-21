<template>
    <div class="user-page find-idpw">
        <h1 class="title-h1">아이디 찾기</h1>
        <img src="~/assets/image/common/img_find_id.png" alt="아이디 찾기" class="find-img find-img-id ">
        <p class="sub-title">입력하신 회원 정보로 검색된 아이디입니다.</p>
        <div class="box">
            <p>
                {{userParam.userName}} 회원님의 아이디는<br>
                <strong>{{userParam.loginId}}</strong>입니다.
            </p>
        </div>
        <ui class="dot-list">
            <li>전체 아이디 받기시, <em>등록된 회원정보의 휴대전화번호로 메시지</em>가 발송됩니다.</li>
        </ui>
        <div class="btn-wrap gap link-wrap">
            <a href="/user/find-pw" class="btn btn-primary link-item">비밀번호 찾기</a>
            <button type="button" @click.prevent="sendLoginId" class="btn btn-default link-item"> 전체 아이디 받기</button>
        </div>
    </div>
</template>
<script>
let $s, vm;
export default {
        name: 'find-id-complete',

    data() {
            return {
                userParam : {
                    loginId: "",
                    loginIdNoMask: "",
                    userName: "",
                    phoneNumber: ""
                },
                findIdParam : {
                    loginId: "",
                    userName: "",
                    phoneNumber: ""
                }
            }
    },
    head() {
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'아이디 찾기'}
            ]
        }
    },
    beforeCreate () {
        $s = this.$saleson;
        vm = this;
    },
    mounted() {
        if(!sessionStorage.getItem("loginId")) {
            $s.alert("인증이 완료되지 않았습니다.", () => {
                $s.redirect('/user/find-id')
            })
        }
        vm.userParam.loginId = sessionStorage.getItem("loginId");
        vm.userParam.loginIdNoMask = sessionStorage.getItem("loginIdNoMask");
        vm.userParam.userName = sessionStorage.getItem("userName");
        vm.userParam.phoneNumber = sessionStorage.getItem("phoneNumber");

        sessionStorage.removeItem("loginId");
        sessionStorage.removeItem("loginIdNoMask");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("phoneNumber");

    },
    methods: {
            async sendLoginId() {
                vm.findIdParam.loginId = vm.userParam.loginIdNoMask;
                vm.findIdParam.userName = vm.userParam.userName;
                vm.findIdParam.phoneNumber = vm.userParam.phoneNumber;
                try {
                    const {data} = await this.$salesonApi().auth.sendLoginId(vm.findIdParam);
                    const message = data.status === 200 ? "아이디가 전송되었습니다" : "오류가 발생하였습니다. 문의 바랍니다.";
                    $s.alert(message, () => {
                        $s.redirect("/user/login");
                    });
                } catch (error) {
                    $s.alert(error);
                }


            }
    }


}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/user/user.scss";
</style>