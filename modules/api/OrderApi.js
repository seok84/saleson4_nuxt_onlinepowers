import Api from "@/modules/api/Api";

export default class OrderApi extends Api {
    constructor(context) {
        super(context);
    }

    getRecentOrderItem(param) {
        return this.get('/api/order/recent-order-item', param);
    }

    getSalesLedger(param) {
        return this.get('/api/order/sales-ledger', param);
    }

    getPaymentStep(){
        return this.post('/api/order/payment-step');
    }

    getSnsInfo(){
        return this.get("/api/auth/sns-info");
    }

    getOrderDetail(param){
        return this.get('/api/order/detail', param);
    }

    getDirectDeliveryInfo(post = '') {
        return this.get('/api/order/direct-delivery-info/'+post);
    }

    getOrderList(param){
        return this.get('/api/order', param);
    }

    confirmPurchase(param){
        return this.post('/api/order/confirm-purchase', param)
    }

    getReturnApply(param){
        return this.get('/api/order/return-apply', param)
    }

    getExchangeApply(param){
        return this.get('/api/order/exchange-apply', param)
    }

    getCancelApply(param){
        return this.get('/api/order/cancel-apply', param)
    }

    exchangeProcess(param){
        return this.post('/api/order/exchange-apply', param);
    }

    returnProcess(param){
        return this.post('/api/order/return-apply', param);
    }

    cancelProcess(param){
        return this.post('/api/order/cancel-apply', param);
    }

    orderCancel(param){
        return this.post('/api/order/cancel', param);
    }

    getRefundAmount(param){
        return this.post('/api/order/refund-amount', param);
    }

    saveOrder(param) {
        return this.post('/api/order/save', param);
    }

    setOrderPay(param) {
        return this.post('/api/order/pay', param);
    }

    buyOrder(param) {
        return this.post('/api/order/buy', param)
    }


    /**
     * 구성상품 정보 가져오기 (세트상품)
     * @param param
     * @returns {*}
     */
    getFreegiftItemByCartId(id) {
        return this.get(`/api/order/set-item-info/${id}`);
    }
}
