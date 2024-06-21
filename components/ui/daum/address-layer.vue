<template>
    <div id="daumModal" class="modal fade p_title">
        <div class="dimmed-bg"></div>
        <div class="modal-wrap modal-dialog-centered">
            <div id="layerDaumAddr" class="modal-content">
                <div class="modal-header">
                    <h3 class="modal_tit">우편번호 찾기</h3>
                </div>
                <div class="modal-body" id="daumAddr"></div>
                <button type="button" class="modal-close" data-dismiss="modal" @click="closeDaumPostcode()">
                    <span class="screen_out">닫기</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    head() {
        return {
            script: [
                { src : 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js', body : true }
            ]
        }
    },
    data () {
        return {
            param: {
                newZipcode: "",
                zipcode1: "",
                zipcode2: "",
                zipcode: "",
                sido: "",
                sigungu: "",
                eupmyeondong: "",
                jibunAddress: "",
                jibunAddressDetail: "",
                roadAddress: "",
                buildingCode: ""
            }
        }
    },
    methods: {
        openDaumAddress(callBack, type) {
            let perant_element_layer = document.getElementById('layerDaumAddr');
            let element_layer = document.getElementById('daumAddr');

            let self = this;
            new daum.Postcode({
                oncomplete (data) {
                    try {
                        let post = data.postcode;
                        if (post == '') {
                            post = data.zonecode;
                        }

                        let jibunAddress = data.jibunAddress;
                        if (jibunAddress == '') {
                            jibunAddress = data.autoJibunAddress;
                        }

                        let roadAddress = data.roadAddress;
                        if (roadAddress == '') {
                            roadAddress = data.autoRoadAddress;
                        }

                        let addr = jibunAddress;
                        if(data.userSelectedType == 'R'){
                            addr = roadAddress;
                        }

                        if(data.buildingName != ''){
                            addr += ' ('+data.buildingName+')';
                            roadAddress += ' ('+data.buildingName+')';
                        }

                        self.param.newZipcode = data.zonecode;
                        self.param.zipcode = post;
                        self.param.zipcode1 = data.postcode1;
                        self.param.zipcode2 = data.postcode2;

                        self.param.sido = data.sido;
                        self.param.sigungu = data.sigungu;
                        self.param.eupmyeondong = data.bname;

                        self.param.jibunAddress = addr;

                        self.param.roadAddress = roadAddress;
                        self.param.buildingCode = data.buildingCode;

                        if (typeof callBack === 'function') {
                            callBack(self.param, type);
                        }
                    } catch (e) {
                        alert(e.message);
                    }

                    document.getElementById('daumModal').style.display = 'none';
                },
                width : '100%',
                height : '100%'
            }).embed(element_layer);

            perant_element_layer.style.display = 'block';
            element_layer.style.display = 'block';

            // var width = element_layer.offsetWidth; //우편번호서비스가 들어갈 element의 width
            let height = window.innerHeight*0.7; //우편번호서비스가 들어갈 element의 height

            // 위에서 선언한 값들을 실제 element에 넣는다.
            element_layer.style.width = '100%';
            element_layer.style.height = height + 'px';
            element_layer.style.maxHeight = '470px';
            element_layer.style.borderBottom = '1px solid';
            element_layer.style.padding = '0';

            document.getElementById("daumModal").style.display = 'flex';
        },
        closeDaumPostcode () {
            document.getElementById('daumModal').style.display = 'none';
        }
    }
}
</script>