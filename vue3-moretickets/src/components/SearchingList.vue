<script setup>
defineProps({
  searchinglist: Array,
});
import { useCounterStore } from "../stores/counter.ts";
const store = useCounterStore();
</script>

<template>
  <ul>
    <li v-for="searches in searchinglist" :key="searches.showId" @click.stop="store.routeValue='';$router.push({path:'/detail',query:{showID:searches.showId}})">
      <p v-html="searches.showName"></p>
      <p>
        <span v-html="searches.venueName"></span>
        <span>{{ searches.showDate }}</span>
      </p>
      <van-divider />
    </li>
  </ul>
</template>

<style lang="less" scoped>
ul {
  font-size: 12rem;
  li {
    p {
      margin: 0;
      &:nth-child(1) {
        font-weight: 500;
        font-size: 13rem;
        line-height: 20rem;
      }
      &:nth-child(2) {
        display: flex;
        justify-content: space-between;
        color: #aaa;
        margin-top: 5rem;
        span {
          &:nth-child(1) {
            width: 45%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
