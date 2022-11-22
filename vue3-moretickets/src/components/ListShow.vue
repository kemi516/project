<template>
  <div class="session">
    <div
      v-for="ticket in tickets"
      class="ticket"
      @click="
        $router.push({ path: 'detail', query: { showID: ticket.showOID } })
      "
    >
      <van-image
        width="100rem"
        height="134rem"
        fit="cover"
        position="left"
        :src="ticket.posterURL"
      />
      <div class="ticket-content">
        <div>
          <h3>{{ ticket.showName }}</h3>
        </div>
        <div class="content">
          <div>
            <p>{{ ticket.firstShowTime }}-{{ ticket.lastShowTime }}</p>
            <p>{{ ticket.venueName }}</p>
          </div>
          <p v-show="ticket.discount < 1 && ticket.discount > 0">
            <span>{{ (ticket.discount * 10).toFixed(1) }}</span>
            <span>折起</span>
          </p>
        </div>
        <div style="color: red; width: auto">
          <p v-if="ticket.minPrice">{{ ticket.minPrice }} <span>元起</span></p>
          <span v-else class="kai">未开售</span>
        </div>
      </div>
    </div>
    <!-- 加载 -->
    <van-loading
      v-show="isHaiYou && tickets?.length > 0"
      style="height: 40rem; margin-top: 0; text-align: center"
      color="#f00"
      size="40"
    />
    <div
      v-show="!isHaiYou && tickets?.length > 0"
      style="
        height: 16rem;
        margin-top: 0;
        text-align: center;
        font-size: 13rem;
        color: #999;
      "
    >
      没有更多啦~
    </div>
    <!-- 无节目数据时显示无解 -->
    <div v-if="!tickets" class="wujie">
      <figure>
        <img src="../../public/assets//N-.png" alt="" />
      </figure>
      <h3>暂无相关的节目</h3>
      <p>可以选择其他类型重新看看</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tickets: Array,
  isHaiYou: Boolean,
});
</script>

<style lang="less" scoped>
* {
  padding: 0;

  margin: 0;
}

.session {
  margin-bottom: 77rem;
  padding: 0 15rem;
  width: 100%;
  box-sizing: border-box;
  > .wujie {
    width: 100vw;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    > figure {
      width: 140rem;
      height: 140rem;
      margin: 30rem 0 10rem 0;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    > h3 {
      font-weight: 500;
      font-size: 16rem;
      color: #333;
      margin: 5rem 0;
    }
    > p {
      color: #999;
      font-size: 12rem;
      letter-spacing: 1rem;
    }
  }
  .ticket {
    width: 100%;
    margin: 30rem 0;
    box-sizing: border-box;
    display: flex;

    .van-image {
      border-radius: 3rem;
      margin-right: 10rem;
    }

    > div {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      flex-shrink: 0;
    }

    .ticket-content {
      font-size: 14rem;
      width: 68%;
      display: flex;
      justify-content: space-between;
      flex-flow: column;

      > div {
        width: 100%;
        overflow: hidden; // 超出的文本隐藏

        text-overflow: ellipsis; // 溢出用省略号显示

        display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示。

        -webkit-line-clamp: 2; // 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。

        -webkit-box-orient: vertical; // 从上到下垂直排列子元素(设置伸缩盒子的子元素排列方式)

        p {
          font-size: 16rem;
          font-weight: bold;

          span {
            font-size: 12rem;
            font-weight: 400;
          }
        }

        .kai {
          display: inline-block;
          color: #16c27a;
          border: 1px solid rgba(22, 194, 122, 0.3);
          font-size: 12rem;
          padding: 1rem;
          border-radius: 2rem;
        }
      }

      .content {
        display: flex;
        justify-content: space-between;

        > div {
          width: 100%;
          overflow: hidden;
          p {
            font-size: 14rem;
            font-weight: 400;
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }

        > p {
          flex-shrink: 0;
          padding: 10rem;
          width: 36rem;
          height: 36rem;
          color: #fff;
          background-image: linear-gradient(315deg, #ff1d41, #ee0e87);
          box-shadow: 0 0 8px 0 rgb(250 24 88 / 50%);
          border-radius: 100%;
          text-align: center;
          transform: scale(0.7);

          span:nth-of-type(1) {
            font-weight: 600;
            font-size: 20rem;
          }

          span:nth-of-type(2) {
            font-weight: 400;

            transform: scale(0.5);
            font-size: 12rem;
          }
        }
      }
    }
  }
}
</style>
