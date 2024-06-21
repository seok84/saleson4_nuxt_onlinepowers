<template>
    <div class="content-inner">
        <section class="result-container">
            <div v-if="typeof result.content != 'undefined' && result.content != null &&  result.content.length > 0">
                <h1 class="title-h1">'<em>{{decodeURIComponent(param.query)}}</em>' 검색결과</h1>

                <item-list-head
                    :totalElements="result.pagination.totalElements"
                    :orderBy="param.orderBy"
                    :sort="param.sort"
                    @change="sorting"
                />

                <item-list :content="result.content"/>
                <ui-pagination :current-page="result.pagination.currentPage" :total-pages="result.pagination.totalPages"
                               @change="paging"/>

            </div>

            <div v-else>
                <div class="no-result-content">
                    <h1 class="title-h1">'<em>{{decodeURIComponent(param.query)}}</em>' 검색결과</h1>
                    <img src="/static/images/img_noResult.png" alt="검색 결과가 없습니다." class="result-img">
                    <p class="result-text">검색 결과가 없습니다.</p>
                    <span class="result-info">단어의 철자가 정확한지 확인해 보세요.<br/>띄어쓰기 또는 넓은 의미의 단어를 사용해 보세요:D</span>
                    <a href="/" class="btn btn-round btn-primary-line confirm-btn">메인으로</a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

export default {
    watchQuery: true,
    async asyncData({$salesonApi, $seo, $axios, params, error, route, query}) {

        try {

            const query = route.query;
            const param = {
                orderBy: query.orderBy ?? '',
                sort: query.sort ?? 'ASC',
                page: query.page ?? 1,
                query: query.query,
                itemsPerPage: 24,
                arrayRequiredItems: []
            }

            const [seo, response] = await Promise.all(
                [
                    $seo(route.path, $axios),
                    $salesonApi().search.getResult(param)
                ]);

            let dataSet = {
                result: response.data,
                param: param,
                seo: seo,
            }

            return dataSet;
        } catch (e) {
            console.log(e)
            error({statusCode: 404, message: 'Page Not Found'})
        }
    },
    data() {
        return {
            param: {
                page: 1,
                itemsPerPage: 20,
                listType: 'a',
                orderBy: 'ORDERING',
                sort: 'ASC',
                query: '',
                arrayRequiredItems: []
            },
            result: {
                content: null,
                pagination: null
            }
        }
    },
    mounted() {
/*        this.$nextTick(function () {

            this.getHistory("paging", "search");

            this.param.query = this.$saleson.core.getParameter('query');
            console.log(this.$saleson.core.getParameter('query'));
            this.submit();
        });*/
    },
    methods: {
        async submit() {

            try {
                const { data } = await this.$salesonApi().search.getResult(this.param);

                if (data != null) {
                    this.result.content = data.content;
                    this.result.pagination = data.pagination;
                } else {
                    this.result.content = null;
                    this.result.pagination = null;
                }

            } catch (e) {
                console.error('[result] 검색: ', e);
            }
        },

        paging(page) {
            this.param.page = page;
            this.$router.push({path: this.$route.fullPath, query: this.param});
        },

        sorting(orderBy, sort) {
            this.param.orderBy = orderBy;
            this.param.sort = sort;
            this.param.page = 1;

            this.$router.push({path: this.$route.fullPath, query: this.param});
        },

        redirectByItem(item) {
            this.viewDetails('/item/' + item.itemUserCode, 'paging', 'search');
        }
    },

}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/guide.scss";
@import "~/assets/scss/pages/search/search.scss";
@import "~/assets/scss/pages/items/item_list.scss";
</style>