<template>
  <div class="playx">
    <div class="after" :style="bgi"></div>

    <div class="xainqx" v-if="lie">
      <div class="xianq" @click.stop="lie = false"></div>
      <div class="xianlist">
        <div v-for="(item, i) in songx" :key="i">
          <div @click="$emit('xian-list', item)" :class="{ active: item.id == song.id }" class="text">
            {{ item.name }}
          </div>
          <div class="xs" @click="$emit('remover-his', item)">
            <div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="xainqx" v-if="lie">
      <div class="xianq" @click.stop="lie = false"></div>
      <div class="xianlist">
        <div
          v-for="(item, i) in songx"
          :key="i"
          @click="$emit('xian-list', item)"
          :class="{ active: item.id == song.id }"
        >
          {{ item.name }}
        </div>
      </div>
    </div> -->
    <div class="navp">
      <div @click="
        $router.push({
          path: '/',
        });
        $emit('paly-shows', true);
      ">
        <i data-v-9f973e4c="" class="fa fa-reply"></i>
      </div>
      <div class="text">{{ song.name }}</div>
      <div>
        <i data-v-9f973e4c="" class="fa fa-share-square-o"></i>
      </div>
    </div>
    <div class="content">
      <div class="imgs" v-show="shows" @click="shows = !shows">
        <div class="befor" :class="{ palybt: !palybt }"></div>
        <img :src="
          song && song?.picUrl
            ? `${song?.picUrl}?imageView=1&type=webp&thumbnail=200x0`
            : `${song?.al.picUrl}?imageView=1&type=webp&thumbnail=200x0`
        " alt="" :class="{ xx: !palybt }" />
      </div>
      <div class="lyric" ref="uls" v-show="!shows" @click="shows = !shows">
        <ul>
          <li ref="li" v-for="(item, i) in HotSong" :key="i" :class="{ active: i === index }">
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <div class="jd">
        <div class="left">
          <span>{{ String(Math.floor(currentTime / 60)).padStart(2, 0) }}:{{
          String((currentTime % 60).toFixed(0)).padStart(2, 0)
          }}</span>
        </div>
        <!--  -->
        <div class="inputs">
          <div class="p">
            <!-- <div class="s" :style="`width:${ptime * 100}%`"> -->
            <div class="s" :style="`width:${ptime * 100}%`">
              <!-- :style="(width = $refs.input.target.value)" -->
              <div class="yuan"></div>
            </div>
          </div>
          <!-- <input ref="input" type="range" :value="draging ? $refs.input.value : currentTime" :max="duration" -->
          <input ref="input" type="range" :value="draging ? $refs.input.value : currentTime" :max="duration"
            @input="draging = true; $emit('time-updata', $event.target.value);" @change="
            draging = false;
            " />
          <!-- $emit('time-updata', $event.target.value); -->
          <!-- @input="draging = true" -->
        </div>
        <div class="right">
          <span>{{ String(Math.floor(duration / 60)).padStart(2, 0) }}:{{
          String((duration % 60).toFixed(0)).padStart(2, 0)
          }}</span>
        </div>
      </div>
      <div class="pdlist">
        <!-- ["fa fa-retweet", "fa fa-random", "fa fa-undo"] -->
        <div class="model" ref="models">
          <span>{{
          model == "fa fa-retweet"
          ? "顺序播放"
          : model == "fa fa-random"
          ? "随机播放"
          : "单曲循环"
          }}</span>
        </div>
        <div class='bbottom'>
          <button @click="$emit('paly-xian')"><i :class="model" class="ms"></i></button>
          <button @click="$emit('changes-ck', 'prev')">
            <i data-v-9f973e4c="" class="fa fa-step-backward"></i>
          </button>
          <button class="paly" v-if="palybt" @click="$parent.$refs?.audio.pause()">
            <i data-v-9f973e4c="" class="fa fa-pause"></i>
          </button>
          <button class="paly" v-else @click="$parent.$refs?.audio.play()">
            <i data-v-9f973e4c="" class="fa fa-play"></i>
          </button>
          <span class="ruan"></span>
          <!-- <canvas ref="canvas" width="50" height="50"></canvas> -->
          <button @click="$emit('changes-ck', 'next')">
            <i data-v-9f973e4c="" class="fa fa-step-forward"></i>
          </button>
          <button @click="lie = !lie">
            <i data-v-9f973e4c="" class="fa fa-bars"></i>
          </button>
        </div>
        <!-- <div class="xianlist" v-if="lie">
          <div
            v-for="(item, i) in songx"
            :key="i"
            @click="$emit('xian-list', item)"
            :class="{ active: item.id == song.id }"
          >
            {{ item.name }}
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HotList from "@/components/HotList.vue";

export default {
  name: "PlayXian",
  props: {
    song: Object,
    currentTime: Number,
    duration: Number,
    model: String,
    palybt: Boolean,
    songx: [Object, Array],
  },
  components: {
    // HotList,
  },

  data() {
    return {
      HotSong: null,
      index: null,
      shows: true,
      appshows: false,
      lie: false,
      draging: false,
      bgi: "",

      bt: false,
    };
  },
  // methods:{

  // }
  created() {
    setTimeout(() => {
      this.$refs.models.classList.add("none");
    }, 1000);
    this.axios
      .get("https://apis.netstart.cn/music//lyric", {
        params: { id: this.song.id },
      })
      .then((res) => {
        //  console.log(res.data.lrc.lyric)
        let a = res.data.lrc.lyric;
        // console.log(a);
        this.HotSong = a
          .split("\n")
          .filter((e) => e)
          .map((e) => {
            //  (  e.match(/\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/))
            if (e.match(/\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/)) {
              return {
                time:
                  e.match(/\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/)
                    .groups.mm *
                  60 +
                  e.match(/\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/)
                    .groups.ss *
                  1,
                text: e.match(
                  /\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/
                ).groups.text,
              };
            } else {
              return { text: "暂无歌词" };
            }
          });
        // console.log(lyrics);
        // console.log(this.$parent.$refs.audio);
      });
    this.bgi = {
      backgroundImage: ` url( ${this.song.picUrl ? this.song.picUrl : this.song.al.picUrl
        } )`,
      "background-size": "cover",
      " background-position": "center",

      transform: "scale(1.5)",
      filter: " blur(10rem)",
      // backgroundPosi,
    };
    // https://apis.netstart.cn/music//lyric?id=33894312
    // console.log(this.song);
  },
  computed: {
    ptime: function () {
      return this.currentTime / this.duration;
    },
  },
  watch: {
    model() {
      // this.$refs.models.className = this.model;
      this.$refs.models.classList.remove("none");
      setTimeout(() => {
        this.$refs.models.classList.add("none");
      }, 1000);
    },
    currentTime(n) {
      if (this.HotSong) {
        // console.log(this.HotSong);
        this.index = this.HotSong.findIndex((e, i) =>
          this.HotSong[i].time <= n && this.HotSong[i + 1]
            ? this.HotSong[i + 1].time >= n
            : true || e
        );
        // console.log(this.$refs.);
        // this.$refs.uls.style.transform = `translateY(calc(${
        //   -this.index * 21
        // }+25vh))`;
        this.$refs.uls.scrollTop =
          this.index * this.$refs.li[this.index].offsetHeight;
        // this.$refs.uls.scrollTop + this.$refs.li[this.index].offsetHeight;
        // console.log("h", this.$refs.li[this.index].offsetHeight);
        // console.log("t", this.$refs.uls.scrollTop);
        // console.log("s", this.index);
      }
      if (!this.draging) {
        this.tmpCurrentTime = n;
      }
    },

    song(n) {
      this.axios
        .get("https://apis.netstart.cn/music//lyric", {
          params: { id: n.id },
        })
        .then((res) => {
          //  console.log(res.data.lrc.lyric)
          let a = res.data.lrc.lyric;
          // console.log(a);
          // this.HotSong = a
          //   .split("\n")
          //   .filter((e) => e)
          //   .map((e) => {
          //     var { groups } = e.match(
          //       /\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/
          //     );
          //     return {
          //       time: groups.mm * 60 + groups.ss * 1,
          //       text: groups.text,
          //     };
          //   })
          //   .filter((e) => e.text != "空");
          // console.log(lyrics);
          // console.log(this.$parent.$refs.audio);
          this.HotSong = a
            .split("\n")
            .filter((e) => e)
            .map((e) => {
              //  (  e.match(/\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/))
              if (
                e.match(/\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/)
              ) {
                return {
                  time:
                    e.match(/\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/)
                      .groups.mm *
                    60 +
                    e.match(/\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/)
                      .groups.ss *
                    1,
                  text: e.match(
                    /\[(?<mm>\d{2}):(?<ss>\d{2}\.\d{2,3})\](?<text>.*)/
                  ).groups.text,
                };
              } else {
                return { text: "..." };
              }
            });
        });
      this.bgi = {
        backgroundImage: ` url( ${n.picUrl ? n.picUrl : n.al.picUrl} )`,
        "background-size": "cover",
        " background-position": "center",
        transform: "scale(1.2)",
        filter: " blur(10rem)",
      };
    },
    // ptime: function (n) {
    //   var canvas = this.$refs.canvas;
    //   var context = canvas.getContext("2d");
    //   context.clearRect(0, 0, 50, 50);
    //   context.beginPath();
    //   context.arc(25, 25, 20, -0.5 * Math.PI, Math.PI * (2 * n - 0.5));
    //   context.stroke();
    //   context.strokeStyle = "#FF0000";
    // },
  },
};
</script>
<style lang="less" scoped>
@keyframes imgplay {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.playx {
  color: rgb(222, 222, 222);
  position: relative;
  height: 100vh;
  // overflow: hidden;

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
      bottom: 55rem;
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

      top: -33px;

      left: 0;
      z-index: 69999;
      width: 100vw;
      height: 100vh;
    }
  }

  // .xainqx {
  //   .xianq {
  //     height: 100vh !important;
  //     z-index: 999999;
  //   }
  //   .xianlist {
  //     max-height: 60vh !important;
  //     top: 66rem !important;
  //   }
  // }
  .navp {
    margin-top: 33rem;
    padding: 0 22rem;
    height: 60rem;
    width: 100%;
    display: flex;
    font-size: 17rem;
    text-align: center;

    div {
      &:nth-child(1) {
        width: 10%;
      }

      &:nth-child(2) {
        width: 80%;
        white-space: nowrap;
        overflow: auto;
        position: relative;
        z-index: 99;
        color: white;
        line-height: 18rem;
      }

      &:nth-child(3) {
        width: 10%;
      }
    }
  }

  .imgs {
    background-color: #000;

    border-radius: 50%;
    width: 300rem;
    height: 300rem;
    margin: 33rem auto;
    position: relative;

    .befor {
      position: absolute;
      top: -66rem;
      left: 160rem;
      z-index: 2;
      width: 84rem;
      height: 122rem;
      background: url(https://s3.music.126.net/mobile-new/img/needle-ab.png?4b81da043356110081e5ccaed2e6f2ad=) no-repeat;
      background-size: contain;
      transition: all 0.3s;
      // border: 1rem solid red;
      // transform: rotate(0deg);
      transform-origin: 10rem 5rem;

      &.palybt {
        transform: rotate(-18deg);
      }
    }

    &::after {
      content: "";
      display: block;
      width: 300rem;
      height: 300rem;
      background-image: url("https://s3.music.126.net/mobile-new/img/disc_light.png?2bb24f3…=");
      transform: scale(1.1);
      // background-color: #fff;
      background-repeat: no-repeat;
      background-size: cover;
    }

    img {
      animation: imgplay 6s linear infinite;
      border-radius: 50%;
      vertical-align: middle;

      &.xx {
        animation-play-state: paused;
      }

      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      border-radius: 50%;
    }
  }

  .lyric {
    padding: 0 60rem;
    color: rgb(222, 222, 222);
    text-align: center;
    width: 100%;
    height: 66vh;
    // background-color: pink;
    // overflow: hidden;
    overflow-y: auto;
    transition: all 0.3s;

    ul {
      transform: translateY(25vh);
      margin-bottom: 50vh;

      .active {
        color: rgb(244, 81, 81);
      }

      li {
        font-size: 16rem;
        padding-top: 16rem;
        white-space: nowrap;
        overflow-x: auto;

        // scrollbar-width: none;
        // -ms-overflow-style: none;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }

  .bottom {
    padding-bottom: 30rem;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 66666;

    .jd {
      padding: 10rem 10rem;
      display: flex;

      div {
        &:nth-child(1) {
          width: 10%;
        }

        &:nth-child(2) {
          position: relative;
          width: 77%;
          box-sizing: border-box;
          padding: 0 10rem;

          .p {
            position: absolute;
            top: 4rem;
            width: 95%;
            height: 6rem;
            border-radius: 6rem;
            background-color: rgb(193, 193, 193);
            display: flex;

            .s {
              position: absolute;
              top: 0;
              height: 6rem;
              width: 0%;
              border-radius: 6rem;
              background-color: gray;

              .yuan {
                position: absolute;
                top: -2rem;
                right: -8rem;
                height: 10rem;
                width: 10rem;
                border-radius: 50%;
                background-color: #fff;
              }
            }
          }

          input {
            width: 95%;
            opacity: 0;
            position: absolute;
            top: 0;
            z-index: 9999;
          }
        }

        &:nth-child(3) {
          margin-left: 10rem;
          width: 10%;
        }
      }
    }

    .pdlist {
      width: 100%;
      text-align: center;
      margin: 20rem 0;

      .model {
        position: absolute;

        top: -90rem;
        left: 39%;

        // height: 21rem;
        font-size: 17rem;
        background-color: gray;
        padding: 5rem 6rem;
        border-radius: 6rem;
      }

      .bbottom {
        margin-top: 20rem;
        display: flex;
        width: 100%;
        justify-content: space-around;
      }

      .none {
        display: none;
      }

      button {
        font-size: 20rem;
        color: white;
        display: inline-block;
        // margin: 20rem;
        background-color: transparent;
        border: 0;
      }

      .ms {
        width: 22rem;
      }

      // .xianlist {
      //   text-align: left;
      //   padding: 10rem;
      //   min-height: 50vh;
      //   max-height: 80vh;
      //   // overflow: hidden;
      //   overflow-y: auto;
      //   background-color: rgb(84, 72, 72);
      //   position: absolute;
      //   width: 90%;
      //   bottom: 90rem;
      //   left: 5%;
      //   border-radius: 10rem;
      //   div {
      //     &.active {
      //       color: red;
      //     }
      //   }

      // }
      position: relative;

      .paly {
        background-color: transparent;
        border: 0;
        position: relative;
        top: 2rem;
        left: 1rem;
      }

      canvas {
        position: absolute;
        top: 10rem;
        left: 43.6%;
        z-index: -9999;
      }

      .ruan {
        z-index: -9999;
        width: 55rem;
        height: 55rem;
        display: inline-block;
        border-radius: 50%;
        border: 1rem solid rgb(255, 255, 255);
        position: absolute;
        top: -12rem;
        left: 43%;
      }
    }
  }

  .after {
    content: "";
    display: block;
    position: absolute;
    // background-color: rgba(186, 178, 178, 0.442);
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -2;

    &::after {
      content: "";
      display: block;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.51);
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }
}

#app .songplay {
  opacity: 0 !important;
}
</style>