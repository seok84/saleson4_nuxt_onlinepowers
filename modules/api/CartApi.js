import Api from "@/modules/api/Api";

export default class CartApi extends Api {
    constructor(context) {
        super(context);
    }

    /**
     * 장바구니 상품 목록
     * @param params
     * @returns {*}
     */
    getCartItems(params) {
        return this.get("/api/cart", params);
    }

    getCartOrderPrice(params) {
        return this.post("/api/cart/price", params);
    }

    /**
     * 상품의 수량 변경.
     * @param params
     * @returns {*}
     */
    updateQuantity(params) {
        return this.post('/api/cart/update-quantity', params);
    }

    /**
     * 장바구니 상품 삭제
     * @param param
     * @returns {*}
     */
    deleteCartItems(params) {
        return this.post("/api/cart/delete", params);
    }

    /**
     * 장바구니 담기
     * @param param
     * @returns {*}
     */
    addToCart(params) {
        return this.post("/api/cart/add", params);
    }

    /**
     * 구성상품 정보 가져오기 (세트상품)
     * @param param
     * @returns {*}
     */
    getFreegiftItemByCartId(id) {
        return this.get(`/api/cart/set-item-info/${id}`);
    }


    getCartCount() {
        return this.get(`/api/cart/count`);
    }
}
