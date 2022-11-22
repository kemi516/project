<template>
  <div class="bannerbox">
    <van-swipe autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(banner, index) in banners" :key="index">
        <img :src="banner.model.cover" width="100%" alt="" />
        <p class="banner-title">{{ banner.model.title }}</p>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          <span class="custom-indicator-currentIndex">
            {{ currentIndex + 1 }}</span
          >
          / {{ banners.length }}
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";

Vue.use(Lazyload);

export default {
  props: {
    banners: Array,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    onChange(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
.bannerbox {
  position: relative;
  box-sizing: border-box;
  border-radius: 5rem;
  overflow: hidden;
  width: calc(100vw - 20rem);
  .van-swipe {
    width: 100%;
    border-radius: 6rem;
    img {
      display: block;
      object-fit :cover;
    }
    p.banner-title {
      position: absolute;
      bottom: 8rem;
      left: 15rem;
      z-index: 99;
      color: white;
      font-size: 16rem;
    }
    .custom-indicator {
      position: absolute;
      right: 10rem;
      bottom: 5rem;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.662);
      span.custom-indicator-currentIndex {
        font-size: 18rem;
        color: white;
      }
    }
  }
}
</style>