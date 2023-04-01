import { Model, Models } from '../../types/tetris'

export default function randomizeModel(size: number, fixedRandom: Models): Model | null {
  switch (fixedRandom) {
    case Models.I:
      return [
        [0, Math.floor(size / 2) - 2],
        [0, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2)],
        [0, Math.floor(size / 2) + 1]
      ]
    case Models.O:
      return [
        [1, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2)],
        [1, Math.floor(size / 2)]
      ]
    case Models.T:
      return [
        [1, Math.floor(size / 2) - 2],
        [1, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2) - 1],
        [1, Math.floor(size / 2)]
      ]
    case Models.S:
      return [
        [1, Math.floor(size / 2) - 2],
        [1, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2)]
      ]
    case Models.Z:
      return [
        [0, Math.floor(size / 2) - 2],
        [0, Math.floor(size / 2) - 1],
        [1, Math.floor(size / 2) - 1],
        [1, Math.floor(size / 2)]
      ]
    case Models.J:
      return [
        [2, Math.floor(size / 2) - 1],
        [1, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2) - 1],
        [0, Math.floor(size / 2)]
      ]
    case Models.L:
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
