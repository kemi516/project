import { ref } from "vue";
import { defineStore } from "pinia";

export const greatStore = defineStore('great',() => {
  const watching = ref();
  return { watching };
});
