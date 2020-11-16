// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/styles/reset.css'
import './assets/styles/border.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


const setHtmlFontSize = () => {
  let deviceWidth =
    document.documentElement.clientWidth || document.body.clientWidth
  if (deviceWidth >= 750) {
    deviceWidth = 750
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320
  }
  document.documentElement.style.fontSize = `${deviceWidth / 7.5}px`
}
window.onresize = setHtmlFontSize
setHtmlFontSize()


// 配置公共url
axios.defaults.baseURL = "http://localhost:8080"
//添加请求拦截器
axios.interceptors.request.use(
  config =>{
    if(config.url==='/binding'||config.url==='/changePhone' || config.url==='/contact'){

    }else {
      if(store.state.token){
        config.headers.token =store.state.token
      }
    }
    return config;
  },
  error =>{
    //对请求错误做什么
    return Promise.reject(error);
  })

//异步请求后，判断token是否过期
axios.interceptors.response.use(
  response =>{
    return response;
  },
  error=>{
    if(error.response){
      switch(error.response.status){
        case 401:
          let token = localStorage.getItem('token')
          localStorage.removeItem('token');
          router.push({
            path: '/login',
            query: {token}
          })
      }
    }
  })
