<template>
  <div class="featured featured-main">
    <h1 class="title-h1">이벤트</h1>
    <div class="container">
      <div class="sort-wrap">
        <div class="all-items">총 <strong>{{formatNumber(result.pagination.totalElements)}}</strong>개 상품</div>
      </div>
      <ul class="event-list">
        <li class="event-item" v-for="(list, index) in result.content" :key="index">
          <template v-if="list.externalLinkFlag">
            <a :href="list.link" :target="{_blank: list.linkTarget != ''}" :rel="{nofollow : list.linkRel != ''}">
              <div class="event-thumbnail">
                <span class="label" :class="'progress'">{{list.label}}</span>
                <img :src="list.image" :alt="list.title" @error="errorImage">
              </div>
              <div class="event-info">
                <strong class="title">{{ list.title }}</strong>
                <span class="sub" v-if="list.simpleContent">{{ list.simpleContent }}</span>
                <span class="date">{{ list.dateText }}</span>
              </div>
            </a>
          </template>
          <template>
            <nuxt-link :to="list.link">
              <div class="event-thumbnail">
                <span class="label" :class="'progress'">{{list.label}}</span>
                <img :src="list.image" :alt="list.title" @error="errorImage">
              </div>
              <div class="event-info">
                <strong class="title">{{ list.title }}</strong>
                <span class="sub" v-if="list.simpleContent">{{ list.simpleContent }}</span>
                <span class="date">{{ list.dateText }}</span>
              </div>
            </nuxt-link>
          </template>
        </li>
      </ul>
      <ui-pagination :current-page="result.pagination.currentPage" :total-pages="result.pagination.totalPages"
                     @change="paging"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'featured',
  watchQuery: true,
  async asyncData({$salesonApi, $seo, $axios, error, route, query}) {

    try {

      const params = {
        page: query.page ?? 1,
        size: 10
      }

      const [seo, response] = await Promise.all(
          [
            $seo(route.path, $axios),
            $salesonApi().event.getEvents(params)
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
      events: [
        {
          id: 'event1',
          title: '간편하게 하나로 완성하는 스타일, 미쏘 썸머드레스',
          status: true,
          thumbnail: 'no_content_720480.png',
          date: '2023.06.04 ~ 2023.06.30'
        },
        {
          id: 'event2',
          title: '당신이 사랑하는 카페, 한 여름날의 홈카페',
          status: false,
          sub: '좋아하는 음악 한 곡을 틀어놓고, 좋아하는 잔을 선택해 기분에 어울리는 커피 한 잔',
          thumbnail: 'no_content.png',
          date: '2023.06.04 ~ 2023.06.30'
        },
        {
          id: 'event3',
          title: '간편하게 하나로 완성하는 스타일, 미쏘 썸머드레스',
          status: true,
          thumbnail: 'sample_01.png',
          date: '2023.06.04 ~ 2023.06.30'
        },
        {
          id: 'event4',
          title: '간편하게 하나로 완성하는 스타일, 미쏘 썸머드레스',
          status: false,
          thumbnail: 'sample_02.png',
          date: '2023.06.04 ~ 2023.06.30'
        }
      ]
    }
  },
  methods: {
    paging(page) {
      const query = {
        page: page
      }

      this.$router.push({path: this.$route.fullPath, query: query});
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/pages/featured/featured.scss';
</style>