// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import home from '@/components/home.vue'
import router from './router'
import axios from 'axios'
import Vant from 'vant';
import "../node_modules/vant/lib/index.css";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(Vant);
Vue.use(echarts);

Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
//将axios注册成为全局变量
Vue.prototype.axios=axios.create({
  baseURL:"http://localhost:9999/",
  //cookie携带cookie的参数
  withCredentials:true,

  headers:{
    'Content-Type':'application/json'
  },
})



/* eslint-disable no-new */
import {store} from './store/index'
new Vue({
  el: '#app',
  router,
  store,
  components: {home},
  template: '<home/>'
})
