import Api from "@/modules/api/Api";

export default class PointApi extends Api {
    constructor(context) {
        super(context);
    }

    /**
     * 적립금 내역 조회
     * @param params
     * @returns {Promise<*>}
     */
    getSavedPoints(params) {
        return this.get("/api/mypage/points", params);
    }
}