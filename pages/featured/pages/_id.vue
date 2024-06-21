<template>
  <div class="featured featured-pages">
    <h1 class="title-h1">이벤트</h1>
    <section class="container event-wrap">
      <!-- 타이틀 -->
      <div class="title-wrap">
        <p>
          <span class="date">[ {{ content.dateText }} ]</span>
          <strong class="title">{{ content.title }}</strong>
        </p>
        <button type="button" class="link-copy"></button>
      </div>
      <!-- 에디터 영역 -->
      <div class="content" v-html="content.content"></div>
      <!-- 내부 분류 셀렉트 -->
      <template v-if="content.itemLists != null && content.itemLists.length > 0">
        <template v-for="itemList in content.itemLists">
          <p class="event-category-title" v-if="content.prodState !== '1'">
            <span class="anchor-pointer" :id="`list_${itemList.key}`"></span>
            {{itemList.name}}
          </p>
          <!-- 아이템 리스트 -->
          <item-list :content="itemList.items"/>
        </template>


      </template>

    </section>
    <!-- 사용자 -->
    <template v-if="content.replyUsedFlag">
      <featured-reply-form :id="content.id" @reload="reloadReply"/>
      <featured-reply-list :result="replyResult" @paging="replyPaging" @openReport="openReport"/>
    </template>
    <!-- 덧글리스트 -->

    <!-- 신고/차단 모달 -->
    <modal-report
        :show="report.show"
        :content-id="report.contentId"
        :content-type="report.contentType"
        :block-flag="report.blockFlag"
        @reload="reloadReport"
        @close="closeReport"/>
  </div>
</template>

<script>
export default {
  name: 'featured-detail',
  async asyncData({$salesonApi, $seo, $axios, params, error, route}) {

    try {


      const [seo, response] = await Promise.all(
          [
            $seo(route.path, $axios),
            $salesonApi().event.getEvent(params.id)
          ]);

      return {
        content: response.data,
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
      content: {
        id: 0,
        content:'',
        dateText:'',
        itemLists:[],
        eventViewUrl: '',
        prodState:'1',
        replyUsedFlag:false,
        simpleContent:'',
        title:''
      },
      replyResult:{
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
      isVisible: false,
      showReportModal: false,
      reportDetailModal: false,
      report:{
        contentType: '',
        contentId: 0,
        blockFlag: false,
        show: false
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
          if (this.content.replyUsedFlag) {
            this.replyPaging(1);
          }
    });
  },
  methods: {

    showReportDetailModal() {
      this.reportDetailModal = true,
          this.showReportModal = false
    },

    async replyPaging(page) {
      try {

        if (this.content.replyUsedFlag) {
          const params = {
            page: page,
            itemsPerPage: 5,
            featuredId: this.content.id
          }

          const response = await this.$salesonApi().event.getReplies(params);

          this.replyResult = response.data;
        }

      } catch (e) {}
    },
    reloadReply() {
      this.replyPaging(1);
    },
    openReport(contentId, blockFlag) {

      if (!this.$saleson.isLogin()) {

          this.$saleson.confirm(this.$saleson.const.LOGIN_MESSAGE, ()=>{
              this.$router.push({path: this.$saleson.pages.LOGIN, query: {target: this.$route.path}});
          });
          return false;
      }

      this.report.contentId = contentId;
      this.report.contentType = 'FEATURED';
      this.report.blockFlag = blockFlag;
      this.report.show=true;
    },
    closeReport() {
      this.report.contentId = 0;
      this.report.contentType = 'FEATURED';
      this.report.blockFlag = false;
      this.report.show=false;
    },
    reloadReport() {
      // 차단/차단해제 후에 해당 리스트 재조회
      this.replyPaging(this.replyResult.pagination.currentPage);
    }
  },
}
</script>
<style lang="scss">
@import '~/assets/scss/pages/featured/featured.scss';
</style>