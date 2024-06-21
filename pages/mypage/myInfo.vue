<template>
    <section class="mypage-myInfo">
        <div class="title-container">
            <h2 class="title-h2">내 정보 관리</h2>
        </div>
        <div class="intro user-page"  v-show="!passwordChecked">
            <img src="~/assets/image/common/img_find_pw.png" alt="내 정보 관리" class="content-img">
            <p class="content-info">개인정보를 안전하게 보호하기 위해<br class="mobile"> 비밀번호를 다시 한번 입력해 주세요.</p>
            <ValidationObserver ref="observer" v-slot="{ validate }">
            <form action="" @submit.prevent="checkPassword(validate)">
                <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <button type="button" class="show-password-btn" @click="showPasswordFn($event)"></button>
                    <input type="password" class="form-basic" v-model="passwordConfirm" placeholder="비밀번호" />
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <button type="submit" class="btn btn-primary confirm-btn">확인</button>
            </form>
            </ValidationObserver>
        </div>
        <div class="content" v-show="passwordChecked">
            <ValidationObserver ref="observer" v-slot="{ validate }">
            <form action="" @submit.prevent="submit(validate)">
                <!-- 기본정보 -->
                <div class="toggle-title active">
                    <h2>기본정보<span><em>*</em>표시는 필수 입력사항입니다</span></h2>
                    <button class="toggle-arr"></button>
                </div>
                <div class="toggle-content user-page">
                    <!-- //아이디 -->
                    <h3 class="form-title accent">아이디</h3>
                    <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                    <div class="form-line" :class="{ 'invalid': errors.length }">
                        <input type="text" class="form-basic" placeholder="6자~12자 이내 영문, 숫자" v-model="param.loginId" readonly />
                        <span class="feedback">{{ errors[0] }}</span>
                    </div>
                    </ValidationProvider>
                    <!-- //이름 -->
                    <h3 class="form-title  accent">이름</h3>
                    <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                        <div class="form-line" :class="{ 'invalid': errors.length }">
                            <input type="text" class="form-basic" v-model="param.userName"  readonly placeholder="이름" />
                            <span class="feedback">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>
                    <!-- //휴대폰번호 -->
                    <h3 class="form-title  accent">휴대폰번호</h3>
                    <ValidationProvider tag="div" rules="required|numeric|max:11" v-slot="{errors}">
                        <div class="form-line" :class="{ 'invalid': errors.length }">
                            <input type="tel" class="form-basic" v-model="param.phoneNumber" readonly placeholder="'-'제외 번호 입력" />
                            <span class="feedback">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>
                    <!-- //전화번호 -->
                    <h3 class="form-title  accent">전화번호</h3>
                    <ValidationProvider tag="div" rules="numeric|max:11" v-slot="{errors}">
                        <div class="form-line">
                            <input type="text" class="form-basic" v-model="param.telNumber" placeholder="'-'제외 번호 입력" />
                        </div>
                    </ValidationProvider>
                    <!-- //이메일 -->
                    <h3 class="form-title  accent">이메일</h3>
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
                    <h3 class="form-title ">성별</h3>
                    <div class="radio-wrap">
                        <label class="input-radio"><input type="radio" v-model="param.gender" value=" " name="gender" checked><i></i>미선택</label>
                        <label class="input-radio"><input type="radio" v-model="param.gender" value="F" name="gender"><i></i>여성</label>
                        <label class="input-radio"><input type="radio" v-model="param.gender" value="M" name="gender"><i></i>남성</label>
                    </div>
                    <!-- //주소 -->
                    <h3 class="form-title accent">주소</h3>
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
                    <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                        <div class="form-line"  :class="{ 'invalid': errors.length }">
                            <input type="text" class="form-basic" v-model="param.addressDetail" placeholder="상세주소" />
                            <span class="feedback">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>
                </div>

                <!-- //수신동의 -->
                <div class="toggle-title active m-border-top">
                    <h2>수신동의</h2>
                    <button type="button" class="toggle-arr"></button>
                </div>
                <div class="toggle-content user-page accept-content">
                    <div class="wrap">
                        <h4>문자메시지 수신동의</h4>
                        <ul class="dot-list large-dot">
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
                        <ul class="dot-list large-dot">
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
                    <div class="wrap mobile">
                        <!-- // mobile -->
                        <h4>앱 푸쉬 수신동의</h4>
                        <ul class="dot-list">
                            <li>다양한 특가상품과 개인 맞춤 이벤트 정보를 가장 빠르게 받아볼 수 있습니다.</li>
                        </ul>
                        <div class="radio-wrap">
                            <label class="input-radio"><input type="radio" name="appPush" checked><i></i>수신동의</label>
                            <label class="input-radio"><input type="radio" name="appPush"><i></i>동의안함</label>
                        </div>
                    </div>
                </div>
                <div class="link-wrap">
                    <button type="submit" class="btn btn-primary link-item w-half">저장</button>
                    <nuxt-link to="/user/secede" class="btn btn-default link-item w-half">회원탈퇴</nuxt-link>
                </div>
            </form>
            </ValidationObserver>
            <br>
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
    </section>
</template>
<script>
let $s, vm;
import AddressLayer from "@/components/ui/daum/address-layer.vue";
import togglePassword from '~/mixinsJs/togglePwd.js';


export default {
    components: {AddressLayer},

    layout: 'mypage',
    name: 'mypage-myInfo',
    mixins: [togglePassword],
    async asyncData({$salesonApi}) {
        try {
            const {data} = await $salesonApi().auth.getMember();
            return {
                param: data
            }
        } catch (e) {
            console.log(e)
        }

    },
    data() {
      return {
          passwordConfirm : "",
          passwordChecked : false,
          isSns : false,
          param: {
              userName: "",
              email: "",
              phoneNumber: "",
              telNumber: "",
              gender: "F",
              birthdayYear: "",
              birthdayMonth: "1",
              birthdayDay: "1",
              birthdayType: "1",
              post: "",
              newPost: "",
              address: "",
              addressDetail: "",
              addressInfo: "",
              receiveSms: "Y",
              receiveEmail: "Y",
              years: 0
          },
          modalInfo: {
              modalShow: false,
              modalText: '',
              modalTitle: ''
          },
      }
    },
    head(){
        return {
            meta: [
                 {hid: 'pageTitle', name:'pageTitle', content:'내 정보 관리'}
            ]
        }
    },
    beforeCreate() {
        $s = this.$saleson;
        vm = this;
    },
    mounted() {
        vm.isSnsJoinedUser();
        vm.$nextTick(() => {

            let date = new Date();
            vm.param.years = date.getFullYear();

        });

    },
    methods: {
        async isSnsJoinedUser() {
            try{
                const {data} = await this.$salesonApi().auth.isSnsJoinedUser();
                vm.isSns = data;
                if(vm.isSns) {
                    vm.passwordChecked = true;
                }
            }catch (e) {
                $s.alert(e.message || e);
            }

        },
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
        async checkPassword(validate) {
            const isValid = await validate();

            let param = {
                password : vm.passwordConfirm
            }
            if (isValid) {
                try {
                    const {data} = await this.$salesonApi().auth.checkPassword(param);
                    if(data.status === 200){
                        vm.passwordChecked = true;
                    }
                } catch (e) {
                    $s.alert(e.message || e);
                }

            }

        },

        async submit(validate) {
            const isValid = await validate();

            if (!vm.param.newPost || !vm.param.address || !vm.param.addressDetail
                ) {
                $s.alert("주소를 입력해주세요.");
                return false;
            }
            if (!vm.param.birthdayYear ||!vm.param.birthdayMonth
                || !vm.param.birthdayDay) {
                $s.alert("생일을 입력해주세요.");
                return false;
            }
            if(isValid) {
                $s.confirm("수정하시겠습니까?" , async () => {
                    try{
                        const {data} = await this.$salesonApi().auth.updateMember(vm.param);
                        if (data.status === 200) {
                            $s.alert("수정되었습니다.", () => {
                                $s.redirect('/mypage/myInfo');
                            })
                        }
                    } catch (e) {
                        $s.alert(e.message || e);
                    }

                })

            }
        },
        padNumber(num) {
            return num < 10 ? '0' + num : num;
        }


    },
}
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_myinfo.scss";
</style>