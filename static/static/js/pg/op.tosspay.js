var TossPay = {
    TOSS_PAYMENTS : {},
    data : {
        TOSS_URL : "https://js.tosspayments.com/v1/payment",
        PAYMENT_TYPE : ["CARD","TOSSPAY","VIRTUAL_ACCOUNT","TRANSFER","MOBILE_PHONE","CULTURE_GIFT_CERTIFICATE","BOOK_GIFT_CERTIFICATE","GAME_GIFT_CERTIFICATE"],
        EASY_PAY : ["NAVERPAY", "KAKAOPAY"],
        CHECKED_EASY_PAY : '',
        CHECKED_TYPE : '',   // 선택 된 결제방법 ex) CARD
        ADD_SUC_PARAM : '',
        USE_ESCROW : false,  // 에스크로
        CASH_RECEIPT_TYPE : '소득공제',
        VALIDHOURS : 24,
    },
    urlInit : () => {
        let script = document.createElement('script');
        script.src = TossPay.data.TOSS_URL;
        document.body.appendChild(script);
    },
    module : () => {
        const TOSS_ERROR_CODE = {
            ALREADY_PROCESSED_PAYMENT : "이미 처리된 결제 입니다.",
            EXCEED_MAX_CARD_INSTALLMENT_PLAN : "설정 가능한 최대 할부 개월 수를 초과했습니다.",
            NOT_ALLOWED_POINT_USE : "포인트 사용이 불가한 카드로 카드 포인트 결제에 실패했습니다.",
            INVALID_REJECT_CARD : "카드 사용이 거절되었습니다. 카드사 문의가 필요합니다.",
            BELOW_MINIMUM_AMOUNT : "신용카드는 결제금액이 100원 이상, 계좌는 200원이상부터 결제가 가능합니다.",
            INVALID_CARD_EXPIRATION : "카드 정보를 다시 확인해주세요. (유효기간)",
            INVALID_STOPPED_CARD : "정지된 카드 입니다.",
            EXCEED_MAX_DAILY_PAYMENT_COUNT : "하루 결제 가능 횟수를 초과했습니다.",
            NOT_SUPPORTED_INSTALLMENT_PLAN_CARD_OR_MERCHANT : "할부가 지원되지 않는 카드 또는 가맹점 입니다.",
            INVALID_CARD_INSTALLMENT_PLAN : "할부 개월 정보가 잘못되었습니다.",
            NOT_SUPPORTED_MONTHLY_INSTALLMENT_PLAN : "할부가 지원되지 않는 카드입니다.",
            EXCEED_MAX_PAYMENT_AMOUNT : "하루 결제 가능 금액을 초과했습니다.",
            INVALID_CARD_LOST_OR_STOLEN : "분실 혹은 도난 카드입니다.",
            RESTRICTED_TRANSFER_ACCOUNT : "계좌는 등록 후 12시간 뒤부터 결제할 수 있습니다. 관련 정책은 해당 은행으로 문의해주세요.",
            NOT_REGISTERED_BUSINESS : "등록되지 않은 사업자 번호입니다.",
            EXCEED_MAX_ONE_DAY_WITHDRAW_AMOUNT : "1일 출금 한도를 초과했습니다.",
            EXCEED_MAX_ONE_TIME_WITHDRAW_AMOUNT : "1회 출금 한도를 초과했습니다.",
            CARD_PROCESSING_ERROR : "카드사에서 오류가 발생했습니다.",
            EXCEED_MAX_AMOUNT : "거래금액 한도를 초과했습니다.",
            REJECT_ACCOUNT_PAYMENT : "잔액부족으로 결제에 실패했습니다.",
            REJECT_CARD_PAYMENT : "한도초과 혹은 잔액부족으로 결제에 실패했습니다.",
            REJECT_CARD_COMPANY : "결제 승인이 거절되었습니다.",
            REJECT_TOSSPAY_INVALID_ACCOUNT : "선택하신 출금 계좌가 출금이체 등록이 되어 있지 않아요. 계좌를 다시 등록해 주세요.",
            EXCEED_MAX_AUTH_COUNT : "최대 인증 횟수를 초과했습니다. 카드사로 문의해주세요.",
            EXCEED_MAX_ONE_DAY_AMOUNT : "일일 한도를 초과했습니다.",
            INVALID_PASSWORD : "결제 비밀번호가 일치하지 않습니다.",
            NOT_FOUND_PAYMENT_SESSION : "결제 시간이 만료되어 결제 진행 데이터가 존재하지 않습니다.",
            UNKNOWN_PAYMENT_ERROR : "결제에 실패했어요. 같은 문제가 반복된다면 은행이나 카드사로 문의해주세요.",

            ALREADY_CANCELED_PAYMENT : "이미 취소된 결제 입니다.",
            INVALID_REFUND_ACCOUNT_INFO : "환불 계좌번호와 예금주명이 일치하지 않습니다.",
            EXCEED_CANCEL_AMOUNT_DISCOUNT_AMOUNT : "즉시할인금액보다 적은 금액은 부분취소가 불가능합니다.",
            INVALID_REQUEST : "잘못된 요청입니다.",
            INVALID_REFUND_ACCOUNT_NUMBER : "잘못된 환불 계좌번호입니다.",
            INVALID_BANK : "유효하지 않은 은행입니다.",
            NOT_MATCHES_REFUNDABLE_AMOUNT : "잔액 결과가 일치하지 않습니다.",
            PROVIDER_ERROR : "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            NOT_CANCELABLE_AMOUNT : "취소 할 수 없는 금액 입니다.",
            NOT_CANCELABLE_PAYMENT : "취소 할 수 없는 결제 입니다.",
            EXCEED_MAX_REFUND_DUE : "환불 가능한 기간이 지났습니다.",
            NOT_ALLOWED_PARTIAL_REFUND : "에스크로 주문, 현금 카드 결제일 때는 부분 환불이 불가합니다. 이외 다른 결제 수단에서 부분 취소가 되지 않을 때는 토스페이먼츠에 문의해 주세요.",
            NOT_AVAILABLE_BANK : "은행 서비스 시간이 아닙니다.",
            NOT_CANCELABLE_PAYMENT_FOR_DORMANT_USER : "휴면 처리된 회원의 결제는 취소할 수 없습니다.",
            FAILED_REFUND_PROCESS : "은행 응답시간 지연이나 일시적인 오류로 환불요청에 실패했습니다.",
            FAILED_METHOD_HANDLING_CANCEL : "취소 중 결제 시 사용한 결제 수단 처리과정에서 일시적인 오류가 발생했습니다.",
            FAILED_PARTIAL_REFUND : "은행 점검, 해약 계좌 등의 사유로 부분 환불이 실패했습니다.",
            FAILED_PAYMENT_INTERNAL_SYSTEM_PROCESSING : "결제가 완료되지 않았어요. 다시 시도해주세요."
        }
        function validObject(data){
            return typeof data != 'undefined' && data != null;
        }
        function validPaymentType(type){
            TossPay.data.CHECKED_EASY_PAY = '';
            switch(type) {
                case 'vbank':
                    TossPay.data.CHECKED_TYPE = 'VIRTUAL_ACCOUNT';
                    break;
                case 'hp':
                    TossPay.data.CHECKED_TYPE = 'MOBILE_PHONE';
                    break;
                case 'realtimebank':
                    TossPay.data.CHECKED_TYPE = 'TRANSFER';
                    break;
                case 'naver':
                    TossPay.data.CHECKED_TYPE = 'CARD';
                    TossPay.data.CHECKED_EASY_PAY = 'NAVERPAY';
                    break;
                case 'kakao':
                    TossPay.data.CHECKED_TYPE = 'CARD';
                    TossPay.data.CHECKED_EASY_PAY = 'KAKAOPAY';
                    break;
                default:
            }
            if(!TossPay.data.PAYMENT_TYPE.includes(TossPay.data.CHECKED_TYPE.toUpperCase())
                && !TossPay.data.EASY_PAY.includes(TossPay.data.CHECKED_EASY_PAY.toUpperCase())){
                alert("결제방법을 확인해주세요.");
                return false;
            }
            return true;
        }
        return {
            tossObject : (pgData) => {
                if(validObject(pgData)){
                    TossPay.data.USE_ESCROW = pgData.USE_ESCROW;
                    return TossPay.module().payTypeObject({
                        amount : pgData.AMOUNT,
                        taxFreeAmount : pgData.TAX_FREE_AMOUNT,
                        orderId : pgData.ORDER_CODE,
                        orderName : pgData.LGD_PRODUCTINFO,
                        customerName : pgData.CUSTOMER_NAME,
                        customerEmail : pgData.CUSTOMER_EMAIL,
                        successUrl : pgData.SUCCESS_URL+TossPay.data.ADD_SUC_PARAM,
                        failUrl : pgData.FAIL_URL
                    })
                }
            },
            payTypeObject : (obj) => {
                let payTypeObj = new Object();
                if(TossPay.data.CHECKED_TYPE == "VIRTUAL_ACCOUNT"){
                    // 가상계좌타입
                    payTypeObj = {
                        ...obj
                        , validHours : TossPay.data.VALIDHOURS
                        , cashReceipt : {
                            type: TossPay.data.CASH_RECEIPT_TYPE
                        }
                    };
                    // 에스크로 사용인 경우만 설정
                    if(TossPay.data.USE_ESCROW){
                        payTypeObj['useEscrow'] = TossPay.data.USE_ESCROW;
                    }
                } else if(TossPay.data.EASY_PAY.includes(TossPay.data.CHECKED_EASY_PAY)){
                    // 간편결제타입
                    payTypeObj = {
                        ...obj
                        , flowMode: 'DIRECT'
                        , easyPay : TossPay.data.CHECKED_EASY_PAY
                    };
                } else if(TossPay.data.CHECKED_TYPE == "TRANSFER"){
                    // 계좌이체
                    payTypeObj = {
                        ...obj
                        , cashReceipt : {
                            type: TossPay.data.CASH_RECEIPT_TYPE
                        }
                    };
                    // 에스크로 사용인 경우만 설정
                    if(TossPay.data.USE_ESCROW){
                        payTypeObj['useEscrow'] = TossPay.data.USE_ESCROW;
                    }
                } else {
                    payTypeObj = obj;
                }
                return payTypeObj;
            },
            pay : (data, callback) => {
                if(validPaymentType(TossPay.data.CHECKED_TYPE)){
                    let to = TossPay.module().tossObject(data);
                    TossPay.TOSS_PAYMENTS.requestPayment(TossPay.data.CHECKED_TYPE, to)
                    .catch(callback);
                }
            },
            error : (data) => {
                if(data.code == 'USER_CANCEL'){
                    // 결제 고객이 결제창을 닫았을 때 에러 처리
                    alert(data.message);
                } else if(data.code == 'INVALID_CARD_COMPANY'){
                    // 유효하지 않은 카드 코드에 대한 에러 처리
                    alert(data.message);
                } else if(data.code == 'INVALID_REQUEST'){
                    // 필수 파라미터 누락
                    alert(data.message);
                }
            },
            getErrorMsg : (code) => {
                return TOSS_ERROR_CODE[code];
            }
        }
    }
};