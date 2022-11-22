import { ref } from "vue";
import { defineStore } from "pinia";

export const useCityStore = defineStore("citysID", () => {
  // 城市Id
  const id = localStorage.getItem("id")
    ? ref(Number(localStorage.getItem("id")))
    : ref(Number("4401"));
  const citys = localStorage.getItem("citys")
    ? ref(JSON.parse(localStorage.getItem("citys")))
    : ref([]);
  const listActive = ref(0);
  // 监听次数
  const eventCount = ref(0);
  return { id, citys, eventCount, listActive };
});
