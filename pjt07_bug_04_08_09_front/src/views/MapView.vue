<template>
  <div>
    <map-search></map-search>

    <b-row>
      <b-col cols="4">
        <router-view class="view" />
      </b-col>
      <b-col cols="8">
        <map-display />
      </b-col>
    </b-row>

    <!-- <b-row>
      <b-col cols="6" align="left">
        <map-list />
      </b-col>
      <b-col cols="6"> -->
    <!-- <map-detail /> -->
    <!-- </b-col>
    </b-row> -->
  </div>
</template>

<script>
// import MapHeader from "@/components/map/MapHeader.vue";
import MapSearch from "@/components/map/MapSearch.vue";
import MapDisplay from "@/components/map/MapDisplay.vue";
// import MapList from "@/components/map/MapList.vue";
// import MapDetail from "@/components/map/MapDetail.vue";

export default {
  name: "MapView",

  components: {
    // MapHeader,
    MapSearch,
    MapDisplay,
    // MapList,
    // MapDetail,
  },
  mounted() {
    this.$router.push({ name: "list" });
  },
};
</script>

<style>
.view {
  background-color: rgba(255, 255, 255, 0.6); /*까만색(0,0,0) 80% 불투명도*/
}
</style>
