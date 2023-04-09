<template>
  <div>
    <h1>Score: {{ score }}</h1>
    <div class="game">
      <div class="field">
        <div class="line" v-for="(line, id) in cells" :key="id">
          <div
            class="cell"
            v-for="(cell, idx) in line"
            :key="id + '' + idx"
            :style="[CellValue.Intersect, CellValue.Set].includes(cell.value) ?
              `background-color: ${lightenColor(cell.color)}; border: 1px solid ${cell.color}`:
              ''"
          />
        </div>
      </div>
      <div class="next_model">
        <div class="line" v-for="line in 3" :key="line">
          <div
            class="cell"
            v-for="cell in 4"
            :key="`${line}_${cell}`"
            :style="checkNext(line - 1, cell - 1)
              ? `background-color: ${lightenColor(nextModel.color)}; border: 1px solid ${nextModel.color}`
              : ''
            "
          ></div>
        </div>
      </div>
    </div>
    <Modal v-if="lose" :result="score" @restart="initData" />
  </div>
</template>

<script setup lang="ts">
// TODO: debug Tetris, it does not work correctly
import { computed, onUnmounted, ref } from 'vue'
import { Cells, CellValue, Models, RandomModel } from '../types/tetris'
import getRandomColor from '../utils/getRandomColor'
import getRandomNumber from '../utils/getRandomNumber'
import lightenColor from '../utils/lightenColor'
import randomizeModel from '../utils/tetris/randomizeModel'
import rotateModel from '../utils/tetris/rotateModel'
import Modal from '../components/Modal.vue'

const props = defineProps<{
  options: {
    size: Array<number>,
    arrowCodes: Array<number>,
  },
}>()

const cells = ref<Cells>([])
const currentModel = ref<RandomModel>(buildModel())
const nextModel = ref<RandomModel>(buildModel())
const score = ref(0)
const timeout = ref<undefined | ReturnType<typeof setTimeout>>(undefined)
const lose = ref(false)
const stepTime = ref(500)
const stepInterval = ref<undefined | ReturnType<typeof setInterval>>(undefined)
const xDown = ref<number | null>(null)
const yDown = ref<number | null>(null)
const startTime = ref(0)
const endTime = ref(0)
const spentTime = computed(() => Number((endTime.value - startTime.value) / 1000))

function initData() {
  cells.value = new Array(props.options.size[0]).fill(0).map(() => (
    new Array(props.options.size[1]).fill(0).map(() => ({ value: CellValue.Unset }))
  ))
  score.value = 0
  stepTime.value = 500
  lose.value = false
  startTime.value = 0
  endTime.value = 0

  timeout.value = setTimeout(moveModel, stepTime.value)
  stepInterval.value = setInterval(() => {
    if (stepTime.value > 100) {
      stepTime.value--
    } else {
      clearInterval(stepInterval.value)
    }
  }, 3000)

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('touchstart', onTouchStart)
  window.addEventListener('touchmove', onTouchMove)
}

function getRandomModelType() {
  const values = Object.values(Models)
  const key = values[getRandomNumber(values.length)]
  return Models[key]
}

function buildModel(): RandomModel {
  const type = getRandomModelType()
  return {
    type: type,
    color: getRandomColor(),
    model: randomizeModel(props.options.size[1], type),
  }
}

function buildModels(): boolean {
  currentModel.value = nextModel.value
  nextModel.value = buildModel()

  if (currentModel.value.model?.some(([i, j]) => cells.value[i][j].value === CellValue.Set)) {
    clearTimeout(timeout.value)
    clearInterval(stepInterval.value)
    timeout.value = undefined
    lose.value = true
    removeListeners()

    return true
  }

  return false
}

function onKeyDown(e: KeyboardEvent) {
  switch (e.keyCode) {
    // Left arrow
    case props.options.arrowCodes[0]:
      leftMovement()
      break
    // Up arrow
    case props.options.arrowCodes[1]:
      upMovement()
      break
    // Right arrow
    case props.options.arrowCodes[2]:
      rightMovement()
      break
    // Down arrow
    case props.options.arrowCodes[3]:
      downMovement()
      break
    default:
      return
  }

  checkIntersection()
}

function checkIntersection() {
  for (let i = 0; i < cells.value.length; i++) {
    for (let j = 0; j < cells.value[i].length; j++) {
      if (cells.value[i][j].value !== CellValue.Set) {
        cells.value[i][j].value = CellValue.Unset
      }
    }
  }

  currentModel.value.model?.forEach(position => {
    cells.value[position[0]][position[1]] = {
      color: currentModel.value.color,
      value: CellValue.Intersect,
    }
  })
}

function onTouchStart(e: TouchEvent) {
  const firstTouch = e.touches[0]
  xDown.value = firstTouch.clientX
  yDown.value = firstTouch.clientY
}

function onTouchMove(e: TouchEvent) {
  if(!xDown.value || !yDown.value) {
    return
  }

  const xUp = e.touches[0].clientX
  const yUp = e.touches[0].clientY
  const xDiff = xDown.value - xUp
  const yDiff = yDown.value - yUp

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      leftMovement()
    } else {
      rightMovement()
    }
  } else {
    if (yDiff > 0) {
      upMovement()
    } else {
      downMovement()
    }
  }

  xDown.value = null
  yDown.value = null
}

function leftMovement() {
  if (currentModel.value.model?.every(item => (item[1] > 0 && cells.value[item[0]][item[1] - 1].value !== CellValue.Set))) {
    currentModel.value.model.forEach(item => {
      item[1]--
    })
  }
}

function rightMovement() {
  if (currentModel.value.model?.every(item => (item[1] < props.options.size[1] - 1 &&
    cells.value[item[0]][item[1] + 1].value !== CellValue.Set))) {
    currentModel.value.model.forEach(item => {
      item[1]++
    })
  }
}

function upMovement() {
  if(!currentModel.value.type || !currentModel.value.model) {
    return
  }

  const { type, model, rotated } = currentModel.value
  const rotatedModel = rotateModel(type, model, rotated)

  if (rotatedModel) {
    if (rotatedModel.rotatedModel.some(item => item[1] < 0)) {
      rotatedModel.rotatedModel.map(item => ++item[1])
    } else if (rotatedModel.rotatedModel.some(item => item[1] > props.options.size[1] - 1)) {
      rotatedModel.rotatedModel.map(item => --item[1])
    } else if (rotatedModel.rotatedModel.some(item => item[0] < 0)) {
      rotatedModel.rotatedModel.map(item => ++item[0])
    }

    if (rotatedModel.rotatedModel.some(item => cells.value[item[0]]?.[item[1]]?.value === CellValue.Set)) {
      return
    }

    currentModel.value.model = rotatedModel.rotatedModel
    currentModel.value.rotated = rotatedModel.rotatedStatus
  }
}

function downMovement () {
  if (currentModel.value.model?.some(item => (item[0] === props.options.size[0] - 1 ||
    cells.value[item[0] + 1][item[1]].value === CellValue.Set))) {
    setModel()
    buildModels()
    return
  }

  currentModel.value.model?.forEach(item => {
    item[0]++
  })
}

function moveModel() {
  let finishMovement = false
  let finishGame = false

  for (let i = 0; i < (currentModel.value.model?.length || 0); i++) {
    const [modelI, modelJ] = currentModel.value.model?.[i] || []
    if (modelI === props.options.size[0] - 1 || cells.value[modelI + 1]?.[modelJ].value === CellValue.Set) {
      setModel()
      finishGame = buildModels()
      finishMovement = true
      break
    }
  }

  if (!finishMovement) {
    currentModel.value.model?.forEach(item => {
      item[0]++
    })
  }

  if (!finishGame) {
    checkIntersection()
    timeout.value = setTimeout(moveModel, stepTime.value)
  }
}

function setModel() {
  currentModel.value.model?.forEach(position => {
    cells.value[position[0]][position[1]] = {
      color: currentModel.value.color,
      value: CellValue.Set,
    }
  })

  checkFullLine()
}

function checkFullLine() {
  let lines = 0
  cells.value.forEach((row, idx) => {
    if (row.every(cell => cell.value === CellValue.Set)) {
      for (let i = idx; i > 0; i--) {
        for (let j = 0; j < cells.value[i].length; j++) {
          cells.value[i][j].value = cells.value[i - 1][j].value
        }
      }

      lines++
    }
  })

  if (lines) {
    score.value += lines ** 2
  }
}

function checkNext(i: number, j: number) {
  return nextModel.value.model?.some(item => item[0] === i && item[1] === j + (props.options.size[1] / 2 - 2))
}

function removeListeners() {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchmove', onTouchMove)
}

onUnmounted(() => removeListeners())

initData()
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
