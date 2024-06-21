/**
 * 공통 로직 함수 정의
 *
 * 공통으로 적용되는 로직이 있는 경우 작성합니다.
 *
 *
 * @param context
 * @param inject
 */


export default (context, inject) => {
    const common = {
        /**
         * 장바구니 수량 업데이트
         * @returns {Promise<void>}
         */
        fetchCartCount: async () => {
            try {
                const loggedIn = context.$auth.loggedIn;
                const token = context.$auth.strategy.token.get();

                console.log('loggedIn:', loggedIn);
                console.log('token:', token);

                await context.store.dispatch('cart/fetchCartCount', context);
            } catch (error) {
                console.error('장바구니 수량 업데이트 중 오류 발생:', error);
            }
        },

    };

    inject('common', common);
};