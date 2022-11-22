<template>
  <div class="media">

    <!-- <keep-alive> -->
    <router-view></router-view>

    <!-- </keep-alive> -->
    <!-- 倍数 -->
    <van-share-sheet @select="MoM()" @share-sheet-title-color="&quot;red&quot;;" v-model="showShare" title="请选择倍速"
      :options="options" />
    <div class="media-content">
      <!-- 弹窗内容 -->
      <van-popup v-if="data?.resource?.award" class="popup" v-model="awardShow">
        <div ref="awardRef">
          <div class="top">
            <figure style="background-image: url('image/xpcAll/D3.png')"></figure>
            <h4>获奖信息</h4>
          </div>
          <div class="content">
            <p>
              {{ data?.resource?.award }}
            </p>
          </div>
        </div>
      </van-popup>

      <!-- 视频 模块-->
      <div :class="{ 'is-show': isShowControl || anewState, video: true }" @click.stop="clickVideo">
        <!-- 图片 -->
        <figure :class="{ 'is-hidden': isPlay || !showImage }" @click.stop="" v-if="video?.cover"
          :style="`background-image:url(${data?.resource?.cover})`"></figure>
        <!-- 重播 -->
        <div class="anew" v-show="anewState" @click.stop="">
          <h3 @click.stop="
            anewState = false;
            $refs.video.play();
            isPlay = true;
            showImage = false;
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
              <figure v-lazy:background-image="'image/xpcAll/fc.png'"></figure>
            </li>
            <li>
              <figure v-lazy:background-image="'image/xpcAll/Y6.png'"></figure>
            </li>
          </ul>
        </div>
        <!-- 视频 controls-->
        <video ref="video" autoplay @ended="
          anewState = true;
          isPlay = false;
          showImage = true;
        " :muted="isMute" :src="
          video?.resource?.progressive[
            video?.resource?.progressive?.length - 1
          ].url
        " @timeupdate="updateVideoTime" @canplay="
          isPlay = true;
          showImage = false;
        " preload="metadata" x5-video-orientation="landscape"></video>
        <!-- 底部进度 -->
        <div class="bar" v-show="!isShowControl">
          <p :style="{
            width: `${
              $refs.video?.duration
                ? (planTime / $refs.video?.duration) * 100
                : 0
            }%`,
          }"></p>
          <p :style="{ width: `${videoBuffer}%` }"></p>
        </div>
        <!-- 控制器 顶部-->
        <div :class="{
          'video-top': true,
          'is-show': !isShowControl && !anewState,
        }">
          <figure @click.stop="$router.back()" :style="'background-image: url(image/xpcAll/Mg.png);'"></figure>
          <figure @click.stop="$store.commit('shareStateUpdate')"
            :style="' background-image: url(image/xpcAll/i41.png);'"></figure>
        </div>
        <!-- 第二个视频 -->
        <!-- <div v-show="videoTwo" class="video-two"> -->
        <div v-show="false" class="video-two">
          <video ref="videoTwo" muted :src="
            video?.resource?.progressive[
              video?.resource?.progressive?.length - 1
            ].url
          " preload="metadata"></video>
          <div class="video-time">
            <span v-if="$refs?.video?.currentTime">{{ ((planTime / 60).toFixed(0) + "").padStart(2, "0") }}:{{
            ((planTime % 60).toFixed(0) + "").padStart(2, "0")
            }}</span>
            <span v-else>00:00</span>
            /
            <span v-if="$refs?.video?.duration">{{
            (($refs?.video?.duration / 60).toFixed(0) + "").padStart(
            2,
            "0"
            )
            }}:{{
              (($refs?.video?.duration % 60).toFixed(0) + "").padStart(2, "0")
              }}</span>
            <span v-else>00:00</span>
          </div>
        </div>
        <!-- 控制器 底部-->
        <div :class="{
          'video-bottom': true,
          'is-show': !isShowControl || anewState,
        }">
          <div class="plan">
            <span v-if="$refs?.video?.currentTime">{{ ((planTime / 60).toFixed(0) + "").padStart(2, "0") }}:{{
            ((planTime % 60).toFixed(0) + "").padStart(2, "0")
            }}</span>
            <span v-else>00:00</span>
            <div class="plan-content">
              <div class="bar" v-show="true">
                <p :style="{
                  width: `${
                    $refs.video?.duration
                      ? (planTime / $refs.video?.duration) * 100
                      : 0
                  }%`,
                }"></p>
                <p :style="{ width: `${videoBuffer}%` }"></p>
              </div>
              <label>
                <input type="range" @change="
                  videoTwo = false;
                  $refs.video.currentTime = $event.target.value;
                  clearTime();
                " @input="
                  $refs.videoTwo.currentTime = $event.target.value;
                  videoTwo = true;
                " v-model="planTime" :max="$refs.video?.duration" />
              </label>
            </div>
            <span v-if="$refs?.video?.duration">{{
            (($refs?.video?.duration / 60).toFixed(0) + "").padStart(
            2,
            "0"
            )
            }}:{{
              (($refs?.video?.duration % 60).toFixed(0) + "").padStart(2, "0")
              }}</span>
            <span v-else>00:00</span>
          </div>
          <div class="m-a">
            <span @click.stop="showShare = true">倍速</span>
            <figure :style="'background-image:url(image/xpcAll/-S.png)'"></figure>
          </div>
        </div>
        <!-- 播放按钮 -->
        <figure class="play-is" @click.stop="
          $refs.video?.play();
          isPlay = true;
          isShowControl = false;
        " v-show="!isPlay && isShowControl && !anewState" :style="'background-image:url(image/xpcAll/O1.png)'">
        </figure>
        <figure class="play-is" @click.stop="
          $refs.video?.pause();
          isPlay = false;
        " v-show="isPlay && isShowControl && !anewState" :style="'background-image:url(image/xpcAll/rW.png)'">
        </figure>
      </div>

      <!-- 评论插件部分 -->
      <van-tabs ref="plNumber" class="home-media" v-model="swiperActive" @click="updateTabs">
        <van-tab title="简介"></van-tab>
        <van-tab :title="`评论 `"></van-tab>
        <!-- <div class="number-pl">16</div> -->
      </van-tabs>

      <!-- 主体部分 -->
      <div class="author-wd">
        <van-swipe class="my-swipe" :loop="false" @change="updateSwiper" ref="swiper" :show-indicators="false"
          indicator-color="white">
          <!-- 简介 -->
          <!-- 简介 -->
          <van-swipe-item>
            <div class="intro-box">
              <!-- 标题 -->
              <h1>
                <figure v-if="data?.resource?.badge">
                  <img v-if="data?.resource?.badge == 'vmovier'" v-lazy="'image/xpcAll/N1.png'" />
                  <img v-if="data?.resource?.badge == 'recommend'" v-lazy="'image/xpcAll/vz.png'" />
                </figure>
                {{ data?.resource?.title }}
              </h1>
              <!-- 简介 标签类型-->
              <div class="intro-class">
                <span v-for="d in data?.resource?.categories" :key="d.name">{{ d?.category_name }}-{{
                d?.sub?.category_name }}</span>
                <span>{{
                new Date(data?.resource?.publish_time * 1000)
                .toLocaleDateString()
                .split("/")
                .map((e) => e.padStart(2, "0"))
                .join("-")
                }}</span>
                <span>{{
                data?.resource?.count.count_view | matrixing
                }}次播放</span>
              </div>
              <!-- 简介内容 -->
              <div ref="shou" :class="{ 'intro-content': true, 'intro-shou': shou }">
                {{ data?.resource?.content }}
                <span v-if="shou" @click.stop="shou = false">展开</span>
              </div>
              <!-- 获奖 -->
              <div class="award" v-if="data?.resource?.award">
                <figure style="background-image: url('image/xpcAll/D3.png')"></figure>
                <p>{{ data?.resource?.award }}</p>
                <figure @click.stop="awardShow = true" style="background-image: url('image/xpcAll/jv.png')"></figure>
              </div>
              <!-- ////////////////////////////// -->
              <!-- 爱心-收藏-分享 -->
              <!-- 点赞 -->
              <ul class="idea">
                <li>
                  <!-- @click="like = !like; data.resource?.count.count_like++; "  -->
                  <figure v-show="zan.findIndex(e=>e.id == data?.resource.id) ==-1"
                    @click.stop="add('like',0,data?.resource.id)"
                    :style="`background-image:url('image/xpcAll/bn.png')`">
                  </figure>
                  <!-- @click="like = !like; data.resource?.count.count_like--;"  -->
                  <figure v-show="zan.findIndex(e=>e.id == data?.resource.id) !=-1" @click.stop="add('like',-1)"
                    :style="`background-image:url('image/xpcAll/j0.png')`">
                  </figure>
                  <span
                    :style=" { color: zan.findIndex(e=>e.id == data?.resource.id) !=-1 ? '#e84f3f' : '#5d5d5d' }">{{data?.resource?.count.count_like
                    |
                    matrixing}}</span>
                </li>
                <!-- 收藏 -->
                <li>
                  <!-- @click="collect = !collect; data.resource.count.count_collect++; " -->
                  <figure v-show="fav.findIndex(e=>e.id == data?.resource.id) ==-1"
                    @click.stop="add('collect',0,data?.resource.id)"
                    :style="`background-image:url('image/xpcAll/xa.png')`"></figure>
                  <!-- @click=" collect = !collect;data.resource?.count.count_collect--; " -->
                  <figure v-show="fav.findIndex(e=>e.id == data?.resource.id) !=-1" @click.stop="add('collect',-1)"
                    :style="`background-image:url('image/xpcAll/vp.png')`"></figure>
                  <span :style="{ color: fav.findIndex(e=>e.id == data?.resource.id) !=-1 ? '#f4af26' : '#5d5d5d' }">{{
                  data?.resource?.count.count_collect | matrixing
                  }}</span>
                </li>
                <!-- 分享 -->
                <li @click.stop="$store.commit('shareStateUpdate')">
                  <figure :style="`background-image:url('image/xpcAll/uN.png')`"></figure>
                  <span :style="{ color: false ? '#e84f3f' : '#5d5d5d' }">{{
                  data?.resource?.count.count_share | matrixing
                  }}</span>
                </li>
                <li v-if="data?.resource?.user_permission?.download_status" class="download"
                  @click.stop="$store.commit('shareStateUpdate')">
                  <figure :style="`background-image:url('image/xpcAll/_l1.png')`"></figure>
                  <span :style="{ color: '#5d5d5d' }">下载</span>
                  <img v-if="!data?.resource?.user_status?.is_approved" :src="`image/xpcAll/YD.png`" alt="" />
                </li>
              </ul>
              <!-- 标签2 -->
              <div v-if="video?.keywords" :class="{ 'intro-tag': true }">
                <div ref="tagRef" :class="{ active: !introTag && isShowTag }">
                  <span v-for="(k, i) in video?.keywords" :key="i">{{
                  k
                  }}</span>
                </div>
                <figure @click.stop="introTag = true" v-show="!introTag && isShowTag"
                  style="background-image: url('image/xpcAll/QO3.png')"></figure>
                <figure @click.stop="introTag = false" v-show="introTag && isShowTag"
                  style="background-image: url('image/xpcAll/N31.png')"></figure>
              </div>
              <div class="composer" v-if="data?.resource?.author">
                <h4>创作人</h4>
                <ul @touchmove.stop="">
                  <HomeMediaLi :t="data?.resource?.author"></HomeMediaLi>
                  <HomeMediaLi v-for="t in data?.resource.team" :key="t.userinfo.id" :t="t"></HomeMediaLi>
                </ul>
              </div>
              <!-- 相关视频 -->
              <div v-if="ellaKoon" class="ella-koon">
                <h4>相关视频</h4>
                <ul>
                  <li v-for="t in ellaKoon" :key="t.id" v-show="!t.name" @click.stop="updateRouter({ resource: t })">
                    <HomeTabsXGLi :t="t"></HomeTabsXGLi>
                  </li>
                </ul>
              </div>
            </div>
          </van-swipe-item>
          <!-- 评论 -->
          <!-- 评论 -->
          <van-swipe-item @scroll="comentScroll">
            <van-loading v-show="isSwiperTwoLoding" color="#ee0a24" size="30rem" class="swiper-loding" />
            <div v-if="commentNumber == 0" class="empty">
              <img src="image/xpcAll/T41.png" alt="" />
              <p>还没有人评论</p>
            </div>
            <ul v-if="composerArr && commentNumber != 0" ref="comentUl">
              <HomeMediaCommentLi v-for="(m, i) in commentArr" :key="i" :mm="m" :composerArr="composerArr">
              </HomeMediaCommentLi>
              <li v-if="commentArr?.length !== commentNumber" style="
                  display: flex;
                  justify-content: center;
                  border-bottom: none;
                ">
                <van-loading color="#e64a3a" />
              </li>
              <li v-if="commentArr?.length == commentNumber" style="border-bottom: none">
                <p style="
                    color: #999;
                    text-align: center;
                    width: 100%;
                    font-size: 12rem;
                    margin-top: 15rem;
                  ">
                  到底啦！
                </p>
              </li>
            </ul>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import HomeMediaLi from "./HomeMediaLi.vue";
import HomeMediaCommentLi from "./HomeMediaCommentLi.vue";
import HomeTabsXGLi from "./HomeTabsXGLi.vue";
import { Toast } from 'vant';
export default {
  data() {
    return {
      data: null,
      video: null,
      videoBuffer: 0,
      videoCurrentTime: 0,
      planTime: 0,
      videoTwo: false,
      isPlay: false,
      isShowControl: false,
      anewState: false,
      showShare: false,
      showImage: true,
      swiperActive: 0,
      options: [
        [{ name: "0.5X" }],
        [{ name: "1.0X" }],
        [{ name: "1.25X" }],
        [{ name: "1.5X" }],
        [{ name: "2.0X" }],
      ],
      videos: false,

      activeNames: ["1"],
      shou: false,
      introTag: false,
      isShowTag: false,
      awardShow: false,
      isMute: false,
      isAxiosOk: true,
      isSwiperTwoLoding: true,
      commentNumber: 0,
      commentArr: null,
      composerArr: null,
      pageIndex: 2,
      isScrollAxiosOk: false,
      ellaKoon: null,
      id: this.$route.query.id,
      zan: JSON.parse(localStorage.getItem('zan')) || [],
      fav: JSON.parse(localStorage.getItem('fav')) || [],

    };
  },

  created() {
    // 视频声音
    // this.mutedState = true;
    // 数据
    // let aa = JSON.parse(this.$route.query.data);

    this.routerUpsdate()

    // console.log(aa);


  },


  beforeRouteUpdate(to, from, next) {
    next();
    this.$store.commit("updateKey");
  },


  mounted() {

    setTimeout(() => {
      try {
        if (this.$refs.shou.offsetHeight > (window.innerWidth / 375) * 96) {
          this.$refs.shou.style =
            "height:" +
            this.$refs.shou.offsetHeight / (window.innerWidth / 375) +
            "rem;";
          this.shou = true;
        }
      } catch (e) {
        e;
      }
    }, 0);
  },
  methods: {
    onSelect(option) {
      Toast(option.name);
      this.fshowShare = false;
    },
    routerUpsdate() {
      this.axios.get(`https://apis.netstart.cn/xpc/article/${this.id}`).then((res => {

        let aa = { resource: res.data.data }
        // console.log({ resource: res.data.data })

        this.data = aa;
        if (aa.resource?.team?.length) {
          this.composerArr = [aa.resource?.author, ...aa.resource?.team];
        } else {
          this.composerArr = [aa.resource?.author];
        }
        // 获取视频
        if (!this.$route.query.video) {
          let a = aa.resource?.media_id;
          let b = `/media/${a}`;
          this.axios(b).then((res) => {
            this.video = res.data.data;
            // console.log(res);
            // console.log(this.$refs.shou.offsetHeight, (window.innerWidth / 375) * 96);
            setTimeout(() => {
              try {
                if (
                  this.$refs.tagRef.offsetHeight >
                  (window.innerWidth / 375) * 40
                ) {
                  this.isShowTag = true;
                  this.$refs.tagRef.style =
                    "height:" + this.$refs.tagRef.offsetHeight + "px;";
                }
              } catch (e) {
                e;
              }
            }, 0);
          });
        } else {
          // 拿去又有的视频
          this.video = JSON.parse(this.$route.query.video);
          this.isPlay = true;
          setTimeout(() => {
            this.$refs.video.currentTime = +this.$route.query.time;
            this.$refs.video.play();
            if (this.$route.query.commentIndex == "true") {
              this.swiperActive = 1;
              this.$refs.swiper.swipeTo(1);
            }
          }, 0);
        }

        // 请求相关视频
        this.axios(`xpc/article/${aa.resource?.id}/next`).then((res) => {
          //   console.log(res);
          this.ellaKoon = res.data.data.list;
        });
        this.$nextTick(() => {

          this.videos = true
        })
      }))
    },
    add(l, n, id) {
      if (l == 'like' && n >= 0) {
        this.zan = [...this.zan, { id, n: `${this.data.resource.count.count_like += n}` }]
        // this.like = !this.like;
        // this.data.resource.count.count_like += n
      }
      if (l == 'like' && n == -1) {

        this.zan = this.zan.filter(e => { e !== id })
        // this.like = !this.like;
        // this.data.resource.count.count_like += n
      }
      if (l == 'collect' && n >= 0) {
        // this.collect = !this.collect;
        // this.data.resource.count.count_collect += n
        this.fav = [...this.fav, { id, n: `${this.data.resource.count.count_collect += n}` }]
      }
      if (l == 'collect' && n == -1) {
        this.fav = this.fav.filter(e => { e.id !== id })
        // // console.log(this.fav)
        // this.collect = !this.collect;
        // this.data.resource.count.count_collect += n
      }
      // console.log(this.data.resource.count.count_collect += n)
    },
    updateVideoTime(e) {
      let v = e.target;
      this.videoBuffer = (v.buffered.end(0) / v.duration) * 100;
      if (!this.videoTwo) {
        this.planTime = v.currentTime;
      }
    },
    clickVideo() {
      this.isShowControl = !this.isShowControl;
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        if (this.isPlay && !this.videoTwo) {
          this.isShowControl = false;
        }
      }, 2300);
    },
    clearTime() {
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        if (this.isPlay && !this.videoTwo) {
          this.isShowControl = false;
        }
      }, 2300);
    },
    MoM() {
      let node = event.target.parentNode.parentNode.parentNode.children;
      node = [].slice.apply(node, [1, node.length - 1]);
      node.forEach((e) => {
        e;
        e.childNodes[0].childNodes[1].style = "color:#000;";
      });
      event.target.style = "color:red;";
      this.$refs.video.playbackRate = +event.target.innerText.slice(
        -Infinity,
        -1
      );
      this.showShare = false;
    },
    updateSwiper(index) {
      this.swiperActive = index;
    },
    updateTabs(index) {
      this.$refs.swiper.swipeTo(index);
    },
    comentScroll(e) {
      let zuiDaHeight =
        this.$refs.comentUl.offsetHeight - e.target.offsetHeight;
      if (
        this.commentArr.length < this.commentNumber &&
        e.target.scrollTop - zuiDaHeight > -200 &&
        this.isScrollAxiosOk
      ) {
        this.isScrollAxiosOk = false;
        this.axios("newstudios/comments", {
          params: {
            resource_id: this.data.resource?.id,
            page: this.pageIndex++,
          },
        })
          .then((res) => {
            this.commentArr.push(...res.data.data.list);
            setTimeout(() => {
              this.isScrollAxiosOk = true;
            }, 200);
          })
          .catch((res) => {
            res;
            setTimeout(() => {
              this.isScrollAxiosOk = true;
            }, 200);
          });
      }
    },
    updateRouter(n) {
      this.$router.push({ path: "/media", query: { id: n.resource.id } });
    },
  },
  watch: {
    fav(n) {
      localStorage.setItem('fav', JSON.stringify(n))
    },
    zan(n) {
      localStorage.setItem('zan', JSON.stringify(n))

    },
    // 监听路由是否变化
    // '$route': function (to, from) {
    //   if (to.query.id != from.query.id) {
    //     this.id = to.query.id; // 把最新id赋值给定义在data中的id
    //     // 重新调用加载数据方法
    //     console.log(this)
    //     this.routerUpsdate();
    //     this.videos = false
    //     this.$forceUpdate();
    //   }
    // },
    like(n) {
      // console.log(n)
      localStorage.setItem('Media-like', n);
      this.data.resource.count.count_like += n;
    },
    collect(n) {
      // console.log(n)
      localStorage.setItem('Media-collect', n);
      this.data.resource.count.count_collect += n;
    },

    swiperActive(n) {
      if (n === 1 && this.isAxiosOk) {
        this.isAxiosOk = false;
        this.axios("newstudios/comments", {
          params: {
            resource_id: this.data.resource?.id,
          },
        })
          .then((res) => {
            let node = document.querySelectorAll(
              ".van-tabs.home-media .van-tabs__wrap  .van-tabs__nav "
            )[0].childNodes[1].childNodes[0];
            let num = res.data?.data.total;
            this.commentNumber = num;
            node.innerHTML = `评论 <span style="color:red;">${num >= 10000
              ? num >= 100000000
                ? (num / 100000000).toFixed(1) + "e"
                : (num / 10000).toFixed(1) + "w"
              : num >= 1000
                ? (num / 1000).toFixed(1) + "k"
                : num
              }</span>`;
            this.isSwiperTwoLoding = false;
            this.commentArr = res.data?.data?.list;
            // console.log(res.data.data);
            setTimeout(() => {
              this.isScrollAxiosOk = true;
            }, 200);
          })
          .catch((res) => {
            this.isAxiosOk = true;
            console.log(res);
          });
      }
    },
  },
  components: { HomeMediaLi, HomeMediaCommentLi, HomeTabsXGLi },
};
</script>

<style lang="less">
.van-share-sheet__header {
  >h2 {
    color: #888;
  }
}

.van-share-sheet__options {
  justify-content: center;

  .van-share-sheet__option {
    >img {
      display: none;
    }

    >span {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: black;
      font-size: 14rem;
    }
  }

  &:nth-of-type(3) {
    >div {
      span {
        color: red;
      }
    }
  }
}

// tabs
.van-tabs.home-media {
  border-bottom: 1px solid rgb(223, 223, 223);
  position: relative;

  .number-pl {
    position: absolute;
    top: 14px;
    right: (25% - 7.5rem - 3px);
    color: red;
    font-size: 13px;
    font-family: system-ui;
  }

  .van-tabs__wrap {
    .van-tabs__nav {
      .van-tab--active.van-tab {
        span.van-tab__text {
          color: #333;
          font-size: 14px;
        }
      }

      .van-tab {
        span.van-tab__text {
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
@p15: 15rem;

// 内容
div.media {

  //   background-color: lightblue;
  .media-content {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .popup {
      width: 80%;
      height: 50%;
      border-radius: 10rem;
      background-color: white;
      padding: 15rem;
      overflow: hidden;

      >div {
        height: 100%;
        overflow: hidden;

        >.top {
          width: 100%;
          border-bottom: 1px solid #ddd;
          padding-bottom: 15rem;
          display: flex;

          >figure {
            width: 20rem;
            height: 20rem;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 90%;
          }

          >h4 {
            font-size: 14rem;
            letter-spacing: 2rem;
            color: #333;
            margin-left: 10rem;
          }
        }

        >.content {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;

          >p {
            white-space: pre-line;
            line-height: 32rem;
            font-size: 12rem;
            letter-spacing: 2rem;
          }
        }
      }
    }

    .video {
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
      width: 100%;
      z-index: 0;
      background-color: #000;

      >figure {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        transition: all 0.3s;
        opacity: 1;

        &.is-hidden {
          pointer-events: none;
          opacity: 0;
        }
      }

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.35);
        left: 0;
        top: 0;
        z-index: 2;
        opacity: 0;
        transition: all 0.3s;
      }

      &.is-show::after {
        opacity: 1;
      }

      >.anew {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 5;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: end;

        h3 {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 16rem;
          margin: 20rem 0;

          >figure {
            width: 40rem;
            height: 40rem;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 60%;
          }
        }

        ul {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 40rem;
          margin-bottom: 40rem;
          padding: 0 30rem;

          li {
            width: 40rem;
            height: 40rem !;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.129);

            >figure {
              width: 40rem;
              height: 100%;
              background-position: center;
              background-repeat: no-repeat;
              background-size: 40%;
            }
          }
        }
      }

      >video {
        width: 100%;
        height: 200rem;
        object-fit: contain;
        margin: 0;
        padding: 0;
        display: block;
      }

      >.bar {
        width: 100%;
        height: 2rem;
        background-color: rgba(240, 248, 255, 0.403);
        display: flex;
        justify-content: flex-start;
        position: absolute;
        bottom: 0;
        border-radius: 2rem;
        box-sizing: border-box;

        p {
          border-radius: 2rem;
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          position: absolute;
          height: 100%;
        }

        >p:first-child {
          z-index: 2;
          background-color: red;
        }

        >p:last-child {
          z-index: 1;
          background-color: rgba(255, 255, 255, 0.677);
        }
      }

      .video-top {
        position: absolute;
        width: 100%;
        padding: 0 12rem;
        height: 26rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        top: 11rem;
        left: 0;
        z-index: 5;
        transition: all 0.3s;

        &.is-show {
          top: -26rem;
        }

        >figure {
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          width: 26rem;
          height: 26rem;
        }
      }

      .video-two {
        position: absolute;
        left: 0;
        top: -30rem;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 50%;
        height: 50%;
        border-radius: 5rem;
        border: 1rem solid #fff;
        background-color: rgb(93, 93, 93);
        z-index: 10;
        box-sizing: border-box;

        >video {
          border-radius: 5rem;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        >.video-time {
          position: absolute;
          bottom: -30rem;
          left: 0;
          width: 100%;
          height: 30rem;
          font-size: 14rem;
          color: white;
          text-align: center;
          line-height: 30rem;

          span:last-child {
            color: #ddd;
          }
        }
      }

      .video-bottom {
        position: absolute;
        z-index: 3;
        bottom: 11rem;
        width: 100vw;
        padding: 0 12rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30rem;
        transition: all 0.3s;

        &.is-show {
          bottom: -35rem;
        }

        // background-color: lightblue;
        >.m-a {
          flex-shrink: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 30rem;
          height: 100%;

          >figure {
            flex-shrink: 0;
            width: 24rem;
            height: 24rem;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 70%;
            margin: 6rem 0 6rem 10rem;
          }

          >span {
            flex-shrink: 0;
            font-size: 13rem;
            display: flex;
            justify-content: center;
            // align-items: center;
            color: white;
          }
        }

        >.plan {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 1;
          width: 100%;

          span {
            display: block;
            white-space: nowrap;
            flex-shrink: 0;
            font-size: 12rem;
            color: white;

            &:first-child {
              margin-right: 10rem;
            }

            &:last-child {
              margin: 0 10rem;
            }
          }

          .plan-content {
            flex-shrink: 1;
            position: relative;
            width: 100%;
            box-sizing: border-box;

            >label {
              position: absolute;
              top: -5.5rem;
              left: -3rem;
              height: 10rem;
              width: calc(100% + 10px + 3rem);
              z-index: 2;
              display: block;

              >input {
                width: 100%;
                opacity: 0;
                height: 100%;
              }
            }

            >.bar {
              width: 100%;
              height: 2rem;
              background-color: rgba(240, 248, 255, 0.403);
              display: flex;
              justify-content: flex-start;
              position: absolute;
              bottom: 0;
              border-radius: 2rem;
              box-sizing: border-box;

              p {
                border-radius: 2rem;
                box-sizing: border-box;
                padding: 0;
                margin: 0;
                position: absolute;
                height: 100%;
              }

              >p:first-child {
                z-index: 2;
                background-color: red;
                position: relative;

                &::after {
                  content: "";
                  width: 8rem;
                  height: 10rem;
                  background-color: white;
                  position: absolute;
                  right: -4rem;
                  top: -4rem;
                  border-radius: 2rem;
                }
              }

              >p:last-child {
                z-index: 1;
                background-color: rgba(255, 255, 255, 0.677);
              }
            }
          }
        }
      }

      figure.play-is {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        width: 40rem;
        height: 40rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 80%;
        z-index: 5;
      }
    }

    .author-wd {
      flex-shrink: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;
      min-height: 200rem;

      >div {
        height: 100%;
      }

      // 轮播图
      .my-swipe {
        .van-swipe-item:first-child {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;

          &::-webkit-scrollbar {
            width: 0;
            height: 0;
          }

          font-size: 20px;

          >.intro-box {
            width: 100%;
            padding: @p15 0;

            >h1 {
              font-size: 19rem;
              line-height: 32rem;
              padding: 0 @p15;

              >figure {
                font-size: 0;
                display: inline-block;
                margin: 0;
                padding: 0;
                width: 30rem;
                height: 32rem;
                line-height: 32rem;

                >img {
                  margin-bottom: -3.5rem;
                  width: 25rem;
                  height: 25rem;
                  display: inline-block;
                }
              }
            }

            >.intro-class {
              margin: 10rem 0;
              padding: 0 @p15;

              >span {
                display: inline-block;
                font-size: 12rem;
                color: #999;
                margin-right: 30rem;
              }
            }

            >.intro-content {
              white-space: pre-line;
              font-size: 12rem;
              line-height: 24rem;
              color: #888;
              padding: 0 @p15;
              transition: all 0.3s linear;
              overflow: hidden;

              &.intro-shou {
                height: 96rem !important;
                position: relative;

                >span {
                  position: absolute;
                  right: 0;
                  padding-right: 30rem;
                  padding-left: 50rem;
                  bottom: 0;
                  // background-color: transparent;
                  background-image: linear-gradient(to left,
                      #fff 0 60%,
                      transparent 100%);
                  height: 24rem;
                  font-size: 13rem;
                  color: rgb(255, 72, 72);
                }
              }
            }

            >.award {
              width: 100%;
              padding: 15rem;
              display: flex;
              overflow: hidden;
              justify-content: space-between;
              align-items: center;

              >p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
                font-size: 12rem;
                padding: 0 15rem 0 8rem;
              }

              >figure {
                width: 20rem;
                height: 20rem;
                margin: 0;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 70%;

                &:last-child {
                  width: 20rem;
                  height: 20rem;
                }
              }
            }

            >ul.idea {
              display: flex;
              justify-content: space-around;
              align-items: center;
              width: 100%;
              margin: 0 0 20rem 0;
              padding: 0 @p15;

              li {
                width: 30rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 10rem 0;

                // justify-content: center;
                &:last-child {
                  >figure {
                    background-size: 70%;
                  }
                }

                >figure {
                  width: 30rem;
                  height: 30rem;
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: 80%;
                  margin: 5rem 0;
                }

                >span {
                  font-size: 12rem;
                }

                &.download {
                  position: relative;

                  >img {
                    width: 22rem;
                    position: absolute;
                    right: -5rem;
                    top: 12rem;
                  }
                }
              }
            }

            >.intro-tag {
              margin: 10rem 0;
              padding: 20rem @p15 5rem;
              border-top: 1px solid #eee;
              border-bottom: 1px solid #eee;
              // word-break:break-all;
              display: flex;

              >div {
                flex-shrink: 1;
                width: 100%;
                transition: all 0.3s;

                >span {
                  font-size: 12rem;
                  padding: 5rem 10rem;
                  border-radius: 1rem;
                  background-color: #f7f7f7;
                  color: #888;
                  margin-right: 15rem;
                  white-space: nowrap;
                  margin-bottom: 10rem;
                  display: inline-block;
                }

                &.active {
                  height: 30rem !important;
                  overflow: hidden;
                }

                //   background-color: lightcoral;
              }

              >figure {
                flex-shrink: 0;
                width: 20rem;
                height: 20rem;
                flex-shrink: 0;
                // background-color: lightblue;
                background-position: center;
                background-repeat: no-repeat;
                background-size: 80%;
              }
            }

            //   创造着
            .composer {
              background-color: #fdfdfd;

              >h4 {
                padding: @p15;
                font-size: 16rem;
              }

              >ul {
                padding: 0 15rem;

                &::-webkit-scrollbar {
                  width: 0;
                  height: 0;
                }

                width: 100%;
                display: flex;
                overflow-x: auto;
                overflow-y: hidden;
                padding: 0 @p15 30rem;
                border-bottom: 1rem solid rgb(240, 240, 240);
              }
            }

            // 相关视频
            >.ella-koon {
              >h4 {
                padding: 15rem;
                font-size: 14rem;
                font-weight: 600;
              }

              .con {
                margin: 0 15rem;
                margin-top: 5rem;
              }
            }
          }
        }

        .van-swipe-item:last-child {
          .swiper-loding {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          overflow-y: auto;
          overflow-x: hidden;
          height: 100%;

          &::-webkit-scrollbar {
            width: 0;
            height: 0;
          }

          >.empty {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            >img {
              width: 70rem;
              object-fit: cover;
            }

            >p {
              font-size: 18rem;
              margin: 20rem 0;
              color: #e5e5e5;
            }
          }

          >ul {
            padding: 15rem;
          }
        }
      }
    }
  }
}
</style>
