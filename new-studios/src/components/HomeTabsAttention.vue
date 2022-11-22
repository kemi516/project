<template>
  <div class="tabs-attention">
    <figure v-lazy:background-image="'image/xpcAll/Of.png'">
      <div class="title">
        您还没有关注哦~<br />
        向左滑动看看右边精彩内容吧！
      </div>
    </figure>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tabs-attention {
  width: 100vw;
  height: 90vh;
  > figure {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      text-align: center;
      font-size: #888;
      font-size: 12rem;
      margin-top: -200rem;
      line-height: 20rem;
    }
  }
}
</style>