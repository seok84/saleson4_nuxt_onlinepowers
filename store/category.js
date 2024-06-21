
export const state = () => ({
    categories: [],
    updatedDate: '00000000000000',
    lastFetch: null
});

export const mutations = {
    setCategories(state, categories) {
        state.categories = categories;
    },

    setUpdatedDate(state, updatedDate) {
        state.updatedDate = updatedDate;
    },

    setLastFetch(state, lastFetch) {
        state.lastFetch = lastFetch;
    }
};

export const actions = {
    async fetchCategories({ commit, state }, nuxtContext) {
        try {
            // 라우터 이동시 계속 조회하지 않고 캐시 처리함.
            const cacheMinutes = 2; // 분
            const cacheDuration = cacheMinutes * 60 * 1000; // 2분 캐시 시간 (밀리초 단위)
            const now = new Date().getTime();

            // 마지막으로 데이터를 가져온 시간이 캐시 시간 내에 있는지 확인합니다.
            if (state.categories.length > 0 && state.lastFetch && (now - state.lastFetch < cacheDuration)) {
                console.log('카테고리 정보를 ' + cacheMinutes + '분간 조회하지 않음.');
                return;
            }
            console.log('카테고리 정보 조회');
            commit('setLastFetch', now);


            // 카테고리 정보가 변경되었는지 조회
            const response = await nuxtContext.$axios.get("/api/category/updated-check", {
                params: {d: state.updatedDate}
            });

            //console.log('response: ',response.data.categoryUpdateFlag );

            if (state.categories.length === 0 || response.data.categoryUpdateFlag) {
                const {data} = await nuxtContext.$axios.get("/api/category")

                console.log('/api/category:', data);

                // 카테고리 세팅.
                commit('setCategories', data.list);
                commit('setUpdatedDate', data.updatedDate);
                commit('setLastFetch', now);
            }
        } catch (error) {

            console.error('[store/category] 카테고리 데이터를 가져오는 중 오류 발생:', error);
        }
    },


};
