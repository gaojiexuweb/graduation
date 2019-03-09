import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Nav from './views/nav.vue'
import DoneOrder from './views/order/doneOrder.vue'
import DoingOrder from './views/order/doingOrder.vue'
import ErrorOrder from './views/order/errorOrder.vue'
import Customer from './views/customer/index.vue'
import Vehicle from './views/vehicle/index.vue'
import NotFound from './views/404.vue'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {path: '/', redirect: '/login'},
    {path:'/login',name:'login',component:Login},
    {path:'*',name:'/404',component:NotFound},
    {path:'/nav',name:"nav",component:Nav,
    children:
      [
        // 二级路由路径,不加
        // 订单管理
          {path:'DoneOrder', component:DoneOrder},
          {path:'DoingOrder', component:DoingOrder},
          {path:'ErrorOrder', component:ErrorOrder},
          //客户管理
          {path:'Customer', component:Customer},
          {path:'Vehicle', component:Vehicle}
        ]
  
    }
  ]
})
