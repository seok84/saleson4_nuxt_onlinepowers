<template>
  <section class="container reply-wrap">
    <div class="sort-wrap">
      <p class="all-items">전체 <strong>{{formatNumber(result.pagination.totalElements)}}</strong>개</p>
    </div>
    <ul class="reply-list">
      <li class="list"  v-for="(reply, index) in result.content" :key="'reply-'+index">
        <div class="reply-top">
          <p class="user-info">
            <span class="user-id">{{reply.loginId}}</span>
            <span class="divider"></span>
            <span class="date">{{reply.date}}</span>
          </p>
          <button v-if="!reply.writtenMeFlag" type="button" class="reply-report-btn"
                  @click.prevent="openReport(reply.id, reply.blockFlag)">신고/차단</button>
        </div>
        <p class="reply-content" v-html="nl2br(reply.content)"></p>
      </li>
    </ul>
    <ui-pagination :current-page="result.pagination.currentPage" :total-pages="result.pagination.totalPages" @change="paging"/>
  </section>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => {
        return {
          content: [],
          pagination: {
            currentPage: 1,
            first: true,
            last: true,
            size: 10,
            totalElements: 1,
            totalPages: 1
          }
        };
      }
    },
  },
  methods: {
    paging(page) {
      this.$emit('paging', page);
    },
    openReport(id, blockFlag) {
      this.$emit('openReport', id, blockFlag);
    },
  },
}
</script>