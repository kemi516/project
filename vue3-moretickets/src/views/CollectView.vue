<template>
  <div class="collect">
    <div class="top">
      <div class="tback" @click="$router.back"></div>
      <div class="title">想看的演出</div>
    </div>

    <div v-if="storek.collect?.length == 0" class="nogz">
      <img src="https://m.moretickets.com/_nuxt/img/56f4925.png" alt="" />
      <h6>暂无想看的演出</h6>
      <p>碰到喜欢的节目，记得点击左下角的想看哦</p>
    </div>
    <div class="containerAll" v-else>
      <div
        class="container"
        v-for="item in storek.collect"
        :key="item?.showOID"
        @click.stop="
          $router.push({
            path: '/detail',
            query: { showID: item?.showOID },
          })
        "
      >
        <van-swipe-cell class="kkm-collect">
          <div class="kkm">
            <div class="left-img">
              <van-image
                width="100rem"
                height="133rem"
                fit="cover"
                position="left"
                :src="item?.posterURL"
              />
            </div>
            <div class="right-content">
              <h3>{{ item?.showName }}</h3>
              <div>
                <p>{{ item?.showDate }}</p>
                <p>{{ item?.venueName }}</p>
              </div>
              <p class="show-price" v-if="item?.minPrice">
                <span>{{ item?.minPrice }}</span
                >元起
              </p>
            </div>
            <div class="discount" v-if="item?.discount * 10 < 10">
              <p class="num">{{ (item?.discount * 10).toFixed(1) }}</p>
              <p class="zq">折起</p>
            </div>
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="remove(item)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useKkmStore } from "@/stores/kkms";
const storek = useKkmStore();
const remove = (name) => {
  storek.collect = [
    ...storek.collect.filter((e) => e?.showOID != name?.showOID),
  ];
  localStorage.setItem("collect", JSON.stringify(storek?.collect));
};
</script>
<style lang="less">
.kkm-collect {
  .van-swipe-cell__right {
    margin-right: -1rem;
  }
}
</style>
<style scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}

.kkm {
  display: flex;
}
</style>
<style lang="less" scoped>
.collect {
  width: 100%;
  height: 100%;
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
    margin-top: 28rem;
    padding: 0 20rem;
    margin-bottom: 83px;
    .container {
      display: flex;
      margin-bottom: 33rem;
      position: relative;
      .discount {
        width: 33rem;
        height: 33rem;
        text-align: center;
        position: absolute;
        top: 56rem;
        right: 10rem;
        border-radius: 50%;
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
