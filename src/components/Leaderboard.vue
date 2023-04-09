<template>
  <div class="leaderboard">
    <h3>Leaderboard</h3>
    <ol>
      <li
        v-for="(user, id) in leaderboard"
        :key="user['.key']"
        :class="{ leader: user['.key'] === userKey }"
        :data-position="id + 1"
      >
        <mark>{{ user.name }}</mark>
        <span>{{ formatResult(user.result) }}</span>
      </li>
    </ol>
    <div v-if="position > 5">
      <p class="skip">...</p>
      <ol>
        <li :data-position="position" class="not_leader">
          <mark>{{ userName }}</mark>
          <span>{{ formatResult(result) }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { User } from '../types/leaderboard'
import formatTime from '../utils/formatTime'

defineProps<{
  leaderboard: User[],
  position: number,
  result: number,
  userKey: string,
  userName: string,
}>()
const route = useRoute()

function formatResult(result: number): string|number {
  return route.path.includes('miner') ? formatTime(result) : result
}
</script>

<style scoped lang="scss">
.leaderboard {
  padding: 0 40px;
  transform-origin: top;
  animation: show-leaderboard 0.5s;
  @media screen and (max-width: 500px) {
    padding: 0;
  }
}

@keyframes show-leaderboard {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}

ol {
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  counter-reset: leaderboard;
  list-style-type: none;
  li {
    position: relative;
    z-index: 1;
    font-size: 14px;
    counter-increment: leaderboard;
    padding: 18px 10px 18px 50px;
    cursor: pointer;
    backface-visibility: hidden;
    transform: translateZ(0) scale(1.0, 1.0);
    text-align: left;
    &::before {
      content: attr(data-position);
      position: absolute;
      z-index: 2;
      top: 15px;
      left: 15px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      color: #1f332e;
      background: #fff;
      border-radius: 20px;
      text-align: center;
    }
    mark {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 18px 10px 18px 50px;
      margin: 0;
      background: none;
      color: #fff;
      &::before, &::after {
        content: '';
        position: absolute;
        z-index: 1;
        bottom: -11px;
        left: -9px;
        border-top: 10px solid #2e4c45;
        border-left: 10px solid transparent;
        transition: all .1s ease-in-out;
        opacity: 0;
      }
      &::after {
        left: auto;
        right: -9px;
        border-left: none;
        border-right: 10px solid transparent;
      }
    }
    span {
      position: relative;
      z-index: 2;
      display: block;
      text-align: right;
      font-weight: bold;
      color: #fff;
    }
    &::after {
      content: '';
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fa6855;
      box-shadow: 0 3px 0 rgba(0, 0, 0, .08);
      transition: all .3s ease-in-out;
      opacity: 0;
    }
    &:not(.not_leader):nth-child(1) {
      background: #7cccb8;
      &::after {
        background: #7cccb8;
      }
    }
    &:nth-child(2) {
      background: #6cb2a1;
      &::after {
        background: #6cb2a1;
        box-shadow: 0 2px 0 rgba(0, 0, 0, .08);
      }
      & mark {
        &::before, &::after {
          border-top: 6px solid #2e4c45;
          bottom: -7px;
        }
      }
    }
    &:nth-child(3) {
      background: #5d998a;
      &::after {
        background: #5d998a;
        box-shadow: 0 1px 0 rgba(0, 0, 0, .11);
      }
      & mark {
        &::before, &::after {
          border-top: 2px solid #2e4c45;
          bottom: -3px;
        }
      }
    }
    &:nth-child(4) {
      background: #4d7f73;
      &::after {
        background: #4d7f73;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, .15);
      }
      & mark {
        &::before, &::after {
          top: -7px;
          bottom: auto;
          border-top: none;
          border-bottom: 6px solid #2e4c45;
        }
      }
    }
    &:nth-child(5) {
      background: #3e665c;
      &::after {
        background: #3e665c;
        box-shadow: 0 -2.5px 0 rgba(0, 0, 0, .12);
      }
      & mark {
        &::before, &::after {
          top: -9px;
          bottom: auto;
          border-top: none;
          border-bottom: 8px solid #2e4c45;
        }
      }
    }
  }
  li.leader {
    background-color: #dff2ee;
    color: #2e4c45;
    box-shadow: 0 0 30px 4px #009c78;
    z-index: 2;
    &:before {
      background-color: #2e4c45;
      color: #fff;
    }
    & mark, & span {
      color: inherit;
      transition: color 0.2s;
    }
  }
  li.leader:hover {
    & mark, & span {
      color: #fff;
    }
  }
  li:hover {
    z-index: 2;
    overflow: visible;
    &::after {
      opacity: 1;
      transform: scaleX(1.06) scaleY(1.03);
    }
    & mark {
      &::before, &::after {
        color: #fff;
        opacity: 1;
        transition: all .35s ease-in-out;
      }
    }
  }
}

.skip {
  margin: 8px 0;
  font-size: 18px;
  font-weight: bold;
}
.not_leader {
  background: #843535;
  &::after {
    background: #843535;
    box-shadow: 0 1px 0 rgba(0, 0, 0, .11);
  }
  & mark {
    &::before, &::after {
      border-top: 2px solid #2d1212;
      bottom: -3px;
    }
  }
}
</style>
