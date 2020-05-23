<template>
  <div>
    <van-nav-bar
      title="今日结果"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-cell-group>
      <div class="field"><van-field label="您的高压值为" label-width=180px  :colon= true v-model="this.caseDetail.bloodpressureHeigh" /></div>
      <div class="field"><van-field label="您的低压值为"label-width=180px  :colon= true v-model="this.caseDetail.bloodpressureLow" readonly /></div>
      <div class="field"><van-field label="您的血压水平为"label-width=180px  :colon= true v-model="this.caseDetail.bloodPressLevel" readonly /></div>
      <div class="field"><van-field v-if="this.caseDetail.bloodsugertype =='空腹'" label-width=180px label="您的空腹血糖值为":colon=true v-model="this.caseDetail.bloodsuger" readonly /></div>
      <div class="field"><van-field v-if="this.caseDetail.bloodsugertype =='餐后两小时'" label-width=180px label="您的餐后血糖值为":colon= true v-model="this.caseDetail.bloodsuger" readonly /></div>
      <div class="field"><van-field v-if="this.caseDetail.bloodSugerLevel != this.flag" label="您的血糖水平为" label-width=180px :colon = true v-model="this.caseDetail.bloodSugerLevel" readonly /></div>
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
        name: "tempAnalysis",
      data(){
        return{
          flag: null,
          value1: '',
          value2: '123',
          active:"home",
          caseDetail:{},
        }
      },
      mounted(){
        this.caseDetail = this.$route.query.caseDetail;
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
  .field{
    margin-top: 5vh;
  }
</style>
