<template>
  <div class="search">
    <div class="setop" @click="$router.push({ path: '/SearchOv' })">
      <svg t="1665214694358" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2530" width="18" height="18">
        <path
          d="M469.333333 768c-166.4 0-298.666667-132.266667-298.666666-298.666667s132.266667-298.666667 298.666666-298.666666 298.666667 132.266667 298.666667 298.666666-132.266667 298.666667-298.666667 298.666667z m0-85.333333c119.466667 0 213.333333-93.866667 213.333334-213.333334s-93.866667-213.333333-213.333334-213.333333-213.333333 93.866667-213.333333 213.333333 93.866667 213.333333 213.333333 213.333334z m251.733334 0l119.466666 119.466666-59.733333 59.733334-119.466667-119.466667 59.733334-59.733333z"
          fill="#444444" p-id="2531"></path>
      </svg>
      <input type="text" placeholder="新增“专业搜索”，筛作品超快！" />
    </div>
    <div class="loading" v-if="loading">
      <van-loading type="spinner" color="red" />
    </div>
    <div v-else>
      <div class="swipt">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" @change="onChange">
          <van-swipe-item v-for="item in SearchBanners" :key="item.id"><img v-lazy="item.cover" alt="" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              <span>{{ current + 1 }}</span> /
              <span>{{ SearchBanners?.length }}</span>
            </div>
          </template>
        </van-swipe>
      </div>
      <div class="sels">
        <div v-for="item in SearchRecommended" :key="item.title">
          <div class="imgs">
            <img v-lazy="`${item.icon}?x-oss-process=image/resize,m_mfit,w_180`" alt="x" />
          </div>
          <p>{{ item.title }}</p>
        </div>
      </div>

      <div class="photo">
        <div class="ptop">
          <h3>作品</h3>
          <div class="pall">全部作品</div>
        </div>

        <div class="container">
          <div class="gaun" v-for="(item, index) in SearchCategories" :key="item.id" @click="
            $router.push({ path: '/searchphoto' });
            photoindex(index);
          ">
            <img v-lazy="`${item.cover}?x-oss-process=image/resize,m_mfit,w_180`" alt="x" />
            <p>{{ item.category_name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);
export default {
  // https://apis.netstart.cn/xpc/page/discovery
  methods: {
    ...mapMutations(["search", "photoindex"]),
    onChange(index) {
      this.current = index;
    },
    // photoindex(index) {
    //   console.log(index);
    // },
  },
  created() {
    this.axios.get("https://apis.netstart.cn/xpc/page/discovery").then((e) => {
      // console.log(e.data.data.categories);
      this.loading = false
      this.search({
        b: e.data.data.banners,
        c: e.data.data.categories,
        r: e.data.data.recommended_position,
      });
    });

    // search(){
    // }
    // mapMutations(["search"]);
  },
  computed: {
    ...mapState(["SearchBanners", "SearchCategories", "SearchRecommended"]),
  },
  data() {
    return {
      current: 0,
      loading: true
    };
  },
};
</script>
<style lang="less" scoped>
.search {
  padding: 20rem 16rem;
  font-size: 12rem;

  .loading {
    height: 560rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    color: #fff;
    font-size: 12px;

    span {
      &:nth-child(1) {
        font-size: 16rem;
      }

      &:nth-child(2) {
        font-size: 12rem;
        color: rgba(255, 255, 255, 0.662);
      }
    }

    // background: rgba(0, 0, 0, 0.1);
  }

  .setop {
    padding-bottom: 20rem;
    border-bottom: 1rem solid rgba(128, 128, 128, 0.242);
    position: relative;

    svg {
      position: absolute;
      left: 11rem;
      top: 4rem;
    }

    input {
      width: 100%;
      outline: 0;

      border: 0;
      padding: 6rem;
      background-color: rgba(128, 128, 128, 0.191);
      border-radius: 6rem;
      padding-left: 33rem;

      &::-webkit-input-placeholder {
        font-size: 12rem;
      }
    }
  }

  .swipt {
    .my-swipe .van-swipe-item {
      color: #fff;
      // font-size: 20px;
      // line-height: 150px;
      // text-align: center;
      // background-color: #39a9ed;
      border-radius: 6rem;

      img {
        border-radius: 6rem;
      }
    }
  }

  .sels {
    display: flex;
    justify-content: space-around;
    margin: 20rem 0;
    text-align: center;

    .imgs {
      border: 1rem solid gray;
      border-radius: 50%;
      width: 40rem;
      height: 40rem;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 22rem;
        // position: relative;
        // top: 5rem;
      }
    }

    p {
      margin-top: 10rem;
    }
  }

  .photo {
    .ptop {
      display: flex;
      justify-content: space-between;

      h3 {
        font-size: 14rem;
        font-weight: bold;
        letter-spacing: 1rem;
      }

      .pall {
        color: red;
        font-size: 12rem;
      }
    }

    .container {
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;

      div {
        border-radius: 6rem;
        box-shadow: 0 0 3rem 0 gray;
        flex-shrink: 0;
        width: 47%;
        height: 122rem;
        margin-top: 22rem;

        img {
          border-radius: 6rem;
          vertical-align: baseline;
        }

        position: relative;

        p {
          position: absolute;
          top: 8rem;
          left: 8rem;
          color: #fff;
        }
      }
    }
  }
}
</style> 
