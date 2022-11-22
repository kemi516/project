<template>
  <div class="topic">
    <header>
      <i @click="$router.back()">
        <img src="image/xpcAll/75.png" alt="" />
      </i>
      {{ $route.query.title }}
    </header>

    <div class="container" v-for="(item, i) in currentTopic" :key="i">
      <div class="contop" @click="$router.push({ path: '/user', query: { id: item.user.id } })">
        <div class="left">
          <div class="limg">
            <img :src="`${item.user.avatar}?x-oss-process=image/resize,m_mfit,w_180`" alt="xx" />

            <img alt="" src="image/xpcAll/O_1.png" v-if="item.user.verify_description" />
          </div>
          <div class="username">
            <h6>{{ item.user.username }}</h6>
            <!-- <p>
              {{ new Date(item.uptime * 1000).getDate() }}
            </p> -->
            <p>
              {{
              Math.floor(
              (Math.floor(Date.now() / 1000) - Math.floor(item.addtime)) /
              3600
              ) > 24
              ? new Date(item.uptime * 1000).getMonth() +
              1 +
              "-" +
              new Date(item.uptime * 1000).getDate() +
              " 发布"
              : Math.floor(
              (Math.floor(Date.now() / 1000) -
              Math.floor(item.addtime)) /
              3600
              ) > 0
              ? Math.floor(
              (Math.floor(Date.now() / 1000) -
              Math.floor(item.addtime)) /
              3600
              ) + "小时前 发布"
              : Math.floor(
              ((Math.floor(Date.now() / 1000) -
              Math.floor(item.addtime)) /
              60) %
              60
              ) + "分钟前 发布"
              }}
            </p>
          </div>
        </div>
        <div class="attention">
          <span>+ 关注</span><img data-v-6db62aa8=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAkBAMAAABYhlZGAAAAD1BMVEUAAACioqKhoaGqqqqhoaHFKthXAAAABHRSTlMA5ogGBMV9/gAAAB1JREFUCNdjMBJUZlBxcWIQcXEEYRAbLEYEoIVeAMx2CffkFmysAAAAAElFTkSuQmCC"
            width="2" alt="" />
        </div>
      </div>
      <div class="bbbb" @click="
        $router.push({ path: '/notexian' });
        notecomments(item);
      ">
        <div class="text">
          <h5>
            {{ item.title }}
            <!-- item.title ? item.title : item.content ? item.content : "转发了手记" -->
          </h5>
          <p :class="{ active: item.content }" v-for="(i, index) in item.topics" :key="index">
            <span class="bb">#{{ i.name }}</span>
            <span>{{ item.content }}</span>
            <!-- <span v-if="!item.content && !i.name">转发了手记</span> -->
          </p>
          <span v-if="!item.topics" class="spanc">{{
          item.content ? item.content : "转发了手记"
          }}</span>
        </div>
        <div class="conimgs" v-if="item.images">
          <div class="imgs" v-for="(it, i) in item.images" :key="i">
            <div :style="{
              'background-image': `url(${it})`,
            }"></div>
          </div>
        </div>
        <div class="elseimg" v-if="item.article">
          <div class="left">
            <img :src="item.article.cover" alt="" />
          </div>
          <div class="right">
            {{ item.article.title }}
          </div>
        </div>
        <div class="bottom">
          <div class="img">
            <img src="image/赞/l4.png" alt="" /><span>{{
            item.count.count_liked
            }}</span>
          </div>
          <div class="pll">
            <img src="image/评论分享下载收藏/l5.png" alt="" /><span>{{
            item.count.count_commented
            }}</span>
          </div>
          <div class="fxx">
            <!-- <img src="image/评论分享下载收藏/e31.png" alt="" /> -->
            <svg t="1665195016949" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="2683" width="18" height="18">
              <path
                d="M836.2 504.2c-16.3 0-29.5 13.2-29.5 29.5v274.9H215.9V217.8h270.2c16.3 0 29.5-13.2 29.5-29.5s-13.2-29.5-29.5-29.5H215.9c-9.5 0-18 1.2-25.2 3.6l14.7 44.9-14.7-44.9c-15.2 5-25.3 15.1-30.3 30.3-2.4 7.2-3.6 15.7-3.6 25.2v590.8c0 9.6 1.2 18 3.6 25.3 5 15.1 15.1 25.3 30.3 30.2l14.7-44.9-14.7 44.9c7.3 2.4 15.7 3.6 25.2 3.6h590.8c9.6 0 18-1.2 25.3-3.6l-14.7-44.9 14.7 44.9c15.2-4.9 25.3-15.1 30.3-30.2 2.4-7.3 3.6-15.7 3.6-25.3V533.8c-0.1-16.4-13.3-29.6-29.7-29.6z"
                fill="#666666" p-id="2684"></path>
              <path
                d="M862.3 192.6c-5-15.2-15.1-25.3-30.3-30.3l-14.7 44.9 14.7-44.9c-7.3-2.4-15.7-3.6-25.3-3.6H657c-16.3 0-29.5 13.2-29.5 29.5s13.3 29.5 29.5 29.5h98.1l-282.9 283c-11.6 11.5-11.6 30.2 0 41.8 5.8 5.8 13.3 8.6 20.9 8.6 7.5 0 15.1-2.9 20.9-8.6L806.4 250c0.1-0.1 0.1-0.3 0.3-0.4V372c0 16.3 13.2 29.5 29.5 29.5s29.6-13.2 29.6-29.5V217.8c0-9.6-1.2-18-3.5-25.2z"
                fill="#666666" p-id="2685"></path>
            </svg>
            <span>{{ item.count.count_shared }}</span>
          </div>
        </div>
      </div>
    </div>

    <span v-if="currentTopic?.length == 0">无相关话题</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      currentTopic: JSON.parse(localStorage.getItem("topic")) || null,
    };
  },
  computed: {
    ...mapState(["NoteLists"]),
  },
  methods: {
    ...mapMutations(["notecomments"]),
    dateCom(o) {
      let n = new Date();
      if (o.getFullYear() != n.getFullYear()) {
        return o
          .toLocaleDateString()
          .split("/")
          .map((e) => e.padStart(2, "0"))
          .join("-");
      } else if (
        o.getDate() + 1 == n.getDate() &&
        o.getMonth() == n.getMonth()
      ) {
        return "昨天" + o.toLocaleTimeString().slice(-10, -3);
      } else if (o.getDate() == n.getDate() && o.getMonth() == n.getMonth()) {
        return o.toLocaleTimeString().slice(-10, -3);
      } else {
        return (
          (o.getMonth() + 1 + "").padStart(2, "0") +
          "-" +
          (o.getDate() + "").padStart(2, "0")
        );
      }
    },
  },
  mounted() {
    this.currentTopic = this.NoteLists?.filter(
      (o) => o.topics?.length && o.topics[0].name == this.$route.query.title
    );

    if (this.currentTopic) {
      localStorage.setItem("topic", JSON.stringify(this.currentTopic));
    }
  },
};
</script>

<style lang="less" scoped>
.topic {
  // background: #f5f5f5;
  height: 100vh;

  >span {
    display: block;
    text-align: center;
    margin-top: 150rem;
  }

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18rem;
    height: 40rem;
    border-bottom: 1rem solid #f5f5f5;
    background: white;
    margin-bottom: 10rem;

    i {
      img {
        position: absolute;
        top: 3rem;
        left: 5rem;
        width: 25px;
      }
    }
  }

  // .contentBox {
  //   background: white;
  //   padding: 15rem;
  //   padding-bottom: 0;
  //   margin-bottom: 10rem;

  //   .contentBox-user {
  //     display: flex;
  //     justify-content: space-between;

  //     .left {
  //       display: flex;
  //       align-items: center;

  //       .UserImg {
  //         border-radius: 50rem;
  //         position: relative;

  //         img {
  //           border-radius: 50%;
  //           margin-right: 5rem;
  //         }

  //         i.user-vip {
  //           position: absolute;
  //           bottom: 0;
  //           right: 0;

  //           img {
  //             width: 12rem;
  //             height: 12rem;
  //           }
  //         }
  //       }

  //       .UserName {
  //         span {
  //           font-size: 14rem;
  //         }

  //         p {
  //           color: #989696;
  //         }
  //       }
  //     }

  //     .right {
  //       display: flex;
  //       align-items: center;

  //       i {
  //         margin: 0 10rem;
  //         color: #ee0a24;
  //         font-style: normal;

  //         img {
  //           vertical-align: -2rem;
  //         }
  //       }
  //     }
  //   }

  //   .contentBox-content {
  //     padding-right: 10rem;

  //     .content-title {
  //       margin: 6rem 0;
  //       font-weight: 600;
  //       font-size: 13rem;
  //     }

  //     .content-text {
  //       margin: 6rem 0;
  //       display: -webkit-box;
  //       overflow: hidden;
  //       text-overflow: ellipsis;
  //       word-wrap: break-word;
  //       white-space: normal !important;
  //       -webkit-line-clamp: 3;
  //       -webkit-box-orient: vertical;
  //     }

  //     .content-imgs {
  //       display: flex;
  //       flex-wrap: wrap;
  //       position: relative;

  //       > div {
  //         margin-right: 6rem;
  //         border-radius: 5rem;
  //         width: 105rem;
  //         height: 105rem;
  //         background-size: cover;
  //         background-position: center;
  //       }

  //       &.active {
  //         height: 105rem;
  //         overflow: hidden;
  //       }

  //       span.imgsNum {
  //         display: block;
  //         background: rgba(37, 36, 36, 0.642);
  //         width: 25rem;
  //         height: 25rem;
  //         text-align: center;
  //         line-height: 25rem;
  //         position: absolute;
  //         right: 8px;
  //         bottom: 0;
  //         border-bottom-right-radius: 5rem;
  //         color: white;
  //       }
  //     }

  //     .content-video {
  //       background: #f3f4f6;
  //       width: 100%;
  //       height: 100%;
  //       display: flex;
  //       border-radius: 5rem;
  //       margin-top: 10rem;

  //       .videoBox {
  //         border-top-left-radius: 5rem;
  //         border-bottom-left-radius: 5rem;
  //         width: 45%;
  //         height: 90rem;
  //         background-size: cover;
  //         background-repeat: no-repeat;
  //         background-position: center;
  //         position: relative;

  //         .videoBox-details {
  //           position: absolute;
  //           bottom: -7rem;
  //           right: 5rem;

  //           p.video-time {
  //             color: rgba(255, 255, 255, 0.795);
  //           }
  //         }
  //       }

  //       .videoContent {
  //         padding: 10rem;
  //         padding-bottom: 0;
  //         font-size: 14rem;
  //       }

  //       p {
  //         font-size: 12rem;
  //         color: #989696c8;
  //         margin-top: 3rem;
  //       }
  //     }
  //   }

  //   .videobox-interaction {
  //     display: flex;
  //     justify-content: space-around;
  //     align-items: center;
  //     padding: 9rem 0;
  //     border-top: 1rem solid #f2f2f2;
  //     margin-top: 10rem;

  //     i {
  //       text-align: center;
  //       font-size: 17rem;
  //       display: flex;
  //       align-items: center;
  //       color: #686868;

  //       &:nth-child(2) {
  //         font-size: 15rem;
  //       }

  //       span {
  //         margin-left: 5rem;
  //         font-size: 12rem;
  //       }
  //     }
  //   }
  // }
  .container {
    margin-top: 10rem;
    box-shadow: 0 0 3rem 0 rgba(128, 128, 128, 0.424);
    padding: 13rem;
    padding-bottom: 0;

    .contop {
      display: flex;
      justify-content: space-between;

      .left {
        display: flex;

        .limg {
          margin-right: 12rem;
          position: relative;
          width: 33rem;

          img {
            width: 100%;
            border-radius: 50%;
            display: block;

            &:nth-child(2) {
              width: 10rem;
              position: absolute;
              bottom: 0;
              right: 0;
            }
          }
        }

        .username {
          h6 {
            font-size: 14rem;
            // font-weight: 550;
          }

          p {
            font-size: 12rem;
            color: gray;
          }
        }
      }

      .attention {
        // display: flex;
        // align-items: center;
        font-size: 12rem;
        font-weight: bold;
        color: red;

        span {
          margin-right: 24rem;
        }

        img {
          vertical-align: middle;
        }
      }
    }

    .text {
      h5 {
        font-size: 14rem;
        font-weight: bold;
        margin: 12rem 0 3rem 0;
      }

      p {
        // height: 60rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;

        // margin-bottom: 6rem;
        // color: lightblue;
        span {
          &.bb {
            color: blue;
            margin-right: 8rem;
          }

          // &:nth-child(2) {
          // display: -webkit-box;

          // -webkit-box-orient: vertical;

          // -webkit-line-clamp: ;

          // overflow: hidden;
          // }
        }

        // &.active {
        //   // text-overflow: ellipsis;
        //   overflow: hidden;
        //   // white-space: nowrap;
        //   height: 34rem;
        //   word-break: break-all;
        // }
      }

      // .spanc {
      //   display: inline-block;
      //   margin-bottom: 10rem;
      // }
    }

    .conimgs {
      margin-top: 10rem;
      border-bottom: 1rem solid #f3f4f6;
      padding-bottom: 10rem;
      display: flex;
      flex-flow: nowrap;
      overflow: hidden;

      .imgs {
        flex-shrink: 0;

        &:nth-child(2) {
          margin: 0 10rem;
        }

        width: 110rem;
        height: 110rem;

        &>div {
          border-radius: 3rem;
          height: 100%;
          width: 100%;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
    }

    .elseimg {
      background-color: #f3f4f6;
      border-radius: 6rem;
      padding-right: 12rem;
      font-size: 13rem;
      margin-top: 10rem;
      display: flex;

      .left {
        flex-shrink: 0;
        width: 155rem;

        img {
          width: 100%;
          border-radius: 6rem 0 0 6rem;
        }

        margin-right: 10rem;
      }

      .right {
        padding-top: 6rem;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-around;
      height: 44rem;
      // align-content: center;
      line-height: 44rem;
      vertical-align: middle;

      .img {

        // img {
        // }
        span {
          position: relative;
          top: -3rem;
          left: 4rem;
        }
      }

      .pll {
        width: 16rem;

        img {
          width: 100%;
        }

        span {
          position: relative;
          top: -47rem;
          left: 24rem;
        }
      }

      .fxx {
        width: 14rem;

        img {
          width: 100%;
        }

        span {
          position: relative;
          top: -47rem;
          left: 24rem;
        }
      }
    }
  }
}
</style>