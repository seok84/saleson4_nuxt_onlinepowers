<template>
    <div v-if="show">
        <div class="modal alert-modal modal-report" :class="{ 'show': !writeReportFlag }">
            <div class="dimmed-bg"></div>
            <div class="modal-wrap">
                <button class="modal-close" @click="close">닫기</button>
                <div class="modal-header">신고/차단</div>
                <div class="modal-body">
                    <div class="btn-wrap gap">
                        <button type="button" class="btn btn-primary" @click.prevent="writeReportFlag=true">{{reportLabel}}</button>
                        <button type="button" class="btn btn-default" @click.prevent="processBlock">{{blockLabel}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal modal-report detail" :class="{ 'show': writeReportFlag }"> <!--상세 start -->
            <div class="dimmed-bg"></div>
            <div class="modal-wrap">
                <button class="modal-close" @click="close">닫기</button>
                <div class="modal-header">신고/차단</div>
                <div class="modal-body">
                    <ValidationObserver ref="observer" v-slot="{ validate }">
                        <form @submit.prevent="submitReport(validate)">
                            <h3 class="form-title">신고사유</h3>
                            <div class="radio-wrap">
                                <label class="input-radio" v-for="(reasonType, index) in reasonTypes" :key="'reasonType-'+index">
                                    <input type="radio" name="reasonType"
                                           :value="reasonType.code" v-model="report.reportReasonType">
                                    <i></i>{{reasonType.title}}
                                </label>
                            </div>
                            <h3 class="form-title">신고 상세사유</h3>
                            <ValidationProvider tag="div" rules="required" v-slot="{errors}">
                                <div class="form-line" :class="{ 'invalid': errors.length }">
                                <textarea name="reasonContent" cols="30" rows="10" class="form-basic text-area" v-model="report.content"
                                          placeholder="신고하시는 상세이유를 입력해주세요 (최대 글자는 10,000자 입니다)">
                                </textarea>
                                    <span class="feedback">{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>

                            <div class="btn-wrap gap">
                                <button type="submit" class="btn btn-primary">저장</button>
                                <button type="button" class="btn btn-default"@click="close">취소</button>
                            </div>
                        </form>
                    </ValidationObserver>
                </div>
            </div>
        </div> <!--상세 end -->
    </div>

</template>

<script>

let $s, vm;
export default {

    props: {
        show: {
            type: Boolean,
            default: false
        },
        contentType: {
            type: String,
            default: ""
        },
        contentId: {
            type: Number,
            default: 0
        },
        blockFlag: {
            type: Boolean,
            default: false
        }
    },
    beforeCreate() {

    },
    fetch: function () {
        this.isLogin = this.$saleson.isLogin();
    },
    fetchOnServer: false,
    data:() => {
        return {
            contentTypes:[],
            reasonTypes:[],
            writeReportFlag:false,
            reportLabel: '',
            blockLabel:'',
            report:{
                reportContentType:'',
                reportReasonType:'',
                contentId: 0,
                content:'',
            },
            block: {
                reportContentType:'',
                contentId: 0
            }
        }
    },
    mounted() {
        this.init();
    },
    updated() {
        this.reportLabel = this.getReportLabel(this.contentType);
        this.blockLabel = this.getBlockLabel(this.blockFlag)
    },
    methods:{
        getReportLabel(reportContentType = '') {

            switch (reportContentType) {
                case 'REVIEW':
                case 'EXPERIENCE_TEAM_REVIEW':
                    return '후기 신고';
                case 'QNA':
                    return '문의 신고';
                case 'EXPERIENCE_TEAM_APPLY':
                    return '체험단 신고';
                default:
                    return '댓글 신고';
            }
        },
        getBlockLabel(blockFlag = false) {
            return blockFlag ? '회원 차단 해제' : '회원 차단';
        },
        async init() {
            try {
                const response = await this.$salesonApi().report.getInit();
                const data = response.data;

                this.contentTypes = data.contentTypes;
                this.reasonTypes = data.reasonTypes;
            } catch (e) {}
        },
        resetReport() {
            this.writeReportFlag = false;
            this.report.reportContentType = ''
            this.report.reportReasonType = ''
            this.report.content = ''
            this.report.contentId = 0
        },
        close() {
            this.resetReport();
            this.$emit('close');
        },
        async submitReport(validate) {

            const isValid = await validate();

            try {
                if (!this.$saleson.isLogin()) {
                    this.$saleson.alert('로그인이 필요 합니다.');
                    return;
                }

                this.report.reportContentType = this.contentType;
                this.report.contentId = this.contentId;

               // const isValid = await this.$validator.validateAll();
                const contentLength = 1000;
                const content = this.report.content;

                let selectedType = this.report.reportReasonType;
                if (selectedType === null || selectedType === '') {
                    this.$saleson.alert('신고사유를 선택하세요.', () => {
                        return false;
                    });
                }

                if (!isValid) {

                  /*  let message = '필수값 입력이 필요 합니다.'
                    try {
                        const length = this.errors.items.length;
                        message = this.errors.items[length -1].msg;
                    } catch (e) {
                        message = '필수값 입력이 필요 합니다.'
                    }

                    this.$saleson.alert(message);
                    return;*/
                    return false;
                }

                if (content.length > contentLength) {

                    this.$saleson.alert(contentLength+'자만 입력이 가능합니다.');
                    this.report.content = content.slice(0, contentLength);
                    return;
                }

                try {
                    const response = await this.$salesonApi().report.writeReport(this.report);
                    if (response.data.status === 'OK') {
                        this.$saleson.alert('신고되었습니다');
                    }
                } catch (e) {
                    this.$saleson.alert(this.getErrorMessage(e));
                }
                this.close();
            } catch (err) {
                this.$saleson.alert('신고처리시 오류가 발생 했습니다.');
            }
        },
        async processBlock() {
            try {
                if (!this.$saleson.isLogin()) {
                    this.$saleson.alert('로그인이 필요 합니다.');
                    return;
                }

                this.block.reportContentType = this.contentType;
                this.block.contentId = this.contentId;

                try {

                    if (this.blockFlag) {
                        const response = await this.$salesonApi().report.unblock(this.block);
                        this.$emit('reload');
                    } else {
                        this.$saleson.confirm(
                            '이 회원을 차단할까요?\n차단 후 이 회원이 작성한 모든 댓글이\n고객님에게 보이지 않으며,\n이후 해제할 수 있습니다',
                            () => {
                                this.blockUser();
                            }
                        );
                    }


                } catch (e) {
                    this.$saleson.alert(this.getErrorMessage(e));
                }
                this.close();
            } catch (err) {
                this.$saleson.alert('회원 차단/해제 처리시 오류가 발생 했습니다.');
            }
        },

        async blockUser() {
            try {
                const response = await this.$salesonApi().report.block(this.block);
                this.$emit('reload');

            } catch (e) {
                this.$saleson.alert(this.getErrorMessage(e));
            }

        },
        getErrorMessage(error) {
            if (typeof error === 'string') return error;
            else {
                if (error.response !== undefined && error.response.data !== undefined) {
                    return error.response.data.message
                } else if (error.message !== undefined) {
                    return error.message
                } else {
                    return 'Error';
                }
            }
        },
    },


}
</script>

<style lang="scss">
@import '~/assets/scss/pages/featured/featured.scss';
</style>