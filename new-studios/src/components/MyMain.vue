<template>
  <div class="MyMain">
    <div class="mytop" v-if="user">
      <div class="bg" :style="{
        backgroundImage: `url(${
          user.app_background ? user.app_background : 'image/xpc/图片/69.png'
        })`,
      }"></div>
      <div class="mtops">
        <div class="mt">
          <!-- $router.push({ path: '/home/my' }) -->
          <div class="mtimg" @click="
            $route.query.id == 13181896
              ? $router.push({ path: '/home/my' })
              : $router.push({ path: '/home/note' })
          ">
            <img src="image/返回/Mg.png" alt="" />
          </div>
          <div>
            <img src="image/评论分享下载收藏/nE.png" alt="" />
            <!-- {{user}} -->
          </div>
        </div>
        <div class="tx">
          <img v-lazy="`${user.avatar}?x-oss-process=image/resize,m_mfit,w_180`" alt="" />
          <h3>{{ user.username }}</h3>
          <p>{{ user.occupation }}</p>
          <p v-show="user.occupation == null">暂无简介</p>
          <p>{{ user.verify_description }}</p>
          <!-- <p v-show="user.verify_description==null">暂无</p> -->
        </div>
      </div>

      <div class="bottom">
        <div class="left">
          <div>
            <span v-if="user.count.count_popularity > 10000">{{ (user.count.count_popularity / 10000).toFixed(1)
            }}w</span>
            <span v-else>{{ user.count.count_popularity }}</span>
            <p>人气</p>
          </div>
          <div>
            <span>{{ user.count.count_follower }}</span>
            <p>粉丝</p>
          </div>
          <div>
            <span>{{ user.count.count_followee }}</span>
            <p>关注</p>
          </div>
        </div>
        <div class="right" v-if="this.$route.query.id !== '13181896'">
          <button>联系合作</button>
          <button>关注</button>
        </div>
        <div class="right" v-else>
          <button>封面</button>
          <button>编辑资料</button>
        </div>
      </div>
    </div>
    <div class="mytop" v-else>
      <div class="bg"></div>
      <div class="mtops">
        <div class="mt">
          <div class="mtimg" @click="$router.push({ path: '/' })">
            <img src="image/返回/Mg.png" alt="" />
          </div>
          <div>
            <img src="image/评论分享下载收藏/nE.png" alt="" />
            <!-- {{user}} -->
          </div>
        </div>
        <div class="tx">
          <img src="https://cs.xinpianchang.com/passport/default.jpg?x-oss-process=image/resize,m_mfit,w_180" alt="" />
          <h3>用户名</h3>
          <p>暂无简介</p>
        </div>
      </div>

      <div class="bottom">
        <div class="left">
          <div>
            <span>0</span>
            <p>人气</p>
          </div>
          <div>
            <span>0</span>
            <p>粉丝</p>
          </div>
          <div>
            <span>0</span>
            <p>关注</p>
          </div>
        </div>
        <div class="right">
          <button>封面</button>
          <button>编辑资料</button>
        </div>
      </div>
    </div>
    <div class="mybottom">
      <!-- <van-tabs v-model="activeName">
        <van-tab title="作品" name="a">内容 1</van-tab>
        <van-tab title="收藏夹" name="b">内容 2</van-tab>
        <van-tab title="喜欢" name="c">内容 3</van-tab>
        <van-tab title="资料" name="d">内容 3</van-tab>
      </van-tabs> -->

      <van-tabs v-model="active" swipeable>
        <van-tab v-for="index in tabtext" :title="index" :key="index">
          <!-- 内容 {{ index }} -->
          <div class="zp" v-if="index === '作品'">还没发布作品</div>
          <div class="sc" v-if="index === '收藏夹'">还没有收藏的作品</div>
          <div class="xh" v-if="index === '喜欢'">还没有喜欢的作品</div>
          <div class="zl" v-if="index === '资料'">
            <h3>基本资料</h3>
            <div class="jb">
              <div>
                <span>性别</span>
                <span v-if="user?.sex % 2 != 0">男</span>
                <span v-else-if="user?.sex % 2 == 0">女</span>
                <span v-else>未知</span>
              </div>
              <div><span>年龄</span>未知</div>
              <div>
                <span>所在地区</span><span>{{
                user?.location?.province?.name
                ? user?.location?.province?.name
                : "地球"
                }}</span>
              </div>
              <div>
                <span>简介</span><span>{{ user?.about ? user?.about : "暂无简介" }}</span>
              </div>
              <div>
                <span>IP归属地</span>{{ user?.ip_location ? user?.ip_location : "未知" }}
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  // name: "HelloWorld",
  props: {
    // msg: String,
  },
  data() {
    return {
      // activeName: "a",
      user: null,
      active: 0,
      tabtext: ["作品", "收藏夹", "喜欢", "资料"],
    };
  },
  // created() {
  //   if (window.location.href.indexOf("#r") == -1) {
  //     // window.location.href = window.location.href + "#reloaded";
  //     window.location.href = window.location.href + "#r";
  //     window.location.reload();
  //   }
  // },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    next((vm) => {
      console.log(vm);
      vm.axios.get(`/xpc/user/${to.query.id}`).then((res) => {
        vm.user = res.data.data;
      });
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.MyMain {
  font-size: 12rem;
  width: 100%;

  .mytop {
    width: 100%;
    height: 46vh;
    position: relative;
    padding: 20rem;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-image: url("../../public/image/xpc/图片/69.png");
      background-position: center;
      background-size: cover;
      z-index: -1;
    }

    &::before {
      z-index: 0;
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.36);
    }

    .mtops {
      color: white;
      position: relative;
      top: 0;
      left: 0;
      z-index: 3;

      .mt {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20rem;

        .mtimg {
          width: 30rem;
          height: 30rem;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .tx {
        img {
          border-radius: 50%;
          box-shadow: 0 0 2rem 0 #ced1ce;
          // border: 50%;
          width: 50rem;
        }

        h3 {
          margin: 20rem 0 20rem 0;
        }
      }
    }

    width: 100%;

    .bottom {
      color: #fff;
      width: 90%;
      display: flex;
      justify-content: space-between;
      position: absolute;
      bottom: 33rem;

      .left {
        display: flex;
        text-align: center;

        div {
          margin-right: 26rem;

          p {
            margin-top: 6rem;
          }
        }
      }

      .right {
        display: flex;
        align-items: center;

        // margin-top: 6rem;
        button {
          display: inline-block;

          border-radius: 20rem;
          border: 0;
          padding: 3rem 10rem;

          &:nth-child(1) {
            color: black;
            background-color: #ced1ce;
            margin-right: 10rem;
          }

          &:nth-child(2) {
            color: #fdf4f3;
            background-color: #e74b3c;
            padding: 3rem 10rem;
          }
        }
      }
    }
  }

  .mybottom {
    .van-tab__pane {
      width: 100%;

      height: 46vh;

      &>div {
        width: 100%;
        height: 100%;
        font-size: 14rem;
        color: #999;
        background-color: #f7f7f7;

        &.zp {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &.sc {
          // background-color: pink;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &.xh {
          // background-color: aqua;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &.zl {

          // background-color: yellow;
          h3 {
            color: black;
            font-weight: bold;
            box-shadow: 0 0 1rem 0 rgba(128, 128, 128, 0.33);
            padding: 23rem 0;
            margin-bottom: 10rem;
            padding-left: 20rem;
          }

          .jb {
            padding: 0 20rem;

            div {
              color: black;
              display: flex;
              align-items: center;

              span {
                &:nth-child(1) {
                  color: #999;
                  display: inline-block;
                  line-height: 33rem;
                  width: 90rem;
                }

                &:nth-child(2) {
                  width: 120rem;
                  overflow: auto;
                  display: inline-block;
                  white-space: nowrap;
                  line-height: 33rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
