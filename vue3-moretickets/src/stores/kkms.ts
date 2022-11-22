import { ref } from "vue";
import { defineStore } from "pinia";

export const useKkmStore = defineStore("kkm", () => {
  const attention = JSON.parse(localStorage.getItem("attention")) || ref([]);
  const collect = localStorage.getItem("collect")
    ? JSON.parse(localStorage.getItem("collect"))
    : ref([]);
  // const order = (JSON.parse(localStorage.getItem("order"))) || ref([])
  const order = localStorage.getItem("order")
    ? ref(JSON.parse(localStorage.getItem("order")))
    : ref([]);
  const order2 = ref([]);
  const address = ref("");
  const imgs = ref("");

  return {
    attention,
    collect,
    order,
    address,
    imgs,
    order2,
  };
});
