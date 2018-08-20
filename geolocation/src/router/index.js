import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Singup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'GMap',
      component: GMap
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Singup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
