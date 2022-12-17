<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="userInfo.userid === article.userid">
        <b-button
          variant="outline-info"
          size="sm"
          @click="moveModifyArticle"
          class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-danger" size="sm" @click="deleteArticle"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.articleno}.
          ${article.subject} [${article.hit}]</h3><div><h6>${article.userid}</div><div>${article.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body>
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <comment-write></comment-write>
    <b-list-group>
      <comment-row
        v-for="comment in comments"
        :key="comment.commentNo"
        :articleno="article.articleno"
        :comment="comment"></comment-row>
    </b-list-group>
  </b-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

const memberStore = "memberStore";

export default {
  components: {
    "comment-write": () => import("@/components/board/item/CommentWrite.vue"),
    "comment-row": () => import("@/components/board/item/CommentRow.vue"),
  },
  name: "BoardView",
  methods: {
    ...mapActions(["getArticle", "getComments"]),
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
    moveModifyArticle() {
      this.$router.push({
        name: "BoardModify",
        params: this.article.articleno ? this.article.articleno : 0,
      });
    },
    deleteArticle() {
      this.$router.push({
        name: "BoardDelete",
        params: this.article.articleno ? this.article.articleno : 0,
      });
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(["article", "comments"]),
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    const articleno = this.$route.params.articleno;
    this.getArticle(articleno);
    this.getComments(articleno);
  },

  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style></style>
