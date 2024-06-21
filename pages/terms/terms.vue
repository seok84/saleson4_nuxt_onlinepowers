<template>
    <section class="terms">
        <div class="title-h1">이용약관</div>
        <termsTab></termsTab>
        <div class="container">
            <div class="select-wrap">
                <form>
                    <select class="input-select" @change="setTermsContent" v-model="selectedPolicyContent">
                        <option v-for="(policy, index) in policies" :key="index" :value="policy.content" >
                            {{ policy.title }}
                        </option>
                    </select>
                </form>
            </div>
            <div v-html="termsContent"></div>
        </div>
    </section>
</template>
<script>
    export default {
        name:'terms-terms',
        async asyncData({$salesonApi}) {
            try {
                const {data} = await $salesonApi().policy.getPolicy('POLICY_TYPE_AGREEMENT');

                return {
                    policies : data.policies
                }

            } catch (e) {
                console.log(e.message || e);
            }

        },
        head(){
            return {
                meta: [
                    {hid: 'pageTitle', name:'pageTitle', content:'이용약관'}
                ],

            }
        },
        data() {
            return {
                termsContent:'관리자단에서 입력한 내용이 노출되는 영역입니다.',
                selectedPolicyContent: "",
                policies : [],

            }
        },
        mounted() {
            this.$nextTick( ()=> {
                this.selectedPolicyContent = this.policies[0].content;
                this.termsContent = this.policies[0].content;
            })
        },
        methods : {
            setTermsContent(event) {
                this.termsContent = event.target.value;
            }

        },
    }
</script>
<style lang="scss">
@import '~/assets/scss/pages/terms/terms_main.scss';
</style>