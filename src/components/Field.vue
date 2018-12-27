<template>
  <transition name="fade">
    <div>
      <Modal v-if="victory" :time="stopwatch" />
      <div class="field" :style="{ gridTemplateColumns: 'repeat(' + size + ', 50px)', gridTemplateRows: 'repeat(' + size + ', 50px)' }">
        <div class="line" v-for="(line, id) in cells" :key="id">
          <div class="cell" v-for="(cell, idx) in line" :key="id + '' + idx" @click="cellClick(id, idx)" @contextmenu.prevent="cellRightClick(id, idx)" :class="cell.clicked ? (cell.value === bomb ? 'bomb' : 'opened') : (cell.rightClicked ? 'flag' : '')">
            <span v-if="cell.clicked && ([bomb, 0].indexOf(cell.value) === -1)">{{ cell.value }}</span>
          </div>
        </div>
      </div>
      <button type="button" class="btn" @click.prevent="createField">Restart</button>
    </div>
  </transition>
</template>
<script>
import Modal from './Modal'

export default {
  data () {
    return {
      size: this.options.size,
      cells: null,
      bombsCount: this.options.bombsCount,
      bomb: 'boom',
      finish: null,
      victory: null,
      stopwatch: 0,
      stopwatchInterval: null
    }
  },
  props: {
    options: {
      type: Object
    }
  },
  created () {
    this.createField()
  },
  methods: {
    createField () {
      this.initData()
      this.setBombsPosition()
    },
    initData () {
      this.cells = Array(this.size)
      this.finish = false
      this.victory = false
      this.stopwatch = 0
      for (let i = 0; i < this.size; i++) {
        this.cells[i] = Array(this.size)
      }
    },
    setBombsPosition () {
      let bombsSet = 0
      while (bombsSet < this.bombsCount) {
        const randomPosition = [this.randomNumber(), this.randomNumber()]
        if (this.cells[randomPosition[0]][randomPosition[1]] && this.cells[randomPosition[0]][randomPosition[1]].value === this.bomb) {
          continue
        }
        bombsSet++
        this.cells[randomPosition[0]][randomPosition[1]] = {
          value: this.bomb,
          clicked: false,
          rightClicked: false
        }
      }

      this.setCellsNumbers()
    },
    setCellsNumbers () {
      for (let i = 0; i < this.cells.length; i++) {
        for (let j = 0; j < this.cells[i].length; j++) {
          if (!this.cells[i][j] || this.cells[i][j].value !== this.bomb) {
            this.cells[i][j] = {
              value: this.checkBombs(i, j),
              clicked: false,
              rightClicked: false
            }
          }
        }
      }
    },
    checkBombs (i, j) {
      let bombsFound = 0
      const positions = this.positions(i, j)
      positions.map(position => {
        if (this.cells[position[0]] && this.cells[position[0]][position[1]] && this.cells[position[0]][position[1]].value === this.bomb) {
          bombsFound++
        }
      })
      return bombsFound
    },
    randomNumber () {
      return Math.floor(Math.random() * this.size)
    },
    cellClick (i, j) {
      if (!this.stopwatchInterval) {
        this.stopwatchInterval = setInterval(() => {
          this.stopwatch++
        }, 1000)
      }

      if (this.cells[i][j].clicked || this.finish) {
        return
      }

      if (this.cells[i][j].value === 0) {
        this.discardZeros(i, j)
      }

      this.$set(this.cells[i][j], 'clicked', true)
      this.$set(this.cells[i], j, this.cells[i][j])
      this.$set(this.cells, i, this.cells[i])

      this.checkFinish(i, j)
      this.checkBomb(i, j)
    },
    cellRightClick (i, j) {
      if (this.finish) {
        return
      }

      this.$set(this.cells[i][j], 'rightClicked', !this.cells[i][j].rightClicked)
      this.$set(this.cells[i], j, this.cells[i][j])
      this.$set(this.cells, i, this.cells[i])
    },
    checkFinish (i, j) {
      const finish = this.cells.every(line => line.every(cell => cell.clicked || cell.value === this.bomb))
      if (finish) {
        this.finish = true
        this.victory = true
        clearInterval(this.stopwatchInterval)
        this.stopwatchInterval = null
      }
    },
    checkBomb (i, j) {
      if (this.cells[i][j].value === this.bomb) {
        this.finish = true
        for (let i = 0; i < this.cells.length; i++) {
          for (let j = 0; j < this.cells[i].length; j++) {
            if (this.cells[i][j].value === this.bomb) {
              this.cells[i][j].clicked = true
            }
          }
        }
      }
    },
    discardZeros (i, j) {
      const positions = this.positions(i, j)
      positions.map(position => {
        if (this.cells[position[0]] && this.cells[position[0]][position[1]] && !this.cells[position[0]][position[1]].clicked) {
          this.cells[position[0]][position[1]].clicked = true
          if (this.cells[position[0]][position[1]].value === 0) {
            this.discardZeros(position[0], position[1])
          }
        }
      })
    },
    positions (i, j) {
      return [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1], [i, j - 1], [i, j + 1], [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]]
    }
  },
  components: {
    Modal
  }
}
</script>
<style scoped>
.field {
  display: flex;
  flex-direction: column;
}
.line {
  display: flex;
}
.cell {
  width: 50px;
  height: 50px;
}
@supports (display: grid) {
  .field {
    display: grid;
  }
  .line {
    display: contents;
  }
  .cell {
    width: auto;
    height: auto;
  }
}
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #fff;
  background-color: #134E5E;
  border: 1px solid #c5c5c5;
  border-radius: 5px;
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
}
.cell:not(.bomb):not(.opened):hover {
  opacity: 0.6;
}
.bomb, .flag {
  position: relative;
}
.bomb:after, .flag:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: cover;
}
.bomb:after {
  background-image: url('../assets/bomb.svg')
}
.flag:after {
  background-image: url('../assets/flag.svg')
}
.opened {
  background-color: #71B280;
}
</style>
