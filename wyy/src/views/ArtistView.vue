<template>
  <div class="box">
    <div class="loding" v-if="shows"></div>
    <div v-else>
      <div class="artistbg">
        <span @click="$router.push({ path: '/search' })" class="fanhui"
          ><i class="fa fa-reply"></i
        ></span>
        <img
          :src="`${
            artist?.artist ? artist?.artist.picUrl : ''
          }?imageView=1&type=webp&thumbnail=375x0`"
          alt=""
        />

        <div></div>
      </div>
      <h1>歌手简历</h1>
      <div class="name">
        <p>{{ artist?.artist.briefDesc }}</p>
      </div>
      <!-- <div v-for="item in artist?.hotSongs" :key="item.id">
        </div> -->
      <h1>热门单曲</h1>
      <div
        class="hotqq"
        v-for="(item, index) in artist.hotSongs"
        :key="item.id"
      >
        <div class="hotqu" @click="$emit('hot-list', item, artist.hotSongs)">
          <div class="left">
            <!-- {{ item }} -->
            {{ String(index + 1).padStart(2, 0) }}
          </div>
          <div class="right">
            <div>
              <p>{{ item.name }}</p>
              <span>
                <span class="icon" v-if="item.sq"> </span>
                {{ item.ar[0].name }}
                <span>-</span>
                {{ item.al.name }}
              </span>
            </div>
            <div class="pp">
              <div class="play" v-if="item.id !== songId"></div>
              <div class="play active" :class="{ palybt: !palybt }" v-else>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div
        v-for="(item, index) in artist?.hotSongs"
        :key="index"
        @click="$emit('playsong', item), $emit('musiclist', artist?.hotSongs)"
      >
        <div>
          <span class="num"> {{ String(index + 1).padStart(2, "0") }}</span>
        </div>
        <div class="gray">
          <div>
            <p>{{ item.name }}</p>
            <p>
              <span class="bg2"></span>{{ item.ar[0].name }}-{{ item.al.name }}
            </p>
            <div v-if="item.al.id !== songId" class="newsong-play"></div>
            <div
              v-else
              class="newsong-play active"
              :class="{ playing: playing }"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  // artist?id=31165848
  props: {
    songId: Number,
    palybt: Boolean,
  },
  data: function () {
    return {
      artist: null,
      shows: true,
    };
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to.query.id);
    next((vm) => {
      vm.axios
        .get("https://apis.netstart.cn/music/artists", {
          params: {
            id: to.query.id,
          },
        })
        .then((res) => {
          // console.log(res);
          vm.shows = false;
          //   for (let i = 0; i <5; i++) {
          //     vm.artist.push(res.data.hotSongs[i])
          //   }
          vm.artist = res.data;
        });
    });
  },
};
</script>

<style lang="less" scoped>
.box {
  @keyframes log {
    from {
      transform: rotateX(6deg);
    }

    to {
      transform: rotateX(60deg);
    }
  }
  .hotqq .hotqu {
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
          width: 90%;
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
        width: 22rem;
        height: 22rem;
        background-position: -24rem 0rem;
        background-size: 166rem;
        &.active {
          background-image: none;
          display: flex;
          height: 20rem;
          span {
            transform-origin: bottom;
            animation: log 0.6s linear infinite alternate;
            margin: 2rem;
            display: block;
            width: 2rem;
            height: 100%;
            background: red;
          }
          span:nth-child(1) {
            animation-delay: 0s;
          }
          span:nth-child(2) {
            animation-delay: -0.2s;
          }
          span:nth-child(3) {
            animation-delay: -0.4s;
          }
          span:nth-child(4) {
            animation-delay: -0.6s;
          }
        }
        &.palybt {
          span {
            animation-play-state: paused;
          }
        }
      }
    }
  }

  .loding {
    background-image: url("data:image/gif;base64,R0lGODlhKAAoAIABANM6Mf///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI2QURFODRFRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI2QURFODRGRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjZBREU4NENGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjZBREU4NERGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJCgABACwAAAAAKAAoAAACeIyPqcvtD6OctNoD8rUZ7Np9VChKZAmdqKOuTOsqcIzMtGHfuaxxfbRrBGu/UfExXCRxxwRsGdg9m0IqpgmVYq1KbnTrMXmnYeAYzCtf1em2E11lf+VkFpxIP+f37td93dfF9zboVwhIaHfItJjoiBd4IzlJWalQAAAh+QQJCgABACwAAAAAKAAoAAACfIyPqcvtD6OctNqLs94WeB55AAiJ5GOeTaoubJu8nBzQGm0zuYF/0l7zIYAxocvIQzqAvVHROVRGoYemgqm0PpfZLjX53YqnV2nVWw5j1ejxkQ1Pc+Nu8FxeD4bJea2uzRf4hidotwJ4RvenmEg42IfoaFioB2N5iZmZUAAAIfkECQoAAQAsAAAAACgAKAAAAn+Mj6nL7Q+jnLRaCPK1GezafVTIaRIJmhE6qpg7sY98wg692g3+egnNm9mAup6C6EslD8hL8zcsGp4I6sI6jS6PWu42EAR3od8wVlyWor1s8m1chV/l2fQ3bm/j33m3n3F2tvfHREdYp1d4p5iIePgYqBbZB2goKIKZqbnJ+VAAACH5BAUKAAEALAAAAAAoACgAAAJ8jI+py+0PIwRUWkbB3Sjz731bKFpkGZ1mJaktm8KX29CT/Ng57ug9XwPeNC/iSLjwBY1DEFKhxDwTLl/0UH1eDVkmlNf9eqng8thqFquX606aTT6/pfJ6OznH5u/cfQBtF8cnSOgWSDcYBmeYqOWniFiod4hSaXmJmWlRAAA7");
    background-repeat: no-repeat;
    background-position: center;
    width: 56vh;
    height: 50vh;
    margin: 0;
  }
  div {
    .name {
      display: inline-block;

      margin: 0 15rem;
      // padding: 0 5rem;
      p {
        font-size: 14rem;
        line-height: 20rem;
        color: #666;
      }
    }
    h1 {
      font-size: 18rem;
      margin: 15rem;
      font-weight: bold;
    }
    //   .artistbg {
    //     span {
    //       margin-top: 20rem;
    //       margin-left: 10rem;
    //       i {
    //         color: black;
    //       }
    //     }
    //     width: 100%;
    //     // height: 310rem;
    //     // position: relative;
    //     img {
    //       width: 100%;
    //       // height: 100%;
    //     }
    .fanhui {
      position: fixed;
      left: 10rem;
      font-size: 16rem;
      top: 10rem;
      color: gray;
    }
    //   }
    //   > div {
    //     display: flex;
    //     align-items: center;
    //     font-size: 19rem;
    //     .num {
    //       font-weight: 300;
    //       color: gray;
    //       margin: 0 10rem;
    //     }
    //   }
    //   > div:nth-child(1) {
    //     span {
    //       color: red;
    //     }
    //   }
    //   > div:nth-child(2) {
    //     span {
    //       color: red;
    //     }
    //   }
    //   > div:nth-child(3) {
    //     span {
    //       color: red;
    //     }
    //   }
    //   .gray {
    //     width: 100%;
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     padding: 6rem 5rem 10rem 0;
    //     > div {
    //       width: 100%;
    //       position: relative;
    //     }
    //     // margin: 5rem 0;
    //     border-bottom: 1rem solid rgba(128, 128, 128, 0.082);
    //     div > p:nth-of-type(2) {
    //       font-size: 12rem;
    //       color: gray;
    //     }
    //   }
    //   .bg2 {
    //     margin: 0;
    //     display: inline-block;
    //     width: 24rem;
    //     height: 8rem;
    //     color: white;
    //     background-size: 740%;
    //     background-repeat: no-repeat;
    //     background-position: 2rem 0rem;
    //     // background-image: url("../assets/1.png");
    //   }
    //   @keyframes playingrunning {
    //     from {
    //       transform: rotateX(15deg);
    //     }
    //     to {
    //       transform: rotateX(60deg);
    //     }
    //   }
    //   .newsong-play {
    //     background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
    //     background-position: -24px 0;
    //     background-size: 166px 97px;
    //     width: 22rem;
    //     height: 22rem;
    //     position: absolute;
    //     right: 10rem;
    //     top: 50%;
    //     transform: translateY(-50%);
    //     &.active {
    //       background-image: none;
    //       display: flex;
    //       justify-content: space-around;
    //       span {
    //         width: 11%;
    //         height: 100%;
    //         background: red;
    //         animation: playingrunning 0.8s infinite alternate;
    //         animation-play-state: paused;
    //         transform-origin: bottom;
    //         &:nth-child(1) {
    //           animation-delay: 0s;
    //         }
    //         &:nth-child(2) {
    //           animation-delay: -0.2s;
    //         }
    //         &:nth-child(3) {
    //           animation-delay: -0.4s;
    //         }
    //         &:nth-child(4) {
    //           animation-delay: -0.6s;
    //         }
    //       }

    //       &.playing {
    //         span {
    //           animation-play-state: running;
    //         }
    //       }
    //     }
    //   }
  }
}
.hot {
  .HotList:nth-child(-n + 3) {
    .left {
      color: #df3436;
    }
  }
}
</style>