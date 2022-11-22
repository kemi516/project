import { ref, watch } from "vue";
import { defineStore } from "pinia";
export const detaillStore = defineStore("detaill", () => {
  const keyIndex = sessionStorage.getItem("keyIndex")
    ? ref(+sessionStorage.getItem("keyIndex"))
    : ref(1000);

  watch(
    () => keyIndex.value,
    (n) => {
      sessionStorage.setItem("keyIndex", n);
    }
  );
  const tranName = ref("");
  const isTranStore = ref(false);
  return { keyIndex, tranName, isTranStore };
});
