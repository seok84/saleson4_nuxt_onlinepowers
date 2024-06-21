import DisplayApi from "@/modules/api/DisplayApi";
import cookie from 'cookie'; // SSR 쿠키
import Cookies from 'js-cookie';

const TOP_BANNER_COOKIE = 'TOP_BANNER_COOKIE';

export const state = () => ({
    topBanner: {},
});

export const mutations = {
    setTopBanner(state, topBanner) {
        state.topBanner = topBanner;
    },
};

export const actions = {
    async fetchTopBanner({ commit, state }, context) {
        try {
            let cookieValue;

            // 서버사이드인지 클라이언트사이드인지 확인
            if (process.server) {
                const parsedCookies = cookie.parse(context.req.headers.cookie || '');
                cookieValue = parsedCookies[TOP_BANNER_COOKIE];
            } else {
                cookieValue = Cookies.get(TOP_BANNER_COOKIE);
            }

            // 쿠키가 있는지 여부를 확인
            const hasTopBannerCookie = !!cookieValue; // 간단한 검사

            // DisplayApi 인스턴스 생성
            const displayApi = new DisplayApi(context);
            const { data } = await displayApi.getTopBanner();

            // topBanner 설정
            let topBanner = null;
            if (data.list.length > 0 && !hasTopBannerCookie) {
                topBanner = data.list[0];
            }

            // topBanner를 state에 커밋
            commit('setTopBanner', topBanner);

        } catch (error) {
            console.error('[store/display] Top Banner 데이터를 가져오는 중 오류 발생:', error);
        }
    }
};