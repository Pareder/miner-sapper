import { describe, expect, test } from 'vitest'
import { Models, RotatedStatuses } from 'types/tetris'
import rotateModel from '../rotateModel'

describe('rotateModel method', () => {
  test.each([
    [
      Models.I,
      RotatedStatuses.UP,
      [
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
      ],
      {
        rotatedModel: [
          [2, 5],
          [1, 5],
          [0, 5],
          [-1, 5],
        ],
        rotatedStatus: RotatedStatuses.DOWN,
      },
    ],
    [
      Models.I,
      RotatedStatuses.DOWN,
      [
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
      ],
      {
        rotatedModel: [
          [-2, 1],
          [-1, 3],
          [0, 5],
          [1, 7],
        ],
        rotatedStatus: RotatedStatuses.UP,
      },
    ],
    [
      Models.O,
      RotatedStatuses.UP,
      [
        [1, 4],
        [0, 4],
        [0, 5],
        [1, 5],
      ],
      {
        rotatedModel: [
          [1, 4],
          [0, 4],
          [0, 5],
          [1, 5],
        ],
        rotatedStatus: RotatedStatuses.UP,
      },
    ],
    [
      Models.T,
      RotatedStatuses.UP,
      [
        [1, 3],
        [1, 4],
        [0, 4],
        [1, 5],
      ],
      {
        rotatedModel: [
          [0, 4],
          [1, 4],
          [1, 5],
          [2, 4],
        ],
        rotatedStatus: RotatedStatuses.RIGHT,
      },
    ],
    [
      Models.T,
      RotatedStatuses.RIGHT,
      [
        [1, 3],
        [1, 4],
        [0, 4],
        [1, 5],
      ],
      {
        rotatedModel: [
          [2, 2],
          [1, 4],
          [1, 3],
          [0, 6],
        ],
        rotatedStatus: RotatedStatuses.DOWN,
      },
    ],
    [
      Models.T,
      RotatedStatuses.DOWN,
      [
        [1, 3],
        [1, 4],
        [0, 4],
        [1, 5],
      ],
      {
        rotatedModel: [
          [0, 4],
          [1, 4],
          [-1, 3],
          [2, 4],
        ],
        rotatedStatus: RotatedStatuses.LEFT,
      },
    ],
    [
      Models.T,
      RotatedStatuses.LEFT,
      [
        [1, 3],
        [1, 4],
        [0, 4],
        [1, 5],
      ],
      {
        rotatedModel: [
          [2, 2],
          [1, 4],
          [-1, 5],
          [0, 6],
        ],
        rotatedStatus: RotatedStatuses.UP,
      },
    ],
    [
      Models.S,
      RotatedStatuses.UP,
      [
        [1, 3],
        [1, 4],
        [0, 4],
        [0, 5],
      ],
      {
        rotatedModel: [
          [2, 4],
          [1, 4],
          [1, 3],
          [0, 3],
        ],
        rotatedStatus: RotatedStatuses.DOWN,
      },
    ],
    [
      Models.S,
      RotatedStatuses.DOWN,
      [
        [1, 3],
        [1, 4],
        [0, 4],
        [0, 5],
      ],
      {
        rotatedModel: [
          [0, 2],
          [1, 4],
          [-1, 5],
          [0, 7],
        ],
        rotatedStatus: RotatedStatuses.UP,
      },
    ],
    [
      Models.Z,
      RotatedStatuses.UP,
      [
        [0, 3],
        [0, 4],
        [1, 4],
        [1, 5],
      ],
      {
        rotatedModel: [
          [1, 4],
          [0, 4],
          [0, 5],
          [-1, 5],
        ],
        rotatedStatus: RotatedStatuses.DOWN,
      },
    ],
    [
      Models.Z,
      RotatedStatuses.DOWN,
      [
        [0, 3],
        [0, 4],
        [1, 4],
        [1, 5],
      ],
      {
        rotatedModel: [
          [-1, 2],
          [0, 4],
          [2, 3],
          [3, 5],
        ],
        rotatedStatus: RotatedStatuses.UP,
      },
    ],
    [
      Models.J,
      RotatedStatuses.UP,
      [
        [2, 4],
        [1, 4],
        [0, 4],
        [0, 5],
      ],
      {
        rotatedModel: [
          [1, 3],
          [1, 4],
          [1, 5],
          [2, 5],
        ],
        rotatedStatus: RotatedStatuses.RIGHT,
      },
    ],
    [
      Models.J,
      RotatedStatuses.RIGHT,
      [
        [2, 4],
        [1, 4],
        [0, 4],
        [0, 5],
      ],
      {
        rotatedModel: [
          [1, 5],
          [1, 4],
          [1, 3],
          [0, 3],
        ],
        rotatedStatus: RotatedStatuses.DOWN,
      },
    ],
    [
      Models.J,
      RotatedStatuses.DOWN,
      [
        [2, 4],
        [1, 4],
        [0, 4],
        [0, 5],
      ],
      {
        rotatedModel: [
          [3, 5],
          [1, 4],
          [-1, 3],
          [-2, 5],
        ],
        rotatedStatus: RotatedStatuses.LEFT,
      },
    ],
    [
      Models.J,
      RotatedStatuses.LEFT,
      [
        [2, 4],
        [1, 4],
        [0, 4],
        [0, 5],
      ],
      {
        rotatedModel: [
          [3, 3],
          [1, 4],
          [-1, 5],
          [0, 7],
        ],
        rotatedStatus: RotatedStatuses.UP,
      },
    ],
    [
      Models.L,
      RotatedStatuses.UP,
      [
        [2, 5],
        [1, 5],
        [0, 5],
        [0, 4],
      ],
      {
        rotatedModel: [
          [1, 4],
          [1, 5],
          [1, 6],
          [0, 6],
        ],
        rotatedStatus: RotatedStatuses.RIGHT,
      },
    ],
    [
      Models.L,
      RotatedStatuses.RIGHT,
      [
        [2, 5],
        [1, 5],
        [0, 5],
        [0, 4],
      ],
      {
        rotatedModel: [
          [1, 6],
          [1, 5],
          [1, 4],
          [2, 4],
        ],
        rotatedStatus: RotatedStatuses.DOWN,
      },
    ],
    [
      Models.L,
      RotatedStatuses.DOWN,
      [
        [2, 5],
        [1, 5],
        [0, 5],
        [0, 4],
      ],
      {
        rotatedModel: [
          [3, 6],
          [1, 5],
          [-1, 4],
          [0, 2],
        ],
        rotatedStatus: RotatedStatuses.LEFT,
      },
    ],
    [
      Models.L,
      RotatedStatuses.LEFT,
      [
        [2, 5],
        [1, 5],
        [0, 5],
        [0, 4],
      ],
      {
        rotatedModel: [
          [3, 4],
          [1, 5],
          [-1, 6],
          [-2, 4],
        ],
        rotatedStatus: RotatedStatuses.UP,
      },
    ],
  ])('Should return correct result for model type %p and status %p', (modelType, status, model, result) => {
    expect(rotateModel(modelType, model, status)).toEqual(result)
  })
})
