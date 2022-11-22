<template>
  <div class="li" v-if="t?.cover">
    <img :src="t?.cover + '?x-oss-process=image/resize,m_mfit,w_212'" alt="" />
    <div class="wenzi">
      <h5>{{ t?.title }}</h5>
      <p>
        播放量
        {{
        (t?.count?.count_view / 10000).toFixed(1) > 1
        ? (t.count?.count_view / 10000).toFixed(1) + "w"
        : t.count?.count_view > 1000
        ? (t.count?.count_view / 1000).toFixed(1) + "k"
        : t.count?.count_view
        }}
        · 喜欢
        {{
        (t.count?.count_like / 10000).toFixed(1) > 1
        ? (t.count?.count_like / 10000).toFixed(1) + "w"
        : t.count?.count_like > 1000
        ? (t.count?.count_like / 1000).toFixed(1) + "k"
        : t.count?.count_like
        }}
      </p>
      <div class="touxiang">
        <img class="author" :src="t.author?.userinfo.avatar" alt="" />
        <span>{{ t.author?.userinfo.username }}</span>
        <img class="vip" v-if="t.author?.userinfo.vip_flag == 1" src="image/xpcAll/5X.png" alt="" />
        <img class="vip" v-if="t.author?.userinfo.vip_flag == 3" src="image/xpcAll/2h.png" alt="" />
        <div class="renzhen">
          <img v-if="t.author?.userinfo.author_type == 1" src="image/xpcAll/nV.png" alt="" />
          <img v-if="t.author?.userinfo.author_type == 2" src="image/xpcAll/O_1.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["t"],
};
</script>

<style lang="less" scoped>
div.li {
  width: 100%;
  padding: 10rem 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(217, 217, 217);

  >img {
    flex-shrink: 0;
    width: 150rem;
    height: 83rem;
    border-radius: 5rem;
    object-fit: cover;
  }

  .wenzi {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10rem;

    h5 {
      font-size: 14rem;
      font-weight: 500;
      margin: 5rem 0;
    }

    p {
      position: relative;
      left: -10rem;
      color: #bbb;
      transform: scale(0.8);
      font-size: 12rem;
    }

    .touxiang {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 5rem;

      .author {
        width: 20rem;
        height: 20rem;
        border-radius: 50%;
        // margin-top: 5rem;
      }

      span {
        margin-left: 2rem;
        // margin-top: 5rem;
        font-size: 12rem;
        transform: scale(0.9);
      }

      .vip {
        width: 14rem;
        margin-left: 5rem;
      }

      .renzhen {
        position: absolute;
        // left: 200rem;
        left: 12rem;
        bottom: -3rem;

        >img {
          width: 8rem;
          border: 1px solid #fff;
          border-radius: 50%;
          background-color: #fff;
          //   position: absolute;
          //   top: 0;
        }
      }
    }
  }
}
</style>
