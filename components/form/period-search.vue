<template>
    <div class="period-container">
        <label class="date"><input type="date" class="form-basic" v-model="param.searchStartDate"><i></i></label>
        <span class="divider">~</span>
        <label class="date"><input type="date" class="form-basic" v-model="param.searchEndDate"><i></i></label>
        <div class="select-wrap box">
            <select class="input-select" v-model="selectedPeriod">
                <option value="">조회기간</option>
                <option value="week-1">1주일</option>
                <option value="month-1">1개월</option>
                <option value="month-3">3개월</option>
                <option value="month-6">6개월</option>
            </select>
        </div>
        <div class="form-line box">
            <div class="flex">
                <input type="text" class="form-basic" placeholder="검색어를 입력하세요" v-model="param.query"/>
                <button class="btn btn-black" @click="paging">조회</button>
            </div>
        </div>
    </div>
</template>

<script>

import LocalDate from "@/modules/utils/LocalDate";

export default {
    data() {
        return {
            param: {
                searchStartDate : '',
                searchEndDate : '',
                query : '',
                where : 'ITEM_NAME',
                page : 1
            },
            selectedPeriod: ''
        }
    },
    watch: {
        selectedPeriod() {
            if (this.selectedPeriod === "week-1") {
                this.param.searchStartDate = LocalDate.now().minusDays(7).toString('-');
                this.param.searchEndDate = LocalDate.now().toString('-');
            } else if (this.selectedPeriod === "month-1") {
                this.param.searchStartDate = LocalDate.now().minusMonths(1).toString('-');
                this.param.searchEndDate = LocalDate.now().toString('-');

            } else if (this.selectedPeriod === "month-3") {
                this.param.searchStartDate = LocalDate.now().minusMonths(3).toString('-');
                this.param.searchEndDate = LocalDate.now().toString('-');
            } else if (this.selectedPeriod === "month-6") {
                this.param.searchStartDate = LocalDate.now().minusMonths(6).toString('-');
                this.param.searchEndDate = LocalDate.now().toString('-');

            } else {
                this.param.searchStartDate = "";
                this.param.searchEndDate = "";
            }
        },
        immediate: true
    },
    updated() {
        this.$emit('param', this.param);
    },
    methods: {
        paging: function () {
            this.param.searchStartDate = this.convertToYYYYMMDD(this.param.searchStartDate);
            this.param.searchEndDate = this.convertToYYYYMMDD(this.param.searchEndDate);
            this.$emit('paging', this.param);
        },
        convertToYYYYMMDD(dateString) {
            return dateString.replace(/-/g, "");
        }
    },
    mounted() {
    }
}

</script>

<style>

</style>