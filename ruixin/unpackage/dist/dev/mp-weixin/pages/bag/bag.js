"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      bags: null,
      bool: false,
      pianji: true
    };
  },
  onShow() {
    this.bags = JSON.parse(localStorage.getItem("bags")) || [];
  },
  methods: {
    reduc(e) {
      if (e.value > 1) {
        console.log(e.value);
        e.value -= 1;
      }
    },
    add(e) {
      if (e.value < 6) {
        e.value += 1;
      }
    },
    total(e) {
      e.bool = !e.bool;
      console.log(e.bool);
      this.bags = [...this.bags];
    },
    quanxuan(event) {
      this.bool = !this.bool;
      this.bags.map((e) => e.bool = this.bool);
      console.log(event);
    },
    del() {
      this.bags = this.bags.filter((e) => e.bool == false);
      console.log(this.bags);
      localStorage.setItem("bags", JSON.stringify(this.bags));
    },
    order() {
      if (this.bags.filter((e) => e.bool == true).length > 0) {
        localStorage.setItem("order", JSON.stringify(this.bags.filter((e) => e.bool == true)));
        common_vendor.index.navigateTo({
          url: "../order/order"
        });
      } else {
        common_vendor.index.showToast({
          title: "\u8BF7\u52FE\u9009\u5546\u54C1",
          duration: 2e3
        });
      }
    }
  },
  computed: {
    totals() {
      if (this.bags.filter((e) => e.bool).length > 0) {
        return this.bags.filter((e) => e.bool).map((e) => Number(e.price * e.value)).reduce((total, n) => {
          return total += n;
        });
      } else {
        return 0;
      }
    }
  },
  watch: {
    bags(n) {
      console.log(n);
      if (n.length > 0) {
        this.bool = n.every((e) => e.bool);
      }
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
  return common_vendor.e({
    a: $data.pianji || $data.bags.length == 0
  }, $data.pianji || $data.bags.length == 0 ? {
    b: common_vendor.o(($event) => $data.pianji = !$data.pianji)
  } : {
    c: common_vendor.o(($event) => $data.pianji = !$data.pianji)
  }, {
    d: common_vendor.f($data.bags, (bag, k0, i0) => {
      return {
        a: bag.bool,
        b: common_vendor.o(($event) => $options.total(bag)),
        c: bag.small_img,
        d: common_vendor.t(bag.name),
        e: common_vendor.t(bag.temName),
        f: common_vendor.t(bag.sugarName ? "/" + bag.sugarName : ""),
        g: common_vendor.t(bag.enname),
        h: common_vendor.t(bag.price),
        i: common_vendor.o(($event) => $options.reduc(bag)),
        j: "28930098-0-" + i0,
        k: bag.value,
        l: common_vendor.o(($event) => $options.add(bag))
      };
    }),
    e: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-jianshao",
      size: "25",
      color: "gray"
    }),
    f: $data.bags.length
  }, $data.bags.length ? common_vendor.e({
    g: $data.bool,
    h: common_vendor.o((...args) => $options.quanxuan && $options.quanxuan(...args)),
    i: $data.pianji
  }, $data.pianji ? {
    j: common_vendor.t($options.totals),
    k: common_vendor.o((...args) => $options.order && $options.order(...args))
  } : {
    l: common_vendor.o((...args) => $options.del && $options.del(...args))
  }) : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-28930098"], ["__file", "D:/\u684C\u9762/\u9879\u76EE/ruixin/pages/bag/bag.vue"]]);
wx.createPage(MiniProgramPage);
