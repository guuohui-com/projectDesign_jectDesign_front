<template>
  <van-nav-bar
    title="标题"
    left-text="返回"
    right-text=""
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
</template>

<script>
  import { Toast } from 'vant';
  export default {
        name: "navBar",
        methods: {
          onClickLeft() {
            this.$router.go(-1);
          },
          onClickRight() {
            Toast('按钮');
          },
        },
    }
</script>

<style scoped>

</style>
