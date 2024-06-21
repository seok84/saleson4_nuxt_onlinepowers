
let $s;
let self;
let $api;
export default {

    initSns($saleson, $salesonApi) {

        $s = $saleson;
        self = this;
        $api = $salesonApi;

    },

    loginWithSns(snsType, state, target) {
        if (snsType === "naver") {
            self.loginWithNaver(state, target);
        } else if (snsType === "kakao") {
            self.loginWithKakao(state, target);
        } else if (snsType === "apple") {
            $s.alert("애플 로그인 준비중", () => {
                location.reload();
            });
            // loginWithApple(state, target);
        }
    },


    loginWithNaver(state, target) {
        let uri = 'https://nid.naver.com/oauth2.0/authorize?' +
            'response_type=code' +                  // 인증과정에 대한 내부 구분값 code 로 전공 (고정값)
            '&client_id='+$s.config.naverLoginAppId +     // 발급받은 client_id 를 입력
            '&redirect_uri='+$s.config.frontDomain+ $s.config.naverLoginCallback + // 어플케이션에서 등록했던 CallBack URL를 입력
            '&state=' + state + "_" + target;
        // 사용자가 사용하기 편하게끔 팝업창으로 띄어준다.
        if($s.isMobile()){
            $s.redirect(uri);
        }else{
            console.log(uri, 'uri');
            window.open(uri, "Naver Login PopupScreen", "width=450, height=600");
        }
    },

    loginWithKakao(state, target) {
        // 사용할 앱의 JavaScript 키를 설정해 주세요.
        if(!Kakao.isInitialized()){
            Kakao.init($s.config.kakaoLoginAppId);
        }
        if (!$s.isMobile()) {
            // 로그인 창을 띄웁니다.
            Kakao.Auth.login({
                success (authObj) {
                    Kakao.API.request({
                        url: '/v2/user/me',
                        success (response) {
                            // 카톡 닉네임 이모티콘 제거 정규식
                            let patterns = "[\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+";
                            let nickName = response.properties.nickname;
                            nickName = nickName.replace(new RegExp(patterns),
                                '');
                            response.properties.nickname = nickName;
                            // 카카오에서 던지는 response.id값은 정수형
                            // 스크립트에서 id가 문자형으로 파싱되면서 hash값이 변경되므로 뒤에 ''를 붙여 hash값 변조를 막는다.
                            let snsUser = {
                                "email": response?.kakao_account?.email ?? '',
                                "snsId": response.id + '',
                                "snsName": response?.properties?.nickname ?? '',
                                "snsType": "kakao",
                                "state": state + "_" + target,
                                "token": ''
                            };
                            if (state == 'login' || state == 'join') {
                                self.snsLogin(snsUser);
                            } else if (state == 'connect') {
                                self.snsConnect(snsUser);
                            }
                        },
                        fail(error) {
                            console.log(JSON.stringify(error));
                        }
                    });
                },
                fail (err) {
                    $s.alert(JSON.stringify(err));
                }
            });
        } else {
            console.log("mobile: "+$s.config.frontDomain+ $s.config.kakaoLoginCallback);
            Kakao.Auth.authorize({
                redirectUri: $s.config.frontDomain+ $s.config.kakaoLoginCallback,
                state: state + "_" + target
            });
        }
    },

    //모바일
    snsUserLogin(snsUser) {
        let target = snsUser.state.split("_")[1];
        let redirectUrl = $s.pages.INDEX;

        if (target != null && target != '') {
            redirectUrl = decodeURIComponent(target);
        }
        let hashInBase64 = $s.getHashInBase64(JSON.stringify(snsUser));
        let url = '/api/auth/sns-token';
        try {
            url += '?uid='+$s.ev.getUid();
        } catch(e) {}

        $api.auth.getAuthToken(url, snsUser, hashInBase64)
        .then((response) => {
            $s.setToken(response.data.token);
            $s.redirect(redirectUrl);
        })
        .catch((error) => {
            $s.alert(error.message);
        });

    },

    snsLogin(snsUser) {
        let target = snsUser.state.split("_")[1];
        if (target == '') {
            target = '/'
        }
        debugger;
        let hashInBase64 = $s.getHashInBase64(JSON.stringify(snsUser));
        let url = '/api/auth/sns-login';
        try {
            url += '?uid='+$s.ev.getUid();
        } catch(e) {}

        $api.auth.getAuthToken(url, snsUser, hashInBase64)
        .then((response) => {
            if (response.data.value === "loginSuccess") {
                $s.setToken(response.data.token);
                if (snsUser.snsType === "naver") {
                    if ($s.isMobile()) {
                        $s.redirect(target);
                    } else {
                        opener.parent.location = target;
                        window.close();
                    }
                } else {
                    $s.redirect(target);
                }

            } else if (response.data.value === "redirectToJoin") {
                $s.alert(response.data.message,  () => {

                    let hmacMessage = JSON.stringify(snsUser);
                    $s.api.setCookie("snsUser", hmacMessage);

                    if (snsUser.snsType === "naver") {
                        if ($s.isMobile()) {
                            $s.redirect('/user/sns-auth-step2');
                        } else {
                            opener.parent.location = '/user/sns-auth-step2';
                            window.close();
                        }
                    }
                    $s.redirect('/user/sns-auth-step2');
                });

            } else if (response.data.value === "notJoinedUser") {
                $s.alert(response.data.message,  () => {
                    if (snsUser.snsType === "naver") {
                        if ($s.isMobile()) {
                            $s.redirect('/user/certify-join');
                        } else {
                            opener.parent.location = '/user/certify-join';
                            window.close();
                        }
                    }
                    $s.redirect('/user/certify-join');

                });

            } else if (response.data.value === "alreadyJoin") {
                $s.alert(response.data.message,  () => {
                    if (snsUser.snsType === "naver") {
                        if ($s.isMobile()) {
                            $s.redirect('/user/login');
                        } else {
                            opener.parent.location = '/user/login';
                            window.close();
                        }
                    }
                    $s.redirect('/user/login');
                });

            } else {
                $s.alert(response);
            }
        })
        .catch((error) => {
            $s.alert(error.message);
        });
    },


    connectSns(snsType, state, snsUserId) {
        if (snsUserId !== undefined && snsUserId > 0) {
            $s.confirm("선택하신 SNS의 연결해제를 진행하시겠습니까?", () => {
                let snsUser = {
                    "snsUserId" : snsUserId,
                    "snsType" : snsType,
                    "token" : ''
                };
                console.log(snsUser, "sadas");
                $s.api.disconnectSns(snsUser,
                     (response) => {
                        if (response.status === "00") {
                            $s.alert(response.message, () => {
                                if (response.status === "00") {
                                    location.reload();
                                }
                                $s.closeAlert();
                            });
                        } else {
                            console.log("error occurred - " + response.info.message);
                        }
                    }, (error) => {
                        console.dir(error,'error');
                        $s.alert(error);
                    }
                );
            });
        } else {
            const target = '/mypage/user/connect-sns';
            self.loginWithSns(snsType, state, target)
        }
    },


    snsConnect(snsUser) {
        $s.api.snsConnect(snsUser, (response) => {
            let info = response;
            if (info.value === "connectSuccess" || info.value === "connectAlready") {
                $s.alert(info.message,  () => {
                    if (snsUser.snsType == "naver") {
                        if (!$s.isMobile()) {
                            opener.location.reload();
                            window.close();
                        } else {
                            $s.redirect("/mypage/user/connect-sns");
                        }
                    } else if (snsUser.snsType == 'kakao') {
                        if (!$s.isMobile()) {
                            location.reload();
                        } else {
                            $s.redirect("/mypage/user/connect-sns");
                        }
                    } else if (snsUser.snsType == 'apple') {
                        if (!$s.isMobile()) {
                            location.reload();
                        } else {
                            $s.redirect("/mypage/user/connect-sns");
                        }
                    }
                });
            }
        })
    },







    loginWithApple(pageType) {
        // 사용할 앱의 JavaScript 키를 설정해 주세요.
        AppleID.auth.init({
            clientId : $s.config.appleClientId,
            scope : 'name email',
            redirectURI : $s.config.appleRedirectUri, // return urls 등록 필요(Resister Website URLs) : localhost는 허용되지 않음
            usePopup : true //or false defaults to false
        });
        //Listen for authorization success
        document.addEventListener('AppleIDSignInOnSuccess', (data) => {
            var snsUser = {
                "snsType" : "apple",
                "token" : data.detail.authorization.id_token
            };

            self.snsUserSubmit(snsUser, pageType);
        });
        //Listen for authorization failures
        document.addEventListener('AppleIDSignInOnFailure', (error) => {
            //handle error.
            $s.alert(JSON.stringify(error));
        });
    },





}

