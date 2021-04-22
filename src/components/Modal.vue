<template>
  <transition name="fade">
    <div class="modal">
      <div class="modal__backdrop"></div>
      <div class="modal__inner">
        <div class="modal__top">
          <h2>Good job!</h2>
        </div>
        <div class="modal__body">
          <p>Enter your name to post the result <span class="text--green text--bold">
            {{ isMiner ? formatTime(result) : result }}
          </span></p>
          <Form v-if="!leaderboardData.length" :sendingError="sendingError" @submitForm="getLeaderboard" />
          <Leaderboard v-else
            :leaderboard="leaderboard"
            :position="position"
            :result="result"
            :userKey="userKey"
            :userName="userName"
          />
          <button type="button" class="btn" @click="$emit('restart')">Restart</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Form from './Form'
import Leaderboard from './Leaderboard'
import db from '../config/db'

export default {
  data () {
    return {
      leaderboardData: [],
      recordsBefore: [],
      position: 0,
      userKey: '',
      userName: '',
      sendingError: false
    }
  },

  props: {
    result: {
      type: Number
    }
  },

  watch: {
    recordsBefore (val) {
      this.position = val.length + 1
      this.recordsBefore.length = 0 // Not to store unused array in memory
    }
  },

  computed: {
    isMiner () {
      return this.$route.path.includes('miner')
    },

    leaderboard () {
      return this.isMiner ? this.leaderboardData : this.leaderboardData.slice().reverse()
    }
  },

  created () {
    const mode = this.$route.path.split('/').slice(1).join('_')
    this._db = db.ref('results').child(mode)
  },

  methods: {
    getLeaderboard (name) {
      const newItem = this._db.push()
      this.userKey = newItem.key
      this.userName = name

      newItem
        .set({
          name,
          result: this.result
        })
        .then(() => {
          this.sendingError = false
          this.$rtdbBind(
            'leaderboardData',
            // Ascending order for miner mode and descending for other modes
            this._db.orderByChild('result')[this.isMiner ? 'limitToFirst' : 'limitToLast'](5)
          )
          this.$rtdbBind(
            'recordsBefore',
            // Get all records that ends before result for miner mode, and that starts from result for others mode
            this._db.orderByChild('result')[this.isMiner ? 'endBefore' : 'startAfter'](this.result)
          )
        })
        .catch(() => {
          this.sendingError = true
        })
    }
  },

  components: {
    Form,
    Leaderboard
  }
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
