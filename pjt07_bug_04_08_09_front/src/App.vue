<template>
  <div id="app">
    <header-nav></header-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderNav from "@/components/common/HeaderNav.vue";

export default {
  components: {
    HeaderNav,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jua&display=swap");
#app {
  position: relative;
  font-family: "Jua", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url("./assets/bg.jpg");
  background-size: cover;
  height: 100vh;
}
</style>
