<template>
  <div class="RecommendSong">
    <RecommendList v-for="item in recommend" :key="item.id" :item="item" />
  </div>
</template>

<script>
import RecommendList from "@/components/RecommendList.vue";
export default {
  name: "RecommendSong",
  props: {
    recommend: Array,
  },
  components: {
    RecommendList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.RecommendSong {
  display: flex;
  flex-wrap: wrap;
  div {
    flex-grow: 1;
    width: 30%;
    &:nth-child(3n + 2) {
      margin: 0 3rem;
    }
  }
}
</style>
