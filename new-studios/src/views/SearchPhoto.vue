<template>
  <div class="SearchPhoto">
    <div class="attop">
      <div class="fanh" @click="$router.push({ path: '/home/search' })">
        <img src="image/返回/mf.png" alt="" />
      </div>
      <h3>{{ PhotoCategories && PhotoCategories[PhotoIndex].title }}</h3>
    </div>
    <!-- <div class="categories" v-if="PhotoCategories">
      <div>全部</div>
      <div
        v-for="item in PhotoCategories && PhotoCategories[PhotoIndex].sub"
        :key="item.value"
      >
        {{ item.title }}
      </div>
    </div> -->
    <div class="bottom">
      <div class="btop" v-for="item in PhotoList" :key="item.id" @click.stop="updateRouter({ resource: item })">
        <div class="left">
          <!-- {{ item }} -->
          <img :src="item.cover" alt="" />
          <!-- {{ item.cover }} -->
        </div>
        <div class="right">
          <h3>{{ item.title }}</h3>
          <p>
            <span>播放量{{ (item.count.count_view / 10000).toFixed(2) }}万</span>
            <span>喜欢{{ item.count.count_like }}</span>
          </p>
          <p>
            <img :src="`${item.author.userinfo.avatar}?x-oss-process=image/resize,m_mfit,w_180`" alt="" />
            <span>{{ item.author.userinfo.username }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  // name: "HelloWorld",
  props: {
    // msg: String,
  },
  computed: {
    ...mapState(["PhotoCategories", "PhotoList", "PhotoIndex"]),
  },
  methods: {
    ...mapMutations(["photo"]),
    updateRouter(n) {
      this.$router.push({ path: "/media", query: { id: n.resource.id } });
    },
  },
  created() {
    // {
    //     params: {
    //       category_id: 2,
    //       page: 1,
    //     },
    //   }
    // https://app.xinpianchang.com/articles?category_id=0
    //     '/user', {
    //     params: {
    //       ID: 12345
    //     }
    //   }
    this.axios
      .get("/articles", {
        params: {
          category_id: this.PhotoIndex,
        },
      })
      .then((e) => {
        this.photo({ c: e.data.data.header?.categories, l: e.data.data.list });
        //   console.log(e);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.SearchPhoto {
  font-size: 12rem;

  .attop {
    position: relative;

    .fanh {
      position: absolute;
      top: 20rem;
      left: 20rem;
    }

    h3 {
      font-size: 17rem;
      font-weight: bold;
      width: 100%;
      text-align: center;
      padding: 22rem 0;
      border-bottom: 1rem solid #9a99992c;
    }
  }

  .categories {
    display: flex;
    flex-flow: nowrap;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    div {
      flex-shrink: 0;
      background-color: #9a99993c;
      color: #9a9999;
      padding: 6rem 16rem;
      margin: 10rem 0;
      margin-left: 10rem;
      border-radius: 3rem;

      &:last-child {
        margin-right: 10rem;
      }
    }
  }

  .bottom {
    padding: 10rem;

    .btop {
      &:nth-child(1) {
        border: 0;
        padding-top: 5rem;
      }

      padding: 15rem 0;
      border-top: 1rem solid #9a99992c;

      display: flex;

      .left {
        width: 46%;

        img {
          width: 100%;
          border-radius: 6rem;
        }
      }

      .right {
        margin-left: 13rem;
        width: 50%;
        display: flex;
        flex-flow: column;
        justify-content: space-around;

        h3 {
          font-weight: bold;
        }

        p {
          img {
            width: 10%;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10rem;
          }

          span {
            color: #9a9999;
          }
        }
      }
    }
  }
}
</style>
