<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="아이디 찾기" active>
        <b-row>
          <b-col></b-col>
          <b-col cols="8">
            <b-card
              class="text-center mt-3"
              style="max-width: 40rem"
              align="left">
              <b-form class="text-left">
                <b-form-group
                  label="가입시 등록 하였던 Email:"
                  label-for="email">
                  <b-form-input
                    id="userid"
                    v-model="email"
                    required
                    placeholder="e.g) register@email.com"></b-form-input>
                </b-form-group>
                <b-button
                  type="button"
                  variant="success"
                  class="m-1"
                  @click="findID"
                  >찾기</b-button
                >
              </b-form>
            </b-card>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-tab>
      <b-tab title="비밀번호 찾기"
        ><b-row>
          <b-col></b-col>
          <b-col cols="8">
            <b-card
              class="text-center mt-3"
              style="max-width: 40rem"
              align="left">
              <b-form class="text-left">
                <b-form-group label="ID:" label-for="userid">
                  <b-form-input
                    id="userid"
                    v-model="userid"
                    required
                    placeholder="e.g) yourID"></b-form-input>
                </b-form-group>
                <b-button
                  type="button"
                  variant="success"
                  class="m-1"
                  @click="findPwd"
                  >찾기</b-button
                >
              </b-form>
            </b-card>
          </b-col>
          <b-col></b-col> </b-row
      ></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      email: "",
      userid: "",
    };
  },
  methods: {
    ...mapActions(memberStore, ["findUserId", "findUserPwd"]),
    findID() {
      this.findUserId(this.email);
    },
    findPwd() {
      this.findUserPwd(this.userid);
    },
  },
};
</script>

<style></style>
