<template>
    <div class="user-page find-idpw">
        <h1 class="title-h1">비밀번호 찾기</h1>
        <img src="~/assets/image/common/img_find_pw.png" alt="비밀번호 찾기" class="find-img">
        <p class="sub-title">임시 비밀번호가 발송 되었습니다.</p>
        <div class="link-wrap">
            <a href="/user/login" class="btn btn-primary link-item w-half">로그인</a>
        </div>
    </div>
</template>
<script>

export default {
    name: 'find-password-complete',
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
    head() {
        return {
            meta: [
                {hid: 'pageTitle', name: 'pageTitle', content: '비밀번호 찾기'}
            ],
            seo: this.seo
        }
    },
}

</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/user/user.scss";
</style>