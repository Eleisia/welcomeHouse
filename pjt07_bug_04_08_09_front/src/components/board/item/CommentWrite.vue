<template>
  <div class="box p-3">
    <b-input-group>
      <b-form-textarea
        placeholder="댓글 입력..."
        rows="3"
        max-rows="6"
        v-model="comment"></b-form-textarea>
      <b-input-group-append>
        <b-button variant="outline-primary" @click="write">등록</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      userid: "",
      comment: "",
    };
  },
  methods: {
    ...mapActions(["createComment", "getComments"]),
    write() {
      console.log(this);
      const payload = {
        comment: {
          articleno: this.article.articleno,
          userId: this.userInfo.userid,
          comment: this.comment,
        },
        callback: () => {
          //(this.userName = ""), (this.comment = "");
          this.getComments(this.article.articleno);
          this.$bvToast.toast("댓글이 등록되었습니다.", {
            title: "댓글 알림",
            variant: "success",
            toaster: "b-toaster-bottom-center",
            autoHideDelay: 3000,
            solid: true,
          });
        },
      };
      this.createComment(payload);
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(["article"]),
  },
};
</script>

<style scoped>
.box {
  background-color: rgba(250, 250, 250, 1);
}
</style>
