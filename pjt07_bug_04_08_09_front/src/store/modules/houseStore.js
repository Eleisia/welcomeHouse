import { sidoList, gugunList, dongList, houseList } from "@/api/house.js";
import zbapi from "@/api/zikbang.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    dongs: [{ value: null, text: "선택하세요" }],
    houses: [],
    house: null,
    lat: 32,
    lng: 32,
    aptid: 0,
    aptimg: "@/assets/picture/apt.png",
  },
  getters: {},
  mutations: {
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_APT_LIST(state) {
      state.houses = [];
      state.house = null;
    },
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
      });
    },

    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },
    SET_DETAIL_HOUSE(state, house) {
      console.log(house, "HOUSE");
      state.house = house;
      state.lat = house.lat;
      state.lng = house.lng;
    },

    SET_LAT_LNG(state, position) {
      state.lat = position.coords.latitude;
      state.lng = position.coords.longitude;
    },
    SET_APT_ID(state, resp) {
      console.log(resp.id, "ID", resp);
      if (resp.id === undefined) state.aptid = null;
      state.aptid = resp.id;
    },
    SET_APT_IMG(state, resp) {
      console.log(resp.img, "IMG");
      state.aptimg = resp.img;
    },
  },
  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = { sido: sidoCode };
      gugunList(
        params,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getDong: ({ commit }, gugunCode) => {
      const params = { gugun: gugunCode };
      dongList(
        params,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    getHouseList: ({ commit }, dongCode) => {
      const params = { dong: dongCode };
      houseList(
        params,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", house);
    },

    currentLocation: ({ commit }) => {
      // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
      navigator.geolocation.getCurrentPosition((position) => {
        commit("SET_LAT_LNG", position);
      });
    },

    getAptId({ commit }, Location) {
      zbapi
        .get(`/v2/search`, {
          params: {
            leaseYn: "N",
            q: Location.aptName.replace(/[()]/g, ""),
            serviceType: "아파트",
          },
        })
        .then((response) => {
          response.data.items.forEach((el) => {
            // console.log(el._source.법정동코드);
            if (el._source.법정동코드 === Location.dongCode) {
              // console.log(el.aptName);
              commit({
                type: "SET_APT_ID",
                id: el.id,
              });
            }
          });
        });
    },

    getAptImg({ commit }, aptId) {
      // { commit }, aptId
      zbapi.get(`/property/apartments/${aptId}`).then((response) => {
        console.log("zbData:", response.data);
        switch (response.status) {
          case 200:
            commit({
              type: "SET_APT_IMG",
              img: response.data.image,
            });
            break;

          case 400:
          case 500:
            this.alertMessage(response.status);
            break;
        }
      });
    },
  },
};

export default houseStore;
