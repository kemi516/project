<template>
  <div class="box">
    <van-sticky>
      <div class="header">
        <span @click="$router.back()"> <img src="../../public/assets//_d.png" alt="" /> </span
        ><span>城市选择</span>
      </div>
    </van-sticky>
    <van-index-bar
      highlight-color="#000"
      :sticky="true"
      :sticky-offset-top="40"
    >
      <van-index-anchor index="定位">定位</van-index-anchor>
      <div class="hot">
        <p @click="toggleId(gz)" style="font-size:12rem ;" :class="{ border: gz.cityOID == store.id }">
          广州
        </p>
      </div>
      <van-index-anchor v-if="store.citys?.length != 0" index="历史"
        >历史</van-index-anchor
      >
      <div class="hot" v-if="store.citys?.length != 0">
        <p
          v-for="history in store.citys"
          :key="history.cityOID"
          @click="toggleId(history)"
          :class="{ border: history.cityOID == store.id }"
        >
          {{ history?.cityName }}
        </p>
      </div>

      <van-index-anchor index="热门">热门</van-index-anchor>
      <div class="hot">
        <p
          v-for="hot in hotCities"
          @click="toggleId(hot)"
          :class="{ border: hot.cityOID == store.id }"
          class="pClass"
          style="font-size:12rem ;"
        >
          {{ hot.cityName }}
        </p>
      </div>
      <div v-for="content in allCities">
        <van-index-anchor :index="content.title">{{
          content.title
        }}</van-index-anchor>
        <van-cell
          :title="city.cityName"
          v-for="city in content.cities"
          @click="toggleId(city)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script setup>
// import { getlocation} from "@/apis/show";
import { getlocation } from "@/apis/show";
import { ref, watch } from "vue";
import { useCityStore } from "../stores/citysID";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const store = useCityStore();
// 全部城市
const allCities = ref([]);
// 热门城市
const hotCities = ref([]);
// 广州
const gz = ref({
  cityName: "广州",
  cityOID: "4401",
  province: "广东省",
  spelling: "guangzhou",
});

getlocation().then((res) => {
  allCities.value = res.data.result.allCities;
  hotCities.value = res.data.result.hotCities;
});

// 点击跳转
const toggleId = (city) => {
  // 判断长度 去重
  if (store.citys?.length > 0) {
    const i = store.citys.findIndex((e) => e.cityOID === city.cityOID);
    if (i == -1) {
      store.citys.unshift(city);
    } else {
      store.citys.splice(i, 1);
      store.citys.unshift(city);
    }
  } else {
    store.citys.unshift(city);
  }
  store.id = city.cityOID;
  localStorage.setItem("citys", JSON.stringify(store.citys));
  localStorage.setItem("id", city.cityOID);

  // if (route.query.from == "/") {
  //   setInterval(() => {
  //     history.go(0);
  //   }, 100);
  // }
  router.replace(route.query.from);
};

// 定位

// 动画
const isTran = ref(false);
import { onMounted } from "vue";
onMounted(() => {
  isTran.value = true;
});
</script>

<style lang="less" scoped>
// 动画
.searchTran-enter-from,
.searchTran-leave-to {
  position: fixed;
  top: 0;
  z-index: 300;
  transform: translateX(100vw);
}
.searchTran-enter-active {
  transition: all 0.3s;
}
.searchTran-leave-active {
  transition: all 0.2s;
}

.searchTran-enter-to,
.searchTran-leave-from {
  position: fixed;
  top: 0;
  transform: translateX(0vw);
}

// 内容

.border {
  border: 1rem solid red;
}

.box {
  background-color: #f2f2f2;
  width: 100vw;
  .header {
    background-color: white;
    height: 40rem;
    line-height: 40rem;
    font-size: 16rem;
    display: flex;
    span {
      margin: 0 15rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      > img {
        height: 80%;
        width: 80%;
        display: inline-block;
        object-fit: contain;
      }
    }
  }
}

.hot {
  display: flex;
  // align-items: center;
  // justify-content: space-evenly;
  width: 100%;
  flex-wrap: wrap;
  padding: 0 10rem;
  box-sizing: border-box;

  p {
    border-radius: 5rem;
    margin: 10rem;
    padding: 10rem;
    padding: 10rem;
    text-align: center;
    box-sizing: border-box;
    width: 25%;
    flex-shrink: 0;
    background-color: white;
  }
}
</style>

<style>
.van-index-anchor--sticky {
  background-color: #f2f2f2 !important;
}
</style>
