<template>
  <div class="SearchOv">
    <div class="topov">
      <svg t="1665214694358" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2530" width="18" height="18">
        <path
          d="M469.333333 768c-166.4 0-298.666667-132.266667-298.666666-298.666667s132.266667-298.666667 298.666666-298.666666 298.666667 132.266667 298.666667 298.666666-132.266667 298.666667-298.666667 298.666667z m0-85.333333c119.466667 0 213.333333-93.866667 213.333334-213.333334s-93.866667-213.333333-213.333334-213.333333-213.333333 93.866667-213.333333 213.333333 93.866667 213.333333 213.333333 213.333334z m251.733334 0l119.466666 119.466666-59.733333 59.733334-119.466667-119.466667 59.733334-59.733333z"
          fill="#444444" p-id="2531"></path>
      </svg>
      <input v-model="value" type="text" ref="input" placeholder="请输入作品名、创作人" @input="searchValue(value)" @keyup.enter="
        clickHistory(value);
        $refs.input.blur();
      " />

      <span @click="$router.push({ path: '/home/search' })">取消</span>
    </div>
    <div class="searchss" v-if="!seeChildrenHotSearch">
      <div class="hothistory">
        <div class="head">
          <p>历史搜索</p>
          <svg @click="clearAll" t="1665035625334" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="21108" width="200" height="200">
            <path
              d="M960 256v32h-64v608a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V288H64V256H32V224a128 128 0 0 1 128-128h132.544A128 128 0 0 1 416 0h192a128 128 0 0 1 123.456 96H864a128 128 0 0 1 128 128v32h-32zM256 960h512a64 64 0 0 0 64-64V288H192l-4.448 608A68 68 0 0 0 256 960zM608 64h-192a63.808 63.808 0 0 0-55.104 32h302.176A63.808 63.808 0 0 0 608 64z m256 96H160a64 64 0 0 0-64 64h832a64 64 0 0 0-64-64zM320 416a32 32 0 0 1 32 32v352a32 32 0 0 1-64 0V448a32 32 0 0 1 32-32z m192 0a32 32 0 0 1 32 32v352a32 32 0 0 1-64 0V448a32 32 0 0 1 32-32z m192 0a32 32 0 0 1 32 32v352a32 32 0 0 1-64 0V448a32 32 0 0 1 32-32z"
              p-id="21109" fill="#8a8a8a"></path>
          </svg>
        </div>
        <span v-for="(h, i) in history" :key="i" @click="clickHistory(h)">{{
        h
        }}</span>
      </div>
      <div class="content">
        <div>热门内容</div>
        <p v-for="(item, i) in searchcontent" :key="i">
          <!-- @click.stop="updateRouter({ resource: item })" -->
          <!-- <span>{{ i + 1 }}</span><a :href="item.webLink">{{ item.title}}</a> -->
          <span class="index">{{ i + 1
          }}</span>

          <span @click.stop="updateRouter(`${item.link.split('/')[item.link.split('/').length-1]}`)">{{
          item.title}}</span>
          <!-- {{item.link.split('/')[item.link.split('/').length-1]}} -->
          <img v-if="item?.tags[0]?.icon" v-lazy="`${item?.tags[0]?.icon}?x-oss-process=image/resize,m_mfit,w_80`"
            alt="" />
        </p>
      </div>
      <div class="hotsearch">
        <div>热门搜索</div>
        <button v-for="item in hotsearch" :key="item.id" @click="clickHotSearch(item)">
          {{ item.name }}
        </button>
      </div>
    </div>
    <ChildrenHotSearch v-else :hotNameTitle="hotNameTitle" :categories="categories" :hotNameCreated="hotNameCreated" />
  </div>
</template>

<script>
import ChildrenHotSearch from "@/components/ChildrenHotSearch.vue";

import { mapMutations, mapState } from "vuex";
export default {
  // name: "HelloWorld",
  // props: {
  //   categories: String,
  // },
  components: {
    ChildrenHotSearch,
  },
  props: ["categories"],
  data() {
    return {
      value: "",
      seeChildrenHotSearch: false,
      hotNameTitle: [],
      hotNameCreated: [],
      history: JSON.parse(localStorage.getItem("history")) || [],
    };
  },

  computed: {
    ...mapState(["searchcontent", "hotsearch"]),
  },
  methods: {
    ...mapMutations(["searchov", "searchhot"]),
    updateRouter(n) {
      // console.log(Number(n));
      if (Number(n)) {

        this.$router.push({ path: "/media", query: { id: n } });
      }
    },

    clearAll: function () {
      this.history = [];
    },
    clickHistory: function (n) {
      this.value = n;
      this.axios
        .get("newstudios/v2/search", {
          params: {
            type: "article",
            kw: n,
          },
        })
        .then((res) => {
          //   console.log(res.data.data.list);
          this.history?.unshift(this.value);
          this.history = [...new Set(this.history)];
          this.hotNameTitle = res.data.data.list;
          this.seeChildrenHotSearch = true;
        });
    },
    clickHotSearch: function (n) {
      //   console.log(n.name);
      this.value = n.name;
      this.history?.unshift(this.value);
      this.history = [...new Set(this.history)];
      this.axios
        .get(`/newstudios/v2/search`, {
          params: {
            type: "article",
            kw: n.name,
          },
        })
        .then((res) => {
          // console.log(res.data.data.list);
          this.hotNameTitle = res.data.data.list;
          this.seeChildrenHotSearch = true;
        });
      this.axios
        .get(`/newstudios/v2/search`, {
          params: {
            type: "creator",
            kw: n.name,
          },
        })
        .then((res) => {
          // console.log(res.data.data.list);
          this.hotNameCreated = res.data.data.list;
          this.seeChildrenHotSearch = true;
        });
    },
    searchValue: function (v) {
      this.value = v;
      if (this.value !== "") {
        this.axios
          .get("newstudios/v2/search", {
            params: {
              type: "article",
              kw: v,
            },
          })
          .then((res) => {
            //   console.log(res);
            // console.log(res.data.data.list);
            //   console.log(this.value);
            this.res = res.data.data.list;
            //   console.log(v);
          });
      }
    },
    saveHistory: function (n) {
      if (this.value !== "") {
        // this.value = n.name;
        this.history?.unshift(this.value);
        this.history = [...new Set(this.history)];
        // console.log(this.history);
        // console.log(v);
        // this.value = v;
        this.axios
          .get(`/newstudios/v2/search`, {
            params: {
              type: "article",
              kw: n,
            },
          })
          .then((res) => {
            console.log(res.data.data.list);
            this.hotNameTitle = res.data.data.list;
            this.seeChildrenHotSearch = true;
          });
        this.axios
          .get(`/newstudios/v2/search`, {
            params: {
              type: "creator",
              kw: n,
            },
          })
          .then((res) => {
            console.log(res.data.data.list);
            this.hotNameCreated = res.data.data.list;
            this.seeChildrenHotSearch = true;
          });
      }
    },
  },
  mounted() {
    this.$refs.input.focus();
  },
  created() {
    this.axios.get("/v2/search/hotContents").then((e) => {
      // console.log(e.data.data.list);
      this.searchov(e.data.data.list);
    });
    this.axios.get("/search_recommend_kws").then((e) => {
      // console.log(e.data.data.list);
      this.searchhot(e.data.data.list);
    });
  },
  watch: {
    history(newhistory) {
      localStorage.setItem("history", JSON.stringify(newhistory));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.SearchOv {
  font-size: 12rem;

  .searchss {
    .hothistory {
      margin-left: 15rem;
      margin-top: 20rem;

      .head {
        display: flex;
        height: 30rem;
        align-items: center;
        justify-content: space-between;

        p {
          font-size: 13rem;
          color: gray;
        }

        svg {
          width: 15rem;
          height: 15rem;
          margin-right: 15rem;
        }
      }

      span {
        display: inline-block;

        margin: 8rem;
        border-radius: 3rem;
        padding: 3rem 10rem;

        font-size: 12rem;
        background-color: rgb(240, 240, 240);
      }
    }
  }

  .topov {
    border-bottom: 1rem solid rgba(128, 128, 128, 0.191);
    padding: 16rem;
    position: relative;

    svg {
      position: absolute;
      left: 26rem;
      top: 20rem;
    }

    input {
      width: 86%;
      margin-right: 20rem;
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

  .content {
    a {
      color: black;
    }

    div {
      color: #999;
      margin: 10rem;
    }

    p {
      &:nth-of-type(-n + 3) {
        span {
          color: black;
        }
      }

      span {
        &.index {
          color: #999;
          margin: 10rem;
        }

      }

      line-height: 33rem;

      img {
        width: 15rem;
        margin-left: 10rem;
      }
    }
  }

  .hotsearch {
    div {
      color: #999;
      margin: 10rem;
    }

    button {
      border: 0;
      margin: 8rem;
      border-radius: 3rem;
      padding: 3rem 10rem;
    }
  }
}
</style>
