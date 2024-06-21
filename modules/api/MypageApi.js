import Api from "@/modules/api/Api";

export default class MypageApi extends Api {
    constructor(context) {
        super(context);
    }

    getMypage() {
        return this.get('/api/mypage');
    }

    getGrade() {
        return this.get('/api/mypage/grade');
    }

    getPoints(param) {
        return this.get('/api/mypage/points', param);
    }


    getItemReviews(param) {
        return this.get('/api/mypage/reviews', param);
    }

    deleteReview(param) {
        const url = '/api/mypage/delete-review/'+param;
        return this.post(url);
    }

}
