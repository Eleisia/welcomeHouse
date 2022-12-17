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
                ref="userid"
                required
                placeholder="아이디 입력...."></b-form-input>
            </b-form-group>
            <b-form-group label="이름:" label-for="username">
              <b-form-input
                id="username"
                v-model="user.username"
                ref="username"
                required
                placeholder="이름 입력...."></b-form-input>
            </b-form-group>

            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.userpwd"
                ref="userpwd"
                required
                placeholder="비밀번호 입력...."></b-form-input>
            </b-form-group>
            <b-form-group label="이메일:" label-for="email">
              <b-form-input
                id="email"
                v-model="user.email"
                ref="email"
                required
                placeholder="이메일 입력...."></b-form-input>
            </b-form-group>

            <b-button
              type="button"
              variant="success"
              class="m-1"
              @click="validate"
              >회원가입</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/api/http";

export default {
  name: "UserRegister",
  data() {
    return {
      isLoginError: false,
      user: {
        userid: null,
        username: null,
        userpwd: null,
        email: null,
        isadmin: false,
      },
      authvalue: "",
    };
  },
  methods: {
    movePageToHome() {
      this.$router.push({ name: "home" });
    },
    getSuccessToastForm() {
      return {
        title: "회원가입 성공",
        variant: "success",
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 1000,
        solid: true,
      };
    },
    getFailToastForm() {
      return {
        title: "회원가입 실패",
        variant: "fail",
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 3000,
        solid: true,
      };
    },
    validate() {
      const tryJoin = async () => {
        const getUser = await http.post("/user/info", this.user);
        switch (getUser.data) {
          case "success":
            this.$bvToast.toast("회원가입 성공", this.getSuccessToastForm());
            setTimeout(this.movePageToHome, 1000);
            break;
          case "fail":
            this.$bvToast.toast("회원가입 실패", this.getFailToastForm());
            break;
          case "duplicate":
            this.$bvToast.toast("ID 중복", this.getFailToastForm());
            break;
          default:
            console.log("???");
        }
      };

      let err = true;
      let msg = "";
      !this.user.userid &&
        ((msg = "ID를 입력해주세요"), (err = false), this.$refs.userid.focus());
      err &&
        !this.user.username &&
        ((msg = "이름을 입력해주세요"),
        (err = false),
        this.$refs.username.focus());
      err &&
        !this.user.userpwd &&
        ((msg = "비밀번호를 입력해주세요"),
        (err = false),
        this.$refs.userpwd.focus());
      err &&
        !this.user.email &&
        ((msg = "이메일을 입력해주세요"),
        (err = false),
        this.$refs.email.focus());

      if (!err) alert(msg);
      else {
        tryJoin();
      }
    },
  },
};
</script>

<style></style>
