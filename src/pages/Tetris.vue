<template>
  <div>
    <h1>Score: {{ score }}</h1>
    <div class="game">
      <div ref="field" class="field">
        <div class="line" v-for="(line, id) in cells" :key="id">
          <div
            class="cell"
            v-for="(cell, idx) in line"
            :key="id + '' + idx"
            :style="cell && cell.value ?
              `background-color: ${lighten(cell.color)}; border: 1px solid ${cell.color}`:
              ''"
          ></div>
        </div>
      </div>
      <div class="next_model">
        <div class="line" v-for="line in 3" :key="line">
          <div
            class="cell"
            v-for="cell in 4"
            :key="`${line}_${cell}`"
            :style="checkNext(line - 1, cell - 1) ?
              `background-color: ${lighten(nextModel.color)}; border: 1px solid ${nextModel.color}` :
              ''"
          ></div>
        </div>
      </div>
    </div>
    <Modal v-if="lose" :result="score" @restart="initData" />
  </div>
</template>
<script>
import { randomizeModel, rotateModel as rotateModelHelper, getRandomColor, lightenColor } from '../helpers'
import Modal from '../components/Modal'

export default {
  data () {
    return {
      size: this.options.size,
      cells: null,
      currentModel: null,
      nextModel: null,
      randomModel: null,
      randomNextModel: null,
      score: 0,
      timeout: null,
      lose: false,
      stepTime: null,
      stepInterval: null,
      xDown: null,
      yDown: null
    }
  },
  props: {
    options: {
      type: Object
    }
  },
  computed: {
    spentTime () {
      return +((this.endTime - this.startTime) / 1000).toFixed(2)
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.score = 0
      this.stepTime = 500
      this.lose = false
      this.startTime = null
      this.endTime = null
      this.cells = new Array(this.size[0])

      for (let i = 0; i < this.cells.length; i++) {
        this.cells[i] = new Array(this.size[1]).fill({ value: 0 })
      }

      this.setKeyEventHandler()
      this.buildModel()
      this.setTimeOut()
      this.setStepTime()
    },
    setKeyEventHandler () {
      if (this.lose) {
        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('touchstart', this.handleTouchStart)
        window.removeEventListener('touchmove', this.handleTouchMove)
      } else {
        window.addEventListener('keydown', this.onKeyDown)
        window.addEventListener('touchstart', this.handleTouchStart)
        window.addEventListener('touchmove', this.handleTouchMove)
      }
    },
    onKeyDown (e) {
      switch (e.keyCode) {
        // Left arrow
        case this.options.arrowCodes[0]:
          this.leftMovement()
          break
        // Up arrow
        case this.options.arrowCodes[1]:
          this.rotateModel()
          break
        // Right arrow
        case this.options.arrowCodes[2]:
          this.rightMovement()
          break
        // Down arrow
        case this.options.arrowCodes[3]:
          this.downMovement()
          break
      }
      this.checkIntersection()
      this.setCells(this.currentModel.model[0][0])
    },
    handleTouchStart (e) {
      const firstTouch = e.touches[0]
      this.xDown = firstTouch.clientX
      this.yDown = firstTouch.clientY
    },
    handleTouchMove (e) {
      if (!this.xDown || !this.yDown) {
        return
      }

      const xUp = e.touches[0].clientX
      const yUp = e.touches[0].clientY

      const xDiff = this.xDown - xUp
      const yDiff = this.yDown - yUp

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          this.leftMovement()
        } else {
          this.rightMovement()
        }
      } else {
        if (yDiff > 0) {
          this.rotateModel()
        } else {
          this.downMovement()
        }
      }

      this.xDown = null
      this.yDown = null
    },
    leftMovement () {
      if (this.currentModel.model.every(item => (item[1] > 0 && this.cells[item[0]][item[1] - 1].value !== 'set'))) {
        this.currentModel.model.map(item => {
          item[1]--
        })
      }
    },
    rightMovement () {
      if (this.currentModel.model.every(item => (item[1] < this.size[1] - 1 &&
        this.cells[item[0]][item[1] + 1].value !== 'set'))) {
        this.currentModel.model.map(item => {
          item[1]++
        })
      }
    },
    downMovement () {
      if (this.currentModel.model.some(item => (item[0] === this.size[0] - 1 ||
        this.cells[item[0] + 1][item[1]].value === 'set'))) {
        this.setModel()
        this.buildModel()
        return
      }

      this.currentModel.model.map(item => {
        item[0]++
      })
    },
    setTimeOut () {
      this.timeout = setTimeout(() => {
        this.moveModel()
      }, this.stepTime)
    },
    setStepTime () {
      this.stepInterval = setInterval(() => {
        if (this.stepTime > 100) {
          this.stepTime--
        } else {
          clearInterval(this.stepInterval)
        }
      }, 3000)
    },
    buildModel () {
      this.randomModel = this.randomNextModel || Math.ceil(Math.random() * this.options.totalModels)
      this.randomNextModel = Math.ceil(Math.random() * this.options.totalModels)
      this.currentModel = this.nextModel || {
        color: getRandomColor(),
        model: randomizeModel(this.options.size[1], this.randomModel)
      }
      this.nextModel = {
        color: getRandomColor(),
        model: randomizeModel(this.options.size[1], this.randomNextModel)
      }

      if (this.currentModel.model.some(item => this.cells[item[0]][item[1]].value === 'set')) {
        clearTimeout(this.timeout)
        clearInterval(this.stepInterval)
        this.timeout = null
        this.lose = true
        this.setKeyEventHandler()

        return true
      }
    },
    moveModel () {
      let finishMovement = false
      let finishGame = false

      for (let i = 0; i < this.currentModel.model.length; i++) {
        const modelI = this.currentModel.model[i][0]
        const modelJ = this.currentModel.model[i][1]

        if (modelI === this.size[0] - 1 || (this.cells[modelI + 1] && this.cells[modelI + 1][modelJ].value === 'set')) {
          this.setModel()
          finishGame = this.buildModel()
          finishMovement = true
          break
        }
      }

      if (!finishMovement) {
        this.currentModel.model.map(item => {
          item[0]++
        })
      }

      if (!finishGame) {
        this.checkIntersection()
        this.setCells(this.currentModel.model[0][0])
        this.setTimeOut()
      }
    },
    setModel () {
      this.currentModel.model.map(position => {
        this.cells[position[0]][position[1]] = {
          color: this.currentModel.color,
          value: 'set'
        }
      })

      this.checkFullLine()
    },
    rotateModel () {
      const rotatedStatus = this.currentModel.rotated || 0
      const rotatedModel = rotateModelHelper(this.randomModel, this.currentModel.model, rotatedStatus)

      if (rotatedModel) {
        if (rotatedModel.rotatedModel.some(item => item[1] < 0)) {
          rotatedModel.rotatedModel.map(item => ++item[1])
        } else if (rotatedModel.rotatedModel.some(item => item[1] > this.size[1] - 1)) {
          rotatedModel.rotatedModel.map(item => --item[1])
        } else if (rotatedModel.rotatedModel.some(item => item[0] < 0)) {
          rotatedModel.rotatedModel.map(item => ++item[0])
        }

        if (rotatedModel.rotatedModel.some(item => item[0] >= 0 && item[1] >= 0 && this.cells[item[0]][item[1]].value === 'set')) {
          return
        }

        this.currentModel.model = rotatedModel.rotatedModel
        this.currentModel.rotated = rotatedModel.rotatedStatus
      }
    },
    checkIntersection () {
      for (let i = 0; i < this.size[0]; i++) {
        for (let j = 0; j < this.size[1]; j++) {
          if (this.cells[i][j].value !== 'set') {
            this.cells[i][j].value = 0
          }
        }
      }

      this.currentModel.model.map(position => {
        this.cells[position[0]][position[1]] = {
          color: this.currentModel.color,
          value: 1
        }
      })
    },
    checkFullLine () {
      let lines = 0
      this.cells.map((item, idx) => {
        if (item.every(cell => cell.value)) {
          for (let i = idx; i > 0; i--) {
            for (let j = 0; j < this.cells[i].length; j++) {
              this.cells[i][j].value = this.cells[i - 1][j].value
            }
          }
          lines++
        }
      })

      if (lines) {
        this.score += lines ** 2
      }
    },
    setCells (i) {
      this.$set(this.cells, i, this.cells[i])
    },
    checkNext (id, idx) {
      return this.nextModel.model.some(item => item[0] === id && item[1] === idx + (this.options.size[1] / 2 - 2))
    },
    lighten: lightenColor
  },
  components: {
    Modal
  }
}
</script>
<style scoped>
.game {
  display: flex;
  align-items: center;
}
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
  max-width: 25px;
  min-width: 18px;
  height: 3vw;
  max-height: 25px;
  min-height: 18px;
  position: relative;
  border-radius: 5px;
}
.next_model {
  margin-left: 30px;
}
</style>
