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
import Login from "../pages/login/Login";
import {tokenExpressInTime} from "../assets/util/utils"
//import axios from 'axios'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/home/tasks'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
    let token1 = localStorage.getItem('token')
    let token2 = to.params.token
    //说明为新用户,需要绑定手机
    if(!token1 && !token2){
      if(to.path === '/binding' || to.path === '/changePhone' || to.path === '/contact'){
        next()
      }else {
        next({
          path: '/binding',
        })
      }
    //说明为老用户
    }else if(!token1 && token2){
      if(to.path === '/login'){
        next({
          query:{token2}
        })
      }else {
        next({
          path: '/binding',
          query:{token2}
        })
      }
    }else {
      next()
    }
})




export default router
