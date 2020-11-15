import Vue from 'vue'
import Router from 'vue-router'
import Authorization from "../pages/authorization/Authorization"
import Home from "../pages/home/Home"
import HomeTask from "../pages/home/components/task/Task"
import HomeDocument from "../pages/home/components/Document"
import HomeStatistics from "../pages/home/components/Statistics"
import Binding from "../pages/binding/Binding"
import changePhone from "../pages/changePhone/changePhone"
import Contact from "../pages/contact/Contact"
import {tokenExpressInTime} from "../assets/util/utils"

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/home/tasks'
    },
    {
      path: '/authorization',
      name: 'Authorization',
      component: Authorization
    },
    {
      path: '/home/:id?',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'tasks',
          component: HomeTask
        },
        {
          path: 'documents',
          component: HomeDocument
        },
        {
          path: 'statistics',
          component: HomeStatistics
        }
      ]
    },
    {
      path: '/binding',
      name: 'Binding',
      component: Binding
    },
    {
      path: '/changePhone',
      name: 'changePhone',
      component: changePhone
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ],
})


//配置全局路由守卫
router.beforeEach((to, from, next) => {
    //如果token过期，则将token设置为空
    if (tokenExpressInTime() && localStorage.getItem('token')){
      localStorage.setItem('token',"")
    }
    //当token为null时说明用户第一次使用，将其赋值为""
    let token = localStorage.getItem('token') === null ? "" : localStorage.getItem('token')
    //当用户手机绑定成功后记录
    let bind = localStorage.getItem('phoneBinding')
    //说明用户未进行微信授权或token已过期
    if(!token){
      if(to.path === '/authorization'){
        next({
          query:{code:token}
        })
      }else {
        next({
          path: '/authorization',
          query:{code:token}
        })
      }
    //说明用户微信授权成功且token未过期，但并未绑定手机，重定向至手机绑定页面
    }else if(token && bind === 'false'){
      if(to.name === 'Binding' || to.name === 'changePhone' || to.name === 'Contact'){
        next()
      }else{
        next({ name: 'Binding' })
      }
    }else {
      next()
    }
})




export default router
