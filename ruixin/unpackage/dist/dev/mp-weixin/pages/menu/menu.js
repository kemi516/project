"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      image: [
        {
          id: 0,
          name: "\u63A8\u8350",
          type: "isHot",
          icon: {
            active: "/static/images/icons_21.gif",
            inactive: "/static/images/icons_09.gif"
          }
        },
        {
          id: 1,
          name: "\u62FF\u94C1",
          type: "latte",
          icon: {
            active: "/static/images/icons_18.gif",
            inactive: "/static/images/icons_03.gif"
          }
        },
        {
          id: 2,
          name: "\u5496\u5561",
          type: "coffee",
          icon: {
            active: "/static/images/icons_19.gif",
            inactive: "/static/images/icons_05.gif"
          }
        },
        {
          id: 3,
          name: "\u51B0\u6DC7\u6DCB",
          type: "rena_ice",
          icon: {
            active: "/static/images/icons_20.gif",
            inactive: "/static/images/icons_07.gif"
          }
        }
      ],
      act: 0,
      menus: []
    };
  },
  onLoad() {
    common_vendor.index.request({
      url: "http://www.kangliuyong.com:10002/typeProducts",
      data: {
        appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
        key: "isHot",
        value: 1
      },
      success: (res) => {
        console.log(res);
        this.menus = res.data.result;
      }
    });
  },
  methods: {
    toggle(type, id) {
      this.act = id;
      if (type == "isHot") {
        common_vendor.index.request({
          url: "http://www.kangliuyong.com:10002/typeProducts",
          data: {
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            key: "isHot",
            value: 1
          },
          success: (res) => {
            this.menus = res.data.result;
          }
        });
      } else {
        common_vendor.index.request({
          url: "http://www.kangliuyong.com:10002/typeProducts",
          data: {
            appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
            key: "type",
            value: type
          },
          success: (res) => {
            console.log(res);
            this.menus = res.data.result;
          }
        });
      }
    },
    detail(pid) {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?pid=${pid}`
      });
    },
    search() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.search && $options.search(...args)),
    b: common_vendor.f($data.image, (img, k0, i0) => {
      return common_vendor.e({
        a: $data.act == img.id
      }, $data.act == img.id ? {
        b: img.icon.active
      } : {
        c: img.icon.inactive
      }, {
        d: common_vendor.t(img.name),
        e: common_vendor.o(($event) => $options.toggle(img.type, img.id))
      });
    }),
    c: common_vendor.f($data.menus, (menu, k0, i0) => {
      return {
        a: menu.smallImg,
        b: common_vendor.t(menu.name),
        c: common_vendor.t(menu.enname),
        d: common_vendor.t(menu.price),
        e: common_vendor.o(($event) => $options.detail(menu.pid))
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/\u684C\u9762/\u9879\u76EE/ruixin/pages/menu/menu.vue"]]);
wx.createPage(MiniProgramPage);
