export const randomizeModel = (size: number, fixedRandom: number): Array<Array<number>> | null => {
  fixedRandom = Number(fixedRandom)

  switch (fixedRandom) {
    // ---- model
    case 1:
      return [
        [0, Math.floor(size / 2) - 2],
        [0, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2)],
        [0, Math.floor(size / 2) + 1]
      ]
    // ▄ model
    case 2:
      return [
        [1, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2)],
        [1, Math.floor(size / 2)]
      ]
    // ┴ model
    case 3:
      return [
        [1, Math.floor(size / 2) - 2],
        [1, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2) - 1],
        [1, Math.floor(size / 2)]
      ]
    // _┌ model
    case 4:
      return [
        [1, Math.floor(size / 2) - 2],
        [1, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2)]
      ]
    // ¬_ model
    case 5:
      return [
        [0, Math.floor(size / 2) - 2],
        [0, Math.floor(size / 2) - 1],
        [1, Math.floor(size / 2) - 1],
        [1, Math.floor(size / 2)]
      ]
    // ┌ model
    case 6:
      return [
        [2, Math.floor(size / 2) - 1],
        [1, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2)]
      ]
    // ┐ model
    case 7:
      return [
        [2, Math.floor(size / 2)],
        [1, Math.floor(size / 2)],
        [0, Math.floor(size / 2)],
        [0, Math.floor(size / 2) - 1]
      ]
    default:
      return null
  }
}

export const rotateModel = (randomModel, model, rotatedStatus) => {
  randomModel = Number(randomModel)
  let rotatedModel = []

  for (let i = 0; i < model.length; i++) {
    rotatedModel[i] = [...model[i]]
  }

  switch (randomModel) {
    // ---- model
    case 1:
      rotatedModel = rotateFirstModel(rotatedModel, rotatedStatus)
      break
    // ┴ model
    case 3:
      rotatedModel = rotateThirdModel(rotatedModel, rotatedStatus)
      break
    // _┌ model
    case 4:
      rotatedModel = rotateFourthModel(rotatedModel, rotatedStatus)
      break
    // ¬_ model
    case 5:
      rotatedModel = rotateFifthModel(rotatedModel, rotatedStatus)
      break
    // ┌ model
    case 6:
      rotatedModel = rotateSixthModel(rotatedModel, rotatedStatus)
      break
    // ┐ model
    case 7:
      rotatedModel = rotateSeventhModel(rotatedModel, rotatedStatus)
      break
    default:
      return false
  }

  return rotatedModel
}

export const rotateFirstModel = (rotatedModel, rotatedStatus) => {
  if (rotatedStatus) {
    rotatedModel[0][0] -= 2
    rotatedModel[0][1] -= 2
    rotatedModel[1][0] -= 1
    rotatedModel[1][1] -= 1
    rotatedModel[3][0] += 1
    rotatedModel[3][1] += 1
    rotatedStatus = false
  } else {
    rotatedModel[0][0] += 2
    rotatedModel[0][1] += 2
    rotatedModel[1][0] += 1
    rotatedModel[1][1] += 1
    rotatedModel[3][0] -= 1
    rotatedModel[3][1] -= 1
    rotatedStatus = true
  }

  return {
    rotatedModel,
    rotatedStatus
  }
}

export const rotateThirdModel = (rotatedModel, rotatedStatus) => {
  if (rotatedStatus === 0) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] += 1
    rotatedModel[3][0] += 1
    rotatedModel[3][1] -= 1
    rotatedStatus = 1
  } else if (rotatedStatus === 1) {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][0] -= 1
    rotatedModel[3][1] += 1
    rotatedStatus = 2
  } else if (rotatedStatus === 2) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][0] += 1
    rotatedModel[3][1] -= 1
    rotatedStatus = 3
  } else if (rotatedStatus === 3) {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] += 1
    rotatedModel[3][0] -= 1
    rotatedModel[3][1] += 1
    rotatedStatus = 0
  }

  return {
    rotatedModel,
    rotatedStatus
  }
}

export const rotateFourthModel = (rotatedModel, rotatedStatus) => {
  if (rotatedStatus) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] += 1
    rotatedModel[3][1] += 2
    rotatedStatus = false
  } else {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][1] -= 2
    rotatedStatus = true
  }

  return {
    rotatedModel,
    rotatedStatus
  }
}

export const rotateFifthModel = (rotatedModel, rotatedStatus) => {
  if (rotatedStatus) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][0] += 2
    rotatedStatus = false
  } else {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] += 1
    rotatedModel[3][0] -= 2
    rotatedStatus = true
  }

  return {
    rotatedModel,
    rotatedStatus
  }
}

export const rotateSixthModel = (rotatedModel, rotatedStatus) => {
  if (rotatedStatus === 0) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] += 1
    rotatedModel[3][0] += 2
    rotatedStatus = 1
  } else if (rotatedStatus === 1) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][1] -= 2
    rotatedStatus = 2
  } else if (rotatedStatus === 2) {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][0] -= 2
    rotatedStatus = 3
  } else if (rotatedStatus === 3) {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] += 1
    rotatedModel[3][1] += 2
    rotatedStatus = 0
  }

  return {
    rotatedModel,
    rotatedStatus
  }
}

export const rotateSeventhModel = (rotatedModel, rotatedStatus) => {
  if (rotatedStatus === 0) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] += 1
    rotatedModel[3][1] += 2
    rotatedStatus = 1
  } else if (rotatedStatus === 1) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][0] += 2
    rotatedStatus = 2
  } else if (rotatedStatus === 2) {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][1] -= 2
    rotatedStatus = 3
  } else if (rotatedStatus === 3) {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] += 1
    rotatedModel[3][0] -= 2
    rotatedStatus = 0
  }

  return {
    rotatedModel,
    rotatedStatus
  }
}

export const getRandomNumber = range => {
  return Math.floor(Math.random() * range)
}

export const getBubblesPositions = (i, j) => {
  return [
    [i - 1, j],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j]
  ]
}

export const getMinerPositions = (i, j) => {
  return [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1]
  ]
}

export const cellBackgroundColor = value => {
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
}

export const cellColor = value => {
  return value < 256 ? '#776E65' : '#fff'
}

export const getRandomColor = () => {
  const bgColor = [113, 178, 128]
  const randomColor = [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  ]

  if (contrast(randomColor, bgColor) < 3) {
    return getRandomColor()
  }

  return `rgb(${randomColor[0]},${randomColor[1]},${randomColor[2]})`
}

export const luminanace = rgb => {
  const a = rgb.map(color => {
    color /= 255
    return color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

export const contrast = (rgb1, rgb2) => {
  const luminanceFirst = luminanace(rgb1) + 0.05
  const luminanceSecond = luminanace(rgb2) + 0.05

  if (luminanceFirst > luminanceSecond) {
    return luminanceFirst / luminanceSecond
  }
  return luminanceSecond / luminanceFirst
}

export const lightenColor = (color, opacity = 0.8) => {
  return `rgba${color.slice(3, -1)}, ${opacity})`
}

export const zeroTime = val => {
  return val > 10 ? val : '0' + val
}

export const formatTime = val => {
  const minutes = Math.floor(val / 60)
  const seconds = (val - minutes * 60).toFixed(2)

  return `${zeroTime(minutes)}:${zeroTime(seconds)}`
}

export const randomString = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * characters.length)]
  }

  return result
}
