import Api from "@/modules/api/Api";

export default class ItemApi extends Api {
    constructor(context) {
        super(context);
    }

    getItems(params) {
        return this.get('/api/item', params);
    }

    /**
     * 상품 정보 조회
     * @param itemUserCode
     * @returns {Promise<any>}
     */
    getItem(itemUserCode) {
        return this.get(`/api/item/${itemUserCode}`);
    }

    /**
     * 체험단 리뷰 조회
     * @param params
     * @returns {Promise<*>}
     */
    getExperienceTeamReviews(params) {
        return this.get('/api/item/experience-team-reviews', params);
    }

    /**
     * 리뷰 조회
     * @param params
     * @returns {Promise<*>}
     */
    getItemReviews(params) {
        return this.get('/api/item/reviews', params);
    }

    addExperienceTeamReviewLike(id= 0) {
        return this.post(`/api/item/experience-team-reviews/add-like/${id}`);
    }

    insertItemReview(params){
        return this.post('/api/item/review', params)
    }

    /**
     * 관련상품 임의 출력인 경우 동일 카테고리 상품 리스트 조회
     * @param itemUserCode (path)
     * @returns {Promise<*>}
     */
    getRelationItems(itemUserCode) {
        return this.get(`/api/item/${itemUserCode}/relation`);
    }

    /**
     * 상품문의 리스트 조회
     * @param itemUserCode (path)
     * @returns {Promise<*>}
     */
    getItemInquiries(params) {
        return this.get(`/api/item/${params.itemUserCode}/inquiry`, params);
    }

    /**
     * 상품상세 쿠폰 모두 다운
     * @param params (path)
     * @returns {Promise<*>}
     */
    downloadAllItemCouponList(params){
        return this.post('/api/item/download-all-coupons', params)
    }

}
