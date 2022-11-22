<template>
  <div class="HotList" @click="$emit('hot-list', item)">
    <div class="left">
      {{ String(index + 1).padStart(2, 0) }}
    </div>
    <div class="right">
      <div>
        <p>{{ item.name }}</p>
        <span>
          <span class="icon" v-if="item.sq"> </span>
          {{ item.ar[0].name }}
          <span>-</span>
          {{ item.al.name }}
        </span>
      </div>
      <!-- <div>
        <i class="fa fa-play-circle-o fa-3x" aria-hidden="true"></i>
      </div> -->
      <div class="pp">
        <div class="play" v-if="item?.id !== song?.id">
          <!-- <i class="fa fa-play-circle-o fa-3x" aria-hidden="true"></i> -->
        </div>
        <div class="play active" :class="{ palybt: !palybt }" v-else>
          <!-- <i class="fa fa-play-circle-o fa-3x" aria-hidden="true"></i> -->
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotList",
  props: {
    item: Object,
    index: Number,
    song: Object,
    palybt: Boolean,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
@keyframes log {
  from {
    transform: rotateX(6deg);
  }

  to {
    transform: rotateX(60deg);
  }
}

.HotList {
  padding-top: 10rem;

  display: flex;

  &>div {
    &:first-of-type {
      width: 10%;
    }

    &:last-of-type {
      border-bottom: 1rem solid rgba(128, 128, 128, 0.13);
      width: 90%;

      i {
        color: gray;
        line-height: 44rem;
        font-size: 22rem;
      }
    }
  }

  p {
    padding-bottom: 3rem;
    font-size: 17rem;
  }

  span {
    color: gray;
    display: inline-block;

    .icon {
      margin: 0;
      padding: 0;
      width: 12rem;
      height: 8rem;
      background-image: url(../assets/jlt.png);
      background-size: 166rem;
      background-position: 0rem 0rem;
    }

    span {
      margin: 3rem;
    }
  }

  .left {
    text-align: center;
    line-height: 48rem;
    color: gray;
    font-weight: 500;
    font-size: 17rem;
  }

  .right {
    display: flex;
    padding-bottom: 3rem;

    div {
      &:first-of-type {
        width: 90%;
      }
    }
  }

  .pp {
    display: flex;
    width: 16%;
    height: 51rem;
    align-items: center;

    .play {
      background-image: url(../assets/jlt.png);
      width: 22rem;
      height: 22rem;
      background-position: -24rem 0rem;
      background-size: 166rem;

      &.active {
        background-image: none;
        display: flex;
        height: 20rem;

        span {
          transform-origin: bottom;
          animation: log 0.6s linear infinite alternate;
          margin: 2rem;
          display: block;
          width: 2rem;
          height: 100%;
          background: red;
        }

        span:nth-child(1) {
          animation-delay: 0s;
        }

        span:nth-child(2) {
          animation-delay: -0.2s;
        }

        span:nth-child(3) {
          animation-delay: -0.4s;
        }

        span:nth-child(4) {
          animation-delay: -0.6s;
        }
      }

      &.palybt {
        span {
          animation-play-state: paused;
        }
      }
    }
  }
}

.hot {
  .HotList:nth-child(-n + 3) {
    .left {
      color: #df3436;
    }
  }
}
</style>
