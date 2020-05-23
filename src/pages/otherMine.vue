<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-cell-group>
      <van-field label="姓名" label-width=150px  :colon= true v-model="this.user.name" />
      <p style="margin-left: 16px;width:134px;display: inline-block">出生日期</p>
      <input type="date" :value="this.bTime" style="display:inline-block;"/>
<!--      <van-field label="出生日期" label-width=150px :colon= true v-model="this.getUserInfo.birthdayS" />-->
      <van-field label="手机号" label-width=150px  :colon= true v-model="this.user.phone" />
      <van-field label="邮箱" label-width=150px  :colon= true v-model="this.user.email" />
    </van-cell-group>
    <div style="margin-top: 2vh">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" route = true to="/dataRecord">数据记录</van-tabbar-item>
        <van-tabbar-item icon="search" route = true to="/historyData">历史数据</van-tabbar-item>
        <van-tabbar-item icon="search" route = true to="/analysis">今日结果</van-tabbar-item>
        <van-tabbar-item icon="friends-o" route = true to="/mine">我的</van-tabbar-item>
      </van-tabbar>

      <div id="buttonId">
        <van-button type="default" round color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="updateMine"> 确定 </van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { Toast } from 'vant';
    export default {
        name: "otherMine",
      data(){
        return {
          active:"home",
          bTime:"",
          user:{},
        }
      },
      // computed:{
      //   ...mapGetters(['getUserInfo']),
      // },
      mounted(){
          this.interceptor();
          this.toUser();
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
        toUser(){
          this.bTime=this.getUserInfo().birthday;
          this.user = this.getUserInfo();
        },

        onClickLeft() {
          this.$router.go(-1);
        },
        onClickRight() {
          Toast('按钮');
        },
        updateMine(){
          console.log("===bTime======="+this.bTime);
          var _vm= this;
          this.user.birthday = this.bTime;
          var params = this.user;
          this.axios.post("patient/updatePatientMessage",params).then(function (response) {
            console.log(response);
          }).catch(function (e) {
            console.log(e);
          })
        }
      }
    }
</script>

<style scoped>
  *{
    font-size: 20px;
  }
  #buttonId{
    text-align: center;
  }
</style>
