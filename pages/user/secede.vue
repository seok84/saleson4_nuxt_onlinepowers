<template>
    <div class="user-page secede-page">
        <div class="modal modal-secede" :class="{ 'show': showAlertModal }">
            <div class="dimmed-bg"></div>
            <div class="modal-wrap">
                <button class="modal-close" @click="showAlertModal = !showAlertModal">닫기</button>
                <div class="modal-header">
                    회원탈퇴
                </div>
                <div class="modal-body p-2">
                    <div class="modal-content">
                        <div class="text-center">
                            정말 탈퇴 하시겠습니까?
                        </div>
                    </div>
                    <div class="btn-wrap gap">
                        <button type="button" class="btn btn-default" @click="submitForm">탈퇴</button>
                        <button type="button" class="btn btn-primary"
                            @click="showAlertModal = !showAlertModal">취소</button>
                    </div>
                </div>
            </div>
        </div>
        <h1 class="title-h1">회원탈퇴</h1>
        <p class="user-page-info">
            회원탈퇴시<br class="mobile" /> 상품 구매내역, 쿠폰 및 포인트 등 모든 정보가 삭제되며<br />
            회원 서비스를 모두 이용할 수 없습니다.
        </p>
        <p class="extinct-point"><span>소멸예정 포인트</span><strong>{{param.point}}P</strong></p>
        <ValidationObserver ref="observer" v-slot="{ validate }">
        <form @submit.prevent="handleSubmit(validate)" >
                <ValidationProvider tag="div" rules="required" v-slot="{errors}" v-if="!isSns">
                    <div class="form-line" :class="{ 'invalid': errors.length }">
                        <button type="button" class="show-password-btn" @click="showPasswordFn($event)"></button>
                        <input type="password" class="form-basic" v-model="secedeParam.password" placeholder="비밀번호" />
                        <span class="feedback">{{ errors[0] }}</span>
                    </div>
                </ValidationProvider>
            <h2 class="survey-title">탈퇴이유</h2>
            <p class="survey-content">
                그동안 Saleson store를 이용해 주셔서 감사합니다.<br>
                더 나은 운영을 위한 설문조사 이므로 솔직한 답변 부탁 드립니다.
            </p>
            <p class="survey-divider"></p>
            <ValidationProvider tag="div" rules="required" v-slot="{errors}" >
            <div class="radio-wrap survey-radio-wrap" :class="{ 'invalid': errors.length }">
                <label class="input-radio" v-for="(reason) in leaveReasons" >
                    <input type="radio" v-model="secedeParam.leaveReason" name="secede-survey" :value="reason"><i></i>{{ reason }}
                </label>
                <label class="input-radio">
                    <input type="radio" v-model="secedeParam.leaveReason" name="secede-survey" value="기타"><i></i>기타
                </label>
            </div>
                <span class="feedback">{{ errors[0] }}</span>
            <div class="form-line" v-if="secedeParam.leaveReason === '기타'">
                <textarea name="ect-survey" v-model="secedeParam.etcReason" cols="30" rows="10" class="form-basic text-area" placeholder="기타사유가 있다면 입력하세요"></textarea>
            </div>
            </ValidationProvider>
            <button type="submit" class="btn btn-primary confirm-btn">탈퇴</button>
        </form>
        </ValidationObserver>

    </div>
</template>
<script>
let $s, vm;

    import togglePassword from '~/mixinsJs/togglePwd.js';

    export default {
        name: 'secede',
        mixins: [togglePassword],

        async asyncData({$salesonApi}) {
            try{
                const response = await $salesonApi().auth.getSecedeInfo();
                const {data} = await $salesonApi().auth.isSnsJoinedUser();
                return {
                    param : response.data,
                    isSns : data

                }
            } catch (e) {
                $s.alert(e.message || e);
            }

        },
        data() {
            return {
                param : {
                    loginId : "",
                    point : 0,
                    userId : 0
                },
                secedeParam : {
                    loginId: "",
                    password: "",
                    leaveReason: "",
                    etcReason: "",
                    snsFlag: ""
                },
                isSns : false,
                showAlertModal: false,
                leaveReasons: [
                    "상품설명이 알기 어렵기 때문에",
                    "주문 및 문의 시 직원의 대응이 만족스럽지 않아서",
                    "상품의 상태가 좋지 않아서",
                    "상품의 가격이 높아서",
                    "원하는 상품이 없어서",
                ],
            }
        },
        head(){
            return {
                meta: [
                    {hid: 'pageTitle', name:'pageTitle', content:'회원탈퇴'}
                ]
            }
        },
        beforeCreate() {
            $s = this.$saleson;
            vm = this;
        },
        methods: {
            async handleSubmit(validate) {
                if (vm.secedeParam.leaveReason === '기타' && !vm.secedeParam.etcReason) {
                    $s.alert("기타 사유를 입력해주세요");
                    return false;
                }
                const isValid = await validate();
                if(isValid) {
                    vm.showAlertModal = !vm.showAlertModal;
                }
            },
            async submitForm() {
                if (vm.secedeParam.leaveReason === '기타') {
                    vm.secedeParam.leaveReason = vm.secedeParam.etcReason;
                }
               vm.secedeParam.loginId = vm.param.loginId
               vm.secedeParam.snsFlag = vm.isSns

                try {
                    const {data} = await this.$salesonApi().auth.secedeMember(vm.secedeParam);
                    if(data.status === 200) {
                        $s.alert("탈퇴 완료되었습니다.", () => {
                            $s.logout();
                        })
                    } else {
                        $s.alert("탈퇴 도중 오류가 발생하였습니다. 문의바랍니다.", () => {
                            $s.redirect('/mypage')
                        })
                    }
                } catch (e) {
                    $s.alert(e.message || e);
                }


            },
        },
    }
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/user/user.scss";
</style>