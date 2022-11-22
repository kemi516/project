<template>
  <div class="home-tabs-recom" ref="recomUl">
    <ul class="recom-list" ref="ul">
      <li v-for="(r, i) in recomArr" :key="i" :class="{ big: r.type !== 'uiMiddleCard' }">
        <BannerBox v-if="r.type == 'uiBanner'" class="recom-banner" :banners="r.children"></BannerBox>
        <uiMiddleCard :class="{ 'ui-middle': false }" ref="uiMiddle" v-if="r.type == 'uiMiddleCard'" :uiMiddleCard="r">
        </uiMiddleCard>
        <UiBigCardTop v-if="r.type == 'uiBigCardTop'" class="uiBigCardTop" :uiBigCardTop="r"
          :tabsActiveIndex="tabsActiveIndex"></UiBigCardTop>
        <UiBigCard v-if="r.type == 'uiBigCard'" class="uiBigCard" :uiBigCard="r"></UiBigCard>
        <UiCollectionSlideOne v-if="r.type == 'uiCollectionSlideOne'" :uiCollectionSlideOne="r"></UiCollectionSlideOne>
      </li>
    </ul>
    <van-loading v-show="!isLoding && !isOk" style="height: 80rem; display: flex; justify-content: center"
      color="#e74b3b" size="32rem" />
    <div v-show="isLoding" class="loding">
      <van-loading type="spinner" color="#e74b3b" size="30rem" />
    </div>
    <div v-show="!isLoding && isOk" class="is-ok">
      <figure v-lazy:background-image="'image/xpcAll/ug.png'">
        <p>加载失败<br />请检查网络或者重新刷新</p>
      </figure>
    </div>
  </div>
</template>

<script>
import uiMiddleCard from "@/components/ListCPTS/uiMiddleCard.vue";
import BannerBox from "./ListCPTS/BannerBox.vue";
import UiBigCardTop from "./ListCPTS/uiBigCardTop.vue";
import UiBigCard from "./ListCPTS/uiBigCard.vue";
import UiCollectionSlideOne from "./ListCPTS/uiCollectionSlideOne.vue";
import { mapState } from "vuex";
export default {
  components: {
    uiMiddleCard,
    BannerBox,
    UiBigCardTop,
    UiBigCard,
    UiCollectionSlideOne,
  },
  props: {
    link: String,
    tabsActiveIndex: Number,
  },
  data() {
    return {
      recomArr: null,
      axiosIndex: 0,
      axiosStatus: true,
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
            this.recomArr = res.data.data.children;
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
    this.axios(this.link + `?pageSize=${this.axiosIndex}`)
      .then((res) => {
        this.recomArr = res.data.data.children;
        this.isLoding = false;
        // console.log(res);
      })
      .catch((res) => {
        this.isOk = true;
        this.isLoding = false;
        // console.log(123123131321, this.isOk);
        res;
      });
    // this.axios(`newstudios` + this.link + `?pageSize=${this.axiosIndex}`).then(
    //   (res) => {
    //     console.log(res);
    //   }
    // );
  },
  updated() {
    if (this.$refs.uiMiddle) {
      this.$refs.uiMiddle.forEach((e, i) => {
        if (i % 2 == 1) {
          e.$el.style = "margin-left:10rem;";
        }
      });
    }

  },
  mounted() {
    this.$store.commit("refsAdd", ["recomUl", this.$refs.recomUl]);
    addEventListener("scroll", this.updateRecom);
  },
  methods: {
    updateRecom() {
      try {
        let a =
          window.scrollY -
          (this.$refs.recomUl?.offsetHeight - window.innerHeight);
        sessionStorage.setItem("recomScrollValue", window.scrollY);
        if (a > 0 && this.axiosStatus) {
          this.axiosStatus = false;
          this.axios(this.link + `?page=${++this.axiosIndex}`).then((res) => {
            setTimeout(() => {
              this.axiosStatus = true;
            }, 500);
            this.recomArr?.push(...res.data.data.children?.slice(1));
          });
        }
      } catch (error) {
        console.log("recom", error);
      }
    },
    uiMiddleMehods() {
      return this.uiMiddleIndex.index++ % 2 == 1;
    },
  },
};
</script>

<style lang="less" scoped>
.home-tabs-recom {
  padding: 8rem 10rem;
  width: 100%;

  >.loding {
    width: 100%;
    min-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  >.is-ok {
    width: 100%;
    min-height: 90vh;

    >figure {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 90vh;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 30%;

      >p {
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

  .recom-list {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    align-items: center;

    >li {
      padding: 0;
      margin: 0;

      .ui-middle {
        margin-left: 10rem;
      }

      &.big {
        width: 100%;
        flex-shrink: 0;
      }

      .uiBigCard {
        margin: 10rem 0;
      }

      .recom-banner {
        margin-bottom: 5rem;
      }
    }

    // .pull {
    //   width: 100%;
    //   padding: 0;
    //   margin: 0;
    //   .pull-list {
    //     padding: 0;
    //     margin: 0;
    //     background-color: rgb(0, 191, 255);
    //     display: flex;
    //     flex-wrap: wrap;
    //     box-sizing: border-box;
    //     align-items: center;
    //     .van-cell {
    //       padding: 0;
    //       margin: 0;
    //       width: auto;
    //       background-color: transparent;
    //       &.big {
    //         width: 100%;
    //         flex-shrink: 0;
    //       }
    //       .van-cell__value {
    //         width: calc(50vw - 10rem - 5rem);
    //         .ui-middle {
    //           margin-left: 10rem;
    //         }

    //         .uiBigCard {
    //           margin: 10rem 0;
    //         }
    //         .recom-banner {
    //           margin-bottom: 5rem;
    //         }
    //       }
    //     }
    //   }
    // }
  }
}
</style>
