<template>
    <div class="user-page find-idpw">
        <h1 class="title-h1">비밀번호 변경하기</h1>
        <ValidationObserver ref="observer" v-slot="{ validate }">
        <form @submit.prevent="submit(validate)">
        <h3 class="form-title">기존 비밀번호</h3>
            <ValidationProvider tag="div" rules="required|password1|password2|password3" v-slot="{errors}">
        <div class="form-line" :class="{ 'invalid': errors.length }">
            <button type="button" class="show-password-btn" @click="showPasswordFn($event)"></button>
            <input type="password" v-model="param.originalPassword" class="form-basic" placeholder="기존 비밀번호" />
                <span class="feedback">{{ errors[0] }}</span>
        </div>
            </ValidationProvider>
        <h3 class="form-title">새 비밀번호</h3>
            <ValidationProvider tag="div" vid="password" rules="required|password1|password2|password3" v-slot="{errors}">
        <div class="form-line" :class="{ 'invalid': errors.length }">
            <button type="button" class="show-password-btn" @click="showPasswordFn($event)"></button>
            <input type="password" v-model="param.password" class="form-basic" placeholder="8~16자 이내 영문, 숫자, 특수문자"  />
                <span class="feedback">{{ errors[0] }}</span>
        </div>
            </ValidationProvider>
        <h3 class="form-title">새 비밀번호 재입력</h3>
            <ValidationProvider tag="div" vid="passwordConfirm" rules="required|confirmed:password" v-slot="{errors}">
        <div class="form-line" :class="{ 'invalid': errors.length }">
            <button type="button" class="show-password-btn" @click="showPasswordFn($event)"></button>
            <input type="password" v-model="param.confirmPassword" class="form-basic" placeholder="비밀번호를 다시 한번 입력하세요"  />
                <span class="feedback">{{ errors[0] }}</span>
        </div>
            </ValidationProvider>
        <div class="link-wrap">
            <button type="submit" class="btn btn-primary confirm-btn">변경</button>
        </div>
        </form>
        </ValidationObserver>
    </div>
</template>

<script>
let $s, vm;

import togglePassword from '~/mixinsJs/togglePwd.js';
export default {
    name: 'change-password',
    mixins: [togglePassword],
    data() {
        return {
            param : {
                originalPassword : "",
                password : "",
                confirmPassword : ""
            }
        }
    },
    head(){
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'비밀번호 변경하기'}
            ]
        }
    },
    beforeCreate () {
        $s = this.$saleson;
        vm = this;
    },
    methods: {

        async submit (validate) {

            const isValid = await validate();
            if(isValid) {
                if(vm.param.password !== vm.param.confirmPassword) {
                    $s.alert("비밀번호 확인이 일치하지 않습니다.");
                    return
                }
                $s.confirm('비밀번호를 변경 하시겠습니까?',  async () => {
                    try {
                        await this.$salesonApi().auth.changePassword(vm.param);
                        $s.alert('비밀번호 변경 완료 했습니다.', () => {
                            $s.logout($s.pages.LOGIN);
                        });
                    } catch(e) {
                        $s.alert(e.message || e);
                    }
                });
            }


        }
    },
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/user/user.scss";
</style>