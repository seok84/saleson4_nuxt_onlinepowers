import Api from "@/modules/api/Api";

export default class NoticeApi extends Api {
    constructor(context) {
        super(context);
    }

    getNotices(params) {
        return this.get('/api/notice', params);
    }
}
