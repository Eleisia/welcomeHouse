<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="subject-group"
          label="제목:"
          label-for="subject"
          description="제목을 입력하세요.">
          <b-form-input
            id="subject"
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력..."></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"></b-form-textarea>
        </b-form-group>

        <div class="text-center">
          <b-button
            type="submit"
            variant="primary"
            class="m-1"
            v-if="this.type === 'register'"
            >글작성</b-button
          >
          <b-button type="submit" variant="primary" class="m-1" v-else
            >글수정</b-button
          >
          <b-button type="reset" variant="danger" class="m-1">초기화</b-button>
        </div>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { writeArticle, modifyArticle } from "@/api/board";
import { mapState, mapGetters } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardInputItem",
  data() {
    return {
      isUserid: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      //let param = this.$route.params.articleno;
      this.isUserid = true;
    }
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(["article"]),
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      err &&
        !this.article.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else
        this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
      if (this.type === "register") {
        this.$bvModal
          .msgBoxConfirm(`목록으로 나가시겠습니까?`, {
            title: "Please Confirm",
            size: "lg",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          })
          .then((response) => {
            if (response) this.moveList();
          });
      }
    },
    registArticle() {
      let param = {
        userid: this.userInfo.userid,
        subject: this.article.subject,
        content: this.article.content,
      };
      writeArticle(
        param,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        },
      );
    },
    modifyArticle() {
      let param = {
        articleno: this.article.articleno,
        userid: this.userInfo.userid,
        subject: this.article.subject,
        content: this.article.content,
      };
      console.log(param);
      modifyArticle(
        param,
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.moveList();
        },
        (error) => {
          console.log(error);
        },
      );
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style scoped>
#subject {
  border-radius: 50px;
}
</style>
