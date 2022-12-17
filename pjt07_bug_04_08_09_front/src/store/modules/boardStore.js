// import Vue from "vue";
// import Vuex from "vuex";
// import http from "@/api/http";
// import moment from "moment";

// Vue.use(Vuex);

// function alertMessage(statusCode) {
//   switch (statusCode) {
//     case 400:
//       alert("잘못된 요청입니다.");
//       break;
//     case 500:
//       alert("서버 오류입니다.");
//       break;
//   }
// }

// export default new Vuex.Store({
//   // State Start
//   state: {
//     article: {},
//     comments: [],
//   },
//   // State End

//   // Getters Start
//   getters: {
//     // article(state) {
//     //   return state.article;
//     // },
//     // comments(state) {
//     //   return state.comments;
//     // },
//   },
//   // Getters End

//   // Mutations Start
//   mutations: {
//     ARTICLE(state, payload) {
//       state.article = payload.article;
//     },
//     COMMENTS(state, payload) {
//       payload.comments.map((comment) => {
//         const obj = moment(comment.commentTime, "YYYY-MM-DD hh:mm:ss");
//         comment.commentTime = obj.format("MM-DD HH:mm");
//         return comment;
//       });
//       state.comments = payload.comments;
//     },
//   },
//   // Mutations End

//   // Actions Start
//   actions: {
//     createComment(context, payload) {
//       console.log(payload);
//       http.post("/board/comment", payload.comment).then((response) => {
//         switch (response.status) {
//           case 200:
//             payload.callback();
//             break;

//           case 400:
//           case 500:
//             alertMessage(response.status);
//             break;
//         }
//       });
//     },
//     deleteComment(context, payload) {
//       http.delete(`/board/comment/${payload.commentNo}`).then((response) => {
//         switch (response.status) {
//           case 200:
//             payload.callback();
//             break;

//           case 400:
//           case 500:
//             alertMessage(response.status);
//             break;
//         }
//       });
//     },
//     modifyComment(context, payload) {
//       http
//         .put(`/board/comment/${payload.comment.commentNo}`, payload.comment)
//         .then((response) => {
//           switch (response.status) {
//             case 200:
//               payload.callback();
//               break;
//             case 400:
//             case 500:
//               alertMessage(response.status);
//               break;
//           }
//         });
//     },
//     getComments(context, articleno) {
//       http.get(`/board/comment/${articleno}`).then((response) => {
//         switch (response.status) {
//           case 200:
//             context.commit({
//               type: "COMMENTS",
//               comments: response.data,
//             });
//             break;

//           case 400:
//           case 500:
//             alertMessage(response.status);
//             break;
//         }
//       });
//     },
//     getArticle(context, articleno) {
//       http.get(`/board/${articleno}`).then((response) => {
//         switch (response.status) {
//           case 200:
//             context.commit({
//               type: "ARTICLE",
//               article: response.data,
//             });
//             break;

//           case 400:
//           case 500:
//             alertMessage(response.status);
//             break;
//         }
//       });
//     },
//     modifyArticle(context, payload) {
//       http
//         .put(`/board/${payload.article.articleno}`, payload.article)
//         .then((response) => {
//           switch (response.status) {
//             case 200:
//               alert("수정이 완료되었습니다.");
//               payload.callback();
//               break;

//             case 400:
//             case 500:
//               alertMessage(response.status);
//               break;
//           }
//         });
//     },
//     deleteArticle(context, payload) {
//       http.delete(`/board/${payload.articleno}`).then((response) => {
//         switch (response.status) {
//           case 200:
//             alert("삭제가 완료되었습니다.");
//             payload.callback();
//             break;

//           case 400:
//           case 500:
//             alertMessage(response.status);
//             break;
//         }
//       });
//     },
//   },
//   // Actions End

//   // Modules Start
//   modules: {},
//   // Modules End
// });
