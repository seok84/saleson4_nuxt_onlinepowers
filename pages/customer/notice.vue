<template>
  <section class="customer customer-notice">
    <div class="title-h1">고객센터</div>
    <customer-tab/>
    <ul class="board">
      <li class="list"
          v-for="(list, index) in result.content" :key="`list${index}`"
          :class="{ open: selectedIndex === index }"
          @click="toggleOpen(index)" >
        <div class="flex space-between">
          <p class="title-wrap">
            <span v-if="list.noticeFlag" class="label">공지</span>
            <strong class="title">{{ list.subject }}</strong>
          </p>
          <span class="date">{{ list.createdDate }}</span>
        </div>
        <a v-if="list.link !== ''" class="notice-link"
           :href="list.link" :target="{_blank:'Y'=== list.targetOption}" :rel="{nofollow:'Y'=== list.relOption}"
        >
          <img src="~/assets/image/ico/ico_rink.svg" alt="링크">{{list.link}}
        </a>
        <div class="content" v-html="list.content"></div>
      </li>
    </ul>

    <ui-pagination :current-page="result.pagination.currentPage" :total-pages="result.pagination.totalPages" @change="paging"/>
  </section>
</template>

<script>
export default {
  watchQuery:true,
  async asyncData({$salesonApi, $seo, $axios, error, route, query}) {

    try {

      const params = {
        page: query.page ?? 1,
        size: 10
      }

      const [seo, response] = await Promise.all(
          [
            $seo(route.path, $axios),
            $salesonApi().notice.getNotices(params)
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
        size: 10,
      },
      result: {
        content: [],
        pagination: {
          currentPage: 1,
          first: true,
          last: true,
          size: 10,
          totalElements: 1,
          totalPages: 1
        }
      },
      selectedIndex: null
    }
  },
  methods: {
    toggleOpen(index) {
      if (this.selectedIndex === index) {
        this.selectedIndex = null; // 이미 선택된 항목을 다시 클릭하면 open 클래스를 제거합니다.
      } else {
        this.selectedIndex = index; // 선택한 항목의 인덱스를 저장합니다.
      }
    },
    paging(page) {
      const query = {
            page: page,
            orderBy: this.param.orderBy,
            sort: this.param.sort,
        }

        this.$router.push({path: this.$route.fullPath, query: query});
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/pages/customer/customer_main.scss';
</style>