<template>
  <div class="home">
    <!-- <keep-alive> -->

    <router-view />
    <!-- </keep-alive> -->

    <nav>
      <div>
        <router-link to="/home">
          <img src="/image/bar/tabbar_home_selected.png" alt="" v-if="$route.path == '/home'" />
          <img src="/image/bar/tabbar_home_normal.png" alt="" v-else />
          <div>首页</div>
        </router-link>
      </div>
      <div>
        <router-link to="/home/note">
          <img src="/image/bar/wL.png" alt="" v-if="$route.path == '/home/note'" />
          <img src="/image/bar/_w.png" alt="" v-else />
          <!-- <img src="/image/bar/_w.png" alt="" /> -->
          <div>手记</div>
        </router-link>
      </div>
      <div>
        <router-link to="/home/search">
          <img src="/image/zE.png" alt="" v-if="$route.path == '/home/search'" class="search" />
          <img src="/image/bar/searchbar_search.png" alt="" v-else />
          <!-- <img src="/image/bar/searchbar_search.png" alt="" /> -->
          <div>搜索</div>
        </router-link>
      </div>
      <!-- <div>
        <router-link to="/home/class">
          <img src="/image/bar/tabbar_academy_normal.png" alt="" />
          <div>课堂</div>
        </router-link>
      </div> -->
      <div>
        <router-link to="/home/my">
          <img src="/image/bar/tabbar_me_selected.png" alt="" v-if="$route.path == '/home/my'" />
          <img src="/image/bar/tabbar_me_normal.png" alt="" v-else />
          <!-- <img src="/image/bar/tabbar_me_normal.png" alt="" /> -->
          <div>我的</div>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "NavView",
  components: {
    // HelloWorld
  },
};
</script>
<style lang="less" scoped>
.home {
  font-size: 12rem;

  padding-bottom: 63rem;

  nav {
    height: 70rem;
    background-color: white;
    border-top: 1rem solid rgba(220, 216, 216, 0.826);
    padding-top: 16rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;

    // .search {
    // img {
    //   width: 22rem;
    // }
    // img:nth-of-type(1) {
    // width: 33rem;
    // margin-top: -10rem;
    // }
    // }

    div {
      width: 18%;
      text-align: center;

      a {
        text-decoration: none;
        color: gray;

        img {
          width: 22rem;
        }

        div {
          margin-top: 2rem;
          width: 100%;
          font-size: 10rem;
          // text-align: center;
        }
      }
    }
  }
}
</style>