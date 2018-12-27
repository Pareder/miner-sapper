import Vue from 'vue'
import Router from 'vue-router'
import Config from '../config'
import Home from '../components/Home'
import Field from '../components/Field'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: '/',
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'Easy',
      path: '/easy',
      component: Field,
      props: { options: Config.easy }
    },
    {
      name: 'Medium',
      path: '/medium',
      component: Field,
      props: { options: Config.medium }
    },
    {
      name: 'Hard',
      path: '/hard',
      component: Field,
      props: { options: Config.hard }
    }
  ]
})

export default router
