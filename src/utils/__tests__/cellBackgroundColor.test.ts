import { describe, expect, test } from 'vitest'
import cellBackgroundColor from '../cellBackgroundColor'

describe('cellBackgroundColor utils', () => {
  test.each([
    [2, '#e2efe5'],
    [4, '#d4e7d8'],
    [8, '#c6e0cc'],
    [16, '#b8d8bf'],
    [32, '#a9d0b2'],
    [64, '#9bc9a6'],
    [128, '#8dc199'],
    [256, '#7fb98c'],
    [512, '#134e5e'],
    [1024, '#114654'],
    [2048, '#0f3e4b'],
    [4096, '#0d3641'],
    [1, '#a0b8be'],
    [3, '#a0b8be'],
    [133, '#a0b8be'],
    [100000, '#a0b8be'],
  ])('Should return correct result for value %p', (value, result) => {
    expect(cellBackgroundColor(value)).toEqual(result)
  })
})
