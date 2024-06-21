import Api from "@/modules/api/Api";

export default class DisplayApi extends Api {
    constructor(context) {
        super(context);
    }

    /**
     * 프로모션 정보 정보
     * @returns {*}
     */
    getBanners() {
        return this.get('/api/display/banner');
    }

    /**
     * 베스트 상품 조회
     * @param params
     * @returns {*}
     */
    getBestItems() {
        return this.get('/api/display/best');
    }

    /**
     * 그룹별 베스트 상품 조회
     * @param params
     * @returns {*}
     */
    getGroupBest(params) {
        return this.get('/api/display/group-best', params);
    }


    /**
     * 베스트 상품 조회
     * @param params
     * @returns {*}
     */
    getGroupBestItems(params) {
        return this.get('/api/display/group-best/item-list', params);
    }


    /**
     * 최근 본 상품 조회
     * @param params
     * @returns {*}
     */
    getLatelyItems(params) {
        return this.get('/api/display/lately', params);
    }


    /**
     * 메인용 리뷰 조회
     * @param params
     * @returns {*}
     */
    getMainReviews(params) {
        return this.get('/api/display/main-reviews', params);
    }


    /**
     * MD 상품 조회
     * @param params
     * @returns {*}
     */
    getMdItems(params) {
        return this.get('/api/display/md', params);
    }

    /**
     * MD 태그 조회
     * @param params
     * @returns {*}
     */
    getMdTags(params) {
        return this.get('/api/display/md-tags', params);
    }

    /**
     * 신상품 조회
     * @param params
     */
    getNewItems(params) {
        return this.get('/api/display/new', params);
    }

    /**
     * 프로모션 정보 조회
     * @returns {*}
     */
    getPromotion() {
        return this.get('/api/display/promotion');
    }


    /**
     * 전시용 리뷰 조회
     * @param params
     * @returns {*}
     */
    getReviews(params) {
        return this.get('/api/display/reviews', params);
    }


    /**
     * Top 배너 조회
     * @returns {*}
     */
    getTopBanner() {
        return this.get('/api/display/top-banner');
    }

}
