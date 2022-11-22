<template>
  <div class="MyPhoto">
    <div class="attop">
      <div class="fanh" @click="$router.push({ path: '/home/my' })">
        <img src="image/返回/mf.png" alt="" />
      </div>
      <h3>推广</h3>
    </div>
    <div class="btop">
      <van-tabs v-model="active">
        <van-tab title="作品通">
          <div class="gz">
            <p>你还没有作品，请前往网页端上传</p>
          </div>
        </van-tab>
        <van-tab title="定制推广">
          <div class="gz">
            <p>立即推广</p>
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
      active: 0,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.MyPhoto {
  font-size: 12rem;

  .attop {
    position: relative;
    .fanh {
      position: absolute;
      top: 20rem;
      left: 20rem;
    }
    h3 {
      width: 100%;
      font-size: 17rem;
      font-weight: bold;

      text-align: center;
      padding: 22rem 0;
      border-bottom: 1rem solid #9a99995c;
    }
  }
  // .btop {
  //   .van-tab {
  //     // border: 1rem solid gray;
  //   }
  // }
  .gz {
    border-top: 1rem solid #9a99995c;
    margin-top: 3rem;
    display: flex;
    width: 100%;
    flex-flow: column wrap;
    height: 82vh;
    justify-content: center;
    align-items: center;
    p {
      margin-top: 2rem;
      color: #9a9999;

      letter-spacing: 1rem;
    }
  }
}
</style>
