<template>
    <div class="loading-wrap">
        <div class="dimmed-bg"></div>
        <div class="loader">
            <svg class="circular-loader" viewBox="25 25 50 50">
                <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#7f6dfc"></circle>
            </svg>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'loading',
    }
</script>
<style lang="scss">
@import '~/assets/scss/common.scss';
</style>