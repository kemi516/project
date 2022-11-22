<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from "../stores/counter";

const store = useCounterStore();
const router = useRouter();
const route = useRoute();
const tranName = ref("");
router.beforeEach((to, from, next) => {
  if (to.path === "/" || to.path === "/me" || to.path === "/list") {
    tranName.value = "";
  } else {
    tranName.value = "homeTran";
  }
  next();
});
if (router.currentRoute.value.fullPath === "/list") {
  store.active = 1;
} else if (router.currentRoute.value.fullPath === "/me") {
  store.active = 2;
} else {
  store.active = 0;
}
const icon = {
  home_inactive: "../../public/assets//d919980.png",
  home_active: "../../public/assets//35f2215.png",
  list_inactive: "../../public/assets//ddc66f4.png",
  list_active: "../../public/assets//d90ccc2.png",
  me_inactive: "../../public/assets//9d7cd31.png",
  me_active: "../../public/assets//f1ccdd7.png",
};
</script>

<template>
  <van-tabbar class="tabbar" v-model="store.active" active-color="#ff1d41" inactive-color="#333">
    <van-tabbar-item to="/" @click="store.active = 0">
      <template #icon="props">
        <img :src="props.active ? icon.home_active : icon.home_inactive" />
      </template>
      <span>精选</span>
    </van-tabbar-item>
    <van-tabbar-item to="/list" @click="store.active = 1">
      <template #icon="props">
        <img :src="props.active ? icon.list_active : icon.list_inactive" />
      </template>
      <span>演出</span>
    </van-tabbar-item>
    <van-tabbar-item to="/me" @click="store.active = 2">
      <template #icon="props">
        <img :src="props.active ? icon.me_active : icon.me_inactive" />
      </template>
      <span>我的</span>
    </van-tabbar-item>
  </van-tabbar>

  <!-- <RouterView /> -->
  <router-view v-slot="{ Component }">
    <Transition :name="tranName">
      <KeepAlive :exclude="['MeView', 'ListView']">
        <component :is="Component"></component>
      </KeepAlive>
    </Transition>
  </router-view>
</template>

<style lang="less" scoped>
.homeTran-enter-from,
.homeTran-leave-to {
  // position: fixed;
  // top: 0;
  transform: translateX(-100vw);
  opacity: 0;
}

.homeTran-enter-active {
  transition: all 0.3s;
}

.homeTran-leave-active {
  transition: all 0.3s;
}

.homeTran-enter-to,
.homeTran-leave-from {
  position: fixed;
  top: 0;
  transform: translateX(0);
  opacity: 1;
}

.tabbar {
  font-size: 12rem;
}
</style>
