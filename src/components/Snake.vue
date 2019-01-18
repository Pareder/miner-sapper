<template>
  <div>
    <div ref="field" class="field">
      <div class="line" v-for="(line, id) in cells" :key="id">
        <div class="cell" v-for="(cell, idx) in line" :key="id + '' + idx" :class="cell || ''"></div>
      </div>
    </div>
    <LoseModal v-if="lose" @restart="initData" />
  </div>
</template>
<script>
import LoseModal from './LoseModal'

export default {
  data () {
    return {
      size: this.options.size,
      arrowCodes: this.options.arrowCodes,
      cells: null,
      snake: null,
      code: null,
      bonus: null,
      arrowPressed: false,
      lose: false
    }
  },
  props: {
    options: {
      type: Object
    }
  },
  created () {
    this.setKeyEventHandler()
    this.initData()
  },
  methods: {
    setKeyEventHandler () {
      window.addEventListener('keydown', this.onKeyDown)
    },
    initData () {
      this.cells = new Array(this.size)
      for (let i = 0; i < this.cells.length; i++) {
        this.cells[i] = new Array(this.size).fill(0)
      }

      this.setDirection()
      this.setSnake()
      this.setBonus()

      this.arrowPressed = false
      this.lose = false

      this.checkIntersection()
      this.moveSnake()
    },
    setDirection () {
      this.code = Math.floor(Math.random() * (this.arrowCodes[3] - this.arrowCodes[0] + 1) + this.arrowCodes[0])
    },
    setSnake () {
      const position = [this.randomNumber(), this.randomNumber()]
      if (position[0] < 2 || position[0] > this.size - 4 || position[1] < 2 || position[1] > this.size - 4) {
        this.setSnake()
      } else {
        this.snake = []
        this.snake.push(position)
        switch (this.code) {
          case this.arrowCodes[0]:
            this.snake.push([position[0], position[1] + 1])
            this.snake.push([position[0], position[1] + 2])
            break
          case this.arrowCodes[1]:
            this.snake.push([position[0] + 1, position[1]])
            this.snake.push([position[0] + 2, position[1]])
            break
          case this.arrowCodes[2]:
            this.snake.push([position[0], position[1] - 1])
            this.snake.push([position[0], position[1] - 2])
            break
          case this.arrowCodes[3]:
            this.snake.push([position[0] - 1, position[1]])
            this.snake.push([position[0] - 2, position[1]])
            break
        }
      }
    },
    setBonus () {
      const position = [this.randomNumber(), this.randomNumber()]
      if (this.snake.some(item => item[0] === position[0] && item[1] === position[1])) {
        this.setBonus()
      } else {
        this.bonus = [...position]
        this.cells[this.bonus[0]][this.bonus[1]] = 'bonus'
      }
    },
    setTimeOut () {
      setTimeout(() => {
        this.moveSnake()
      }, 150)
    },
    moveSnake () {
      const lastPos = this.snake[this.snake.length - 1]
      for (let i = this.snake.length - 1; i >= 0; i--) {
        if (i === 0) {
          switch (this.code) {
            case this.arrowCodes[0]:
              if (this.snake[0][1] === 0) {
                this.snake[0][1] = this.size - 1
              } else {
                this.snake[0][1]--
              }
              break
            case this.arrowCodes[1]:
              if (this.snake[0][0] === 0) {
                this.snake[0][0] = this.size - 1
              } else {
                this.snake[0][0]--
              }
              break
            case this.arrowCodes[2]:
              if (this.snake[0][1] === this.size - 1) {
                this.snake[0][1] = 0
              } else {
                this.snake[0][1]++
              }
              break
            case this.arrowCodes[3]:
              if (this.snake[0][0] === this.size - 1) {
                this.snake[0][0] = 0
              } else {
                this.snake[0][0]++
              }
          }
        } else {
          this.snake[i][0] = this.snake[i - 1][0]
          this.snake[i][1] = this.snake[i - 1][1]
        }
      }

      if (this.snake[0][0] === this.bonus[0] && this.snake[0][1] === this.bonus[1]) {
        this.snake.push([
          lastPos[0],
          lastPos[1]
        ])

        if (this.snake.length === this.size ** 2) {
          this.lose = true
        } else {
          this.setBonus()
        }
      }

      if (this.snake.some((item, idx) => idx && item[0] === this.snake[0][0] && item[1] === this.snake[0][1])) {
        this.lose = true
        return
      }

      this.checkIntersection()
      this.setCells(this.snake[0][0])
      this.setTimeOut()

      this.arrowPressed = false
    },
    checkIntersection () {
      for (let i = 0; i < this.cells.length; i++) {
        for (let j = 0; j < this.cells[i].length; j++) {
          if (this.cells[i][j] !== 'bonus') {
            this.cells[i][j] = 0
          }
        }
      }

      this.snake.map((position, idx) => {
        this.cells[position[0]][position[1]] = idx === 0 ? 'full cell--first' : 'full'
      })
    },
    onKeyDown (e) {
      // The number 2 is the difference between two opposite arrows
      if (this.code === e.keyCode || this.code === e.keyCode + 2 || this.code === e.keyCode - 2 || this.arrowPressed || !this.arrowCodes.includes(e.keyCode)) {
        return
      }
      this.arrowPressed = true
      this.code = e.keyCode
      this.checkIntersection()
      this.setCells(this.snake[0][0])
    },
    setCells (i) {
      this.$set(this.cells, i, this.cells[i])
    },
    randomNumber () {
      return Math.floor(Math.random() * this.size)
    }
  },
  components: {
    LoseModal
  }
}
</script>
<style scoped>
.field {
  padding: 5px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
}
.line {
  display: flex;
}
.cell {
  width: 3vw;
  max-width: 30px;
  height: 3vw;
  max-height: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
  border-radius: 5px;
}
.full {
  background-color: #134E5E;
}
.bonus {
  background-color: #64e682;
}
.cell--first:before {
  content: '';
  position: absolute;
  top: calc(50% - 10px);
  left: 50%;
  width: 0;
  height: 0;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-bottom-color: #fff;
}
.cell--first:after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #fff;
}
</style>
