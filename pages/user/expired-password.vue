<template>
    <div class="user-page find-idpw">
        <h1 class="title-h1">90일 경과 비밀번호 변경하기</h1>
        <p class="user-page-info">
            개인정보 보호를 위해, 비밀번호 변경 후<br />
            90일이 지난 후에는 비밀번호 재설정을 권장합니다.<br />
            <em>[연장하기]</em> 버튼을 누르시면 기존 비밀번호로 유지됩니다
        </p>
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
                <div class="link-wrap btn-wrap gap">
                    <button type="submit" class="btn btn-primary link-item">변경</button>
                    <button type="button" @click="delayChangePassword" class="btn btn-default link-item">연장</button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>
<script>
let $s, vm;

import { showPasswordFn } from "~/assets/common.js";
import togglePassword from '~/mixinsJs/togglePwd.js';

export default {
    name: 'expired-password',
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
                {hid: 'pageTitle', name:'pageTitle', content:'90일 경과 비밀번호 변경하기'}
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
                        const {data} = await this.$salesonApi().auth.changePassword(vm.param);
                        if(data.status === 200) {
                            $s.alert('비밀번호 변경 완료 했습니다.', () => {
                                $s.logout($s.pages.LOGIN);
                            });
                        }
                    } catch(e) {
                        $s.alert(e.message || e);
                    }
                });
            }


        },
        delayChangePassword () {

            $s.confirm('비밀번호를 만료일을 연장 하시겠습니까?', async () => {
                try{
                    await this.$salesonApi().auth.delayChangePassword();

                    $s.alert('비밀번호를 만료일을 연장 했습니다.',  () => {
                        $s.redirect("/");
                    });
                } catch (e) {
                    $s.alert('비밀번호 만료일 연장에 실패 했습니다');
                }
            });

        }
    },
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/common.scss";
@import "~/assets/scss/pages/user/user.scss";
</style>