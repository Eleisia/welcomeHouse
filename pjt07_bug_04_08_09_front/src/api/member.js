import axios from "@/api/http";

const api = axios;

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] =
    sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function modifyAccount(user, success, fail) {
  await api.put(`/user/info`, user).then(success).catch(fail);
}
async function disableAccount(userid, success, fail) {
  await api.delete(`/user/info/${userid}`).then(success).catch(fail);
}
async function selectAllUser(success, fail) {
  await api.get(`/user/infoall`).then(success).catch(fail);
}
async function findUserId(email, success, fail) {
  await api.get(`/user/find/id/${email}`).then(success).catch(fail);
}
async function findUserPwd(id, success, fail) {
  await api.get(`/user/find/pwd/${id}`).then(success).catch(fail);
}
async function checkAuthCode(id, code, success, fail) {
  await api.get(`/user/auth/${id}/${code}`).then(success).catch(fail);
}
async function reGenerateCode(id, success, fail) {
  await api.get(`/user/regenerate/${id}`).then(success).catch(fail);
}

export {
  login,
  findById,
  tokenRegeneration,
  logout,
  modifyAccount,
  disableAccount,
  selectAllUser,
  findUserId,
  findUserPwd,
  checkAuthCode,
  reGenerateCode,
};
