<template>
  <div class="MyCollect">
    <div class="mytop">
      <div class="mtops">
        <div class="mt">
          <div class="mtimg" @click="$router.push({ path: '/home/my' })">
            <img src="image/返回/Mg.png" alt="" />
          </div>
          <div>
            <img src="image\评论分享下载收藏\nE.png" alt="" />
          </div>
        </div>
        <div class="tx">
          <img src="image/tx.png" alt="" />
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
              <div><span>性别</span>未知</div>
              <div><span>年龄</span>未知</div>
              <div><span>所在地区</span>地球</div>
              <div><span>简介</span>未填写</div>
              <div><span>IP归属地</span>湖北</div>
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
      active: 1,
      tabtext: ["作品", "收藏夹", "喜欢", "资料"],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.MyCollect {
  font-size: 12rem;
  width: 100%;

  .mytop {
    width: 100%;
    height: 46vh;
    position: relative;
    padding: 20rem;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-image: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F1300%2Fntk-1300-31979.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667449976&t=0fb45e8d87ddae13daff3f34c3bae4a8");
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
          width: 50rem;
        }

        h3 {
          margin: 20rem 0 30rem 0;
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

              span {
                color: #999;
                display: inline-block;
                line-height: 33rem;
                width: 90rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
