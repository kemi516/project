<script setup lang="ts">
import { detaillStore } from "./stores/detaill";
import { ref } from "vue";
import { useShareStore } from "./stores/share";
const storeD = detaillStore();
const options = ref([
  [
    { name: "微信", icon: "wechat" },
    { name: "朋友圈", icon: "wechat-moments" },
    { name: "微博", icon: "weibo" },
    { name: "QQ", icon: "qq" },
  ],
  [
    { name: "复制链接", icon: "link" },
    { name: "分享海报", icon: "poster" },
    { name: "二维码", icon: "qrcode" },
    { name: "小程序码", icon: "weapp-qrcode" },
  ],
]);
const share = useShareStore();
const selectValue = (o: any) => {
  if (o.name == "复制链接") {
    share.showShare = false;
    let a = document.createElement("textarea");
    a.innerText = location.href;
    document.body.appendChild(a);
    a.select();
    document.execCommand("Copy");
    document.body.removeChild(a);
    let b: any = document.createElement("div");
    b.innerText = "复制成功";
    b.className = `xxx`;
    document.body.appendChild(b);
    setTimeout(() => {
      b.style = "opacity:0;";
    }, 500);
    setTimeout(() => {
      document.body.removeChild(b);
    }, 1000);
  }
};
</script>

<template>
  <van-share-sheet
    v-model:show="share.showShare"
    title="立即分享给好友"
    :options="options"
    @select="selectValue"
  />
  <router-view v-slot="{ Component }">
    <KeepAlive
      :exclude="[
        'SearchView',
        'LoginView',
        'DetailView',
        'ArtistView',
        'AttentionView',
        'BuyTicket',
        'CollectView',
        'LogOutView',
        'MyOrderView',
        'LocationView',
        'programAllView',
        'OrderView',
        'VenueView',
        'GreatValueSelection',
      ]"
    >
      <component :is="Component" :key="storeD.keyIndex"></component>
    </KeepAlive>
  </router-view>
</template>

<style lang="less">
.xxx {
  width: 100rem;
  height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: rgba(33, 33, 33, 0.701);
  color: white;
  border-radius: 5rem;
  transition: all 0.5s;
  opacity: 1;
  z-index: 10000;
}
</style>
<style scoped></style>
