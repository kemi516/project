"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      fav: JSON.parse(localStorage.getItem("fav")) || []
    };
  },
  methods: {
    remove(name) {
      console.log("name", name);
      this.fav = this.fav.filter((e) => e.name != name);
      localStorage.setItem("fav", JSON.stringify(this.fav));
    }
  }
};
if (!Array) {
  const _component_path = common_vendor.resolveComponent("path");
  const _component_svg = common_vendor.resolveComponent("svg");
  (_component_path + _component_svg)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.fav.length
  }, $data.fav.length ? {
    b: common_vendor.f($data.fav, (item, k0, i0) => {
      return {
        a: item.img,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.enname),
        d: common_vendor.t(item.price),
        e: "1d1a5b80-1-" + i0 + "," + ("1d1a5b80-0-" + i0),
        f: "1d1a5b80-2-" + i0 + "," + ("1d1a5b80-0-" + i0),
        g: "1d1a5b80-0-" + i0,
        h: common_vendor.o(($event) => $options.remove(item.name))
      };
    }),
    c: common_vendor.p({
      d: "M840 288H688v-56c0-40-32-72-72-72h-208C368 160 336 192 336 232V288h-152c-12.8 0-24 11.2-24 24s11.2 24 24 24h656c12.8 0 24-11.2 24-24s-11.2-24-24-24zM384 288v-56c0-12.8 11.2-24 24-24h208c12.8 0 24 11.2 24 24V288H384zM758.4 384c-12.8 0-24 11.2-24 24v363.2c0 24-19.2 44.8-44.8 44.8H332.8c-24 0-44.8-19.2-44.8-44.8V408c0-12.8-11.2-24-24-24s-24 11.2-24 24v363.2c0 51.2 41.6 92.8 92.8 92.8h358.4c51.2 0 92.8-41.6 92.8-92.8V408c-1.6-12.8-12.8-24-25.6-24z",
      ["p-id"]: "2506"
    }),
    d: common_vendor.p({
      d: "M444.8 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24zM627.2 744v-336c0-12.8-11.2-24-24-24s-24 11.2-24 24v336c0 12.8 11.2 24 24 24s24-11.2 24-24z",
      ["p-id"]: "2507"
    }),
    e: common_vendor.p({
      t: "1667317428572",
      viewBox: "0 0 1024 1024",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      ["p-id"]: "2505",
      width: "16",
      height: "16"
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u684C\u9762/\u9879\u76EE/ruixin/pages/fav/fav.vue"]]);
wx.createPage(MiniProgramPage);
