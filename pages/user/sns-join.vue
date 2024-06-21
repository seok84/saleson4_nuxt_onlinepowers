<template>
    <div class="user-page join">
        <ValidationObserver ref="observer" v-slot="{ validate }">
            <form action="" @submit.prevent="submit(validate)">
            <h1 class="title-h1">SNS 간편회원 가입</h1>
            <!-- // 기본정보 -->
            <div class="toggle-title active" :class="{ 'active': !UserInfoContent }">
                <h2>기본정보<span><em>*</em>표시는 필수 입력사항입니다</span></h2>
                <button type="button" class="toggle-arr" @click="UserInfoContent = !UserInfoContent"></button>
            </div>
            <div class="toggle-content user-info-content">
                <!-- //이름 -->
                <h3 class="form-title accent">이름</h3>
                <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <input type="text" class="form-basic" v-model="param.snsName" readonly placeholder="이름" />
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <!-- //휴대폰번호 -->
                <h3 class="form-title accent">휴대폰번호</h3>
                <ValidationProvider tag="div" rules="required|numeric|max:11" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <div class="flex">
                        <input type="text" class="form-basic" v-model="param.phoneNumber" readonly placeholder="'-'제외 번호 입력" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </div>

                </div>
                </ValidationProvider>
                <!-- //이메일 -->
                <h3 class="form-title accent">이메일</h3>
                <ValidationProvider tag="div" rules="required|email" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <input type="text" class="form-basic" v-model="param.email" readonly placeholder="example@company.com"   />
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
                    <label class="input-radio"><input type="radio" v-model="param.gender" value="" name="gender" checked><i></i>미선택</label>
                    <label class="input-radio"><input type="radio" v-model="param.gender" value="F" name="gender"><i></i>여성</label>
                    <label class="input-radio"><input type="radio" v-model="param.gender" value="M" name="gender"><i></i>남성</label>
                </div>
            </div>
            <!-- //수신동의 -->
            <div class="toggle-title active"  :class="{ 'active': !AcceptContent }">
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
            <!-- //약관동의 -->
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
export default {
    name: 'sns-join',
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
        console.log("[sns-join.vue] asyncData error: ", error);
        return {}
    },
    data() {
        return {
            param: {
                snsType: "",
                snsId: "",
                email: "",
                snsName: "",
                phoneNumber: "",
                gender: "",
                birthdayYear: "",
                birthdayMonth: "01",
                birthdayDay: "01",
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
        }
    },

    head(){
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'SNS 간편회원 가입'}
            ],
            seo: this.seo
        }
    },

    beforeCreate () {
        $s = this.$saleson;
        vm = this;
    },

    mounted() {
        if(!sessionStorage.getItem('snsUser') ||
            !sessionStorage.getItem("userName") ||
             !sessionStorage.getItem("phoneNumber")) {
            $s.alert("인증이 완료되지 않았습니다.", () => {
                $s.redirect('/user/certify-join');
            })
        }

        const snsUser = JSON.parse(sessionStorage.getItem('snsUser'));
        const userName = sessionStorage.getItem("userName");
        const phoneNumber = sessionStorage.getItem("phoneNumber");


        vm.param.snsName = userName;
        vm.param.phoneNumber = phoneNumber;
        vm.param.email = snsUser.email;
        vm.param.snsType = snsUser.snsType;
        vm.param.snsId = snsUser.snsId
        vm.$nextTick(() => {

            console.log(vm.policies, 'policies');

            let date = new Date();
            vm.param.years = date.getFullYear();
            vm.param.birthdayYear = vm.param.years;

        });
    },

    methods:{

        allCheck(event) {
            if (event.target.checked) {
                vm.param.agreedPolicyTypes = vm.JoinTerms.required.concat(vm.JoinTerms.option);
                console.log(vm.param.agreedPolicyTypes);
            } else {
                vm.param.agreedPolicyTypes = [];
            }
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

                if (!vm.param.birthdayYear || !vm.param.birthdayMonth
                    || !vm.param.birthdayDay) {
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

                    try {
                        const {data} = await this.$salesonApi().auth.snsJoinMember(vm.param);
                        if (data.status === "00") {
                            sessionStorage.removeItem("userName");
                            sessionStorage.removeItem("phoneNumber");
                            sessionStorage.removeItem("snsUser");
                            $s.ev.log.joinUser(data.userId);
                            $s.redirect($s.pages.JOIN_COMPLETE);
                        }
                    }catch (e) {
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