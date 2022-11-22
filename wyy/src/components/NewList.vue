<template>
  <div class="newlist" @click="$emit('song-id', item)">
    <!-- @click="$emit('new-songid', item.id)" -->
    <div>
      <div>
        <p>{{ item.name }}</p>
        <span class="spans">
          <span class="icon" v-if="item.song.sqMusic"> </span>
          <span>{{ item.song.artists[0].name }}</span>
          <span>-</span>
          <span class="ccc"> {{ item.name }}</span>
        </span>
      </div>
      <div class="pp">
        <div class="play" v-if="item.id !== songId">
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
  name: "NewSong",
  props: {
    item: Object,
    palybt: Boolean,
    songId: Number,
  },
  methods: {
    addd(id) {
      console.log(id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@keyframes log {
  from {
    transform: rotateX(6deg);
  }

  to {
    transform: rotateX(60deg);
  }
}

.newlist {
  padding: 10rem;
  padding-right: 0;
  padding-top: 0;

  &>div {
    display: flex;
    border-bottom: 1rem solid rgba(128, 128, 128, 0.13);

    &>div {
      &:first-of-type {
        width: 88%;
      }

      &:last-of-type {
        width: 12%;
        text-align: center;
        height: 51rem;

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
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .spans {
      width: 100%;
      white-space: nowrap;
    }

    span {
      color: gray;
      display: inline-block;
      padding-bottom: 3rem;

      .icon {
        margin: 0;
        padding: 0;
        width: 12rem;
        height: 8rem;
        background-image: url(../assets/jlt.png);
        background-size: 166rem;
        // background-position: -60rem -20rem;
      }

      .ccc {
        position: relative;
        top: 4rem;
        left: 3rem;
        text-overflow: ellipsis;
        width: 180rem;
        overflow: hidden;
        margin: 0;
        padding: 0;
        line-height: 16rem;
      }

      span {
        margin: 3rem;
      }
    }
  }

  .pp {
    display: flex;
    width: 100%;
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
        height: 20px;

        span {
          transform-origin: bottom;
          animation: log 0.6s linear infinite alternate;
          margin: 2px;
          display: block;
          width: 3px;
          height: 100%;
          background: red;
        }

        span:nth-child(1) {
          animation-delay: 0s;
        }

        span:nth-child(2) {
          animation-delay: 0.2s;
        }

        span:nth-child(3) {
          animation-delay: 0.4s;
        }

        span:nth-child(4) {
          animation-delay: 0.6s;
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
</style>
