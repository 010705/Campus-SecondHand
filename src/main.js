import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
// import UUID from "vue-uuid";

import api from './api/api.js';
Vue.prototype.$api = api;

let globalData = {
    userInfo: {
        nickname: ''
    }
};
let sta = {
    isLogin: false,
    adminName: ''
};
Vue.prototype.$sta = sta;

Vue.prototype.$globalData = globalData;

/* 让它少提示一个错误信息 */
Vue.config.productionTip = false;

Vue.use(ElementUI, {
    size: 'medium'
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    // console.log(to.path,'userInfo:',Vue.prototype.$globalData.userInfo);
    const nickname = Vue.prototype.$globalData.userInfo.nickname;
    // const admin=JSON.parse(localStorage.getItem('admin'))?JSON.parse(localStorage.getItem('admin')):{}
    // console.log(admin);
    if (
        !nickname &&
        (to.path === '/cart' ||
            to.path === '/publish' ||
            to.path === '/mySell' ||
            to.path === '/myBuy' ||
            to.path === '/address/list' ||
            to.path === '/address/add')
    ) {
        api.getUserInfo()
            .then((res) => {
                console.log('getUserInfo:', res);
                if (res.status_code !== 1) {
                    next('/home');
                    alter("请先登录")
                    Vue.prototype.$globalData.userInfo = res.data;
                } else {
                    res.data.signInTime = res.data.signInTime.substring(0, 10);
                    Vue.prototype.$globalData.userInfo = res.data;
                    next();
                }
            })
            .catch((e) => {
                next('/login');
            });
    } else {
        next();
    }
});

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
