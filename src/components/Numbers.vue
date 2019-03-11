<template>
  <div>
    <h1>Score: {{ score }}</h1>
    <div class="field">
      <div class="line" v-for="(line, id) in cells" :key="id">
        <div class="cell" v-for="(cell, idx) in line" :key="id + '' + idx" :style="`background-color: ${ cellBackgroundColor(cell.value) }; color: ${ cellColor(cell.value) }`">
          {{ cell.value }}
        </div>
      </div>
    </div>
    <Modal v-if="finish" :result="score" @restart="initData" />
  </div>
</template>
<script>
import Modal from './Modal'

export default {
  data () {
    return {
      cells: [],
      cekkChanged: false,
      finish: false,
      score: 0
    }
  },
  props: {
    options: {
      type: Object
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.cellChanged = false
      this.finish = false
      this.score = 0

      for (let i = 0; i < this.options.size; i++) {
        this.cells[i] = []
        for (let j = 0; j < this.options.size; j++) {
          this.cells[i][j] = { value: null }
        }
      }

      this.startNumbers()
      this.setKeyEventHandler()
    },
    startNumbers () {
      for (let i = 0; i < this.options.startNumbersCount; i++) {
        this.randomCell()
      }
    },
    randomCell () {
      const position = [this.randomNumber(), this.randomNumber()]

      if (!this.cells[position[0]][position[1]].value) {
        this.cells[position[0]][position[1]].value = this.randomValue()
      } else {
        this.randomCell()
      }
    },
    setKeyEventHandler () {
      window.addEventListener('keydown', this.onKeyDown)
    },
    onKeyDown (e) {
      this.cellChanged = false

      switch (e.keyCode) {
        case this.options.arrowCodes[0]:
          this.moveCellsLeft()
          break
        case this.options.arrowCodes[1]:
          this.moveCellsUp()
          break
        case this.options.arrowCodes[2]:
          this.moveCellsRight()
          break
        case this.options.arrowCodes[3]:
          this.moveCellsDown()
          break
        default:
          return
      }

      this.finish = this.cells.every(item => item.every(cell => cell.value))

      if (this.finish) {
        return
      }

      if (this.cellChanged) {
        this.randomCell()
        this.setCells(0)
      }
    },
    moveCellsLeft () {
      let changed = false

      for (let i = 0; i < this.options.size; i++) {
        for (let j = 0; j < this.options.size - 1; j++) {
          for (let k = j + 1; k < this.options.size; k++) {
            const finish = this.checkCells([i, j], [i, k])
            if (finish) {
              break
            }
          }
        }
      }

      return changed
    },
    moveCellsUp () {
      let changed = false

      for (let j = 0; j < this.options.size; j++) {
        for (let i = 0; i < this.options.size - 1; i++) {
          for (let k = i + 1; k < this.options.size; k++) {
            const finish = this.checkCells([i, j], [k, j])
            if (finish) {
              break
            }
          }
        }
      }

      return changed
    },
    moveCellsRight () {
      let changed = false

      for (let i = 0; i < this.options.size; i++) {
        for (let j = this.options.size - 1; j > 0; j--) {
          for (let k = j - 1; k >= 0; k--) {
            const finish = this.checkCells([i, j], [i, k])
            if (finish) {
              break
            }
          }
        }
      }

      return changed
    },
    moveCellsDown () {
      let changed = false

      for (let j = 0; j < this.options.size; j++) {
        for (let i = this.options.size - 1; i > 0; i--) {
          for (let k = i - 1; k >= 0; k--) {
            const finish = this.checkCells([i, j], [k, j])
            if (finish) {
              break
            }
          }
        }
      }

      return changed
    },
    checkCells (cell1, cell2) {
      if (!this.cells[cell1[0]][cell1[1]].value && this.cells[cell2[0]][cell2[1]].value) {
        this.cells[cell1[0]][cell1[1]].value = this.cells[cell2[0]][cell2[1]].value
        this.cells[cell2[0]][cell2[1]].value = null
        this.cellChanged = true
      } else if (this.cells[cell1[0]][cell1[1]].value && this.cells[cell1[0]][cell1[1]].value === this.cells[cell2[0]][cell2[1]].value) {
        this.cells[cell1[0]][cell1[1]].value *= 2
        this.cells[cell2[0]][cell2[1]].value = null
        this.cellChanged = true
        this.score += this.cells[cell1[0]][cell1[1]].value
        return true
      } else if (this.cells[cell1[0]][cell1[1]].value && this.cells[cell2[0]][cell2[1]].value) {
        return true
      }
    },
    setCells (i) {
      this.$set(this.cells, i, this.cells[i])
    },
    cellBackgroundColor (value) {
      switch (value) {
        case 2:
          return '#e2efe5'
        case 4:
          return '#d4e7d8'
        case 8:
          return '#c6e0cc'
        case 16:
          return '#b8d8bf'
        case 32:
          return '#a9d0b2'
        case 64:
          return '#9bc9a6'
        case 128:
          return '#8dc199'
        case 256:
          return '#7fb98c'
        case 512:
          return '#134e5e'
        case 1024:
          return '#114654'
        case 2048:
          return '#0f3e4b'
        case 4096:
          return '#0d3641'
        default:
          return '#a0b8be'
      }
    },
    cellColor (value) {
      return value < 256 ? '#776E65' : '#fff'
    },
    randomNumber () {
      return Math.floor(Math.random() * this.options.size)
    },
    randomValue () {
      return Math.random() > 0.95 ? 4 : 2
    }
  },
  components: {
    Modal
  }
}
</script>
<style scoped>
.field {
  padding: 5px;
  display: flex;
  flex-direction: column;
  background-color: #59838e;
  border-radius: 5px;
}
.line {
  display: flex;
}
.cell {
  width: 100px;
  height: 100px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: bold;
  border-radius: 5px;
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
}
</style>
