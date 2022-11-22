<template>
  <div class="childrenHotSearch">
    <van-tabs v-model="active">
      <van-tab title="作品">
        <div class="flex">
          <div class="choce1">
            <p>最热门</p>
            <div class="bcg">
              <p>最热门</p>
              <p>最匹配</p>
              <p>新发布</p>
            </div>
          </div>
          <div class="choce2">
            <p>专业搜索</p>
            <!-- <div class="bcg2">
              <ul class="zuoping">
                <div>作品分类</div>
                <li>全部</li>
                <li v-for="c in categories" :key="c.id">
                  {{ c.category_name }}
                </li>
              </ul>
              <ul class="fanwei">
                <div>范围</div>
                <li>全部</li>
                <li>编辑精选</li>
                <li>场库精选</li>
                <li>分类精选</li>
              </ul>
              <ul class="time">
                <div>时长</div>
                <li>全部时长</li>
                <li>1分钟一下</li>
                <li>1-5分钟</li>
                <li>5-10分钟</li>
                <li>10-30分钟</li>
              </ul>
            </div>
            <button>重置</button>
            <button>确定</button> -->
          </div>
        </div>
        <p class="count">
          共<span>{{ hotNameTitle.length }}</span> 部作品
        </p>
        <ul class="con">
          <li v-for="t in hotNameTitle" :key="t.id">
            <img :src="`${t.cover}?x-oss-process=image/resize,m_mfit,w_180`" alt="" />
            <div class="wenzi">
              <h5>{{ t.title }}</h5>
              <p>
                播放量
                {{
                  (t.count.count_view / 10000).toFixed(1) > 1
                    ? (t.count.count_view / 10000).toFixed(1) + "w"
                    : t.count.count_view > 1000
                    ? (t.count.count_view / 1000).toFixed(1) + "k"
                    : t.count.count_view
                }}
                · 喜欢
                {{
                  (t.count.count_like / 10000).toFixed(1) > 1
                    ? (t.count.count_like / 10000).toFixed(1) + "w"
                    : t.count.count_like > 1000
                    ? (t.count.count_like / 1000).toFixed(1) + "k"
                    : t.count.count_like
                }}
              </p>
              <div class="touxiang">
                <img class="author" :src="`${t.author.userinfo.avatar}?x-oss-process=image/resize,m_mfit,w_180`" alt="" />
                <span>{{ t.author.userinfo.username }}</span>
                <img
                  class="vip"
                  v-if="t.author.userinfo.vip_flag == 1"
                  src="../../public/image/xpcAll/5X.png"
                  alt=""
                />
                <img
                  class="vip"
                  v-if="t.author.userinfo.vip_flag == 3"
                  src="../../public/image/xpcAll/2h.png"
                  alt=""
                />
                <div class="renzhen">
                  <img
                    v-if="t.author.userinfo.author_type == 1"
                    src="../../public/image/xpcAll/nV.png"
                    alt=""
                  />
                  <img
                    v-if="t.author.userinfo.author_type == 2"
                    src="../../public/image/xpcAll/O_1.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </van-tab>
      <van-tab title="创作人">
        <ul class="actor">
          <p>
            共<span>{{ hotNameCreated.length }}</span
            >位创作人
          </p>
          <li v-for="v in hotNameCreated" :key="v.id">
            <div class="big">
              <div class="creat">
                <img :src="`${v.avatar}?x-oss-process=image/resize,m_mfit,w_180`" alt="" />
                <img
                  class="zhubo"
                  v-if="v.author_type == 2"
                  src="../../public/image/xpcAll/O_1.png"
                  alt=""
                />
              </div>
              <div class="name">
                <p class="actorname">
                  {{ v.username }}
                  <img
                    class="vip"
                    v-if="v.vip_flag == 1"
                    src="../../public/image/xpcAll/5X.png"
                    alt=""
                  />
                  <img
                    class="vip"
                    v-if="v.vip_flag == 3"
                    src="../../public/image/xpcAll/2h.png"
                    alt=""
                  />
                </p>

                <p class="fensi">
                  {{ v.occupation ? v.occupation + "·" : "" }}粉丝{{
                    v.count.count_follower
                  }}
                </p>
              </div>
            </div>
            <div class="guanzu">
              <span>关注</span>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  props: ["categories", "hotNameTitle", "hotNameCreated"],
  data() {
    return {
      active: 2,
    };
  },
  computed: {},
  created() {
    // showVip() {
    // console.log(this.vip);
    // if (this.vip == 1) {
    //   //   return true;
    //   this.showVip = true;
    // } else {
    //   //   return false;
    //   this.showVip = false;
    // }
    // },
  },
};
</script>

<style lang="less" scoped>
.childrenHotSearch {
  .flex {
    margin-top: 3rem;
    display: flex;
    // background-color: lightpink;
    height: 30rem;
    border-top: 1rem solid rgb(203, 203, 203);
    border-bottom: 1rem solid rgb(203, 203, 203);
    margin-left: 15rem;
    margin-right: 15rem;
    .choce1 {
      //   margin-left: 15rem;
      height: 25rem;
      //   background-color: rgb(164, 164, 164);
      p {
        width: 40rem;
        height: 15rem;
        line-height: 15rem;
        // background-color: aqua;
        margin-top: 10rem;
        font-weight: bold;
      }
      .bcg {
        // opacity: 0;
        display: none;
        // border-top: 1px solid rgb(214, 214, 214);
        position: absolute;
        left: 0;
        top: 80rem;
        padding-left: 15rem;
        width: 100%;
        height: 90rem;
        background-color: rgb(255, 255, 255);
        > p {
          font-weight: 500;
          &:nth-of-type(1) {
            color: red;
          }
        }
      }
    }
    .choce2 {
      margin-left: 15rem;
      height: 25rem;
      width: 50rem;
      //   line-height: 20rem;
      //   background-color: aquamarine;
      //   overflow: hidden;
      p {
        width: 50rem;
        height: 15rem;
        line-height: 15rem;
        // background-color: aqua;
        margin-top: 10rem;
        font-weight: bold;
      }
      //   .bcg2 {
      //     width: 100%;
      //     position: absolute;
      //     left: 0;
      //     padding-left: 15rem;
      //     background-color: aquamarine;
      //     .zuoping {
      //       display: flex;
      //       div {
      //       }
      //       li {
      //       }
      //     }
      //   }
    }
  }
  .count {
    margin-left: 15rem;
    margin-top: 5rem;
    span {
      color: red;
      font-weight: bold;
      margin-left: 5rem;
    }
  }
  .con {
    margin: 0 15rem;
    margin-top: 5rem;
    li {
      width: 100%;
      padding: 10rem 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgb(217, 217, 217);
      img {
        width: 150rem;
        border-radius: 5rem;
      }
      .wenzi {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 10rem;
        h5 {
          font-size: 14rem;
          font-weight: 500;
          margin: 5rem 0;
        }
        p {
          position: relative;
          left: -10rem;
          color: rgb(167, 167, 167);
          transform: scale(0.8);
        }
        .touxiang {
          position: relative;
          display: flex;
          align-items: center;
          margin-top: 5rem;
          .author {
            width: 20rem;
            height: 20rem;
            border-radius: 50%;
            // margin-top: 5rem;
          }
          span {
            margin-left: 2rem;
            // margin-top: 5rem;
            font-size: 12rem;
            transform: scale(0.9);
          }
          .vip {
            width: 14rem;
            margin-left: 5rem;
          }
          .renzhen {
            position: absolute;
            // left: 200rem;
            left: 12rem;
            bottom: -3rem;
            img {
              width: 8rem;
              //   position: absolute;
              //   top: 0;
            }
          }
        }
      }
    }
  }
  .actor {
    p {
      border-top: 1rem solid rgb(203, 203, 203);
      margin-top: 10rem;
      margin-left: 15rem;
      margin-right: 15rem;
      padding-top: 5rem;
      span {
        color: red;
        margin-right: 5rem;
      }
    }
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 5rem 15rem;
      border-bottom: 1px solid rgb(207, 207, 207);
      .big {
        display: flex;
        align-items: center;
        padding: 10rem 0;
        .creat {
          position: relative;
          img {
            width: 50rem;
            border-radius: 50%;
          }
          .zhubo {
            width: 15rem;
            position: absolute;
            top: 35rem;
            left: 30rem;
          }
        }
        .name {
          margin-left: 10rem;
          .actorname {
            margin: 0;
            font-weight: bold;
            // font-weight: 500;
            font-size: 14rem;
            .vip {
              width: 15rem;
              margin-left: 3rem;
            }
          }
          .fensi {
            margin: 5rem 0;
            color: rgb(150, 150, 150);
          }
        }
      }
      .guanzu {
        span {
          padding: 5rem 15rem;
          background-color: rgb(255, 207, 207);
          border-radius: 15rem;
          color: rgb(228, 45, 45);
        }
      }
    }
  }
}
</style>