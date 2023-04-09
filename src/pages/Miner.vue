<template>
  <transition name="fade">
    <div>
      <Modal v-if="victory" :result="spentTime" @restart="initData" />
      <div class="field">
        <div class="row" v-for="(row, id) in cells" :key="id">
          <div
            class="cell"
            v-for="(cell, idx) in row"
            :key="id + '' + idx"
            @click="cellClick(id, idx)"
            @contextmenu.prevent="cellRightClick(id, idx)"
            :class="cell && cell.clicked ?
              (cell.value === bomb ? 'bomb' : 'opened') :
              (cell && cell.rightClicked ? 'flag' : '')"
          >
            <span v-if="cell && cell.clicked && ([bomb, 0].indexOf(cell.value) === -1)">{{ cell.value }}</span>
          </div>
        </div>
      </div>
      <button type="button" class="btn" @click.prevent="initData">Restart</button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Cells } from '../types/miner'
import getPositions from '../utils/miner/getPositions'
import getRandomNumber from '../utils/getRandomNumber'
import Modal from '../components/Modal.vue'

const props = defineProps<{
  options: {
    size: number,
    bombsCount: number,
  },
}>()

const cells = ref<Cells>([])
const finish = ref(false)
const victory = ref(false)
const startTime = ref(0)
const endTime = ref(0)
const spentTime = computed(() => Number((endTime.value - startTime.value) / 1000))
const bomb = 'bomb'

function initData() {
  finish.value = false
  victory.value = false
  startTime.value = 0
  endTime.value = 0
  cells.value = new Array(props.options.size).fill(0).map(() => (
    new Array(props.options.size).fill(0).map(() => ({
      value: 0,
      clicked: false,
      rightClicked: false,
    }))
  ))

  setBombs()
  setNumbers()
}

function setBombs() {
  for (let i = 0; i < props.options.bombsCount; i++) {
    const position = [getRandomNumber(props.options.size), getRandomNumber(props.options.size)]
    if (cells.value[position[0]][position[1]].value === bomb) {
      i--
      continue
    }

    cells.value[position[0]][position[1]].value = bomb
  }
}

function setNumbers() {
  for (let i = 0; i < cells.value.length; i++) {
    for (let j = 0; j < cells.value[i].length; j++) {
      if (cells.value[i][j].value !== bomb) {
        cells.value[i][j].value = checkBombs(i, j)
      }
    }
  }
}

function checkBombs(i: number, j: number): number {
  const positions = getPositions(i, j)
  return positions.reduce((acc, position) => {
    if (cells.value[position[0]]?.[position[1]]?.value === bomb) {
      acc += 1
    }

    return acc
  }, 0)
}

function cellClick (i: number, j: number) {
  const cell = cells.value[i][j]
  if (!startTime.value) {
    startTime.value = Date.now()
  }

  if (finish.value || cell.clicked) {
    return
  }

  if(cell.value === 0) {
    discardZeros(i, j)
  }

  cell.clicked = true
  checkFinish()
  checkBomb(i, j)
}

function cellRightClick(i: number, j: number) {
  if (finish.value) {
    return
  }

  cells.value[i][j].rightClicked = !cells.value[i][j].rightClicked
}

function checkFinish() {
  if(!cells.value.every(row => row.every(cell => cell.clicked || cell.value === bomb))) {
    return
  }

  endTime.value = Date.now()
  finish.value = true
  victory.value = true
}

function checkBomb(i: number, j: number) {
  const cell = cells.value[i][j]
  if(cell.value !== bomb) {
    return
  }

  finish.value = true
  for (let i = 0; i < cells.value.length; i++) {
    for (let j = 0; j < cells.value[i].length; j++) {
      if (cells.value[i][j].value === bomb) {
        cells.value[i][j].clicked = true
      }
    }
  }
}

function discardZeros(i: number, j: number) {
  const positions = getPositions(i, j)
  positions.forEach(position => {
    if (cells.value[position[0]]?.[position[1]] && !cells.value[position[0]]?.[position[1]]?.clicked) {
      cells.value[position[0]][position[1]].clicked = true
      if (cells.value[position[0]][position[1]].value === 0) {
        discardZeros(position[0], position[1])
      }
    }
  })
}

initData()
</script>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
}

.cell {
  width: 50px;
  height: 50px;
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
  &:not(.bomb):not(.opened):hover {
    opacity: 0.6;
  }
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
