<template>
    <div id="saleson">
        <LayoutHeader></LayoutHeader>
        <div class="content-inner">
            <nuxt/>
        </div>
        <LayoutFooter></LayoutFooter>
        <LayoutAside></LayoutAside>
        <ModalAlert></ModalAlert>
        <ModalToast></ModalToast>
    </div>
</template>
<script>

export default {
  /*
  async fetch() {

      try {
          let path = this.$route.path;
          let data = await this.$axios.$get('/api/seo?u=' + encodeURIComponent(path));
          let seo = data.seo;

          if (typeof seo != 'undefined' && seo != null) {
              this.$store.commit('seo', seo);
          }
      } catch (e) { }
  }, */
  head() {
    /*const seo = this.$store.state.seo;

    let meta = [];

    meta.push({charset: 'utf-8'});
    meta.push({
      hid: 'viewport',
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
    });
    meta.push({hid: 'apple-mobile-web-app-capable', name: 'apple-mobile-web-app-capable', content: 'yes'});

    if (typeof seo != 'undefined' && seo != null && 'N' != seo.indexFlag) {
      meta.push({hid: 'description', name: 'description', content: seo.description});
      meta.push({hid: 'keywords', name: 'keywords', content: seo.keywords});
    } else {
      meta.push({hid: 'robots', name: 'robots', content: 'noindex,noarchive'});
    }

    return {
      title: seo.title,
      titleTemplate: '%s - SalesOn3',
      meta: meta,
      script: [],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      ]
    }*/
  },

  data() {
    return {}
  },

  beforeMount() {
    this.$saleson.initVueModule(this);
    this.$saleson.init();
  },

}
</script>

<style lang="scss">
@import '~/assets/scss/common.scss';
</style>