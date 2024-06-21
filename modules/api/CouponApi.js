import Api from "@/modules/api/Api";

export default class CouponApi extends Api {
    constructor(context) {
        super(context);
    }

    /**
     * 마이페이지 - 쿠폰 목록 조회 (다운로드 한 쿠폰 목록)
     * @param params
     * @returns {*}
     */
    getCoupons(params) {
        return this.get("/api/coupon", params);
    }

    /**
     * 마이페이지 - 배송비 쿠폰 목록 (사용 가능)
     * @param params
     * @returns {*}
     */
    getShippingCoupons(params) {
        return this.get("/api/coupon/shipping-coupons", params);
    }

    /**
     * 다운로드 가능 쿠폰 리스트
     * @param params
     * @returns {*}
     */
    getDownloadCoupons(params){
        return this.get("/api/coupon/download-coupons", params)
    }

    /**
     * 쿠폰 다운로드
     * @param params
     * @returns {*}
     */
    downloadCoupon(params){
        return this.post("/api/coupon/download", params)
    }

    /**
     * 쿠폰 전체 다운로드
     * @param params
     * @returns {*}
     */
    downloadAllCoupon(params){
        return this.post("/api/coupon/download-all-coupons", params)
    }


    offlineCouponExchange(params){
        return this.get("/api/coupon/exchange-offline-coupon", params)
    }

    getAppliesTo(params){
        return this.get("/api/coupon/applies-to/" + params.couponId + "/coupon-user", params)
    }
}
