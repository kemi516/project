<template>
  <div v-if="!usershow" class="usershow">
    <van-loading type="spinner" color="red" />
  </div>
  <div class="NoteXian" v-else>
    <div class="contop">
      <div class="left">
        <div class="imgf" @click="$router.push({ path: '/home/note' })">
          <img src="image/返回/mf.png" alt="" />
        </div>
        <div class="limg">
          <img v-lazy="`${ncomment?.user?.avatar}?x-oss-process=image/resize,m_mfit,w_180`" alt="xx" />
        </div>
        <div class="username">
          <h6>{{ ncomment.user.username }}</h6>
        </div>
      </div>
      <div class="attention">
        <button v-show="!gz.includes(Number($route.query.userId))" @click="addgz(Number($route.query.userId))">+
          关注</button>
        <button class="ygz" v-show="gz.includes(Number($route.query.userId))"
          @click="removegz(Number($route.query.userId))">已关注</button>
        <img @click.stop="$store.commit('shareStateUpdate')" src="image\评论分享下载收藏\uN.png" alt="" />
      </div>
    </div>
    <div class="container">
      <div class="conimgs" v-if="ncomment.images">
        <div class="imgs" v-for="(it, i) in ncomment.images" :key="i">
          <div :style="{
            'background-image': `url(${it})`,
          }"></div>
        </div>
      </div>

      <div class="text">
        <h5>
          {{ ncomment.title }}
        </h5>
        <p :class="{ active: ncomment.content }" v-for="(i, index) in ncomment.topics" :key="index">
          <span class="bb">#{{ i.name }}</span>
          <span>{{ ncomment.content }}</span>
        </p>
        <span v-if="!ncomment.topics" class="spanc">{{
        ncomment.content ? ncomment.content : "转发了手记"
        }}</span>
        <div class="elseimg" v-if="ncomment.article.cover" @click.stop="updateRouter({ resource: ncomment.article })">
          <div class="left">
            <img v-lazy="`${ncomment?.article?.cover}?x-oss-process=image/resize,m_mfit,w_180`" alt="" />
          </div>
          <div class="right">
            {{ ncomment.article.title }}
          </div>
        </div>
        <p>
          {{
          Math.floor(
          (Math.floor(Date.now() / 1000) - Math.floor(ncomment.addtime)) /
          3600
          ) > 24
          ? new Date(ncomment.uptime * 1000).getMonth() +
          1 +
          "-" +
          new Date(ncomment.uptime * 1000).getDate() +
          " 发布"
          : Math.floor(
          (Math.floor(Date.now() / 1000) -
          Math.floor(ncomment.addtime)) /
          3600
          ) > 0
          ? Math.floor(
          (Math.floor(Date.now() / 1000) -
          Math.floor(ncomment.addtime)) /
          3600
          ) + "小时前 发布"
          : Math.floor(
          ((Math.floor(Date.now() / 1000) -
          Math.floor(ncomment.addtime)) /
          60) %
          60
          ) + "分钟前 发布"
          }}
        </p>
      </div>
    </div>

    <div class="ping" v-if="ncomment ">
      <h6>共 {{ comment?.length }} 条评论</h6>
      <div class="ptop">
        <img src="https://cs.xinpianchang.com/user_center_xpc_line/user_avatar_13181896.jpg" alt="" />
        <input type="text" placeholder="说说你的看法吧 ~" />
      </div>
      <div class="pingl" v-if="comment">
        <div class="user" v-for="item in comment" :key="item.id">
          <div class="left">
            <div class="img">
              <img v-lazy="`${item.userDetail?.avatar_middle}?x-oss-process=image/resize,m_mfit,w_180`" alt="x" />
            </div>
            <div class="username">
              <p>{{ item.userDetail.nickname }}</p>
              <p>
                <span> {{ item.contentText }}</span>
                <span class="timeid">
                  {{
                  new Date(Date.now()).getHours() -
                  new Date(item.createTimeUnix).getHours()
                  }}小时前 · {{ item.ipLocation }}</span>
              </p>
            </div>
          </div>
          <div class="right">
            <img src="image/赞/l4.png" alt="" />
          </div>
        </div>
      </div>
      <div class="pingl" v-else>还没有人评论</div>
      <div class="zs">暂时没有更多了</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      // localStorage.getItem("notecomment") ||
      // comment: JSON.parse(localStorage.getItem("notecomment")) || null,
      comment: null,
      usershow: false, gz: JSON.parse(localStorage.getItem("gz")) || [],
      ncomment: []
    };
  },

  //https://app.xinpianchang.com/notes?type=all&topicId&expand=user_status,customRecommend
  methods: {
    addgz(id) {
      this.gz = [...this.gz, id]
      console.log(this.gz);
    },
    removegz(id) {
      this.gz = this.gz.filter((e) => e !== id)
    },
    ...mapMutations(["Notetop"]),
    updateRouter(n) {
      this.$router.push({ path: "/media", query: { id: n.resource.id } });
    },
  },
  computed: {
    ...mapState(["customRecommend", "NoteLists"]),
  },

  updateRouter() {
    this.axios.get(`https://apis.netstart.cn/xpc/note/${this.$route.query.id}`).then((res) => { console.log(res) })
  },
  //https://www.xinpianchang.com/api/comment-center/v1/topic/pull?module_code=default&topic_code=8507
  created() {
    // if (window.location.href.indexOf("#reloaded") == -1) {
    //   window.location.href = window.location.href + "#reloaded";
    //   window.location.reload();
    // }
    this.axios.get(`https://apis.netstart.cn/xpc/note/${this.$route.query.id}`).then((res) => {

      // console.log(res.data.data)
      this.ncomment = res.data.data
    })

    this.axios
      .get("/notes?type=all&topicId&expand=user_status,customRecommend")
      .then((e) => {
        // console.log(e.data.data);
        // console.log(this.item);
        this.usershow = true
        this.Notetop({
          customRecommend: e.data.data.customRecommend,
          lists: e.data.data.list,
        });
      });

    this.axios
      .get(`https://apis.netstart.cn/xpc/note/${this.ncomment.id}/comment`)
      .then((e) => {
        // console.log(this.ncomment.id);
        // console.log(e.data.data);
        this.comment = e.data.data;
        // localStorage.setItem("notecomment", JSON.stringify(e.data.data));
      });
  },
  watch: {
    gz(n) {
      localStorage.setItem("gz", JSON.stringify(n))
    },
    ncomment(n) {
      if (n) {
        localStorage.setItem("noteitem", JSON.stringify(n));
      }
    },
    comment(n) {
      if (n) {
        localStorage.setItem("notecomment", JSON.stringify(n));
      }
    },
  },
};
</script>
<style lang="less">
.usershow {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.NoteXian {
  font-size: 12rem;

  .contop {
    background-color: #fff;
    width: 100%;
    position: fixed;
    top: 0rem;
    left: 0;
    padding: 15rem;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;

      .imgf {
        img {
          position: relative;
          top: 6rem;
        }
      }

      .limg {
        margin-right: 12rem;

        img {
          width: 33rem;
          box-shadow: 0 0 1rem 0 #999;

          border-radius: 50%;
        }
      }

      .username {
        h6 {
          font-size: 14rem;
          font-weight: 550;
          position: relative;
          top: 6rem;
        }

        p {
          font-size: 12rem;
          color: gray;
        }
      }
    }

    .attention {
      button {

        font-weight: bold;
        color: red;
        border: 1rem solid red;
        background-color: #fff;
        border-radius: 20rem;
        padding: 3rem 6rem;
        margin-right: 23rem;
        margin-top: 6rem;

        &.ygz {
          color: gray;
          border: 1rem solid #999;
        }
      }

      img {
        width: 16rem;
        height: 16rem;
        position: relative;
        top: 3rem;
      }
    }
  }

  .notep {
    padding: 10rem;
    padding-bottom: 0;
    padding-top: 15rem;
    border-top: 1rem solid rgba(128, 128, 128, 0.191);
    border-bottom: 1rem solid rgba(128, 128, 128, 0.191);
    display: flex;
    flex-flow: nowrap;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
    }

    .conten {
      flex-shrink: 0;
      text-align: center;
      width: 70rem;
      margin-right: 10rem;

      img {
        border-radius: 6rem;
        width: 100%;
      }

      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .container {
    margin-top: 66rem;
    box-shadow: 0 0 3rem 0 rgba(128, 128, 128, 0.424);
    padding: 0 13rem;
    padding-top: 6rem;
    // padding-bottom: 0;

    .text {
      padding-bottom: 22rem;

      h5 {
        font-size: 14rem;
        font-weight: bold;
        margin: 12rem 0 3rem 0;
      }

      p {

        // height: 60rem;
        // display: -webkit-box;
        // -webkit-line-clamp: 3;
        // -webkit-box-orient: vertical;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // margin-bottom: 6rem;
        // color: lightblue;
        &:last-child {
          color: #999;
        }

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
    }

    .conimgs {
      margin-top: 10rem;
      //   border-bottom: 1rem solid rgba(128, 128, 128, 0.252);
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
          box-shadow: 0 0 2rem 0 #999;
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

  .ping {
    padding: 13rem;
    padding-top: 0;

    h6 {
      padding: 10rem;
      padding-left: 0;
    }

    .pingl {
      .user {
        border-bottom: 1rem solid rgba(128, 128, 128, 0.099);
        display: flex;
        justify-content: space-between;
        padding: 16rem 0;

        .left {
          display: flex;

          img {
            width: 33rem;
            border-radius: 50%;
            box-shadow: 0 0 1rem 0 #999;

            margin-right: 12rem;
          }

          .username {
            width: 220rem;

            .timeid {
              white-space: nowrap;
              color: #999;
            }

            p {
              &:nth-child(1) {
                color: #999;
              }
            }
          }
        }

        .right {
          display: flex;

          //   align-items: center;
          img {
            width: 16rem;
            height: 16rem;
          }
        }
      }
    }

    .ptop {
      img {
        width: 33rem;
        vertical-align: middle;
        margin-right: 12rem;
        box-shadow: 0 0 1rem 0 #999;
        border-radius: 50%;
      }

      input {
        width: 85%;
        border-radius: 22rem;
        border: 0;
        background-color: #f3f4f6;
        padding: 8rem 16rem;
      }
    }
  }

  .zs {
    width: 100%;
    color: #999;
    text-align: center;
    padding-top: 22rem;
  }
}
</style>