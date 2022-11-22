<template>
  <div class="attention">
    <div class="top">
      <div class="tback" @click="$router.back"></div>
      <div class="title">关注的艺人</div>
    </div>
    <div v-if="!storek.attention.length" class="nogz">
      <img src="https://m.moretickets.com/_nuxt/img/56f4925.png" alt="" />
      <h6>没有关注的艺人</h6>
      <p>关注的艺人都会出现在这里</p>
    </div>
    <div class="containerAll" v-else>
      <div
        class="container"
        v-for="item in storek.attention"
        @click="$router.push({ path: '/artist', query: { id: item.id } })"
      >
        <div class="limg">
          <img :src="item.artistIcon" alt="" />
        </div>
        <div class="content">
          <h6>{{ item.artistName }}</h6>
          <p>{{ item.artistSummarize }}</p>
        </div>
        <div class="gz" @click.stop="remove(item.artistName)">
          <button>已关注</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKkmStore } from "@/stores/kkms";
const storek = useKkmStore();
const remove = (name) => {
  storek.attention = [...storek.attention.filter((e) => e.artistName != name)];
  localStorage.setItem("attention", JSON.stringify(storek.attention));
};
</script>

<style lang="less" scoped>
.attention {
  .nogz {
    flex-flow: column;
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100rem;
    }

    h6 {
      margin: 10rem 0;
    }

    p {
      margin: 0;
      color: gray;
    }
  }

  .top {
    border-bottom: 1rem solid rgba(128, 128, 128, 0.152);
    padding: 22rem;

    .tback {
      position: absolute;
      top: 22rem;
      left: 22rem;
      width: 20rem;
      height: 20rem;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAoBAMAAAAWIydmAAAAKlBMVEVHcEwzMzMxMDk1KjUyLzgzLzcAAAAyMDgxMDgyLzcyLzgzLzgyMDgyMDgAg/Q/AAAADXRSTlMABbAY10YBrt5h8pe7ZUCsTgAAAElJREFUKM9jYIABttAEOJtB/O4GOJtR9+4COEfo7t0DSBJXDJAknAe3BFvt3RtwCda7d28yYOWgKEMxANXooSF1AHs0okQwKOoB3YVQ0ZAioZYAAAAASUVORK5CYII=);
      background-size: auto 100%;
      background-repeat: no-repeat;
      cursor: pointer;
    }

    .title {
      font-size: 16rem;
      text-align: center;
    }
  }

  .containerAll {
    padding: 0 18rem;
  }

  .container {
    border-bottom: 1rem solid rgba(128, 128, 128, 0.152);
    padding: 18rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .limg {
      width: 44rem;

      img {
        box-shadow: 0 0 1rem 0 gray;
        border-radius: 50%;
        width: 100%;
      }
    }

    .content {
      h6 {
        margin: 0;
        font-size: 14rem;
      }

      p {
        color: gray;
        width: 196rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .gz {
      button {
        border: 0;
        padding: 4rem 12rem;
        font-size: 12rem;
        border-radius: 30rem;
        color: gray;
        background-color: #fff;
        outline: 1rem solid rgba(128, 128, 128, 0.311);
      }
    }
  }
}
</style>
