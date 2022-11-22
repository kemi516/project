"use strict";
var common_vendor = require("./common/vendor.js");
const _sfc_main = {
  props: {
    hotList: Array
  },
  data() {
    return {};
  },
  onLoad() {
  },
  methods: {
    detail(pid) {
      common_vendor.index.navigateTo({
        url: `../detail/detail?pid=${pid}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.hotList, (hot, k0, i0) => {
      return {
        a: hot.smallImg,
        b: common_vendor.t(hot.name),
        c: common_vendor.t(hot.enname),
        d: common_vendor.o(($event) => $options.detail(hot.pid))
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5b9c8edc"], ["__file", "D:/\u684C\u9762/\u9879\u76EE/ruixin/components/HotList/HotList.vue"]]);
exports.Component = Component;
