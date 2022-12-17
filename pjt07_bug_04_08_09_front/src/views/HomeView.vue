<template>
  <b-container class="text-center">
    <section class="container">
      <h1 class="title">
        <span>WelCome</span>
        <span>Happy</span>
        <span>House</span>
      </h1>
    </section>
    <!-- <b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark">
      <template #header>Happy House</template>

      <template #lead>배경 이미지 등등 들어갈 예정</template>
    </b-jumbotron> -->
    <br />
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
@import url("https://fonts.googleapis.com/css?family=Baloo+Paaji");
html,
body {
  height: 100%;
}

body {
  font-family: "Baloo Paaji", cursive;
  background: #1e90ff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 400px;
  height: 220px;
  position: relative;
}

h1 {
  font-size: 75px;
  text-transform: uppercase;
}
h1 span {
  width: 100%;
  float: left;
  color: black;
  -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
  clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
  transform: translateY(-50px);
  opacity: 0;
  animation-name: titleAnimation;
  animation-timing-function: ease;
  animation-duration: 5s;
  animation-iteration-count: infinite;
}

h1 span {
  animation-delay: 0.8s;
}
h1 span:first-child {
  animation-delay: 1.1s;
}
h1 span:last-child {
  color: #ffe221;
  animation-delay: 1.4s;
}

@keyframes titleAnimation {
  0% {
    transform: translateY(-50px);
    opacity: 0;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
  }
  20% {
    transform: translateY(0);
    opacity: 1;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
  80% {
    transform: translateY(0);
    opacity: 1;
    -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
  }
  100% {
    transform: translateY(50px);
    opacity: 0;
    -webkit-clip-path: polygon(100% 0, 100% 0%, 0 100%, 0 100%);
    clip-path: polygon(100% 0, 100% 0%, 0 100%, 0 100%);
  }
}
</style>
