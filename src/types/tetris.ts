// For more details https://tetris.wiki/Tetromino
export enum Models {
  I = 1,
  O = 2,
  T = 3,
  S = 4,
  Z = 5,
  J = 6,
  L = 7,
}

export enum RotatedStatuses {
  UP = 1,
  DOWN = 2,
  LEFT = 3,
  RIGHT = 4,
}

export type Model = Array<Array<number>>

export type RotatedModel = {
  rotatedModel: Model,
  rotatedStatus: RotatedStatuses,
}
