import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Miner from '../pages/Miner'
import Snake from '../pages/Snake'
import Tetris from '../pages/Tetris'
import Bubbles from '../pages/Bubbles'
import Numbers from '../pages/Numbers'
import config from '../config'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: '/',
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home,
      meta: {
        title: 'Classical games: minesweeper, tetris, bubbles, 2048',
        metaTags: [
          {
            name: 'description',
            content: 'Simple and interesting classical games made on Vue.js. Nothing new, only Minesweeper, Tetris, ' +
              'Bubbles and 2048.'
          },
          {
            property: 'og:description',
            content: 'Simple and interesting classical games made on Vue.js. Nothing new, only Minesweeper, Tetris, ' +
              'Bubbles and 2048.'
          }
        ]
      }
    },
    {
      name: 'Easy',
      path: '/miner/easy',
      component: Miner,
      props: { options: config.miner.easy },
      meta: {
        title: 'Minesweeper 8x8',
        metaTags: [
          {
            name: 'description',
            content: 'Classical minesweeper with 8x8 field.'
          },
          {
            property: 'og:description',
            content: 'Classical minesweeper with 8x8 field.'
          }
        ]
      }
    },
    {
      name: 'Medium',
      path: '/miner/medium',
      component: Miner,
      props: { options: config.miner.medium },
      meta: {
        title: 'Minesweeper 12x12',
        metaTags: [
          {
            name: 'description',
            content: 'Classical minesweeper with 12x12 field.'
          },
          {
            property: 'og:description',
            content: 'Classical minesweeper with 12x12 field.'
          }
        ]
      }
    },
    {
      name: 'Hard',
      path: '/miner/hard',
      component: Miner,
      props: { options: config.miner.hard },
      meta: {
        title: 'Minesweeper 168x16',
        metaTags: [
          {
            name: 'description',
            content: 'Classical minesweeper with 16x16 field.'
          },
          {
            property: 'og:description',
            content: 'Classical minesweeper with 16x16 field.'
          }
        ]
      }
    },
    {
      name: 'Snake',
      path: '/snake',
      component: Snake,
      props: { options: config.snake },
      meta: {
        title: 'Snake',
        metaTags: [
          {
            name: 'description',
            content: 'Snake. Use the arrow keys on your keyboard to play the game.'
          },
          {
            property: 'og:description',
            content: 'Snake. Use the arrow keys on your keyboard to play the game.'
          }
        ]
      }
    },
    {
      name: 'Tetris',
      path: '/tetris',
      component: Tetris,
      props: { options: config.tetris },
      meta: {
        title: 'Tetris',
        metaTags: [
          {
            name: 'description',
            content: 'Play Tetris. Browser-based online Tetris game. No download required.'
          },
          {
            property: 'og:description',
            content: 'Play Tetris. Browser-based online Tetris game. No download required.'
          }
        ]
      }
    },
    {
      name: 'Bubbles',
      path: '/bubbles',
      component: Bubbles,
      props: { options: config.bubbles },
      meta: {
        title: 'Bubbles',
        metaTags: [
          {
            name: 'description',
            content: 'Try Bubbles game. The more bubbles you stuck, the more points you get.'
          },
          {
            property: 'og:description',
            content: 'Try Bubbles game. The more bubbles you stuck, the more points you get.'
          }
        ]
      }
    },
    {
      name: 'Numbers',
      path: '/numbers',
      component: Numbers,
      props: { options: config.numbers },
      meta: {
        title: '2048 Game',
        metaTags: [
          {
            name: 'description',
            content: '2+2=4... 4+4=8... 8+8=16... 16+16=32... How long will it take to get up to 2048? Can you add ' +
              'numbers to win this one?'
          },
          {
            property: 'og:description',
            content: '2+2=4... 4+4=8... 8+8=16... 16+16=32... How long will it take to get up to 2048? Can you add ' +
              'numbers to win this one?'
          }
        ]
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta?.title)
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta?.metaTags)

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title
  }

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  if (!nearestWithMeta) {
    return next()
  }

  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  }).forEach(tag => document.head.appendChild(tag))

  next()
})

export default router
