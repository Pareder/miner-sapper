import { describe, expect, test } from 'vitest'
import lightenColor from '../lightenColor'

describe('lightenColor utils', () => {
  const color = 'rgb(1, 1, 1)'
  test.each([
    [0.1, 'rgba(1, 1, 1, 0.1)'],
    [0.8, 'rgba(1, 1, 1, 0.8)'],
  ])('Should return correct result for opacity %p', (opacity, result) => {
    expect(lightenColor(color, opacity)).toEqual(result)
  })
})
