<template>
  <div class="hot-box">
    <ul>
      <li v-for="(h, i) in hotArr" :key="i">
        <BannerBox
          v-if="h.type == 'uiBanner'"
          :banners="h.children"
        ></BannerBox>
        <UiFunction v-if="h.type == 'uiFunction'" :uiFunction="h"></UiFunction>
        <UiBigCard
          :tabsActiveIndex="tabsActiveIndex"
          v-if="h.type == 'uiBigCard'"
          :uiBigCard="h"
        ></UiBigCard>
      </li>
    </ul>
    <div v-show="isLoding" class="loding">
      <van-loading type="spinner" color="#e74b3b" size="30rem" />
    </div>
    <div v-show="!isLoding && isOk" class="is-ok">
      <figure v-lazy:background-image="'image/xpcAll/ug.png'">
        <p>加载失败<br />请检查网络或者重新刷新</p>
      </figure>
    </div>
    <!-- <van-loading v-show="!isLoding && !isOk" style="height: 80rem; display: flex;justify-content: center;" color="#e74b3b" size="32rem" /> -->
    <div v-show="!isLoding && !isOk" class="ddl">到底了~</div>
  </div>
</template>

<script>
import BannerBox from "./ListCPTS/BannerBox.vue";
import UiBigCard from "./ListCPTS/uiBigCard.vue";
import UiFunction from "./ListCPTS/uiFunction.vue";
import { mapState } from "vuex";
export default {
  props: {
    link: String,
    tabsActiveIndex: Number,
  },
  data() {
    return {
      hotArr: null,
      isLoding: true,
      isOk: false,
    };
  },
  computed: {
    ...mapState(["tabsActive"]),
  },
  watch: {
    tabsActive(n) {
      if (n == this.tabsActiveIndex && this.isOk) {
        this.isLoding = true;
        this.axios(this.link)
          .then((res) => {
            this.hotArr = res.data.data.children;
            this.isLoding = false;
            this.isOk = false;
          })
          .catch((res) => {
            this.isOk = true;
            this.isLoding = false;
            console.log(123123131321, this.isOk);
            res;
          });
      }
    },
  },
  created() {
    this.axios(this.link)
      .then((res) => {
        // console.log(res.data.data);
        this.hotArr = res.data.data.children;
        this.isLoding = false;
      })
      .catch((res) => {
        this.isOk = true;
        this.isLoding = false;
        console.log(123123131321, this.isOk);
        res;
      });
  },
  components: { BannerBox, UiBigCard, UiFunction },
};
</script>

<style lang="less" scoped>
div.hot-box {
  padding: 5rem 10rem;
  > .loding {
    width: 100%;
    min-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > .is-ok {
    width: 100%;
    min-height: 90vh;
    > figure {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 90vh;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 30%;
      > p {
        //   margin-bottom: -200rem;
        margin-top: -20vh;
        font-size: 14rem;
        letter-spacing: 2rem;
        width: 100%;
        text-align: center;
        color: #888;
        line-height: 28rem;
      }
    }
  }
  .ddl {
    text-align: center;
    height: 60rem;
  }
}
</style>
