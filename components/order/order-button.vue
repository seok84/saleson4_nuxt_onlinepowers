<template>
    <div class="btn-wrap">
        <template v-if="item.orderStatus == '0'">
            <div class="box">
                <button type='button' class="btn btn-default btn-middle btn-cancel" @click="openPopup('orderCancel', item.itemSequence)">주문취소</button>
            </div>
        </template>
        <template v-if="item.orderStatus == '10' || item.orderStatus == '15'">
            <div class="box">
                <button type='button' class="btn btn-default btn-middle btn-cancel" @click="openPopup('cancel', item.itemSequence)">주문취소</button>
            </div>
        </template>
        <template v-if="item.orderStatus == '30' || item.orderStatus == '35' || item.orderStatus == '55' || item.orderStatus == '59' || item.orderStatus == '69'">
            <div class="box">
                <button type='button' class="btn btn-primary btn-middle" @click="openPopup('confirm', item.itemSequence)">구매확정</button>
                <template v-if="item.deliveryNumber == null">
                    <button type='button' class="btn btn-primary-line btn-middle">직접수령</button>
                </template>
                <template v-else>
                    <button type='button' class="btn btn-primary-line btn-middle" @click="deliveryLink(item.deliveryCompanyUrl, item.deliveryNumber)">배송조회</button>
                </template>
            </div>
            <div class="box" v-if="item.itemReturnFlag != 'N'">
                <button type='button' class="btn btn-default btn-middle" @click="openPopup('exchange', item.itemSequence)">교환신청</button>
                <button type='button' class="btn btn-default btn-middle" @click="openPopup('return', item.itemSequence)">반품신청</button>
            </div>
        </template>
        <template v-if="item.orderStatus == '40'">
            <div class="box">
                <template v-if="item.writeReviewFlag">
                    <button type="button" class="btn btn-primary btn-middle btn-review" @click="openPopup('review', item.itemSequence)">후기작성</button>
                </template>
                <button type='button' class="btn btn-primary-line btn-middle" @click="deliveryLink(item.deliveryCompanyUrl, item.deliveryNumber)">배송조회</button>
            </div>
            <div class="box">
                <button type='button' class="btn btn-default btn-middle" @click="openPopup('exchange', item.itemSequence)">교환신청</button>
                <button type='button' class="btn btn-default btn-middle" @click="openPopup('return', item.itemSequence)">반품신청</button>
            </div>
        </template>
    </div>
</template>

<script>

let $s, vm;

export default {
    data() {
        return {

        };
    },
    props: {
        orderCode: {
            type: String,
            default: () => {
                return ""
            }
        },
        item: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    computed: {

    },
    beforeCreate: function() {
        $s = this.$saleson;
        vm = this;
    },
    mounted() {
        this.$nextTick(() => {

        });
    },
    methods: {
        openPopup(type, itemSequence){
            const param = {
                type: type,
                orderCode: this.orderCode,
                itemSequence: itemSequence
            };
            this.$emit('orderPopup', param);
        },
        deliveryLink(url, number){
            this.$emit('deliveryLink', {
                url : url,
                number : number
            });
        }
    }
}
</script>
