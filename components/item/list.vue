<template>
  <!-- 아이템리스트 -->
  <div :class="'item-list-container '+ listContainerClass">
    <div :class="'item-list ' + listClass"
         v-for="(item, index) in content"
    >
      <!-- 아이템 썸네일 영역 -->
      <item-part-thumbnail :item="item" :rank="getRank(index +1)"/>
      <!-- 아이템 정보 영역 -->
      <item-part-info :item="item"/>
    </div>
  </div>
</template>


<script>
export default {
  name: '',
  props: {
    listContainerClass: {
      type: String,
      default: () => {
        return 'vertical';
      }
    },
    listClass: {
      type: String,
      default: () => {
        return 'item-list-4';
      }
    },
    content: {
      type: [Array],
      default: () => {
        return [];
      }
    },
    displayRank: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },

  mounted: function () {

  },
  methods: {
    getRank(index) {

      if (this.displayRank) {
        return this.$saleson.addZero(index,2);
      }

      return '';
    }
  },
}
</script>