<script setup>
import { ref } from "vue";
import { Toast } from "vant";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { getCurrentInstance, onMounted } from "vue";
const router = useRouter();
const route = useRoute();
const refs = getCurrentInstance();
var path = ref("/");
const call = ref(null);
const pwd = ref(null);
const isok = ref(null);
const isShow = ref(false);
setTimeout(() => {
  isShow.value = true;
}, 0);
const login = () => {
  const a1 = call.value.value;
  const a2 = pwd.value.value;
  const a3 = isok.value.checked;
  const reg =
    "^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$";
  const a1OK = a1.match(reg);
  if (a1OK) {
    if (a2?.length >= 6) {
      if (a3) {
        localStorage.setItem("token", "Token_ssh");
        localStorage.setItem("username", a1);
        isShow.value = false;
        const toPath = localStorage.getItem("loginPath");
        if (toPath !== "undefined") {
          console.log(toPath);
          router.replace({ path: toPath });
        } else {
          console.log(123);
          router.back();
        }
      } else {
        Toast({
          message: "请勾选条款后使用服务",
          position: "bottom",
        });
      }
    } else {
      Toast({
        message: "密码要6位及以上",
        position: "bottom",
      });
    }
  } else {
    if (a1?.length !== 11) {
      Toast({
        message: "请输入11位手机号码",
        position: "bottom",
      });
    } else {
      Toast({
        message: "请输入有效手机号码",
        position: "bottom",
      });
    }
  }
};

const back = () => {
  isShow.value = false;
  router.back();
};
localStorage.setItem("loginPath", route?.query?.to);
</script>

<template>
  <Transition name="vV">
    <div class="login" v-if="isShow">
      <div class="top">
        <figure @click.stop="back">
          <img src="../../public/assets//60.png" />
        </figure>
      </div>
      <section class="title">
        <figure>
          <img src="../../public/assets//xi.png" alt="" />
        </figure>
        <div>
          <h3>摩天轮<span>票务</span></h3>
        </div>
      </section>
      <section class="input-content">
        <div class="top">
          <input ref="call" type="text" placeholder="请输入手机号" />
        </div>
        <div v-show="false" class="center">
          <input type="text" placeholder="请输入图形码" />
        </div>
        <div class="bottom">
          <input ref="pwd" type="password" placeholder="请输入密码" />
        </div>
        <button @click.stop="login">登录</button>
      </section>
      <section class="bottom-content">
        <div class="left">
          <input ref="isok" type="checkbox" />
        </div>
        <div class="right">
          <p>
            我同意<span>《摩天轮平台交易服务协议》</span>和<span
              >《摩天轮用户信息及隐私保护政策》</span
            >
          </p>
        </div>
      </section>
    </div>
  </Transition>
</template>

<style lang="less" scoped>
.vV-enter-to,
.vV-leave-from {
  position: absolute;
  top: 0vh;
  opacity: 1;
}
.vV-enter-active,
.vV-leave-active {
  transition: all 0.5s;
}

.vV-enter-from,
.vV-leave-to {
  opacity: 0;
  position: absolute;
  top: 100vh;
}

.login {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  div,
  section {
    box-sizing: border-box;
  }
  figure,
  h4,
  h5,
  h3,
  ul,
  input {
    padding: 0;
    margin: 0;
  }
  > .top {
    width: 100%;
    padding: 10rem 22rem;
    display: flex;
    justify-content: end;
    > figure {
      margin: 0;
      padding: 0;
      width: 24rem;
      height: 24rem;
      > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  > .title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50rem;
    margin: 50rem 0;
    > figure {
      width: 42rem;
      height: 42rem;
      border-radius: 10rem;
      background-color: red;
      font-size: 0;
      > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    > div {
      display: flex;
      align-content: center;
      margin: 0 0 0 10rem;
      > h3 {
        font-size: 32rem;
        vertical-align: middle;
        font-family: "微软雅黑";
        > span {
          transform: translateY(-2rem);
          vertical-align: middle;
          font-size: 15rem;
          writing-mode: vertical-lr;
          font-weight: 600;
        }
      }
    }
  }
  > .input-content {
    margin-top: 70rem;
    margin-bottom: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 22rem;
    input {
      width: 100%;
      border: none;
      border-bottom: 1rem solid #e8e8e8;
      display: inline-block;
      padding: 15rem 0;
      color: #999;
      font-size: 16rem;
      &::placeholder {
        color: #ccc;
        font-size: 16rem;
      }
    }
    > .top {
      width: 100%;
    }
    > .bottom {
      width: 100%;
    }

    > button {
      margin-top: 26rem;
      width: 100%;
      font-size: 16rem;
      padding: 12rem 0;
      color: white;
      background-image: linear-gradient(to right, #fe088d, #fe1340);
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 100rem;
    }
  }
  > .bottom-content {
    width: 100%;
    padding: 0 22rem;
    display: flex;

    > .left {
      margin: 2rem 8rem 0 0;
      > input {
        width: 12rem;
        height: 12rem;
      }
    }
    > .right {
      > p {
        margin: 0;
        font-size: 12rem;
        color: #333;
        > span {
          color: #6871d3;
          font-size: 12rem;
        }
      }
    }
  }
}
</style>
