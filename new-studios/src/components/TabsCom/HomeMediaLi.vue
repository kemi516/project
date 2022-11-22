<template>
  <li>
    <figure>
      <img class="tx" v-lazy="t?.userinfo?.avatar" alt="">
      <img v-if="t.userinfo?.author_type == 2" v-lazy="'image/xpcAll/O_1.png'" alt="" />
      <img v-if="t.userinfo?.author_type == 1" class="one" v-lazy="'image/xpcAll/nV.png'" alt="" />
    </figure>
    <div class="username">
      <h3>
        <span>{{ t.userinfo.username }}</span>
        <img v-if="t.userinfo?.vip_status == 1" v-lazy="'image/xpcAll/mq.png'" alt="" />
        <img v-if="t.userinfo?.vip_flag == 3" class="svip" v-lazy="'image/xpcAll/2h.png'" alt="" />
      </h3>
      <p>{{ t.role }}</p>
    </div>
    <div class="atten">
      <button @click="
        attenState = true;
        addAtten(t?.userinfo.id);
      " v-show="!attenState">
        关注
      </button>
      <button @click="
        attenState = false;
        delAtten(t?.userinfo.id);
      " v-show="attenState" :class="{ ok: true }">
        已关注
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["t"],
  data() {
    return {
      attenState: false,
    };
  },
  created() {
    let a = localStorage.getItem("attenArr");

    if (a && a[0] == "[") {
      let b = JSON.parse(a).findIndex((e) => e == this.t?.userinfo.id);
      this.attenState = !(b == -1);
    }
  },
  methods: {
    addAtten(n) {
      let aa = localStorage.getItem("attenArr");
      if (aa && aa[0] == "[") {
        let c = JSON.parse(aa);
        c.push(n);
        localStorage.setItem("attenArr", JSON.stringify(c));
      } else {
        localStorage.setItem("attenArr", JSON.stringify([n]));
      }
    },
    delAtten(n) {
      let aa = localStorage.getItem("attenArr");
      if (aa && aa[0] == "[") {
        let dd = JSON.parse(aa);
        localStorage.setItem("attenArr", JSON.stringify(dd.filter((e) => e != n)));
      }
    },
  },
};
</script>

<style lang="less" scoped>
li {
  width: 280rem;
  height: 70rem;
  display: flex;
  padding: 5rem 10rem;
  background-color: white;
  box-shadow: 0rem 3rem 10rem 2rem rgb(242, 242, 242);
  margin-right: 20rem;
  flex-shrink: 0;
  border-radius: 6rem;
  justify-content: space-between;
  align-items: center;

  >figure {
    flex-shrink: 0;
    width: 50rem;
    height: 50rem;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 5rem;
    margin-right: 10rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-shrink: 0;
    border: 1rem solid #999;

    .tx {
      width: 100%;
      height: 100%;

      // left: 22rem;
      flex-shrink: 0;
      z-index: 0;

      img {
        width: 100%;
      }
    }

    position: relative;

    >img {
      width: 15rem;
      height: 15rem;
      // margin-right: 3.5rem;
      margin-bottom: 0rem;
      display: block;
      border-radius: 50%;
      border: 1rem solid #fff;
      background-color: white;

      position: absolute;

      &.one {
        margin-right: 3rem;
        margin-bottom: 1.5rem;
      }
    }
  }

  >div.username {
    flex-shrink: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    >h3 {
      font-size: 14rem;
      color: #333;
      display: flex;
      white-space: nowrap;
      flex-shrink: 1;
      overflow: hidden;
      max-width: 100%;

      span {
        font-size: 14rem;
        color: rgb(29, 29, 29);
        font-weight: 600;
        font-family: "宋体";
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;

        &:first-child {
          display: inline-block;
          flex-shrink: 1;
        }

        &.role {
          color: #a3a3a3;
          display: inline-block;
          flex-shrink: 0;
        }

        //   > img {
        //     width: 16rem;
        //   }
      }

      img {
        flex-shrink: 0;
        display: block;
        margin: 0 5rem;
        width: 20rem;
        height: 16rem;

        &.svip {
          margin: 2rem 5rem 0;
          width: 38rem;
          height: 15rem;
          border-radius: 3rem;
        }
      }
    }

    >p {
      font-size: 12rem;
      margin: 5rem 0 0 0;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      letter-spacing: 1rem;
    }
  }

  >.atten {
    flex-shrink: 0;
    height: 100%;
    position: relative;

    >button {
      background-color: #ffedea;
      color: #ff5e6e;
      border: none;
      border-radius: 100rem;
      width: 60rem;
      font-size: 12rem;
      padding: 6rem 10rem;
      margin: 16.5rem 0;

      &.ok {
        color: rgb(174, 174, 174);
        background-color: rgb(235, 235, 235);
      }
    }
  }
}
</style>
