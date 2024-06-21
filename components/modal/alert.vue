<template>
    <div id="op-alert" class="modal alert-modal" :class="{ 'show': isShow }">
        <div class="dimmed-bg"></div>
        <div class="modal-wrap">
            <div class="modal-header">
                알림
            </div>
            <div class="modal-body p-2">
                <div class="modal-content" v-html="message">
                </div>
                <div class="btn-wrap gap">
                    <button type="button" class="btn btn-default" v-if="alertType === 'CONFIRM'"
                        @click="cancel()">취소</button>
                    <button type="button" class="btn btn-primary" @click="confirm()">확인</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShow: false,
            message: '',
            showClass: '',
            alertType: 'ALERT',
            callback: null,
            cancelCallback: null,
            showCloseButton: true
        }
    },
    computed: {
        isConfirmModal() {
            return this.alertType === 'CONFIRM';
        }
    },
    created() {
        this.$nuxt.$on('showAlert', (options) => {
            this.message = options.message;
            this.callback = options.callback;
            this.cancelCallback = options.cancelCallback;
            this.alertType = options.alertType;
            this.showCloseButton = options.showCloseButton;
            this.isShow = true;

            this.openModal();
        });

        this.$nuxt.$on('hideAlert', (msg) => {
            this.closeModal();
        })
    },
    mounted() {

    },
    methods: {
        openModal() {
            if (this.$refs.confirm) {
                this.$refs.confirm.focus();
            }
        },
        closeModal() {
            this.message = '';
            this.showClass = '';
            this.isShow = false;
        },
        confirm() {
            if (this.callback != null) {
                this.callback();
            }

            this.closeModal();
        },
        cancel() {
            if (this.cancelCallback != null) {
                this.cancelCallback();
            }

            this.closeModal();
        }
    }

}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/components/modal.scss";
</style>