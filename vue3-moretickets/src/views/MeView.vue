<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const navList = ref([
  {
    id: 0,
    name: "想看的演出",
  },
  {
    id: 1,
    name: "关注的艺人",
  },
  {
    id: 2,
    name: "我的优惠券",
  },
  {
    id: 3,
    name: "我的评论",
  },
  {
    id: 4,
    name: "我的转票",
  },
  {
    id: 5,
    name: "地址管理",
  },
  {
    id: 6,
    name: "常见问题",
  },
  {
    id: 7,
    name: "联系客服",
  },
  {
    id: 8,
    name: "卖家招募",
  },
]);
const username = ref(localStorage.getItem("username"));
const login = () => {
  router.push({ path: "/login", query: { to: "/me" } });
};

// key值更换
import { detaillStore } from "../stores/detaill.ts";
const storeD = detaillStore();
</script>

<template>
  <div class="me">
    <section class="top">
      <div class="img-box">
        <img @click="$router.push('/logout')" src="../../public/assets//me_set.png" alt="" />
        <img src="../../public/assets//me_news.png" alt="" />
      </div>
    </section>
    <section class="user">
      <figure style="background-image: url('../../public/assets//1C.png')"></figure>
      <div class="right">
        <p v-if="username">{{ username }}</p>
        <p v-else @click.stop="login">点击登录</p>
        <div v-if="username" class="center">
          <span>完善消息</span> 获取100魔力值
        </div>
        <div v-else class="center"><span>无需注册，快捷登录</span></div>
        <div class="bottom">
          <figure
            class="start"
            style="background-image: url('../../public/assets//hI.png')"
          ></figure>
          <span>0</span>
          <figure>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAAXNSR0IArs4c6QAAA05JREFUOBGtVE1IFVEUvufeef48lVyEWEi4EYSIFmbSy0WlZGgQZC8CoSh/KkWtaFG5eVBtpMBdSeAioUWWZH8uSqJUCHFVkGAEEpW1qqAfnvPe3L5zZ97o+BQzOsPMuXPuOd/5zjl3hsQSEi1/VCh+O9OKKI9ICIkHayXJX7NNeu9Kyk5rCRwh47oRfnlSCoF4FwBBvIYCgHQ1nJSil2vXr7sO16DEYhqJqAlZACCFpRAELwUACw9jA5php+hzOJxdHxvYOJfG6O3QcA38i93MLgsOQnJTlimHmUlpA/RA95PKT0wlDUgJcYIQmAogIPAa/XLBeM8AUWfP6K5xBmHhsn1pqnhclEjSDGmU7rHgUtgJry44A0rR1/OiutEPxCLAyEmiN9xb1MZMfBYeKwNGNFGcs6F1IQiv/WbfjmpO3sgPc3vBzAyTMYygv2Rb2fs7hkvii4F8RiPvn+5VJIsQHywDEcyMm0uKopdHIh8Xg/C7D0Skj6Mgd6zcH2xyk1mbUZN+ZZHQXdVjlSEvkoMpnPWua3DLrAE6teNZsR23a0zgQkaAmbdRGfo2SpQUmpPgcuCr4nPc9D4DZNvJZoyJe+lOhjWX4/XJt2NhhgBPdka53RceRvrgLmRvy2QI1I/xhmksFtzc1DpgxyAs3nfvm+cfRM4xCIs1NfVtH5pZ6DPwsjI/BmE7TxFqvl9SDFeUbW8EO67SCD4lOsJ0vdNqAjmIszKI2WNAH1hNyPxwdGeMEikQ1lZejmyOJ0S+EJm4XCGVLNGOvm8YIYPEUebkllLTFA7Vne3f/NNz9RVypcul2vEzWjtXXRapxtKsRRQ5fW/bTHoEki02avxGiJw201AumctS8nvIknuWA2EMfFpBycyrqUMhLhCmZ0kZzyBV1zlYMRH0DL75JztlVqQ7uNnueZEOBtbQcXfr89T+cjrQoyv1k6Xatt/wtL2xtwLk2nLBC+1BRkm7XSlzZPgXe7H9zt+BMKDPqDc6ueZX0v6Ak5OLA3gDIC0LM6609hnFk4mjqAggNFRA5SdXCly8b8avtSb8Fdtw4MZycgsOHRzAJ75KMeMvnKqtQZVV+aGs3Yf7S3+sEsO4m9IyZOi1Q6Gqhlubvv4LyH+N+QP/VasVHoY4EwAAAABJRU5ErkJggg=="
              alt=""
            />
          </figure>
        </div>
      </div>
    </section>
    <section class="member">
      <div class="content">
        <div class="left">
          <figure>
            <img src="../../public/assets//CT.png" alt="" />
          </figure>
          <span>会员中心</span>
        </div>
        <div class="right">
          <span>八大权益</span>
          <figure>
            <img src="../../public/assets//_d.png" alt="" />
          </figure>
        </div>
      </div>
    </section>
    <section class="order">
      <div class="left">
        <figure>
          <img src="../../public/assets//z4.png" alt="" />
        </figure>
        <h4 @click.stop="$router.push('/myorder')">我的订单</h4>
      </div>
      <div class="right">
        <figure>
          <img src="../../public/assets//Y8.png" alt="" />
        </figure>
        <h4>我的抢票单</h4>
      </div>
    </section>
    <section class="list">
      <ul>
        <li
          v-for="n in navList"
          :key="n.id"
          @click="
            n.id == 1
              ? $router.push('/attention')
              : n.id == 0
              ? $router.push('/collect')
              : ''
          "
        >
          <p>{{ n.name }}</p>
          <div class="arrows">
            <span v-if="n.id === 5">你还没有添加地址！</span>
            <figure>
              <img src="../../public/assets//4I.png" alt="" />
            </figure>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="less">
.me {
  box-sizing: border-box;

  div,
  figure,
  section,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h5,
  p,
  ul {
    box-sizing: border-box;
    list-style: none;
    padding: 0;
    margin: 0;
    text-decoration: none;
  }
}
</style>
<style lang="less" scoped>
.me {
  width: 100vw;
  height: 100vh;
  padding-bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f6f6f6;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  > .top {
    width: 100%;
    text-align: right;
    padding: 5rem 10rem 15rem 0;
    position: fixed;
    background-color: #f6f6f6;
    z-index: 1;

    > .img-box {
      font-size: 0;

      > img {
        margin: 0 10rem;
        width: 26rem;
        height: 26rem;
      }
    }
  }

  > .user {
    width: 100%;
    padding: 46rem 22rem 0 22rem;
    display: flex;
    justify-content: start;
    align-items: center;

    > figure {
      flex-shrink: 0;
      width: 100rem;
      height: 100rem;
      margin: 0 25rem 0 0;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 50%;
    }

    > .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100rem;

      > p {
        font-size: 23rem;
        flex-shrink: 0;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      }

      > .center {
        width: 100%;
        color: #7a40c8;
        font-size: 12rem;
        margin: 4rem 0;
        transform-origin: left;
        transform: scale(0.9);

        > span {
          font-size: 12rem;
          color: #ccc;
        }
      }

      > .bottom {
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        margin-top: 10rem;

        > figure {
          &.start {
            width: 66rem;
            height: 30rem;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            transform: none;
          }

          > img {
            width: 10rem;
            height: 16rem;
            transform: translateY(2rem);
          }
        }

        > span {
          display: inline-block;
          margin: 0 10rem;
          color: #6f3cbc;
          font-size: 16rem;
        }
      }
    }
  }

  > .member {
    width: 100%;
    padding: 0 22rem;
    margin-top: 38rem;

    > .content {
      display: flex;
      width: 100%;
      background-image: linear-gradient(to right, #dbc089, #dfb374);
      border-radius: 8rem 8rem 0 0;
      justify-content: space-between;
      align-items: center;
      padding: 12rem 12rem;
      color: #5c3c16;

      > .left {
        display: flex;
        align-items: center;
        letter-spacing: 1rem;

        > span {
          font-size: 12rem;
        }

        > figure {
          margin: 0 3rem;

          > img {
            display: block;
            width: 20rem;
            height: 20rem;
          }
        }
      }

      > .right {
        display: flex;
        align-items: center;

        > figure {
          > img {
            display: block;
            transform: rotate(180deg);
            width: 20rem;
            height: 20rem;
          }
        }

        > span {
          font-size: 12rem;
        }
      }
    }
  }

  > .order {
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rem 22rem 15rem 22rem;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48.5%;
      box-shadow: 0 2rem 12rem 1rem #ececec;
      padding: 27.5rem 0;
      border-radius: 3rem;

      > figure {
        width: 26rem;
        height: 26rem;
        margin: 0 2rem 0 0rem;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      > h4 {
        font-size: 14rem;
        letter-spacing: 1rem;
        font-weight: 500;
      }
    }
  }

  > .list {
    width: 100%;
    background-color: white;
    padding: 0 22rem;
    margin-top: 6rem;
    margin-bottom: 12rem;

    > ul {
      > li {
        width: 100%;
        display: flex;
        border-bottom: 1rem solid #eaeaea;
        justify-content: space-between;
        align-items: center;
        padding: 16.4rem 0;

        &:last-child {
          border-bottom: none;
        }

        > p {
          font-size: 16rem;
          color: #090909;
        }

        > .arrows {
          display: flex;

          > span {
            color: #ccc;
            font-size: 14rem;
          }

          > figure {
            width: 20rem;
            height: 20rem;
            display: flex;
            justify-content: center;
            align-items: center;

            > img {
              width: 40%;
              height: 40%;
              object-fit: contain;
              opacity: 0.5;
            }
          }
        }
      }
    }
  }
}
</style>
