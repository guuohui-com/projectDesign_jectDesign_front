<template>
   <div>
     <van-nav-bar
       title="日常数据记录"
       left-text="返回"
       right-text="按钮"
       left-arrow
       @click-left="onClickLeft"
       @click-right="onClickRight"
     />
     <div>
       <van-cell-group>

         <div >
           <van-field v-model="bloodPressureHeighMessage" readonly />
           <van-field v-model="detailDate.bloodPressureHeigh" placeholder="请输入高压值" />
           <van-field v-model="bloodPressureLowMessage" readonly />
           <van-field v-model="detailDate.bloodPressureLow" placeholder="请输入低压值" />
           <van-field v-model="bloodsugerTypeMessage" readonly />
           <div style="margin-left: 3vw;margin-top: 2vh;margin-bottom: 2vh">
             <select v-model="detailDate.bloodsugerType">
               <option>空腹</option>
               <option>餐后两小时</option>
               <option></option>
             </select>
           </div>

           <van-field v-model="bloodsugerMessage" readonly />
           <van-field v-model="detailDate.bloodsuger" placeholder="请输入血糖值" />
           <van-field v-model="weightMessage" readonly />
           <van-field v-model="detailDate.weight" placeholder="请输入体重值" />
         </div>
       </van-cell-group>
       <div id="buttonId">
         <van-button type="default" round color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="dataRecord"> 确定 </van-button>
       </div>
     </div>
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
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
    export default {
        name: "dataRecord",
      data(){
        return{
          active:"home",
          bloodPressureHeighMessage:'高压(mmHg)',
          bloodPressureLowMessage:'低压(mmHg)',
          bloodsugerTypeMessage:"血糖类型",
          bloodsugerMessage:"血糖值(mmol/L)",
          weightMessage:"体重(kg)",
          detailDate:{
            bloodPressureHeigh:null,
            bloodPressureLow:null,
            bloodsugerType:null,
            bloodsuger:null,
            weight:null,
          },
        }
      },
      mounted(){
          this.interceptor();
      },
      methods: {
        ...mapActions(['setDailyBaseDetail']),
        ...mapGetters(['getDailyBaseDetail']),
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
        dataRecord(){
          var _vm=this;
          var flag = true;
          for(var key in _vm.detailDate){
            if(!(_vm.detailDate[key]==null)){
              flag = false; // 终止程序
              break;
            }
          }
          if(flag == true){
            Toast.fail('请填写信息');
            return;
          }
          if(_vm.detailDate.bloodPressureHeigh!=null&&_vm.detailDate.bloodPressureLow==null){
            Toast.fail('请填写低压值');
            return;
          }else if(_vm.detailDate.bloodPressureHeigh==null&&_vm.detailDate.bloodPressureLow!=null){
            Toast.fail('请填写高压值');
            return;
          }
          if((_vm.detailDate.bloodsugerType==null||_vm.detailDate.bloodsugerType=="")&&_vm.detailDate.bloodsuger!=null){
            Toast.fail('请选择血糖类型');
            return;
          }else if(_vm.detailDate.bloodsuger==null&&(_vm.detailDate.bloodsugerType!=null&&_vm.detailDate.bloodsugerType!="")){
            Toast.fail('请填写血糖值');
            return;
          }
          var params={
            "bloodpressureHeigh":_vm.detailDate.bloodPressureHeigh,
            "bloodpressureLow":_vm.detailDate.bloodPressureLow,
            "bloodsugertype":_vm.detailDate.bloodsugerType,
            "bloodsuger":_vm.detailDate.bloodsuger,
            "weight":_vm.detailDate.weight,
          };
          this.axios.post("patient/patientBaseRecord",params).then(function (response) {
            console.log(response);
            if(response.data.msg=="日常数据更新成功"){
              Toast.success("日常数据更新成功");
              _vm.setDailyBaseDetail(response.data.data);
              _vm.$router.push("/analysis");
            }
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
    margin-top: 5vh;
  }
</style>
