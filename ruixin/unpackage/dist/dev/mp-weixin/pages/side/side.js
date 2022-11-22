"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
    common_vendor.index.request({
      url: "http://www.kangliuyong.com:10002/addAddress",
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        province: "\u5E7F\u4E1C\u7701",
        city: "\u6E5B\u6C5F\u5E02",
        county: "\u5434\u5DDD"
      },
      success(res) {
        console.log(res);
      }
    });
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u684C\u9762/\u9879\u76EE/ruixin/pages/side/side.vue"]]);
wx.createPage(MiniProgramPage);
