<template>
  <div class="note">
    <div class="ttop">
      <h3>手记</h3>
    </div>
    <div class="loading" v-if="loading">
      <van-loading type="spinner" color="red" />
    </div>
    <div v-else>
      <div class="containers" @scroll="scrollAdd()" ref="scrollBox">
        <div class="content" ref="divRef">
          <div class="notep">
            <div class="conten" v-for="(item, i) in customRecommend" :key="i" @click="
              $router.push({ path: '/NoteList', query: { title: item.title } })
            ">
              <img v-lazy="`${item.icon}?x-oss-process=image/resize,m_mfit,w_80`" alt="x" />
              <p>{{ item.title }}</p>
            </div>
          </div>

          <div class="container" v-for="(item, i) in NoteLists" :key="i">
            <div class="contop">
              <div class="left" @click="
                $router.push({ path: '/user', query: { id: item.user.id } })
              ">
                <div class="limg">
                  <img v-lazy="item.user.avatar" alt="xx" />

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
                    (Math.floor(Date.now() / 1000) -
                    Math.floor(item.addtime)) /
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
                <span v-show="!gz.includes(item.user.id)" @click="addgz(item.user.id)">+ 关注</span>
                <!-- <img
                  data-v-6db62aa8=""
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAkBAMAAABYhlZGAAAAD1BMVEUAAACioqKhoaGqqqqhoaHFKthXAAAABHRSTlMA5ogGBMV9/gAAAB1JREFUCNdjMBJUZlBxcWIQcXEEYRAbLEYEoIVeAMx2CffkFmysAAAAAElFTkSuQmCC"
                  width="2" alt="" /> -->
                <span class="ygz" v-show="gz.includes(item.user.id)" @click="removegz(item.user.id)">已关注</span>
                <img data-v-6db62aa8=""
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAkBAMAAABYhlZGAAAAD1BMVEUAAACioqKhoaGqqqqhoaHFKthXAAAABHRSTlMA5ogGBMV9/gAAAB1JREFUCNdjMBJUZlBxcWIQcXEEYRAbLEYEoIVeAMx2CffkFmysAAAAAElFTkSuQmCC"
                  width="2" alt="" />
              </div>
            </div>
            <div class="bbbb" @click="
              $router.push({ path: '/notexian',query:{id:item.id,userId:item.user.id} });
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
              <div class="elseimg" v-if="item.article.cover">
                <div class="left">
                  <img v-lazy="`${item?.article?.cover}`" alt="" />
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
                  <svg t="1665195016949" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2683" width="18" height="18">
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
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  //https://app.xinpianchang.com/notes?type=all&topicId&expand=user_status,customRecommend
  data() {
    return {
      axiosNum: 0,
      loading: true,
      gz: JSON.parse(localStorage.getItem("gz")) || []
    };
  },
  methods: {
    addgz(id) {
      this.gz = [...this.gz, id]
      // console.log(this.gz);
    },
    removegz(id) {
      this.gz = this.gz.filter((e) => e !== id)
    },
    ...mapMutations(["Notetop", "notecomments"]),
    scrollAdd() {
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        // console.log(this.$refs.divRef.offsetHeight);
        // console.log(this.$refs.scrollBox.offsetHeight);
        // console.log(this.$refs.scrollBox.scrollTop);
        // if (this.$refs.divRef) {
        let scrollHeight =
          this.$refs.divRef.offsetHeight -
          this.$refs.scrollBox.offsetHeight -
          this.$refs.scrollBox.scrollTop;
        if (scrollHeight - 100 < 0) {
          this.axios
            .get(
              "/newstudios/notes?type=all&topicId&expand=user_status,customRecommend",
              {
                params: {
                  page: ++this.axiosNum,
                },
              }
            )
            .then((res) => {
              // console.log("scrollres:", res.data.data);
              // this.Notetop({
              //   list: res.data.data.list,
              // });

              this.$store.commit("Notetop", {
                lists: res.data.data.list,
              });

            });
        }
        // }

      }, 200);
    },
  },
  watch: {
    gz(n) {
      localStorage.setItem("gz", JSON.stringify(n))
    }
  },
  computed: {
    ...mapState(["customRecommend", "NoteLists"]),
  },
  created() {
    this.axios
      .get("/notes?type=all&topicId&expand=user_status,customRecommend")
      .then((e) => {
        // console.log(e.data.data);
        this.Notetop({
          customRecommend: e.data.data.customRecommend,
          lists: e.data.data.list,
        });
        this.loading = false

      });
    // var a = Date.now();
    // console.log(a);
  },
};
</script>
<style lang="less">
.ygz {
  color: gray;
}

.note {
  font-size: 12rem;

  .loading {
    height: 560rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // padding: 10rem;
  .ttop {
    h3 {
      font-size: 14rem;
      font-weight: bold;
      text-align: center;
      margin: 10rem;
    }
  }

  // .content {
  //   // overflow: auto;
  // }
  .containers {
    padding: 0;
    height: 100vh;
    overflow: auto;
  }

  .notep {
    padding: 10rem;
    padding-bottom: 0;
    padding-top: 15rem;
    // border-top: 1rem solid rgba(128, 128, 128, 0.191);
    border-bottom: 1rem solid #f3f4f6;
    border-top: 1rem solid #f3f4f6;

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

      .spanc {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
      }
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
        box-shadow: 0 0 1rem 0 gray;

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