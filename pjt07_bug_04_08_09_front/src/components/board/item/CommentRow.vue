<template>
  <b-list-group-item class="felx-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ comment.userId }}</h5>
      <small class="text-muted">{{ comment.commentTime }}</small>
    </div>

    <p :inner-html.prop="comment.comment | filterEnterToBr"></p>

    <div class="text-right">
      <b-button-group v-if="userInfo.userid == comment.userId">
        <b-button variant="outline-primary" @click="showModalModify"
          >수정</b-button
        >
        <b-button variant="outline-danger" @click="showModalDelete"
          >삭제</b-button
        >
      </b-button-group>
    </div>
    <!-- Modal -->
    <b-modal
      :ref="`comment-${comment.commentNo}`"
      title="댓글 수정"
      header-bg-variant="dark"
      header-text-variant="light"
      centered
      hide-footer>
      <!-- Modal Body -->
      <div>
        <b-form-textarea
          v-model="input.comment"
          placeholder="댓글 입력..."
          row="3"
          max-rows="6"></b-form-textarea>
      </div>

      <!-- Modal Footer -->
      <div class="text-right">
        <b-button-group>
          <b-button variant="outline-primary" @click="modify">수정</b-button>
          <b-button variant="outline-danger" @click="hideModalModify"
            >취소</b-button
          >
        </b-button-group>
      </div>
    </b-modal>
  </b-list-group-item>
</template>

<script>
import { mapActions, mapState } from "vuex";

const memberStore = "memberStore";

export default {
  props: {
    articleno: Number,
    comment: Object,
  },
  methods: {
    ...mapActions(["getComments", "modifyComment", "deleteComment"]),
    showModalModify() {
      this.$refs[`comment-${this.comment.commentNo}`].show();
    },
    hideModalModify() {
      this.$refs[`comment-${this.comment.commentNo}`].hide();
    },
    modify() {
      const payload = {
        comment: {
          commentNo: this.comment.commentNo,
          comment: this.input.comment,
        },
        callback: () => {
          this.input.userName = "";
          this.input.comment = "";

          this.getComments(this.articleno);

          this.hideModalModify();
          this.$bvToast.toast("댓글이 수정되었습니다.", {
            title: "댓글 알림",
            variant: "success",
            toaster: "b-toaster-bottom-center",
            autoHideDelay: 3000,
            solid: true,
          });
        },
      };
      this.modifyComment(payload);
    },
    showModalDelete() {
      this.$bvModal
        .msgBoxConfirm("정말로 삭제 하시겠습니까?", {
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.delete();
          }
        });
    },
    delete() {
      const payload = {
        commentNo: this.comment.commentNo,
        callback: () => {
          this.getComments(this.articleno);

          this.$bvToast.toast("댓글이 삭제되었습니다.", {
            title: "댓글 알림",
            variant: "success",
            toaster: "b-toaster-bottom-center",
            autoHideDelay: 3000,
            solid: true,
          });
        },
      };
      this.deleteComment(payload);
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    input() {
      return { ...this.comment };
    },
  },
};
</script>

<style></style>
