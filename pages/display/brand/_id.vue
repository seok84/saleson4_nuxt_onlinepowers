<template>
    <div class="item-list-page display-page display-brand">
        <h1 class="title-h1">브랜드명</h1>
        <!-- btn-display-tab-more 클릭 시 더보기 활성화 -> display-tab-wrap.on  -->
        <!-- 탭메뉴 개수가 적으면 less 클래스 붙여야함 -> display-tab-wrap.less (더보기 버튼 없어짐)  -->
        <div class="display-tab-wrap on">
            <ul class="display-tab">
                <li class="on">브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
                <li>브랜드 이름</li>
            </ul>
            <div class="btn-display-tab-more"><i></i></div>
        </div>
        <div class="filter-wrap">
            <p>총 <b>123</b>개 상품</p>
            <div class="select-wrap">
                <select class="input-select">
                    <option value="">인기순</option>
                    <option value="">추천순</option>
                    <option value="">최신순</option>
                    <option value="">높은가격순</option>
                    <option value="">낮은가격순</option>
                    <option value="">옵션</option>
                </select>
            </div>
        </div>
        <item-list />
    </div>
</template>

<script>
export default {
    data() {
        return {
            isVisible: false,
        }
    },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/items/item_list.scss";
@import "~/assets/scss/pages/display/display.scss";
</style>