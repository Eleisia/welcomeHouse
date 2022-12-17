<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >

            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.userid"
                required
                placeholder="아이디 입력...."
                @keyup.enter="confirm"></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.userpwd"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              variant="primary"
              class="m-1"
              @click="confirm"
              >로그인</b-button
            >
            <b-button
              type="button"
              variant="success"
              class="m-1"
              @click="movePage"
              >회원가입</b-button
            >
            <b-button
              type="button"
              variant="outline-primary"
              class="m-1"
              @click="moveToFindUserInfo"
              >아이디/비밀번호 분실</b-button
            >

            <div
              id="g_id_onload"
              data-client_id="216056246646-3v7d5memnnjk69j40ltrk2lbtfb2l4ou.apps.googleusercontent.com"
              data-login_uri="http://localhost:9999/happyhouse/user/social"
              data-auto_prompt="false"></div>
            <div
              class="g_id_signin"
              data-type="standard"
              data-size="large"
              data-theme="outline"
              data-text="sign_in_with"
              data-shape="rectangular"
              data-logo_alignment="left"></div>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserLogin",
  data() {
    return {
      isLoginError: false,
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo", "isAuth"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin && this.isAuth) {
        await this.getUserInfo(token);
        this.$router.push({ name: "home" });
      }
      if (!this.isLogin) this.isLoginError = true;
      if (!this.isAuth)
        this.$router.push({
          name: "authuser",
          params: {
            userid: this.user.userid,
          },
        });
    },
    movePage() {
      this.$router.push({ name: "join" });
    },
    moveToFindUserInfo() {
      this.$router.push({ name: "findpage" });
    },
  },
  mounted() {
    let googleSrcipt = document.createElement("script");
    googleSrcipt.setAttribute("src", "https://accounts.google.com/gsi/client");
    document.head.appendChild(googleSrcipt);
  },
};
</script>

<style></style>
