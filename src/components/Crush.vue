<template>
  <div>
    <h1>Score: <span>{{ score }}</span></h1>
    <div ref="field" class="field">
      <div class="line" v-for="(line, id) in cells" :key="id">
        <div class="cell" v-for="(cell, idx) in line" :key="id + '' + idx" @click="onCellClick(id, idx)">
          <div class="cell__content" :class="cell"></div>
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
      size: this.options.size,
      cells: null,
      colors: this.options.colors,
      emptyColor: 'transparent',
      score: 0,
      finish: false
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
      this.finish = false
      this.score = 0
      this.cells = []
      for (let i = 0; i < this.size; i++) {
        this.cells[i] = []
        for (let j = 0; j < this.size; j++) {
          this.cells[i][j] = this.colors[this.randomColor()]
        }
      }
    },
    onCellClick (i, j) {
      if (this.cells[i][j] === this.emptyColor) {
        return
      }

      const oldVal = this.cells[i][j]
      this.cells[i][j] = this.emptyColor

      const sameColor = this.checkColor(i, j, oldVal)
      if (sameColor.length < 2) {
        this.cells[i][j] = oldVal
        return
      }

      this.moveDown(sameColor)
      this.calcScore(sameColor.length)
      this.checkColumn()
      this.setCells(i)
      this.checkFinish()
    },
    checkColor (i, j, value, found) {
      const foundSame = found || []
      foundSame.push([i, j])

      const positions = this.positions(i, j)
      positions.map(position => {
        if (this.cells[position[0]] && this.cells[position[0]][position[1]] === value) {
          this.cells[position[0]][position[1]] = this.emptyColor
          this.checkColor(position[0], position[1], value, foundSame)
        }
      })
      return foundSame
    },
    checkFinish () {
      for (let i = 0; i < this.cells.length; i++) {
        for (let j = 0; j < this.cells[i].length; j++) {
          const positions = this.positions(i, j)

          const notFinished = positions.some(position => {
            return this.cells[position[0]] && this.cells[i][j] !== this.emptyColor && this.cells[i][j] === this.cells[position[0]][position[1]]
          })

          if (notFinished) {
            return
          }
        }
      }

      this.finish = true
    },
    moveDown (sameColor) {
      const allJPositions = sameColor.map(item => item[1])
      const minJ = Math.min.apply(Math, allJPositions)
      const maxJ = Math.max.apply(Math, allJPositions)

      for (let j = minJ; j <= maxJ; j++) {
        for (let i = this.size - 1; i >= 0; i--) {
          if (this.cells[i][j] === this.emptyColor) {
            for (let k = i - 1; k >= 0; k--) {
              if (this.cells[k][j] !== this.emptyColor) {
                this.cells[i][j] = this.cells[k][j]
                this.cells[k][j] = this.emptyColor
                break
              }
            }
          }
        }
      }
    },
    checkColumn () {
      for (let j = 0; j < this.size - 1; j++) {
        if (this.cells.every(item => item[j] === this.emptyColor)) {
          this.moveColumn(j)
        }
      }
    },
    moveColumn (emptyColumn) {
      for (let j = emptyColumn; j < this.size - 1; j++) {
        for (let i = 0; i < this.size; i++) {
          this.cells[i][j] = this.cells[i][j + 1]
          this.cells[i][j + 1] = this.emptyColor
        }
      }
    },
    calcScore (length) {
      this.score += 2 * length * Math.ceil(length / 10)
    },
    setCells (i) {
      this.$set(this.cells, i, this.cells[i])
    },
    randomColor () {
      return Math.floor(Math.random() * this.colors.length)
    },
    positions (i, j) {
      return [[i - 1, j], [i, j - 1], [i, j + 1], [i + 1, j]]
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
  border: 1px solid #e5e5e5;
  border-radius: 5px;
}
.line {
  display: flex;
}
.cell {
  width: 3vw;
  max-width: 30px;
  min-width: 18px;
  height: 3vw;
  max-height: 30px;
  min-height: 18px;
  padding: 2px;
  position: relative;
}
.cell__content {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: -1px -1px 0 1px rgba(0, 0, 0, 0.7) inset;
}
.red {
  background: linear-gradient(45deg, #ff416c, #ff4b2b);
}
.green {
  background: linear-gradient(45deg, #4bfd39, #12fff7);
}
.blue {
  background: linear-gradient(45deg, #1a2980, #26d0ce);
}
.yellow {
  background: linear-gradient(45deg, #cac531, #f3f9a7);
}
.purple {
  background: linear-gradient(45deg, #12c2e9, #c471ed, #f64f59);
}
.orange {
  background: linear-gradient(45deg, #fc4a1a, #f7b733);
}
.transparent {
  background-color: transparent;
  box-shadow: none;
}
</style>
