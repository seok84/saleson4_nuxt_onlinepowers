import Api from "@/modules/api/Api";

export default class  extends Api {
    constructor(context) {
        super(context);
    }

    getFaqs(params) {
        return this.get('/api/faq', params);
    }
}
