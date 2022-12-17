import Vue from "vue";
import Vuex from "vuex";
import boardStore from "@/store/modules/boardStore";
import memberStore from "@/store/modules/memberStore";
import persistedState from "vuex-persistedstate";
import http from "@/api/http";
import moment from "moment";
import houseStore from "@/store/modules/houseStore";
Vue.use(Vuex);

function alertMessage(statusCode) {
  switch (statusCode) {
    case 400:
      alert("잘못된 요청입니다.");
      break;
    case 500:
      alert("서버 오류입니다.");
      break;
  }
}

export default new Vuex.Store({
  // Modules Start
  modules: {
    boardStore,
    memberStore,
    houseStore,
  },
  // Modules End

  // Plugins Start
  plugins: [
    persistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
  // Plugins Start

  // boardStore로 옮겨야 함.
  state: {
    articles: [],
    article: {},
    comments: [],
  },
  getters: {
    articles(state) {
      return state.articles;
    },
    article(state) {
      return state.article;
    },
    comments(state) {
      return state.comments;
    },
  },
  mutations: {
    SET_ARTICLES(state, payload) {
      state.articles = payload.articles;
    },
    SET_ARTICLE(state, payload) {
      state.article = payload.article;
    },
    SET_COMMENTS(state, payload) {
      payload.comments.map((comment) => {
        const obj = moment(comment.commentTime, "YYYY-MM-DD hh:mm:ss");
        comment.commentTime = obj.format("MM-DD HH:mm");
        return comment;
      });
      state.comments = payload.comments;
    },
  },
  actions: {
    getArticles(context) {
      http.get("/board").then((response) => {
        switch (response.status) {
          case 200:
            context.commit({ type: "SET_ARTICLES", articles: response.data });
            break;

          case 400:
          case 500:
            alertMessage(response.status);
            break;
        }
      });
    },
    getArticle(context, articleno) {
      http.get(`/board/${articleno}`).then((response) => {
        switch (response.status) {
          case 200:
            context.commit({
              type: "SET_ARTICLE",
              article: response.data,
            });
            break;

          case 400:
          case 500:
            alertMessage(response.status);
            break;
        }
      });
    },
    // Comment Code
    getComments(context, articleno) {
      http.get(`/comment/${articleno}`).then((response) => {
        switch (response.status) {
          case 200:
            context.commit({
              type: "SET_COMMENTS",
              comments: response.data,
            });
            break;

          case 400:
          case 500:
            alertMessage(response.status);
            break;
        }
      });
    },
    createComment(context, payload) {
      http.post("/comment", payload.comment).then((response) => {
        console.log("res:", response);
        switch (response.status) {
          case 200:
            payload.callback();
            break;

          case 400:
          case 500:
            alertMessage(response.status);
            break;
        }
      });
    },
    modifyComment(context, payload) {
      http
        .put(`/comment/${payload.comment.commentNo}`, payload.comment)
        .then((response) => {
          switch (response.status) {
            case 200:
              payload.callback();
              break;
            case 400:
            case 500:
              alertMessage(response.status);
              break;
          }
        });
    },
    deleteComment(context, payload) {
      http.delete(`/comment/${payload.commentNo}`).then((response) => {
        switch (response.status) {
          case 200:
            payload.callback();
            break;

          case 400:
          case 500:
            alertMessage(response.status);
            break;
        }
      });
    },
  },
});
