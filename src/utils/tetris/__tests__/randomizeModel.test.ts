import { describe, expect, test } from 'vitest'
import { Models } from 'types/tetris'
import randomizeModel from '../randomizeModel'

describe('randomizeModel utils', () => {
  const size = 10
  test.each([
    [Models.I, [
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
    ]],
    [Models.O, [
      [1, 4],
      [0, 4],
      [0, 5],
      [1, 5],
    ]],
    [Models.T, [
      [1, 3],
      [1, 4],
      [0, 4],
      [1, 5],
    ]],
    [Models.S, [
      [1, 3],
      [1, 4],
      [0, 4],
      [0, 5],
    ]],
    [Models.Z, [
      [0, 3],
      [0, 4],
      [1, 4],
      [1, 5],
    ]],
    [Models.J, [
      [2, 4],
      [1, 4],
      [0, 4],
      [0, 5],
    ]],
    [Models.L, [
      [2, 5],
      [1, 5],
      [0, 5],
      [0, 4],
    ]],
  ])('Should return correct result for model %p', (model, result) => {
    expect(randomizeModel(size, model)).toEqual(result)
  })
})