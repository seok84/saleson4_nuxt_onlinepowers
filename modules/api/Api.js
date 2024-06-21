class Api {
    constructor(context) {
        this.$axios = context.$axios;
        this.$auth = context.$auth;
        this.store = context.store;
        this.salesonId = context.salesonId ? context.salesonId : this.store.getters.get["salesonId"];

        //console.log('context:', context)
    }

    getAuthHeader() {
        let headers = {
            'SALESONID': this.salesonId
        };
        if (this.isLogin) {
            headers.Authorization = this.$auth.strategy.token.get();
        }
        return headers;
    }

    getRequestOptions(params) {
        let requestOptions = {};

        if (params !== 'undefined') {
            requestOptions.params = params;
        }

        requestOptions.headers = this.getAuthHeader();
        //console.log('requestOptions:',requestOptions )
        return requestOptions;
    }

    get(url, params) {
        return this.$axios.get(url, this.getRequestOptions(params));
    }

    post(url, params) {
        return this.$axios.post(url, params, this.getRequestOptions());
    }

    postWithHmac(url, params, Hmac) {
        return this.$axios.post(url, params, {
            headers: {
                Hmac : Hmac
            }
        })
    }

    downloadFile(url,params,type) {

        const option = this.getRequestOptions(url, this.getRequestOptions(params));

        if (typeof type !== undefined) {
            option['responseType'] = type;
        }

        return this.$axios.get(url, option);
    }
}

export default Api;