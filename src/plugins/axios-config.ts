import axios, {AxiosInstance} from "axios";
import {showFailToast} from "vant";

const isDev = process.env.NODE_ENV === "development";

const requests: AxiosInstance = axios.create({
  baseURL: isDev ? "http://localhost:8080/api" : "http://localhost:8080/api"
});

requests.defaults.withCredentials = true; // 表示跨域请求时是否需要使用凭证

// 添加请求拦截器
requests.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let res = response.data;
  if (res.code === 200) {
    return res;
  } else {
    showFailToast(res.message + ", " + res.description);
    return res;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default requests;