<template>
    <div class="payment-form-wrap">
        <ul class="dot-list">
            <li>무통장 입금시 발생하는 수수료는 손님 부담입니다.</li>
            <li>인터넷 뱅킹 또는 은행창구 입금시 의뢰인(송금인)명은 ‘입금인 입력’ 란에 입금하신 성함과 동일하게 기재해 주시기 바랍니다. <br>
                ( 만약 다를 경우 고객센터 1234-5678로 꼭 연락주시기 바랍니다.)</li>
            <li>무통장 입금시 입금자와 입금 예정일을 입력해주세요.</li>
            <li>현금영수증 미신청시 현금영수증 발급이 되지 않습니다.</li>
        </ul>
        <div class="payment-form">
            <h3 class="form-title">입금은행</h3>
            <ValidationProvider tag="div" name="bankVirtualNo" rules="required" v-slot="{ errors }" >
                <div class="select-wrap">
                    <select class="input-select" name="bankVirtualNo" v-model="buy.buyPayments[payType].bankVirtualNo">
                        <option disabled value="">은행을 선택하세요</option>
                        <option v-for="(list,index) in buy.buyPayments[payType].accountNumbers">
                            {{list.bankName + ' 계좌번호: ' + list.accountNumber +'(' + list.accountHolder + ')'}}
                        </option>
                    </select>
                </div>
                <span v-if="errors.length" class="feedback invalid">{{ errors[0] }}</span>
            </ValidationProvider>


            <h3 class="form-title">입금자명</h3>
            <ValidationProvider tag="div" name="bankInName" rules="required" v-slot="{ errors }" >
                <div class="form-line">
                    <input type="text" class="form-basic" placeholder="입금자명" name="bankInName" v-model="buy.buyPayments[payType].bankInName">
                </div>
                <span v-if="errors.length" class="feedback invalid">{{ errors[0] }}</span>
            </ValidationProvider>

            <h3 class="form-title">입금예정일</h3>
            <ValidationProvider tag="div" name="bankExpirationDate" rules="required" v-slot="{ errors }" >
                <div class="select-wrap">
                    <select class="input-select" name="bankExpirationDate" v-model="buy.buyPayments[payType].bankExpirationDate">>
                        <option disabled value="">선택</option>
                        <option :value="date" v-for="date in buy.buyPayments[payType].expirationDates">{{dateFormat(date, 'date')}}</option>
                    </select>
                </div>
                <span v-if="errors.length" class="feedback invalid">{{ errors[0] }}</span>
            </ValidationProvider>
            <!--
            <h3 class="form-title">현금영수증 신청</h3>
            <div class="radio-wrap">
                <label class="input-radio"><input type="radio"><i></i>신청안함</label>
                <label class="input-radio"><input type="radio"><i></i>개인 소득공제용</label>
                <label class="input-radio"><input type="radio"><i></i>사업자 증빙용</label>
            </div>
            <div class="form-line">
                <input type="text" class="form-basic" placeholder="휴대전화 또는 사업자등록번호 숫자만 입력" />
                &lt;!&ndash; <span class="feedback">유효성 메시지</span> &ndash;&gt;
            </div>
            -->
        </div>
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
