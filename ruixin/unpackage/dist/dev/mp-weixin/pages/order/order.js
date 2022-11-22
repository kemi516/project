"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      orders: JSON.parse(localStorage.getItem("order")) || [],
      bags: JSON.parse(localStorage.getItem("bags")) || [],
      historyOrder: JSON.parse(localStorage.getItem("historyOrder")) || []
    };
  },
  onLoad(option) {
    console.log(option);
  },
  computed: {
    total() {
      if (this.orders.length > 0) {
        return this.orders.map((e) => Number(e.price * e.value)).reduce((total, n) => {
          return total += n;
        });
      } else {
        return 0;
      }
    }
  },
  methods: {
    jiesuan(oder) {
      localStorage.setItem("historyOrder", JSON.stringify([...this.orders, ...this.historyOrder]));
      common_vendor.index.showToast({
        title: "\u8D2D\u4E70\u6210\u529F",
        duration: 500
      });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/orders/orders"
        });
      }, 500);
      Array.from(oder).forEach((e) => {
        this.bags = this.bags.filter((ef) => ef.time !== e.time);
      });
      localStorage.setItem("bags", JSON.stringify(this.bags));
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.orders, (order, k0, i0) => {
      return {
        a: order.small_img,
        b: common_vendor.t(order.name),
        c: common_vendor.t(order.temName),
        d: common_vendor.t(order.sugarName ? "/" + order.sugarName : ""),
        e: common_vendor.t(order.enname),
        f: common_vendor.t(order.price),
        g: common_vendor.t(order.value)
      };
    }),
    b: common_vendor.t(new Date().getFullYear()),
    c: common_vendor.t(new Date().getMonth() + 1),
    d: common_vendor.t(new Date().getDate()),
    e: common_vendor.t(new Date().getHours()),
    f: common_vendor.t(new Date().getMinutes() + 1),
    g: common_vendor.t(new Date().getSeconds()),
    h: common_vendor.t($data.orders.length),
    i: common_vendor.t($options.total),
    j: common_vendor.o(($event) => $options.jiesuan(this.orders))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u684C\u9762/\u9879\u76EE/ruixin/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
