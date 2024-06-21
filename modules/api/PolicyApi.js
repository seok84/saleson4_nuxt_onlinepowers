import Api from "@/modules/api/Api";

export default class PolicyApi extends Api {
    constructor(context) {
        super(context);
    }
    getPolicy(param) {
        return this.get("/api/policy/" + param + "/list");
    }

    getPolicies() {
        return this.get("/api/policy/policies");
    }
}