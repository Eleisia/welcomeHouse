<template>
  <b-container>
    <!-- Left side columns -->
    <b-row>
      <b-col>
        <h5 class="card-title">시도 <span>| Sido</span></h5>

        <div class="d-flex align-items-center">
          <b-form-select
            v-model="sidoCode"
            :options="sidos"
            class="form-select bg-secondary text-light"
            id="sido"
            name="sido"
            @change="gugunList">
          </b-form-select>
        </div>
      </b-col>

      <!-- End Sales Card -->

      <!-- 구군 선택 Card -->
      <b-col>
        <h5 class="card-title">구군 <span>| Gugun</span></h5>
        <div class="d-flex align-items-center">
          <b-form-select
            v-model="gugunCode"
            :options="guguns"
            class="form-select bg-secondary text-light"
            id="gugun"
            name="gugun"
            @change="dongList">
          </b-form-select>
        </div>
      </b-col>
      <!-- End Sales Card -->

      <!-- 동 선택 Card -->
      <b-col>
        <h5 class="card-title">동 <span>| Dong</span></h5>
        <div class="d-flex align-items-center">
          <b-form-select
            v-model="dongCode"
            :options="dongs"
            class="form-select bg-secondary text-light"
            id="dong"
            name="dong"
            @change="searchApt">
          </b-form-select>
        </div>
      </b-col>
      <!-- End Sales Card -->
      <!-- End Sales Card -->
      <!-- Conponent 구분 -->
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

const houseStore = "houseStore";

export default {
  name: "MapSearch",

  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },

  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_APT_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getDong",
      "getHouseList",
    ]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "CLEAR_APT_LIST",
    ]),

    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },

    dongList() {
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) this.getDong(this.gugunCode);
    },

    searchApt() {
      this.$router.push({ name: "list" });
      if (this.dongCode) this.getHouseList(this.dongCode);
    },
  },
};
</script>
