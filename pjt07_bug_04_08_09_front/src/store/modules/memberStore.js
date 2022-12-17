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
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status,
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        },
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log(
        "토큰 재발급 >> 기존 토큰 정보 : {}",
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
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
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
            console.log("유저 정보 없음!!!!");
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
          console.log("성공", response);
        },
        (error) => {
          console.log("실패", error);
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
            alert("수정 성공");
          }
          modifyUser.callback();
        },
        (error) => {
          console.log(error);
          alert("수정 실패 (서버 에러)");
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
          alert("수정 실패 (서버 에러)");
        },
      );
    },
    async findUserId({ commit }, email) {
      commit;
      await findUserId(
        email,
        (response) => {
          if (response.status == "200") {
            alert("메일 발송");
            router.push({ name: "login" });
          } else {
            alert("이메일을 확인해 주세요.");
          }
        },
        (error) => {
          console.log("err", error);
          alert("서버 오류.");
        },
      );
    },
    async findUserPwd({ commit }, id) {
      commit;
      await findUserPwd(
        id,
        (response) => {
          if (response.status == "200") {
            alert("메일 발송");
            router.push({ name: "login" });
          } else {
            alert("이메일을 확인해 주세요.");
          }
        },
        (error) => {
          console.log("err", error);
          alert("서버 오류.");
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
