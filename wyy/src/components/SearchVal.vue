<template>
  <div class="SearchVal">
    <div><i class="fa fa-search" aria-hidden="true"></i></div>
    <div @click="$emit('search-val', item.keyword)">
      <!-- {{ item.name }} -->
      {{ item.keyword }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchVal",
  props: {
    item: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.SearchVal {
  font-size: 15rem;
  display: flex;
  div {
    padding: 16rem 0;
    &:first-child {
      width: 6%;
      i {
        color: #c9c9c9;
      }
    }
    &:last-child {
      border-bottom: 1px solid #ebecec;
      width: 94%;
    }
  }
}
.bottom {
  padding-left: 0;
}
</style>
