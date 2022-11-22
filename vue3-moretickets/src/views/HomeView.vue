<template>
  <div>
    <div class="loading" :class="{ activeLoading: loading }">
      <van-loading color="#fff" />
    </div>
    <div class="home">
      <!-- 顶部搜索 -->
      <div
        class="bg-home"
        :class="{ 'bg-active': loading }"
        :style="`background-color:${bgColor}`"
      ></div>
      <div class="top-search">
        <van-sticky class="search-nav" :offset-top="0">
          <div class="bg-sticky">
            <div
              class="search-location"
              @click="$router.push('/location?from=/')"
            >
              <span>
                <img src="../assets/location.png" alt="" />
              </span>
              <span>{{
                dingwei[0]?.cityName ? dingwei[0]?.cityName : "广州"
              }}</span>
            </div>
            <div
              class="search-hotword"
              v-if="store.hotwords?.length > 0"
              @click="
                store.routeValue = '';
                store.routeKeyValue = '';
                $router.push('/search');
              "
            >
              <span><img src="../assets/search.png" alt="" /></span>
              <span>{{ store.hotwords[0].keyword }}</span>
            </div>
          </div>
        </van-sticky>

        <ul class="search-hot">
          <span>热搜：</span>
          <SearchHot />
        </ul>
      </div>

      <!-- 轮播图 -->
      <div class="top-banner home-banner">
        <van-swipe :autoplay="3000" lazy-render @change="bgChange">
          <van-swipe-item
            v-for="banner in banners"
            :key="banner.bannerOID"
            @click.stop="
              banner?.bannerUrl.slice(0, 4) == 'http'
                ? ''
                : $router.push({
                    path: '/detail',
                    query: { showID: banner?.bannerUrl },
                  })
            "
          >
            <van-image
              width="100%"
              height="150rem"
              :src="`${banner.posterUrl}@!400w`"
            />
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 跳演出 -->
      <div class="show-categery-container">
        <div class="perform">
          <div
            v-for="item in perform"
            :key="item.title"
            @click.stop="toShow(item)"
          >
            <div class="icon">
              <img v-lazy="item.imgUrl" />
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 胶囊按钮 -->
      <div class="advertisement" @click="store.increment">
        <img
          src="https://img0.tking.cn/mtl/default/file/tD8kBp6pYA_.gif@!750w"
          class="image-viewer"
        />
      </div>

      <serviceAssurance />

      <!-- 节目榜单于艺人榜单 -->
      <div
        class="program-list"
        :style="
          !store.isActive == true
            ? `background-image: url('../public/assets/programListBcg.png'); `
            : `background-image: url('../public/assets/programListBcg2.png'); `
        "
      >
        <div class="program-all">
          <div class="program-list-head">
            <div class="program-list-left">
              <span
                :class="{ active: !store.isActive }"
                @click="store.isActive = !store.isActive"
                >节目榜单</span
              >
              <span
                :class="{ active: store.isActive }"
                @click="store.isActive = !store.isActive"
                >艺人榜单</span
              >
            </div>
            <div class="program-list-right">
              <!-- @click.stop=" -->
              <!-- $router.push({ path: '/detail', query: { showID: item.id } }) -->
              <span @click="$router.push('/program')">全部</span>
              <svg
                t="1666265469516"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3311"
                width="200"
                height="200"
              >
                <path
                  d="M340.688 830.24l11.312 11.328a16 16 0 0 0 22.624 0L685.76 530.448a16 16 0 0 0 0-22.64L374.624 196.688a16 16 0 0 0-22.624 0l-11.312 11.312a16 16 0 0 0 0 22.624l288.496 288.496-288.496 288.512a16 16 0 0 0 0 22.624z"
                  p-id="3312"
                  fill="#ffffff"
                ></path>
              </svg>
            </div>
          </div>
          <div class="program-list-content" v-if="!store.isActive">
            <div class="program-list-content-left">
              <van-image
                class="dongtu"
                v-for="iwf in watchingweightfilter"
                width="115rem"
                radius="5rem"
                height="150rem"
                fit="cover"
                position="left"
                :src="iwf.posterURL"
              />
              <span>NO.1</span>
              <!-- <span>NO.2</span> -->
              <!-- <span>NO.3</span> -->
              <!-- <div>{{ iwf.weight }}</div> -->
            </div>
            <div class="program-list-content-right">
              <div
                class="program-list-content-right-works"
                v-for="(iwf, index) in watchingweightfilter"
                @click.stop="
                  $router.push({
                    path: '/detail',
                    query: { showID: iwf.showOID },
                  })
                "
              >
                <p>{{ index + 1 }}. {{ iwf.showName.split("】")[1] }}</p>
                <span>{{ iwf.weight }} 热点</span>
              </div>
            </div>
          </div>
          <div class="program-list-content-yiren" v-if="store.isActive">
            <div
              class="program-list-content-yiren-avtor"
              v-for="(artist, i) in artists"
              @click.stop="
                $router.push({ path: '/artist', query: { id: artist.id } })
              "
            >
              <van-image
                class="artist-touxiang"
                width="50rem"
                radius="50%"
                height="50rem"
                fit="cover"
                position="left"
                :src="artist.imgUrl"
              />
              <div class="program-list-content-yiren-avtor-right">
                <div class="program-list-content-yiren-avtor-right-left">
                  <p class="artist-title">{{ i + 1 }}. {{ artist.title }}</p>
                  <span class="performance">{{ artist.description }}</span>
                </div>
                <div class="program-list-content-yiren-avtor-right-right">
                  <span>查看</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 热门场馆 -->
      <div class="popular-venues">
        <h3>热门场馆</h3>
        <div class="popular-venues-big">
          <div class="popular-venues-list" v-for="venue in venues">
            <div
              class="popular-venues-list-top"
              @click="$router.push({ path: '/venue', query: { id: venue.id } })"
            >
              <div class="popular-venues-list-top-top">
                <div class="bgc"></div>
                <span>{{ venue.title }}</span>
                <svg
                  t="1666355797893"
                  class="icon"
                  viewBox="0 0 1037 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2545"
                  width="200"
                  height="200"
                >
                  <path
                    d="M277.761223 1024c-7.82426 0-15.64852-3.91213-23.472779-9.780325-11.73639-11.73639-11.73639-33.253104 0-44.989494l457.719198-459.675263-455.763133-455.763133c-11.73639-11.73639-11.73639-33.253104 0-44.989494s33.253104-11.73639 44.989494 0l479.235912 479.235912c11.73639 11.73639 11.73639 33.253104 0 44.989494l-481.191977 483.148042C293.409742 1020.08787 285.585482 1024 277.761223 1024z"
                    p-id="2546"
                    fill="#2c2c2c"
                  ></path>
                </svg>
              </div>
              <p>{{ venue.description }}</p>
            </div>
            <div class="popular-venues-list-content">
              <div
                class="popular-venues-list-content-img"
                v-for="v in venue.items"
              >
                <img
                  :src="v.imgUrl"
                  alt=""
                  @click.stop="
                    $router.push({ path: '/detail', query: { showID: v?.id } })
                  "
                />
                <div class="discount" v-if="v.discount">
                  <span>{{ v.discount }}</span>
                  <p class="zq">折起</p>
                </div>
                <div class="bottom">
                  <span>{{ v.title }}</span>
                  <p>{{ v.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 近期热门到音乐会 -->
      <div class="homeall">
        <div
          class="aspect"
          v-for="(item, i) in homeAll"
          :key="i"
          v-show="item.title !== '热门场馆' && item.title !== '节目/艺人榜单'"
        >
          <div v-if="item.title != '重磅呈现'">
            <div class="aspect-centent">
              <div class="choiceness-top">
                <h2>{{ item.title }}</h2>

                <!-- @click="$router.push('/choiceness')" -->
                <div
                  class="show-more"
                  v-if="item.showMore"
                  @click.stop="toShow(item)"
                >
                  全部
                </div>
              </div>
              <div class="labels" v-if="item.labels">
                <button v-for="(el, i) in item.labels" :key="i">
                  {{ el.title }}
                </button>
              </div>
            </div>
            <ChoicenessView
              :choiceness="item.rooms[0].items"
              :itemm="item"
            ></ChoicenessView>
          </div>
          <div class="aspect-centent" v-if="item.title == '重磅呈现'">
            <!-- 重磅呈现 -->
            <div class="appear">
              <h2>重磅呈现</h2>
              <img
                src="https://img0.tking.cn/mtl/default/img/CfnXiJmHRP_.jpg@!750w"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 大家都在看 -->
      <div class="floor">
        <h2 style="margin: 0 0 16rem">大家都在看</h2>
        <div
          class="container"
          v-for="(item, i) in watching"
          :key="i"
          @click.stop="
            $router.push({ path: '/detail', query: { showID: item?.showOID } })
          "
        >
          <div class="left-img">
            <van-image
              width="100rem"
              height="133rem"
              fit="cover"
              position="left"
              :src="item.posterURL"
            />
          </div>
          <div class="right-content">
            <h3>{{ item.showName }}</h3>
            <div>
              <p>{{ item.showDate }}</p>
              <p>{{ item.venueName }}</p>
            </div>
            <p class="show-price" v-if="item.minPrice">
              <span>{{ item.minPrice }}</span
              >元起
            </p>
          </div>
          <div class="discount" v-if="item.discount * 10 < 10">
            <p class="num">{{ (item.discount * 10).toFixed(1) }}</p>
            <p class="zq">折起</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onActivated, ref, watch } from "vue";
import { useCounterStore } from "../stores/counter";
import serviceAssurance from "@/components/serviceAssurance.vue";
import {
  getHotSearch,
  getHomeBanner,
  getWatching,
  getChoiceness,
  getHomeAll,
  getHotWords,
} from "@/apis/index";
import SearchHot from "@/components/SearchHot.vue";
import ChoicenessView from "@/components/ChoicenessView.vue";

// 定位菠萝
import { useCityStore } from "../stores/citysID";
const citys = useCityStore();

const store = useCounterStore();

// 请求数据
// 热搜关键词
// const hotwords: any = ref(null);
getHotWords(citys.id).then((res: { data: any }) => {
  store.hotwords = res.data.data;
  loading.value = false;
});
// banner
const banners: any = ref(null);
const perform: any = ref(null);
getHomeBanner(citys.id).then((res: { data: any }) => {
  // console.log(res.data.result.categorys.rooms[0].items);

  banners.value = res.data.result.data;
  perform.value = res.data.result.categorys.rooms[0].items;
});
const watching: any = ref(null);
// ljh
const watchingweight: any = ref(null);
const watchingweightfilter: any = ref(null);
getWatching(citys.id).then((res: { data: any }) => {
  watching.value = res.data.result.data;
  watchingweight.value = watching.value.sort((a, b) => b.weight - a.weight);
  watchingweightfilter.value = watchingweight.value.slice(0, 3);
});
const choiceness: any = ref(null);
getChoiceness(citys.id).then((res: { data: any }) => {
  choiceness.value = res.data.result.data;
  // console.log(res.data.result.data)
});
const homeAll: any = ref(null);

// 获取热门场馆
const venues: any = ref(null);

// 艺人榜单
const artists: any = ref(null);

getHomeAll(citys.id).then((res: { data: any }) => {
  homeAll.value = res.data.data;
  venues.value =
    res.data.data[res.data.data.findIndex((e) => e.title == "热门场馆")].rooms;
  artists.value =
    res.data.data[
      res.data.data.findIndex((e) => e.title == "节目/艺人榜单")
    ].rooms[1].items;
  // console.log(res.data.data)
});

// 背景色随banner变化
const bgColor = ref("#333");
const bgChange = (index: string | number) => {
  if (banners.value[index].colour == "") {
    bgColor.value = "#777";
  } else {
    bgColor.value = banners.value[index].colour;
  }
  if (document.querySelector(".van-sticky")) {
    document.querySelector(".van-sticky").style.backgroundColor = bgColor.value;
  }
};

// 定位
const dingwei = citys.citys || [];

// loading
const loading = ref(false);
// 监听状态
const isLoa = ref(false);
// 显示 loading过度 ，会卡
onActivated(() => {
  if (isLoa.value) {
    loading.value = true;
  }
});
// 监听
watch(
  () => citys.id,
  (n) => {
    // 进来就是loading状态
    loading.value = true;
    isLoa.value = true;
    const a = getHotWords(n).then((res: { data: any }) => {
      store.hotwords = res.data.data;
    });
    const b = getHomeBanner(n).then((res: { data: any }) => {
      banners.value = res.data.result.data;
      perform.value = res.data.result.categorys.rooms[0].items;
    });
    const c = getWatching(n).then((res: { data: any }) => {
      watching.value = res.data.result.data;
      watchingweight.value = watching.value.sort((a, b) => b.weight - a.weight);
      watchingweightfilter.value = watchingweight.value.slice(0, 3);
    });
    const d = getChoiceness(n).then((res: { data: any }) => {
      choiceness.value = res.data.result.data;
    });
    const e = getHomeAll(n).then((res: { data: any }) => {
      homeAll.value = res.data.data;
      venues.value =
        res.data.data[
          res.data.data.findIndex((e) => {
            return e.title == "热门场馆";
          })
        ].rooms;
      artists.value = res.data.data[4].rooms[1].items;
    });
    Promise.all([a, b, c, d, e]).then((res) => {
      setTimeout(() => {
        loading.value = false;
        isLoa.value = false;
      }, 500);
    });
  }
);

// 跳转全部
import { useRouter } from "vue-router";
// pinia数据
import { greatStore } from "../stores/great";
const storeGreat = greatStore();
const router = useRouter();
const toShow = (item) => {
  if (item.title != "超值精选") {
    store.active = 1;
    router.push("/list");
    citys.listActive = +item.navigateUrl.slice(-1);
  } else {
    storeGreat.watching = item.rooms[0].items;
    router.push("/great");
  }
};
</script>

<!-- 插件样式 -->
<style lang="less">
.search-nav {
  .van-sticky {
    display: flex;

    &.van-sticky--fixed {
      width: 100%;
      top: 0;
      left: 0;
      padding: 15rem 20rem;
      background: #333;

      .bg-sticky {
        border-radius: 30rem;
        transition: border-radius 1s;
      }
    }

    img {
      width: 25rem;
      height: 25rem;
      vertical-align: middle;
    }

    .bg-sticky {
      display: flex;
      background: white;
      width: 100%;
      height: 45rem;
      padding: 10rem 0;
      box-sizing: border-box;

      > div {
        display: flex;
        align-items: center;
        font-size: 14rem;
        height: 25rem;
      }
    }

    .search-location {
      width: 30%;
      border-right: 1rem solid rgb(227, 227, 227);
      margin-right: 12rem;
      padding-left: 10rem;
      color: black;
      font-weight: bold;
    }

    .search-hotword {
      width: 100%;
      color: #777;
      font-weight: bold;
      justify-content: start;

      img {
        margin-right: 5rem;
      }
    }
  }
}

.home-banner.top-banner {
  > .van-swipe {
    border-radius: 6rem;
  }
}
</style>

<style lang="less" scoped>
.loading {
  width: 100vw;
  height: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.3s;
  opacity: 0;

  &.activeLoading {
    height: 80rem;
    opacity: 1;
  }
}

.home {
  overflow: hidden;
  font-size: 12rem;
  transition: all 0.3s;

  .bg-home {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 220rem;
    z-index: -1;
    transition: all 0.3s;

    &.bg-active {
      height: 300rem;
    }
  }

  .top-search {
    padding: 15rem 20rem 10rem;

    ul.search-hot {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      height: 18rem;
      color: white;
      margin-top: 10rem;

      span {
        background: url("../assets/下载.png");
        background-repeat: no-repeat;
        background-position: 3rem center;
        background-size: 24%;
        padding-left: 20rem;
        font-size: 12rem;
        line-height: 18rem;
      }
    }
  }

  .top-banner {
    border-radius: 5rem;
    overflow: hidden;
    padding: 0 20rem;

    img {
      width: 100%;
      height: 150rem;
      vertical-align: middle;
    }
  }

  p {
    margin: 2rem 0;
  }

  .show-categery-container {
    display: flex;
    flex-flow: column wrap;

    .perform {
      margin-top: 16rem;
      display: flex;
      width: 100vw;
      flex-shrink: 0;
      justify-content: space-around;
      flex-wrap: wrap;

      > div {
        width: 25%;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        margin-top: 10rem;

        .icon {
          text-align: center;
          width: 55rem;

          img {
            width: 33rem;
          }
        }
      }
    }
  }

  .advertisement {
    width: 100vw;
    margin: 20rem 0;
    margin-bottom: 0;

    .image-viewer {
      width: 100%;
    }
  }

  .aspect {
    margin-top: 30rem;

    .aspect-centent {
      padding: 0 20rem;
    }

    .labels {
      button {
        border: 0;
        border-radius: 60rem;
        padding: 3rem 10rem;
        margin-right: 8rem;
        margin-bottom: 8rem;
      }
    }

    .choiceness-top {
      margin: 0 0 13rem 0;
    }

    h2 {
      margin: 0;
    }
  }

  .choiceness-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .show-more {
      white-space: nowrap;
      font-weight: 600;
      padding-right: 16rem;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA2ElEQVQ4T63VsQrCQAwA0FwtxcnPcOjUo4MFpwp+iZOzi1/i4pf4AYJIkdZN3fUXXGzkrEUqvUtSvTV3j4SEnALHifVoiajGDywXRbE/u+7WMWW7FIZh0A8GdwBQAHjzfD/Nsu2JQq2geaijZKUA5hXCQ52gyS7WyRoRZlyUAo0jQjmgCOWCbFQCtqOln2bHT/elYAsKV6/sTWq0C1ihUbJBgOl7Li+HfDd8BahBtcT/Cn6N0W8lOzFpySQmAVkYF2RjHFCEkWBzfTW7aRs35oLlYWSGXb6AJ+pnqRXWYPNGAAAAAElFTkSuQmCC)
        no-repeat 100%;
      background-size: 11rem 11rem;
    }
  }

  .appear {
    margin-top: 28rem;

    h2 {
      margin-bottom: 13rem;
    }

    img {
      width: 100%;
      border-radius: 6rem;
    }
  }

  .choiceness {
    .choiceness-top {
      margin-top: 13rem;
    }

    .choi-container {
      display: flex;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .content {
        // background-color: #ee0e87;
        margin-top: 10rem;
        background-color: pink;
        margin-right: 10rem;
        width: 100rem;
        height: 133rem;
        flex-shrink: 0;
        border-radius: 6rem;
        position: relative;

        .lefts-img {
          .van-image {
            border-radius: 6rem;
            overflow: hidden;
          }
        }

        .discount {
          width: 26rem;
          height: 33rem;
          text-align: center;
          position: absolute;
          top: -7rem;
          left: 10rem;
          border-radius: 3rem;
          color: white;
          background: linear-gradient(180deg, #ee0e87, #ff1d41);

          p {
            margin: 0;

            &.num {
              position: relative;
              top: 4rem;
              font-weight: bold;
            }

            &.zq {
              transform: scale(0.6);
            }
          }
        }
      }
    }
  }

  .floor {
    margin-top: 28rem;
    padding: 0 20rem;
    margin-bottom: 83px;

    .container {
      display: flex;
      margin-bottom: 33rem;
      position: relative;

      .discount {
        width: 40rem;
        height: 40rem;
        text-align: center;
        position: absolute;
        top: 56rem;
        right: 10rem;
        border-radius: 50%;
        color: white;
        background: linear-gradient(180deg, #ee0e87, #ff1d41);

        flex-shrink: 0;
        padding: 10rem;
        width: 36rem;
        height: 36rem;
        color: #fff;
        background-image: linear-gradient(315deg, #ff1d41, #ee0e87);
        box-shadow: 0 0 8px 0 rgb(250 24 88 / 50%);
        border-radius: 100%;
        text-align: center;
        transform: scale(0.7);

        p {
          margin: 0;

          &.num {
            position: relative;
            top: 4rem;
            font-weight: bold;
            font-weight: 600;
            font-size: 20rem;
          }

          &.zq {
            transform: scale(0.6);
            font-size: 16rem;
          }
        }
      }

      .left-img {
        border-radius: 6rem;
        font-size: 0;
        flex-shrink: 0;
        overflow: hidden;
        margin-right: 13rem;

        img {
          width: 100%;
        }
      }

      .right-content {
        display: flex;
        flex-flow: column;
        justify-content: space-between;

        h3 {
          font-size: 16rem;
          margin: 0;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          word-break: break-all;
        }

        p {
          color: gray;

          &.show-price {
            color: rgb(255, 29, 65);

            span {
              margin-right: 3rem;
              font-size: 16rem;
              font-weight: bold;
            }
          }
        }
      }
    }
  }

  .program-list {
    position: relative;
    background-size: cover;
    width: 100vw;
    margin: 30rem 0;
    height: 300rem;
    z-index: 0;

    .program-all {
      position: relative;
      padding: 15rem 20rem;

      .program-list-head {
        display: flex;
        height: 50rem;
        align-items: center;
        justify-content: space-between;

        .program-list-left {
          font-size: 12rem;

          // color: white;
          span {
            padding: 8rem 0;
            margin-right: 10rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.492);
            margin-right: 15rem;
          }

          .active {
            font-size: 16rem;
            border-bottom: 1rem solid rgb(255, 255, 255);
            color: white;
          }
        }

        .program-list-right {
          display: flex;
          align-items: center;

          // height: 50rem;
          // text-align: center;
          span {
            color: white;
            font-size: 13rem;
          }

          svg {
            width: 14rem;
            height: 14rem;
          }
        }
      }

      // ljh
      .program-list-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .program-list-content-left {
          width: 150rem;
          position: relative;
          height: 150rem;
          margin-top: 30rem;

          // top: 0;
          // -ms-perspective-origin-y: 200rem;
          // perspective: 600rem;
          // .dongtu {
          //   position: absolute;
          //   transform: rotateY(-30deg);
          //   transform-style: preserve-3d;
          //   &:nth-of-type(1) {
          //     left: 0;
          //     z-index: 5;
          //     transform: scale(1.01) rotateY(-30deg) translateZ(10rem);
          //   }
          //   &:nth-of-type(2) {
          //     left: 3rem;
          //     z-index: 4;
          //     transform: scale(1) rotateY(-30deg) translateZ(0rem);
          //   }
          //   &:nth-of-type(3) {
          //     left: 6rem;
          //     z-index: 3;
          //     transform: scale(0.99) rotateY(-30deg) translateZ(-10rem);
          //   }
          // }
          .dongtu {
            position: absolute;
            // transform: rotateY(-30deg);
            // transform-style: preserve-3d;
            // border: 1rem solid white;
            box-shadow: 0 0 0rem 1rem white;

            &:nth-of-type(1) {
              left: 0;
              z-index: 5;
              transform: scale(1);
              transform-origin: right;
              // transform: scale(1.01) rotateY(-30deg) translateZ(10rem);
            }

            &:nth-of-type(2) {
              left: 5rem;
              z-index: 4;
              transform: scale(0.9);
              transform-origin: right;
              // transform: scale(1) rotateY(-30deg) translateZ(0rem);
            }

            &:nth-of-type(3) {
              left: 9rem;
              z-index: 3;
              transform: scale(0.8);
              transform-origin: right;
            }
          }

          // span {
          //   position: absolute;
          //   top: 115rem;
          //   left: 50rem;
          //   background-color: black;
          //   padding: 5rem;
          //   font-size: 12rem;
          //   font-weight: 600;
          //   &:nth-last-of-type(3) {
          //     z-index: 5;
          //     color: white;
          //     transform: scale(1);
          //     transform-origin: right;
          //   }
          //   &:nth-last-of-type(2) {
          //     z-index: 4;
          //     color: white;
          //     transform: scale(0.9);
          //     transform-origin: right;
          //   }
          //   &:nth-last-of-type(1) {
          //     z-index: 3;
          //     color: white;
          //     transform: scale(0.8);
          //     transform-origin: right;
          //   }
          // }
          span {
            position: absolute;
            top: 135rem;
            left: 70rem;
            background-color: black;
            padding: 5rem;
            font-size: 12rem;
            font-weight: 600;
            z-index: 5;
            color: white;
            transform: scale(1);
            transform-origin: right;
          }
        }

        .program-list-content-right {
          font-size: 12rem;
          margin-left: 65rem;
          margin-top: 10rem;

          .program-list-content-right-works {
            // padding: 10rem;
            margin-left: 10rem;
            margin-top: 10rem;
            padding-bottom: 10rem;
            border-bottom: 1rem solid rgba(255, 255, 255, 0.199);

            &:last-of-type {
              border: none;
            }

            p {
              color: white;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              font-size: 13rem;
            }

            span {
              color: rgba(255, 255, 255, 0.599);
              font-size: 12rem;
              padding-left: 15rem;
            }
          }
        }
      }

      .program-list-content-yiren {
        display: flex;
        flex-direction: column;
        // justify-content: center;
        margin-top: 20rem;

        .program-list-content-yiren-avtor {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15rem;

          .artist-touxiang {
            border: 1rem solid white;
            margin-right: 20rem;
          }

          .program-list-content-yiren-avtor-right {
            display: flex;
            flex-grow: 1;
            width: 50%;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1rem solid rgba(255, 255, 255, 0.199);

            .program-list-content-yiren-avtor-right-left {
              display: flex;
              flex-direction: column;
              width: 70%;
              // align-items: center;
              font-size: 12rem;
              color: white;

              .artist-title {
                width: 80%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }

              .performance {
                padding: 5rem;
                padding-bottom: 10rem;
                color: rgba(255, 255, 255, 0.599);
                font-size: 12rem;
                padding-left: 15rem;
              }
            }

            .program-list-content-yiren-avtor-right-right {
              span {
                padding: 5rem 20rem;
                background-color: #fff;
                border-radius: 15rem;
              }
            }
          }
        }
      }
    }
  }

  .popular-venues {
    // position: relative;
    // left: -20rem;
    h3 {
      padding-left: 20rem;
      font-size: 20rem;
      font-weight: 550;
    }

    .popular-venues-big {
      // position: absolute;
      // display: inline-block;
      display: flex;
      flex-wrap: nowrap;
      overflow: hidden;
      overflow-x: auto;
      width: 100%;
      padding: 0 20rem;
      box-sizing: border-box;

      &::-webkit-scrollbar {
        display: none;
      }

      .popular-venues-list {
        // position: absolute;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        border: 1rem solid rgb(214, 214, 214);
        border-radius: 5rem;
        // width: 250rem;
        overflow: hidden;
        margin-right: 10rem;
        padding: 15rem;

        &:last-child {
          margin-right: 0;
        }

        &:nth-of-type(1) .bgc {
          background-color: #ffe8ea;
        }

        &:nth-of-type(2) .bgc {
          background-color: #eaedff;
        }

        &:nth-of-type(3) .bgc {
          background-color: #feeae0;
        }

        .popular-venues-list-top {
          .popular-venues-list-top-top {
            position: relative;
            display: inline-block;
            top: 0;

            span {
              font-size: 16rem;
              font-weight: 600;
            }

            .bgc {
              position: absolute;
              left: 10rem;
              top: 10rem;
              bottom: 0rem;
              right: -3rem;
              z-index: -1;
            }

            svg {
              width: 10rem;
              height: 10rem;
              position: absolute;
              top: 6rem;
              margin-left: 10rem;
            }
          }

          p {
            font-size: 12rem;
            color: #777;
            // transform: scale(0.9);
          }
        }

        .popular-venues-list-content {
          display: flex;
          margin-top: 10rem;

          .popular-venues-list-content-img {
            display: flex;
            position: relative;
            flex-direction: column;

            img {
              width: 100rem;
              height: 134rem;
              margin: 5rem 0;
              border-radius: 5rem;
              object-fit: cover;
            }

            &:nth-of-type(2) {
              margin-left: 10rem;
            }

            .discount {
              // display: inline-block;
              padding: 2rem;
              background-color: #ee0e87;
              position: absolute;
              // top: 0;
              // left: 2rem;
              margin-left: 10rem;
              color: white;
              text-align: center;
              border-radius: 3rem;

              span {
                font-size: 14rem;
                font-weight: 600;
              }

              p {
                font-size: 12rem;
                transform: scale(0.8);
                line-height: 10rem;
              }
            }

            .bottom {
              width: 100rem;
              margin-top: 5rem;

              // display: flex;
              span {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }

              p {
                color: rgb(155, 155, 155);
              }
            }
          }
        }
      }
    }
  }
}
</style>
