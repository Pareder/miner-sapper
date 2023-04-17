<template>
  <transition name="fade">
    <div class="modal">
      <div class="modal__backdrop" />
      <div class="modal__inner">
        <div class="modal__top">
          <h2>Good job!</h2>
        </div>
        <div class="modal__body">
          <p>
            Enter your name to post the result <span class="text--green text--bold">
              {{ isMiner ? formatTime(result) : result }}
            </span>
          </p>
          <Form
            v-if="!leaderboard.length"
            :sending-error="sendingError"
            @submit-form="getLeaderboard"
          />
          <Leaderboard
            v-else
            :leaderboard="leaderboard"
            :position="position"
            :result="result"
            :user-key="userKey"
            :user-name="userName"
          />
          <button
            type="button"
            class="btn"
            @click="$emit('restart')"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  endBefore,
  get,
  limitToFirst,
  limitToLast,
  orderByChild,
  ref as firebaseRef,
  push,
  query,
  startAfter,
  update,
} from 'firebase/database'
import { User } from 'types/leaderboard'
import db from 'config/db'
import formatTime from 'utils/formatTime'
import Form from './Form.vue'
import Leaderboard from './Leaderboard.vue'

const props = defineProps<{
  result: number,
}>()
defineEmits(['restart'])

const route = useRoute()

const leaderboard = ref<Array<User>>([])
const position = ref(0)
const userKey = ref('')
const userName = ref('')
const sendingError = ref(false)
const isMiner = route.path.includes('miner')

const mode = route.path.split('/').slice(1).join('_')
const _db = firebaseRef(db, `results/${mode}`)

function getLeaderboard(name: string) {
  const newItem = push(_db).key as string
  userKey.value = newItem
  userName.value = name
  const updates = {
    [newItem]: {
      name,
      result: props.result,
    },
  }
  update(_db, updates)
    .then(() => {
      sendingError.value = false
      const leaderboardRef = query(_db, orderByChild('result'), isMiner ? limitToFirst(5) : limitToLast(5))
      get(leaderboardRef).then(snapshot => {
        if (snapshot.exists()) {
          const value: { [key: string]: User } = snapshot.val()
          leaderboard.value = Object.entries(value)
            .map(([key, data]) => ({
              key,
              name: data.name,
              result: data.result,
            }))
            .sort((a, b) => isMiner ? a.result - b.result : b.result - a.result)
        }
      })
      const positionRef = query(_db, orderByChild('result'), isMiner ? endBefore(props.result) : startAfter(props.result))
      get(positionRef).then(snapshot => {
        if (snapshot.exists()) {
          position.value = Object.keys(snapshot.val()).length + 1
        }
      })
    })
    .catch(() => {
      sendingError.value = true
    })
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.modal__backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal__inner {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  max-height: 100vh;
  background-color: #fff;
  border-radius: 30px;
  overflow-y: auto;
}
.modal__top {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.modal__body {
  padding: 20px 0;
  overflow-y: hidden;
  overflow-x: hidden;
}
p {
  margin: 0;
}
.text--green {
  color: #71B280;
}
.text--bold {
  font-weight: bold;
}
</style>
