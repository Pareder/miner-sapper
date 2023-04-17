import { Model, Models, RotatedModel, RotatedStatuses } from 'types/tetris'

export default function rotateModel(modelType: Models, model: Model, rotatedStatus: RotatedStatuses): RotatedModel {
  const rotatedModel = []
  for (let i = 0; i < model.length; i++) {
    rotatedModel[i] = [...model[i]]
  }

  switch (modelType) {
    case Models.I:
      return rotateIModel(rotatedModel, rotatedStatus)
    case Models.T:
      return rotateTModel(rotatedModel, rotatedStatus)
    case Models.S:
      return rotateSModel(rotatedModel, rotatedStatus)
    case Models.Z:
      return rotateZModel(rotatedModel, rotatedStatus)
    case Models.J:
      return rotateJModel(rotatedModel, rotatedStatus)
    case Models.L:
      return rotateLModel(rotatedModel, rotatedStatus)
    default:
      return {
        rotatedModel,
        rotatedStatus,
      }
  }
}

function rotateIModel(rotatedModel: Model, rotatedStatus: RotatedStatuses): RotatedModel {
  if (rotatedStatus === RotatedStatuses.DOWN) {
    rotatedModel[0][0] -= 2
    rotatedModel[0][1] -= 2
    rotatedModel[1][0] -= 1
    rotatedModel[1][1] -= 1
    rotatedModel[3][0] += 1
    rotatedModel[3][1] += 1
    rotatedStatus = RotatedStatuses.UP
  } else {
    rotatedModel[0][0] += 2
    rotatedModel[0][1] += 2
    rotatedModel[1][0] += 1
    rotatedModel[1][1] += 1
    rotatedModel[3][0] -= 1
    rotatedModel[3][1] -= 1
    rotatedStatus = RotatedStatuses.DOWN
  }

  return {
    rotatedModel,
    rotatedStatus,
  }
}

function rotateTModel(rotatedModel: Model, rotatedStatus: RotatedStatuses): RotatedModel {
  if (rotatedStatus === RotatedStatuses.UP) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] += 1
    rotatedModel[3][0] += 1
    rotatedModel[3][1] -= 1
    rotatedStatus = RotatedStatuses.RIGHT
  } else if (rotatedStatus === RotatedStatuses.RIGHT) {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][0] -= 1
    rotatedModel[3][1] += 1
    rotatedStatus = RotatedStatuses.DOWN
  } else if (rotatedStatus === RotatedStatuses.DOWN) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][0] += 1
    rotatedModel[3][1] -= 1
    rotatedStatus = RotatedStatuses.LEFT
  } else if (rotatedStatus === RotatedStatuses.LEFT) {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] += 1
    rotatedModel[3][0] -= 1
    rotatedModel[3][1] += 1
    rotatedStatus = RotatedStatuses.UP
  }

  return {
    rotatedModel,
    rotatedStatus,
  }
}

function rotateSModel(rotatedModel: Model, rotatedStatus: RotatedStatuses): RotatedModel {
  if (rotatedStatus === RotatedStatuses.DOWN) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] += 1
    rotatedModel[3][1] += 2
    rotatedStatus = RotatedStatuses.UP
  } else {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][1] -= 2
    rotatedStatus = RotatedStatuses.DOWN
  }

  return {
    rotatedModel,
    rotatedStatus,
  }
}

function rotateZModel(rotatedModel: Model, rotatedStatus: RotatedStatuses): RotatedModel {
  if (rotatedStatus === RotatedStatuses.DOWN) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][0] += 2
    rotatedStatus = RotatedStatuses.UP
  } else {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] += 1
    rotatedModel[3][0] -= 2
    rotatedStatus = RotatedStatuses.DOWN
  }

  return {
    rotatedModel,
    rotatedStatus,
  }
}

function rotateJModel(rotatedModel: Model, rotatedStatus: RotatedStatuses): RotatedModel {
  if (rotatedStatus === RotatedStatuses.UP) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] += 1
    rotatedModel[3][0] += 2
    rotatedStatus = RotatedStatuses.RIGHT
  } else if (rotatedStatus === RotatedStatuses.RIGHT) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][1] -= 2
    rotatedStatus = RotatedStatuses.DOWN
  } else if (rotatedStatus === RotatedStatuses.DOWN) {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][0] -= 2
    rotatedStatus = RotatedStatuses.LEFT
  } else if (rotatedStatus === 3) {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] += 1
    rotatedModel[3][1] += 2
    rotatedStatus = RotatedStatuses.UP
  }

  return {
    rotatedModel,
    rotatedStatus,
  }
}

function rotateLModel(rotatedModel: Model, rotatedStatus: RotatedStatuses): RotatedModel {
  if (rotatedStatus === RotatedStatuses.UP) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] += 1
    rotatedModel[3][1] += 2
    rotatedStatus = RotatedStatuses.RIGHT
  } else if (rotatedStatus === RotatedStatuses.RIGHT) {
    rotatedModel[0][0] -= 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] += 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][0] += 2
    rotatedStatus = RotatedStatuses.DOWN
  } else if (rotatedStatus === RotatedStatuses.DOWN) {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] += 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] -= 1
    rotatedModel[3][1] -= 2
    rotatedStatus = RotatedStatuses.LEFT
  } else if (rotatedStatus === RotatedStatuses.LEFT) {
    rotatedModel[0][0] += 1
    rotatedModel[0][1] -= 1
    rotatedModel[2][0] -= 1
    rotatedModel[2][1] += 1
    rotatedModel[3][0] -= 2
    rotatedStatus = RotatedStatuses.UP
  }

  return {
    rotatedModel,
    rotatedStatus,
  }
}
