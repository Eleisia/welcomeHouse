<template>
  <b-container class="text-center">
    <!-- <b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark">
      <template #header>Happy House</template>

      <template #lead>배경 이미지 등등 들어갈 예정</template>
    </b-jumbotron> -->
    <br />
    <b-card class="view">
      <h2>News</h2>
      <div>
        <b-table
          hover
          head-variant="dark"
          :items="items"
          @row-clicked="clickedRow"
          caption="클릭시 해당 기사로 이동합니다."
          caption-top=""></b-table>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import http from "@/api/http";

export default {
  data() {
    return {
      items: [],
      org_items: [],
    };
  },
  created() {
    const naver = async () => {
      const response = await http.get("/news/" + encodeURI("부동산시장"));
      const items = response.data.items;
      //console.log(items);
      for (let idx in items) {
        let str = items[idx].title.replace(/<[^>]*>?/g, "");
        str = str.split("&quot;").join("'");
        str = str.split("&apos;").join("'");
        const temp = {
          Title: str,
        };
        this.items.push(temp);
      }
      this.org_items = items;
    };
    naver();
  },
  methods: {
    clickedRow(record, index) {
      //console.log(record, index);
      console.log(this.org_items[index]);
      window.open(this.org_items[index].link);
    },
  },
};
</script>

<style scoped>
/* @import url(https://fonts.googleapis.com.com/earlyaccess/nanumgothic.css);
h2 {
  font-family: "Oswald", sans-serif;
  font-size: 30px;
  color: #216182;
} */
.view {
  background-color: rgba(255, 255, 255, 0.6); /*까만색(0,0,0) 80% 불투명도*/
}
</style>
