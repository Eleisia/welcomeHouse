<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger">메일 인증 미완료</b-alert>
            <b-form-group label="인증번호:" label-for="authcode">
              <b-form-input
                type="text"
                id="authcode"
                v-model="authcode"
                required
                placeholder="인증코드 입력...."></b-form-input>
            </b-form-group>

            <b-button
              type="button"
              variant="outline-primary"
              class="m-1"
              @click="checkAuth"
              >인증 확인</b-button
            >
            <b-button
              type="button"
              variant="outline-primary"
              class="m-1"
              @click="reSendMail"
              >메일 다시 보내기</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserAuth",
  data() {
    return {
      authcode: "",
    };
  },
  methods: {
    ...mapActions(memberStore, ["checkAuthCode", "reGenerateCode"]),
    checkAuth() {
      const authForm = {
        id: this.$route.params.userid,
        code: this.authcode,
      };
      this.checkAuthCode(authForm);
    },
    reSendMail() {
      this.reGenerateCode(this.$route.params.userid);
    },
  },
};
</script>

<style></style>
