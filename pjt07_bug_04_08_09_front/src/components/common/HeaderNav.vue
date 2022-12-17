<template>
  <div>
    <b-navbar class="navbar" toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">
        <router-link class="main" to="/">Happy House</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"
            ><router-link to="/news" class="link">News</router-link></b-nav-item
          >

          <b-nav-item href="#"
            ><router-link to="/map" class="link"
              >아파트 거래 내역</router-link
            ></b-nav-item
          >

          <b-nav-item href="#"
            ><router-link to="/board" class="link"
              >공지사항</router-link
            ></b-nav-item
          >
        </b-navbar-nav>

        <!-- after login -->
        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center">
            <b-avatar
              variant="primary"
              v-text="userInfo.userid.charAt(0).toUpperCase()"></b-avatar>
            {{ userInfo.username }}({{ userInfo.userid }})님 환영합니다.
          </b-nav-item>
          <b-nav-item class="align-self-center">
            <router-link :to="{ name: 'mypage' }" class="link align-self-center"
              >내정보보기</router-link
            >
          </b-nav-item>
          <b-nav-item
            class="align-self-center link"
            @click.prevent="onClickLogout"
            >로그아웃</b-nav-item
          >
        </b-navbar-nav>
        <!-- before login -->
        <b-navbar-nav class="ml-auto" v-else>
          <router-link :to="{ name: 'join' }" class="link">
            <b-icon icon="person-circle"></b-icon> 회원가입
          </router-link>
          <router-link :to="{ name: 'login' }" class="link">
            <b-icon icon="key"></b-icon> 로그인
          </router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "TheHeaderNavbar",
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userid);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
.link {
  color: azure;
}

.link:hover {
  color: rgb(255, 119, 0);
  text-decoration-line: none;
}
.navbar {
  height: 80px !important;
}

.main {
  color: white;
  text-decoration: none;
}

.main:hover {
  color: rgb(255, 119, 0);
  text-decoration: none;
}
</style>
