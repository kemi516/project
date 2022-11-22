<script setup>
import { ref } from "vue";
import { getGreat } from "../apis/great.js";
import { useCityStore } from "../stores/citysID.ts";
const watching = ref();
const storeC = useCityStore();
getGreat(storeC.id).then((res) => {
  console.log(res);
  watching.value = res.data.result.data;
});
</script>

<template>
  <div class="chaozhi">
    <div class="top">
      <figure @click.stop="$router.back()">
        <img src="../../public/assets//_d.png" alt="" />
      </figure>
      <p>超值精选</p>
    </div>
    <div class="great">
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
            :src="item.posterURL + '@!100w'"
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
</template>

<style lang="less" scoped>
.chaozhi {
  > .top {
    width: 100vw;
    background-color: #ffffff;
    height: 50rem;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
    border-bottom: 1rem solid #eee;
    > figure {
      width: 50rem;
      height: 50rem;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      > img {
        width: 60%;
        height: 60%;
        object-fit: contain;
      }
    }
    > p {
      font-size: 17rem;
      padding: 0;
      margin: 0;
      margin-left: 20rem;
      color: #333;
      letter-spacing: 2rem;
    }
  }
  .great {
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
}
</style>
