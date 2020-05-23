<template>
    <div>
      <van-nav-bar
        title="历史数据"
        left-text="返回"
        right-text="病例"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
<!--      <div>-->
<!--        <van-button type="default" @click="beforeDrawLine(1)">血压趋势</van-button>-->
<!--        <van-button type="default" @click="beforeDrawLine(2)">空腹血糖</van-button>-->
<!--        <van-button type="default" @click="beforeDrawLine(3)">餐后血糖</van-button>-->
<!--      </div>-->
      <div id="main" style="width: 95vw;height: 50vh" ></div>
      <div id="main2" style="width: 95vw;height: 50vh" ></div>
      <div id="main3" style="width: 95vw;height: 50vh" ></div>
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
  import echarts from 'echarts'
  import {mapGetters} from 'vuex'
  import { Toast } from 'vant';
    export default {
        name: "historyData",
      data () {
        return {
          active:"search",
          charts: '',
          opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
          opinionData:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ],
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
      //调用
      mounted(){
        this.beforeDrawLine(2);
        // this.$nextTick(function() {
        //   //this.drawPie('main')
        //   this.drawLine()
        // })
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
          this.$router.push("/patientCase");
        },
        drawPie(id){
          this.charts = echarts.init(document.getElementById(id))
          this.charts.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a}<br/>{b}:{c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data:this.opinion
            },
            series: [
              {
                name:'访问来源',
                type:'pie',
                radius:['50%','70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'blod'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                },
                data:this.opinionData
              }
            ]
          })
        },

        beforeDrawLine(j){
          var _vm=this;
          this.Line.X=[],
          this.Line.BloodPressureHigh=[],
          this.Line.BloodPressureLow=[],
          this.Line.FastingBloodSuger=[],
          this.Line.AfterBloodSuger=[],
          this.Line.FastingBloodSugerDate=[],
          this.Line.AfterBloodSugerDate=[],
          this.axios.post("patient/selectPatientCase",_vm.getUserInfo()).then(function (response) {
            console.log(response);
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

<style scoped>
*{
  font-size: 20px;
}
</style>
