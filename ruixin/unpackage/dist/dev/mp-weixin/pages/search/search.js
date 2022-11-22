"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      value: "",
      search: null,
      history: JSON.parse(localStorage.getItem("history")) || [],
      shows: false
    };
  },
  onLoad() {
  },
  methods: {
    focus() {
      console.log("123");
      this.search = [];
      this.value = "";
    },
    change(value) {
      this.value = value;
      common_vendor.index.request({
        url: "http://www.kangliuyong.com:10002/search",
        data: {
          appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
          name: this.value
        },
        success: (res) => {
          this.search = res.data.result;
          this.shows = this.search == "";
          console.log(this.shows);
        }
      });
      if (this.history.length) {
        this.history = [.../* @__PURE__ */ new Set([this.value, ...this.history])];
        localStorage.setItem("history", JSON.stringify(this.history));
      } else {
        this.history = [this.value];
        localStorage.setItem("history", JSON.stringify(this.history));
      }
    },
    detail(pid) {
      common_vendor.index.navigateTo({
        url: `../detail/detail?pid=${pid}`
      });
    },
    huitui() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d;
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.change($data.value)),
    b: common_vendor.o(($event) => $options.focus()),
    c: $data.value,
    d: common_vendor.o(($event) => $data.value = $event.detail.value),
    e: common_vendor.o((...args) => $options.huitui && $options.huitui(...args)),
    f: !((_a = $data.search) == null ? void 0 : _a.length) && !$data.shows
  }, !((_b = $data.search) == null ? void 0 : _b.length) && !$data.shows ? {
    g: common_vendor.f($data.history, (h, k0, i0) => {
      return {
        a: common_vendor.t(h),
        b: common_vendor.o(($event) => $options.change(h))
      };
    })
  } : {}, {
    h: $data.shows
  }, $data.shows ? {} : {}, {
    i: (_c = $data.search) == null ? void 0 : _c.length
  }, ((_d = $data.search) == null ? void 0 : _d.length) ? {
    j: common_vendor.f($data.search, (item, k0, i0) => {
      return {
        a: item.smallImg,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.enname),
        d: common_vendor.t(item.price),
        e: common_vendor.o(($event) => $options.detail(item.pid))
      };
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4cedc0c6"], ["__file", "D:/\u684C\u9762/\u9879\u76EE/ruixin/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
