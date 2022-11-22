<script setup>
import { ref } from "vue";
// import { useCounterStore } from "../stores/counter";
// import "vant/es/dialog/style";
// import { createApp } from "vue";
import { Dialog } from "vant";
import router from "../router/index";
// export default {
//   components: {
//     [Dialog.Component.name]: Dialog.Component,
//   },
// };
// const VanDialog = Dialog.Component;

// Dialog.close();
function xxx() {
  //   Dialog.confirm();
  Dialog.confirm({
    title: "",
    message: "你确定要关闭推送通知吗?会影响查看最新的演出相关信息！",
    // Dialog.close,
  })
    .then(() => {
      // on confirm
    })
    .catch(() => {
      // on cancel
    });
}
function yyy() {
  //   Dialog.confirm();
  Dialog.confirm({
    title: "是否确定退出",
    message: "退出后无法查看用户相关信息",
    // Dialog.close,
  })
    .then(() => {
      // on confirm
      //   console.log(123);
      localStorage.setItem("username", "");
      localStorage.setItem("token", "");
      router.push("/me");
    })
    .catch(() => {
      // on cancel
    });
  //   Dialog.confirm = router.push("/me");
}
// function yyy() {
// }
</script>

<template>
  <div class="logoutView">
    <div class="logouthead">
      <div class="logouthead-return">
        <svg
          @click.stop="$router.push('/me')"
          t="1666678972927"
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
            fill="#2c2c2c"
          ></path>
        </svg>
        <h3>设置</h3>
      </div>
      <div class="alerts-all">
        <div class="alerts" @click.stop="xxx()">
          <span>接受新消息通知</span>
          <span>已开启</span>
        </div>
        <p>您可通过“手机设置-通知-摩天轮票务”关闭通知</p>
      </div>
    </div>
    <div class="account">
      <span>账户安全</span>
    </div>
    <div class="about">
      <p>关于我们</p>
      <p>意见反馈</p>
      <div class="service">
        <span>客服电话</span>
        <a href="#">4006962266</a>
      </div>
    </div>
    <div class="out" @click.stop="yyy()">
      <span>退出登录</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.logoutView {
  background-color: rgba(128, 128, 128, 0.112);
  height: 100vh;
  .logouthead {
    // display: flex;
    background-color: white;
    .logouthead-return {
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
    .alerts-all {
      padding: 10rem 20rem;
      .alerts {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 17rem;
          // padding: 10rem 0;
          margin-top: 10rem;
          //   font-weight: 600;
          &:nth-of-type(2) {
            font-size: 14rem;
            color: rgba(128, 128, 128, 0.484);
          }
        }
      }
      p {
        margin: 0;
        margin: 10rem 0;
        font-size: 14rem;
        color: rgba(128, 128, 128, 0.818);
      }
    }
  }
  .account {
    padding: 20rem 20rem;
    margin: 10rem 0;
    background-color: white;
    span {
      //   padding: 10rem;
      //   background-color: white;
      font-size: 16rem;
    }
  }
  .about {
    background-color: white;
    p {
      padding: 20rem 20rem;
      font-size: 16rem;
      margin: 0;
      border-bottom: 1rem solid rgba(128, 128, 128, 0.09);
    }
    .service {
      padding: 20rem 20rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 16rem;
      }
      a {
        font-size: 16rem;
        color: blue;
        border-bottom: 1rem solid blue;
      }
    }
  }
  .out {
    margin-top: 10rem;
    background-color: white;
    padding: 20rem;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 18rem;
      //   text-align: center;
      color: red;
      //   margin: 0 auto;
    }
  }
}
</style>
