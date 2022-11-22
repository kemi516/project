<script setup>
import { useCounterStore } from "../stores/counter";
const store = useCounterStore();
</script>

<template>
  <li
    v-for="(hot, index) in store.hotwords"
    :key="index"
    @click="
      store.routeValue = hot.keyword;
      $router.push({ path: '/search' });
    "
  >
    {{ hot.keyword }}
  </li>
</template>

<style lang="less" scoped>
li {
  font-size: 12rem;
  line-height: 18rem;
  margin-right: 10rem;
}
</style>
