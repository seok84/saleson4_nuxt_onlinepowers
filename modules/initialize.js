import Vue from 'vue';
import Mixin from '@/modules/op.vue.js';
import Saleson from '@/modules/op.saleson.js';
import CryptoJS from 'crypto-js';
import CircuitBreaker from 'opossum';


// mixin이 적용된 컴포넌트의 라이프사이클 훅에서 추가한 함수가 실행됩니다
Vue.mixin(Mixin);

// 플러그인 전역등록
Vue.use(Saleson, {cryptoJS: CryptoJS, circuitBreaker: CircuitBreaker});
