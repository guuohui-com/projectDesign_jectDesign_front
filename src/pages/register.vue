<template>
  <div id="body">
    <div id="form">
      <div style="text-align: center;height: 40vh; align:center">
        <van-image
          round
          width="10rem"
          height="10rem"
          :src= "hospitalImg"
          style="display: inline-block; "
        />
        <p id="toReg" @click="toLogin">已有账号？去登录！</p>
      </div>

      <van-cell-group>
        <van-field v-model="phoneMessage" readonly />
        <van-field v-model="patient.phone" placeholder="请输入手机号" />
        <van-field v-model="nameMessage" readonly />
        <van-field v-model="patient.name" placeholder="请输入您的真实姓名" />
        <van-field v-model="emailMessage" readonly />
        <van-field v-model="patient.email" placeholder="请输入您的邮箱" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="birthdayMessage" readonly />
        <input type="date" :value="patient.birthday" style="margin-left: 16px"/>
        <!--<van-field v-model="patient.birthday" placeholder="请输入您的出生日期" />-->
        <van-field v-model="passwordMessage" readonly />
        <van-field v-model="patient.password" type = "password" placeholder="请输入密码" />
        <van-field v-model="passwordAgainMessage" readonly />
        <van-field v-model="againPassword" type = "password" placeholder="请再次输入密码" />
      </van-cell-group>

      <div id = "buttonId">
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="register">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Notify } from 'vant';
  import { Dialog } from 'vant';
  import NavBar from "../components/navBar";
    export default {
        name: "register",
        components: {NavBar},
      data(){
          return{
            nameMessage:"姓名",
            phoneMessage:'手机号码',
            birthdayMessage:"出生日期",
            passwordMessage:'密码',
            passwordAgainMessage:"请确认密码",
            emailMessage:"邮箱",
            againPassword:"",
            disabled:true,
            //color:"linear-gradient(to right, #4bb0ff, #6149f6)"
            hospitalImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587382332722&di=91df13788ce470e3efd130576bbf435c&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2008-11-04%2F200811422177441_2.jpg",
            patient:{
              name:'',
              phone:'',
              email:'',
              password:'',
              birthday:'2020-05-05',
            }
          }
      },
      methods:{
        toLogin(){
          this.$router.push("/login");
        },
        register(){
          if(this.patient.phone==null||this.patient.phone==''){
            Dialog.alert({
              title: '错误',
              message: '手机号不能为空',
            }).then(() => {
            });
            return
          }
          if(this.patient.name==null||this.patient.name==''){
            Dialog.alert({
              title: '错误',
              message: '姓名不能为空',
            }).then(() => {
            });
            return
          }
          if(this.patient.password==null||this.patient.password==''){
            Dialog.alert({
              title: '错误',
              message: '密码不能为空',
            }).then(() => {
            });
            return
          }
          if(this.againPassword==null||this.againPassword==''){
            Dialog.alert({
              title: '错误',
              message: '确认密码不能为空',
            }).then(() => {
            });
            return
          }
          if(!(this.patient.password==this.againPassword)){
            Dialog.alert({
              title: '错误',
              message: '两次密码不一致',
            }).then(() => {
            });
            return;
          }
          var _vm= this;
          this.axios.post("patient/patientRegister",this.patient).then(function (response) {
            console.log(response);
            if(response.data.msg=="注册成功"){
              console.log("=======注册成功======="+response.data.msg);
              _vm.$router.push("/chooseDoctor");
            }else{
              Dialog.alert({
                title: '错误',
                message: response.data.msg,
              }).then(() => {
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
  #buttonId, #radioId{
    margin-top: 3vh;
  }
  #buttonId{
    text-align: center;
    margin-bottom: 5vh;
  }
  .radioItem{
    margin-left: 3vw;
  }
  #body{
    text-align: center;
    background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590110913444&di=69efcf5d77fea9c247ab248fda4ce994&imgtype=0&src=http%3A%2F%2Fwww.manpingou.com%2Fuploads%2Fallimg%2F181029%2F25-1Q029112P9259.jpg");
    background-size: 100%;
  }
  #form{
    border:2px solid #ccc;
    border-radius: 10px;
    width:30vw;
    height:120vh;
    display: inline-block;
    background-color: #f0f0f0;
    transform: translateY(10%);
  }
  #form:hover{
    border:2px solid orangered;
  }
</style>
