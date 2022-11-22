<script setup>
// import Synopsis from "@/components/Synopsis.vue";
defineProps({
  choiceness: Array,
  itemm: Object,
});
import { detaillStore } from "../stores/detaill.ts";
import { useCounterStore } from "../stores/counter";
const detailD = detaillStore();

// 定位菠萝
import { useCityStore } from "../stores/citysID";
const citys = useCityStore();

const store = useCounterStore();
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

<template>
  <div class="choiceness">
    <div class="choi-container">
      <div
        class="content"
        v-for="(item, i) in choiceness"
        :key="i"
        @click.stop="
          i < choiceness?.length - 1
            ? $router.push({ path: '/detail', query: { showID: item.id } })
            : toShow(itemm)
        "
      >
        <div class="lefts-img">
          <van-image
            width="100rem"
            height="133rem"
            fit="cover"
            position="left"
            :src="item.imgUrl"
          />
          <!-- <img width="100rem" height="133rem" :src="item.posterURL" /> -->
        </div>
        <div class="discount" v-if="item.discount < 10 && item.discount > 0">
          <!-- <p class="num"> {{(item.discount*10).toFixed(1)}}</p> -->
          <p class="num">{{ item.discount }}</p>
          <p class="zq">折起</p>
        </div>
        <div class="bottom">
          <h6 class="title">
            {{ item.title }}
          </h6>
          <p>{{ item.description }}</p>
          <p class="show-price" v-if="item.price">
            <span>{{ item.price }}</span
            >元起
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.choi-container {
  display: flex;
  overflow-x: auto;
  padding: 0 20rem;

  &::-webkit-scrollbar {
    display: none;
  }

  .content {
    margin-top: 10rem;
    margin-right: 10rem;
    width: 100rem;
    flex-shrink: 0;
    border-radius: 6rem;
    position: relative;
    &:last-child {
      margin-right: 0;
    }
    .lefts-img {
      .van-image {
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

    .bottom {
      text-align: justify;

      h6 {
        margin: 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }

      p {
        color: gray;
        margin: 6rem 0;

        &.show-price {
          color: rgb(255, 29, 65);

          span {
            margin-right: 3rem;
            // margin-left: 1rem;
            font-size: 16rem;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
