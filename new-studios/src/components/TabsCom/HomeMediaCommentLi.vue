<template>
  <li v-if="m">
    <div class="head">
      <figure :style="{ 'background-image': `url('image/xpcAll/rS.png')` }"><img :src="`${m?.userInfo?.avatar}`" alt="" /></figure>
      <img v-if="m?.userInfo?.author_type == 2" v-lazy="'image/xpcAll/O_1.png'" alt="" />
      <img v-if="m?.userInfo?.author_type == 1" class="one" v-lazy="'image/xpcAll/nV.png'" alt="" />
    </div>
    <div class="right">
      <div class="top">
        <div class="name">
          <div>
            <span>{{ m?.userInfo?.username }}</span>
            <img v-if="m?.userInfo?.vip_status == 1" v-lazy="'image/xpcAll/mq.png'" alt="" />
            <img v-if="m?.userInfo?.vip_flag == 3" class="svip" v-lazy="'image/xpcAll/2h.png'" alt="" />
            <span v-if="composerArr?.findIndex((e) => e.userinfo.id == m?.userInfo.id) !== -1" class="composer">本片创作人</span>
          </div>
          <figure style="background-image: url('image/xpcAll/xS.png')"></figure>
        </div>
        <p>
          <span v-if="m?.referer" class="huifu">回复 {{ m?.referer.userInfo.username }}<i>:</i></span> <span v-html="m?.content"></span>
        </p>
      </div>
      <div class="bottom">
        <div class="time-spot">
          <span>{{ dateCom(new Date(m.addtime * 1000)) }}</span>
          <span v-if="m?.ip_location">·{{ m.ip_location }}</span>
        </div>
        <div class="comment-praise">
          <figure style="background-image: url('image/xpcAll/l5.png')"></figure>
          <div>
            <figure
              @click.stop="
                countApprove = true;
                m.count_approve++;
              "
              v-show="!countApprove"
              style="background-image: url('image/xpcAll/gR.png')"
            ></figure>
            <figure
              @click.stop="
                countApprove = false;
                m.count_approve--;
              "
              v-show="countApprove"
              style="background-image: url('image/xpcAll/1O1.png')"
            ></figure>
            <span>{{ m?.count_approve | matrixing }}</span>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    mm: Object,
    composerArr: Array,
  },
  data() {
    return {
      countApprove: false,
      m: this?.mm,
    };
  },
  methods: {
    dateCom(o) {
      let n = new Date();
      if (o.getFullYear() != n.getFullYear()) {
        return o
          .toLocaleDateString()
          .split("/")
          .map((e) => e.padStart(2, "0"))
          .join("-");
      } else if (o.getDate() + 1 == n.getDate() && o.getMonth() == n.getMonth()) {
        return "昨天" + o.toLocaleTimeString().slice(-10, -3);
      } else if (o.getDate() == n.getDate() && o.getMonth() == n.getMonth()) {
        return o.toLocaleTimeString().slice(-10, -3);
      } else {
        return (o.getMonth()+1+'' ).padStart(2, "0") + "-" + (o.getDate()+'').padStart(2, "0");
      }
    },
  },
};
</script>

<style lang="less" scoped>
li {
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 15rem 0;
  .head {
    flex-shrink: 0;
    position: relative;
    > figure {
      margin: 0 15rem 0 5rem;
      width: 40rem;
      height: 40rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 50%;
      border: 1px solid #999;
      overflow: hidden;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    > img {
      position: absolute;
      right: 18rem;
      top: 25rem;
      width: 14rem;
      height: 14rem;
      object-fit: cover;
      border: 1px solid rgb(255, 255, 255);
      border-radius: 50%;
      background-color: #fff;
    }
  }

  > div.right {
    width: 100%;
    > .top {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > .name {
        display: flex;
        justify-content: space-between;
        width: 100%;
        > div {
          > span {
            flex-shrink: 1;
            font-size: 12rem;
            color: #999;
            &.composer {
              transform: scale(0.9);
              padding: 2rem 8rem;
              background-color: #eee;
              color: #333;
              border-radius: 100rem;
              display: inline-block;
              margin: 0 8rem;
            }
          }
          > img {
            width: 12rem;
            height: 12rem;
            object-fit: cover;
            margin-left: 10rem;
            &.svip {
              width: 24rem;
            }
          }
        }
        > figure {
          width: 3rem;
          padding: 0 10rem;
          height: 20rem;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 10%;
        }
      }
      p {
        font-size: 13rem;
        color: #333;
        > span.huifu {
          font-size: 13rem;
          color: #999;
          > i {
            color: #333;
          }
        }
      }
    }
    > .bottom {
      margin: 15rem 0 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      > .time-spot {
        width: 100%;
        font-size: 12rem;
        flex-shrink: 1;
        color: #999;
      }
      > .comment-praise {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
        > figure {
          width: 12rem;
          height: 12rem;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          margin-right: 15rem;
          flex-shrink: 0;
        }
        > div {
          display: flex;
          > figure {
            width: 12rem;
            height: 12rem;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            flex-shrink: 0;
            margin: 0 5rem 0 0;
          }
          > span {
            font-size: 12rem;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
