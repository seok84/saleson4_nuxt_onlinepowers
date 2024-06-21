<template>
  <section class="customer customer-faq">
    <div class="title-h1">고객센터</div>
    <customerTab></customerTab>
    <div class="container">
      <div class="sort-wrap"><span class="all-items">전체 <strong>{{formatNumber(result.pagination.totalElements)}}</strong>개</span></div>
      <div class="select-wrap">

          <div class="flex">
            <select class="input-select" v-model="param.faqType">
              <option value="">문의 유형을 선택하세요</option>
              <option v-for="type in result.types" :value="type.id" >{{type.label}}</option>
            </select>
            <button class="btn btn-form" @click="paging(1)">조회</button>
          </div>
      </div>
      <ul class="board" v-if="result.content.length > 0">
        <li class="list" :class="{ open: selectedIndex === index }" v-for="(list, index) in result.content"
            :key="`list${index}`" @click="toggleOpen(index)">

          <div class="title-wrap">
            <span class="category">[{{ list.label }}]</span>
            <strong class="title">{{ list.title }}</strong>
          </div>
          <div class="content" v-html="list.content">
          </div>

        </li>
      </ul>
      <!-- 문의 없음 -->
      <div class="no-contents" v-else>
        <img src="~/assets/image/common/img_noQna.png" alt="게시글 없음">
        <p>FAQ 내용이 없습니다.</p>
      </div>

      <ui-pagination :current-page="result.pagination.currentPage" :total-pages="result.pagination.totalPages" @change="paging"/>
    </div>
  </section>
</template>
<script>
export default {
  watchQuery:true,
  async asyncData({$salesonApi, $seo, $axios, error, route, query}) {

    try {

      const params = {
        faqType: query.faqType ?? '',
        page: query.page ?? 1,
        size: 10
      }

      const [seo, response] = await Promise.all(
          [
            $seo(route.path, $axios),
            $salesonApi().faq.getFaqs(params)
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
        faqType: '',
        orderBy: '',
        sort: '',
        page: 1,
        size: 2,
      },
      result: {
        types: [],
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
      selectedIndex: null,
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
        faqType: this.param.faqType,
        orderBy: this.param.orderBy,
        sort: this.param.sort,
      }

      this.$router.push({path: this.$route.fullPath, query: query});
    }
  },

}
</script>
<style lang="scss">
@import '~/assets/scss/pages/customer/customer_main.scss';
</style>