<template>
  <div class="daily" ref="daily">
    <div v-if="ulArr?.length">
      <ul v-for="(u, i) in ulArr" :key="i">
        <h1>
          {{
          u.DailyTitle?.title
          ? u.DailyTitle?.title
          : u.DailyTitle?.data.resource.title
          }}
        </h1>
        <UiBigCard :tabsActiveIndex="tabsActiveIndex" v-for="(da, index) in u.DailyArr" :key="index" :uiBigCard="da">
        </UiBigCard>
      </ul>
    </div>

    <van-loading v-show="!isLoding && !isOk" style="height: 80rem; display: flex; justify-content: center"
      color="#e74b3b" size="32rem" />
    <!-- <div v-show="!isLoding && !isOk" class="ddl">到底了~</div> -->
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
import { mapState } from "vuex";
import UiBigCard from "./ListCPTS/uiBigCard.vue";
export default {
  props: {
    link: String,
    tabsActiveIndex: Number,
  },
  data() {
    return {
      // DailyArr: null,
      // DailyTitle: null,
      ulArr: [],
      isLoding: true,
      isOk: false,
      isAxios: false,
      date: 1,
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
            // console.log(res);
            this.DailyTitle = res.data.data?.children[0].model;
            this.DailyArr = res.data.data.children.slice(1);
            // console.log(this.DailyArr);
            this.isLoding = false;
            this.isOk = false;
          })
          .catch((res) => {
            this.isOk = true;
            this.isLoding = false;
            // console.log(123123131321, this.isOk);
            res;
          });
      }
    },
  },
  created() {
    this.axios(this.link)
      .then((res) => {
        // console.log(res);
        if (res.data.data?.children) {
          this.ulArr.push({
            DailyTitle: res.data.data?.children[0].model,
            DailyArr: res.data.data.children.slice(1),
          });
        }

        this.isLoding = false;
        setTimeout(() => {
          this.isAxios = true;
        }, 200);
      })
      .catch((res) => {
        this.isOk = true;
        this.isLoding = false;
        res;
      });
    // this.axios.get("newstudios/home/selection", { params: { date: 20221002 } }).then((res) => {
    //https://apis.netstart.cn/xpc/home/
    // this.axios
    //   .get("https://apis.netstart.cn/xpc/home/selection", {
    //     params: { date: 20221002 },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
    // this.axios.get("newstudios/article/12139181", { params: { date: 20221002 } }).then((res) => {
    //   console.log(res);
    // });
  },
  mounted() {
    addEventListener("scroll", this.updateUl);
  },
  methods: {
    updateUl() {
      try {
        if (this.isAxios) {
          let inhei =
            scrollY + window.innerHeight - this.$refs.daily.offsetHeight;
          // console.log(inhei);
          if (inhei > 0) {
            this.isAxios = false;
            let dateTime = new Date(
              new Date().setDate(new Date().getDate() - ++this.date)
            )
              .toLocaleDateString()
              .match(/[0-9]+/gim)
              .map((e) => e.padStart(2, "0"))
              .join("");
            // console.log(dateTime);

            // this.axios.get("newstudios/home/selection", { params: { date: dateTime } }).then((res) => {
            //https://apis.netstart.cn/xpc/home/config
            this.axios
              .get("https://apis.netstart.cn/xpc/home/selection", {
                params: { date: dateTime },
              })
              .then((res) => {
                // console.log(res);
                if (res?.data?.data?.list) {
                  this.ulArr.push({
                    DailyTitle: res.data.data?.list[0],
                    DailyArr: res.data.data.list.slice(1),
                  });
                }
                setTimeout(() => {
                  this.isAxios = true;
                }, 200);
              });
          }
        }
      } catch (error) {
        // console.log("Daily");
      }
    },
  },
  components: { UiBigCard },
};
</script>

<style lang="less" scoped>
.daily {
  padding: 15rem;

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

  >div {
    >ul {
      margin-bottom: 30rem;

      >h1 {
        font-size: 17rem;
        font-weight: 600;
        letter-spacing: 2rem;
      }
    }
  }

  .ddl {
    text-align: center;
    height: 60rem;
  }
}
</style>
