<template>
    <div>
        <!-- <LayoutHeader :propsPageTItle="pageMetaTitle" /> -->
        <LayoutHeader></LayoutHeader>
        <div class="content-inner">
            <div class="mypage" :class="currentPage">
                <a href="/mypage" class="title-h1">마이페이지</a>
                <MypageUserInfo/>
                <MypageLnb/>
                <div class="mypage-inner">
                    <nuxt/>
                </div>
            </div>
        </div>
        <LayoutFooter></LayoutFooter>
        <LayoutAside></LayoutAside>
        <ModalAlert></ModalAlert>
    </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: '',
      // pageMetaTitle:'',
    }
  },
  watch: {
    $route(to) {
      this.currentPage = this.getRestOfName(to.name);
    },
  },
  computed: {
    headerMobileStyle() {
      return this.type02Header;
    },
  },
  beforeMount() {
    this.$nextTick(() => {
      this.currentPage = this.getRestOfName(this.$route.name);
    })
    this.$saleson.initVueModule(this);
    this.$saleson.init();
  },
  methods: {
    getRestOfName(name) {
      const parts = name.split('-');
      const indexName = 'mypage-index';
      if (parts.length === 2) {
        return name;
      } else if (parts.length > 2) {
        console.log(parts);
        if (parts.includes('id')) {
          parts[parts.indexOf('id')] = 'detail';
          return parts.join('-');
        } else {
          return parts.slice(1).join('-');
        }
      } else {
        return indexName;
      }
    },
  },
};
</script>

<style lang="scss">
@import "~/assets/scss/common.scss";
@import "~/assets/scss/pages/mypage/mypage_main.scss";
</style>