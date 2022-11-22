<template>
  <div>
    <div class="content">
      <h4>
        <b>{{ uiCollectionSlideOne?.attribute?.header?.title }}</b> <span>{{ uiCollectionSlideOne?.attribute?.header?.actionName }} <i class="fa fa-angle-right"></i> </span>
      </h4>
      <ul @touchmove.stop="">
        <UiCollectionSlideOneLi v-for="(cs, index) in uiCollectionSlideOne?.children" :key="index" :cs="cs"></UiCollectionSlideOneLi>
      </ul>
    </div>
  </div>
</template>

<script>
import UiCollectionSlideOneLi from "./uiCollectionSlideOneLi.vue";
export default {
  props: {
    uiCollectionSlideOne: Object,
  },
  data() {
    return {
      ucs: this.uiCollectionSlideOne?.children,
    };
  },
  components: { UiCollectionSlideOneLi },
};
</script>

<style lang="less" scoped>
div {
  margin: 20rem 0;
  font-size: 12rem;
  .content {
    h4 {
      width: 100%;
      padding: 10rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > b {
        font-size: 14rem;
      }
      > span {
        font-size: 12rem;
        color: #999;
        > i {
            font-size: 14rem;
        }
      }
    }
    ul {
      overflow-y: hidden;
      overflow-x: auto;
      display: flex;
      align-items: center;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
  }
}
</style>
