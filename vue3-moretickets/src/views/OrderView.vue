<script setup>
import { useKkmStore } from "@/stores/kkms";
import { useCounterStore } from "@/stores/counter";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const storek = useKkmStore();
const store = useCounterStore();
const submit = () => {
  if (localStorage.getItem("token") === "Token_ssh") {
    storek.order.unshift(...storek.order2);
  }
  router.push("/myorder");
};
</script>

<template>
  <div class="order">
    <header>
      <img
        src="../assets/back.png"
        width="18"
        alt=""
        @click="
          $router.back();
          storek.order2 = [];
        "
      />
      <span>确认订单</span>
    </header>
    <div class="show">
      <h6>{{ storek.order2[storek.order2.length - 1]?.title }}</h6>
      <div class="content">
        <p>{{ storek.order2[storek.order2.length - 1]?.date }}</p>
        <p>{{ storek.order2[storek.order2.length - 1]?.address }}</p>
        <div class="piao">
          <div class="left">票品提供：约约票务</div>
          <div class="certi_icon_box">
            <div class="ok_icon">&nbsp;</div>
            <i></i>
            <div class="text">资质认证</div>
          </div>
        </div>
        <div class="prick">
          <div class="left">
            {{ storek.order2[storek.order2.length - 1]?.price }}票面
          </div>
          <div class="num">
            {{ storek.order2[storek.order2.length - 1]?.index }}张
          </div>
        </div>
        <div class="bottom">
          <img
            src="https://m.moretickets.com/_nuxt/img/a8019d6.png"
            alt=""
          />不支持七天无理由退换
          <div class="br">
            <img
              src="https://m.moretickets.com/_nuxt/img/791edc4.png"
              alt=""
            />电子票
          </div>
        </div>
      </div>
    </div>
    <ul class="order-detail">
      <li>
        <p>电子票</p>
        <p
          style="
            color: grey;
            font-weight: normal;
            margin: 0;
            margin-top: 5rem;
            letter-spacing: 0.5rem;
          "
        >
          支付成功后将获得取票凭证，兑换纸质票或扫码入场
        </p>
      </li>
      <li class="msg">
        <span>取票人</span>
        <input type="text" placeholder="请输入姓名" />
      </li>
      <li class="msg">
        <span>电话</span>
        <input type="text" placeholder="请输入电话" />
      </li>
      <li>
        <p
          style="
            color: grey;
            font-weight: normal;
            margin: 0;
            letter-spacing: 1rem;
          "
        >
          取票说明:支付成功后,请凭电子票短信中的提示入场（实际入场方式以现场为准)。客服热线
          <span
            style="
              color: #5758dc;
              text-decoration: underline;
              letter-spacing: 0;
            "
            >4006962266</span
          >
        </p>
      </li>
      <li class="discount">
        <div class="one">
          <span>优惠卷</span>
          <p>
            没有可用的优惠卷
            <van-icon name="arrow" />
          </p>
        </div>
        <div class="two">
          <span>魔力值</span>
          <p>当前没有可用魔力值</p>
        </div>
      </li>
      <li>
        <p class="protect">
          <span
            >号码保护
            <img src="../assets/wenhao.png" width="14" alt="" />
          </span>
          <input type="checkbox" value="" />
        </p>
        <p class="read">
          我已阅读并同意
          <span>《摩天轮平台交易服务协议》</span>
        </p>
        <p class="notice">购票须知：电子票不支持退换货<span>退赔规则</span></p>
      </li>
    </ul>
    <div style="height: 50rem"></div>
    <div class="submit">
      <div class="total">
        <p>
          合计：<span>{{ storek.order2[storek.order2.length - 1]?.total }}</span
          >元
        </p>
        <p>{{ storek.order2[storek.order2.length - 1]?.price }}元/张</p>
      </div>
      <button @click="submit()">提交订单</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.order {
  background: #7b75e3;
  height: 100%;
  font-size: 12rem;

  header {
    text-align: center;
    font-size: 16rem;
    padding: 10rem 15rem;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      position: absolute;
      left: 25rem;
    }
  }

  .show {
    padding: 15rem;
    padding-bottom: 1rem;
    box-sizing: border-box;
    // height: 230rem;
    background: white;
    width: 95%;
    margin: 10rem auto 15rem;
    border-radius: 10rem;

    .piao {
      margin-top: 4rem;
      display: flex;
      color: gray;
      align-items: center;
    }

    h6 {
      margin: 0;
      width: 95%;
      padding-bottom: 10rem;
      border-bottom: 1rem dashed rgba(128, 128, 128, 0.33);
      font-size: 13rem;
    }

    p {
      margin: 0;
      margin-top: 4rem;
      color: gray;
    }

    .certi_icon_box {
      display: inline-block;
      vertical-align: middle;
      border: 1rem solid #8582e4;
      font-size: 12rem;
      text-align: center;
      overflow: hidden;
      color: #8582e4;
      position: relative;
      height: 12rem;
      line-height: 12rem;
      margin-left: 6rem;

      .ok_icon {
        width: 13rem;
        height: 12rem;
        text-align: center;
        background: #8582e4;
        display: inline-block;
        position: absolute;
        left: -1rem;
        top: 0;
      }

      i {
        font-style: normal;
        position: absolute;
        left: 7rem;
        top: 2rem;
        width: 2rem;
        height: 7rem;
        -webkit-transform-origin: 50% 0;
        transform-origin: 50% 0;
        border-right: 1rem solid #fff;
        border-bottom: 1rem solid #fff;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
      }

      .text {
        padding-right: 2rem;
        padding-left: 2rem;
        border-left: 1rem solid #8582e4;
        margin-left: 12rem;
      }
    }

    .prick {
      display: flex;
      justify-content: space-between;
      margin-top: 4rem;
      padding-bottom: 10rem;
      border-bottom: 1rem solid rgba(128, 128, 128, 0.16);
    }

    .bottom {
      margin: 16rem 0;
      display: flex;
      align-items: center;

      .br {
        margin-left: 10rem;
      }

      img {
        vertical-align: middle;
        width: 10rem;
        margin-right: 3rem;
      }
    }
  }

  ul.order-detail {
    background: white;
    padding: 0 22rem;
    border-top-left-radius: 10rem;
    border-top-right-radius: 10rem;

    li {
      padding: 15rem 0;
      border-bottom: 1rem solid rgba(235, 235, 235, 0.597);
      font-weight: 600;

      &.msg {
        display: flex;
        align-items: center;
        font-weight: normal;

        input {
          border: none;
          position: absolute;
          right: 135rem;
          padding: 10rem 0;
        }
      }

      &.discount {
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: normal;
          color: gray;

          &:nth-child(1) {
            margin-bottom: 10rem;
          }

          span {
            font-weight: 600;
            color: black;
          }
        }
      }

      p {
        margin: 0;

        &.read {
          background: #f8f8f8;
          padding: 10rem;
          font-weight: normal;
          margin-top: 10rem;
          color: gray;
          letter-spacing: 0.5rem;

          span {
            color: #5758dc;
          }
        }

        &.protect {
          display: flex;
          justify-content: space-between;

          img {
            vertical-align: -2rem;
          }

          input {
            appearance: none;
            width: 16rem;
            height: 16rem;
            margin: 0 4rem 0 0;
            appearance: none;
            position: relative;
            border-radius: 50%;
            border: 1rem solid rgb(171, 171, 171);

            &:checked {
              border: none;

              &::before {
                content: "\2713";
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                width: 100%;
                height: 100%;
                border: none;
                text-align: center;
                color: white;
                border-radius: 50%;
                background: #41af68;
              }
            }
          }
        }

        &.notice {
          font-weight: normal;
          color: gray;
          margin-top: 15rem;
          letter-spacing: 0.5rem;

          span {
            color: black;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .submit {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: white;
    border-top: 1rem solid rgba(235, 235, 235, 0.597);
    height: 50rem;
    display: flex;
    align-items: center;
    padding-left: 45%;

    .total {
      p {
        margin: 0;
        text-align: right;

        &:nth-child(2) {
          color: grey;
        }
      }

      span {
        font-weight: 600;
        font-size: 16rem;
      }
    }

    button {
      height: 35rem;
      padding: 5rem 20rem;
      border-radius: 30rem;
      border: 0;
      margin-left: 20rem;
      background: linear-gradient(289deg, #ff1d41, #ee0e87);
      color: white;
      font-size: 14rem;
    }
  }
}
</style>
