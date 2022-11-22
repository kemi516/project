<template>
  <div class="ui-middle-card" @click.stop="videoDetails">
    <section class="card">
      <figure class="img" v-lazy:background-image="uiMiddleCardData.resource.cover">
        <img v-if="uiMiddleCardData.resource.badge == 'vmovier'" v-lazy="'image/xpcAll/N1.png'" />
        <img v-if="uiMiddleCardData.resource.badge == 'recommend'" v-lazy="'image/xpcAll/vz.png'" />
        <div class="img-bottom">
          <div class="img-eye">
            <img class="" v-lazy="'image/xpcAll/eye.png'" />
            <span>
              {{
              uiMiddleCardData.resource.count.count_view >= 10000
              ? uiMiddleCardData.resource.count.count_view >= 100000000
              ? (uiMiddleCardData.resource.count.count_view / 100000000).toFixed(1) + "e"
              : (uiMiddleCardData.resource.count.count_view / 10000).toFixed(1) + "w"
              : uiMiddleCardData.resource.count.count_view >= 1000
              ? (uiMiddleCardData.resource.count.count_view / 1000).toFixed(1) + "k"
              : uiMiddleCardData.resource.count.count_view
              }}</span>
          </div>
          <div class="praise">
            <img class="" v-lazy="'image/xpcAll/u9.png'" />
            <span>
              {{
              uiMiddleCardData.resource.count.count_like >= 10000
              ? uiMiddleCardData.resource.count.count_like >= 100000000
              ? (uiMiddleCardData.resource.count.count_like / 100000000).toFixed(1) + "e"
              : (uiMiddleCardData.resource.count.count_like / 10000).toFixed(1) + "w"
              : uiMiddleCardData.resource.count.count_like >= 1000
              ? (uiMiddleCardData.resource.count.count_like / 1000).toFixed(1) + "k"
              : uiMiddleCardData.resource.count.count_like
              }}
            </span>
          </div>
          <div class="duration">
            <span>{{ ("" + (uiMiddleCardData.resource.duration / 60).toFixed(0)).padStart(2, "0") }}'{{
            ("" + (uiMiddleCardData.resource.duration % 60).toFixed(0)).padStart(2, "0")
            }}"</span>
          </div>
        </div>
      </figure>
      <div class="content">
        <h4>
          {{ uiMiddleCardData.resource.title }}
        </h4>
        <p>
          <span>{{ forName(uiMiddleCardData.resource.author.userinfo.username, uiMiddleCardData.resource.team) }}
            <img v-if="uiMiddleCardData.resource.author.userinfo.vip_status == 1" v-lazy="'image/xpcAll/mq.png'"
              alt="" />
          </span>

          <img class="share" v-lazy="'image/xpcAll/u5.png'" alt="" @click.stop="share()" />
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    uiMiddleCard: Object,
  },
  data() {
    return {
      uiMiddleCardData: this.uiMiddleCard?.children[0]?.model,
    };
  },
  methods: {
    forName(name, arr) {
      let a = "";
      arr?.forEach((e) => {
        a += " " + e.userinfo.username;
      });
      return name + a;
    },
    share() {
      console.log("share");
      this.$store.commit("shareStateUpdate");
    },
    videoDetails() {
      console.log("xxx");
      this.$router.push({
        path: "/media",
        query: {
          // data: JSON.stringify(this.uiMiddleCardData),
          id: this.uiMiddleCardData.resource.id,
          video: null
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ui-middle-card {
  flex-shrink: 0;
  flex-grow: 0;

  .card {
    width: calc(50vw - 10rem - 5rem);
    margin: 5rem 0;
    background-color: white;
    border-radius: 5rem;
    overflow: hidden;

    .img {
      width: 100%;
      height: 25vw;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      display: flex;
      align-items: flex-end;

      >img {
        position: absolute;
        width: 20rem;
        height: 20rem;
        left: 10rem;
        top: 8rem;
        border-radius: 50%;
      }

      .img-bottom {
        height: 30rem;
        width: 100%;
        padding: 0 10rem;
        // background-color: transparent;
        background-image: linear-gradient(to top, #00000084 0 50%, transparent 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;

        >.img-eye {
          flex-shrink: 0;
          transform: scale(0.8);

          >img {
            display: inline-block;
            width: 15rem;
            margin-right: 4rem;
          }

          span {
            font-size: 12rem;
            color: white;
            transform: scale(0.9);
          }
        }

        .praise {
          flex-shrink: 1;
          width: 100%;
          transform: scale(0.8);

          >img {
            display: inline-block;
            width: 14rem;
            margin: 0 2rem;
          }

          span {
            font-size: 12rem;
            color: white;
            transform: scale(0.8);
          }
        }

        .duration {
          padding-top: 3rem;
          transform: scale(0.8);
          flex-shrink: 0;
          font-size: 12rem;
        }
      }
    }

    .content {
      box-sizing: border-box;
      width: 100%;
      padding: 10rem;
      margin: 0;

      >h4 {
        padding: 0;
        margin: 0;
        font-size: 13rem;
        line-height: 20rem;
        height: 40rem;
        overflow: hidden;
        color: #181818;
      }

      >p {
        height: 20rem;
        line-height: 20rem;
        display: flex;
        // overflow: hidden;
        justify-content: start;
        position: relative;

        >span:first-child {
          line-height: 20rem;
          color: #a1a1a1;
          display: inline-block;
          transform-origin: left;
          font-size: 13rem;
          transform: scale(0.85);
          // background-color: lightblue;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          position: relative;
          padding-right: 20rem;

          img {
            position: absolute;
            right: 0;
            width: 17rem;
            height: 14rem;
          }
        }

        >img.share {
          flex-shrink: 0;
          // margin: 5rem;
          margin-top: 5rem;
          height: 10rem;
          position: absolute;
          right: -1rem;
          padding: 0 5rem;
          // background-color: lightblue;
        }

        // >.red-birck{
        //   width: 15rem;
        //   display: flex;
        //   justify-content: start;
        //   margin-right: 20rem;

        // }
      }
    }
  }
}
</style>
