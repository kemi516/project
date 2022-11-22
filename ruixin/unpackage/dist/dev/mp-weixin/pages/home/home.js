"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      banner: [],
      time: new Date().getHours(),
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      current: 0,
      hotList: []
    };
  },
  onLoad() {
    common_vendor.index.request({
      url: "http://www.kangliuyong.com:10002/banner",
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
      },
      success: (res) => {
        this.banner = res.data.result;
      }
    }), common_vendor.index.request({
      url: "http://www.kangliuyong.com:10002/typeProducts",
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        key: "isHot",
        value: 1
      },
      success: (res) => {
        this.hotList = res.data.result;
      }
    });
  },
  methods: {
    toggleCurrent(e) {
      this.current = e.detail.current;
    },
    ddd(i) {
      this.current = i;
    },
    search() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    }
  }
};
if (!Array) {
  const _easycom_HotList2 = common_vendor.resolveComponent("HotList");
  _easycom_HotList2();
}
const _easycom_HotList = () => "../../components/HotList/HotList2.js";
if (!Math) {
  _easycom_HotList();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return common_vendor.e({
    a: $data.time >= 6 && $data.time < 12
  }, $data.time >= 6 && $data.time < 12 ? {} : {}, {
    b: $data.time >= 12 && $data.time < 18
  }, $data.time >= 12 && $data.time < 18 ? {} : {}, {
    c: $data.time >= 18 && $data.time < 24
  }, $data.time >= 18 && $data.time < 24 ? {} : {}, {
    d: $data.time == 24 || $data.time < 6
  }, $data.time == 24 || $data.time < 6 ? {} : {}, {
    e: common_vendor.o((...args) => $options.search && $options.search(...args)),
    f: common_vendor.f($data.banner, (ban, index, i0) => {
      return {
        a: ban.bannerImg
      };
    }),
    g: $data.autoplay,
    h: $data.interval,
    i: $data.current,
    j: common_vendor.o((...args) => $options.toggleCurrent && $options.toggleCurrent(...args)),
    k: $data.duration,
    l: common_vendor.f((_a = $data.banner) == null ? void 0 : _a.length, (item, i, i0) => {
      return {
        a: i == $data.current ? 1 : "",
        b: common_vendor.o(($event) => $options.ddd(i))
      };
    }),
    m: common_vendor.p({
      hotList: $data.hotList
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u684C\u9762/\u9879\u76EE/ruixin/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
