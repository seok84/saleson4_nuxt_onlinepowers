<template>
    <div class="user-page find-idpw">
        <!-- // 회원가입 -->
        <h1 class="title-h1">아이디 찾기</h1>
        <ValidationObserver ref="observer" v-slot="{ validate }">
            <form action="" @submit.prevent="handleNext(validate)">
                <div>
                    <p class="form-title">SMS인증</p>
                    <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                        <div class="form-line mb-10" :class="{ 'invalid': errors.length }">
                            <input type="text" class="form-basic" v-model="authParam.loginId"
                                   placeholder="아이디를 입력하세요"/>
                            <span class="feedback">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                        <div class="form-line mb-10" :class="{ 'invalid': errors.length }">
                            <input type="text" class="form-basic" v-model="authParam.userName"
                                   placeholder="이름을 입력하세요"/>
                            <span class="feedback">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required|numeric|max:11" v-slot="{errors}">
                        <div class="form-line mb-10" :class="{ 'invalid': errors.length }">
                            <div class="flex">
                                <input type="text" class="form-basic"
                                       v-model="authParam.phoneNumber" placeholder="'-'제외 번호 입력"/>
                                <button type="button" class="btn btn-black m-w-98"
                                        v-if="authRequest" @click="sendAuthNumber()">인증요청
                                </button><!-- 인증요청 -> 재전송 -->
                                <button type="button" class="btn btn-black m-w-98" v-else
                                        @click="sendAuthNumber()">재전송
                                </button><!-- 인증요청 -> 재전송 -->
                            </div>
                            <span class="feedback">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>

                    <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                        <div class="form-line mb-10" :class="{ 'invalid': errors.length }">
                            <div class="flex">
                                <span class="time-limit"
                                      v-show="timerRunning">{{ timeLimit }}</span>
                                <input type="text" id="auth-number" class="form-basic"
                                       v-model="authParam.authNumber" placeholder="인증번호를 입력하세요"/>
                                <button type="button" class="btn btn-black m-w-98"
                                        @click="checkAuthNumber()" v-if="!auth">인증하기
                                </button>
                                <button type="button" class="btn btn-black m-w-98" v-else>인증성공
                                </button>
                            </div>
                            <span class="feedback">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>
                    <div class="link-wrap">
                        <button type="submit" class="btn btn-primary confirm-btn">확인</button>
                    </div>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>
<script>
let $s, vm;
export default {
    name: 'find-password',
    async asyncData({$seo}) {
        try {
            const seo = await $seo();
            return {
                seo: seo
            }
        } catch (error) {
            console.log("[find-pw.vue] asyncData error: ", error);
            return {}
        }
    },

    data() {
        return {
            authRequest: true,
            auth: false,
            timeLimit: 60,
            timer: null,
            timerRunning: false,

            authParam: {
                loginId: "",
                userName: "",
                phoneNumber: "",
                authNumber: "",
                requestToken: ""
            },

        }
    },
    head() {
        return {
            meta: [
                {hid: 'pageTitle', name: 'pageTitle', content: '비밀번호 찾기'}
            ],
            seo: this.seo
        }
    },
    beforeCreate () {
        $s = this.$saleson;
        vm = this;
    },
    methods: {
        async sendAuthNumber () {
            if (!vm.authParam.userName) {
                $s.alert("이름을 입력하세요.");
                return false;
            }

            if (!vm.authParam.phoneNumber) {
                $s.alert("휴대폰 번호를 입력하세요.");
                return false;
            }

            let param = {
                phoneNumber : vm.authParam.phoneNumber.replace("-", ""),
                userName : vm.authParam.userName
            }
            clearInterval(vm.timer);
            vm.timeLimit = 60;

            try {
                const {data} = await this.$salesonApi().auth.sendAuthNumber(param);
                $s.alert("인증번호가 전송되었습니다.");
                vm.authParam.requestToken = data;
                vm.authRequest = false;
                vm.auth = false;
                vm.startTimer();
            } catch (e) {
                $s.alert(e.response.data.description);
            }
        },
        async checkAuthNumber () {
            if (!vm.authParam.authNumber) {
                $s.alert("인증번호를 입력하세요.");
                return false;
            }

            try {
                const {data} = await this.$salesonApi().auth.checkAuthNumber(vm.authParam);
                if (data.status === 200) {
                    $s.alert("인증이 완료되었습니다.");
                    vm.timerRunning = false;
                    clearInterval(vm.timer);
                    vm.auth = true;
                }
            } catch (error) {
                $s.alert("인증번호가 일치하지 않습니다.");
            }
        },
        async handleNext(validate) {
            const isValid = await validate();
            if(isValid) {
                if (vm.auth) {
                    try{
                        await this.$salesonApi().auth.findPasswordStep1(vm.authParam);
                        $s.redirect('/user/find-pw-complete');
                    } catch (error) {
                        $s.alert(error);

                    }t


                } else {
                    $s.alert('인증을 완료해주세요.');
                }
            }


        },

        startTimer() {
            vm.timerRunning = true;
            vm.timer = setInterval(() => {
                if (vm.timeLimit > 0) {
                    vm.timeLimit--; // 시간 감소
                } else {
                    clearInterval(vm.timer); // 타이머 중지
                    $s.alert("인증이 만료되었습니다.", () => {
                        vm.timerRunning = false;
                        vm.authParam.requestToken = "";
                        vm.authParam.phoneNumber = "";
                        vm.authParam.authNumber = "";
                    })

                }
            }, 1000);
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/user/user.scss";
</style>