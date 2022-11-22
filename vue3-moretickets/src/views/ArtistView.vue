<script setup>
import { ref } from "vue";
import { getArtist, getArtistShows } from "@/apis/index";
import { useRoute, useRouter } from "vue-router";
import { useCounterStore } from "../stores/counter";
import { useKkmStore } from "@/stores/kkms";
const storek = useKkmStore();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const store = useCounterStore();
const router = useRouter();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const route = useRoute();

// 请求艺人数据
const artist = ref(null);
const more = ref(false);
getArtist(router.currentRoute.value.query.id).then((res) => {
  artist.value = res.data.result.data;
});

// 请求近期演出
const shows = ref(null);
getArtistShows(router.currentRoute.value.query.id).then((res) => {
  shows.value = res.data.result.data;
});
// 关注
const addAttention = (show) => {
  if (window.localStorage.getItem("token") == "Token_ssh") {
    storek.attention.push(show);
    storek.attention = [...storek.attention];
    localStorage.setItem("attention", JSON.stringify([...storek.attention]));
  } else {
    router.push("/login");
  }
};
const removeAttention = (show) => {
  let arr = JSON.parse(localStorage.getItem("attention")).filter(
    (e) => e.artistName != show
  );
  storek.attention = [...arr];
  localStorage.setItem("attention", JSON.stringify(arr));
};

import { useShareStore } from "../stores/share.ts";
const storeS = useShareStore();
</script>

<template>
  <div class="artist" v-if="artist">
    <div
      class="bg"
      :style="`background-image:url('${artist?.artistBackgroudUrl}@!400w')`"
    ></div>

    <header>
      <div class="top">
        <van-icon
          name="arrow-left"
          color="#eee"
          size="25"
          @click="$router.back()"
        />
        <img
          @click.stop="storeS.showShare = true"
          src="../assets/share.png"
          alt=""
          width="20"
        />
      </div>
      <div class="title">
        <span>{{ artist.artistName }}</span>

        <span
          class="follow"
          @click.stop="
            addAttention({
              artistName: artist.artistName,
              artistSummarize: artist.artistSummarize,
              artistIcon: artist.artistIcon,
              id: artist?.artistOID,
            })
          "
          v-if="
            !storek.attention
              .map((e) => e.artistName)
              .includes(artist.artistName)
          "
        >
          + 关注
        </span>
        <span
          class="active"
          @click.stop="removeAttention(artist.artistName)"
          v-else
          >已关注</span
        >
      </div>
    </header>

    <div class="artist-details">
      <div class="info">
        <p class="title">艺人简介</p>
        <p class="text" :class="{ more: more }" @click="more = true">
          {{ artist.artistIntroduce }}
        </p>
        <van-divider />
      </div>
      <ul class="shows">
        <p>近期演出</p>
        <li
          v-for="show in shows"
          :key="show.showId"
          @click="
            $router.push({ path: '/detail', query: { showID: show.showOID } })
          "
        >
          <div class="show" v-if="shows?.length > 0">
            <img :src="show.posterURL+'@!100w'" width="90" height="120" alt="" />
            <div
              class="discount"
              v-if="show.discount != 0 && show?.discount.toString()[0] == 0"
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
        <div v-if="shows?.length == 0" class="none">
          <img src="../assets/d3659d9.png" width="100" alt="" />
          <p>最近无演出</p>
          <p>关注获得艺人演出信息</p>
        </div>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.artist {
  overflow: hidden;
  font-size: 12rem;

  .bg {
    position: absolute;
    width: 100%;
    height: 300rem;
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
    height: 280rem;
    padding-top: 15rem;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15rem 0 10rem;
    }

    .title {
      position: absolute;
      bottom: 40rem;
      padding: 0 15rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      font-size: 19rem;
      font-weight: 600;
      width: 100%;

      span {
        display: block;

        &.follow {
          font-size: 12rem;
          background: #ededed;
          padding: 4rem 12rem;
          border-radius: 30rem;
          color: black;
          font-weight: normal;
        }

        &.active {
          padding: 4rem 12rem;
          font-size: 12rem;
          border-radius: 30rem;
          background-color: #95949da9;
          outline: 1rem solid white;
        }
      }
    }
  }

  .artist-details {
    background: white;
    position: absolute;
    top: 275rem;
    border-top-left-radius: 15rem;
    border-top-right-radius: 15rem;
    padding: 15rem;
    box-sizing: border-box;

    .info {
      white-space: pre-wrap;

      p {
        line-height: 20rem;
        font-size: 13rem;
        margin: 0;

        &.title {
          display: block;
          color: rgb(138, 137, 137);
          margin-bottom: 8rem;
        }

        &.text {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          text-overflow: ellipsis;
          overflow: hidden;

          &.more {
            display: block;
          }
        }
      }
    }

    ul.shows {
      > p {
        font-weight: 600;
        font-size: 13rem;
      }

      .none {
        margin: 40rem 0;

        img {
          margin-bottom: 10rem;
        }

        p {
          margin: 0;
          margin-top: 3rem;
        }

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #95949d;
        font-size: 13rem;
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
            top: 50rem;
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
              margin-bottom: 15rem;
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
}
</style>
