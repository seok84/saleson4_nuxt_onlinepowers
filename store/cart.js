import CartApi from "@/modules/api/CartApi";

export const state = () => ({
    cartCount: 0
});

export const mutations = {
    setCartCount(state, cartCount) {
        state.cartCount = cartCount;
    }
};

export const actions = {
    async fetchCartCount({ commit }, context) {
        try {
            //console.log('getCartCount.context: ', context);
            const cartApi = new CartApi(context);
            const {data} = await cartApi.getCartCount();

            //console.log('data.totalQuantity:', data.totalQuantity);

            // 총 수량(sum): data.totalQuantity
            commit('setCartCount', data.totalQuantity);
        } catch (error) {

            console.error('[store/cart] 장바구니에 담긴 수량 데이터를 가져오는 중 오류 발생:', error);
        }
    }
};
