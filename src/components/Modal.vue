<template>
  <transition name="fade">
    <div class="modal">
      <div class="modal__backdrop"></div>
      <div class="modal__inner">
        <div class="modal__top">
          <h2>Good job!</h2>
        </div>
        <div class="modal__body">
          <p>Enter your name to post the result <span class="text--green text--bold">{{ $route.path.includes('miner') ? formatTime(result) : result }}</span></p>
          <Form v-if="!leaderboard" :sendingError="sendingError" @submitForm="getLeaderboard" />
          <Leaderboard v-else
            :leaderboard="leaderboard"
            :position="position"
            :result="result"
            :name="name"
            @formatTime="formatTime"
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

export default {
  data () {
    return {
      leaderboard: null,
      position: null,
      name: '',
      sendingError: false
    }
  },
  props: {
    result: {
      type: Number
    }
  },
  methods: {
    getLeaderboard (name) {
      this.name = name
      this.$http.post('/result', { name: this.name, result: this.result, mode: this.$route.path })
        .then((data) => {
          this.sendingError = false
          this.leaderboard = data.body.leaderboard
          this.position = data.body.position
        }, err => {
          this.sendingError = true
          console.log(err.statusText)
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
