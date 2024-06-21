import Vue from 'vue';
import { ValidationProvider, extend, ValidationObserver } from "vee-validate" // vee-validate 로 부터 사용할 기능 import
import * as rules from "vee-validate/dist/rules"
for (let rule in rules) {
    // console.log('rule: ', rule);
    // add the rule
    extend(rule, rules[rule])
}
import { required, email, alpha_num, confirmed, digits, numeric } from 'vee-validate/dist/rules';

// 필요한 유효성 검사 규칙 추가
extend('required', {
    validate(value){
        return {
            required: true,
            valid: ['', null, undefined,0].indexOf(value) === -1
        };
    },
    message: '필수 입력 항목입니다.',
});
extend('checkbox_required', {
    validate(value){
        return {
            required: true,
            valid: value === true
        };
    },
    message: '필수 입력 항목입니다.',
});

extend('checkbox_required2', {
    validate(value) {
        return {
            required : true,
            valid: value.includes('POLICY_TYPE_AGREEMENT') && value.includes('POLICY_TYPE_PROTECT_POLICY')
        }
    },
    message: '필수 약관에 동의해주세요.',
});

extend('email', {
    ...email,
    message: '이메일을 정확히 입력해 주세요.',
});

extend('alpha_num', {
    ...alpha_num,
    message: '영문+숫자 조합으로 입력해 주세요.',
});

extend('minmax', {
    validate(value, { min, max }) {
        return value.length >= min && value.length <= max;
    },
    params: ['min', 'max'],
    message: '{min}~{max}자 이내로 입력해 주세요.'
});
extend('max', {
    validate(value, { length }) {
        return value.length <= length;
    },
    params: ['length'],
    message: '{length}자리 이내로 입력해 주세요.'
});
extend('numeric', {
    message: '숫자로만 입력해 주세요.',
});
extend('confirmed', {
    message: '비밀번호가 일치하지 않습니다.',
});
extend('digits',{
    validate(value, { length }) {
        return value.length === length;
    },
    params: ['length'],
    message: '{length}자리로 입력해 주세요.'
});

extend('required_if',{
    message: '필수 입력 항목입니다.'
});

extend('loginId',{
    validate(value) {
        return value && /^(?=.*[a-z])[a-z0-9]{4,16}$/.test(value);
    },
    message: '4~16자 이내 영문 소문자, 숫자로 입력해 주세요.'
});

extend('businessNumber', {
    validate(value){
        let flag = false;
        let number = value;

        if (!number){
            return false;
        }
        var numberMap = number.split('').map(
            function (d) {
                return parseInt(d, 10);
            });

        if (numberMap.length === 10) {
            var keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
            var chk = 0;

            keyArr.forEach(function (d, i) {
                chk += d * numberMap[i];
            });

            chk += parseInt((keyArr[8] * numberMap[8]) / 10, 10);
            flag = Math.floor(numberMap[9]) === ((10 - (chk % 10)) % 10);
            if (flag){
                return true;
            }else{
                return false;
            }
        }
        return false;
    },
    message: "사업자등록번호를 '-'없이 정확히 입력해주세요."
});

extend('password1',{
    validate(password){
        const duplicateCount = 3;

        let arrayValue = password.split('');
        const length = arrayValue.length;
        let regExp;

        for (let i=0; i<length; i++) {
            let char = arrayValue[i];
            if (/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim.test(char)) {
                char = "\\" + char;
            }

            var pattern = '';
            for (var j=0; j<duplicateCount; j++) {
                pattern += char;
            }

            regExp = new RegExp(pattern);

            if (regExp.test(password)) {
                return false;
            }
        }
        return true;
    },
    message: '3자리 이상 반복된 문자, 숫자는 사용이 불가합니다.'
});

extend('password2',{
    validate(password){
        return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?])\S{10,16}$/.test(password);
    },
    message: '영문/숫자/특수문자(공백제외)를 혼합하여 10자 이상 16자 이하로 입력하세요.'
});

extend('password3',{
    validate(password){
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const custom = '1q2w3e4r5t6y7u8i9o0p1qaz2wsx';
        const consecutiveSize = 3;

        for (let i = 0; i < password.length - consecutiveSize; i++) {
            let data = password.substring(i, i+consecutiveSize);

            if (alphabet.indexOf(data) > -1) {
                return false;
            }

            if (numbers.indexOf(data) > -1) {
                return false;
            }
            if (custom.indexOf(data) > -1) {
                return false;
            }
        }
        return true;
    },
    message: '비밀번호에 4자리 이상 연속된 문자는 사용할 수 없습니다.'
});

extend('checkbox_order_terms', {
    validate(value, { type }) {
        if (type === 'PRIVACY' && !value) {
            return false;
        } else if (!value) {
            return false;
        }

        // 유효성 검사가 통과되면 true 반환
        return true;
    },
    params: ['type'],
    message: (fieldName, { type }) => {
        if (type === 'PRIVACY') {
            return '개인정보 제 3자 제공 및 수집·이용 안내를 확인 후 동의해주세요.';
        } else {
            return '구매동의 안내를 확인 후 동의해주세요';
        }
    }
});


extend('phoneNumber',{
    validate(value){
        return value && /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/.test(value);
    },
    message: '휴대폰번호를 정확히 입력해주세요. (숫자, 하이픈 없음)'
});

Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)