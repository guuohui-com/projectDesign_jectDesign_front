<template>
  <div id="body" >
    <div id="form">
      <div style="text-align: center;height: 50vh; align:center;">
        <van-image
          round
          width="10rem"
          height="10rem"
          :src= "hospitalImg"
          style="display: inline-block; "
        />
        <p id="toReg" @click="toRegister">没有账号？去注册！</p>
      </div>
      <van-cell-group>
        <van-field v-model="phoneMessage" readonly />
        <van-field v-model="phone" placeholder="请输入手机号" />
        <van-field v-model="passwordMessage" readonly />
        <van-field v-model="password" type="password"  placeholder="请输入密码" />
      </van-cell-group>

      <div id="buttonId">
        <van-button type="default" round color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="dorctorLogin"> 确定 </van-button>
      </div>
    </div>
  </div>
</template>
<script>
    import NavBar from "../components/navBar";
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import { Toast } from 'vant';
    export default {
      name: "login",
      components: {NavBar},
      data() {
        return {
          phoneMessage:'手机号码',
          phone:'',
          passwordMessage:'密码',
          password:'',
          disabled:true,
          color:"#ccc",
          hospitalImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587382332722&di=91df13788ce470e3efd130576bbf435c&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2008-11-04%2F200811422177441_2.jpg",
        };
      },
      // computed:{
      //   ...mapGetters['getUserInfo']
      // },
      methods:{
        ...mapActions(['setUserInfo']),
        ...mapGetters(['getUserInfo']),
        dorctorLogin(){
          //患者登录
          var _vm= this;
          var params={
            "phone":_vm.phone,
            "password":_vm.password,
          };
          this.axios.post("doctor/doctorLogin",params).then(function (response) {
            console.log(response);
            if(response.data.msg=="登陆成功"){
              _vm.getUserInfo().birthday = _vm.getUserInfo().birthdayS;
              var user = response.data.data;
              user.birthday= user.birthdayS;
              _vm.setUserInfo(user);
               console.log("================"+_vm.getUserInfo().birthday);
              _vm.$router.push("/patientList");
            }else{
              Toast.fail(response.data.msg);
              return;
            }
          }).catch(function (e) {
            console.log(e);
          })
        },
        toRegister(){
          this.$router.push("/register");
        }
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
    height:88vh;
    display: inline-block;
    background-color: #f0f0f0;
    transform: translateY(10%);
  }
  #form:hover{
  border:2px solid orangered;
  }
</style>
