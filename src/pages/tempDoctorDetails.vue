<template>
  <div>
    <van-nav-bar
      title="今日结果"
      left-text="返回"
      right-text="编辑"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-cell-group>
      <van-field label="姓名" label-width=150px  :colon= true v-model="this.doctor.name" readonly/>
      <van-field label="出生日期" label-width=150px  :colon= true v-model="this.doctor.birthdayS" readonly/>
      <van-field label="手机号" label-width=150px  :colon= true v-model="this.doctor.phone" readonly/>
      <van-field label="邮箱" label-width=150px  :colon= true v-model="this.doctor.email" readonly/>
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
  import {mapGetters} from 'vuex'
  import { Toast } from 'vant';
    export default {
        name: "tempDoctorDetails",
      data(){
          return{
            active:'home',
            doctor:{},
          }
      },
      mounted(){
        this.interceptor();
        this.doctor = this.$route.query.doctor;
      },
      methods:{
        ...mapGetters(['getUserInfo']),
        interceptor(){
          var _vm = this;
          if(JSON.stringify(this.getUserInfo())=='{}'){
            Toast('请登录');
            _vm.$router.push("/login");
          }
        },
        onClickLeft() {
          this.$router.go(-1);
        },
        onClickRight() {
          Toast('按钮');
        },
      }
    }
</script>

<style scoped>
*{
  font-size: 20px;
}
</style>
