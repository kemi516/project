<script setup>
import { ref, watch, getCurrentInstance, onMounted } from "vue";
import { useCounterStore } from "../stores/counter";
import { getHotSearch, getSearching, getSearched } from "@/apis/index";
import SearchingList from "@/components/SearchingList.vue";
import SearchedList from "@/components/SearchedList.vue";
import SearchRes from "@/components/SearchRes.vue";
import { useRoute } from "vue-router";
const store = useCounterStore();
const route = useRoute();
import { useCityStore } from "@/stores/citysID";
const storeCity = useCityStore();
// 热门搜索
const hotlist = ref([]);
getHotSearch(storeCity?.id).then((res) => {
  hotlist.value = res.data.data.hotKeywords;
});

// 搜索历史
const getHistory = (keyword) => {
  if (keyword && keyword.trim() != "") {
    store.searchedlist.unshift(keyword);
    store.searchedlist = [...new Set(store.searchedlist)];
    localStorage.setItem(
      "history",
      JSON.stringify([...new Set(store.searchedlist)])
    );
  }
};

// 搜索ing
const keyword = ref("");
const time = ref(null);
const searchinglist = ref(null);
// 聚焦
const jujiao = ref(false);
watch(keyword, (newKeyword) => {
  if (
    newKeyword &&
    newKeyword.trim() != "" &&
    (jujiao.value ? jujiao.value : store.routeKeyValue)
  ) {
    clearTimeout(time.value);
    time.value = setTimeout(() => {
      store.routeKeyValue = newKeyword;
      getSearching(newKeyword).then((res) => {
        searchinglist.value = res.data.data;
        searchResList.value = "";
      });
    }, 200);
  } else {
    clearTimeout(time.value);
    searchResList.value = "";
    searchinglist.value = null;
  }
});

// 搜索res
const searchResList = ref(null);
const getSearchedRes = (keyword) => {
  if (keyword && keyword.trim() != "" && keyword != " ") {
    store.routeKeyValue = "";
    getHistory(keyword);
    store.routeValue = keyword;
    getSearched(keyword).then((res) => {
      clearTimeout(time.value);
      searchResList.value = res.data.data.searchData;
    });
  }
};
// searchedlist
const searchedlist = ref(null);

// 动画 判断
const isTran = ref(false);
// 创建后 input聚焦
const refs = getCurrentInstance();
// input ref
const input = ref();

if (store.routeValue) {
  onMounted(() => {
    isTran.value = true;
    getSearchedRes(store.routeValue);
    keyword.value = store.routeValue;
  });
} else {
  onMounted(() => {
    isTran.value = true;
    setTimeout(() => {
      input.value.focus();
    }, 300);
  });
}
if (store.routeKeyValue) {
  onMounted(() => {
    keyword.value = store.routeKeyValue;
  });
}
</script>

<template>
  <Transition name="searchTran">
    <div v-if="isTran" class="search">
      <header>
        <div class="left">
          <span></span>
          <input
            type="text"
            v-model="keyword"
            placeholder="搜索明星、演出、赛事、场馆"
            ref="input"
            @blur="jujiao = false"
            @focus="jujiao = true"
            @keydown.enter="
              getSearchedRes(keyword);
              getHistory(keyword);
            "
          />
          <van-icon name="cross" v-if="keyword" @click="keyword = ''" />
        </div>
        <div
          class="right"
          @click="
            isTran = false;
            $router.back();
          "
        >
          取消
        </div>
      </header>

      <SearchingList
        v-if="keyword && !searchResList?.length > 0"
        :searchinglist="searchinglist"
      />

      <SearchRes
        v-if="searchResList"
        :searchResList="searchResList"
        :keyword="keyword"
      />

      <SearchedList
        v-if="!keyword && store.searchedlist.length > 0"
        :searchedlist="searchedlist"
        @getSearchedRes="
          getSearchedRes($event.value);
          keyword = $event.value;
        "
      />
      <div class="search-hot" v-if="!keyword">
        <p>热门搜索</p>
        <ul>
          <li
            v-for="(hot, index) in hotlist"
            :key="index"
            @click="
              getSearchedRes(hot.keyword);
              keyword = hot.keyword;
            "
          >
            <span class="icon" v-if="index == 0"
              ><img src="../assets/boom.png" width="15" alt=""
            /></span>
            <span class="icon" v-if="index == 1"
              ><img src="../assets/hot.png" width="15" alt=""
            /></span>
            {{ hot.keyword }}
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<style lang="less" scoped>
.searchTran-enter-from,
.searchTran-leave-to {
  position: fixed;
  top: 0;
  z-index: 100;
  transform: translateX(100vw);
}
.searchTran-enter-active {
  transition: all 0.3s;
}
.searchTran-leave-active {
  transition: all 0.2s;
}

.searchTran-enter-to,
.searchTran-leave-from {
  position: fixed;
  top: 0;
  transform: translateX(0vw);
}
// 内容
.search {
  font-size: 12rem;
  padding: 0 20rem;
  background-color: white;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  header {
    height: 50rem;
    font-size: 16rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15rem;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 11;
    padding: 10rem 0;
    width: 100%;
    &::before {
      position: absolute;
      top: -1rem;
      left: -20rem;
      display: block;
      content: "";
      background: white;
      width: 100vw;
      height: 100%;
      z-index: -1;
    }
    .left {
      position: relative;
      width: 87%;
      .van-icon-cross {
        position: absolute;
        top: 15rem;
        right: 15rem;
        font-size: 13rem;
      }
      span {
        position: absolute;
        top: 11rem;
        left: 12rem;
        display: block;
        width: 20rem;
        height: 20rem;
        background: url("../assets/search.png");
        background-size: cover;
      }
      input {
        border-radius: 30rem;
        width: 100%;
        height: 40rem;
        border: none;
        outline: none;
        background: #f6f6f7;
        padding-left: 40rem;
        padding-top: 2rem;
        font-size: 14rem;
        box-sizing: border-box;
      }
    }
  }

  > div {
    margin-top: 10rem;
    p {
      color: #9b9b9b;
      margin-bottom: 10rem;
      font-size: 13rem;
    }
    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        background: #eaeaea;
        padding: 8rem;
        margin-right: 10rem;
        margin-bottom: 10rem;
        border-radius: 2rem;
        color: #333;
        font-size: 13rem;
        span {
          img {
            vertical-align: -3rem;
          }
        }
      }
    }
  }
}
</style>
