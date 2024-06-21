<template>
  <div class="item-list-page item-index-page">
    <div class="category-tab-all">
      <!-- deps1에 클래스 on으로 토글 -->
      <div class="deps1">
        <nuxt-link to="/">홈</nuxt-link>
      </div>
      <div class="deps1" :class="{ on: isDeps1 }" @click="toggleInfoPanel('isDeps1')">
        {{ categoryName1 }}<i></i>
        <div class="select-wrap">
          <ul class="select-option">
            <li v-for="(category1, index) of getCategories(0)">
              <nuxt-link :to="category1.link">{{ category1.name }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="deps1" :class="{ on: isDeps2 }" @click="toggleInfoPanel('isDeps2')" v-if="categoryName2 != ''">
        {{ categoryName2 }}<i></i>
        <div class="select-wrap">
          <ul class="select-option">
            <li v-for="(category2, index) of getCategories(1)">
              <nuxt-link :to="category2.link">{{ category2.name }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="deps1" :class="{ on: isDeps3 }" @click="toggleInfoPanel('isDeps3')" v-if="categoryName3 != ''">
        {{ categoryName3 }}<i></i>
        <div class="select-wrap">
          <ul class="select-option">
            <li v-for="(category3, index) of getCategories(2)">
              <nuxt-link :to="category3.link">{{ category3.name }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- category-tabs-current에 클래스 on으로 토글 -->
    <div class="category-tabs-current" @click="isVisible = !isVisible" :class="{ on: isVisible }">
      <h2>{{ title }}<i></i></h2>
      <div class="select-wrap" v-show="isVisible">
        <div class="triangle"></div>
        <ul class="select-option">
          <li v-for="(category, index) of getCategories(selectedCategoryDepth)">
            <nuxt-link :to="category.link">{{ category.name }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- pc용 카테고리 -->
    <!-- <Swiper class="category-tabs-next-swiper swiper-visible pc" :modules="modules" :slidesPerView="'auto'"
        :spaceBetween="30" :navigation="{
            prevEl: '.swiper-prev',
            nextEl: '.swiper-next',
        }" @slideChange="onSlide" ref="categorySwiper">
        <SwiperSlide>2차 카테고리1</SwiperSlide>
        <SwiperSlide>2차 카테고리2</SwiperSlide>
        <SwiperSlide>2차 카테고리3</SwiperSlide>
        <SwiperSlide>2차 카테고리4</SwiperSlide>
        <SwiperSlide>2차 카테고리5</SwiperSlide>
        <div class="swiper-controls">
            <div class="swiper-prev">이전</div>
            <div class="swiper-next">다음</div>
        </div>
    </Swiper> -->

    <div class="swiper category-tabs-next-swiper swiper-visible pc">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(category, index) of getCategories(selectedCategoryDepth+1)">
          <nuxt-link :to="category.link">{{ category.name }}</nuxt-link>
        </div>
        <!--                <div class="swiper-slide">카테고리예시</div>-->
      </div>
      <div class="swiper-controls" v-if="getCategories(selectedCategoryDepth+1) != null">
        <div class="swiper-prev">이전</div>
        <div class="swiper-next">다음</div>
      </div>
    </div>

    <!-- mobile용 카테고리 -->
    <ul class="category-tabs-next mobile" :class="{ active: isActive }">
      <li v-for="(category, index) of getCategories(selectedCategoryDepth+1)">
        <nuxt-link :to="category.link">{{ category.name }}</nuxt-link>
      </li>
    </ul>
    <div class="btn-more-category mobile" @click="toggleActive" v-if="getCategories(selectedCategoryDepth+1) != null">
      <i></i>
    </div>

    <item-list-head
        :totalElements="result.pagination.totalElements"
        :orderBy="param.orderBy"
        :sort="param.sort"
        @change="sorting"
    />

    <div v-if="typeof result.content != 'undefined' && result.content != null &&  result.content.length > 0">
      <item-list :content="result.content"/>
      <ui-pagination :current-page="result.pagination.currentPage" :total-pages="result.pagination.totalPages"
                     @change="paging"/>
    </div>
    <div v-else class="no-contents">
      <p>상품이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import Swiper from "swiper";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
} from "swiper/core";

SwiperCore.use([Navigation, Pagination, Autoplay, Scrollbar]);
import "swiper/swiper-bundle.css";

let $s, vm;

export default {
  watchQuery: true,
  async asyncData({$salesonApi, $seo, $axios, params, error, route, query}) {

    try {
      const categoryCode = params.id;

      const param = {
        categoryUrl: categoryCode,
        categoryCode: categoryCode,
        orderBy: query.orderBy ?? '',  //  'ORDERING'
        sort: query.sort ?? 'ASC',
        page: query.page ?? 1,
        fcIds: query.fcIds ?? "",
        itemsPerPage: 24
      }

      const {data} = await $salesonApi().category.getAllCategories();
      const categoryInfo = $salesonApi().category.getCategoryInfo(data, categoryCode);

      const [seo, response] = await Promise.all(
          [
            $seo(route.path, $axios),
            $salesonApi().item.getItems(param)
          ]);

      let dataSet = {
        clipboard: route.path,
        categoryCode: categoryCode,
        categoryData: data,
        title: categoryInfo.title,
        categoryName1: categoryInfo.categoryName1,
        categoryName2: categoryInfo.categoryName2,
        categoryName3: categoryInfo.categoryName3,
        selectedCategoryDepth: categoryInfo.selectedCategoryDepth,
        categories: categoryInfo.categories,
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
      isDeps1: false,
      isDeps2: false,
      isDeps3: false,
      isVisible: ref(false),
      modules: [Navigation],
      categoryTabsNextSwiper: null,
      isActive: ref(false),
      param: {
        categoryCode: '',
        orderBy: '',
        sort: '',
        page: 1,
        itemsPerPage: 24,
        fcIds: ''
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
    };
  },
  mounted() {
    const categoryTabsNextSwiperOption = {
      slidesPerView: "auto",
      slidesPerGroup: "1",
      loopedSlides: "0",
      loop: "true",
      navigation: {
        enabled: true,
        nextEl: ".category-tabs-next-swiper .swiper-next",
        prevEl: ".category-tabs-next-swiper .swiper-prev",
      },
      ///watchSlidesProgress: 'true',
    };

    this.categoryTabsNextSwiper = new Swiper(
        ".category-tabs-next-swiper",
        categoryTabsNextSwiperOption
    );
  },

  methods: {
    toggleActive() {
      this.isActive.value = !this.isActive.value;
    },
    toggleInfoPanel(panelName) {

      if (panelName === 'isDeps1') {
        this.isDeps1 = !this.isDeps1;
        this.isDeps2 = false;
        this.isDeps3 = false;

      } else if (panelName === 'isDeps2') {
        this.isDeps2 = !this.isDeps2;
        this.isDeps1 = false;
        this.isDeps3 = false;
      } else if (panelName === 'isDeps3') {
        this.isDeps3 = !this.isDeps3;
        this.isDeps1 = false;
        this.isDeps2 = false;
      }
      this.isVisible = false;
      // this[panelName] = !this[panelName];
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
      // this.submit();
    },
    getCategories(index) {
      if (this.categories) {
        let arr = this.categories[index];
        if (arr == null || arr.length == 0) {
          arr = null;
        }
        return arr;
      }
      return null;
    },
    async submit() {

      try {
        const {data} = await this.$salesonApi().item.getItems(this.param);

        if (data != null) {
          this.result.content = data.content;
          this.result.pagination = data.pagination;
        } else {
          this.result.content = null;
          this.result.pagination = null;
        }

      } catch (e) {
        console.error('[category] 검색: ', e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/guide.scss";
@import "~/assets/scss/pages/items/item_list.scss";
</style>
