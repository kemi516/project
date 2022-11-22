<template>
  <div :class="{ 'video-max-div': videoType, 'max-box': true }">
    <div v-if="!videoType">
      <!-- 头像部分 -->
      <div class="title">
        <figure class="head">
          <img class="imgs" v-lazy="bigCard?.resource?.creator?.avatar" alt="">
          <!-- <figure v-lazy:background-image="bigCard?.resource?.creator?.avatar" class="head"> -->
          <img v-if="bigCard?.resource.creator?.author_type == 2" v-lazy="'image/xpcAll/O_1.png'" alt="" />
          <img v-if="bigCard?.resource.creator?.author_type == 1" class="one" v-lazy="'image/xpcAll/nV.png'" alt="" />
        </figure>
        <p>
          <span>{{ bigCard?.resource.creator.username }}</span>
          <img v-if="bigCard?.resource.creator?.vip_status == 1" v-lazy="'image/xpcAll/mq.png'" alt="" />
          <img v-if="bigCard?.resource.creator?.vip_flag == 3" class="svip" v-lazy="'image/xpcAll/2h.png'" alt="" />
        </p>
        <span v-lazy:background-image="'image/xpcAll/u5.png'" @click.stop="$store.commit('shareStateUpdate')">
        </span>
      </div>
      <!-- 标题 -->
      <h4>{{ bigCard?.resource?.title }}</h4>
      <!-- banner -->
      <figure v-lazy:background-image="bigCard?.resource?.cover"></figure>
      <!-- 底部查看 -->
      <p><span>立即查看</span></p>
    </div>

    <div v-if="videoType" ref="videoDiv" @click.stop="videoDetails">
      <ul class="author" v-if="bottomUser">
        <li v-for="(b, i) in bottomUser" :key="i">
          <div v-if="i < 1">
            <figure v-lazy:background-image="b?.userinfo?.avatar" class="head">
              <img v-if="b?.userinfo?.author_type == 2" v-lazy="'image/xpcAll/O_1.png'" alt="" />
              <img v-if="b?.userinfo?.author_type == 1" class="one" v-lazy="'image/xpcAll/nV.png'" alt="" />
            </figure>
            <p>
              <span>{{ b?.userinfo.username }}</span>
              <img v-if="b?.userinfo.vip_status == 1" v-lazy="'image/xpcAll/mq.png'" />
              <img v-if="bigCard.creator?.vip_flag == 3" class="svip" v-lazy="'image/xpcAll/2h.png'" />
              <span v-if="b?.role?.length <= 4" class="role">
                {{ b?.role }}</span>
            </p>
          </div>
        </li>
        <p v-if="bottomUser?.length > 2">
          和其他{{ bottomUser?.length - 1 }}人
        </p>
        <span class="is-active" v-show="!atten" @click.stop="atten = !atten">+ 关注</span>
        <span class="is-active" v-show="atten" :style="{ color: atten && '#999' }"
          @click.stop="atten = !atten">已关注</span>
        <figure v-lazy:background-image="'image/xpcAll/u5.png'" @click.stop="$store.commit('shareStateUpdate')"
          class="sandian"></figure>
      </ul>
      <!-- 标题 -->
      <h4>{{ bigCard?.title }}</h4>
      <!-- 视频 -->
      <div class="video">
        <!-- 图片 -->
        <img :class="{ isHidden: !isPlay }" v-if="bigVideo?.cover" v-lazy="bigVideo?.cover" alt="" />
        <figure v-show="isPlay">
          <img v-if="bigCard.resource.badge == 'vmovier'" v-lazy="'image/xpcAll/N1.png'" />
          <img v-if="bigCard.resource.badge == 'recommend'" v-lazy="'image/xpcAll/vz.png'" />
        </figure>
        <div class="number" v-show="isPlay">
          <i v-show="isFail" style="color: #fff; margin-right: 12rem; font-size: 12rem">加载失败！</i>
          <van-loading v-show="isLodingVideo" class="loding" style="" color="#fff" size="12rem" />
          <span>{{
          bigCard.resource.count?.count_view | matrixing
          }}
            观看&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span>
            {{
            ("" + (bigCard.resource.duration / 60).toFixed(0)).padStart(
            2,
            "0"
            )
            }}'{{
            ("" + (bigCard.resource.duration % 60).toFixed(0)).padStart(
            2,
            "0"
            )
            }}"
          </span>
        </div>
        <!-- 声音 -->
        <span class="voice" @click.stop="mutedState = true" v-show="!isPlay && !mutedState && !anewState"
          v-lazy:background-image="'image/xpcAll/5j.png'"></span>
        <span class="voice" @click.stop="mutedState = false" v-show="!isPlay && mutedState && !anewState"
          :style="`background-image:url('image/xpcAll/9O1.png');`"></span>
        <!-- 底部进度 -->
        <p class="bar" :style="{ width: videoBar }" v-show="!isPlay && !anewState"></p>
        <!-- 重播 -->
        <div class="anew" v-show="anewState && !isPlay">
          <h3 @click.stop="
            anewState = false;
            $refs.video.currentTime = 0;
            $refs.video.play();
          ">
            <figure v-lazy:background-image="'image/xpcAll/uv.png'"></figure>
            重播
          </h3>
          <ul>
            <li>
              <figure v-lazy:background-image="'image/xpcAll/sl.png'"></figure>
            </li>
            <li>
              <figure v-lazy:background-image="'image/xpcAll/Bh.png'"></figure>
            </li>
            <li>
              <figure v-lazy:background-image="'image/xpcAll/Az.png'"></figure>
            </li>
            <li>
              <figure v-lazy:background-image="'image/xpcAll/7o1.png'"></figure>
            </li>
            <li>
              <figure v-lazy:background-image="'image/xpcAll/fc.png'"></figure>
            </li>
            <li>
              <figure v-lazy:background-image="'image/xpcAll/Y6.png'"></figure>
            </li>
          </ul>
        </div>
        <!-- 视频 -->
        <video v-if="bigVideo?.cover" :muted="!mutedState" ref="video" class="vvv" :autoplay="!isPlay"
          @ended="anewState = true" @timeupdate="currentTime = $refs.video?.currentTime" :src="
            bigVideo?.resource?.progressive[
              bigVideo?.resource?.progressive?.length - 1
            ].url
          " @playing="playingState" @waiting="ddd" @abort="isLose" @canplay="canBoFan()" preload="metadata"></video>
      </div>
      <!-- 底部查看 -->
      <div class="bottom-count">
        <!-- 收藏 -->
        <figure @click.stop="
          collect = !collect;
          collect
            ? bigCard.resource.count.count_collect++
            : bigCard.resource.count.count_collect--;
        ">
          <img v-show="!collect" v-lazy="'image/xpcAll/28.png'" alt="" />
          <img v-show="collect" v-lazy="'image/xpcAll/M5.png'" alt="" />
          <span :style="{ color: collect ? '#facc15' : '#5d5d5d' }">{{
          bigCard.resource.count?.count_collect | matrixing
          }}</span>
        </figure>

        <!-- 评论 -->
        <figure @click.stop="videoDetails(1)">
          <img v-lazy="'image/xpcAll/Gl.png'" alt="" />
          <span style="color: #5d5d5d">{{
          bigCard.resource.count?.count_comment | matrixing
          }}</span>
        </figure>

        <!-- 赞 -->
        <figure @click.stop="
          zan = !zan;
          zan
            ? bigCard.resource.count.count_like++
            : bigCard.resource.count.count_like--;
        ">
          <img v-show="!zan" v-lazy="'image/xpcAll/gR.png'" alt="" />
          <img v-show="zan" v-lazy="'image/xpcAll/3C1.png'" alt="" />
          <span :style="{ color: zan ? '#e84f3f' : '#5d5d5d' }">{{
          bigCard.resource.count?.count_like | matrixing
          }}</span>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    uiBigCard: Object,
    tabsActiveIndex: Number,
  },
  data() {
    return {
      bigCard: this.uiBigCard?.children
        ? this.uiBigCard?.children[0].model
        : this.uiBigCard.data,
      // bigCard: this.uiBigCard?.data,
      videoType: this.uiBigCard?.children
        ? !(this.uiBigCard?.children[0]?.model?.resource.ad_type == "image")
        : true,
      // 视频data
      videoSrc: null,
      bigVideo: null,
      isPlay: true,
      mutedState: false,
      currentTime: 0,
      anewState: false,
      bottomUser: null,
      zan: false,
      collect: false,
      atten: false,
      isLodingVideo: false,
      isFail: false,
    };
  },
  mounted() {
    addEventListener("scroll", this.scrollAddEvent);
  },
  created() {
    // console.log(this.uiBigCard);
    // 开启声音
    this.mutedState = true;
    if (this.videoType && this.bigCard.resource.vid) {
      let a = this.bigCard.resource.vid;
      let b = `/media/${a}`;
      this.axios(b).then((res) => {
        this.bigVideo = res?.data?.data;
      });
      this.bottomUser = [
        this.bigCard.resource.author,
        ...(this.bigCard.resource.team
          ? this.bigCard.resource.team.filter(
            (e) => e?.userinfo.vip_status == 1
          )
          : []),
      ];
    }
  },
  computed: {
    ...mapState(["recomUl", "tabsActive", "isToMedia"]),
    videoBar() {
      return (this.currentTime / this.$refs.video?.duration) * 100 + "%";
    },
  },
  methods: {
    scrollAddEvent() {
      try {
        if (this.videoType && this.tabsActiveIndex == this.tabsActive) {
          clearTimeout(this.time);
          this.time = setTimeout(() => {
            let cha = this.$refs.videoDiv?.offsetTop - window.scrollY;
            if (cha > 0 && cha < this.$refs.videoDiv?.clientHeight) {
              this.isLodingVideo = true;
            } else {
              this.isLodingVideo = false;
            }
            // console.log('cah',cha,'inh',innerHeight,'hei',this.$refs.videoDiv?.clientHeight);
            if (!this.anewState) {
              this.canBoFan();
              // if (cha > 0 && cha < innerHeight && cha < this.$refs.videoDiv?.clientHeight && this.$refs.video?.readyState > 2) {
              //   this.$refs.video?.play();
              //   this.isPlay = false;
              // } else if (this.$refs?.video?.pause && this.$refs.video?.readyState > 2) {
              //   // console.log(this.$refs.video?.readyState);
              //   this.$refs.video?.pause();
              //   this.isPlay = true;
              //   this.isLodingVideo = false;
              // }
            }
          }, 200);
        } else {
          this.isPlay = true;
          this.isLodingVideo = false;
        }
      } catch (error) {
        console.log("bigcard又报错啦");
      }
    },
    playingState(n) {
      n;
      // console.log(123, n);
      this.isLodingVideo = false;
      this.isPlay = false;
    },
    ddd() {
      // console.log(this.$refs.video?.readyState);
      // console.log("正在缓存");
      this.isLodingVideo = true;
      this.isPlay = true;
    },
    isLose() {
      this.isFail = true;
      this.isLodingVideo = false;
      this.play = true;
      console.log("加载失败");
    },
    canBoFan() {
      // console.log(this.$refs.videoDiv?.clientHeight);
      // let innerHeight = window.innerHeight - 95 - this.$refs.videoDiv?.clientHeight;
      // console.log(this.$refs.videoDiv?.offsetTop);
      // console.log(window.scrollY);
      let cha = this.$refs.videoDiv?.offsetTop - window.scrollY;
      if (
        this.tabsActive == this.tabsActiveIndex &&
        cha > 0 &&
        cha < this.$refs.videoDiv?.clientHeight &&
        this.$refs.video?.readyState > 2
      ) {
        this.$refs.video?.play();
        this.isPlay = false;
      } else {
        this.$refs.video?.pause();
        this.isPlay = true;
      }
    },
    videoDetails(n) {
      // console.log("xxx");
      this.$router.push({
        path: "/media",
        query: {
          // data: JSON.stringify(this.bigCard),
          id: this.bigCard.resource.id,
          video: JSON.stringify(this.bigVideo),
          time: this.currentTime,
          commentIndex: n == 1 ? true : false,
        },
      });
    },
  },
  watch: {
    tabsActive(n) {
      if (n == this.tabsActiveIndex) {
        clearTimeout(this.time);
        this.time = setTimeout(() => {
          let innerHeight =
            window.innerHeight - 95 - this.$refs.videoDiv?.clientHeight;
          let cha = this.$refs.videoDiv?.offsetTop - window.scrollY;
          if (!this.anewState) {
            if (
              cha > 0 &&
              cha < innerHeight &&
              cha < this.$refs.videoDiv?.clientHeight &&
              this.$refs.video?.readyState > 3
            ) {
              this.$refs.video?.play();
              this.isPlay = false;
            } else if (
              this.$refs?.video?.pause &&
              this.$refs.video?.readyState > 3
            ) {
              // console.log(this.$refs.video?.paused);
              this.$refs.video?.pause();
              this.isPlay = true;
            }
          }
        }, 200);
      } else if (
        !this.$refs.video?.paused &&
        this.$refs.video?.readyState > 3
      ) {
        this.$refs.video?.pause();
      }
    },
    isToMedia(n) {
      console.log("监听到变化啦", this.tabsActive == this.tabsActiveIndex);
      if (this.tabsActive == this.tabsActiveIndex && n && !this.isPlay) {
        console.log("进到里面啦");
        this.$refs.video?.pause();
        this.isPlay = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
div {
  width: 100%;
  overflow: hidden;
  background-color: white;

  &.max-box {
    border-radius: 10rem;
  }

  &.video-max-div {
    margin: 10rem 0;
  }

  div {
    width: 100%;

    >.title {
      width: 100%;
      display: flex;
      padding: 0 10rem;
      position: relative;
      align-items: center;



      figure {
        width: 35rem;
        height: 35rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 50%;
        margin-right: 5rem;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        flex-shrink: 0;
        border: 1rem solid #999;

        >img {
          width: 10rem;
          height: 10rem;
          margin-right: 3.5rem;
          margin-bottom: 0rem;
          display: block;
          border-radius: 50%;
          border: 1rem solid #fff;
          // background-color: white;

          &.one {
            margin-right: 3rem;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 1;

          }
        }

        .imgs {
          position: relative;
          left: 16rem;
          // z-index: -1;
          width: 100%;
          flex-shrink: 0;
          height: 100%;

          img {
            width: 100%;
          }
        }
      }

      >p {
        font-size: 12rem;
        display: flex;
        white-space: nowrap;
        flex-shrink: 1;

        span {
          flex-shrink: 0;
          font-size: 14rem;
          color: #888;

          &:first-child {
            display: inline-block;
            flex-shrink: 1;
          }

          &.role {
            color: #a3a3a3;
            display: inline-block;
            flex-shrink: 0;
          }
        }

        img {
          flex-shrink: 0;
          flex-shrink: 0;
          display: block;
          margin: 0 5rem;
          width: 13rem;
          height: 10rem;

          &.svip {
            margin: 2rem 5rem 0;
            width: 38rem;
            height: 15rem;
            border-radius: 3rem;
          }
        }
      }

      >span {
        display: block;
        width: 3rem;
        height: 20rem;
        background-position: top;
        background-repeat: no-repeat;
        // background-color: lightblue;
        background-size: 12%;
        padding: 0 10rem;
        position: absolute;
        right: 5rem;
        top: 20rem;
      }
    }

    >h4 {
      margin: 0rem 15rem 10rem;
      font-size: 14rem;
      // letter-spacing: 1rem;
    }

    >figure {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 200rem;
    }

    >p {
      width: 100%;
      padding: 15rem 10rem;
      font-size: 12rem;
      color: #888;
    }

    .video {
      height: 200rem;
      position: relative;
      border-radius: 2rem;
      overflow: hidden;

      >video.vvv {
        object-fit: cover;
        height: 100%;
      }

      >img {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        transition: all 0.3s;
        opacity: 1;
        object-fit: cover;
        height: 100%;

        &.isHidden {
          opacity: 0;
        }
      }

      >figure {
        position: absolute;
        z-index: 0;
        left: 15rem;
        top: 15rem;

        >img {
          width: 30rem;
          height: 30rem;
        }
      }

      .number {
        position: absolute;
        text-align: right;
        background-color: transparent;
        color: white;
        z-index: 10;
        font-size: 12rem;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.184);
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 8rem 15rem;

        >.loding {
          background-color: transparent;
          width: 20rem;
          margin: 0;
          padding: 0;
          margin-bottom: 1rem;
          margin-right: 10rem;
        }
      }

      .voice {
        position: absolute;
        width: 20rem;
        height: 20rem;
        left: 15rem;
        bottom: 15rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 1;
      }

      .anew {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 10rem;

        h3 {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          margin: 10rem 0;
          font-size: 14rem;
          letter-spacing: 2rem;

          figure {
            width: 30rem;
            height: 30rem;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 80%;
            margin: 0 10rem;
          }
        }

        ul {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20rem 0;

          li {
            width: 36rem;
            height: 36rem;
            background-color: #f0f8ff19;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            figure {
              width: 18rem;
              height: 18rem;
              background-position: center;
              background-repeat: no-repeat;
              background-size: 80%;
            }
          }
        }
      }

      .bar {
        position: absolute;
        bottom: 0rem;
        left: 0;
        height: 2px;
        background-color: red;
        padding: 0;
        margin: 0;
      }

      >video {
        display: block;
        width: 100%;
      }
    }

    .author {
      // margin: 0 15rem;
      width: 100%;
      padding: 10rem 80rem 10rem 15rem;
      box-sizing: border-box;
      display: flex;
      justify-content: start;
      align-items: center;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      // background-color: lightblue;
      .is-active {
        color: red;
        font-size: 14rem;
        margin: 0 10rem;
        position: absolute;
        right: 30rem;
      }

      .sandian {
        position: absolute;
        right: 10rem;
        width: 3rem;
        height: 16rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 3rem 90%;
        padding: 0 10rem;
      }

      overflow: hidden;

      >li {
        margin-right: 2rem;
        overflow: hidden;

        div {
          display: flex;
          align-items: center;
          justify-content: start;
          overflow: hidden;

          figure {
            width: 40rem;
            height: 40rem;
            border: 1px solid #999;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 50%;
            margin-right: 5rem;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            flex-shrink: 0;

            >img {
              width: 10rem;
              height: 10rem;
              margin-right: 3.5rem;
              margin-bottom: 0rem;
              display: block;
              border-radius: 50%;
              border: 1rem solid #fff;
              background-color: white;

              &.one {
                margin-right: 3rem;
                margin-bottom: 1.5rem;
              }
            }
          }

          p {
            font-size: 12rem;
            color: #333;
            display: flex;
            white-space: nowrap;
            flex-shrink: 1;
            overflow: hidden;
            text-overflow: ellipsis;

            span {
              flex-shrink: 0;
              font-size: 12rem;
              color: #333;

              &:first-child {
                display: inline-block;
                flex-shrink: 1;
              }

              &.role {
                color: #a3a3a3;
                display: inline-block;
                flex-shrink: 0;
              }
            }

            img {
              flex-shrink: 0;
              display: block;
              margin: 0 5rem;
              width: 13rem;
              height: 10rem;

              &.svip {
                margin: 2rem 5rem 0;
                width: 38rem;
                height: 15rem;
                border-radius: 3rem;
              }
            }
          }
        }
      }

      p {
        font-size: 12rem;
        letter-spacing: 2rem;
      }
    }

    .bottom-count {
      display: flex;
      align-items: center;
      justify-content: space-around;

      >figure {
        display: flex;
        align-items: center;
        height: 45rem;

        img {
          width: 18rem;
          height: 18rem;
          margin: 0 5rem;
          display: block;
          margin-top: -3rem;
        }

        span {
          font-size: 14rem;
        }
      }
    }
  }
}
</style>
