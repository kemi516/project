"use strict";

import Vue from "vue";
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    // return Promise.reject(error);
    console.log(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },

  // Do something with response error
  // return Promise.reject(error);

  (error) => {
    const { status } = error.response;
    if (status === 401) {
      // 未授权
      console.log("未授权");
    } else if (status === 403) {
      // 没有权限
      console.log("没有权限");
    } else if (status === 404) {
      // 资源不存在
      // Toast.fail({
      //   message: '请求资源不存在',
      //   forbidClick: true
      // })
      console.log("请求资源不存在");
    } else if (status >= 500) {
      // 服务端异常
      // Toast.fail({
      //   message: '服务端异常，请稍后重试',
      //   forbidClick: true
      // })
      console.log("服务端异常，请稍后重试");
    }
  }
);

Plugin.install = function (Vue, options) {
  options;
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
