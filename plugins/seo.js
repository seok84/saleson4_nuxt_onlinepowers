/**
 * SEO Plugin
 *
 * Page에서 Seo 값을 조회한다.
 *
 * @param app
 * @param inject
 */

export default ({ app }, inject) => {
  const fetchSeoData = async (path) => {
    try {
      const seo = await app.$axios.$get('/api/seo?u=' + encodeURIComponent(path));

      //console.log('seo: ', seo);
      let metaData = [];

      if (seo && seo.indexFlag) {
        metaData.push({ hid: 'keywords', name: 'keywords', content: seo.keywords });
        metaData.push({ hid: 'description', name: 'description', content: seo.description });

        const og = seo.openGraph;
        if (og) {
          metaData.push({ hid: 'og:url', property: 'og:url', content: og.url });
          metaData.push({ hid: 'og:title', property: 'og:title', content: og.title });
          metaData.push({ hid: 'og:description', property: 'og:description', content: og.description });
          metaData.push({ hid: 'og:image', property: 'og:image', content: og.image });
        }
      } else {
        metaData.push({ hid: 'robots', name: 'robots', content: 'noindex,noarchive' });
      }

      return {
        title: seo.title,
        meta: metaData
      };
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      return {
        title: "Default Title",
        meta: []
      };
    }
  };

  // 페이지에서 호출시 실행됨.
  inject('seo', async () => {
    const path = app.context.route.path;
    return await fetchSeoData(path);
  });
}