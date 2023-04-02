<template>
  <div>
    <h1>Score: <span>{{ score }}</span></h1>
    <transition-group
      name="bounce"
      tag="div"
      class="field"
      :style="{
        '--grid-size': size
      }"
    >
      <template v-for="(line, x) in cells">
        <template v-for="(cell, y) in line">
          <div
            v-if="!cell"
            :key="`${x}-${y}`"
            class="cell transparent"
            :style="{
              'grid-column': `${x + 1} / span 1`,
              'grid-row': `${y + 1} / span 1`
            }"
          ></div>
          <div
            v-else
            :key="cell.id"
            class="cell"
            :class="{
              [cell.color]: true,
              highlight: cell.highlight
            }"
            :style="{
              'grid-column': `${x + 1} / span 1`,
              'grid-row': `${y + 1} / span 1`
            }"
            @click="onCellClick"
            @mouseover="onCellMouseOver(x, y)"
          ></div>
        </template>
      </template>
    </transition-group>
    <Modal v-if="finish" :result="score" @restart="initData" />
  </div>
</template>

<script lang="ts">
import getPositions from 'utils/bubbles/getPositions'
import getRandomNumber from 'utils/getRandomNumber'
import randomString from 'utils/randomString'
import Modal from '../components/Modal.vue'

export default {
  data () {
    return {
      size: this.options.size,
      cells: null,
      colors: this.options.colors,
      score: 0,
      finish: false
    }
  },

  props: {
    options: {
      type: Object
    }
  },

  computed: {
    highlightedCellsCount () {
      return this.cells
        .map(cell => {
          return cell.filter(item => item?.highlight)
        })
        .flat()
        .length
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
          this.cells[i][j] = {
            id: randomString(16),
            color: this.colors[getRandomNumber(this.colors.length)],
            highlight: false
          }
        }
      }
    },

    onCellClick () {
      if (this.highlightedCellsCount < 2) {
        return
      }

      for (let i = 0; i < this.size; i++) {
        let offset = 0
        for (let j = this.size - 1; j >= 0;) {
          if (this.cells[i][j]?.highlight) {
            for (let k = j - 1; k >= 0; k--) {
              this.cells[i][k + 1] = this.cells[i][k]
            }

            this.cells[i][offset] = null
            offset++
          } else {
            j--
          }
        }
      }

      this.calcScore()
      this.checkColumn()
      this.setCells()
      this.checkFinish()
    },

    calcScore () {
      this.score += 2 * this.highlightedCellsCount * Math.ceil(this.highlightedCellsCount / 10)
    },

    checkColumn () {
      for (let i = 1; i < this.size; i++) {
        if (this.cells[i].some(item => item)) {
          continue
        }

        this.moveColumn(i)
      }
    },

    moveColumn (emptyColumn) {
      for (let i = emptyColumn; i > 0; i--) {
        this.cells[i] = this.cells[i - 1]
      }

      this.cells[0] = new Array(this.size).fill(null)
    },

    setCells () {
      this.cells = this.cells.map(cell => cell.map(item => item))
    },

    checkFinish () {
      for (let i = 0; i < this.cells.length; i++) {
        for (let j = 0; j < this.cells[i].length; j++) {
          const positions = getPositions(i, j)
          const notFinished = positions.some(position => {
            return this.cells[position[0]]?.[position[1]]?.color === this.cells[i][j]?.color
              && this.cells[i][j] !== null
          })

          if (notFinished) {
            return
          }
        }
      }

      this.finish = true
    },

    onCellMouseOver(x, y) {
      const cell = this.cells[x][y]
      if (!cell || cell.highlight) {
        return
      }

      this.removeHighlight()
      this.highlightCells(x, y)
      this.setCells()
    },

    removeHighlight() {
      this.cells.forEach(cell => {
        cell.forEach(item => {
          if (item) {
            item.highlight = false
          }
        })
      })
    },

    highlightCells(x, y) {
      const positions = getPositions(x, y)

      positions.map(([posX, posY]) => {
        const cell = this.cells[posX]?.[posY]
        if (cell?.highlight !== true && cell?.color === this.cells[x][y].color) {
          this.cells[posX][posY].highlight = true
          this.highlightCells(posX, posY)
        }
      })
    }
  },

  components: {
    Modal
  }
}
</script>

<style scoped lang="scss">
.field {
  padding: 5px;
  display: grid;
  grid-template-rows: repeat(var(--grid-size), 1fr);
  grid-template-columns: repeat(var(--grid-size), 1fr);
  border: 1px solid #e5e5e5;
  border-radius: 5px;
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
  border-radius: 50%;
  box-shadow: -1px -1px 0 1px rgba(0, 0, 0, 0.7) inset;
  &.red {
    background: linear-gradient(45deg, #ff416c, #ff4b2b);
  }
  &.green {
    background: linear-gradient(45deg, #4bfd39, #12fff7);
  }
  &.blue {
    background: linear-gradient(45deg, #1a2980, #26d0ce);
  }
  &.yellow {
    background: linear-gradient(45deg, #cac531, #f3f9a7);
  }
  &.purple {
    background: linear-gradient(45deg, #12c2e9, #c471ed, #f64f59);
  }
  &.orange {
    background: linear-gradient(45deg, #fc4a1a, #f7b733);
  }
  &.transparent {
    background-color: transparent;
    box-shadow: none;
  }
  &.highlight {
    filter: brightness(0.6);
  }
}

.bounce-leave-active {
  animation: bounce-in 0.4s;
}

@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

.bounce-move {
  transition: transform 0.3s cubic-bezier(.47, 1.64, .41, .8);
  transition-delay: 0.15s;
}
</style>
