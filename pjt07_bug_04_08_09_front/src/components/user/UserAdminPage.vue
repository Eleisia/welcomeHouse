<template>
  <b-container class="view mt-4">
    <b-container class="mt-4">
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="2" align-self="end">아이디</b-col
        ><b-col cols="4" align-self="start">{{ userInfo.userid }}</b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="2" align-self="end">이름</b-col
        ><b-col cols="4" align-self="start">{{ userInfo.username }}</b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="2" align-self="end">이메일</b-col
        ><b-col cols="4" align-self="start">{{ userInfo.email }}</b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="2" align-self="end">가입일</b-col
        ><b-col cols="4" align-self="start">{{ userInfo.joindate }}</b-col>
        <b-col cols="2"></b-col>
      </b-row>

      <b-button
        v-b-modal.modifyModal
        variant="primary"
        href="#"
        class="button mr-1"
        >정보수정</b-button
      >
      <b-button v-b-modal.deleteModal variant="danger" href="#" class="button"
        >회원탈퇴</b-button
      >
    </b-container>

    <!-- Modal -->
    <b-modal
      id="modifyModal"
      size="lg"
      title="회원 정보 수정"
      header-bg-variant="dark"
      header-text-variant="light"
      centered
      hide-footer>
      <!-- Modal Body -->
      <div>
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-none">ID : </label>
            </b-col>
            <b-col sm="9">
              <!-- State는 true / false도 가능-->
              <b-form-input
                ref="userid"
                id="modifyId"
                :state="null"
                v-model="userInfo.userid"
                placeholder="ID 입력"
                readonly></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-none">비밀번호:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                ref="userpwd"
                id="modifyPassword"
                type="password"
                :state="null"
                v-model="userInfo.userpwd"
                placeholder="PassWord 입력"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-none">이름</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                ref="username"
                id="modifyName"
                :state="null"
                v-model="userInfo.username"
                placeholder="이름 입력"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-none">이메일</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                ref="useremail"
                id="modifyEmail"
                type="email"
                :state="null"
                v-model="userInfo.email"
                placeholder="E-mail 입력"></b-form-input>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <!-- Modal Footer -->
      <div class="text-right">
        <b-button-group>
          <b-button variant="outline-secondary" @click="cancleBtn"
            >취소</b-button
          >
          <b-button variant="secondary" @click="modify">수정</b-button>
        </b-button-group>
      </div>
    </b-modal>

    <!-- Modal Delete-->
    <b-modal
      id="deleteModal"
      size="lg"
      title="회원 탈퇴"
      header-bg-variant="dark"
      header-text-variant="light"
      centered
      hide-footer>
      <!-- Modal Body -->
      <div>
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-none">정말로 탈퇴하시겠습니까? </label>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <!-- Modal Footer -->
      <div class="text-right">
        <b-button-group>
          <b-button variant="outline-secondary" @click="cancleBtn"
            >취소</b-button
          >
          <b-button variant="danger" @click="deleteUser">탈퇴</b-button>
        </b-button-group>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "UserAdminPage",
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState(memberStore, ["userList"]),
  },
  methods: {
    ...mapActions(memberStore, [
      "userLogout",
      "disableAccount",
      "modifyAccount",
      "selectAllUser",
    ]),
    async modify() {
      let err = true;
      let msg = "";
      !this.userInfo.userid &&
        ((msg = "작성자 입력해주세요"),
        (err = false),
        this.$refs.userid.focus());
      err &&
        !this.userInfo.username &&
        ((msg = "이름을 입력해주세요"),
        (err = false),
        this.$refs.username.focus());
      err &&
        !this.userInfo.userpwd &&
        ((msg = "비밀번호를 입력해주세요"),
        (err = false),
        this.$refs.userpwd.focus());
      err &&
        !this.userInfo.email &&
        ((msg = "이메일을 입력해주세요"),
        (err = false),
        this.$refs.email.focus());

      if (!err) alert(msg);
      else {
        const modifyUser = {
          user: this.userInfo,
          callback: () => {
            this.$bvModal.hide("modifyModal");
            //this.$router.push({ name: "mypage" });
          },
        };
        await this.modifyAccount(modifyUser);
        this.$router.push({ name: "mypage" });
      }
    },
    async deleteUser() {
      await this.disableAccount(this.userInfo.userid);
      this.$router.push({ name: "mypage" });
    },
    cancleBtn() {
      this.$bvModal.hide("modifyModal");
      this.$bvModal.hide("deleteModal");
      this.$bvModal.hide("adminModal");
    },
  },
  created() {
    this.userInfo = this.$route.params.selectedUser;
  },
};
</script>

<style>
.view {
  background-color: rgba(255, 255, 255, 0.6);
}

.button {
  margin-bottom: 30px;
}
</style>
