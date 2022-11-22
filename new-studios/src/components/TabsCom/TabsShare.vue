<template>
  <div class="share" @click="$store.commit('shareStateUpdate')">
    <div class="content" @click.stop="">
      <ul>
        <li v-for="a in shareApp" :key="a.id">
          <figure v-lazy:background-image="a.img"></figure>
          <p>{{ a.name }}</p>
        </li>
      </ul>
      <ul>
        <li v-for="l in shareLink" :key="l.id" @click="copy">
          <figure v-lazy:background-image="l.img"></figure>
          <p>{{ l.name }}</p>
        </li>
      </ul>
      <button @click.stop="$store.commit('shareStateUpdate')">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shareApp: [
        {
          id: 0,
          img: "image/xpcAll/9j.png",
          name: "微信",
        },
        {
          id: 1,
          img: "image/xpcAll/tm.png",
          name: "朋友圈",
        },
        {
          id: 2,
          img: "image/xpcAll/HI1.png",
          name: "QQ",
        },
        {
          id: 3,
          img: "image/xpcAll/hd2.png",
          name: "微信海报",
        },
        {
          id: 4,
          img: "image/xpcAll/zy.png",
          name: "朋友圈海报",
        },
        {
          id: 5,
          img: "image/xpcAll/Qd.png",
          name: "微博",
        },
      ],
      shareLink: [
        {
          id: 6,
          img: "image/xpcAll/nd.png",
          name: "转发手记",
        },
        {
          id: 7,
          img: "image/xpcAll/VL.png",
          name: "复制链接",
        },
        {
          id: 8,
          img: "image/xpcAll/Gx.png",
          name: "不感兴趣",
        },
        {
          id: 9,
          img: "image/xpcAll/o3.png",
          name: "举报",
        },
      ],
    };
  },
  methods: {
    copy() {
      // console.log("ok");
      let a = document.createElement("textarea");
      a.innerText = location.href;
      document.body.appendChild(a);
      a.select();
      document.execCommand("Copy");
      document.body.removeChild(a);
      this.$store.commit("shareStateUpdate");
      let b = document.createElement("div");
      b.innerText = "复制成功";
      b.className = `xxx`;
      document.querySelector('#app').appendChild(b);
      // setTimeout(() => {
      //   // b.style = "opacity:0;"
      // }, 500)
      setTimeout(() => {
        document.querySelector('#app').removeChild(b);
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.share {
  width: 100%;
  border-radius: 15px 15px 0 0;
  overflow: hidden;

  .content {
    background-color: #f7f7f7;

    ul {
      width: 100%;
      display: flex;
      overflow-y: hidden;
      overflow-x: auto;
      background-color: white;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      border-bottom: 1.5rem solid #f7f7f7;

      // margin-bottom: 1rem;
      li {
        flex-shrink: 0;
        width: 110rem;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        figure {
          width: 30px;
          height: 30px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }

        p {
          font-size: 12px;
          line-height: 12rem;
          margin-top: 10px;
          height: 12rem;
          letter-spacing: 1rem;
        }
      }
    }

    button {
      margin-top: 5rem;
      width: 100%;
      height: 60px;
      border: none;
      background-color: white;
      font-size: 16px;
    }
  }
}
</style>
