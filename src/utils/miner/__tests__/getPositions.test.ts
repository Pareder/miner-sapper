import { describe, expect, it } from 'vitest'
import getPositions from '../getPositions'

describe('miner getPositions utils', () => {
  it('Should return correct result', () => {
    const firstPosition = 1
    const secondPosition = 1

    expect(getPositions(firstPosition, secondPosition)).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ])
  })
})
