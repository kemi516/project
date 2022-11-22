<script setup>
import { useCounterStore } from "../stores/counter";
const store = useCounterStore();

defineProps({
  searchedlist: Array,
});

const clearHandler = () => {
  store.searchedlist = [];
  localStorage.setItem("history", "[]");
};
</script>

<template>
  <div class="history">
    <p>历史搜索</p>
    <img
      width="15"
      src="../assets/delete.png"
      alt=""
      @click="clearHandler"
      v-if="store.searchedlist.length > 0"
    />
    <ul>
      <li
        v-for="(item, index) in store.searchedlist"
        :key="index"
        @click="$emit('getSearchedRes', { value: item })"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.history {
  margin-top: 10rem;
  position: relative;

  img {
    position: absolute;
    right: 0;
    top: 3rem;
  }
  p {
    color: #9b9b9b;
    margin-bottom: 10rem;
    font-size: 13rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      background: #eaeaea;
      padding: 8rem;
      margin-right: 10rem;
      margin-bottom: 10rem;
      border-radius: 2rem;
      color: #333;
      font-size: 13rem;
      span {
        img {
          vertical-align: -3rem;
        }
      }
    }
  }
}
</style>
