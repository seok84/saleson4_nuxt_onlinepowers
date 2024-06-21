/**
 * SalesonId 설정.
 * @param store
 * @param $axios
 * @returns {Promise<void>}
 */
const setSalesonId = async ({ store, $axios }) => {
    let salesonId = store.getters['get']['salesonId'];

    //console.log('sessionId: ', salesonId);
    if (salesonId == null) {
        const { data } = await $axios.get('/api/auth/saleson-id');
        //console.log('sessionId: ', data);
        store.commit('salesonId', data);
    }

};

/**
 * 장바구니 수량 조회.
 * @param nuxtContext
 * @returns {Promise<void>}
 */
const fetchCartCount = async (nuxtContext) => {
    await nuxtContext.store.dispatch('cart/fetchCartCount', nuxtContext);
};

/**
 * 카테고리 조회
 * @param nuxtContext
 * @returns {Promise<void>}
 */
const fetchCategories = async (nuxtContext) => {
    await nuxtContext.store.dispatch('category/fetchCategories', nuxtContext);
};

/**
 * 상단 배너 정보
 * @param nuxtContext
 * @returns {Promise<void>}
 */
const fetchTopBanner = async (nuxtContext) => {
    await nuxtContext.store.dispatch('display/fetchTopBanner', nuxtContext);
};


/**
 * 초기 로딩 시 설정되어야 하는 store 데이터 조회.
 *
 * @author skc@onlinepowers.com
 * @param nuxtContext
 * @returns {Promise<void>}
 */
export default async (nuxtContext) => {
    // SalesonId 설정.
    await setSalesonId(nuxtContext);

    // 장바구니 수량 조회
    await fetchCartCount(nuxtContext);

    // 카테고리 조회
    await fetchCategories(nuxtContext);

    // 상단 Top 배너
    await fetchTopBanner(nuxtContext)

    // 라우터 변경 시 처리
    nuxtContext.app.router.afterEach(async (to, from) => {
        await fetchCategories(nuxtContext);
    });
};

