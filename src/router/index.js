import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import register from '@/pages/register'
import dataRecord from '@/pages/dataRecord'
import analysis from '@/pages/analysis'
import historyData from '@/pages/historyData'
import mine from '@/pages/mine'
import otherMine from '@/pages/otherMine'
import patientCase from '@/pages/patientCase'
import tempAnalysis from '@/pages/tempAnalysis'
import chooseDoctor from '@/pages/chooseDoctor'
import tempDoctorDetails from '@/pages/tempDoctorDetails'
import patientList from '@/pages/doctor/patientList'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/dataRecord',
      name: 'dataRecord',
      component: dataRecord
    },
    {
      path:'/analysis',
      name:'/analysis',
      component:analysis
    },
    {
      path: '/historyData',
      name: 'historyData',
      component: historyData
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path:'/otherMine',
      name:'otherMIne',
      component:otherMine,
    },
    {
      path:'/patientCase',
      name:'patientCase',
      component:patientCase,
    },
    {
      path:'/tempAnalysis',
      name:'tempAnalysis',
      component:tempAnalysis,
    },
    {
      path:'/chooseDoctor',
      name:'chooseDoctor',
      component:chooseDoctor,
    },
    {
      path:'/tempDoctorDetails',
      name:'tempDoctorDetails',
      component:tempDoctorDetails,
    },
    {
      path:'/patientList',
      name:'patientList',
      component:patientList,
    },

  ]
})
