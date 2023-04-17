<template>
  <div>
    <h1>Score: {{ score }}</h1>
    <div class="field">
      <div
        v-for="(line, id) in cells"
        :key="id"
        class="line"
      >
        <div
          v-for="(cell, idx) in line"
          :key="id + '' + idx"
          class="cell"
          :style="`background-color: ${ cellBackgroundColor(cell.value) }; color: ${ cellColor(cell.value) }`"
        >
          {{ cell.value }}
        </div>
      </div>
    </div>
    <Modal
      v-if="finish"
      :result="score"
      @restart="initData"
    />
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { Cells } from 'types/numbers'
import cellBackgroundColor from 'utils/cellBackgroundColor'
import cellColor from 'utils/cellColor'
import getRandomNumber from 'utils/getRandomNumber'
import Modal from 'components/Modal.vue'

const props = defineProps<{
  options: {
    size: number,
    arrowCodes: Array<number>,
    startNumbersCount: number,
  },
}>()

const cells = ref<Cells>([])
const cellChanged = ref(false)
const finish = ref(false)
const score = ref(0)

function initData() {
  cells.value = new Array(props.options.size).fill(0).map(() => (
    new Array(props.options.size).fill(0).map(() => ({ value: null }))
  ))
  cellChanged.value = false
  finish.value = false
  score.value = 0

  for (let i = 0; i < props.options.startNumbersCount; i++) {
    addRandomCell()
  }
}

function addRandomCell() {
  const position = [getRandomNumber(props.options.size), getRandomNumber(props.options.size)]
  if (!cells.value[position[0]][position[1]].value) {
    cells.value[position[0]][position[1]].value = Math.random() > 0.95 ? 4 : 2
  } else {
    addRandomCell()
  }
}

function onKeyDown(e: KeyboardEvent) {
  cellChanged.value = false
  switch(e.keyCode) {
    case props.options.arrowCodes[0]:
      moveCellsLeft()
      break
    case props.options.arrowCodes[1]:
      moveCellsUp()
      break
    case props.options.arrowCodes[2]:
      moveCellsRight()
      break
    case props.options.arrowCodes[3]:
      moveCellsDown()
      break
    default:
      return
  }

  finish.value = cells.value.every(row => row.every(cell => cell.value))
  if (finish.value) {
    return
  }

  if (cellChanged.value) {
    addRandomCell()
  }
}

function moveCellsLeft() {
  for (let i = 0; i < props.options.size; i++) {
    for (let j = 0; j < props.options.size - 1; j++) {
      for (let k = j + 1; k < props.options.size; k++) {
        if(checkCells([i, j], [i, k])) {
          break
        }
      }
    }
  }
}

function moveCellsUp() {
  for (let j = 0; j < props.options.size; j++) {
    for (let i = 0; i < props.options.size - 1; i++) {
      for (let k = i + 1; k < props.options.size; k++) {
        if (checkCells([i, j], [k, j])) {
          break
        }
      }
    }
  }
}

function moveCellsRight() {
  for (let i = 0; i < props.options.size; i++) {
    for (let j = props.options.size - 1; j > 0; j--) {
      for (let k = j - 1; k >= 0; k--) {
        if (checkCells([i, j], [i, k])) {
          break
        }
      }
    }
  }
}

function moveCellsDown() {
  for (let j = 0; j < props.options.size; j++) {
    for (let i = props.options.size - 1; i > 0; i--) {
      for (let k = i - 1; k >= 0; k--) {
        if (checkCells([i, j], [k, j])) {
          break
        }
      }
    }
  }
}

function checkCells(position1: Array<number>, position2: Array<number>): boolean {
  const cell1 = cells.value[position1[0]][position1[1]]
  const cell2 = cells.value[position2[0]][position2[1]]
  if (!cell1.value && cell2.value) {
    cell1.value = cell2.value
    cell2.value = null
    cellChanged.value = true
    return false
  }

  if (cell1.value && cell1.value === cell2.value) {
    cell1.value *= 2
    cell2.value = null
    cellChanged.value = true
    score.value += cell1.value
    return true
  }

  return !!(cell1.value && cell2.value)
}

window.addEventListener('keydown', onKeyDown)

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})

initData()
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
