<template>
    <div class="item-list-page display-page">
        <h1 class="title-h1">신상품</h1>
        <div class="display-ad pc">
            <img src="~/assets/image/item/new_banner_top.png" alt="banner-pc">
        </div>
        <div class="display-ad mobile">
            <img src="~/assets/image/item/new_banner_top_mo.png" alt="banner-mobile">
        </div>
        <item-list-head
            :totalElements="result.pagination.totalElements"
            :orderBy="param.orderBy"
            :sort="param.sort"
            @change="sorting"
        />

        <template v-if="typeof result.content != 'undefined' && result.content != null &&  result.content.length > 0">
            <item-list :content="result.content"/>
            <ui-pagination :current-page="result.pagination.currentPage" :total-pages="result.pagination.totalPages"
                           @change="paging"/>
        </template>
        <div v-else class="no-contents">
            <p>상품이 없습니다.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'new-item',
    watchQuery: true,
    async asyncData({$salesonApi, $seo, $axios, error, route, query}) {

        try {

            const params = {
                orderBy: query.orderBy ?? '',  //  'ORDERING'
                sort: query.sort ?? 'ASC',
                page: query.page ?? 1,
                size: 24
            }

            const [seo, response] = await Promise.all(
                [
                    $seo(route.path, $axios),
                    $salesonApi().display.getNewItems(params)
                ]);

            return {
                result: response.data,
                param: params,
                seo: seo
            }

        } catch (e) {
            console.log(e)
            error({statusCode: 404, message: 'Page Not Found'})
        }

    },
    head() {
        return this.seo;
    },
    data() {
        return {
            param: {
                orderBy: '',
                sort: '',
                page: 1,
                size: 24,
            },
            result: {
                content: [],
                pagination: {
                    currentPage: 1,
                    first: true,
                    last: true,
                    size: 24,
                    totalElements: 1,
                    totalPages: 1
                }
            }
        }
    },
    methods: {
        paging(page) {

            const query = {
                page: page,
                orderBy: this.param.orderBy,
                sort: this.param.sort,
            }

            this.$router.push({path: this.$route.fullPath, query: query});
        },
        sorting(orderBy, sort) {
            this.param.orderBy = orderBy;
            this.param.sort = sort;
            this.paging(1);
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/items/item_list.scss";
@import "~/assets/scss/pages/display/display.scss";
</style>