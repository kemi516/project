<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/home">Home</router-link> |
      <router-link to="/note">About</router-link>
    </nav> -->
    <!-- <keep-alive> -->
    <!-- <router-view v-if="homemd" :key="childKey" /> -->
    <router-view :key="childKey" />
    <!-- <router-view v-else /> -->
    <!-- </keep-alive> -->
    <TabsShare :class="{ shareTabs: true, active: shareState }"></TabsShare>
  </div>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

import { mapMutations, mapState } from "vuex";
import TabsShare from "@/components/TabsCom/TabsShare.vue";
export default {
  components: {
    TabsShare
  },
  methods: {
    ...mapMutations(["updateKey"]),
  },
  computed: {
    ...mapState(["childKey", 'homemd', 'shareState']),
  },
};
</script>

<style lang="less">
#app {
  font-size: 12rem;

  .xxx {
    width: 150rem;
    height: 66rem;
    font-size: 22rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: rgb(33, 33, 33);
    color: white;
    border-radius: 5rem;
    transition: all .5s;
    opacity: 1;
  }


  .shareTabs {
    background-color: #f7f7f7;
    transition: all 0.3s;
    position: fixed;
    bottom: -300rem;
    left: 0;
    z-index: 10000000;
    pointer-events: none;

    &::after {
      content: "";
      width: 100%;
      left: 0;
      top: 0;
      height: 100%;
      position: fixed;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: -2;
      opacity: 0;
      transition: all 0.3s;
    }

    &.active {
      &::after {
        opacity: 1;
      }

      pointer-events: all;
      display: block;
      bottom: 0rem;
    }
  }
}
</style>
