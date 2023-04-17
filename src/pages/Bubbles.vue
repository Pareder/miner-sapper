<template>
  <div>
    <h1>Score: <span>{{ score }}</span></h1>
    <transition-group
      name="bounce"
      tag="div"
      class="field"
      :style="{
        '--grid-size': props.options.size
      }"
    >
      <template v-for="(row, x) in cells">
        <template v-for="(cell, y) in row">
          <div
            v-if="!cell"
            :key="`${x}-${y}`"
            class="cell transparent"
            :style="{
              'grid-column': `${x + 1} / span 1`,
              'grid-row': `${y + 1} / span 1`
            }"
          />
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
          />
        </template>
      </template>
    </transition-group>
    <Modal
      v-if="finish"
      :result="score"
      @restart="initData"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Cells } from 'types/bubbles'
import getPositions from 'utils/bubbles/getPositions'
import getRandomNumber from 'utils/getRandomNumber'
import randomString from 'utils/randomString'
import Modal from 'components/Modal.vue'

const props = defineProps<{
  options: {
    size: number,
    colors: Array<string>,
  },
}>()

const cells = ref<Cells>([])
const score = ref(0)
const finish = ref(false)
const highlightedCellsCount = computed(() => cells.value
  .map(row => row.filter(cell => cell?.highlight))
  .flat()
  .length,
)

function initData() {
  cells.value = new Array(props.options.size).fill(0).map(() => (
    new Array(props.options.size).fill(0).map(() => ({
      id: randomString(16),
      color: props.options.colors[getRandomNumber(props.options.colors.length)],
      highlight: false,
    }))
  ))
  finish.value = false
  score.value = 0
}

function onCellClick() {
  if (highlightedCellsCount.value < 2) {
    return
  }

  score.value += 2 * highlightedCellsCount.value * Math.ceil(highlightedCellsCount.value / 10)

  for (let i = 0; i < props.options.size; i++) {
    let offset = 0
    for (let j = props.options.size - 1; j >= 0;) {
      if (cells.value[i][j]?.highlight) {
        for (let k = j - 1; k >= 0; k--) {
          cells.value[i][k + 1] = cells.value[i][k]
        }

        cells.value[i][offset] = null
        offset++
      } else {
        j--
      }
    }
  }

  checkColumn()
  checkFinish()
}

function checkColumn() {
  for (let i = 0; i < cells.value.length; i++) {
    if (cells.value[i].some(Boolean)) {
      continue
    }

    moveColumn(i)
  }
}

function moveColumn(index: number) {
  for (let i =  index; i > 0; i--) {
    cells.value[i] = cells.value[i - 1]
  }

  cells.value[0] = new Array(props.options.size).fill(null)
}

function checkFinish() {
  for (let i = 0; i < cells.value.length; i++) {
    for (let j = 0; j < cells.value[i].length; j++) {
      const positions = getPositions(i, j)
      const notFinished = positions.some(position => (
        cells.value[position[0]]?.[position[1]]?.color === cells.value[i][j]?.color && cells.value[i][j] !== null
      ))

      if (notFinished) {
        return
      }
    }
  }

  finish.value = true
}

function onCellMouseOver(i: number, j: number) {
  const cell = cells.value[i][j]
  if(!cell || cell.highlight) {
    return
  }

  removeHighlight()
  highlightCells(i, j)
}

function removeHighlight() {
  cells.value.forEach(row => {
    row.forEach(cell => {
      if (cell) {
        cell.highlight = false
      }
    })
  })
}

function highlightCells(i: number, j: number) {
  const positions = getPositions(i, j)
  positions.forEach(position => {
    const cell = cells.value[position[0]]?.[position[1]]
    if(!cell) {
      return
    }

    if (!cell.highlight && cell.color === cells.value?.[i]?.[j]?.color) {
      cell.highlight = true
      highlightCells(position[0], position[1])
    }
  })
}

initData()
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
