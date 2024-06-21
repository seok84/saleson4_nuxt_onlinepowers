<template>
  <div class="item-list-page display-page display-best">
    <h1 class="title-h1">베스트</h1>
    <div class="display-ad pc">
      <img src="~/assets/image/item/best_bg_banner.png" alt="banner-pc">
    </div>
    <div class="display-ad mobile">
      <img src="~/assets/image/item/best_bg_banner_mo.png" alt="banner-mobile">
    </div>

    <!-- 아이템리스트 -->
    <div v-if="typeof result.list != 'undefined' && result.list != null &&  result.list.length > 0">
      <item-list :content="result.list" :display-rank="true" list-class="item-best"/>
    </div>
    <div v-else class="no-contents">
      <p>상품이 없습니다.</p>
    </div>

  </div>
</template>

<script>
export default {
  async asyncData({$salesonApi, $seo, $axios, error, route}) {

    try {


      const [seo, response] = await Promise.all(
          [
            $seo(route.path, $axios),
            $salesonApi().display.getBestItems()
          ]);

      return {
        result: response.data,
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
      result: {
        list :[]
      }
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
@import "assets/scss/pages/items/item_list";
@import "assets/scss/pages/display/display";
</style>