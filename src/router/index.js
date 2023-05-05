import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //登录页
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue'),
    redirect:'/home',
    children:[
      {
        path: 'login',
        name: 'login',
        component: () => import('../components/Login/Login.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../components/Login/Register.vue'),
      },
      {
        path: 'adminLogin',
        name: 'adminLogin',
        component: () => import('../components/Login/AdminLogin.vue'),
      },
    ]
  },
  //首页
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  //商品详情页
  {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: () => import('../views/GoodsDetail.vue')
  },
  //商品分类
  {
    path: '/goodsSort',
    name: 'goodsSort',
    component: () => import('../views/GoodsSort.vue')
  },
  //购物车
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue')
  },
  //发布商品
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/Publish.vue')
  },
   //购买页
   {
    path: '/buying',
    name: 'buying',
    component: () => import('../views/Buying.vue'),
  },
  //地址管理页
  {
    path: '/address',
    name: 'address',
    component: () => import('../views/AddressManger.vue'),
    children:[
      {
        path: 'list',
        name: 'list',
        component: () => import('../components/Address/AddressLists.vue'),
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('../components/Address/Add.vue'),
      }
    ]
  },
  //订单页
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/Orders.vue'),
  },
  //搜索页
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/testBuy',
    name: 'testBuy',
    component: () => import('../views/TestBuy.vue'),
  },
  //我出售的页面
  {
    path: '/mySell',
    name: 'mySell',
    component: () => import('../views/MySell.vue'),
  },
  //我买到的页面
  {
    path: '/myBuy',
    name: 'myBuy',
    component: () => import('../views/MyBuy.vue'),
  },
  //求购页面
  {
    path: '/askBuy',
    name: 'askBuy',
    component: () => import('../views/AskBuy.vue'),
  },
  //发送求购信息页面
  {
    path: '/sendAskBuy',
    name: 'sendAskBuy',
    component: () => import('../views/SendAskBuy.vue'),
  },
  //个人信息页面
  {
    path: '/myInfo',
    name: 'myInfo',
    component: () => import('../views/MyInfo.vue'),
  },
  //管理员页面
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    redirect:'/admin/user',
    children:[
      {
        path: 'user',
        name: 'adminUser',
        component: () => import('../components/Admin/UserAdmin.vue'),
      },
      {
        path: 'order',
        name: 'adminOrder',
        component: () => import('../components/Admin/OrderAdmin.vue'),
      },
      {
        path: 'goods',
        name: 'adminGoods',
        component: () => import('../components/Admin/GoodsAdmin.vue'),
      },
      
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
