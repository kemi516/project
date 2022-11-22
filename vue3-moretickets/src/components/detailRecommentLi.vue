<script setup>
import { ref, watch } from "vue";
const prop = defineProps(["recomment"]);
const recom = ref(prop.recomment);
const num = ref(0);

// 刷新页面
import { detaillStore } from "../stores/detaill.ts";
const storeD = detaillStore();
const xxx = () => {
  storeD.isTranStore = false;
  storeD.tranName = "zzYY";
  setTimeout(() => {
    storeD.keyIndex++;
  }, 10);
};
</script>

<template>
  <li
    class="recom-li li"
    @click.stop="
      $router.push({ path: '/detail', query: { showID: recom?.showOID } });
      xxx();
    "
  >
    <figure>
      <img :src="recom?.posterURL" alt="" />
    </figure>
    <div class="content">
      <h4>{{ recom?.showName }}</h4>
      <p
        class="time"
        :style="
          recom?.discount < 1 && recom?.discount > 0
            ? `padding-right: 42rem;`
            : ``
        "
      >
        {{ recom?.firstShowTime }} - {{ recom?.lastShowTime }}
        <span v-if="recom?.discount < 1 && recom?.discount > 0" class="recom-zk"
          >{{ (recom?.discount * 10).toFixed(1) }} <i>折起</i>
        </span>
      </p>
      <p
        class="site"
        :style="
          recom?.discount < 1 && recom?.discount > 0
            ? `padding-right: 42rem;`
            : ``
        "
      >
        {{ recom?.venueName }}
      </p>
      <p
        v-if="recom?.showStatus.code === 3 && recom?.minPrice > 0"
        class="price"
      >
        {{ recom?.minPrice }} <span>元起</span>
      </p>
      <p v-else-if="recom?.showStatus.code === 3" class="wuPiao">暂时缺票</p>
      <p v-else-if="recom?.showStatus.code === 1" class="noShou">未开售</p>
    </div>
  </li>
</template>

<style lang="less" scoped>
.recom-li.li {
  width: 100%;
  margin-bottom: 50rem;
  display: flex;
  figure,
  h4,
  h3,
  h6,
  h4,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  > figure {
    flex-shrink: 0;
    width: 110rem;
    height: 148rem;
    margin-right: 15em;
    overflow: hidden;
    border-radius: 5rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5rem;
      object-fit: cover;
    }
  }
  > .content {
    flex-shrink: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    > h4 {
      font-size: 16rem;
      font-weight: 600;
      line-height: 26rem;
      max-height: 52rem;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    > .time {
      box-sizing: border-box;
      margin: 0;
      margin-top: 16rem;
      transform-origin: left;
      font-size: 12rem;
      letter-spacing: 0;
      color: #666;
      width: 100%;
      text-overflow: ellipsis;
      position: relative;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      > .recom-zk {
        position: absolute;
        right: 0;
        top: 0;
        width: 40rem;
        height: 40rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        background-image: linear-gradient(-45deg, #ff1341, #fe088d);
        color: white;
        box-shadow: 0 0 8rem 0 #ff1341;
        font-size: 18rem;
        letter-spacing: -1rem;
        font-weight: 600;
        margin: 0;
        z-index: 10;
        > i {
          margin-top: -3rem;
          font-style: normal;
          font-size: 12rem;
          color: white;
          height: 8rem;
          font-weight: 400;
          transform-origin: top;
          transform: scale(0.6);
          letter-spacing: 1rem;
        }
      }
    }
    > .site {
      margin: 0;
      font-size: 13rem;
      color: #666;
      max-height: 28rem;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      box-sizing: border-box;
      background-color: #f6f6f6;
      position: relative;
    }
    > .price {
      margin-top: 16rem;
      font-size: 15rem;
      letter-spacing: 0;
      color: red;
      font-weight: 600;
      > span {
        display: inline-block;
        transform-origin: left;
        transform: scale(0.8);
        font-size: 12rem;
        font-weight: 500;
      }
    }
    > .noShou {
      color: rgb(23, 211, 167);
      margin-top: 15rem;
      width: 45rem;
      text-align: center;
      border: 1px solid rgb(23, 211, 167);
      border-radius: 2rem;
      transform: scale(0.8);
      transform-origin: left;
    }
    > .wuPiao {
      width: 60rem;
      text-align: center;
      margin-top: 15rem;
      display: inline;
      color: rgb(143, 143, 143);
      border: 1px solid #666;
      border-radius: 2rem;
      transform: scale(0.8);
      transform-origin: left;
    }
  }
}
</style>
