<template>
  <div>
    <div
      ref="field"
      class="field"
    >
      <div
        v-for="(line, id) in cells"
        :key="id"
        class="line"
      >
        <div
          v-for="(cell, idx) in line"
          :key="id + '' + idx"
          class="cell"
          :class="cell || ''"
        />
      </div>
    </div>
    <LoseModal
      v-if="lose"
      @restart="initData"
    />
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { Cells, Snake } from 'types/snake'
import getRandomNumber from 'utils/getRandomNumber'
import LoseModal from 'components/LoseModal.vue'

const props = defineProps<{
  options: {
    size: number,
    arrowCodes: Array<number>,
  }
}>()
const cells = ref<Cells>([])
const snake = ref<Snake>([])
const code = ref(0)
const bonus = ref<Array<number>>([])
const arrowPressed = ref(false)
const lose = ref(false)
const xDown = ref<number | null>(0)
const yDown = ref<number | null>(null)

function initData() {
  cells.value = new Array(props.options.size).fill(0).map(() => new Array(props.options.size).fill(0))
  code.value = Math.floor(Math.random() * (props.options.arrowCodes[3] - props.options.arrowCodes[0] + 1) + props.options.arrowCodes[0])
  arrowPressed.value = false
  lose.value = false
  setSnake()
  setBonus()
  checkIntersection()
  moveSnake()
}

function setSnake() {
  const position = [getRandomNumber(props.options.size), getRandomNumber(props.options.size)]

  if (position[0] < 2 || position[0] > props.options.size - 4 || position[1] < 2 || position[1] > props.options.size - 4) {
    setSnake()
  } else {
    const newSnake = [position]
    switch (code.value) {
      case props.options.arrowCodes[0]:
        newSnake.push([position[0], position[1] + 1])
        newSnake.push([position[0], position[1] + 2])
        break
      case props.options.arrowCodes[1]:
        newSnake.push([position[0] + 1, position[1]])
        newSnake.push([position[0] + 2, position[1]])
        break
      case props.options.arrowCodes[2]:
        newSnake.push([position[0], position[1] - 1])
        newSnake.push([position[0], position[1] - 2])
        break
      case props.options.arrowCodes[3]:
        newSnake.push([position[0] - 1, position[1]])
        newSnake.push([position[0] - 2, position[1]])
        break
    }

    snake.value = newSnake
  }
}

function setBonus() {
  const position = [getRandomNumber(props.options.size), getRandomNumber(props.options.size)]

  if (snake.value.some(item => item[0] === position[0] && item[1] === position[1])) {
    setBonus()
  } else {
    bonus.value = [...position]
    cells.value[position[0]][position[1]] = 'bonus'
  }
}

function checkIntersection() {
  for (let i = 0; i < cells.value.length; i++) {
    for (let j = 0; j < cells.value[i].length; j++) {
      if (cells.value[i][j] !== 'bonus') {
        cells.value[i][j] = 0
      }
    }
  }

  snake.value.map((position, idx) => {
    cells.value[position[0]][position[1]] = idx === 0 ? 'full cell--first' : 'full'
  })
}

function setTimeOut() {
  setTimeout(() => {
    moveSnake()
  }, 150)
}

function moveSnake() {
  const lastPos = snake.value[snake.value.length - 1]

  for (let i = snake.value.length - 1; i >= 0; i--) {
    if (i === 0) {
      switch (code.value) {
        case props.options.arrowCodes[0]:
          if (snake.value[0][1] === 0) {
            snake.value[0][1] = props.options.size - 1
          } else {
            snake.value[0][1]--
          }
          break
        case props.options.arrowCodes[1]:
          if (snake.value[0][0] === 0) {
            snake.value[0][0] = props.options.size - 1
          } else {
            snake.value[0][0]--
          }
          break
        case props.options.arrowCodes[2]:
          if (snake.value[0][1] === props.options.size - 1) {
            snake.value[0][1] = 0
          } else {
            snake.value[0][1]++
          }
          break
        case props.options.arrowCodes[3]:
          if (snake.value[0][0] === props.options.size - 1) {
            snake.value[0][0] = 0
          } else {
            snake.value[0][0]++
          }
      }
    } else {
      snake.value[i][0] = snake.value[i - 1][0]
      snake.value[i][1] = snake.value[i - 1][1]
    }
  }

  if (snake.value[0][0] === bonus.value[0] && snake.value[0][1] === bonus.value[1]) {
    snake.value.push([
      lastPos[0],
      lastPos[1],
    ])

    if (snake.value.length === props.options.size ** 2) {
      lose.value = true
    } else {
      setBonus()
    }
  }

  if (snake.value.some((item, idx) => idx && item[0] === snake.value[0][0] && item[1] === snake.value[0][1])) {
    lose.value = true
    return
  }

  checkIntersection()
  setTimeOut()
  arrowPressed.value = false
}

function onKeyDown(e: KeyboardEvent) {
  const keyCode = e.keyCode
  // The number 2 is the difference between two opposite arrows
  if (code.value === keyCode || code.value === keyCode + 2 || code.value === keyCode - 2 ||
    arrowPressed.value || !props.options.arrowCodes.includes(keyCode)) {
    return
  }

  arrowPressed.value = true
  code.value = keyCode
  checkIntersection()
}

function handleTouchStart (e: TouchEvent) {
  const firstTouch = e.touches[0]
  xDown.value = firstTouch.clientX
  yDown.value = firstTouch.clientY
}

function handleTouchMove (e: TouchEvent) {
  if (!xDown.value || !yDown.value) {
    return
  }

  const xUp = e.touches[0].clientX
  const yUp = e.touches[0].clientY

  const xDiff = xDown.value - xUp
  const yDiff = yDown.value - yUp

  if (Math.abs(xDiff) > Math.abs(yDiff) && code.value !== props.options.arrowCodes[0] && code.value !== props.options.arrowCodes[2]) {
    if (xDiff > 0) {
      code.value = props.options.arrowCodes[0]
    } else {
      code.value = props.options.arrowCodes[2]
    }
  } else if (code.value !== props.options.arrowCodes[1] && code.value !== props.options.arrowCodes[3]) {
    if (yDiff > 0) {
      code.value = props.options.arrowCodes[1]
    } else {
      code.value = props.options.arrowCodes[3]
    }
  }

  arrowPressed.value = true
  checkIntersection()
  xDown.value = null
  yDown.value = null
}

window.addEventListener('keydown', onKeyDown)
window.addEventListener('touchstart', handleTouchStart)
window.addEventListener('touchmove', handleTouchMove)

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove', handleTouchMove)
})

initData()
</script>

<style scoped lang="scss">
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
  min-width: 14px;
  height: 3vw;
  max-height: 30px;
  min-height: 14px;
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

.cell--first {
  &::before {
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
  &::after {
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
}
</style>
