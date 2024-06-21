export default function ({store, redirect, route}) {

    const exceptionRoutePath = [
        '/user/modify',
        '/user/my-info-edit',
        '/user/change-password',
        '/user/expired-password',
        '/user/sleep-user',
        '/user/login'
    ];

    const targetUrl = (store) => {

        if (store.$auth.user.sleepUserFlag){
            return {
                url : "/user/sleep-user",
                msg : "휴면 전환된 계정입니다.",
                status : true
            };
        } else if (store.$auth.user.tempPasswordFlag){
            return {
                url : "/user/change-password",
                msg : "비밀번호를 변경해주세요.",
                status : true
            };
        } else if (store.$auth.user.expiredPasswordFlag){
            return {
                url : "/user/expired-password",
                msg : "패스워드 기간이 만료 되었습니다.",
                status : true
            };
        }
        return {
            url : "/",
            msg : "",
            status : false
        };
    }

    if (exceptionRoutePath.includes(route.path)) {
        return;
    }

    if (store.$auth.loggedIn) {
        // 로그인 상태인데 path 가 해당페이지가 아니라면
        if (!exceptionRoutePath.includes(route.path)){
            let target = targetUrl(store);
            if (target.status){
                redirect(targetUrl(store).url);
            }
        } else {
            // 로그인 상태이고 해당페이지 라면
            let target = targetUrl(store);
            if (target.msg != null){
                alert(target.msg);
            }
            redirect(target.url);
        }
    }


}
