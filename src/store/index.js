import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //将本地存储的数据先赋值给cartGoods
    cartGoods:localStorage["goods"] ? JSON.parse(localStorage["goods"]):[],
    removeGoods:[],
    buyGoodsInfo:[],
    address:localStorage["address"] ? JSON.parse(localStorage["address"]):[],
    orderInfos:localStorage["orderInfo"] ? JSON.parse(localStorage["orderInfo"]):[],
  },
  getters: {
  },
  //可操纵state中的数据
  mutations: {
    //加入购物车
    AddGoods(state,value){
      let index=state.cartGoods.findIndex(item=>item.id===value.id)
      if(index===-1){
         state.cartGoods.unshift(value)
      }
      else{
        alert("已加入购物车")
      }
      localStorage.setItem("goods",JSON.stringify(state.cartGoods))
      console.log("购物车",state.cartGoods);
    },
    //点击删除后存储最新数据
    RemainGoods(state,value){
      localStorage.setItem("goods",JSON.stringify(state. removeGoods))
      localStorage.setItem("goods",JSON.stringify(value))
    },
    //购买商品
    BuyGoods(state,value){
      state.buyGoodsInfo.splice(0,1,value)
      // console.log(state.BuyGoodsInfo);
      localStorage.setItem('buyGoodsInfo',JSON.stringify(value))
    },
    //提交的订单信息
    OrderInfo(state,value){
      console.log("订单信息为",value);
      state.orderInfos.unshift(value)
      localStorage.setItem("orderInfo",JSON.stringify(state.orderInfos))
    },
    AddAddress(state,value){
      state.address.unshift(value)
      localStorage.setItem("address",JSON.stringify(state.address))
    },
    DelAdd(state,value){
      localStorage.setItem("address",JSON.stringify(state. removeGoods))
      // console.log(value);
      localStorage.setItem("address",JSON.stringify(value))
    },
  },
  actions: {
  },
  modules: {
  
  }
})
