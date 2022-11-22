<template>
  <div class="service-assurance">
    <!-- <div class="stop">
      <img src="../../public/assets/安全.png" alt="" />
      <span>服务保障</span>
    </div>
    <div class="run">
        <span>票品保真</span>
        <span>假一赔三</span>
        <span>无票赔付</span>
        <span>闪电退转</span>
        <span>专业售后</span>
    </div> -->
    <van-notice-bar
      class="bar"
      left-icon="../../public/assets/安全.png"
      background="rgba(182, 182, 182, 0.062)"
      color="rgba(128, 128, 128, 0.49)"
      text="&nbsp;|&nbsp;&nbsp;票品保真&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;假一赔三&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;无票赔付&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;闪电退转&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;专业售后&nbsp;&nbsp;|"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.service-assurance {
  padding: 0 20rem;
  /* background-color: rgba(182, 182, 182, 0.062); */
}
.van-notice-bar {
  font-size: 13rem;
  padding: 0 10rem;
}
</style>
