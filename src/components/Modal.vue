<template>
  <transition name="fade">
    <div class="modal">
      <div class="modal__backdrop"></div>
      <div class="modal__inner">
        <div class="modal__top">
          <h2>Congratulations! You win!</h2>
        </div>
        <div class="modal__body">
          <form v-if="!leaderboard" class="form" @submit.prevent="setNickname">
            <label>Enter your name to post the time <span class="text--green">{{ formatTime(time) }}</span></label>
            <input type="text" v-model="name" placeholder="Enter your name">
            <div v-if="error" class="error">Name length should be between 3 and 20 symbols</div>
          </form>
          <div v-else class="leaderboard">
            <h3>Leaderboard</h3>
            <ol>
              <li v-for="(user, id) in leaderboard" :key="id" :class="user.name === name ? 'leader' : ''" :data-position="id + 1">
                <mark>{{ user.name }}</mark>
                <span>{{ formatTime(user.time) }}</span>
              </li>
            </ol>
            <div v-if="position > 5">
              <p class="skip">...</p>
              <ol>
                <li :data-position="position" class="not_leader">
                  <mark>{{ name }}</mark>
                  <span>{{ formatTime(time) }}</span>
                </li>
              </ol>
            </div>
          </div>
          <router-link to="/" tag="button" class="btn">Home</router-link>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      leaderboard: null,
      position: null,
      name: '',
      error: false,

    }
  },
  props: {
    time: {
      type: Number
    }
  },
  methods: {
    setNickname () {
      if (this.name.length > 2 && this.name.length < 20) {
        this.error = false
        this.$http.post('/time', { name: this.name, time: this.time, mode: this.$route.name.toLowerCase() })
          .then((data) => {
            this.leaderboard = data.body.leaderboard
            this.position = data.body.position
          }, err => {
            console.log(err)
          })
      } else {
        this.error = true
      }
    },
    zeroTime (val) {
      return val > 9 ? val : '0' + val
    },
    formatTime (val) {
      const minutes = Math.floor(val / 60)
      const seconds = val - minutes * 60
      return `${this.zeroTime(minutes)}:${this.zeroTime(seconds)}`
    }
  }
}
</script>
<style scoped lang="scss">
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
  background-color: #fff;
  border-radius: 30px;
}
.modal__top {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.modal__body {
  padding: 20px 0;
}
.leaderboard {
  padding: 0 40px;
  transform-origin: top;
  animation: show-leaderboard 0.5s;
}
@media screen and (max-width: 500px) {
  .leaderboard {
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
.form {
  padding: 0 40px;
  position: relative;
}
.form label {
  font-size: 18px;
}
.text--green {
  color: #71B280;
}
.form input {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  padding: 0 20px;
  border: 1px solid #134E5E;
  border-radius: 20px;
  outline: none;
  transition: box-shadow 0.3s;
}
.form input:focus {
  box-shadow: 0 0 10px #134E5E;
}
.error {
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 100%;
  color: tomato;
  font-size: 12px;
  text-align: center;
}
</style>
