import Api from "@/modules/api/Api";

export default class SeoApi extends Api {
    constructor(context) {
        super(context);
    }

    getSeo(url) {
        return this.get("/api/seo?u=" + url);
    }
}