<template>
    <div class="modal image-pop">
        <div class="dimmed-bg"></div>
        <div class="image-wrap">
            <div class="pc">
                <div class="expansion-img">
                    <img src="~/assets/image/sample/no_content_720480.png" alt="미리보기">
                </div>
            </div>
            <ul class="image-list">
                <li class="image-item"><img src="~/assets/image/sample/no_content_720480.png" alt="" srcset=""
                        @click="getImageSrc($event)"></li>
                <li class="image-item"><img src="~/assets/image/sample/sample_01.png" alt="" srcset=""
                        @click="getImageSrc($event)"></li>
                <li class="image-item"><img src="~/assets/image/sample/sample_02.png" alt="" srcset=""
                        @click="getImageSrc($event)"></li>
                <li class="image-item"><img src="~/assets/image/sample/no_content.png" alt="" srcset=""
                        @click="getImageSrc($event)"></li>
            </ul>
            <button class="modal-close">닫기</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
        getImageSrc(event){
            let expansionImg = document.querySelector('.expansion-img img');
            let clikedImage = event.target.getAttribute('src');
            expansionImg.setAttribute('src', clikedImage);
        }
    },
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/pages/components/modal.scss";
</style>