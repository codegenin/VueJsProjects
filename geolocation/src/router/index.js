import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Singup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
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
});

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      // not signed in, redirect to login
      next({
        name: 'Login'
      })
    }
  } else {
    next()
  }
})

export default router
