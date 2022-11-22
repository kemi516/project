<template>
  <button class="search" @click="$emit('search-list', item.first)">
    {{ item.first }}
  </button>
</template>

<script>
export default {
  name: "SearchList",
  props: {
    item: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.search {
  line-height: 32rem;
  font-size: 14rem;
  padding: 0rem 14rem;
  border: 1rem solid #c9c9c9;
  background: transparent;
  margin-right: 8rem;
  margin-bottom: 8rem;
  border-radius: 20rem;
}
</style>
