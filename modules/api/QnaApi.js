import Api from "@/modules/api/Api";

export default class QnaApi extends Api {
    constructor(context) {
        super(context);
    }

    getQnaGroups() {
        return this.get('/api/qna/qna-groups');
    }

    getItemInquiries(param) {
        return this.get('/api/qna/item-inquiry', param)
    }
    delItemInquiry(param) {
        return this.post('/api/qna/delete-item-inquiry', param)
    }
    getInquiries(param) {
        return this.get('/api/qna/inquiry', param)
    }
    createInquiry(param) {
        return this.post('/api/qna/inquiry', param)
    }

}