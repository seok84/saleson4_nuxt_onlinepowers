<template>
    <div id="op-toast" class="toast-wrap" :class="toastShow ? 'show' : ''">
        <div class="toast" ref="toastModal">
            <p class="desc">{{ message }}</p>
            <button class="modal-close" @click="hideToast"></button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            toastShow: false,
            message:''
        }
    },
    created() {
        this.$nuxt.$on("showToast", (message = "") => {
            this.message = message;
            this.toastShow = true;
            setTimeout(() => this.toastShow = false, 1000);
        });
    },
    methods: {
        hideToast() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.toastShow = false;
                }, 1000);
            });
        }
    },
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/components/modal.scss";
</style>