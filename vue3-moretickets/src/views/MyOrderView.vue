<script setup>
import { ref } from "vue";
import { useKkmStore } from "@/stores/kkms";
import { useCounterStore } from "@/stores/counter";
const storek = useKkmStore()
const store = useCounterStore()
let num = 22010202671
localStorage.setItem('order', JSON.stringify(storek.order));
store.active = 2;
const remove = (item) => {
  storek.order = storek.order.filter((e) => e != item)
  localStorage.setItem('order', JSON.stringify(storek.order))
}
</script>
<template>
  <div class="myorder">
    <div class="myorder-head">
      <svg @click.stop="$router.push('/me')" t="1666678972927" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="2546" width="200" height="200">
        <path
          d="M784.652701 955.6957 346.601985 517.644983c-2.822492-2.822492-2.822492-7.902977 0-11.289967l439.179713-439.179713c6.77398-6.77398 10.725469-16.370452 10.725469-25.966924L796.507166 36.692393c0-20.32194-16.370452-36.692393-36.692393-36.692393l-4.515987 0c-9.596472 0-19.192944 3.951488-25.966924 10.725469L250.072767 489.420066c-12.418964 12.418964-12.418964 32.740904 0 45.159868l477.565601 477.565601c7.338479 7.338479 17.499449 11.854465 28.224917 11.854465l0 0c22.015436 0 40.079383-18.063947 40.079383-40.079383l0 0C796.507166 973.759647 791.99118 963.598677 784.652701 955.6957z"
          p-id="2547" fill="#2c2c2c"></path>
      </svg>
      <h3>我的订单</h3>
    </div>
    <div class="no-order" v-if="storek.order.length == 0">
      <img src="../../public/assets/no-order.png" alt="" />
      <div class="miaoshu">
        <h6>暂无相关的订单</h6>
        <p>去看看有什么感兴趣的节目</p>
      </div>
      <p @click="store.active = 1; $router.push('/list');">去看看</p>
    </div>
    <div v-else>
      <div class="myorder-content" v-for="item in storek.order">
        <div class="myorder-content-head">
          <span>订单编号: {{ num++ }}</span>
          <span>订单已支付</span>
        </div>
        <div class="myorder-content-middle">
          <div class="myorder-left">
            <img :src="item.imgs" alt="" />
          </div>

          <div class="myorder-right">
            <h3>
              {{ item.title }}
            </h3>
            <div class="juti">
              <p>时间: {{ item.date }}</p>
              <p>地点: {{ item.address }}</p>
              <p>数量: {{ item.index }}张</p>
              <p>总计: <span>{{ item.total }}</span>元</p>
            </div>
          </div>
        </div>
        <div class="myorder-content-bottom" @click="remove(item)">
          <span>删除订单</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
.myorder {
  .myorder-head {
    padding: 0 20rem;
    display: flex;
    align-items: center;
    border-bottom: 1rem solid rgba(128, 128, 128, 0.09);

    svg {
      width: 20rem;
      height: 20rem;
    }

    h3 {
      margin-left: 30rem;
      font-size: 18rem;
    }
  }

  .no-order {
    display: flex;
    // display: none  ;
    flex-direction: column;
    // margin: auto auto;
    width: 100%;
    height: 80vh;
    justify-content: center;
    align-items: center;

    img {
      width: 100rem;
    }

    .miaoshu {
      padding-top: 15rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h6 {
        font-size: 16rem;
        margin: 0;
      }

      p {
        font-size: 12rem;
        margin: 0;
        padding-top: 5rem;
        border: none;
        color: rgba(0, 0, 0, 0.359);
      }
    }

    p {
      font-size: 16rem;
      padding: 5rem 15rem;
      border: 1rem solid rgba(128, 128, 128, 0.589);
      border-radius: 20rem;
    }
  }

  .myorder-content {
    padding: 20rem;
    margin-top: 5rem;

    .myorder-content-head {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        color: rgba(0, 0, 0, 0.54);
        font-size: 12rem;

        &:nth-of-type(2) {
          color: rgb(195, 6, 6);
          font-size: 12rem;
          transform: scale(0.9);
        }
      }
    }

    .myorder-content-middle {
      display: flex;
      margin-top: 20rem;

      .myorder-left {
        img {
          width: 70rem;
          height: 100rem;
        }
      }

      .myorder-right {
        padding-left: 15rem;

        h3 {
          font-size: 16rem;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .juti {
          //   display: flex;
          margin-top: 10rem;

          p {
            font-size: 12rem;
            margin: 0;
            margin-left: 5rem;
            color: rgba(0, 0, 0, 0.553);

            // transform: scale(1);
            // transform-origin: left;
            span {
              color: red;
            }
          }
        }
      }
    }

    .myorder-content-bottom {
      padding-top: 50rem;
      display: flex;
      justify-content: flex-end;

      span {
        font-size: 12rem;
        color: rgba(0, 0, 0, 0.54);
        padding: 5rem 10rem;
        border: 1rem solid rgba(0, 0, 0, 0.452);
        border-radius: 15rem;
      }
    }
  }
}
</style>
