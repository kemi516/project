<script setup>
import { getHotSearch, getHomeBanner } from "@/apis/index";
import { getListMain, getDetail, getFilter } from "@/apis/show";
import { ref, watch, onMounted, getCurrentInstance } from "vue";
import { useCityStore } from "../stores/citysID";
import { useCounterStore } from "../stores/counter.ts";
import ListShow from "@/components/ListShow.vue";

const store = useCityStore();
const storeC = useCounterStore();
const banners = ref(null);
const tabs = ref(null);
const tickets = ref(null);
getHomeBanner().then((res) => {
  banners.value = res.data.result.categorys.rooms[0].items;
  tabs.value = [{ title: "全部", navigateUrl: "0?" }, ...banners.value];
});

const loading = ref(true);
// 作品
// 作品count最大数
const maxCount = ref(0);
// 计数启
const count = ref(0);
// 是否能请求
const isAxios = ref(false);
getListMain(store.listActive, store.id == 0 ? 4401 : store.id).then((res) => {
  tickets.value = res.data.result.data;
  maxCount.value = res.data.result.pagination.count;
  count.value++;
  isAxios.value = true;
  loading.value = false;
});

// 切换

// 分类图标
const filter = ref([]);
const toggleTicket = (n) => {
  loading.value = true;
  getFilter().then((res) => {
    filter.value = res.data.data;
  });

  getListMain(n, store.id == 0 ? 4401 : store.id, count.value).then((res) => {
    tickets.value = res.data.result.data;
    maxCount.value = res.data.result?.pagination?.count;
    count.value++;
    isAxios.value = true;
    loading.value = false;
  });
};

// 滑动切换
const yyy = (name) => {
  count.value = 0;
  isHaiYou.value = true;
  toggleTicket(+name);
  isAxios.value = true;
};

const show = ref(false);
const showPopup = () => {
  show.value = true;
};

// 定位
const dingwei = JSON.parse(localStorage.getItem("citys")) || [];

// target
const target = (id) => {
  store.listActive = id;
};
// route
const searchBox = ref(null);
// 是否还有请求
const isHaiYou = ref(true);
// 滚动执行事件
const scrollEvent = (e) => {
  // console.log(!searchBox.value, e.target?.location);
  if (e.target?.location?.hash == "#/list") {
    // 完美解决多个监听事件问题 自己删除自己
    if (!searchBox.value) {
      window.removeEventListener("scroll", scrollEvent);
    }
    // 防抖
    clearTimeout(window.time);
    window.time = setTimeout(() => {
      const weizhi =
        searchBox.value?.offsetHeight - window.innerHeight - scrollY;
      if (
        weizhi < window.innerHeight * 0.7 &&
        tickets.value?.length < maxCount.value &&
        isAxios.value
      ) {
        isAxios.value = false;
        getListMain(
          store.listActive,
          store.id == 0 ? 4401 : store.id,
          count.value
        ).then((res) => {
          tickets.value.push(...res.data.result.data);
          loading.value = false;
          isAxios.value = true;
          count.value++;
        });
      } else if (tickets.value?.length >= maxCount.value) {
        isHaiYou.value = false;
        console.log("没有更多了");
      }
    }, 300);
  }
};

onMounted(() => {
  window.addEventListener("scroll", scrollEvent);
});
</script>

<template>
  <div ref="searchBox">
    <div class="search">
      <div
        @click="$router.push('/location?from=/list')"
        style="font-weight: 600"
      >
        <img src="../assets/location.png" alt="" />{{
          dingwei[0]?.cityName ? dingwei[0]?.cityName : "广州"
        }}
      </div>
      <div
        class="search-input"
        @click="
          storeC.routeValue = '';
          storeC.routeKeyValue = '';
          $router.push('/search');
        "
      >
        <img src="../assets/search.png" alt="" />
        <p>搜索明星、演出、场馆</p>
      </div>
    </div>
    <div class="banner">
      <div class="nav">
        <van-tabs
          class="list-tabs"
          v-model:active="store.listActive"
          color="#000"
          sticky
          swipeable
          @change="yyy"
          line-width="10%"
        >
          <van-tab
            v-for="(banner, i) in tabs"
            :title="banner.title"
            :name="+banner.navigateUrl.split('?')[1].slice(-1)"
            ref="li"
          >
            <van-loading color="#f00" size="40" v-show="loading" />
            <ListShow v-show="!loading" :tickets="tickets" :isHaiYou="isHaiYou">
            </ListShow>
          </van-tab>
        </van-tabs>
        <div class="img">
          <van-cell is-link @click="showPopup"></van-cell>
          <van-popup
            v-model:show="show"
            closeable
            position="top"
            :style="{ height: '50%' }"
            close-icon-position="top-right"
          >
            <h3 class="p">
              选择分类<span v-if="false" @click="show = false" class="tui"
                >x</span
              >
            </h3>
            <div class="imgs">
              <div
                @click="
                  toggleTicket('');
                  show = false;
                  target(0);
                "
              >
                <img src="https://m.moretickets.com/_nuxt/img/46524bb.png" />
                <p>全部</p>
              </div>
              <div
                v-for="(img, i) in banners"
                @click="
                  toggleTicket(img.navigateUrl.split('?')[1].slice(-1));
                  show = false;
                  target(+img.navigateUrl.split('?')[1].slice(-1));
                "
              >
                <img :src="img.imgUrl" alt="" />
                <p>{{ img.title }}</p>
              </div>
            </div>
          </van-popup>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search {
  display: flex;
  font-size: 16rem;
  padding: 0 20rem;

  div {
    flex-shrink: 0;
    width: 22%;
    display: flex;
    align-items: center;

    img {
      width: 22rem;
    }

    p {
      margin: 0;
    }
  }

  .search-input {
    padding: 10rem 10rem;
    box-sizing: border-box;
    width: 75%;
    background-color: #f6f6f7;
    border-radius: 32rem;
    margin: 15rem 0 10rem;

    img {
      margin: 0 10rem;
    }

    p {
      color: gray;
      width: 100%;
    }
  }
}

.banner {
  width: 100%;

  // padding: 10rem;
  // display: flex;
  // flex-wrap: nowrap;
  // align-items: center;
  // overflow-x: auto;
  .nav {
    position: relative;

    .img {
      width: 52rem;
      height: 52rem;
      background-color: white;
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      // align-items: center;
      justify-content: center;
      z-index: 2;

      .van-cell {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 20rem !important;
        height: 20rem !important;
        margin-top: 12rem;
        transform: scale(0.7);
        background-image: url("../../public/yanchu/quanbu.png");
      }

      .van-popup {
        // width: 100%;
        h3 {
          width: 100%;
          text-align: center;
          position: relative;
          // padding-right: 30rem;
          // box-sizing: border-box;
          font-size: 20rem;

          .tui {
            right: 20rem;
            top: 0;
            position: absolute;
          }
        }

        // display: flex !important;
        .imgs {
          width: 100%;
          padding: 30rem;
          box-sizing: border-box;
          display: flex !important;
          /* justify-content: space-evenly; */
          flex-wrap: wrap;

          div {
            width: 33.3%;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            flex-flow: column;
            align-items: center;

            img {
              width: 50rem;
              height: 50rem;
            }
          }
        }
      }
    }
  }
}

.van-loading {
  height: 100vh;
  display: flex;
  justify-content: center;
  // align-items: center;
  margin-top: 50rem;
}

.van-badge__wrapper {
  display: none;
  // content: '';
  // display: inline;
}

// .banner::-webkit-scrollbar {
//   width: 0;
// }
</style>
<style lang="less">
.list-tabs {
  .van-tab--active {
    /* text-align: center; */
    /* color:  !important; */
    font-size: 20rem !important;
    font-weight: bold !important;
  }

  .van-badge__wrapper {
    display: none !important;
  }

  .van-tabs__nav {
    padding-right: 50rem !important;
  }

  .van-popup {
  }
}
</style>
