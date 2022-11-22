<template>
  <li>
    <figure v-lazy:background-image="cs.model.resource?.avatar" class="head">
      <img v-if="cs?.model.resource?.author_type == 2" v-lazy="'image/xpcAll/O_1.png'" alt="" />
      <img v-if="cs.model.resource?.author_type == 1" class="one" v-lazy="'image/xpcAll/nV.png'" alt="" />
    </figure>
    <p class="name">
      <span>{{ cs.model.resource.username }}</span>
      <img v-if="cs.model.resource?.vip_status == 1" v-lazy="'image/xpcAll/mq.png'" alt="" />
      <img v-if="cs.model.resource?.vip_flag == 3" class="svip" v-lazy="'image/xpcAll/2h.png'" alt="" />
    </p>
    <p class="fame">
      <span>{{ cs?.model?.resource.count.count_article }}&nbsp;作品&nbsp;·</span><span>&nbsp;{{ cs?.model?.resource.count.count_follower }}&nbsp;粉丝</span>
    </p>
    <p class="post">{{ cs?.model?.resource.occupation }}</p>
    <button
      v-show="!attenState"
      @click.stop="
        attenState = true;
        addAtten(cs?.model?.resource.id);
      "
    >
      + 关注
    </button>
    <button
      v-show="attenState"
      class="atten"
      @click.stop="
        attenState = false;
        delAtten(cs?.model?.resource.id);
      "
    >
      已关注
    </button>
  </li>
</template>

<script>
export default {
  props: {
    cs: Object,
  },
  data() {
    return {
      attenState: false,
    };
  },
  created() {
    let a = localStorage.getItem("attenArr");

    if (a && a[0] == "[") {
      let b = JSON.parse(a).findIndex((e) => e == this.cs?.model?.resource.id);
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
  flex-shrink: 0;
  background-color: white;
  border-radius: 10rem;
  margin-right: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150rem;
  box-sizing: content-box;
  padding: 15rem 10rem;
  overflow: hidden;
  &:last-child {
    margin-right: 0;
  }
  figure {
    width: 50rem;
    height: 50rem;
    margin-bottom: 10rem;
    margin-top: 5rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    margin-right: 5rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-shrink: 0;
    border: 1rem solid #999;
    > img {
      width: 10rem;
      height: 10rem;
      margin-right: 3.5rem;
      margin-bottom: 0rem;
      display: block;
      border-radius: 50%;
      border: 1rem solid #fff;
      background-color: white;
      &.one {
        margin-right: 3rem;
        margin-bottom: 1.5rem;
      }
    }
  }
  .name {
    font-size: 12rem;
    display: flex;
    white-space: nowrap;
    flex-shrink: 1;
    overflow: hidden;
    max-width: 100%;
    span {
      flex-shrink: 0;
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
      > img {
        width: 16rem;
      }
    }
    img {
      flex-shrink: 0;
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
  .fame {
    margin: 5rem 0 0 0;
    color: #888;
    font-size: 12rem;
  }
  .post {
    font-size: 12rem;
    color: #888;
  }
  button {
    width: 80rem;
    background-color: red;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14rem;
    border-radius: 200rem;
    border: none;
    padding: 5rem 8rem;
    margin: 10rem 0 0 0;
    &.atten {
      background-color: #bbb;
      color: #666;
    }
  }
}
</style>
