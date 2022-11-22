<template>
  <div class="MyInformation">
    <div class="attop">
      <div class="fanh" @click="$router.push({ path: '/home/my' })">
        <img src="image/返回/mf.png" alt="" />
      </div>
      <h3>认证中心-新片场</h3>
      <div class="fx">
        <img src="image\评论分享下载收藏\uN.png" alt="" />
      </div>
    </div>
    <div class="btop">
      <p>xx</p>
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
.MyInformation {
  font-size: 12rem;

  .attop {
    position: relative;
    .fanh {
      position: absolute;
      top: 20rem;
      left: 20rem;
    }
    .fx {
      width: 16rem;
      height: 16rem;
      position: absolute;
      top: 25rem;
      right: 25rem;
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
  .btop {
    p {
      margin-top: 2rem;
      // color: #9a9999;

      letter-spacing: 1rem;
    }
  }
  // .gz {
  //   border-top: 1rem solid #9a99995c;
  //   margin-top: 3rem;
  //   display: flex;
  //   width: 100%;
  //   flex-flow: column wrap;
  //   height: 82vh;
  //   justify-content: center;
  //   align-items: center;

  // }
}
</style>
