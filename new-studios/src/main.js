import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "vant/lib/index.css";

import { Lazyload } from "vant";
Vue.use(Lazyload);
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});

Vue.use(Vant);
Vue.config.productionTip = false;

Vue.filter("matrixing", function (num) {
  return num >= 10000
    ? num >= 100000000
      ? (num / 100000000).toFixed(1) + "e"
      : (num / 10000).toFixed(1) + "w"
    : num >= 1000
    ? (num / 1000).toFixed(1) + "k"
    : num;
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
