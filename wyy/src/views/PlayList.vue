<template>
  <div class="play">
    <div
      class="icons"
      @click="
        $router.push({
          path: '/',
        })
      "
    >
      <i data-v-19e4916c="" data-v-9f973e4c="" class="fa fa-reply"></i>
    </div>
    <div v-if="shows">
      <div class="ps">
        <div class="top" :style="bgi"></div>
        <div class="xx">
          <div class="imgs">
            <div class="iimg">
              <div class="icon">
                {{
                  HotSong.playCount > 100000000
                    ? (HotSong.playCount / 100000000).toFixed(1) + "亿"
                    : (HotSong.playCount / 10000).toFixed(1) + "万"
                }}
              </div>
              <div class="sons">歌单</div>
              <img
                :src="`${HotSong?.coverImgUrl}?imageView=1&type=webp&thumbnail=126x0`"
                alt=""
              />
            </div>
          </div>
          <div class="text">
            {{ HotSong.name }}
            <div class="users">
              <img
                :src="`${HotSong?.creator?.avatarUrl}?imageView=1&type=webp&thumbnail=126x0`"
                alt=""
              />
              {{ HotSong?.creator?.nickname }}
            </div>
          </div>
        </div>
      </div>
      <div class="list" v-show="HotSong">歌曲列表</div>

      <div
        HotSong
        class="content"
        v-for="(item, index) in HotSong.tracks"
        :key="item.id"
        @click="$emit('song-ids', item, HotSong.tracks)"
      >
        <div class="left">
          {{ String(index + 1).padStart(2, 0) }}
        </div>
        <div class="right">
          <div>
            <p>{{ item.name }}</p>
            <span class="contents">
              <span class="icon" v-if="item.sq"> </span>
              {{ item.ar[0].name }}
              <span>-</span>
              {{ item.al.name }}
            </span>
          </div>
          <div class="pp">
            <div class="play" v-if="item.id !== song.id"></div>
            <div class="play active" :class="{ palybt: !palybt }" v-else>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loding" v-else></div>
    <!-- <div v-else>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="margin: auto; background: #fff; display: block"
        width="200rem"
        height="200rem"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle cx="75" cy="50" fill="#dcfff8" r="5">
          <animate
            attributeName="r"
            values="3;3;5;3;3"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.9166666666666666s"
          ></animate>
          <animate
            attributeName="fill"
            values="#dcfff8;#dcfff8;#00e2ff;#dcfff8;#dcfff8"
            repeatCount="indefinite"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            begin="-0.9166666666666666s"
          ></animate>
        </circle>
        <circle cx="71.65063509461098" cy="62.5" fill="#dcfff8" r="5">
          <animate
            attributeName="r"
            values="3;3;5;3;3"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.8333333333333334s"
          ></animate>
          <animate
            attributeName="fill"
            values="#dcfff8;#dcfff8;#00e2ff;#dcfff8;#dcfff8"
            repeatCount="indefinite"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            begin="-0.8333333333333334s"
          ></animate>
        </circle>
        <circle cx="62.5" cy="71.65063509461096" fill="#dcfff8" r="5">
          <animate
            attributeName="r"
            values="3;3;5;3;3"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.75s"
          ></animate>
          <animate
            attributeName="fill"
            values="#dcfff8;#dcfff8;#00e2ff;#dcfff8;#dcfff8"
            repeatCount="indefinite"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            begin="-0.75s"
          ></animate>
        </circle>
        <circle cx="50" cy="75" fill="#dcfff8" r="5">
          <animate
            attributeName="r"
            values="3;3;5;3;3"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.6666666666666666s"
          ></animate>
          <animate
            attributeName="fill"
            values="#dcfff8;#dcfff8;#00e2ff;#dcfff8;#dcfff8"
            repeatCount="indefinite"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            begin="-0.6666666666666666s"
          ></animate>
        </circle>
        <circle
          cx="37.50000000000001"
          cy="71.65063509461098"
          fill="#dcfff8"
          r="5"
        >
          <animate
            attributeName="r"
            values="3;3;5;3;3"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.5833333333333334s"
          ></animate>
          <animate
            attributeName="fill"
            values="#dcfff8;#dcfff8;#00e2ff;#dcfff8;#dcfff8"
            repeatCount="indefinite"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            begin="-0.5833333333333334s"
          ></animate>
        </circle>
        <circle cx="28.34936490538903" cy="62.5" fill="#dcfff8" r="5">
          <animate
            attributeName="r"
            values="3;3;5;3;3"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.5s"
          ></animate>
          <animate
            attributeName="fill"
            values="#dcfff8;#dcfff8;#00e2ff;#dcfff8;#dcfff8"
            repeatCount="indefinite"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            begin="-0.5s"
          ></animate>
        </circle>
        <circle cx="25" cy="50" fill="#dcfff8" r="5">
          <animate
            attributeName="r"
            values="3;3;5;3;3"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.4166666666666667s"
          ></animate>
          <animate
            attributeName="fill"
            values="#dcfff8;#dcfff8;#00e2ff;#dcfff8;#dcfff8"
            repeatCount="indefinite"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            begin="-0.4166666666666667s"
          ></animate>
        </circle>
        <circle
          cx="28.34936490538903"
          cy="37.50000000000001"
          fill="#dcfff8"
          r="5"
        >
          <animate
            attributeName="r"
            values="3;3;5;3;3"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.3333333333333333s"
          ></animate>
          <animate
            attributeName="fill"
            values="#dcfff8;#dcfff8;#00e2ff;#dcfff8;#dcfff8"
            repeatCount="indefinite"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            begin="-0.3333333333333333s"
          ></animate>
        </circle>
        <circle
          cx="37.499999999999986"
          cy="28.349364905389038"
          fill="#dcfff8"
          r="5"
        >
          <animate
            attributeName="r"
            values="3;3;5;3;3"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.25s"
          ></animate>
          <animate
            attributeName="fill"
            values="#dcfff8;#dcfff8;#00e2ff;#dcfff8;#dcfff8"
            repeatCount="indefinite"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            begin="-0.25s"
          ></animate>
        </circle>
        <circle cx="49.99999999999999" cy="25" fill="#dcfff8" r="5">
          <animate
            attributeName="r"
            values="3;3;5;3;3"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.16666666666666666s"
          ></animate>
          <animate
            attributeName="fill"
            values="#dcfff8;#dcfff8;#00e2ff;#dcfff8;#dcfff8"
            repeatCount="indefinite"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            begin="-0.16666666666666666s"
          ></animate>
        </circle>
        <circle cx="62.5" cy="28.349364905389034" fill="#dcfff8" r="5">
          <animate
            attributeName="r"
            values="3;3;5;3;3"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="-0.08333333333333333s"
          ></animate>
          <animate
            attributeName="fill"
            values="#dcfff8;#dcfff8;#00e2ff;#dcfff8;#dcfff8"
            repeatCount="indefinite"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            begin="-0.08333333333333333s"
          ></animate>
        </circle>
        <circle
          cx="71.65063509461096"
          cy="37.499999999999986"
          fill="#dcfff8"
          r="5"
        >
          <animate
            attributeName="r"
            values="3;3;5;3;3"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0s"
          ></animate>
          <animate
            attributeName="fill"
            values="#dcfff8;#dcfff8;#00e2ff;#dcfff8;#dcfff8"
            repeatCount="indefinite"
            times="0;0.1;0.2;0.3;1"
            dur="1s"
            begin="0s"
          ></animate>
        </circle>
      </svg>
    </div> -->
  </div>
</template>
<script>
// @ is an alias to /src
// import HotList from "@/components/HotList.vue";

export default {
  name: "PlayList",
  props: {
    palybt: Boolean,
    song: Object,
  },
  components: {
    // HotList,
  },
  data() {
    return {
      HotSong: [],
      bgi: "",
      shows: true,
    };
  },
  methods: {
    changes(id) {
      this.shows = false;
      this.axios
        .get("https://apis.netstart.cn/music/playlist/detail", {
          params: { id, limit: 20 },
        })
        .then((res) => {
          this.shows = true;
          // console.log(res.data);
          this.HotSong = res.data.playlist;
          this.bgi = {
            backgroundImage: `url(${this.HotSong?.coverImgUrl})`,
            transform: "scale(1.5)",
            // filter: " blur(10rem)",
            // backgroundPosi,
          };
          // this.bgi = this.HotSong.coverImgUrl;
        });
    },
  },
  created() {
    this.changes(this.$route.query.id);

    // console.log(this.$route.meta);
  },
};
</script>
<style lang="less" scoped>
@keyframes log {
  from {
    transform: rotateX(6deg);
  }

  to {
    transform: rotateX(60deg);
  }
}
.play {
  .loding {
    background-image: url("data:image/gif;base64,R0lGODlhKAAoAIABANM6Mf///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI2QURFODRFRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI2QURFODRGRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjZBREU4NENGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjZBREU4NERGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJCgABACwAAAAAKAAoAAACeIyPqcvtD6OctNoD8rUZ7Np9VChKZAmdqKOuTOsqcIzMtGHfuaxxfbRrBGu/UfExXCRxxwRsGdg9m0IqpgmVYq1KbnTrMXmnYeAYzCtf1em2E11lf+VkFpxIP+f37td93dfF9zboVwhIaHfItJjoiBd4IzlJWalQAAAh+QQJCgABACwAAAAAKAAoAAACfIyPqcvtD6OctNqLs94WeB55AAiJ5GOeTaoubJu8nBzQGm0zuYF/0l7zIYAxocvIQzqAvVHROVRGoYemgqm0PpfZLjX53YqnV2nVWw5j1ejxkQ1Pc+Nu8FxeD4bJea2uzRf4hidotwJ4RvenmEg42IfoaFioB2N5iZmZUAAAIfkECQoAAQAsAAAAACgAKAAAAn+Mj6nL7Q+jnLRaCPK1GezafVTIaRIJmhE6qpg7sY98wg692g3+egnNm9mAup6C6EslD8hL8zcsGp4I6sI6jS6PWu42EAR3od8wVlyWor1s8m1chV/l2fQ3bm/j33m3n3F2tvfHREdYp1d4p5iIePgYqBbZB2goKIKZqbnJ+VAAACH5BAUKAAEALAAAAAAoACgAAAJ8jI+py+0PIwRUWkbB3Sjz731bKFpkGZ1mJaktm8KX29CT/Ng57ug9XwPeNC/iSLjwBY1DEFKhxDwTLl/0UH1eDVkmlNf9eqng8thqFquX606aTT6/pfJ6OznH5u/cfQBtF8cnSOgWSDcYBmeYqOWniFiod4hSaXmJmWlRAAA7");
    background-repeat: no-repeat;
    background-position: center;
    width: 56vh;
    height: 50vh;
    margin: 0;
  }
  overflow-x: hidden;
  .icons {
    color: rgb(57, 56, 56);
    font-size: 17rem;
    position: fixed;
    z-index: 9999;
    top: 10rem;
    left: 10rem;
  }
  .ps {
    height: 160rem;
    margin-bottom: 33rem;
    .top {
      margin-top: 33rem;

      width: 100vw;
      overflow: hidden;
      height: 160rem;
      filter: blur(20rem);

      width: 100%;
      background-position: center;
      background-size: cover;
      position: absolute;
      z-index: -1;
      &::after {
        width: 100vw;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.25);
        content: "";
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
    .xx {
      overflow: hidden;
      display: flex;
      padding: 33rem 10rem;
      .imgs {
        padding-right: 13rem;
        .iimg {
          width: 126rem;
          height: 126rem;
          position: relative;
          .icon {
            font-size: 12rem;
            padding: 3rem;
            background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+");
            background-size: 12rem;
            background-position-y: 5rem;
            background-repeat: no-repeat;
            padding-left: 14rem;
            color: #fff;
            position: absolute;
            right: 0;
            z-index: 1;
          }
          .sons {
            position: absolute;
            z-index: 3;
            top: 10rem;
            left: 0;
            padding: 0 8rem;
            height: 17rem;
            color: #fff;
            font-size: 9rem;
            text-align: center;
            line-height: 17rem;
            background-color: rgba(217, 48, 48, 0.8);
            border-top-right-radius: 17rem;
            border-bottom-right-radius: 17rem;
          }
          img {
            width: 100%;
          }
          &::after {
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            width: 100%;
            height: 28rem;

            background-image: linear-gradient(
              to top,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.2)
            );
          }
        }
      }
      .text {
        z-index: 9;
        color: white;
        font-size: 17rem;
        .users {
          margin-top: 10rem;
          color: hsla(0, 0%, 100%, 0.7);
          font-size: 14rem;
          vertical-align: middle;
          line-height: 34rem;
          img {
            width: 30rem;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .list {
    height: 23rem;
    line-height: 23rem;
    padding: 0 10rem;
    font-size: 12rem;
    color: #666;
    background-color: #eeeff0;
  }
  .content {
    padding-top: 10rem;

    display: flex;
    & > div {
      &:first-of-type {
        width: 10%;
      }
      &:last-of-type {
        border-bottom: 1rem solid rgba(128, 128, 128, 0.13);
        width: 90%;
        i {
          color: gray;
          line-height: 44rem;
          font-size: 22rem;
        }
      }
    }
    p {
      padding-bottom: 3rem;
      font-size: 17rem;
    }
    span {
      color: gray;
      display: inline-block;
      .icon {
        margin: 0;
        padding: 0;
        width: 12rem;
        height: 8rem;
        background-image: url(../assets/jlt.png);
        background-size: 166rem;
        background-position: 0rem 0rem;
      }
      span {
        margin: 3rem;
      }
    }
    .left {
      text-align: center;
      line-height: 48rem;
      color: gray;
      font-weight: 500;
      font-size: 17rem;
    }

    .right {
      display: flex;
      padding-bottom: 3rem;
      div {
        &:first-of-type {
          width: 83%;
        }
        .contents,
        p {
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
          white-space: nowrap;
        }
      }
    }
    .pp {
      display: flex;
      width: 16%;
      height: 51rem;
      align-items: center;
      .play {
        background-image: url(../assets/jlt.png);
        // width: 22rem !important;
        height: 22rem;
        background-position: -24rem 0rem;
        background-size: 166rem;
        &.active {
          background-image: none;
          display: flex;
          // height: 20rem;
          i {
            transform-origin: bottom;
            animation: log 0.6s linear infinite alternate;
            margin: 2rem;
            display: block;
            width: 2rem;
            height: 100%;
            background: red;
          }
          i:nth-child(1) {
            animation-delay: 0s;
          }
          i:nth-child(2) {
            animation-delay: 0.2s;
          }
          i:nth-child(3) {
            animation-delay: 0.4s;
          }
          i:nth-child(4) {
            animation-delay: 0.6s;
          }
        }
        &.palybt {
          i {
            animation-play-state: paused;
          }
        }
      }
    }
  }
}
</style>