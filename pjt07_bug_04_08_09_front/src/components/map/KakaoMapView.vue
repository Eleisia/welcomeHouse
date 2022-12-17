<template>
  <div id="map"></div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const houseStore = "houseStore";

export default {
  data() {
    return {
      map: null,
      // 화면에 표시되어있는 marker들
      house2: null,
      markers: [],
    };
  },
  watch: {
    houses: function () {
      this.displayMarkers(this.houses, this.map);
    },
    lat: function () {
      // console.log(this, "WATCH", kakao, kakao.maps, this.map);
      if (this.map)
        this.map.setCenter(new kakao.maps.LatLng(this.lat, this.lng));
    },

    lng: function () {
      // console.log(this, "WATCH2", kakao, kakao.maps, this.map);
      if (this.map)
        this.map.setCenter(new kakao.maps.LatLng(this.lat, this.lng));
    },
    // aptid: function () {
    //   console.log("WATCH");
    //   this.getAptImg(this.aptid);
    // },
  },
  computed: {
    ...mapState(houseStore, ["houses", "lat", "lng"]),
  },

  methods: {
    ...mapActions(houseStore, [
      "detailHouse",
      "currentLocation",
      "getAptId",
      "getAptImg",
    ]),
    ...mapMutations(houseStore, ["SET_LAT_LNG"]),

    initMap() {
      console.log(this.lat, this.lng, "INIT", kakao);
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(this.lat, this.lng), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
    },

    displayMarkers(positions, map) {
      // 1. 현재 표시되어있는 marker들이 있다면 marker에 등록된 map을 없애준다.
      if (this.markers.length > 0) {
        this.markers.forEach((item) => {
          item.setMap(null);
        });
      }

      // 2. 마커 이미지 커스터마이징 하기
      // javascript 영역에서 assets의 정보 가져오기
      const imgSrc = require("@/assets/picture/homeMarker.png");
      const imgSrcOn = require("@/assets/picture/homeMarkerOn.png");
      const imgSize = new kakao.maps.Size(30, 30);
      const imgSizeOn = new kakao.maps.Size(33, 30);
      const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize);
      const markerImageOn = new kakao.maps.MarkerImage(imgSrcOn, imgSizeOn);

      // 3. 마커 표시하기
      positions.forEach((position) => {
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: new kakao.maps.LatLng(position.lat, position.lng), // 마커의 위치
          title: position.aptName, // 마우스 오버 시 표시할 제목
          image: markerImage, // 마커의 이미지
        });
        this.markers.push(marker);

        const iwContent =
          '<div style="text-align:center; padding:5px;">' +
          position.aptName +
          "</div>";

        // // 인포윈도우로 장소에 대한 설명을 표시합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });

        // 마커에 마우스오버 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "mouseover", function () {
          // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker);
          marker.setImage(markerImageOn);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "mouseout", function () {
          // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          marker.setImage(markerImage);
          infowindow.close();
        });

        // 마커에 클릭 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", () => {
          marker.setImage(markerImageOn);
          this.detailHouse(position);
          this.getAptId(position);
          this.$router.push({ name: "detail" });
          map.setCenter(new kakao.maps.LatLng(position.lat, position.lng));
          // map.setLevel(2, {
          //   anchor: new kakao.maps.LatLng(position.lat, position.lng),
          // });
        });

        kakao.maps.event.addListener(marker, "dragstart", function () {
          marker.setImage(markerImage);
        });
      });

      // 4. 지도를 이동시켜주기
      // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
      const bounds = positions.reduce(
        (bounds, position) =>
          bounds.extend(new kakao.maps.LatLng(position.lat, position.lng)),
        new kakao.maps.LatLngBounds(),
      );

      this.map.setBounds(bounds);
    },

    //displayMarkers 종료
  },

  created() {
    this.currentLocation();
    console.log(this.lat, this.lng, "CREATED");
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=aa15caa120a82ae0585203269abe17c8`;
      // 9e2d5285a8472f18f2d17aaef82f307a

      document.head.appendChild(script);
    }
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>
