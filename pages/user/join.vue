<template>
    <div class="user-page join">
        <ValidationObserver ref="observer" v-slot="{ validate }">
        <form action="" @submit.prevent="submit(validate)">
            <h1 class="title-h1">회원가입</h1>
            <!-- // 기본정보 -->
            <div class="toggle-title" :class="{ 'active': !UserInfoContent }">
                <h2>기본정보<span><em>*</em>표시는 필수 입력사항입니다</span></h2>
                <button type="button" class="toggle-arr" @click="UserInfoContent = !UserInfoContent"></button>
            </div>
            <div class="toggle-content user-info-content">
                <!-- //아이디 -->
                <h3 class="form-title accent">아이디</h3>

                <ValidationProvider tag="div" rules="required|loginId" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <div class="flex">
                        <input type="text" class="form-basic" id="loginId" v-model="param.loginId" placeholder="6자~12자 이내 영문, 숫자" />
                        <button class="btn btn-black" @click.prevent="isDuplicateId" >중복검사{{duplicateCheckId}}</button>
                    </div>
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <!-- //비밀번호 -->
                <h3 class="form-title accent">비밀번호</h3>
                <ValidationProvider tag="div" rules="required|password1|password2|password3" vid="password" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <button type="button" class="show-password-btn" @click="showPasswordFn($event)"></button>
                    <input type="password" class="form-basic" v-model="param.password" placeholder="8~16자 이내 영문, 숫자, 특수문자" />
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <!-- //비밀번호 재입력-->
                <h3 class="form-title accent">비밀번호 재입력</h3>
                <ValidationProvider tag="div" rules="required|confirmed:password" vid="passwordConfirm" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <button type="button" class="show-password-btn" @click="showPasswordFn($event)"></button>
                    <input type="password" class="form-basic" v-model="param.passwordConfirm" placeholder="비밀번호 재입력" />
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <!-- //이름 -->
                <h3 class="form-title accent">이름</h3>
                <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <input type="text" class="form-basic" v-model="param.userName"  readonly placeholder="이름" />
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <!-- //휴대폰번호 -->
                <h3 class="form-title accent">휴대폰번호</h3>
                <ValidationProvider tag="div" rules="required|numeric|max:11" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <input type="tel" class="form-basic" v-model="param.phoneNumber" readonly placeholder="'-'제외 번호 입력" />
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <!-- //전화번호 -->
                <h3 class="form-title">전화번호</h3>
                <ValidationProvider tag="div" rules="numeric|max:11" v-slot="{errors}">
                <div class="form-line">
                    <input type="text" class="form-basic" placeholder="'-'제외 번호 입력" />
                </div>
                </ValidationProvider>
                <!-- //이메일 -->
                <h3 class="form-title accent">이메일</h3>
                <ValidationProvider tag="div" rules="required|email" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <input type="text" class="form-basic" v-model="param.email" placeholder="example@company.com" />
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <!-- //생년월일 -->
                <h3 class="form-title accent">생년월일</h3>
                <div class="select-wrap" >
                    <select class="input-select" title="년" v-model="param.birthdayYear">
                        <option v-for="(n, i) in 100" :value="param.years-i">{{param.years - i}}년</option>
                    </select>
                    <select class="input-select" title="월" v-model="param.birthdayMonth" >
                        <option v-for="i in 12" :value="padNumber(i)">{{(i)}}월</option>
                    </select>
                    <select class="input-select" title="일" v-model="param.birthdayDay" >
                        <option v-for="i in 31" :value="padNumber(i)">{{(i)}}일</option>
                    </select>
                </div>

                <!-- //성별 -->
                <h3 class="form-title accent">성별</h3>
                <div class="radio-wrap">
                    <label class="input-radio"><input type="radio" v-model="param.gender" value=" " name="gender" checked><i></i>미선택</label>
                    <label class="input-radio"><input type="radio" v-model="param.gender" value="F" name="gender"><i></i>여성</label>
                    <label class="input-radio"><input type="radio" v-model="param.gender" value="M" name="gender"><i></i>남성</label>
                </div>
                <!-- //주소 -->
                <h3 class="form-title accent">우편번호</h3>
                <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                <div class="mb-10 form-line" :class="{ 'invalid': errors.length }">
                    <div class="flex">
                        <input type="text" class="form-basic" v-model="param.newPost"  readonly placeholder="우편번호" />
                        <button type="button" class="btn btn-black m-w-118" @click="openDaumPostcode()">우편번호 찾기</button>
                    </div>
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>

                <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                <div class="mb-10 form-line" :class="{ 'invalid': errors.length }">
                    <input type="text" class="form-basic" v-model="param.address"  readonly placeholder="주소" />
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
            </div>
            <ValidationProvider tag="div" rules="required" v-slot="{errors}">
            <div class="form-line"  :class="{ 'invalid': errors.length }">
                <div class="form-line ">
                    <input type="text" class="form-basic" v-model="param.addressDetail" placeholder="상세주소" />
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
            </div>
            </ValidationProvider>
            <!-- //수신동의 -->
            <div class="toggle-title" :class="{ 'active': !AcceptContent }">
                <h2>수신동의</h2>
                <button type="button" class="toggle-arr" @click="AcceptContent = !AcceptContent"></button>
            </div>


            <div class="toggle-content accept-content">
                <div class="wrap">
                    <h4>문자메시지 수신동의</h4>
                    <ul class="dot-list">
                        <li>수신동의시 쇼핑몰에서 제공하는 이벤트 및 다양한 정보를 SMS(문자메시지)로 받아볼 수 있습니다.</li>
                        <li>회원가입, 거래정보-결제/배송/교환/환불 등과 같은 운영정보는 수신동의 여부와 관계없이 발송됩니다.</li>
                    </ul>
                    <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                    <div class="radio-wrap" :class="{ 'invalid': errors.length }">
                        <label class="input-radio"><input type="radio" v-model="param.receiveSms" value="Y" name="message" checked><i></i>수신동의</label>
                        <label class="input-radio"><input type="radio" v-model="param.receiveSms" value="N" name="message"><i></i>동의안함</label>
                    </div>
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="wrap">
                    <h4>이메일 수신동의</h4>
                    <ul class="dot-list">
                        <li>수신동의시 쇼핑몰에서 제공하는 이벤트 및 다양한 정보를 E-mail(이메일)로 받아볼 수 있습니다.</li>
                        <li>회원가입, 거래정보-결제/배송/교환/환불 등과 같은 운영정보는 수신동의 여부와 관계없이 발송됩니다.</li>
                    </ul>
                    <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                    <div class="radio-wrap" :class="{ 'invalid': errors.length }">
                        <label class="input-radio"><input type="radio" v-model="param.receiveEmail" value="Y" name="email" checked><i></i>수신동의</label>
                        <label class="input-radio"><input type="radio" v-model="param.receiveEmail" value="N" name="email"><i></i>동의안함</label>
                    </div>
                        <span class="feedback">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>

                <div class="wrap mobile"><!-- // mobile -->
                    <h4>앱 푸쉬 수신동의</h4>
                    <ul class="dot-list">
                        <li>다양한 특가상품과 개인 맞춤 이벤트 정보를 가장 빠르게 받아볼 수 있습니다.</li>
                    </ul>
                    <div class="radio-wrap">
                        <label class="input-radio"><input type="radio" v-model="param.receivePush" value="Y" name="appPush" checked><i></i>수신동의</label>
                        <label class="input-radio"><input type="radio" v-model="param.receivePush" value="N" name="appPush"><i></i>동의안함</label>
                    </div>
                </div>
            </div>

            <div class="toggle-title active">
                <h2>약관동의</h2>
                <button type="button" class="toggle-arr"></button>
            </div>
            <div class="toggle-content">
                <ul class="terms-content">
                    <li class="check-wrap whole-check" >
                        <label class="circle-input-checkbox"><input type="checkbox" @click="allCheck($event)"><i></i></label>
                        <p class="terms-title">모든 약관 동의</p>
                    </li>
                    <li class="check-wrap">
                        <label class="circle-input-checkbox">
                            <input type="checkbox" name="policy1" value="POLICY_TYPE_MARKETING_AGREEMENT" v-model="param.agreedPolicyTypes"><i></i>
                        </label>
                        <div class="terms-list">
                            <p class="terms-title">서비스 이용 약관 동의 <span>(선택)</span></p>
                            <a href="javascript:void(0);" class="terms-button" @click.prevent="showTermsModal('POLICY_TYPE_MARKETING_AGREEMENT')">약관보기</a>
                        </div>
                    </li>

                    <ValidationProvider tag="div" name="policy2" rules="checkbox_required2" v-slot="{ errors, valid }" >
                        <li class="check-wrap">
                            <label class="circle-input-checkbox">
                                <input type="checkbox" name="policy2" value="POLICY_TYPE_AGREEMENT" v-model="param.agreedPolicyTypes"><i></i>
                            </label>
                            <div class="terms-list" >
                                <p class="terms-title">개인정보의 수집·이용목적 및 항목 동의 <em>(필수)</em></p>
                                <a href="javascript:void(0);" class="terms-button" @click.prevent="showTermsModal('POLICY_TYPE_AGREEMENT')">약관보기</a>
                            </div>
                        </li>

                    <li class="check-wrap">
                        <label class="circle-input-checkbox">
                            <input type="checkbox" name="policy3" value="POLICY_TYPE_PROTECT_POLICY" v-model="param.agreedPolicyTypes" ><i></i>
                        </label>
                        <div class="terms-list">
                            <p class="terms-title">개인정보의 수집·이용항목 목적 동의 <em>(필수)</em></p>
                            <a href="javascript:void(0);" class="terms-button" @click.prevent="showTermsModal('POLICY_TYPE_PROTECT_POLICY')">약관보기</a>
                        </div>
                    </li>
                        <span v-if="errors.length" class="feedback invalid">{{ errors[0] }}</span>
                    </ValidationProvider>
                </ul>
            </div>

            <!-- // 회원가입 -->
            <button type="submit" class="btn btn-default btn-primary confirm-btn">회원가입</button>

        </form>
        </ValidationObserver>
        <address-layer></address-layer>
        <div class="modal modal-terms" :class="{ 'show': modalInfo.modalShow }">
            <div class="dimmed-bg" @click="modalInfo.modalShow = !modalInfo.modalShow"></div>
            <div class="modal-wrap">
                <button class="modal-close" @click="modalInfo.modalShow = !modalInfo.modalShow">닫기</button>
                <div class="modal-header">
                    {{ modalInfo.modalTitle }}
                </div>
                <div class="modal-body p-2">
                    <div class="modal-content" v-html="modalInfo.modalText"/>
                </div>
            </div>
        </div>

    </div>

</template>


<script>
let $s, vm;
import AddressLayer from "@/components/ui/daum/address-layer.vue";
import togglePassword from '~/mixinsJs/togglePwd.js';

export default {
    components: {
        AddressLayer
    },
    name: 'join',
    mixins: [togglePassword],

    async asyncData({$salesonApi, $seo}) {

        try{
            const response = await $salesonApi().policy.getPolicies();
            const seo = await $seo();

            return {
                policies: response.data.policies, //약관내용
                seo: seo
            }
        }catch (e) {
            console.log(e)
        }

    }, catch(error) {
        console.log("[join.vue] asyncData error: ", error);
        return {}
    },

    data() {
        return {
            param: {
                loginId: "",
                password: "",
                passwordConfirm: "",
                userName: "",
                email: "",
                phoneNumber: "",
                gender: "F",
                birthdayYear: "",
                birthdayMonth: "01",
                birthdayDay: "01",
                birthdayType: "1",
                post: "",
                newPost: "",
                address: "",
                addressDetail: "",
                addressInfo: "",
                receiveSms: "Y",
                receiveEmail: "Y",
                receivePush: "Y",
                requestToken: "",

                years: 0,
                agreedPolicyTypes: []
            },
            modalInfo: {
                modalShow: false,
                modalText: '',
                modalTitle: ''
            },
            JoinTerms: {
                required: [
                    'POLICY_TYPE_AGREEMENT',
                    'POLICY_TYPE_PROTECT_POLICY'
                ],
                option: [
                    'POLICY_TYPE_MARKETING_AGREEMENT'
                ]
            },
            UserInfoContent: false,
            AcceptContent: false,
            duplicateCheckId : false
        }
    },

    head() {
        return {
            meta: [
                {hid: 'pageTitle', name: 'pageTitle', content: '회원가입'}
            ],
            seo: this.seo
        }
    },
    beforeCreate() {
        $s = this.$saleson;
        vm = this;
    },
    mounted() {
        const userName = sessionStorage.getItem("userName");
        const phoneNumber = sessionStorage.getItem("phoneNumber");
        if (!userName || !phoneNumber) {
            $s.alert("핸드폰 인증이 되어있지 않습니다", () => {
                $s.redirect('/user/sms-certify');
            })
        } else {
            vm.param.userName = userName;
            vm.param.phoneNumber = phoneNumber;

        }
        vm.$nextTick(() => {

            console.log(vm.policies, 'policies');

            let date = new Date();
            vm.param.years = date.getFullYear();
            vm.param.birthdayYear = vm.param.years;

        });
    },
    methods: {
        openDaumPostcode() {
            let child = vm.getChild("address-layer");
            if (child != null) {
                child.openDaumAddress((response) => {
                    vm.param.post = response.zipcode;
                    vm.param.newPost = response.newZipcode;
                    vm.param.address = response.jibunAddress;

                    vm.param.addressInfo = "[" + response.newZipcode + "] " + response.jibunAddress;

                });
            }
        },
        allCheck(event) {
            if (event.target.checked) {
                vm.param.agreedPolicyTypes = vm.JoinTerms.required.concat(vm.JoinTerms.option);
                console.log(vm.param.agreedPolicyTypes);
            } else {
                vm.param.agreedPolicyTypes = [];
            }
        },
        isDuplicateId() {
            if (vm.param.loginId === "") {
                return;
            }
            const params = {
                req : "/api/auth/user/duplicate",
                loginId : vm.param.loginId
            }
            let hashInBase64 = $s.getHashInBase64(JSON.stringify(vm.loginRequest));
            this.$salesonApi().auth.checkDuplicate(params, hashInBase64)
            .then((response) => {
                if (response.data === "N") {
                    $s.alert("사용가능한 아이디 입니다.");
                    vm.duplicateCheckId = true;
                } else {
                    $s.alert("사용불가능한 아이디 입니다.");
                    vm.duplicateCheckId = false;
                    document.getElementById("loginId").value = "";
                }
            })

        },

        showTermsModal(policyType) {
            vm.modalInfo.modalShow = true;
            for (let policy of vm.policies) {

                if (policy.policyType == policyType) {
                    vm.modalInfo.modalText = policy.content;
                    vm.modalInfo.modalTitle = policy.title;
                    break;
                }
            }
        },

        async submit(validate) {
            const isValid = await validate();
            console.log(isValid);
            if (isValid) {
                if (vm.param.password !== vm.param.passwordConfirm) {
                    $s.alert("비밀번호를 입력해주세요.");

                    return false;
                }
                if (!vm.duplicateCheckId) {
                    $s.alert("아이디를 중복검사해주세요.");
                    return false;
                }

                if (!vm.param.newPost || !vm.param.address || !vm.param.addressDetail) {
                    $s.alert("주소를 입력해주세요.");
                    return false;
                }
                if (!vm.param.birthdayYear || !vm.param.birthdayMonth
                    || !vm.param.birthdayDay ) {
                    $s.alert("생일을 입력해주세요.");
                    return false;
                }

                if (
                    vm.param.agreedPolicyTypes.length == 0
                    || !vm.JoinTerms.required.every(
                        term => vm.param.agreedPolicyTypes.includes(term))
                ) {
                    $s.alert("필수 이용약관에 동의해주세요.");
                    return false;
                }

                $s.confirm("등록하시겠습니까?", async () => {
                    try{
                        const {data} = await this.$salesonApi().auth.joinMember(vm.param);
                        if (data.status === 200) {
                            sessionStorage.removeItem("userName");
                            sessionStorage.removeItem("phoneNumber");
                            $s.ev.log.joinUser(data.userId);
                            $s.redirect($s.pages.JOIN_COMPLETE);
                        }
                    } catch(e) {
                        $s.alert(e.message || e);
                    }

                });
            }

        },
        padNumber(num) {
            return num < 10 ? '0' + num : num;
        }
    },

}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/user/user.scss";
</style>