import { describe, expect, test } from 'vitest'
import cellColor from '../cellColor'

describe('cellColor utils', () => {
  test.each([
    [0, '#776E65'],
    [111, '#776E65'],
    [255, '#776E65'],
    [256, '#ffffff'],
    [511, '#ffffff'],
  ])('Should return correct result for value %p', (value, result) => {
    expect(cellColor(value)).toEqual(result)
  })
})
