import jwtDecode from "jwt-decode";
import router from "@/router";
import {
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
} from "@/api/member";

// userid: null,
// username: null,
// userpwd: null,
// email: null,
// isadmin: false,

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
    userList: [],
    isAuth: false,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_USERLIST: (state, userList) => {
      state.userList = userList;
    },
    SET_IS_AUTH: (state, boolValue) => {
      state.isAuth = boolValue;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            // console.log("login success token created!!!! >> ", accessToken, refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            commit("SET_IS_AUTH", data["auth"]);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      // console.log("2. getUserInfo() decodeToken :: ", decodeToken);
      await findById(
        decodeToken.userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
            // console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("?????? ?????? ??????!!!!");
          }
        },
        async (error) => {
          console.log(
            "getUserInfo() error code [?????? ???????????? ?????? ?????????.] ::: ",
            error.response.status,
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        },
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log(
        "?????? ????????? >> ?????? ?????? ?????? : {}",
        sessionStorage.getItem("access-token"),
      );
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken ?????? ?????? >> ?????? ?????????!!!!
          if (error.response.status === 401) {
            // ?????? ????????? ??? DB??? ????????? RefreshToken ??????.
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("???????????? ?????? ?????? ??????");
                } else {
                  console.log("???????????? ?????? ?????? ??????");
                }
                alert("RefreshToken ?????? ??????!!! ?????? ???????????? ?????????.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              },
            );
          }
        },
      );
    },
    async userLogout({ commit }, userid) {
      await logout(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("?????? ?????? ??????!!!!");
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async disableAccount({ state }, userid) {
      state;
      await disableAccount(
        userid,
        (response) => {
          console.log("??????", response);
        },
        (error) => {
          console.log("??????", error);
        },
      );
    },
    async modifyAccount({ state }, modifyUser) {
      state;
      await modifyAccount(
        modifyUser.user,
        (response) => {
          console.log("in", response);
          if (response.data === "success") {
            alert("?????? ??????");
          }
          modifyUser.callback();
        },
        (error) => {
          console.log(error);
          alert("?????? ?????? (?????? ??????)");
          //modifyUser.callback();
        },
      );
    },
    async selectAllUser({ commit }) {
      await selectAllUser(
        (response) => {
          if (response.status == "200") {
            commit("SET_USERLIST", response.data);
          }
        },
        (error) => {
          console.log("err", error);
          alert("?????? ?????? (?????? ??????)");
        },
      );
    },
    async findUserId({ commit }, email) {
      commit;
      await findUserId(
        email,
        (response) => {
          if (response.status == "200") {
            alert("?????? ??????");
            router.push({ name: "login" });
          } else {
            alert("???????????? ????????? ?????????.");
          }
        },
        (error) => {
          console.log("err", error);
          alert("?????? ??????.");
        },
      );
    },
    async findUserPwd({ commit }, id) {
      commit;
      await findUserPwd(
        id,
        (response) => {
          if (response.status == "200") {
            alert("?????? ??????");
            router.push({ name: "login" });
          } else {
            alert("???????????? ????????? ?????????.");
          }
        },
        (error) => {
          console.log("err", error);
          alert("?????? ??????.");
        },
      );
    },
    async checkAuthCode({ commit }, authForm) {
      commit;
      await checkAuthCode(
        authForm.id,
        authForm.code,
        () => {
          router.push({ name: "home" });
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async reGenerateCode({ commit }, id) {
      commit;
      await reGenerateCode(
        id,
        () => {},
        (error) => {
          console.log(error);
        },
      );
    },
  },
};

export default memberStore;
