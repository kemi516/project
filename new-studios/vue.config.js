const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // proxy: "https://app.xinpianchang.com/",
    // vue.config.js配置，需要重启
    proxy: {
      "/newstudios": {
        target: "https://app.xinpianchang.com",
        changeOrigin: true,
        pathRewrite: { "^/newstudios": "" },
      },
      "/home": {
        target: "https://apis.netstart.cn/xpc/",
        changeOrigin: true,
      },
      "/media": {
        target: "https://apis.netstart.cn/xpc/",
        changeOrigin: true,
      },
      "/xpc": {
        target: "https://apis.netstart.cn/xpc/",
        changeOrigin: true,
      },
      "": {
        target: "https://app.xinpianchang.com/",
        changeOrigin: true,
        headers: {
          "content-type": "application/json;charset=UTF-8",
          origin: "https://app.xinpianchang.com",
          referer: "https://app.xinpianchang.com/",
        },
      },
    },
  },
});
