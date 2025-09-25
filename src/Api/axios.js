import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-8a6dc/us-central1/api",
//deployed version of amazon server on render.com
  baseURL: "https://amazon-api-deploy-1-avqw.onrender.com/",
});

export default axiosInstance;
