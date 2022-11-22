<script setup></script>

<template>
  <div class="selectcity">
    <header>
      <van-icon name="arrow-left" @click="$router.back()" />城市选择
    </header>
  </div>
</template>

<style lang="less" scoped>
.selectcity {
  background: #f7f7f7;
  height: 100%;
  font-size: 12rem;
  header {
    background: white;
    height: 50rem;
    font-weight: bold;
    font-size: 16rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .van-icon-arrow-left {
      position: absolute;
      top: 15rem;
      left: 10rem;
      font-size: 20rem;
    }
  }
}
</style>
