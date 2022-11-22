import { ref } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const details = ref(null);

  const kk = ref(22);
  function increment() {
    console.log(111);
  }

  const active = ref(0);
  const hotwords = ref([]);
  const searchedlist = localStorage.getItem("history")
    ? ref(JSON.parse(localStorage.getItem("history")))
    : ref([]);

  // ljh
  const isActive = ref(false);
  // 城市Id
  const citysId = ref(4401);

  const isProgramgActive = ref(false);

  // route 路径
  const routeValue = ref();
  // 搜索关键词
  const routeKeyValue = ref();
  return {
    active,
    hotwords,
    searchedlist,
    kk,
    increment,
    isActive,
    citysId,
    isProgramgActive,
    routeValue,
  };
});
