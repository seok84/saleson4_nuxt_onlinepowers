<template>
  <div class="filter-wrap">
    <p>총 <b>{{ formatNumber(totalElements) }}</b>개 상품</p>
    <div class="select-wrap" v-if="displayFlag">
      <select class="input-select" @change="change($event)">
        <option value="__" :selected="orderBy + '__' + sort === '__'">추천순</option>
        <option value="ORDERING__ASC" :selected="orderBy + '__' + sort === 'ORDERING__ASC'">최신순</option>
        <option value="HITS__DESC" :selected="orderBy + '__' + sort === 'HITS__DESC'">인기순</option>
        <option value="SALE_PRICE__DESC" :selected="orderBy + '__' + sort === 'SALE_PRICE__DESC'">높은 가격순
        </option>
        <option value="SALE_PRICE__ASC" :selected="orderBy + '__' + sort === 'SALE_PRICE__ASC'">낮은 가격순
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalElements: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    orderBy: {
      type: String,
      default: () => {
        return ''
      }
    },
    sort: {
      type: String,
      default: () => {
        return ''
      }
    },
    displayFlag: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  computed: {}
  ,
  mounted() {
  }
  ,
  methods: {
    change(event) {
      const value = event.target.value.split("__");
      this.$emit('change', value[0], value[1]);
    }
  }
}
</script>
