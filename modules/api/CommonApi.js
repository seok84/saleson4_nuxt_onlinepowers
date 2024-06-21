import Api from "@/modules/api/Api";

export default class CommonApi extends Api {
    constructor(context) {
        super(context);
    }

    /**
     * 회사 정보 조회
     * @param params
     * @returns {*}
     */
    getCompanyInfo() {
        return this.get("/api/common/about-us");
    }

    /**
     * 퀵 정보 가져오기
     * @param params
     * @returns {*}
     */
    getQuickInfo() {
        return this.get('/api/common/quick-info');
    }

    getSessionTimeout() {
        return this.get('/api/auth/session-timeout');
    }
    getBankInfo(){
        return this.get('/api/common/bank-info');
    }

    /**
     * 공통 - 장바구니 정보
     * @param params
     * @returns {*}
     */
    getCartInfo() {
        return this.get('/api/common/cart-info');
    }

    /**
     * 도서산간 조회
     * @param params
     * @returns {*}
     */
    getIslands(params) {
        return this.get('/api/common/island-info', params);
    }
}
