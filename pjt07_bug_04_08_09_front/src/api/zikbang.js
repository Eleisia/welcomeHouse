import axios from "axios";

// axios 객체 생성
export default axios.create({
  baseURL: "https://apis.zigbang.com",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
