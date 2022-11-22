<template>
  <div class="hot-function">
    <ul>
      <li v-for="(f, i) in functionArr" :key="i">
        <figure v-lazy:background-image="f.model.icon"></figure>
        <p>{{ f.model.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    uiFunction: Object,
  },
  data() {
    return {
      functionArr: this.uiFunction.children,
    };
  },
};
</script>

<style lang="less" scoped>
.hot-function{
    >ul{
        display: flex;
        justify-content: space-around;
        align-content: center;
        >li{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10rem 0;
            >figure{
                width: 50rem;
                height: 50rem;
                margin: 5rem 0;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;

            }
            >p{
                font-size: 12rem;
                font-size: #333;
            }
        }
    }
}
</style>
