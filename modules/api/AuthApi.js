import Api from "@/modules/api/Api";

export default class AuthApi extends Api {
    constructor(context) {
        super(context);
    }


    getAuthToken(url,request,Hmac) {

        return this.postWithHmac(url, request, Hmac);
    }

    checkDuplicate(params, Hmac) {

        return this.postWithHmac(params.req, params.loginId, Hmac);
    }


    sendAuthNumber(param) {
        return this.post('/api/auth/send-auth-number', param);
    }
    checkAuthNumber(param) {
        return this.post('/api/auth/check-auth-number', param);
    }
    findId(param) {
        return this.post('/api/auth/find-id', param);
    }
    sendLoginId(param) {
        return this.post('/api/auth/send-login-id', param)
    }
    findPasswordStep1(param) {
        return this.post('/api/auth/find-password-step1', param)
    }
    checkAccountJoin(param) {
        return this.post('/api/auth/check-account-join', param);
    }
    changePassword(param) {
        return this.post('/api/auth/change-password', param)
    }
    delayChangePassword() {
        return this.post('/api/auth/delay-change-password');
    }
    isSnsJoinedUser() {
        return this.get('/api/auth/sns-user');
    }
    secedeMember(param) {
        return this.post('api/auth/secede', param);
    }
    joinMember(param) {
        return this.post('/api/auth/join', param);
    }
    snsJoinMember(param) {
        return this.post('/api/auth/sns-join', param);
    }

    getSnsInfo() {
        return this.get('/api/auth/sns-info');
    }

    getMember() {
        return this.get('/api/auth/me');
    }

    getSecedeInfo() {
        return this.get('/api/auth/secede');
    }

    isSnsJoinedUser() {
        return this.get('/api/auth/sns-user');
    }
    checkPassword(param) {
        return this.post('/api/auth/check-password', param);
    }
    updateMember(param) {
        return this.post('/api/auth/me', param);
    }

}
