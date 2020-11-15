// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import './assets/styles/reset.css';
import './assets/styles/border.css';

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
