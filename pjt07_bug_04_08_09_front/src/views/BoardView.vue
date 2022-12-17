<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-hotpink">
      <b-icon icon="journals"></b-icon> 공지사항
    </h3>
    <router-view class="view"></router-view>
  </b-container>
</template>
<script>
export default {
  name: "BoardView",
};
</script>
<style scoped>
.underline-hotpink {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 27, 139, 0.3) 30%
  );
}
.view {
  background-color: rgba(255, 255, 255, 0.6); /*까만색(0,0,0) 80% 불투명도*/
}
</style>
