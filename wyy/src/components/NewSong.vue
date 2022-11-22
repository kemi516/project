<template>
  <div class="NewSong">
    <NewList
      v-for="item in newSong"
      :key="item.id"
      :item="item"
      @song-id="addd"
      :palybt="palybt"
      :songId="songId"
    />
    <!-- @click="$emit('new-songid', item.id)" -->
  </div>
</template>

<script>
import NewList from "@/components/NewList.vue";
export default {
  name: "NewSong",
  props: {
    newSong: Array,
    songId: Number,
    palybt: Boolean,
  },
  components: {
    NewList,
  },
  methods: {
    addd(id) {
      // console.log(id);
      this.$emit("song-id", id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
