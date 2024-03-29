import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Nav from './views/nav.vue'
import DoneOrder from './views/order/doneOrder.vue'
import DoingOrder from './views/order/doingOrder.vue'
import HandleOrder from './views/order/handleOrder.vue'
import mange from './views/vehicle/mange.vue'
import config from './views/vehicle/config.vue'
import Price from './views/price/index.vue'
import Customer from './views/customer/index.vue'
import NotFound from './views/404.vue'
import Map from './views/order/map.vue'
import MspB from './views/order/mapb.vue'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {path: '/', redirect: '/login'},
    {path:'/login',name:'login',component:Login,meta:{KeepAlive:true}},
    {path:'*',name:'/404',component:NotFound},
    {path:'/map',name:'map',component:Map},
    {path:'/mapb/:receivingAddress',name:'mapbp',component:MspB},
    {path:'/nav',name:"nav",component:Nav,
    children:
      [
        // 二级路由路径,不加
        // 订单管理
          {path:'DoneOrder', component:DoneOrder},
          {path:'DoingOrder', component:DoingOrder},
          {path:'HandleOrder', component:HandleOrder},
        // 车辆管理
          {path:'mange', component:mange},
          {path:'config',component:config},
        //计费管理
           {path:'Price', component:Price},
        //信息管理
           {path:'Customer', component:Customer}
        ]
  
    }
  ]
})
