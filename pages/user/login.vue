<template>
    <div class="user-page">
        <!-- // 로그인 -->
        <h1 class="title-h1">로그인</h1>
        <ValidationObserver ref="observer" v-slot="{ validate }">
        <form @submit.prevent="submit(validate)">
            <fieldset>
                <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                <div class="form-line mb-10 m-mb-6" :class="{'invalid': errors.length}">
                    <input type="text" id="id" v-model="loginRequest.loginId" class="form-basic invalid"
                           placeholder="아이디" title="아이디">
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <button type="button" class="show-password-btn" @click="showPasswordFn($event)"></button>
                    <input type="password" id="pw" ref="pap" v-model="loginRequest.password"
                           class="form-basic invalid" placeholder="비밀번호" title="비밀번호">
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <div class="user-check-area">
                    <div class="check-wrap no-margin">
                        <label class="input-checkbox"><input type="checkbox" id="id_save" v-model="saveId"><i></i>아이디 저장</label>
                    </div>
                    <div class="find-idpw-area">
                        <nuxt-link to="/user/find-id">아이디 찾기</nuxt-link>
                        <span class="divider"></span>
                        <nuxt-link to="/user/find-pw">비밀번호 찾기</nuxt-link>
                    </div>
                </div>
                <div class="btn-group">
                    <button type="submit" class="btn btn-primary btn-login">로그인</button>
                </div>
            </fieldset>
        </form>
        </ValidationObserver>

            <div class="sns-join-container">
                <h2>SNS 계정으로 간편 로그인</h2>
                <div class="sns-wrap">
                    <button type="button" @click="connectSns('kakao', 'login',target)"><span class="circle"><img src="~/assets/image/common/sns_kakao.svg"
                                alt="카카오톡"></span><span class="sns-type">카카오톡</span></button>
                    <button type="button" @click="connectSns('naver','login',target)"><span class="circle"><img src="~/assets/image/common/sns_naver.svg"
                                alt="네이버"></span><span class="sns-type">네이버</span></button>
                    <button type="button" @click="connectSns('apple','login',target)"><span class="circle"><img src="~/assets/image/common/sns_apple.svg"
                                alt="애플"></span>
                        <span class="sns-type">애플</span>
                    </button>
                </div>
                <div class="get-joined">회원이 아니신가요?<nuxt-link to="/user/certify-join">회원가입</nuxt-link>
                </div>
            </div>
        <!-- // 비회원 주문조회 -->
        <div class="non-member">
            <ValidationObserver ref="observer" v-slot="{ validate }">
            <form @submit.prevent="guestSearchOrder(validate)">
                <button type="button" class="btn btn-default non-member-inquiry"
                    :class="{ 'active': nonMemberInquiry }" @click.prevent="nonMemberInquiry = !nonMemberInquiry">
                    비회원 주문조회<span class="toggle-arr"></span>
                </button>
                <div class="non-member-content">
                    <p class="user-page-info">주문시 인증한 휴대폰번호로 인증을 통해<br />확인하실 수 있습니다.</p>
                    <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                    <div class="form-line mb-10" :class="{ 'invalid': errors.length }">
                        <input type="text" class="form-basic" v-model="guestRequest.userName" placeholder="이름을 입력하세요" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </div>
                    </ValidationProvider>
                    <ValidationProvider tag="div" rules="required|numeric|max:11" v-slot="{errors}">
                        <div class="form-line mb-10" :class="{ 'invalid': errors.length }">
                            <div class="flex">
                                <input type="text" class="form-basic"
                                       v-model="guestRequest.phoneNumber" placeholder="'-'제외 번호 입력"/>
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
                                       v-model="guestRequest.authNumber" placeholder="인증번호를 입력하세요"/>
                                <button type="button" class="btn btn-black m-w-98"
                                        @click="checkAuthNumber()" v-if="!guestAuth">인증하기
                                </button>
                                <button type="button" class="btn btn-black m-w-98" v-else>인증성공
                                </button>
                            </div>
                            <span class="feedback">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>
                    <button type="submit" class="btn btn-black2 user-number-inquiry">조회하기</button>
                </div>
            </form>
            </ValidationObserver>
        </div>
        <!-- // 모달 -->
        <!-- 비밀번호 변경 모달 -->
        <div class="modal">
            <div class="dimmed-bg"></div>
            <div class="modal-wrap">
                <button class="modal-close">닫기</button>
                <div class="modal-header">
                    비밀번호 변경
                </div>
                <div class="modal-body p-4">
                    <p class="text-center">개인정보 도용으로 인한 피해를 예방하기 위해 90일 이상 비밀번호를 변경하지 않는 경우
                        비밀번호 변경을 권장하고 있습니다.
                    </p>
                    <div class="btn-wrap gap">
                        <a href="/change-pw" class="btn btn-primary">변경하기</a>
                        <button type="button" class="btn btn-default">다음에</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import togglePassword from '~/mixinsJs/togglePwd.js';
import Sns from '@/modules/op.sns.js';

let $s, vm;

export default {
    layout: 'client',
    mixins: [togglePassword],
    async asyncData({$seo}) {
        try {
            const seo = await $seo();
            return {
                seo: seo
            }

        } catch (error) {
            console.log("[login.vue] asyncData error: ", error);
            return {}
        }
    },

    data() {
        return {
            loginRequest: {
                loginType: 'ROLE_USER',
                loginId: '',
                password: '',
            },
            guestRequest: {
                authNumber: '',
                phoneNumber: '',
                requestToken: '',
                userName: ''
            },
            saveId: false,
            target: $s.pages.INDEX,
            authRequest: true,
            nonMemberInquiry: false,
            guestAuth: false,
            timeLimit: 60,
            timer: null,
            timerRunning: false,
        }
    },

    head() {
        return {
            script: [
                { src: 'https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.min.js'},
                { src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'}
                // { src: 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js'}
            ],
            link: [
                {rel: 'stylesheet', href: '/static/css/users.css'}
            ],
            seo: this.seo
        }
    },
    beforeCreate() {
        $s = this.$saleson;
        vm = this;
    },
    mounted() {
        this.$nextTick(() => {
            Sns.initSns($s, this.$salesonApi());
            let savedLoginId = $s.core.getState($s.const.SAVED_LOGIN_ID);
            let target = $s.core.getParameter("target");

            if (savedLoginId != null && savedLoginId != "") {
                vm.saveId = true;
                vm.loginRequest.loginId = savedLoginId;
            }

            if (target != null && target != '') {
                vm.target = decodeURIComponent(target);
            }
        });
    },
    methods: {
        async submit(validate) {

            const isValid = await validate();

            if (!isValid) {
                return;
            }

            let hashInBase64 = $s.getHashInBase64(JSON.stringify(vm.loginRequest));
            let url = '/api/auth/token';
            try {
                url += '?uid='+$s.ev.getUid();
            } catch(e) {}

            this.$salesonApi().auth.getAuthToken(url, vm.loginRequest, hashInBase64)
            .then((response) => {
                if (response.status === 200) {
                    $s.setToken(response.data.token);


                    if ("SLEEP_USER" === response.data.code) { // 휴면 회원
                        $s.alert("휴면 전환된 계정입니다.", function () {
                            $s.redirect($s.pages.SLEEP_USER);
                        });
                        return;
                    }

                    if ("PASSWORD_EXPIRED" === response.data.code) { // 패스워드 기간 만료
                        $s.alert("패스워드 기간이 만료 되었습니다.", function () {
                            $s.redirect($s.pages.EXPIRED_PASSWORD);
                        });
                        return;
                    }

                    if ("TEMP_PASSWORD" === response.data.code) { // 패스워드 기간 만료
                        $s.redirect($s.pages.TEMP_PASSWORD);
                        return;
                    }


                    let savedLoginId = vm.saveId ? vm.loginRequest.loginId : '';
                    $s.core.setState($s.const.SAVED_LOGIN_ID, savedLoginId);
                    let order = $s.core.getState($s.const.BUY_ORDER);

                    if (order != null && order !== '') {
                        $s.core.setState($s.const.BUY_ORDER, '');

                        vm.order = JSON.parse(order);
                        vm.order.noMemberLogin = true;

                        this.$salesonApi().order.buyOrder(vm.order);
                    }
                }
                // $s.redirect(vm.target);
            })
            .catch((error) => {
                let message = '아이디/비밀번호를 정확히 입력해 주세요.';
                if ('UNAUTHORIZED_LOCK' == error.response.data.code) {
                    message = error.response.data.message;
                }

                $s.alert(message, () => {
                    vm.loginRequest.password = '';
                    $s.closeAlert();
                });


            });

        },
        async sendAuthNumber () {
            if (!vm.guestRequest.userName) {
                $s.alert("이름을 입력하세요.");
                return false;
            }

            if (!vm.guestRequest.phoneNumber) {
                $s.alert("휴대폰 번호를 입력하세요.");
                return false;
            }
            let param = {
                phoneNumber : vm.guestRequest.phoneNumber.replace("-", ""),
                userName : vm.guestRequest.userName
            }
            clearInterval(vm.timer);
            vm.timeLimit = 60;

            try {
                const {data} = await this.$salesonApi().auth.sendAuthNumber(param);
                $s.alert("인증번호가 전송되었습니다.");
                vm.guestRequest.requestToken = data;
                vm.authRequest = false;
                vm.guestAuth = false;
                vm.startTimer();
            } catch (e) {
                $s.alert(e.response.data.description);
            }
        },
        async checkAuthNumber () {
            if (!vm.guestRequest.authNumber) {
                $s.alert("인증번호를 입력하세요.");
                return false;
            }
            try {
                const {data} = await this.$salesonApi().auth.checkAuthNumber(vm.guestRequest);
                    if (data.status === 200) {
                        $s.alert("인증이 완료되었습니다.");
                        vm.timerRunning = false;
                        clearInterval(vm.timer);
                        vm.guestAuth = true;
                    }
            } catch (error) {
                $s.alert("인증번호가 일치하지 않습니다.");
            }

        },
        guestSearchOrder() {
                let hashInBase64 = $s.getHashInBase64(JSON.stringify(vm.guestRequest));
                this.$salesonApi().auth.getAuthToken('/api/auth/guest-token',vm.guestRequest, hashInBase64)
                .then((response) => {
                    $s.setToken(response.data.token);
                    $s.redirect($s.pages.MYPAGE_ORDER);
                }).catch((error) => {
                    $s.alert(error.response.data.message);
                });

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
        },
        connectSns(snsType, state, target) {
            Sns.loginWithSns(snsType, state, target);
        },
    },

}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/user/user.scss";
</style>