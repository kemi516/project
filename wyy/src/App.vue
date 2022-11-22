<template>
  <div id="app" :class="{ quanbg: lie || $route.path == '/playx' }">
    <div class="loding" v-if="logding"></div>
    <div v-else>
      <div class="xainqx" v-if="lie">
        <div class="xianq" @click.stop="lie = false"></div>
        <div class="xianlist">
          <div v-for="(item, i) in songx" :key="i">
            <div @click="song = item" :class="{ active: item.id == song.id }" class="text">
              {{ item.name }}
            </div>
            <div class="xs" @click="removerhis(item)">
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <nav v-if="this.$route.meta.requiresAuth">
        <router-link to="/">推荐音乐</router-link>
        <router-link to="/hot">热歌榜</router-link>
        <router-link to="/search">搜索</router-link>
      </nav>

      <!-- 子路由动画 -->
      <transition name="fade">
        <router-view @remover-his="removerhis" @song-ids="songlists" :song="song" :songId="song?.id"
          :currentTime="currentTime" @paly-shows="shows = $event" :duration="duration"
          @time-updata="$refs.audio.currentTime = $event" :palybt="palybt" :model="model" @paly-xian="xian"
          @changes-ck="cks" :songx="songx" @xian-list="song = $event" @hot-list="hotlist" @search-val="song = $event"
          :style="{
            marginBottom: song && $route.path !== '/playx' ? '62rem' : '0',
          }"></router-view>
      </transition>




      <!-- <KeepAlive> -->
      <!-- <router-view @remover-his="removerhis" @song-ids="songlists" :song="song" :songId="song?.id"
        :currentTime="currentTime" @paly-shows="shows = $event" :duration="duration"
        @time-updata="$refs.audio.currentTime = $event" :palybt="palybt" :model="model" @paly-xian="xian"
        @changes-ck="cks" :songx="songx" @xian-list="song = $event" @hot-list="hotlist" @search-val="song = $event"
        :style="{
          marginBottom: song && $route.path !== '/playx' ? '62rem' : '0',
        }" v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view> -->
      <!-- </KeepAlive> -->
      <!-- margin-bottom: ; -->
      <!-- :currentTime="$refs.audio.currentTime" -->

      <div v-if="song" class="audio">
        <audio @ended="cks('next')" :src="`https://music.163.com/song/media/outer/url?id=${song.id}.mp3`" ref="audio"
          @play="palybt = true" @pause="palybt = false" autoplay @durationchange="duration = $event.target.duration"
          @timeupdate="currentTime = $event.target.currentTime"></audio>
      </div>
      <div class="songplay" v-if="song" v-show="$route.path !== '/playx'">
        <div class="left" @click="
  $router.push({
    path: '/playx',
  });
lie = false;
        ">
          <div class="imgs">
            <img :src="
              song && song?.picUrl
                ? `${song?.picUrl}?imageView=1&type=webp&thumbnail=30x0`
                : `${song?.al.picUrl}?imageView=1&type=webp&thumbnail=30x0`
            " alt="" :class="{ xx: !palybt }" />
            <!-- shows = false; -->
            <!-- props: (route) => ({ query: song }), -->
            <!-- @click="$router.push({ path: '/playx', query: { id: `${item.id}` } })" -->
          </div>
          <div class="text">
            {{ song?.name }}
          </div>
        </div>
        <div class="can"></div>
        <div class="right">
          <!-- <canvas ref="canvas" width="50" height="50"></canvas> -->
          <div class="paly" v-if="palybt" @click="$refs?.audio.pause()">
            <i data-v-5f9336bf="" class="fa fa-pause"></i>
          </div>
          <div class="paly" v-else @click="$refs?.audio.play()">
            <i data-v-5f9336bf="" class="fa fa-play"></i>
          </div>
          <div class="playlist" @click="lie = !lie">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // created: function () {
  //   console.log("App this.$route", this.$route);
  // },
  data: function () {
    return {
      logding: false,
      song: JSON.parse(localStorage.getItem("song")) || null,
      // song: null,
      palybt: false,
      songx: JSON.parse(localStorage.getItem("songlist")) || [],
      currentTime: Number(localStorage.getItem("currentTime")) || 0,
      duration: 0,
      shows: JSON.parse(localStorage.getItem("shows")) || true,
      models: ["fa fa-retweet", "fa fa-random", "fa fa-undo"],
      model: "fa fa-retweet",
      lie: false,
      canvas: null,
      quanbg: false,
    };
  },

  methods: {
    removerhis(item) {
      this.songx = this.songx.filter((e) => e != item);
    },
    hotlist(song, songlist) {
      this.song = song;
      this.songx = songlist;
    },
    md() {
      // console.log(this.$refs.audio);
    },
    xian() {
      var index = this.models.findIndex((e) => e == this.model);
      this.model = this.models[index + 1]
        ? this.models[index + 1]
        : this.models[0];
    },
    songlists(id, songlist) {
      (this.song = id), (this.songx = songlist);
    },
    cks(ts) {
      switch (this.model) {
        case "fa fa-retweet":
          // console.log(ts);
          var index = this.songx.findIndex((o) => o.id == this.song.id);
          if (ts === "next") {
            // console.log(this.songx.length);
            this.song =
              index < this.songx.length - 1
                ? this.songx[index + 1]
                : this.songx[0];
          } else {
            this.song =
              index === 0
                ? this.songx[this.songx.length - 1]
                : this.songx[index - 1];
          }
          break;
        case "fa fa-random":
          var sui = this.songx.filter((e) => e.id != this.song?.id);
          this.song = sui[Math.floor(Math.random() * sui.length)];
          break;
        case "fa fa-undo":
          this.$refs.audio.currentTime = 0;
          this.$refs.audio.play();
          break;
      }
    },
  },
  computed: {
    ptime: function () {
      if (this.currentTime && this.duration) {
        return this.currentTime / this.duration;
      } else {
        return 0;
      }
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    if (this.$refs.audio) {
      this.$refs.audio.currentTime = this.currentTime;
    }
  },
  watch: {
    shows(n) {
      localStorage.setItem("shows", JSON.stringify(n));
    },
    song(n) {
      localStorage.setItem("song", JSON.stringify(n));
    },
    ptime(n) {
      if (this.canvas) {
        var context = this.canvas.getContext("2d");
        context.clearRect(0, 0, 50, 50);
        context.beginPath();
        context.arc(25, 25, 14, -0.5 * Math.PI, Math.PI * (2 * n - 0.5));
        context.stroke();
        context.strokeStyle = "white";
      }
    },
    currentTime(n) {
      if (n) {
        localStorage.setItem("currentTime", JSON.stringify(n));
      }
    },
    songx(n) {
      // console.log([...new Set(n)]);
      localStorage.setItem("songlist", JSON.stringify(n));
    },
  },
};
</script>
<!-- 路由转场动画 -->
<style>
/* 路由进入前 */
.fade-enter {
  transform: translateX(100vw);
  position: fixed;
  left: 0;
  z-index: 999;
  top: 1046rem;
}

/* 路由进入后 */
.fade-enter-to {
  transform: translateX(0);
  position: fixed;
  left: 0;
  top: 46rem;
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

/* 路由离开前 */
.fade-leave {
  transform: translateX(0);
  position: fixed;
  left: 0;
  z-index: 999;
  top: 0;
}

/* 路由离开后 */
.fade-leave-to {
  transform: translateX(-100vw);
  position: fixed;
  left: 0;
  top: 1046rem;
  z-index: 999;
}
</style>


<style lang="less" scoped>
@keyframes imgplay {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

#app {
  .loding {
    background-image: url("data:image/gif;base64,R0lGODlhKAAoAIABANM6Mf///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI2QURFODRFRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI2QURFODRGRkZBRTExRTU4NTg0QTdFMUQ4QkI2MTI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjZBREU4NENGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjZBREU4NERGRkFFMTFFNTg1ODRBN0UxRDhCQjYxMjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJCgABACwAAAAAKAAoAAACeIyPqcvtD6OctNoD8rUZ7Np9VChKZAmdqKOuTOsqcIzMtGHfuaxxfbRrBGu/UfExXCRxxwRsGdg9m0IqpgmVYq1KbnTrMXmnYeAYzCtf1em2E11lf+VkFpxIP+f37td93dfF9zboVwhIaHfItJjoiBd4IzlJWalQAAAh+QQJCgABACwAAAAAKAAoAAACfIyPqcvtD6OctNqLs94WeB55AAiJ5GOeTaoubJu8nBzQGm0zuYF/0l7zIYAxocvIQzqAvVHROVRGoYemgqm0PpfZLjX53YqnV2nVWw5j1ejxkQ1Pc+Nu8FxeD4bJea2uzRf4hidotwJ4RvenmEg42IfoaFioB2N5iZmZUAAAIfkECQoAAQAsAAAAACgAKAAAAn+Mj6nL7Q+jnLRaCPK1GezafVTIaRIJmhE6qpg7sY98wg692g3+egnNm9mAup6C6EslD8hL8zcsGp4I6sI6jS6PWu42EAR3od8wVlyWor1s8m1chV/l2fQ3bm/j33m3n3F2tvfHREdYp1d4p5iIePgYqBbZB2goKIKZqbnJ+VAAACH5BAUKAAEALAAAAAAoACgAAAJ8jI+py+0PIwRUWkbB3Sjz731bKFpkGZ1mJaktm8KX29CT/Ng57ug9XwPeNC/iSLjwBY1DEFKhxDwTLl/0UH1eDVkmlNf9eqng8thqFquX606aTT6/pfJ6OznH5u/cfQBtF8cnSOgWSDcYBmeYqOWniFiod4hSaXmJmWlRAAA7");
    background-repeat: no-repeat;
    background-position: center;
    width: 56vh;
    height: 50vh;
    margin: 0;
  }

  overflow-x: hidden;

  &.quanbg {
    overflow: hidden;
    height: 100vh;
  }

  .xainqx {
    // width: 100vw;
    // height: 100vh;
    background-color: transparent;

    .xianlist {
      color: #000;
      text-align: left;
      padding: 10rem 20rem;
      min-height: 50vh;
      max-height: 78vh;
      overflow-y: auto;
      background-color: #fff;
      position: absolute;
      width: 90vw;
      bottom: 16rem;
      left: 5%;
      z-index: 99999;
      border-radius: 10rem;

      &>div {
        display: flex;
        justify-content: space-between;
      }

      .text {
        width: 260rem;

        &::-webkit-scrollbar {
          display: none;
        }
      }

      div {
        // line-height: ;
        font-size: 17rem;
        padding: 6rem 0;
        overflow-x: auto;
        white-space: nowrap;

        &.active {
          color: red;
        }
      }

      .xs {
        div {
          width: 12px;
          height: 12px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=);


        }
      }
    }

    .xianq {
      background-color: rgba(5, 5, 5, 0.749);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 69999;
      width: 100vw;
      height: 91vh;
    }
  }

  // padding-bottom: 99rem;
  font-family: Avenir,
  Helvetica,
  Arial,
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .audio {
    position: fixed;
    bottom: 0;
    // z-index: 9999999;
  }

  position: relative;

  .songplay {
    color: white;
    z-index: 9999999; // position: relative;

    canvas {
      position: absolute;
      top: 5rem;
      z-index: -9999;
      right: 42rem;
    }

    padding: 15rem 10rem;
    box-sizing: border-box;
    position: fixed;
    justify-content: space-between;
    bottom: 0;
    height: 60rem;
    width: 100%;
    border-top: 1rem solid #e8dddd;
    background-color: #3e3e3e;

    display: flex;

    .left {
      width: 60%;
      display: flex;

      .imgs {
        margin-right: 10rem;
        width: 50rem;
        flex-grow: 0;
        flex-shrink: 0;

        &::after {
          content: "";
          display: block;
          width: 50rem;
          height: 50rem;
          background-image: url("https://s3.music.126.net/mobile-new/img/disc_light.png?2bb24f3…=");
          // background-color: #fff;
          background-repeat: no-repeat;
          background-size: contain;
        }

        width: 50rem;
        height: 50rem;
        background-color: rgba(20, 20, 20, 0.871);
        border-radius: 50%;
        position: relative;

        top: -20rem;
        left: 3rem;

        img {
          // box-shadow: 0 0 1rem 1rem rgba(255, 255, 255, 0.597);
          width: 30rem;
          position: absolute;
          top: 10rem;
          left: 10rem;
          animation: imgplay 6s linear infinite;
          border-radius: 50%;
          vertical-align: middle;

          &.xx {
            animation-play-state: paused;
          }
        }
      }

      .text {
        width: 70%;
        font-size: 14rem;
        position: relative;
        top: 6rem;
        overflow: auto;
        white-space: nowrap;
      }
    }

    .right {
      display: flex;

      // position: relative;
      margin-right: 6rem;

      .paly {
        i {
          font-size: 14rem;
        }

        position: relative;
        left: -18rem;
        margin-top: 8rem;
      }

      .playlist {
        margin-top: 5rem;
        position: relative;

        // left: -6rem;
        span {
          width: 20rem;
          height: 3rem;
          background-color: white;
          display: block;
          margin: 3rem;
        }
      }
    }
  }

  .can {
    z-index: -999;
    width: 28rem;
    height: 28rem;
    display: inline-block;
    border-radius: 50%;
    border: 1rem solid #948d8de9;
    position: absolute;
    top: 16rem;
    right: 14%;
  }

  &.bactive {
    margin-bottom: 62rem;
  }
}

nav {
  background: white;
  width: 100%;
  position: fixed;
  top: 0rem;
  // height: 44rem;
  // line-height: 44rem;
  z-index: 9999;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 0 1rem 0 gray;

  &+div {
    padding-top: 46rem !important;
  }

  a {
    line-height: 44rem;
    font-size: 15rem;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #dd001b;
      border-bottom: 2rem solid #dd001b;
      padding: 0 3rem;
    }
  }
}
</style>
