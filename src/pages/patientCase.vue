<template>
    <div>
      <van-nav-bar
        title="病例"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      病历详情
      <van-collapse v-model="activeNames">
        <van-collapse-item title="日常数据" name="1">
          <div v-for="(item,key) in this.basedetailList" style="margin-left: 2vw;" @click="showDetail(item)">
            <span style="display:inline-block; width: 28vw;">{{item.bloodPressLevel}}</span>
            <span style="display:inline-block; width: 28vw;">{{item.bloodSugerLevel}}</span>
            <span style="display:inline-block; width: 28vw;">{{item.createtimeS}}</span>
          </div>
        </van-collapse-item>
        <van-collapse-item title="高级数据" name="2">内容</van-collapse-item>
      </van-collapse>


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
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
  import { Toast } from 'vant';

    export default {
        name: "case",
      data(){
          return{
            activeNames: ['1'],
            active:'home',
            basedetailList:[],
            patienrCase:{}
          }
      },
      mounted(){
        this.interceptor();
        this.lookCase();
      },
      computed:{
        ...mapGetters(['getPatientCase']),
      },
      methods:{
        ...mapActions(['setPatientCase']),
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
        lookCase(){
          var _vm=this;
          var param = this.getUserInfo();
          this.axios.post("doctor/selectPatientCase",param).then(function (response) {
            console.log(response);
            _vm.basedetailList = response.data.data.basedetailList;
            _vm.setPatientCase(response.data.data);
          }).catch(function (e) {
            console.log(e);
          })
        },
        showDetail(item){
          this.$router.push({
            path: '/tempAnalysis',
            query: {
              caseDetail: item,
            }
          })
        }
      }
    }
</script>

<style scoped>
  *{
    font-size: 20px;
  }
</style>
