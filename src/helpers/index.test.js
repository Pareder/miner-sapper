import * as helpers from '../helpers'

const sizeMock = 10
const expectedModelResult = {
  1: {
    model: [
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6]
    ],
    rotatedModels: [
      {
        defaultStatus: true,
        rotatedModel: [
          [-2, 1],
          [-1, 3],
          [0, 5],
          [1, 7]
        ],
        rotatedStatus: false
      },
      {
        defaultStatus: false,
        rotatedModel: [
          [2, 5],
          [1, 5],
          [0, 5],
          [-1, 5]
        ],
        rotatedStatus: true
      }
    ]
  },
  2: {
    model: [
      [1, 4],
      [0, 4],
      [0, 5],
      [1, 5]
    ]
  },
  3: {
    model: [
      [1, 3],
      [1, 4],
      [0, 4],
      [1, 5]
    ],
    rotatedModels: [
      {
        defaultStatus: 0,
        rotatedModel: [
          [0, 4],
          [1, 4],
          [1, 5],
          [2, 4]
        ],
        rotatedStatus: 1
      },
      {
        defaultStatus: 1,
        rotatedModel: [
          [2, 2],
          [1, 4],
          [1, 3],
          [0, 6]
        ],
        rotatedStatus: 2
      },
      {
        defaultStatus: 2,
        rotatedModel: [
          [0, 4],
          [1, 4],
          [-1, 3],
          [2, 4]
        ],
        rotatedStatus: 3
      },
      {
        defaultStatus: 3,
        rotatedModel: [
          [2, 2],
          [1, 4],
          [-1, 5],
          [0, 6]
        ],
        rotatedStatus: 0
      }
    ]
  },
  4: {
    model: [
      [1, 3],
      [1, 4],
      [0, 4],
      [0, 5]
    ],
    rotatedModels: [
      {
        defaultStatus: true,
        rotatedModel: [
          [0, 2],
          [1, 4],
          [-1, 5],
          [0, 7]
        ],
        rotatedStatus: false
      },
      {
        defaultStatus: false,
        rotatedModel: [
          [2, 4],
          [1, 4],
          [1, 3],
          [0, 3]
        ],
        rotatedStatus: true
      }
    ]
  },
  5: {
    model: [
      [0, 3],
      [0, 4],
      [1, 4],
      [1, 5]
    ],
    rotatedModels: [
      {
        defaultStatus: true,
        rotatedModel: [
          [-1, 2],
          [0, 4],
          [2, 3],
          [3, 5]
        ],
        rotatedStatus: false
      },
      {
        defaultStatus: false,
        rotatedModel: [
          [1, 4],
          [0, 4],
          [0, 5],
          [-1, 5]
        ],
        rotatedStatus: true
      }
    ]
  },
  6: {
    model: [
      [2, 4],
      [1, 4],
      [0, 4],
      [0, 5]
    ],
    rotatedModels: [
      {
        defaultStatus: 0,
        rotatedModel: [
          [1, 3],
          [1, 4],
          [1, 5],
          [2, 5]
        ],
        rotatedStatus: 1
      },
      {
        defaultStatus: 1,
        rotatedModel: [
          [1, 5],
          [1, 4],
          [1, 3],
          [0, 3]
        ],
        rotatedStatus: 2
      },
      {
        defaultStatus: 2,
        rotatedModel: [
          [3, 5],
          [1, 4],
          [-1, 3],
          [-2, 5]
        ],
        rotatedStatus: 3
      },
      {
        defaultStatus: 3,
        rotatedModel: [
          [3, 3],
          [1, 4],
          [-1, 5],
          [0, 7]
        ],
        rotatedStatus: 0
      }
    ]
  },
  7: {
    model: [
      [2, 5],
      [1, 5],
      [0, 5],
      [0, 4]
    ],
    rotatedModels: [
      {
        defaultStatus: 0,
        rotatedModel: [
          [1, 4],
          [1, 5],
          [1, 6],
          [0, 6]
        ],
        rotatedStatus: 1
      },
      {
        defaultStatus: 1,
        rotatedModel: [
          [1, 6],
          [1, 5],
          [1, 4],
          [2, 4]
        ],
        rotatedStatus: 2
      },
      {
        defaultStatus: 2,
        rotatedModel: [
          [3, 6],
          [1, 5],
          [-1, 4],
          [0, 2]
        ],
        rotatedStatus: 3
      },
      {
        defaultStatus: 3,
        rotatedModel: [
          [3, 4],
          [1, 5],
          [-1, 6],
          [-2, 4]
        ],
        rotatedStatus: 0
      }
    ]
  }
}

describe('helpers', () => {
  describe('randomizeModel method', () => {
    for (const model of Object.keys(expectedModelResult)) {
      it(`Should return expected result for model ${model}`, () => {
        expect(helpers.randomizeModel(sizeMock, model)).toEqual(expectedModelResult[model].model)
      })
    }
  })

  describe('rotateModel method', () => {
    for (const model of Object.keys(expectedModelResult)) {
      if (expectedModelResult[model].rotatedModels) {
        for (const rotatedModel of expectedModelResult[model].rotatedModels) {
          it(`Should return expected result for model ${model} with status ${rotatedModel.defaultStatus}`, () => {
            expect(helpers.rotateModel(model, expectedModelResult[model].model, rotatedModel.defaultStatus)).toEqual({
              rotatedModel: rotatedModel.rotatedModel,
              rotatedStatus: rotatedModel.rotatedStatus
            })
          })
        }
      }
    }
  })

  describe('getRandomNumber method', () => {
    it('Should return number less than provided or equal', () => {
      const range = 10

      expect(helpers.getRandomNumber(range)).toBeLessThanOrEqual(range)
    })
  })

  describe('getBubblesPositions method', () => {
    it('Should return correct result', () => {
      const firstPosition = 1
      const secondPosition = 1

      expect(helpers.getBubblesPositions(firstPosition, secondPosition)).toEqual([
        [0, 1],
        [1, 0],
        [1, 2],
        [2, 1]
      ])
    })
  })

  describe('getMinerPositions method', () => {
    it('Should return correct result', () => {
      const firstPosition = 1
      const secondPosition = 1

      expect(helpers.getMinerPositions(firstPosition, secondPosition)).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2]
      ])
    })
  })

  describe('cellBackgroundColor method', () => {
    const backgroundColors = [
      {
        value: 2,
        color: '#e2efe5'
      },
      {
        value: 4,
        color: '#d4e7d8'
      },
      {
        value: 8,
        color: '#c6e0cc'
      },
      {
        value: 16,
        color: '#b8d8bf'
      },
      {
        value: 32,
        color: '#a9d0b2'
      },
      {
        value: 64,
        color: '#9bc9a6'
      },
      {
        value: 128,
        color: '#8dc199'
      },
      {
        value: 256,
        color: '#7fb98c'
      },
      {
        value: 512,
        color: '#134e5e'
      },
      {
        value: 1024,
        color: '#114654'
      },
      {
        value: 2048,
        color: '#0f3e4b'
      },
      {
        value: 4096,
        color: '#0d3641'
      }
    ]

    for (const item of backgroundColors) {
      it(`Should return correct color for value ${item.value}`, () => {
        expect(helpers.cellBackgroundColor(item.value)).toEqual(item.color)
      })
    }

    const notValidValues = [1, 'qwe', false, null, undefined]
    const defaultColor = '#a0b8be'

    for (const value of notValidValues) {
      it(`Should return default color for not valid value ${value}`, () => {
        expect(helpers.cellBackgroundColor(value)).toEqual(defaultColor)
      })
    }
  })

  describe('cellColor method', () => {
    const smallValues = [0, 111, 255]
    const bigValues = [256, 511]
    const darkColor = '#776E65'
    const lightColor = '#fff'

    for (const value of smallValues) {
      it(`Should return dark color for value ${value}`, () => {
        expect(helpers.cellColor(value)).toEqual(darkColor)
      })
    }

    for (const value of bigValues) {
      it(`Should return light color for value ${value}`, () => {
        expect(helpers.cellColor(value)).toEqual(lightColor)
      })
    }
  })

  describe('getRandomColor method', () => {
    it('Should return correct value', () => {
      expect(helpers.getRandomColor()).toMatch(/rgb/)
    })
  })

  describe('lightenColor method', () => {
    const color = 'rgb(1, 1, 1)'

    it('Should return correct value', () => {
      const opacity = 0.1

      expect(helpers.lightenColor(color, opacity)).toEqual('rgba(1, 1, 1, 0.1)')
    })

    it('Should return correct value with default opacity', () => {
      expect(helpers.lightenColor(color)).toEqual('rgba(1, 1, 1, 0.8)')
    })
  })

  describe('formatTime method', () => {
    it('Should return correct values', () => {
      expect(helpers.formatTime(60)).toEqual('01:00.00')
      expect(helpers.formatTime(61)).toEqual('01:01.00')
      expect(helpers.formatTime(9.99)).toEqual('00:09.99')
    })
  })

  describe('randomString method', () => {
    test.each([
      2,
      4,
      8,
      16
    ])('Should return correct result in case of %p length', length => {
      const value = helpers.randomString(length)

      expect(value).toEqual(expect.any(String))
      expect(value.length).toEqual(length)
    })
  })
})
