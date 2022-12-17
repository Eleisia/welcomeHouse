import axios from "@/api/http";

const api = axios;

// Board
async function listArticle(param, success, fail) {
  await api.get(`/board`, { params: param }).then(success).catch(fail);
}

async function writeArticle(article, success, fail) {
  await api.post(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

async function getArticle(articleno, success, fail) {
  await api.get(`/board/${articleno}`).then(success).catch(fail);
}

async function modifyArticle(article, success, fail) {
  await api.put(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

async function deleteArticle(articleno, success, fail) {
  await api.delete(`/board/${articleno}`).then(success).catch(fail);
}

// Comment
async function writeComment(comment, success, fail) {
  await api
    .post(`/board/comment`, JSON.stringify(comment))
    .then(success)
    .catch(fail);
}

async function ModifyComment(comment, success, fail) {
  await api
    .post(`/board/comment`, JSON.stringify(comment))
    .then(success)
    .catch(fail);
}

async function deleteComment(articleno, success, fail) {
  await api.post(`/board/comment/${articleno}`).then(success).catch(fail);
}

async function getComments(param, success, fail) {
  await api.post(`/board/comment`, { params: param }).then(success).catch(fail);
}

export {
  listArticle,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
  writeComment,
  ModifyComment,
  deleteComment,
  getComments,
};
