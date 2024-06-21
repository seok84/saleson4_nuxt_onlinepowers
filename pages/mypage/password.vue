<template>
    <section class="mypage-password">
        <div class="title-container">
            <h2 class="title-h2">비밀번호 변경</h2>
        </div>
        <ValidationObserver ref="observer" v-slot="{ validate }">
        <form action="" @submit.prevent="changePassword(validate)">
            <div class="user-page find-idpw">
                <h3 class="form-title">현재 비밀번호</h3>
                <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                    <div class="form-line" :class="{ 'invalid': errors.length }">
                    <button type="button" class="show-password-btn" @click="showPasswordFn($event)"></button>
                    <input type="password" class="form-basic" v-model="param.originalPassword" placeholder="사용중인 비밀번호" />
                        <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <h3 class="form-title">변경할 비밀번호</h3>
                <ValidationProvider tag="div" rules="required|password1|password2|password3" vid="password" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <button type="button" class="show-password-btn" @click="showPasswordFn($event)"></button>
                    <input type="password" class="form-basic" v-model="param.password" placeholder="변경할 비밀번호"  />
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <h3 class="form-title">변경할 비밀번호 재입력</h3>
                <ValidationProvider tag="div" rules="required|confirmed:password" vid="passwordConfirm" v-slot="{errors}">
                <div class="form-line" :class="{ 'invalid': errors.length }">
                    <button type="button" class="show-password-btn" @click="showPasswordFn($event)"></button>
                    <input type="password" class="form-basic" v-model="param.confirmPassword" placeholder="변경할 비밀번호 재입력" />
                    <span class="feedback">{{ errors[0] }}</span>
                </div>
                </ValidationProvider>
                <div class="link-wrap">
                    <button type="submit" class="btn btn-primary confirm-btn">확인</button>
                </div>
            </div>
        </form>
        </ValidationObserver>
    </section>
</template>
<script>
let $s, vm;
import togglePassword from '~/mixinsJs/togglePwd.js';

export default {
    layout: 'mypage',
    name: 'mypage-password',
    mixins: [togglePassword],

    data() {
        return {
            param : {
                originalPassword : "",
                password : "",
                confirmPassword: ""
            }
        }
    },
    head(){
        return {
            meta: [
                {hid: 'pageTitle', name:'pageTitle', content:'비밀번호 변경'}
            ]
        }
    },
    beforeCreate() {
        $s = this.$saleson;
        vm = this;
    },

    methods: {
        async changePassword(validate) {
            const isValid = await validate();
            if(isValid) {
                if (vm.param.password !== vm.param.confirmPassword) {
                    $s.alert("비밀번호를 입력해주세요.");

                    return false;
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
        }
    },
}
</script>
<style lang="scss">
@import "~/assets/scss/pages/mypage/mypage_myinfo.scss";
</style>