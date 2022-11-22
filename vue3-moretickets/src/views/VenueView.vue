<script setup>
import { ref } from "vue";
import { getVenue, getVenueShows } from "@/apis/index";
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from "../stores/counter";
const store = useCounterStore();
const router = useRouter();
const route = useRoute();

// 请求艺人数据
const venue = ref(null);
getVenue(router.currentRoute.value.query.id).then((res) => {
  venue.value = res.data.result.data;
});

// 请求近期演出
const venueshows = ref(null);
getVenueShows(router.currentRoute.value.query.id).then((res) => {
  venueshows.value = res.data.result.data;
});
</script>

<template>
  <div class="venue" v-if="venue">
    <div class="bg" :style="`background-image:url('${venue.iconURL}')`"></div>

    <header>
      <div class="top">
        <van-icon
          name="arrow-left"
          color="#eee"
          size="25"
          @click="$router.back()"
        />
      </div>
      <div class="title">
        <span>{{ venue.venueName }}</span>
      </div>
    </header>

    <div class="venueAddress">
      <span>
        <img src="../assets/address.png" alt="" />
        {{ venue.address }}</span
      >
      <van-icon name="arrow" />
    </div>
    <van-divider />

    <ul class="shows">
      <p>近期演出</p>
      <li
        v-for="show in venueshows"
        :key="show.showId"
        @click.stop="
          $router.push({ path: '/detail', query: { showID: show.showOID } })
        "
      >
        <div class="show" v-if="venueshows.length > 0">
          <img :src="show.posterURL" alt="" />
          <div
            class="discount"
            v-if="show.discount != 0 && show.discount.toString()[0] == 0"
          >
            <span>{{ (show.discount * 10).toFixed(1) }}</span>
            <span>折起</span>
          </div>
          <div class="search-res">
            <span>{{ show.showName }}</span>
            <p class="showdate">
              {{ show.showDate }}
            </p>
            <p class="venue">{{ show.venueName }}</p>
            <p class="sale">
              <span
                v-if="show.showStatus.name == 'Onsale'"
                style="
                  color: #ff1d41;
                  border: 1rem solid rgba(255, 29, 65, 0.3);
                "
                >售票中</span
              >
              <span
                v-if="show.showStatus.name == 'Pending'"
                style="
                  color: #16c27a;
                  border: 1rem solid rgba(22, 194, 122, 0.3);
                "
                >未开售</span
              >
              <span
                v-if="show.supportSeatPicking"
                style="
                  color: #576bff;
                  border: 1rem solid rgba(87, 107, 255, 0.3);
                "
                >可选座</span
              >
              <!-- <span
              v-if="show.isPermanent"
              style="color: #68676c; border: 1rem solid #eaeaeb"
              >暂时缺票</span
            > -->
            </p>
            <p class="price" v-if="show.minPrice > 0">
              <span>{{ show.minPrice }}</span>
              元起
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.venue {
  font-size: 12rem;
  .bg {
    position: absolute;
    width: 100%;
    height: 250rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    z-index: -1;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      background: rgba(20, 20, 20, 0.3);
      width: 100%;
      height: 100%;
    }
  }

  header {
    position: relative;
    height: 250rem;
    padding-top: 15rem;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15rem 0 10rem;
    }
    .title {
      position: absolute;
      bottom: 30rem;
      padding: 0 15rem;
      box-sizing: border-box;
      color: white;
      font-size: 19rem;
      font-weight: 500;
    }
  }

  .venueAddress {
    padding: 0 15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14rem;
    img {
      width: 12rem;
      vertical-align: top;
      margin-right: 5rem;
    }
  }
  ul.shows {
    padding: 0 15rem;
    > p {
      font-weight: 600;
      font-size: 16rem;
    }

    li {
      margin-bottom: 25rem;
      position: relative;
      .show {
        display: flex;
        align-items: flex-start;

        .discount {
          background: linear-gradient(315deg, #ff1d41, #ee0e87);
          position: absolute;
          right: 0;
          top: 60rem;
          color: white;
          border-radius: 50%;
          width: 40rem;
          height: 40rem;
          text-align: center;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 2px 8px 0 rgb(250 24 88 / 50%);
          span {
            font-weight: bold;
            margin: 0;
            font-size: 14rem;
            &:nth-child(2) {
              font-size: 12rem;
              font-weight: normal;
            }
          }
        }
        img {
          margin-right: 15rem;
          object-fit: cover;
          flex-shrink: 0;
          width: 90rem;
          height: 120rem;
        }
        .search-res {
          > span {
            font-weight: 500;
            font-size: 15rem;
            display: block;
            margin-bottom: 13rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          p {
            margin: 0;
            color: rgb(0, 0, 0);

            &.showdate {
              margin-bottom: 2rem;
              font-size: 13rem;
            }

            &.venue {
              font-size: 13rem;
            }
            &.sale {
              margin: 15rem 0 15rem;

              span {
                margin-right: 8rem;
                padding: 2rem 3rem;
                border-radius: 2rem;
              }
            }

            &.price {
              color: #ff1d41;
              span {
                font-weight: bold;
                font-size: 18rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
