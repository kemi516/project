<template>
  <div class="home" ref="homeViewRef" @touchend="mouseUp()" @touchstart="isMouseUp = false">
    <div :class="{ tabs: true }">
      <van-tabs v-model="tabsActive" swipeable sticky animated class="tabs-total">
        <van-tab v-for="(t, index) in tabsTotal" :title="t.title" :key="index" class="content">
          <!-- <HomeTabsAttention
            v-if="0 == index"
            v-show="false"
          ></HomeTabsAttention> -->
          <HomeTabsRecom v-if="0 == index" :tabsActiveIndex="index" :link="t.link"></HomeTabsRecom>
          <HomeTabsDaily v-if="1 == index" :tabsActiveIndex="index" :link="t.link"></HomeTabsDaily>
          <HomeTabsHot v-if="2 == index" :tabsActiveIndex="index" :link="t.link"></HomeTabsHot>
          <HomeTabsShortStory v-if="index > 2" :tabsActiveIndex="index" :link="t.link"></HomeTabsShortStory>
        </van-tab>
        <van-tab disabled><span class="tabs-total-end"></span></van-tab>
      </van-tabs>
    </div>
    <div :class="{ 'tabs-menu': true }">
      <figure>
        <img v-lazy="'image/xpcAll/EB.png'" />
        <span v-lazy:background-image="'image/xpcAll/mr.png'"></span>
      </figure>
    </div>
    <figure :class="{
      'home-add': true,
      'add-icon-active': addIcon,
      isMedia: $route?.meta.isMedia,
    }" v-lazy:background-image="'image/xpcAll/aY.png'">
      <van-sticky @scroll="scrollRight" style="visibility: hidden; height: 0">
      </van-sticky>
    </figure>
  </div>
</template>

<script>
import HomeTabsRecom from "@/components/HomeTabsRecom.vue";
import HomeTabsDaily from "@/components/HomeTabsDaily.vue";
import HomeTabsHot from "@/components/HomeTabsHot.vue";
import HomeTabsShortStory from "@/components/HomeTabsShortStory.vue";
// import HomeTabsAttention from "@/components/HomeTabsAttention.vue";
export default {
  components: {
    HomeTabsRecom,
    HomeTabsDaily,
    HomeTabsHot,
    HomeTabsShortStory,
    // HomeTabsAttention,
  },
  data() {
    return {
      tabsActive: 0,
      tabsTotal: null,
      imageList: ["image/xpcAll/tabbar_me_normal.png"],
      addIcon: false,
      isMouseUp: true,
    };
  },
  created() {
    this.axios("https://apis.netstart.cn/xpc/home/config").then((res) => {
      this.tabsTotal = res.data.data.tab.slice(2);
      // console.log( res.data.data.tab.slice(1).filter((e) => e.title != "关注"));
      // console.log(res.data.data);
    });
    // this.axios("newstudios/home/config").then((res) => {
    //   console.log(res.data.data);
    //   this.tabsTotal = res.data.data.tab.slice(1);
    // });
    // console.log(this.$router.meta);
  },

  methods: {
    scrollRight() {
      this.addIcon = true;
      clearTimeout(this.addTime);
      if (this.isMouseUp) {
        this.addTime = setTimeout(() => {
          this.addIcon = false;
        }, 100);
      }
    },
    mouseUp() {
      this.isMouseUp = true;
      this.addTime = setTimeout(() => {
        this.addIcon = false;
      }, 100);
    },
  },
  watch: {
    tabsActive(n) {
      this.$store.commit("tabsActiveupdate", n);
    },
  },
};
</script>

<style lang="less">
.van-sticky {
  border-bottom: 1rem solid #e5e5e5d5;
  background-color: white;
  padding-bottom: 1px;
}

.van-tab--disabled {
  display: inline-block;
  width: 72px;
  height: 44px;
  cursor: auto;
}
</style>
<style lang="less" scoped>
div.home {
  background-color: #f7f7f7;

  // > .isMedia {
  //   // display: none;
  //   // transform: translateX(-100vw);
  // }
  .home-add {
    width: 60rem;
    height: 60rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    position: fixed;
    bottom: 65px;
    right: 12rem;
    transition: all 0.3s ease-out;

    &.add-icon-active {
      right: -50rem;
    }
  }

  .tabs {
    // transition: all 0.3s;
    display: flex;

    .tabs-total {
      width: 100%;

      .content {
        overflow-x: hidden;
        background-color: #f7f7f7;
      }
    }
  }

  .tabs-menu {
    // transition: all 0.3s;
    width: calc(72px + 10rem);
    height: 45px;
    box-sizing: border-box;
    background-color: transparent;
    position: fixed;
    right: 0rem;
    top: 0;
    background-image: linear-gradient(to left, #fff 0 80%, transparent 100%);
    z-index: 99;

    figure {
      width: 100%;
      padding-left: 20%;
      padding-right: 10rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      img {
        width: 20px;
      }

      >span {
        display: inline-block;
        height: 30px;
        width: 30px;
        background-position: center;
        background-size: 160%;
        background-repeat: no-repeat;
        border-radius: 50%;
      }
    }
  }
}
</style>
