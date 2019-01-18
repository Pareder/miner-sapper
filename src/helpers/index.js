const rotateModel = (randomModel, rotatedModel, rotatedStatus) => {
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
      rotatedModel = rotateSeventhModel(rotatedModel, rotatedStatus, rotatedStatus)
      break
    default:
      return false
  }
  return rotatedModel
}

const rotateFirstModel = (rotatedModel, rotatedStatus) => {
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

const rotateThirdModel = (rotatedModel, rotatedStatus) => {
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

const rotateFourthModel = (rotatedModel, rotatedStatus) => {
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

const rotateFifthModel = (rotatedModel, rotatedStatus) => {
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

const rotateSixthModel = (rotatedModel, rotatedStatus) => {
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

const rotateSeventhModel = (rotatedModel, rotatedStatus) => {
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

export default rotateModel
