<template>
    <div class="modal image-pop">
        <div class="dimmed-bg" @click="modalClose()"></div>
        <div class="image-wrap">
            <button type="button" class="modal-close" @click="modalClose()">닫기</button>
            <div class="pc">
                <div class="expansion-img">
                    <img :src="expandedImage" alt="미리보기">
                </div>
            </div>
            <ul class="image-list">
                <li class="image-item" v-for="(image, index) in imageItems" :key="`image-${index}`">
                    <img :src="getImageUrl(image)" :alt="`image-${index}`" @click="expandImage(image)">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import image1 from '~/assets/image/sample/sample_01.png'
import image2 from '~/assets/image/sample/no_content.png'
import image3 from '~/assets/image/sample/item_sample_02.png'
import image4 from '~/assets/image/sample/no_content_720480.png'

export default {
    data() {
        return {
            imageItems: [image1,image2,image3,image4],
            expandedImage: '',
        }
    },
    methods: {
        getImageUrl(image){
            return require(`~/assets/image/sample/${image}`);
        },
        expandImage(image) {
            this.expandedImage = this.getImageUrl(image);
        },
        modalClose(){
            this.$emit('modalClose')
        }
    },
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/components/modal.scss";
</style>
