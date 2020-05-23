<template>
    <div>
      <van-nav-bar
        title="选择医生"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />

      <van-cell-group>
        <div v-for="(item,key) in this.doctors">
          <div style="display: inline-block; width:50vw ;" @click ="toDoctorDetail(item)"><van-cell  :title="item.name" :value="item.numb" /></div>
          <div style="display: inline-block; width:40vw ;">
            <div  style="float: right;"><van-button id="doct" type="primary" size="small" @click="chooseDoct(item)">选择</van-button></div>
          </div>
        </div>
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
  import { Dialog } from 'vant';
  import { Toast } from 'vant';
  import {mapGetters} from 'vuex'
    export default {
        name: "chooseDoctor",
      data(){
          return{
            active:'home',
            doctors:{},
          }
      },
      mounted(){
        // this.interceptor();
        this.lookDorctors();
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
        lookDorctors(){
          var _vm=this;
          var param={};
          this.axios.post("patient/patientSelectDoctor",param).then(function (response) {
            console.log(response);
            _vm.doctors = response.data.data;
          }).catch(function (e) {
            console.log(e);
          })
        },
        toDoctorDetail(item){
          this.$router.push(
            {
              path: '/tempDoctorDetails',
              query:{
                doctor:item,
              }
            }
          )
        },
        chooseDoct(item){
          var _vm = this;
          var param = item;
          this.axios.post("patient/patientChooseDoctor",param).then(function (response) {
            console.log(response);
            if(response.data.msg=="更新成功"){
              Dialog.alert({
                title: '成功',
                message: "已选择"+item.name,
              }).then(() => {
                _vm.$router.push("/login");
              });
            }
          }).catch(function (e) {
            console.log(e);
          })
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
