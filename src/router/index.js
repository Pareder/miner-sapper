import Vue from 'vue'
import Router from 'vue-router'
import Config from '../config'
import Home from '../components/Home'
import Miner from '../components/Miner'
import Snake from '../components/Snake'
import Tetris from '../components/Tetris'
import Crush from '../components/Crush'
import Numbers from '../components/Numbers'

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
      path: '/miner/easy',
      component: Miner,
      props: { options: Config.miner.easy }
    },
    {
      name: 'Medium',
      path: '/miner/medium',
      component: Miner,
      props: { options: Config.miner.medium }
    },
    {
      name: 'Hard',
      path: '/miner/hard',
      component: Miner,
      props: { options: Config.miner.hard }
    },
    {
      name: 'Snake',
      path: '/snake',
      component: Snake,
      props: { options: Config.snake }
    },
    {
      name: 'Tetris',
      path: '/tetris',
      component: Tetris,
      props: { options: Config.tetris }
    },
    {
      name: 'Crush',
      path: '/crush',
      component: Crush,
      props: { options: Config.crush }
    },
    {
      name: 'Numbers',
      path: '/numbers',
      component: Numbers,
      props: { options: Config.numbers }
    }
  ]
})

export default router
