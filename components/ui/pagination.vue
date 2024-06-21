
<template>
  <ul class="pagination">
    <li class="page-item" v-show="showPreviousButtion">
      <span class="page-prev" aria-label="Previous" @click="previousPage">이전페이지</span>
    </li>
    <li class="page-item" v-for="pageNumber in pageNumbers" :class="{ 'active': currentPage == pageNumber }">
      <span class="page-link" @click="page(pageNumber)">{{ pageNumber }}</span>
    </li>
    <li class="page-item" v-show="showNextButtion">
      <span class="page-next" aria-label="Next" @click="nextPage">Next</span>
    </li>

  </ul>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
      default: () => {
        return 1;
      }
    },
    totalPages: {
      type: Number,
      required: true,
      default: () => {
        return 1;
      }
    },
    pageSize: {
      type: Number,
      default: () => {
        return 5;
      }
    },
    pageTarget: {
      type: String,
      default() {
        return 'default';
      },
    },
    scrollTopFlag: {
      type: Boolean,
      default() {
        return true;
      },
    }
  },
  data: () => {
    return {

    }
  },
  methods: {

    page(page) {

      if(this.scrollTopFlag) {
          this.topScroll();
      }
      this.$emit('change', page, this.pageTarget);
    },
    nextPage() {

      let page = this.currentPage + 1;

      if (page > this.totalPages) {
        page = this.totalPages;
      }

      this.page(page);
    },
    previousPage() {

      let page = this.currentPage - 1;

      if (page < 1) {
        page = 1;
      }

      this.page(page);
    },
    latestPage() {
      let page = 1;
      this.page(page);
    },
    oldestPage() {
      let page = this.totalPages;
      this.page(page);
    },
    topScroll() {
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  },
  computed: {

    showPreviousButtion() {
      return this.currentPage > 1;
    },
    showNextButtion() {
      return this.currentPage < this.totalPages;
    },

    pageNumbers() {

      const pageNumbers = [];

      try {

        let pageSize = this.pageSize;
        let n = 0;
        let startPage = 0;
        let endPage = 0;
        let halfSizeFloor = 0;
        let currentPage = this.currentPage;
        let totalPages = this.totalPages;


        currentPage = currentPage > totalPages ? totalPages : currentPage;

        n = pageSize / 2;

        halfSizeFloor = Math.floor(n - (1 - (n % 1)) % 1);

        startPage = currentPage < halfSizeFloor + 1 ? 1 : currentPage - halfSizeFloor;
        startPage = currentPage > totalPages - halfSizeFloor ? totalPages - pageSize + 1 : startPage;

        endPage = startPage + pageSize - 1;
        endPage = endPage > totalPages ? totalPages : endPage;

        startPage = totalPages < pageSize ? 1 : startPage;
        endPage = totalPages < pageSize ? totalPages : endPage;

        for (var i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }

        if (!pageNumbers.length > 0) {
          pageNumbers.push(1);
        }

      } catch (e) {}

      return pageNumbers;
    }
  }
};
</script>
