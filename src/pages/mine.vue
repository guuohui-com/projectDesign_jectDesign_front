<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      right-text="编辑"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-cell-group>
      <van-field label="姓名" label-width=150px  :colon= true v-model="this.getUserInfo.name" readonly/>
      <van-field label="出生日期" label-width=150px  :colon= true v-model="this.getUserInfo.birthdayS" readonly/>
      <van-field label="手机号" label-width=150px  :colon= true v-model="this.getUserInfo.phone" readonly/>
      <van-field label="邮箱" label-width=150px  :colon= true v-model="this.getUserInfo.email" readonly/>
<!--      <van-field label="主治医生" label-width=150px  :colon= true v-model="this.getUserInfo.doctorid" readonly/>-->
      <van-field label="主治医生" label-width=150px  :colon= true v-model="this.doctor" readonly/>
    </van-cell-group>
    <div style="margin-top: 2vh">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" route = true to="/dataRecord">数据记录</van-tabbar-item>
        <van-tabbar-item icon="search" route = true to="/historyData">历史数据</van-tabbar-item>
        <van-tabbar-item icon="search" route = true to="/analysis">今日结果</van-tabbar-item>
        <van-tabbar-item icon="friends-o" route = true to="/mine">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import {mapGetters} from 'vuex'

    export default {
        name: "mine",
      data(){
          return {
            active:"home",
            doctor:"doctor",
          }
      },
      computed:{
        ...mapGetters(['getUserInfo']),
      },
      mounted(){
        //this.interceptor();

      },
      methods:{
        onClickLeft() {
          this.$router.go(-1);
        },
        onClickRight() {
         this.$router.push('/otherMine');
        },
      }
    }
</script>

<style scoped>
*{
  font-size: 20px;
}
</style>
