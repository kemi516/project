"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      detail: {},
      favd: JSON.parse(localStorage.getItem("fav")) || [],
      options: [{
        icon: "",
        text: "\u8D2D\u7269\u888B"
      }, {
        icon: "shop",
        text: "",
        info: 2,
        infoBackgroundColor: "#007aff",
        infoColor: "#f5f5f5"
      }],
      sugarName: "",
      temName: "",
      value: 1,
      bags: JSON.parse(localStorage.getItem("bags")) || []
    };
  },
  onLoad(e) {
    common_vendor.index.request({
      url: "http://www.kangliuyong.com:10002/productDetail",
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        pid: e.pid
      },
      success: (res) => {
        var _a, _b;
        this.detail = res.data.result[0];
        this.sugarName = (_a = this.detail.sugar) == null ? void 0 : _a.split("/")[0];
        this.temName = (_b = this.detail.tem) == null ? void 0 : _b.split("/")[0];
      }
    });
  },
  methods: {
    orders() {
      common_vendor.index.switchTab({
        url: "/pages/bag/bag"
      });
    },
    favs(favds) {
      this.fav = false;
      console.log("fav", favds);
      this.favd = [...this.favd, favds];
      localStorage.setItem("fav", JSON.stringify(this.favd));
    },
    remove(name) {
      this.fav = true;
      console.log("name", name);
      this.favd = this.favd.filter((e) => e.name != name);
      localStorage.setItem("fav", JSON.stringify(this.favd));
    },
    reduce() {
      if (this.value > 1) {
        this.value--;
      }
    },
    add() {
      if (this.value < 6) {
        this.value++;
      }
    },
    bag() {
      let obj = {
        value: this.value,
        name: this.detail.name,
        enname: this.detail.enname,
        price: this.detail.price,
        sugarName: this.sugarName,
        temName: this.temName,
        pid: this.pid,
        small_img: this.detail.small_img,
        bool: false,
        time: new Date().getTime()
      };
      common_vendor.index.showToast({
        title: "\u6210\u529F\u52A0\u5165\u8D2D\u7269\u888B",
        duration: 2e3
      });
      console.log(this.bags);
      this.bags = [obj, ...this.bags];
      localStorage.setItem("bags", JSON.stringify(this.bags));
    },
    order() {
      let order = [{
        value: this.value,
        name: this.detail.name,
        enname: this.detail.enname,
        price: this.detail.price,
        sugarName: this.sugarName,
        temName: this.temName,
        pid: this.pid,
        small_img: this.detail.small_img,
        time: new Date().getTime()
      }];
      localStorage.setItem("order", JSON.stringify(order));
      common_vendor.index.navigateTo({
        url: `../order/order?value=${this.value}&name=${this.detail.name}&enname=${this.detail.enname}&price=${this.detail.price}&temName=${this.temName}&sugarName=${this.sugarName}`
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f;
  return common_vendor.e({
    a: `url(${$data.detail.large_img})`,
    b: common_vendor.t($data.detail.name),
    c: common_vendor.t($data.detail.enname),
    d: common_vendor.t($data.detail.price),
    e: common_vendor.t($data.detail.tem_desc),
    f: common_vendor.f((_b = (_a = $data.detail) == null ? void 0 : _a.tem) == null ? void 0 : _b.split("/"), (tem, i, i0) => {
      return {
        a: common_vendor.t(tem),
        b: common_vendor.o(($event) => $data.temName = tem),
        c: $data.temName == tem ? 1 : ""
      };
    }),
    g: common_vendor.t($data.detail.sugar_desc),
    h: common_vendor.f((_d = (_c = $data.detail) == null ? void 0 : _c.sugar) == null ? void 0 : _d.split("/"), (sugar, i, i0) => {
      return {
        a: common_vendor.t(sugar ? sugar : "\u5168\u7CD6"),
        b: common_vendor.o(($event) => $data.sugarName = sugar),
        c: $data.sugarName == sugar ? 1 : ""
      };
    }),
    i: common_vendor.o($options.reduce),
    j: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-jianshao",
      size: "25",
      color: "gray"
    }),
    k: $data.value,
    l: common_vendor.o(($event) => $data.value = $event.detail.value),
    m: common_vendor.o((...args) => $options.add && $options.add(...args)),
    n: common_vendor.f((_f = (_e = $data.detail) == null ? void 0 : _e.desc) == null ? void 0 : _f.split("\n"), (desc, i, i0) => {
      return {
        a: common_vendor.t(i + 1),
        b: common_vendor.t(desc)
      };
    }),
    o: common_vendor.t($data.bags.length),
    p: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-gouwudai",
      size: "20",
      color: "blue"
    }),
    q: common_vendor.o((...args) => $options.orders && $options.orders(...args)),
    r: !this.favd.map((e) => e.name).includes($data.detail.name)
  }, !this.favd.map((e) => e.name).includes($data.detail.name) ? {
    s: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-aixin",
      size: "20"
    }),
    t: common_vendor.o(($event) => $options.favs({
      img: $data.detail.small_img,
      name: $data.detail.name,
      enname: $data.detail.enname,
      price: $data.detail.price
    }))
  } : {
    v: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-aixin",
      size: "20",
      color: "blue"
    }),
    w: common_vendor.o(($event) => $options.remove($data.detail.name))
  }, {
    x: common_vendor.o((...args) => $options.bag && $options.bag(...args)),
    y: common_vendor.o((...args) => $options.order && $options.order(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3e159eb4"], ["__file", "D:/\u684C\u9762/\u9879\u76EE/ruixin/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
