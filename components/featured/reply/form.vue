<template>
  <div class="reply-writing">
    <div class="container">
      <form action="" @submit.prevent="submit">
        <h3 class="form-title">이벤트 참여 댓글쓰기</h3>
        <div class="form-line">
                        <textarea name="" id="" cols="30" rows="10" class="form-basic text-area"
                                  placeholder="내용을 입력해주세요" v-model="content"></textarea>
        </div>
        <div class="link-wrap">
          <button type="submit" class="btn btn-primary link-item w-half">등록</button>
          <button type="reset" class="btn btn-default link-item w-half">취소</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: () => {
        return 0;
      }
    },
  },
  data() {
    return {
      content: ''
    }
  },
  mounted: function () {

  },
  methods: {
    async submit() {

      try {
        if (!this.$saleson.isLogin()) {

          this.$saleson.confirm(this.$saleson.const.LOGIN_MESSAGE, ()=>{
            this.$router.push({path: this.$saleson.pages.LOGIN, query: {target: this.$route.path}});
          });
          return false;
        }
        const replyContent = this.content.trim();

        if (replyContent === "") {
          this.$saleson.alert("댓글을 입력해주세요.");
          return false;
        }

        const self = this;

        this.$saleson.confirm('댓글을 등록 하겠습니까?', async () => {

          try {
            const params = {
              featuredId: self.id,
              replyContent: replyContent
            }

            const {data} = await self.$salesonApi().event.writeReply(params);

            if (200 === data.status) {
              self.$emit('reload');
              self.content = '';
            }

          } catch (e) {
            self.$saleson.alert('댓글 등록시 오류가 발생했습니다.');
          }

          return false;
        });


      } catch (e) {
        this.$saleson.alert('댓글 등록시 오류가 발생했습니다.');
      }

      return false;
    }
  },
}
</script>