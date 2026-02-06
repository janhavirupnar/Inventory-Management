import axios from "axios";

const API = axios.create({
  baseURL: "https://inventory-management-zydk.onrender.com/api/",
});


export default API;
