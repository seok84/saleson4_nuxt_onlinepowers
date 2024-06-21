<template>
  <div class="item-list-page display-page display-best">
    <h1 class="title-h1">베스트</h1>
    <div class="display-ad pc">
      <img src="~/assets/image/item/best_bg_banner.png" alt="banner-pc">
    </div>
    <div class="display-ad mobile">
      <img src="~/assets/image/item/best_bg_banner_mo.png" alt="banner-mobile">
    </div>
    <!-- btn-display-tab-more 클릭 시 더보기 활성화 -> display-tab-wrap.on  -->
    <!-- 탭메뉴 개수가 적으면 less 클래스 붙여야함 -> display-tab-wrap.less (더보기 버튼 없어짐)  -->
    <div class="display-tab-wrap">
      <ul class="display-tab">
        <li v-for="(category, index) in categories" :key="`${category.url}-${index}`"
            :class="{ 'on': activeIndex === index }" @click="active(index)">
          {{ category.name }}
        </li>
      </ul>
      <div class="btn-display-tab-more"><i></i></div>
    </div>


    <template v-if="typeof result.content != 'undefined' && result.content != null &&  result.content.length > 0">
      <item-list :content="result.content" :display-rank="true" list-class="item-best"/>
    </template>
    <div v-else class="no-contents">
      <p>상품이 없습니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'best-item',
  async asyncData({$seo}) {
    try {
      const seo = await $seo();
      return {
        seo: seo
      }
    } catch(error) {
      console.log("[best/index.vue] asyncData error: ", error);
      return {}
    }
  },

  head() {
    return this.seo;
  },
  data() {
    return {
      categories:[],
      param: {
        tag : '',
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
      activeIndex: -1,
    }
  },
  watch: {
    activeIndex(index) {
      if (index > -1) {
        this.getItems(index);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const self = this;
      this.categoryInfo(self, ()=>{
        self.activeIndex = 0;
      });
    });
  },
  methods: {
    active(index) {
      this.activeIndex = index;
    },
    async getItems(index) {
      try {
        const category = this.categories[index];

        const params = {
          tag : category.url,
          size : 100,
          page : 1
        }

        const {data} = await this.$salesonApi().display.getGroupBestItems(params);

        this.result = data;

      } catch (e) {}
    }
  },
}
</script>
<style lang="scss" scoped>
@import "assets/scss/pages/items/item_list";
@import "assets/scss/pages/display/display";
</style>