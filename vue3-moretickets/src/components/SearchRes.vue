<script setup>
import { useKkmStore } from "@/stores/kkms";
const storek = useKkmStore();
const props = defineProps({
  searchResList: Array,
  keyword: String,
});
import { useRouter } from "vue-router";
const router = useRouter();
//关注
const addAttention = (show) => {
  if (localStorage.getItem("token") == "Token_ssh") {
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
</script>

<template>
  <div class="searchreslist">
    <ul>
      <li
        v-for="show in searchResList"
        :key="show.showId"
        @click.stop="
          $router.push({ path: '/detail', query: { showID: show.showId } })
        "
      >
        <div class="show" v-if="show.searchType == 'SHOW'">
          <img
            :src="show.posterURL + '@!100w'"
            width="90"
            height="120"
            alt=""
          />
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
                v-if="show.showStatusEnum == 'ONSALE'"
                style="
                  color: #ff1d41;
                  border: 1rem solid rgba(255, 29, 65, 0.3);
                "
                >售票中</span
              >
              <span
                v-if="show.showStatusEnum == 'PENDING'"
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

        <div
          class="artist"
          v-if="show.searchType == 'ARTIST'"
          @click.stop="
            $router.push({ path: '/artist', query: { id: show.artistId } })
          "
        >
          <img :src="show.artistIcon" alt="" />
          <p>
            <span>{{ show.artistName }}</span>
            <span v-if="show.showCount > 0"
              >{{ show.showCount }}场在售演出</span
            >
          </p>
          <button
            @click.stop="
              addAttention({
                artistName: show.artistName,
                artistSummarize: show.artistSummarize,
                artistIcon: show.artistIcon,
                id: show.artistId,
              })
            "
            v-if="
              !storek.attention
                .map((e) => e.artistName)
                .includes(show.artistName)
            "
          >
            + 关注
          </button>
          <button
            class="active"
            @click.stop="removeAttention(show.artistName)"
            v-else
          >
            已关注
          </button>
        </div>
      </li>
    </ul>
    <van-divider v-if="searchResList.length > 0" />
    <p v-if="searchResList.length > 0">
      "{{ props.keyword }}" 的演出都在这里啦
    </p>
    <p v-if="props.searchResList.length == 0">
      暂时没有 "{{ props.keyword }}" 的演出
    </p>
    <div style="height: 10rem"></div>
  </div>
</template>

<style lang="less" scoped>
.searchreslist {
  > p {
    text-align: center;
    font-size: 14rem;
  }

  ul {
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
        }

        .search-res {
          > span {
            font-weight: 500;
            font-size: 15rem;
            display: block;
            margin-bottom: 15rem;
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

      .artist {
        display: flex;
        align-items: center;
        margin-bottom: 35rem;

        img {
          width: 85rem;
          height: 85rem;
          border-radius: 50%;
        }

        p {
          display: flex;
          flex-direction: column;
          margin-left: 22rem;

          span {
            font-size: 16rem;

            &:nth-child(2) {
              color: gray;
              font-size: 13rem;
              margin-top: 5rem;
            }
          }
        }

        button {
          background: none;
          border: 1rem solid #ff1d41;
          border-radius: 30rem;
          padding: 4rem 15rem;
          position: absolute;
          right: 0;
          color: #ff1d41;
          font-size: 14rem;

          &.active {
            background-color: gainsboro;
            border: 0;
            color: white;
          }
        }
      }
    }
  }
}
</style>
