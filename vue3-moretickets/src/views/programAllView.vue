<template>
  <div class="programAll">
    <div
      class="program-bcg"
      :style="
        !store.isProgramgActive == true
          ? `background-image: url('../public/assets/programListBcg.png'); `
          : `background-image: url('../public/assets/programListBcg2.png'); `
      "
    ></div>
    <div class="programlist-head">
      <!-- <div class="programlist-return"></div> -->
      <svg
        @click="$router.push('/')"
        t="1666610565476"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2546"
        width="200"
        height="200"
      >
        <path
          d="M784.652701 955.6957 346.601985 517.644983c-2.822492-2.822492-2.822492-7.902977 0-11.289967l439.179713-439.179713c6.77398-6.77398 10.725469-16.370452 10.725469-25.966924L796.507166 36.692393c0-20.32194-16.370452-36.692393-36.692393-36.692393l-4.515987 0c-9.596472 0-19.192944 3.951488-25.966924 10.725469L250.072767 489.420066c-12.418964 12.418964-12.418964 32.740904 0 45.159868l477.565601 477.565601c7.338479 7.338479 17.499449 11.854465 28.224917 11.854465l0 0c22.015436 0 40.079383-18.063947 40.079383-40.079383l0 0C796.507166 973.759647 791.99118 963.598677 784.652701 955.6957z"
          p-id="2547"
          fill="#ffffff"
        ></path>
      </svg>
      <div class="programlist-choise">
        <span
          :class="{ active: !store.isProgramgActive }"
          @click="store.isProgramgActive = !store.isProgramgActive"
          >节目榜单</span
        >
        <span
          :class="{ active: store.isProgramgActive }"
          @click="store.isProgramgActive = !store.isProgramgActive"
          >艺人榜单</span
        >
      </div>
    </div>
    <div class="programlist-content" v-show="!store.isProgramgActive">
      <ul class="programlist-content-list">
        <li
          class="content"
          v-for="(programlist, i) in programlist"
          @click.stop="
            $router.push({
              path: '/detail',
              query: { showID: programlist.id },
            })
          "
        >
          <div class="image">
            <van-image
              class="dongtu"
              width="100rem"
              radius="5rem 0 0 5rem"
              height="140rem"
              fit="cover"
              position="left"
              :src="programlist.imgUrl"
            />
            <span>NO.{{ (i += 1) }}</span>
          </div>
          <div class="product">
            <!-- <div class="fen">
              <p class="title">{{ programlist.title }}</p>
              <span class="time">{{ programlist.subTitle }}</span>
              <span class="name">{{ programlist.address }}</span>
            </div> -->
            <p class="title">{{ programlist.title }}</p>
            <span class="time">{{ programlist.subTitle }}</span>
            <span class="name">{{ programlist.address }}</span>
            <p class="hot">{{ programlist.description }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="programlist-content-two" v-show="store.isProgramgActive">
      <ul class="performer">
        <li
          class="performer-list"
          v-for="(performerlist, i) in performerlist"
          @click.stop="
            $router.push({ path: '/artist', query: { id: performerlist.id } })
          "
        >
          <div class="touxiang">
            <van-image
              class="tou"
              width="90rem"
              radius="50%"
              height="90rem"
              fit="cover"
              position="left"
              :src="performerlist.imgUrl"
            />
            <span>NO.{{ (i += 1) }}</span>
          </div>
          <div class="actor">
            <div class="actor-list">
              <span class="play">{{ performerlist.title }}</span>
              <span class="performance">{{ performerlist.description }}</span>
            </div>
            <span>查看</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCounterStore } from "../stores/counter";
import { getProgramlist } from "@/apis/index";
import { getPerformerlist } from "@/apis/index";
const store = useCounterStore();

const programlist: any = ref(null);
getProgramlist().then((res: { data: any }) => {
  programlist.value = res.data.data;
  // console.log(res.data.data);
});

const performerlist: any = ref(null);
getPerformerlist().then((res: { data: any }) => {
  performerlist.value = res.data.data;
  // console.log(res.data.data);
});
</script>

<style lang="less" scoped>
.programAll {
  .program-bcg {
    // background-color: purple;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    // width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
  .programlist-head {
    padding: 20rem 20rem;
    svg {
      width: 20rem;
      height: 20rem;
    }
    .programlist-choise {
      margin-top: 20rem;
      span {
        padding: 8rem 0;
        margin-right: 10rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.492);
        margin-right: 20rem;
        font-size: 15rem;
      }
      .active {
        font-size: 18rem;
        border-bottom: 1rem solid rgb(255, 255, 255);
        color: white;
      }
    }
  }
  .programlist-content {
    padding: 10rem 20rem;
    .programlist-content-list {
      // margin-bottom: 50rem;
      // height: 100%;
      // height: 140rem;
      .content {
        background-color: rgba(0, 0, 0, 0.156);
        border-radius: 5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // margin: 20rem 0;
        margin-bottom: 20rem;
        &:last-child {
          margin-bottom: 40rem;
        }
        .image {
          position: relative;
          .dongtu {
          }
          span {
            position: absolute;
            bottom: -5rem;
            right: -10rem;
            border-radius: 5rem;
            padding: 6rem;
            background-color: black;
            color: white;
            font-size: 16rem;
            font-weight: 600;
          }
        }
        .product {
          // height: 100%;
          height: 140rem;
          margin: 0 20rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          .title {
            color: white;
            font-size: 16rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-weight: 600;
            // margin: 0;
            margin-bottom: 10rem;
          }
          .time {
            // margin-top: 20rem;
            font-size: 13rem;
            color: rgba(255, 255, 255, 0.559);
            // margin-top: 5rem;
          }
          .name {
            color: rgba(255, 255, 255, 0.559);
            font-size: 13rem;
            margin-top: 8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .hot {
            font-size: 13rem;
            // margin: 0;
            margin-top: 20rem;
            color: rgba(244, 244, 244, 0.318);
            // flex-grow: 1;
          }
        }
      }
    }
  }
  .programlist-content-two {
    padding: 10rem 20rem;
    .performer {
      margin-top: 10rem;
      .performer-list {
        height: 96rem;
        background-color: rgba(0, 0, 0, 0.156);
        border-radius: 50rem 0 0 50rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // margin: 20rem 0;
        margin-bottom: 30rem;
        &:last-child {
          margin-bottom: 40rem;
        }
        .touxiang {
          position: relative;
          .tou {
            border: 2rem solid white;
          }
          span {
            position: absolute;
            bottom: -5rem;
            right: 5rem;
            border-radius: 5rem;
            padding: 3rem;
            background-color: black;
            color: white;
            font-size: 16rem;
            font-weight: 600;
          }
        }
        .actor {
          display: flex;
          flex-grow: 1;
          margin: 0 20rem;
          // flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .actor-list {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            height: 100rem;
            // justify-content: space-between;
            .play {
              font-size: 18rem;
              color: white;
              font-weight: 600;
            }
            .performance {
              font-size: 14rem;
              color: rgba(255, 255, 255, 0.533);
            }
          }
          > span {
            font-size: 12rem;
            padding: 5rem 20rem;
            border-radius: 15rem;
            // font-weight: 600;
            background-color: white;
          }
        }
      }
    }
  }
}
</style>
