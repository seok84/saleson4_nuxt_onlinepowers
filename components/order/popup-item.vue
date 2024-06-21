<template>
    <div class="item-list-container horizon">
        <label class="checkbox" v-if="type == 'cancel'">
            <input type="checkbox" :checked="isSelected" :value="item.itemSequence" @change="emitCheckedValues"><i></i>
        </label>
        <div class="item-list">
            <!-- 아이템 썸네일 영역 -->
            <item-part-thumbnail :item="item" :type="'order'"/>

            <!-- 아이템 정보 영역 -->
            <div class="info-container">
                <div class="title-main paragraph-ellipsis">
                    <template v-if="item.brand != ''">
                        <b>[{{item.brand}}]</b>
                    </template>
                    {{item.itemName}}
                </div>
                <div class="title-sub paragraph-ellipsis" v-html="unescapeHtml(item.options)"></div>
                <div class="purchase-amount">
                    <p class="price">{{formatNumber(item.itemAmount)}}원</p>
                    <p class="amount">수량 {{formatNumber(item.quantity)}}개</p>
                </div>
                <div class="select-wrap select-amount" v-if="type != 'review'">
                    <span>수량</span>
                    <select class="input-select small-arr" v-model="quantity" @change="emitSelectedValues">
                        <option disabled value="">선택</option>
                        <option :value="data" v-for="data in item.quantity">
                            {{ data }}개
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ItemPartThumbnail from "@/components/item/part/thumbnail.vue";

export default {
    components: {ItemPartThumbnail},
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            }
        },
        initialQuantity : {
            type: String,
            default: ""
        },
        type: {
            type : String,
            default:""
        },
        isCheckedAll: {
            type : Boolean,
            default : true
        },
        orderCode : {
            type : String,
            default : ""
        }
    },
    data() {
        return {
            isSelected : false,
            itemSequence : [],
            quantity : this.initialQuantity,
            checkBox : []
        };
    },
    watch: {
        isCheckedAll(val){
            this.isSelected = val;
            this.emitCheckedValues({ target : { checked : val }});
        }
    },
    methods: {
        emitCheckedValues(event){
            this.isSelected = event.target.checked;
            let param = {
                orderCode : this.orderCode,
                itemSequence : this.item.itemSequence,
                quantity : this.quantity,
                checked : this.isSelected
            };
            this.$emit('cancel-values', param);
        },
        emitSelectedValues(){
            let eventTarget = "cancel-values";
            if (this.type != 'cancel'){
                eventTarget = "apply-quantity";
            }
            let param = {
                orderCode : this.orderCode,
                itemSequence: this.item.itemSequence,
                quantity : this.quantity.toString(),
                checked : this.isSelected,
                type : this.type
            };
            this.$emit(eventTarget, param);
        }
    }
}
</script>
