<template>
    <div class="modal image-pop" :class="showFlag?'show':''" >
        <div class="dimmed-bg" @click="modalClose()"></div>
        <div class="image-wrap">
            <button type="button" class="modal-close" @click="modalClose()">닫기</button>
            <div class="pc">
                <div class="expansion-img">
                    <img :src="expandedImage" :alt="expandedImage" @error="errorImage">
                </div>
            </div>
            <ul class="image-list">
                <li class="image-item" v-for="(image, index) in photoImage" :key="`image-${index}`">
                    <img :src="itemImage(image)" :alt="`image-${index}`" @click="expandImage(image)" @error="errorImage">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showFlag: {
            type: Boolean,
            default: false
        },
        imageList: {
            type: Array
        },
    },
    data() {
        return {
            photoImage: [],
            expandedImage: ''
        }
    },
    watch: {
        imageList(list) {
            this.photoImage = list;
            this.expandedImage = list.length > 0 ? this.itemImage(list[0]) : '';
        }
    },
    methods: {
        modalClose() {
            this.$emit('close')
        },
        expandImage(image) {
            this.expandedImage = this.itemImage(image);
        },
    },
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/components/modal.scss";
</style>
