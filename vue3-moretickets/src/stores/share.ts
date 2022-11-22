import { ref } from "vue";
import { defineStore } from "pinia";

export const useShareStore = defineStore("share", () => {
  const showShare = ref(false);

  return {
    showShare,
  };
});
