<template>
    <div class="payment-form-wrap">
        <ul class="dot-list">
            <li>우측 [결제하기]를 클릭하여 토스페이먼츠 계좌이체 화면에서 결제정보를 입력해주시길 바랍니다.</li>
            <li>대금 청구 시 가맹점 란에는 대상에프앤비㈜으로 기재됩니다.</li>
        </ul>
<!--        <form class="payment-form">
            <h3 class="form-title">에스크로</h3>
            <div class="mb-0 radio-wrap">
                <label class="input-radio"><input type="radio"><i></i>사용안함</label>
                <label class="input-radio"><input type="radio"><i></i>사용</label>
            </div>
        </form>-->
    </div>
</template>
<script>

let $s, vm;

export default {
    data() {
        return {
        };
    },
    props: {},
    watch: {},
    beforeCreate: function() {
        // 기존 Vue로 작성된 스크립트 실행시 적용
        $s = this.$saleson;
        vm = this;
    },
    mounted() {},
    methods: {
    }
}
</script>
