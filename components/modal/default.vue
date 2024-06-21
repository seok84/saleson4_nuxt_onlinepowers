<template>
    <div class="modal">
        <div class="dimmed-bg" @click="unfixedModal()"></div>
        <div class="modal-wrap">
            <button class="modal-close" @click="unfixedModal()">닫기</button>
            <div class="modal-header">
                {{ title }}
            </div>
            <div  :class="['modal-body', bodyClass]">
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        title:'',
        bodyClass: {
            type: String,
            default: ''
        }
    },
    methods: {
        unfixedModal() {
            this.$emit('modalClose')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/components/modal.scss";
</style>