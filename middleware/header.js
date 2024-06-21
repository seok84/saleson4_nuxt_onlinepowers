import * as Cookies from 'js-cookie';

export default function ({req, route, store}) {

// application start
    let userAgent = '';
    if (process.server) {
        userAgent = req.headers['user-agent'];

    }
    if (process.client) {
        userAgent = navigator.userAgent || navigtor.vendor || window.opera;
    }

    if (userAgent !== '') {
        let mobileFlag = userAgent.indexOf("Mobi") > -1;
        let device = '';

        if (/SALESON_APPLICATION_ANDROID/.test(userAgent)) {
            device = 'ANDROID';
            mobileFlag = true;
        } else if (/SALESON_APPLICATION_IOS/.test(userAgent)) {
            device =  'IOS';
            mobileFlag = true;
        } else {
            if (mobileFlag) {
                device = 'MOBILE';
            } else {
                device = 'PC';
            }
        }

        store.commit('device', device);
        store.commit('mobileFlag', mobileFlag);

        let appVersion = '';
        try {
            const arrayUserAgent= userAgent.split(' ').filter(s=> {return s.includes('appver=')});

            if (arrayUserAgent.length > 0) {
                const appver = arrayUserAgent[0].trim().split('=');
                appVersion = appver[1];
            }

        } catch (e) {
            appVersion = '';
        }
        store.commit('appVersion', appVersion);
    } // application end

    const key = 'saleson.auth.redirect';
    const target = route.query.target;

    //상품 선택 시
    if ('/user/login' !== route.path) {
        Cookies.set(key, route.path);
    }

    // 로그인시 target 이 있을경우 셋팅 -> 바로구매
    if ('/user/login' === route.path) {
        try {
            const previousPage = Cookies.get(key);

            if (typeof target !== undefined && target != null && target !== '' && target !== previousPage) {
                Cookies.set(key, target);
            } else {
                Cookies.set(key, previousPage);
            }
        } catch (e) {
            Cookies.set(key, target);
        }
    }


    try {
        const path = route.path;
        const pathType = ['/mypage', '/mypage/modify', '/mypage/change-password', '/user/secede'];
        let pathValidation = false;

        pathType.forEach( type => {
            if(path.indexOf(type) >= 0) {
                pathValidation = true;
                return false;
            }
        });

        if(pathValidation) {

            const [cap, grade] = Promise.all([
                store.$axios.get("/api/mypage/coupon-and-point"),
                store.$axios.get("/api/mypage/grade")
            ]).then(function(response){
                const cap = response[0].data;
                const grade = response[1].data;

                store.commit('setPoint', cap.point);
                store.commit('setCouponCount', cap.couponCount);
                store.commit('setShippingCouponCount', cap.shippingCouponCount);

                store.commit('setGrade', grade.userLevel);

            }).catch(function(error) {
                console.error('Error mypage header', error);
            });
        }
    }catch (error){
        console.log(error,'error');
    }
}