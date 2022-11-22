"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  computed: {
    username() {
      return store.state.username;
    }
  },
  methods: {
    navigator() {
      console.log("");
    },
    fav() {
      common_vendor.index.navigateTo({
        url: "/pages/fav/fav"
      });
    },
    order() {
      common_vendor.index.navigateTo({
        url: "/pages/orders/orders"
      });
    }
  },
  onLoad() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.navigator()),
    b: common_vendor.o((...args) => $options.order && $options.order(...args)),
    c: common_vendor.o((...args) => $options.fav && $options.fav(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u684C\u9762/\u9879\u76EE/ruixin/pages/me/me.vue"]]);
wx.createPage(MiniProgramPage);
