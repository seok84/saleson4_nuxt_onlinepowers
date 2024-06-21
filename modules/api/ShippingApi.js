import Api from "@/modules/api/Api";

export default class ShippingApi extends Api {
    constructor(context) {
        super(context);
    }

    /**
     * 유저별로 shipping 리스트 정보 조회
     * @param itemUserCode
     * @returns {Promise<any>}
     */

    getShippingsByUser(params) {
        return this.get("/api/shipping", params);
    }

    /**
     * 기본 배송지 데이터 가져오기
     * @param itemUserCode
     * @returns {Promise<any>}
     */

    getDefaultAddress() {
        return this.get("/api/shipping/default-address");
    };

    /**
     * 배송지 목록 조회
     * @param itemUserCode
     * @returns {Promise<any>}
     */
    getShipping(params) {
        return this.get('/api/shipping', params);
    }

    /**
     * 배송지 추가 및 수정
     * @param params
     * @returns {*}
     */
    saveShipping(params) {
        return this.post('/api/shipping', params);
    }

    /**
     * 배송지 삭제
     * @param params
     * @returns {*}
     */
    deleteShipping(params){
        return this.post('/api/shipping/delete', params);
    }

    /**
     * 기본배송지 설정
     * @param params
     * @returns {*}
     */
    setDefaultShipping(params){
        return this.post('/api/shipping/base-shipping', params)
    }
}
