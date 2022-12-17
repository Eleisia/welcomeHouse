<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col min-rows="6">
        <b-table
          id="my-table"
          striped
          hover
          :items="houses"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          @row-clicked="selectHouse">
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-pagination
          v-model="currentPage"
          pills
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

const houseStore = "houseStore";
export default {
  name: "MapTest",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: "aptName",
          label: "아파트 이름",
          tdClass: "tdBuildYear",
          sortable: true,
        },
        { key: "floor", label: "층", tdClass: "tdFloor", sortable: true },
        { key: "area", label: "면적", tdClass: "tdArea", sortable: true },
        {
          key: "buildYear",
          label: "건축년도",
          tdClass: "tdBuildYear",
          sortable: true,
        },
        { key: "dongName", label: "법정동", tdClass: "tdDong", sortable: true },
        {
          key: "recentPrice",
          label: "거래금액",
          tdClass: "tdPrice",
          sortable: true,
        },
      ],
    };
  },
  watch: {
    // aptid: function () {
    //   console.log("WATCH");
    //   this.getAptImg(this.aptid);
    // },
  },
  methods: {
    ...mapActions(houseStore, ["detailHouse", "getAptId"]),
    selectHouse(house) {
      // this.$store.dispatch("getHouse", this.house);
      console.log(this.aptid, "SELECT1");

      this.detailHouse(house);
      this.getAptId(house);
      console.log(this.aptid, "SELECT2");
      this.$router.push({ name: "detail" });
    },
    colorChange(flag) {
      this.isColor = flag;
    },
  },
  computed: {
    ...mapState(houseStore, ["houses", "aptid"]),
    rows() {
      return this.houses.length;
    },
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
};
</script>

<style scoped>
.bv-example-row {
  margin-left: 30px;
}
</style>
