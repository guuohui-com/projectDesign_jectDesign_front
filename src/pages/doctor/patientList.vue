<template>
    <el-container
      v-loading="loading"
      style="height: 100vh; border: 1px solid #eee">
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
              <span>{{this.user.name}}</span>
          <el-button type="primary" v-show="this.patientListShow" @click="topatientList">患者列表</el-button>
          <el-button type="primary" v-show="this.historyDataShow" @click="lookCase">历史数据</el-button>
          <el-button type="primary" v-show="this.dataTendShow" @click="toDrawLine">数据趋势</el-button>
          <el-button type="primary" v-show="this.moreGJDataShow" @click="toInsertMoreDate">增加高阶数据</el-button>
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
                  <span class="tColum" > <el-button type="primary" @click.stop="notifyPatient(item)">传唤</el-button></span>
              </div>
            </div>
          </div>

          <div id="patientCase" v-show="this.patientCaseShow">
            <div id = "messageBoxSec">
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center;">姓名:</span>
                  <span>{{this.patient.name}}</span>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">临界高压值:</span>
                  <span ><el-input v-model="details.criticalBloodPressureHeigh" placeholder="请输入内容"></el-input></span>
                </div></el-col>
              </el-row>
              <el-row>
              <el-col :span="12"><div class="grid-content bg-purple-light">
                <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">出生日期:</span>
                <span>{{this.patient.birthday?this.patient.birthday.substring(0,10):this.patient.birthday}}</span>
              </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">临界低压值:</span>
                  <span>
                    <el-input v-model="details.criticalBloodPressureLow" placeholder="请输入内容"></el-input>
                  </span>
                </div></el-col>
            </el-row>
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span style = "display: inline-block; width:135px;"></span>
                  <span class="allSpan" style="display: inline-block; margin-right:30px;text-align: center">糖尿病类型:</span>
                  <el-select v-model="value" :placeholder="this.patient.patientType">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">临界空腹血糖值:</span>
                  <span>
                    <el-input v-model="details.criticalFastingBloodSuger" placeholder="请输入内容"></el-input>
                  </span>
                </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                  </div>
                </el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">临界餐后血糖值:</span>
                  <span>
                    <el-input
                      v-model="details.criticalPostprandialBloodSuger"
                      placeholder="请输入内容"></el-input>
                  </span>
                </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="updatePatientType">修改类型</el-button>
                  </div>
                </el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <el-button type="primary" @click="updatePatientcritical">修改临界值</el-button>
                </div></el-col>
              </el-row>
            </div>
            <div id="main" style="width: 80vw;height: 50vh" ></div>
            <div id="main2" style="width: 80vw;height: 50vh" ></div>
            <div id="main3" style="width: 80vw;height: 50vh" ></div>
            <el-button type="text" @click="open"></el-button>
          </div>

          <div id="caseDate" v-show="this.caseDateShow">
            <div id = "messageBox">
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center;">姓名:</span>
                  <span>{{this.patient.name}}</span>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">临界高压值:</span>
                  <span ><el-input v-model="details.criticalBloodPressureHeigh" placeholder="请输入内容"></el-input></span>
                </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">出生日期:</span>
                  <span>{{this.patient.birthday?this.patient.birthday.substring(0,10):this.patient.birthday}}</span>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">临界低压值:</span>
                  <span>
                    <el-input v-model="details.criticalBloodPressureLow" placeholder="请输入内容"></el-input>
                  </span>
                </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span style = "display: inline-block; width:135px;"></span>
                  <span class="allSpan" style="display: inline-block; margin-right:30px;text-align: center">糖尿病类型:</span>
                  <el-select v-model="value" :placeholder="this.patient.patientType">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">临界空腹血糖值:</span>
                  <span>
                    <el-input v-model="details.criticalFastingBloodSuger" placeholder="请输入内容"></el-input>
                  </span>
                </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                  </div>
                </el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">临界餐后血糖值:</span>
                  <span>
                    <el-input
                      v-model="details.criticalPostprandialBloodSuger"
                      placeholder="请输入内容"></el-input>
                  </span>
                </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="updatePatientType">修改类型</el-button>
                  </div>
                </el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <el-button type="primary" @click="updatePatientcritical">修改临界值</el-button>
                </div></el-col>
              </el-row>
            </div>
            <div style="text-align: center">
            <div style="display: inline-block;">
              <p>基本数据</p>
              <div id = "baseDetail">
                <span class="tColumKey">序号</span>
                <span class="tColum"></span>
                <span class="tColum">血糖值</span>
                <span class="tColum">血糖类型</span>
                <span class="tColum">血糖水平</span>
                <span class="tColum">高压</span>
                <span class="tColum">低压</span>
                <span class="tColum">血压水平</span>
                <span class="tColum">测量时间</span>
                <div v-for="(item,key) in this.baseData">
                  <div class="table">
                    <span class="tColumKey">{{key}}</span>
                    <span class="tColum"></span>
                    <span class="tColum"><span v-if="item.bloodsuger!=null">{{item.bloodsuger}}</span></span>
                    <span class="tColum"><span v-if="item.bloodsugertype!=null">{{item.bloodsugertype}}</span></span>
                    <span class="tColum"><span v-if="item.bloodSugerLevel!=null">{{item.bloodSugerLevel}}</span></span>
                    <span class="tColum"><span v-if="item.bloodpressureHeigh!=null">{{item.bloodpressureHeigh}}</span></span>
                    <span class="tColum"><span v-if="item.bloodpressureLow!=null">{{item.bloodpressureLow}}</span></span>
                    <span class="tColum"><span v-if="item.bloodSugerLevel!=null">{{item.bloodSugerLevel}}</span></span>
                    <span class="tColum"><span v-if="item.createtime!=null">{{item.createtime?item.createtime.substring(0,10):item.createtime}}</span></span>
                  </div>
                </div>
              </div>
            </div>

            <p>高级数据</p>
            <div id = "moreDetail">
              <span class="tColumKey">序号</span>
              <span class="tColum"></span>
              <span class="tColum">糖化蛋白</span>
              <span class="tColum">尿蛋白</span>
              <span class="tColum">心脏</span>
              <span class="tColum">足底</span>
              <span class="tColum">眼睛</span>
              <span class="tColum">测量时间</span>
              <div v-for="(item,key) in this.moreData">
                <div class="table">
                  <span class="tColumKey">{{key}}</span>
                  <span class="tColum"></span>
                  <span class="tColum"><span v-if="item.glycosylatedredprotein!=null">{{item.glycosylatedredprotein}}</span></span>
                  <span class="tColum"><span v-if="item.urineprotein!=null">{{item.urineprotein}}</span></span>
                  <span class="tColum"><span v-if="item.heart!=null">{{item.heart}}</span></span>
                  <span class="tColum"><span v-if="item.footbottom!=null">{{item.footbottom}}</span></span>
                  <span class="tColum"><span v-if="item.eyes!=null">{{item.eyes}}</span></span>
                  <span class="tColum"><span v-if="item.createtime!=null">{{item.createtime.substring(0,10)}}</span></span>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div id = "insertMoreData" v-show="this.insertMoreDataShow">
<!--            <div>-->
<!--              <span class="moeDetailTab"><el-tag type="info">血脂</el-tag></span>-->
<!--              <span class = "moreDetailSpan">-->
<!--                <el-input-->
<!--                  placeholder="请输入内容"-->
<!--                  prefix-icon="el-icon-search"-->
<!--                  v-model="this.moreDetail.glycosylatedredprotein">-->
<!--                </el-input>-->
<!--              </span>-->
<!--            </div>-->
            <div id = "messageBoxTh">
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center;">姓名:</span>
                  <span>{{this.patient.name}}</span>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">临界高压值:</span>
                  <span ><el-input v-model="details.criticalBloodPressureHeigh" placeholder="请输入内容"></el-input></span>
                </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">出生日期:</span>
                  <span>{{this.patient.birthday?this.patient.birthday.substring(0,10):this.patient.birthday}}</span>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">临界低压值:</span>
                  <span>
                    <el-input v-model="details.criticalBloodPressureLow" placeholder="请输入内容"></el-input>
                  </span>
                </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span style = "display: inline-block; width:135px;"></span>
                  <span class="allSpan" style="display: inline-block; margin-right:30px;text-align: center">糖尿病类型:</span>
                  <el-select v-model="value" :placeholder="this.patient.patientType">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">临界空腹血糖值:</span>
                  <span>
                    <el-input v-model="details.criticalFastingBloodSuger" placeholder="请输入内容"></el-input>
                  </span>
                </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                  </div>
                </el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <span class="allSpan" style="display: inline-block;margin-right:30px;text-align: center">临界餐后血糖值:</span>
                  <span>
                    <el-input
                      v-model="details.criticalPostprandialBloodSuger"
                      placeholder="请输入内容"></el-input>
                  </span>
                </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="updatePatientType">修改类型</el-button>
                  </div>
                </el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                  <el-button type="primary" @click="updatePatientcritical">修改临界值</el-button>
                </div></el-col>
              </el-row>
            </div>
            <div style="text-align: center;margin-top: 30px">
              <div style = "display: inline-block;">
              <div style="margin-top: 20px">
                <span class="moeDetailTab"><el-tag type="info">糖化蛋白</el-tag></span>
                <span class = "moreDetailSpan">
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="moreDetailsVo.moredetails.glycosylatedredprotein">
                  </el-input>
                </span>
              </div>
              <div style="margin-top: 20px">
                <span class="moeDetailTab"><el-tag type="info">尿蛋白</el-tag></span>
                <span class = "moreDetailSpan">
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="moreDetailsVo.moredetails.urineprotein">
                  </el-input>
                </span>
              </div>
              <div style="margin-top: 20px">
                <span class="moeDetailTab"><el-tag type="info">心脏</el-tag></span>
                <span class = "moreDetailSpan">
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="moreDetailsVo.moredetails.heart">
                  </el-input>
                </span>
              </div>
              <div style="margin-top: 20px">
                <span class="moeDetailTab"><el-tag type="info">足底</el-tag></span>
                <span class = "moreDetailSpan">
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="moreDetailsVo.moredetails.footbottom">
                  </el-input>
                </span>
              </div>
              <div style="margin-top: 20px">
                <span class="moeDetailTab"><el-tag type="info">眼皮</el-tag></span>
                <span class = "moreDetailSpan">
                  <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="moreDetailsVo.moredetails.eyes">
                  </el-input>
                </span>
              </div>
              <div style="margin-top: 20px">
                <el-button type="primary" @click="insertMoreDate" round>提交</el-button>
              </div>
            </div>
              </div>
            </div>
        </el-main>
      </el-container>
      <div style="height:20px;"></div>
    </el-container>
</template>

<script>
  import echarts from 'echarts'
  import {mapGetters} from 'vuex'
    export default {
        name: "patientList",
      data() {
        return {
          loading:false,
          tableData:[],
          baseDetailList:[],
          patient:{},
          user:{},
          //患者列表
          patientListShow:false,
          //趋势图按钮
          dataTendShow:false,
          //历史数据按钮
          historyDataShow:false,
          //增加高阶数据按钮
          moreGJDataShow:false,
          //患者列表部分
          tableShow:true,
          //折线图部分
          patientCaseShow:false,
          //病例数据项部分，基本数据，高级数据
          caseDateShow:false,
          //插入高阶数据部分
          insertMoreDataShow:false,
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
          },
          baseData:[],
          moreData:[],
          moreDetailsVo:{
            moredetails:{
              glycosylatedredprotein:"",
              heart:"",
              footbottom:"",
              eyes:"",
              urineprotein:"",
            },
            tableId:"",
          },
          details:{}
          }
      },
      // computed:{
      //
      // },
      mounted() {
          this.interceptor();
      },
      methods:{
        ...mapGetters(['getUserInfo']),
        // toDataTendShow(){
        //   this.beforeDrawLine();
        // },
        interceptor(){
          var _vm = this;
          if(JSON.stringify(this.getUserInfo())=='{}'){
            _vm.$router.push("/login");
          }else {
            _vm.toUser();
            _vm.lookMyPatient();
          }
        },
        toUser(){
          this.user=this.getUserInfo();
        },
        toDrawLine(){
          //患者列表按钮
          this.patientListShow=true;
            //趋势图按钮
            this.dataTendShow=false;
            //历史数据按钮
            this.historyDataShow=true;
            //增加高阶数据按钮
            this.moreGJDataShow=true;
            //患者列表部分
            this.tableShow=false;
            //折线图部分
            this.patientCaseShow=true;
            //病例数据项部分，基本数据，高级数据
            this.caseDateShow=false;
            //插入高阶数据部分
            this.insertMoreDataShow=false;
        },
        toInsertMoreDate(){
          //患者列表按钮
          this.patientListShow=true;
          //趋势图按钮
          this.dataTendShow=true;
          //历史数据按钮
          this.historyDataShow=true;
          //增加高阶数据按钮
          this.moreGJDataShow=false;
          //患者列表部分
          this.tableShow=false;
          //折线图部分
          this.patientCaseShow=false;
          //病例数据项部分，基本数据，高级数据
          this.caseDateShow=false;
          //插入高阶数据部分
          this.insertMoreDataShow=true;
        },
        topatientList(){
          this.lookMyPatient();
          //患者列表按钮
          this.patientListShow=false;
          //趋势图按钮
          this.dataTendShow=false;
          //历史数据按钮
          this.historyDataShow=false;
          //增加高阶数据按钮
          this.moreGJDataShow=false;
          //患者列表部分
          this.tableShow=true;
          //折线图部分
          this.patientCaseShow=false;
          //病例数据项部分，基本数据，高级数据
          this.caseDateShow=false;
          //插入高阶数据部分
          this.insertMoreDataShow=false;
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
            _vm.details = response.data.data.details;
            _vm.toDrawLine();
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
        },
        open(msg) {
          this.$alert(msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        },
        updatePatientType(){
          var _vm=this;
          this.patient.patientType=_vm.value;
          var param=this.patient;
          console.log("========updatePatientType========");
          this.axios.post("doctor/updatePatientType",param).then(function (response) {
            console.log(response);
            _vm.baseDetailList = response.data.data.basedetailList;
            _vm.open(response.data.msg);
          }).catch(function (e) {
            console.log(e);
          })
        },
        lookCase(){
          var _vm=this;
          var param = this.patient;
          console.log("=========selectPatientCase===========");
          this.axios.post("doctor/selectPatientCase",param).then(function (response) {
            console.log(response);
            if(response.data.msg=="查询成功"){
              _vm.insertMoreDataShow=false;
              _vm.historyDataShow = false;
              _vm.patientListShow = true;
              _vm.historyData = false;
              _vm.dataTendShow = true;
              _vm.tableShow=false;
              _vm.patientCaseShow=false;
              _vm.caseDateShow=true;
            }
            _vm.baseData = response.data.data.basedetailList;
            _vm.moreData = response.data.data.moredetails;
          }).catch(function (e) {
            console.log(e);
          })
        },
        insertMoreDate(){
          var _vm=this;
          console.log("=========insertMoreDate===========");
          this.moreDetailsVo.tableId = this.patient.tableid;
          var param = this.moreDetailsVo;
          this.axios.post("doctor/inputMoreDetail",param).then(function (response) {
            console.log(response);
            if(response.data.msg=="更新成功"){
              this.open("插入成功");
            }
            _vm.baseData = response.data.data.basedetailList;
            _vm.moreData = response.data.data.moredetails;
          }).catch(function (e) {
            console.log(e);
          })
        },
        updatePatientcritical(){
          var _vm=this;
          var param = this.details;
          this.axios.post("doctor/updateCriticalDetail",param).then(function (response) {
            console.log(response);
            var msg = response.data.msg;
            _vm.open(msg);
          }).catch(function (e) {
            console.log(e);
          })
        },
        notifyPatient(item){
          console.log("===========notifyPatient==========");
          var _vm = this;
          var param = item;
          _vm.loading = true;
          this.axios.post("doctor/notifyPatient",param).then(function (response) {
            console.log(response);
            _vm.loading=false;
            var msg = response.data.data;
            _vm.open(msg);
          }).catch(function (e) {
            console.log(e);
          })
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
    width: 50px;
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
  #messageBox,
  #messageBoxSec,
  #messageBoxTh{
    height: auto;
    border-radius: 10px;
    border: #f0f0f0 2px solid;
  }
  #messageBox:hover{
    border: #6190ef 2px solid;
  }
  .moreDetailSpan{
    display: inline-block;
    width: 300px;
  }
  .moeDetailTab{
    display: inline-block;
    width: 100px;
  }
  .el-input{
    width: 200px;
  }
  .allSpan{
    width: 200px;
  }
</style>

