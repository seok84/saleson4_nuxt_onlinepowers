<template>
  <div class="item-list-page display-page display-md">
    <h1 class="title-h1">MD추천</h1>
    <div class="swiper category-bubble-swiper swiper-visible">
      <div class="swiper-wrapper">
        <div v-for="(tag, index) in tags"
             class="swiper-slide"
             :class="{ 'on': activeIndex === index }" @click="active(index)">
          #{{tag}}
        </div>
      </div>

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
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar
} from "swiper/core";

SwiperCore.use([Navigation, Pagination, Autoplay, Scrollbar]);

export default {
  watchQuery:true,
  name: 'md',
  async asyncData({$salesonApi, $seo, $axios, error, route, query}) {

    try {

      const [seo, tags] = await Promise.all(
          [
            $seo(route.path, $axios),
            $salesonApi().display.getMdTags()
          ]);

      const tagList = tags.data.tags;
      const initTag = tagList[0];

      const param = {
        page: query.page ?? 1,
        tag : query.tag ?? initTag,
        orderBy: query.orderBy ?? '',
        sort: query.sort ?? '',
        size: 24
      }

      const mdItems = await $salesonApi().display.getMdItems(param);

      let activeIndex = tagList.indexOf(param.tag);

      return {
        tags: tags.data.tags,
        seo: seo,
        param: param,
        result : mdItems.data,
        activeIndex : activeIndex
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
      categorySwiper: null,
      tags: [],
      param: {
        tag: '',
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
      },
      activeIndex: -1,
    }
  },
  watch: {
  },
  mounted() {

    this.$nextTick(() => {
      const categorySwiperOption = {
        slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
          enabled: true,
          prevEl: '.swiper-prev',
          nextEl: '.swiper-next',
        },
      }
      this.categorySwiper = new Swiper(".category-bubble-swiper", categorySwiperOption);

    });

  },
  methods: {
    active(index) {
      this.activeIndex = index;

      this.param.tag = this.tags[index];
      this.param.orderBy = '';
      this.param.sort = '';
      this.paging(1);
    },

    async paging(page) {
      try {

        const query = {
          page: page,
          tag : this.param.tag,
          size: this.param.size,
          orderBy: this.param.orderBy,
          sort: this.param.sort,
        }

        this.$router.push({path: this.$route.fullPath, query: query});

      } catch (e) {}
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