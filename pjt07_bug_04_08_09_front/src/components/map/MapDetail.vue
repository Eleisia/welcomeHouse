<template>
  <b-container v-if="house" class="bv-example-row">
    <b-row>
      <div class="text-lg-end text-center">
        <b-button variant="link" to="/map">뒤로가기</b-button>
      </div>
      <b-col
        ><h3>{{ house.aptName }}</h3></b-col
      >
    </b-row>
    <b-row class="mb-2 mt-1">
      <b-col><b-img :src="getImg()" fluid></b-img></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="primary"
          >아파트 이름 : {{ house.aptName }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="primary">층 : {{ house.floor }} </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="info">법정동 : {{ house.dongName }} </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="warning"
          >건축년도 : {{ house.buildYear }}년</b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="danger"
          >거래금액 :
          {{
            (parseInt(house.recentPrice.replace(",", "")) * 10000) | price
          }}원</b-alert
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const houseStore = "houseStore";
export default {
  name: "HouseDetail",
  computed: {
    ...mapState(houseStore, ["house", "aptimg", "aptid"]),
  },

  methods: {
    ...mapActions(houseStore, ["getAptImg"]),
    getImg() {
      console.log("TEST", this.house);
      this.getAptImg(this.aptid);
      console.log(this.aptid, "DETAIL");
      if (this.aptid === null) return require("@/assets/picture/apt.png");
      return `${this.aptimg}&w=400&h=400`;
    },
  },

  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style></style>
