<template>
  <div class="MySpace">
    <div class="attop">
      <div class="fanh" @click="$router.push({ path: '/home/my' })">
        <img src="image/返回/mf.png" alt="" />
      </div>
      <h3>私密视频</h3>
    </div>
    <div class="gz">
      <!-- <img src="image/me/无关注.jpg" alt="" /> -->
      <p>体验不限速下载，高清在线观看，实时协作共享</p>
      <p>请前往“我的”页面上传私密视频</p>
    </div>
  </div>
</template>

<script>
export default {
  // name: "HelloWorld",
  props: {
    // msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.MySpace {
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
  .gz {
    display: flex;
    width: 100%;
    flex-flow: column wrap;
    height: 88vh;
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
