<template>
  <b-container class="bv-example-row mt-3">
    <b-row><kakao-map-view></kakao-map-view></b-row>
  </b-container>
</template>

<script>
import KakaoMapView from "@/components/map/KakaoMapView.vue";
export default {
  name: "MapDisplay",
  components: {
    KakaoMapView,
  },
};
</script>

<style></style>
