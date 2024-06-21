/**
 * SalesOn3 API Client
 *
 * @Date 2019.10.07.
 * @Author skc@onlinepowers.com
 * @type {{exception: Saleson.exception, redirect: Saleson.redirect, init: Saleson.init, debug: Saleson.debug, const: {SAVED_LOGIN_ID: string, CATEGORY: string, TOKEN: string}, notFoundException: Saleson.notFoundException, log: Saleson.log, callbackAlert: Saleson.callbackAlert, error: Saleson.error, confirm: Saleson.confirm, isLogin: (function(): (*|boolean)), authenticationException: Saleson.authenticationException, pages: {LOGIN: string, INDEX: string, isAllowAnonymous: (function(): boolean)}, handleException: Saleson.handleException, requestContext: {}, alert: Saleson.alert, config: {cdnDomain: string, apiDomain: string, HMACSecretKey: string}}}
 */

module.exports = {
    install(Vue, modules) {
        const cryptoJS = modules.cryptoJS;
        const CircuitBreaker = modules.circuitBreaker;

        let $s = Vue.prototype.$saleson = {
            axios: null,
            auth: null,
            store: null,
            config: {
                apiDomain: process.env.API,
                cdnDomain: process.env.BACK_OFFICE,
                virtualDomain: process.env.HOST,
                frontDomain: process.env.FRONTEND,

                // SNS
                tosspayClientKey: process.env.TOSSPAY_CLIENT_KEY,
                tosspaySecretKey: process.env.TOSSPAY_SECRET_KEY,
                kakaoLoginAppId: process.env.KAKAO_LOGIN_APP_ID,
                kakaoLoginCallback: '/user/sns/kakao-callback',
                kakaoRestApiKey: process.env.KAKAO_REST_API_KEY,
                facebookLoginAppId: '401997661768610',
                naverLoginAppId: process.env.NAVER_LOGIN_APP_ID,
                naverClientSecret: process.env.NAVER_CLIENT_SECRET,
                naverLoginCallback: '/user/sns/naver-callback',
                appleClientId: process.env.APPLE_CLIENT_ID,
                appleRedirectUri: process.env.APPLE_REDIRECT_URI,
                appleClientSecret: process.env.APPLE_CLIENT_SECRET,
                appleMypageRedirectUri: process.env.APPLE_MYPAGE_REDIRECT_URI,
                appleTeamId: process.env.APPLE_TEAM_ID,
                noImage: '/static/images/no_content.png',
                loadingImage: '/static/images/loadingpage.gif'
            },
            const: {
                SALESON_ID: 'salesonId',
                TOKEN: 'token',
                TOKEN_STATUS: 'tokenStatus',
                TOKEN_TYPE: 'tokenType',
                CATEGORY: 'categories',
                CATEGORY_UPDATED_DATE: 'categoryUpdatedDate',
                SAVED_LOGIN_ID: 'savedLoginId',
                CAMPAIGN_CODE: 'campaignCode',
                VISIT: 'visit',
                VISIT_EXPIRE_DATE: 'visitExpireDate',
                LATELY_ITEM: 'latelyItem',
                LATELY_SEARCH: 'latelySearch',
                BUY_ORDER: 'buyOrder',
                KAKAO_SHARE_INIT_FLAG: 'kakaoShareInitFlag',
                GNB_MENU_TARGET: 'gnbMenuTarget',
                LOGIN_MESSAGE:'로그인 하셔야 본 서비스를\n이용하실 수 있습니다.\n로그인 페이지로 이동하시겠습니까?',
            },

            requestContext: {},
            pages: {
                INDEX: "/",
                LOGIN: "/user/login",
                FIND_ID_PW: "/user/find-idpw",
                JOIN: "/user/join",
                JOIN_COMPLETE: "/user/join-complete",
                SLEEP_USER: "/user/sleep-user",
                EXPIRED_PASSWORD: "/user/expired-password",
                TEMP_PASSWORD: "/user/change-password",
                MYPAGE_ORDER: "/mypage/order",

                /**
                 * 비회원 접속이 가능한 페이지인가?
                 * @returns {boolean}
                 */
                isAllowAnonymous() {
                    let allowAnonymous = [
                        $s.pages.LOGIN,
                        $s.pages.FIND_ID_PW,
                        $s.pages.JOIN,
                        $s.pages.JOIN_COMPLETE,
                        $s.pages.SLEEP_USER,
                        $s.pages.EXPIRED_PASSWORD,
                        $s.pages.TEMP_PASSWORD
                    ];
                    let requestUri = $s.requestContext.requestUri;
                    let isMatched = false;

                    for (let i = 0; i < allowAnonymous.length; i++) {
                        if (allowAnonymous[i] == requestUri) {
                            isMatched = true;
                            break;
                        }
                    }

                    return isMatched;
                },
            },
            initVueModule(vue) {
                $s.store = vue.$store;
                $s.auth = vue.$auth;
                $s.axios = vue.$axios;
                $s.router = vue.$router;
            },
            init(options) {
                $api = $s.api;
                $c = $s.const;
                $p = $s.pages;

                $s.core.setState('mobileFlag', navigator.userAgent.indexOf("Mobi") > -1);

                $s.core.setState($s.const.GNB_MENU_TARGET, '');

                this.requestContext = this.core.parseUrl(location.href);

                $s.debug(this.requestContext);

                // 인증설정
                try {

                    let isLoginPage = false;
                    let isGuestLoginPage = false;

                    if (typeof options != 'undefined') {
                        try {
                            isLoginPage = options.loginPage;
                            isGuestLoginPage = options.guestLoginPage;
                        } catch (e) {
                        }
                    }

                    $s.setCampaignCode();


                    /*$s.ev.init();*/

                    /*if ($s.isLogin()) {
                        try {
                            $s.api.getSessionTimeout(function(data) {
                                try {
                                    let timeout = data.timeout;
                                    if (timeout > 0) {

                                        timeout = 1;

                                        setTimeout(function() {
                                            $s.logout();
                                        }, timeout * 1000 * 60);
                                    }
                                } catch (e){}
                            },function(error) {
                                $s.error(error);
                            });
                        } catch (e) {
                            console.log(e);
                        }

                    }*/

                } catch (e) {
                    this.handleException(e);
                    return;
                }
            },
            cleanToken() {
                $s.auth.setUserToken(null);
            },
            setToken(token) {

                $s.auth.setUserToken(token);

            },
            getHashInBase64(hmacMessage) {
                let hash = cryptoJS.HmacSHA256(hmacMessage, $s.config.apiDomain);
                return cryptoJS.enc.Base64.stringify(hash);
            },

            logout(url) {

                $s.auth.logout().then(function () {
                    $s.core.setState($s.const.SALESON_ID, null);

                    $s.auth.logout().then(function () {
                        if (typeof url != 'undefined' && url !== '') {
                            $s.redirect(url);
                        } else {
                            $s.redirect($s.pages.INDEX);
                        }
                    });
                });
            },

            isLogin() {
                return $s.core.isAuthenticated() && 'ROLE_USER' === $s.core.getTokenType();
            },

            isGuestLogin() {
                return $s.core.isAuthenticated() && 'ROLE_GUEST' === $s.core.getTokenType();
            },

            authenticationException(msg) {
                let err = {
                    exception: 'AuthenticationException',
                    message: msg
                };
                $s.debug(err);
                throw JSON.stringify(err);
            },
            exception(msg) {
                let err = {
                    exception: 'Exception',
                    message: msg
                };
                $s.debug(err);
                throw JSON.stringify(err);
            },
            notFoundException(msg) {
                let err = {
                    exception: 'PageNotFoundException',
                    message: msg
                };
                $s.debug(err);
                location.replace('/public/error/404.html');
                throw JSON.stringify(err);
            },

            handleException(e) {
                this.log("[handleException] " + e);

                try {
                    let ex = JSON.parse(e);

                    if ('AuthenticationException' === ex.exception) {
                        //alert(ex.message);
                        this.redirect($s.pages.LOGIN + "?target=" + encodeURIComponent($s.requestContext.requestFullUri));
                        return;
                    }
                    if ('PageNotFoundException' === ex.exception) {
                        //alert(ex.message);
                        location.replace('/public/error/404.html');
                        return;
                    } else {
                        this.error(ex);
                    }

                } catch (e) {
                    this.error(e);
                }

            },

            alert(message, callback, showCloseButton) {
                // 임시
                //alert(message);
                let msg = message;

                showCloseButton = showCloseButton == null ? true : showCloseButton;

                try {
                    msg = message.replace(/\n/g, "<br />");
                } catch(err) {
                    console.warn(err.message);
                }
                const options = {
                    message: msg,
                    callback: callback,
                    alertType: 'ALERT',
                    showCloseButton: showCloseButton
                }
                $nuxt.$emit('showAlert', options);
            },
            confirm(message, callback, cancelCallback, showCloseButton) {
                showCloseButton = showCloseButton == null ? true : showCloseButton;
                const msg = message == null ? message: message.replace(/\n/g, "<br />");
                const options = {
                    message: msg,
                    callback: callback,
                    cancelCallback: cancelCallback,
                    alertType: 'CONFIRM',
                    showCloseButton: showCloseButton
                }
                $nuxt.$emit('showAlert', options);
            },

            closeAlert() {
                $nuxt.$emit('hideAlert');
            },

            callbackAlert() {


            },

            toast(message) {
                $nuxt.$emit("showToast", message);
            },

            log(message) {
                console.log("[SALESON] LOG - " + message);
            },
            debug(message) {
                console.debug("[SALESON] DEBUG - " + message);
            },
            error(message) {
                console.error("[SALESON] ERROR - " + message);
            },
            redirect(uri) {
                location.href = uri;
            },
            reload() {
                location.reload();
            },

            addZero(y, s) {
                let stringValue = "" + y;
                if (s > stringValue.length) {
                    for (let i = 0; i < s - stringValue.length; i++) y = "0" + y;
                }

                return y.toString();
            },
            DateEvent: {
                set(element, character, sInput, eInput) {
                    sInput = sInput == undefined ? 'input[name="startDate"]' : sInput;
                    eInput = eInput == undefined ? 'input[name="endDate"]' : eInput;
                    character = character == undefined ? '' : character;
                    if ($(element).length > 0 && $(sInput).length > 0 && $(eInput).length > 0) {
                        let date = new Date();
                        let eDate = date.getFullYear() + character + $s.addZero((date.getMonth() + 1), 2) + character + $s.addZero(date.getDate(), 2);
                        $(element).change(function (e) {
                            let val = e.target.value;
                            let step = undefined;
                            let mode = 'today';

                            if  ('' == val || 'clear' == val ) {
                                $(sInput).val('');
                                $(eInput).val('');
                            } else {

                                if (val.indexOf('week-') == 0) {
                                    step = val.replace('week-', '');
                                    mode = 'week';
                                } else if (val.indexOf('day-') == 0) {
                                    step = val.replace('day-', '');
                                    mode = 'day';
                                } else if (val.indexOf('month-') == 0) {
                                    step = val.replace('month-', '');
                                    mode = 'month';
                                } else if (val.indexOf('year-') == 0) {
                                    step = val.replace('year-', '');
                                    mode = 'year';
                                } else if (val.indexOf('clear-') == 0) {
                                    $(sInput).val('');
                                    $(eInput).val('');
                                } else { // today
                                    $(sInput).val(eDate);
                                    $(eInput).val(eDate);
                                }
                                $(sInput).val($s.DateEvent.getDiffDate(mode, step, character));
                                $(eInput).val(eDate);
                            }

                        });
                    }
                },
                // 날짜를 계산해서 리턴..
                getDiffDate: function getDiffDate(mode, value, character) {
                    let date = new Date();
                    if (mode == 'week') {
                        date.setDate(date.getDate() - (value * 7));
                    } else if (mode == 'day') {
                        date.setDate(date.getDate() - value);
                    } else if (mode == 'month') {
                        date.setMonth(date.getMonth() - value);
                    } else if (mode == 'year') {
                        date.setFullYear(date.getFullYear() - value);
                    }
                    return date.getFullYear() + character + $s.addZero((date.getMonth() + 1), 2) + character + $s.addZero(date.getDate(), 2);
                }
            },
            isMobile() {
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
                    //return navigator.userAgent.indexOf("Mobi") > -1;
                if (process.server) {
                    return false;
                }
                return $s.core.getState('mobileFlag');
            },

            setCampaignCode() {
                let code = $s.core.getParameter("campaign_code");

                if (code != '') {
                    $s.core.setState($s.const.CAMPAIGN_CODE, code);
                }
            },

            getCampaignCode() {
                return $s.core.getState($s.const.CAMPAIGN_CODE);
            },

            getCookie: function(name) {
                name = name + "=";
                let decodedCookie = decodeURIComponent(document.cookie);
                let ca = decodedCookie.split(';');
                for(let i = 0; i <ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }
        };

        $s.core = {
            const: {
                TOKEN: 'token'
            },


            authenticationContext: {},
            authenticationFilter(guestHandler, authHandler) {
                // 인증정보 처리
                if ($s.isLogin()) {
                    this.authenticationContext.accessToken = $s.core.getToken();
                    //$s.log("authContext : " + JSON.stringify(this.authenticationContext));

                    if (this.isFunction(authHandler)) {
                        authHandler();
                    }

                } else {
                    if (this.isFunction(guestHandler)) {
                        guestHandler();
                    }

                }


            },
            isAuthenticated() {
                return $s.auth.loggedIn;
            },
            isFunction(func) {
                return func != null && typeof func === 'function';
            },
            getToken() {
                return $s.auth.strategy.token.get()
            },
            getTokenType() {

                try {
                    if ($s.core.isAuthenticated()) {
                        const user = $s.auth.user;
                        if (typeof user != 'undefined' && user != null) {
                            const type = user.loginType;
                            if (typeof type != 'undefined' && type != null && type != '') {
                                return type;
                            }
                        }
                    }
                } catch (e) {}
                return '';
            },
            getState(key) {
                let states = $s.store.getters['get'];
                return states[key];
            },
            setState(key, value) {
                $s.store.commit(key, value);
            },
            parseUrl(url) {
                let parser = document.createElement("a");
                parser.href = url;

                // IE 8 and 9 dont load the attributes "protocol" and "host" in case the source URL
                // is just a pathname, that is, "/example" and not "http://domain.com/example".
                parser.href = parser.href;

                // IE 7 and 6 wont load "protocol" and "host" even with the above workaround,
                // so we take the protocol/host from window.location and place them manually
                if (parser.host === "") {
                    let newProtocolAndHost = window.location.protocol + "//" + window.location.host;
                    if (url.charAt(1) === "/") {
                        parser.href = newProtocolAndHost + url;
                    } else {
                        // the regex gets everything up to the last "/"
                        // /path/takesEverythingUpToAndIncludingTheLastForwardSlash/thisIsIgnored
                        // "/" is inserted before because IE takes it of from pathname
                        let currentFolder = ("/" + parser.pathname).match(/.*\//)[0];
                        parser.href = newProtocolAndHost + currentFolder + url;
                    }
                }

                // copies all the properties to this object
                let properties = ['host', 'hostname', 'hash', 'href', 'port', 'protocol', 'search'];
                for (let i = 0, n = properties.length; i < n; i++) {
                    this[properties[i]] = parser[properties[i]];
                }

                // pathname is special because IE takes the "/" of the starting of pathname
                this.pathname = (parser.pathname.charAt(0) !== "/" ? "/" : "") + parser.pathname;

                // requestUri
                this.requestUri = this.pathname;
                this.requestFullUri = this.pathname + this.search;

                return this;
            },

            getParameter(name) {
                name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
                let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
                let results = regex.exec(location.search);
                return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
            },

            salesonId() {

            },
            getCircuitBreaker(axios, option) {

                if (typeof CircuitBreaker !== undefined && typeof axios !== undefined) {

                    if (typeof option === undefined || option == null) {
                        option = {
                            timeout: 3000,
                            errorThresholdPercentage: 50,
                            resetTimeout: 30000,
                        };
                    }

                    return new CircuitBreaker(axios,option);
                }

                return;
            }
        };

        $s.validator = {
            patterns: {
                number: /^[\-|0-9]+$/,
                number_negative: /^(0|[-]?[1-9][0-9]*)+$/,
                number_comma: /^[0-9\,]+$/,
                number_only: /^[0-9]+$/,
                minlength: /^[0-9]+$/,
                length: /^[0-9]+$/,
                min: /^[0-9]+$/,
                max: /^[0-9]+$/,
                korean: /^[가-힝]+$/,
                phone: /^0\d{2}[-]{0,1}\d{3,4}[-]{0,1}\d{4}$/,
                tel: /^\d{0,3}[-]{0,1}\d{3,4}[-]{0,1}\d{4}$/,
                last_phone: /^\d{3,4}[-]{0,1}\d{4}$/,
                date: /^\d{1,4}\d((0?\d)|(1[012]))\d([012]?\d|30|31)$/,
                email: /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,3}$/,
                first_email: /^([0-9a-zA-Z_\.-]+)$/,
                last_email: /^([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,3}$/,
                emailAt : /^@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,3}$/,
                id: /^([a-z]{1})([0-9a-z_@\.\-]{5,29})$/,
                password: /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,20}$/,
                emoji: /^[^\uD83C-\uDBFF\uDC00-\uDFFF]+$/
            },
            messages: {
                number: '숫자로만 입력해 주세요.',
                number_negative: '숫자로만 입력해 주세요.',
                number_comma: '숫자로만 입력해 주세요.',
                number_only: '숫자로만 입력해 주세요.',
                korean: '한글로만 입력해 주세요.',
                phone: '정확히 입력해 주세요.',
                tel: '정확히 입력해 주세요.',
                last_phone: '7~8자리의 숫자만 입력해 주세요.',
                date: '날짜 형식을 YYYYMMDD 형태로 정확히 입력해 주세요.',
                email: '이메일 주소를 정확히 입력해 주십시오.',
                first_email: '이메일 처음 부분에 한글을 입력할 수 없습니다.',
                last_email: '이메일 마지막 부분에 한글을 입력할 수 없습니다.',
                id: '아이디는 영문으로 시작하고, 영문(소문자), 숫자, 특수문자("@","-","_",".") 조합으로 6~30글자로 입력해 주십시오.',
                password: '비밀번호는 영문/숫자/특수문자를 혼합하여 8자 이상 20자 이하로 입력하세요.',
                password_confirm: '비밀번호가 일치하지 않습니다.',
                emoji: '에는 이모티콘을 추가할 수 없습니다.'
            }
        };

        $s.ev = {
            const: {
                EVENT_VIEW_UID : '_FRONTEND_EVENT_VIEW_UID',
                EVENT_VIEW_QUERY_STRING : '_FRONTEND_EVENT_VIEW_QUERY_STRING'
            },
            init() {

                let uid = $s.ev.getUid();

                if (typeof uid == 'undefined' || uid == '') {

                    let paramUid = $s.core.getParameter('uid');

                    if (typeof paramUid != 'undefined' && paramUid != '') {
                        set($s.ev.const.EVENT_VIEW_UID, paramUid);

                        let queryString = $s.ev.getQueryString();

                        if (typeof queryString == 'undefined' || queryString == '' ) {
                            let qs = location.search.replace('?','');
                            set($s.ev.const.EVENT_VIEW_QUERY_STRING, qs);
                        }
                    }
                }

                function set(cname, cvalue) {
                    let time = 30 * 60 * 1000,
                        d = new Date();

                    d.setTime(d.getTime() + time);

                    let expires = "expires="+ d.toUTCString();

                    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                }
            },
            getUid() {
                return $s.getCookie($s.ev.const.EVENT_VIEW_UID);
            },
            getQueryString() {
                return $s.getCookie($s.ev.const.EVENT_VIEW_QUERY_STRING);
            },
            log : {
                api(url, params, callback) {
                    $s.axios
                        .post(url, params)
                        .then(function (response) {
                            callback(response.data);
                        })
                        .catch(function (error) {})
                },
                getParamMap() {

                    return make($s.ev.getQueryString());

                    function make(qs) {
                        let map = [];

                        if (typeof qs != 'undefined' && qs != null) {
                            let params = qs.split('&');

                            for (let i=0; i<params.length; i++) {

                                let param = params[i],
                                    array = param.split('=');

                                if (typeof array != 'undefined' && array != null) {
                                    if (array.length == 2) {
                                        map[array[0]]= array[1];
                                    }else if (array.length == 1) {
                                        map[array[0]]= '';
                                    }
                                }
                            }
                        }

                        return map;
                    }
                },
                getParamValue(map, key) {
                    let value = map[key];
                    return typeof value == 'undefined' || value == null ? '' : value;
                },
                getLog(id, items) {
                    let paramMap = $s.ev.log.getParamMap();

                    let log = {
                        eventCode : $s.ev.log.getParamValue(paramMap, 'ec'),
                        uid : $s.ev.getUid(),
                        sourceUserId : $s.ev.log.getParamValue(paramMap, 'source_user_id'),
                        utmSource : $s.ev.log.getParamValue(paramMap, 'utm_source'),
                        utmMedium : $s.ev.log.getParamValue(paramMap, 'utm_medium'),
                        utmCampaign : $s.ev.log.getParamValue(paramMap, 'utm_campaign'),
                        utmItem : $s.ev.log.getParamValue(paramMap, 'utm_item'),
                        utmContent : $s.ev.log.getParamValue(paramMap, 'utm_content')
                    };

                    if (typeof id != 'undefined' && id != null) {
                        log['id'] = id;
                    }

                    if (typeof items != 'undefined' && items != null && Array.isArray(items)) {
                        log['items'] = items;
                    }

                    return log;
                },
                item(itemUserCode) {

                    try {
                        let params = $s.ev.log.getLog(itemUserCode);

                        $s.ev.api('/api/event-log/item', params);
                    } catch (e) {

                    }


                },
                order(orderCode, itemUserCodes) {



                    try {
                        let params = $s.ev.log.getLog(orderCode, itemUserCodes);

                        $s.ev.api('/api/event-log/order', params);
                    } catch (e) {

                    }
                },
                featured(itemUserCodes) {

                    let params = $s.ev.log.getLog('', itemUserCodes);

                    $s.ev.api('/api/event-log/featured', params);
                },
                joinUser(userId) {

                    console.log('joinUser', userId);

                    let params = $s.ev.log.getLog(userId);

                    $s.ev.api('/api/event-log/join-user', params);

                }
            }
        }

    }
}