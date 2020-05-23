<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="260px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{this.user.name}}</span>
        </el-header>
        <el-main>
          <div id="body" v-show="this.tableShow">
            <div v-for="(item,key) in this.tableData">
              <div class="table" @click="showDetail(item)">
                  <span class="tColumKey">{{key}}</span>
                  <span class="tColum">{{item.name}}</span>
                  <span class="tColum"><span v-if="item.basedetail!=null">{{item.basedetail.bloodpressureHeigh}}</span></span>
                  <span class="tColum"><span v-if="item.basedetail!=null">{{item.basedetail.bloodpressureLow}}</span></span>
                  <span class="tColum"><span v-if="item.basedetail!=null">{{item.basedetail.bloodPressLevel}}</span></span>
                  <span class="tColum"><span v-if="item.basedetail!=null">{{item.basedetail.bloodsuger}}</span></span>
                  <span class="tColum"><span v-if="item.basedetail!=null">{{item.basedetail.bloodsugertype}}</span></span>
                  <span class="tColum"><span v-if="item.basedetail!=null">{{item.basedetail.bloodSugerLevel}}</span></span>
                  <span class="tColum"><span v-if="item.basedetail!=null">{{item.basedetail.createtime?item.basedetail.createtime.substring(0,10):item.basedetail.createtime}}</span></span>
                  <span class="tColum" > <el-button type="primary">主要按钮</el-button></span>
              </div>
            </div>
          </div>
          <div id="patientCase" v-show="this.patientCaseShow">
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple-light">
                <span style="display: inline-block;margin-right:30px;text-align: center">姓名:</span><span>{{this.patient.name}}</span>
              </div></el-col>
            </el-row>
            <el-row>
            <el-col :span="12"><div class="grid-content bg-purple-light">
              <span style="display: inline-block;margin-right:30px;text-align: center">出生日期:</span><span>{{this.patient.birthdayS}}</span>
            </div></el-col>
          </el-row>
            <el-row>
              <el-col :span="12"><div class="grid-content bg-purple-light">
                <span style = "display: inline-block; width:135px;"></span>
                <span style="display: inline-block; margin-right:30px;text-align: center">糖尿病类型:</span>
                <el-select v-model="value" :placeholder="this.patient.patientType">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div></el-col>
            </el-row>
            <div id="main" style="width: 80vw;height: 50vh" ></div>
            <div id="main2" style="width: 80vw;height: 50vh" ></div>
            <div id="main3" style="width: 80vw;height: 50vh" ></div>
          </div>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
  import echarts from 'echarts'
  import {mapGetters} from 'vuex'
    export default {
        name: "patientList",
      data() {
        return {
          tableData:[],
          baseDetailList:[],
          patient:{},
          user:{},
          tableShow:true,
          patientCaseShow:false,
          options: [{
            value: '一型糖尿病',
            label: '一型糖尿病'
            },
            {
              value: '二型糖尿病',
              label: '二型糖尿病'
            },],
          value:"",
          Line:{
            X:[],
            BloodPressureHigh: [],
            BloodPressureLow:[],
            FastingBloodSuger:[],
            AfterBloodSuger:[],
            FastingBloodSugerDate:[],
            AfterBloodSugerDate:[],
          }
          }
      },
      // computed:{
      //
      // },
      mounted() {
          this.toUser();
          this.lookMyPatient();
      },
      methods:{
        ...mapGetters(['getUserInfo']),
        toUser(){
          this.user=this.getUserInfo();
        },
        lookMyPatient(){
          var _vm=this;
          var param={};
          this.axios.post("doctor/selectPatient",param).then(function (response) {
            console.log(response);
            _vm.tableData = response.data.data;
          }).catch(function (e) {
            console.log(e);
          })
        },
        //查看个人病例
        showDetail(item){
          this.tableShow=false;
          this.patientCaseShow=true;
          var _vm=this;
          var param=item;
          console.log("========selectPatientCase========");
          _vm.patient = item;
          this.axios.post("patient/selectPatientCase",param).then(function (response) {
            console.log(response);
            _vm.baseDetailList = response.data.data.basedetailList;
            _vm.beforeDrawLine();
          }).catch(function (e) {
            console.log(e);
          })
        },
        beforeDrawLine(){
          var _vm=this;
          this.Line.X=[],
            this.Line.BloodPressureHigh=[],
            this.Line.BloodPressureLow=[],
            this.Line.FastingBloodSuger=[],
            this.Line.AfterBloodSuger=[],
            this.Line.FastingBloodSugerDate=[],
            this.Line.AfterBloodSugerDate=[],
            this.axios.post("patient/selectPatientCase",_vm.patient).then(function (response) {
              console.log(response);
              console.log("======selectPatientCase========")
              for(var i=0;i<response.data.data.basedetailList.length;i++){
                if(response.data.data.basedetailList[i].bloodpressureHeigh!=null){
                  _vm.Line.BloodPressureHigh.push(response.data.data.basedetailList[i].bloodpressureHeigh);
                  _vm.Line.BloodPressureLow.push(response.data.data.basedetailList[i].bloodpressureLow);
                  _vm.Line.X.push(response.data.data.basedetailList[i].createtimeS);
                }
                if(response.data.data.basedetailList[i].bloodsuger!=null){
                  if(response.data.data.basedetailList[i].bloodsugertype=="空腹"){
                    _vm.Line.FastingBloodSuger.push(response.data.data.basedetailList[i].bloodsuger);
                    _vm.Line.FastingBloodSugerDate.push(response.data.data.basedetailList[i].createtimeS);
                  }else{
                    _vm.Line.AfterBloodSuger.push(response.data.data.basedetailList[i].bloodsuger);
                    _vm.Line.AfterBloodSugerDate.push(response.data.data.basedetailList[i].createtimeS);
                  }
                }
              }
              _vm.drawBloodPressureLine();
              _vm.drawFastingBloodSugerLine();
              _vm.drawAfterBloodSugerLine();
            }).catch(function (e) {
              console.log(e);
            })
        },
        drawBloodPressureLine(){
          var _vm = this;
          this.chartLine = echarts.init(document.getElementById('main'));
          // 指定图表的配置项和数据
          var option1 = {
            tooltip: {              //设置tip提示
              trigger: 'axis'
            },
            legend: {               //设置区分（哪条线属于什么）
              data:['高压','低压']
            },
            color: ['#8AE09F', '#FA6F53'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
              type: 'category',
              boundaryGap: false,     //坐标轴两边不留白
              data:_vm.Line.X ,
              name: '日期',           //X轴 name
              nameTextStyle: {        //坐标轴名称的文字样式
                color: '#FA6F53',
                fontSize: 16,
                padding: [0, 0, 0, 20]
              },
              axisLine: {             //坐标轴轴线相关设置。
                lineStyle: {
                  color: '#FA6F53',
                }
              }
            },
            yAxis: {
              name: '值',
              nameTextStyle: {
                color: '#FA6F53',
                fontSize: 16,
                padding: [0, 0, 10, 0]
              },
              axisLine: {
                lineStyle: {
                  color: '#FA6F53',
                }
              },
              type: 'value'
            },
            series: [
              {
                name: '高压',
                data:_vm.Line.BloodPressureHigh ,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                  normal: {
                    color: '#8AE09F',
                  }
                },
              },
              {
                name: '低压',
                data: _vm.Line.BloodPressureLow,
                type: 'line',
                lineStyle: {
                  normal: {
                    color: '#FA6F53',
                  }
                },
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          this.chartLine.setOption(option1);
        },

        drawFastingBloodSugerLine(){
          var _vm = this;
          this.chartLine = echarts.init(document.getElementById('main2'));
          // 指定图表的配置项和数据
          var option2 = {
            tooltip: {              //设置tip提示
              trigger: 'axis'
            },
            legend: {               //设置区分（哪条线属于什么）
              data:['空腹血糖']
            },
            color: ['#8AE09F',],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
              type: 'category',
              boundaryGap: false,     //坐标轴两边不留白
              data:_vm.Line.FastingBloodSugerDate ,
              name: '日期',           //X轴 name
              nameTextStyle: {        //坐标轴名称的文字样式
                color: '#FA6F53',
                fontSize: 16,
                padding: [0, 0, 0, 20]
              },
              axisLine: {             //坐标轴轴线相关设置。
                lineStyle: {
                  color: '#FA6F53',
                }
              }
            },
            yAxis: {
              name: '值',
              nameTextStyle: {
                color: '#FA6F53',
                fontSize: 16,
                padding: [0, 0, 10, 0]
              },
              axisLine: {
                lineStyle: {
                  color: '#FA6F53',
                }
              },
              type: 'value'
            },
            series: [
              {
                name: '空腹血糖',
                data:_vm.Line.FastingBloodSuger ,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                  normal: {
                    color: '#8AE09F',
                  }
                },
              },
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          this.chartLine.setOption(option2);
        },
        drawAfterBloodSugerLine(){
          var _vm = this;
          this.chartLine = echarts.init(document.getElementById('main3'));
          // 指定图表的配置项和数据
          var option3 = {
            tooltip: {              //设置tip提示
              trigger: 'axis'
            },
            legend: {               //设置区分（哪条线属于什么）
              data:['餐后血糖']
            },
            // color: ['#8AE09F'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
              type: 'category',
              boundaryGap: false,     //坐标轴两边不留白
              data:_vm.Line.AfterBloodSugerDate ,
              name: '日期',           //X轴 name
              nameTextStyle: {        //坐标轴名称的文字样式
                color: '#FA6F53',
                fontSize: 15,
                padding: [0, 0, 0, 20]
              },
              axisLine: {             //坐标轴轴线相关设置。
                lineStyle: {
                  color: '#FA6F53',
                }
              }
            },
            yAxis: {
              name: '值',
              nameTextStyle: {
                color: '#FA6F53',
                fontSize: 15,
                padding: [0, 0, 10, 0]
              },
              axisLine: {
                lineStyle: {
                  color: '#FA6F53',
                }
              },
              type: 'value'
            },
            series: [
              {
                name: '餐后血糖',
                data: _vm.Line.AfterBloodSuger,
                type: 'line',
                lineStyle: {
                  normal: {
                    color: '#FA6F53',
                  }
                },
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          this.chartLine.setOption(option3);
        }
      },
    }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .table{
    border:1px blue solid;
    width: 1000px;
    display:inline-block;
  }
  #body{
    text-align: center;
  }
  .tColum{
    display: inline-block;
    text-align: center;
    width: 100px;
  }
  .tColumKey{
    display: inline-block;
    width: 30px;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
    text-align: center;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>

