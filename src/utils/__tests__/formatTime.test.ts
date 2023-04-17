import { describe, expect, test } from 'vitest'
import formatTime from '../formatTime'

describe('formatTime utils', () => {
  test.each([
    [60, '01:00'],
    [61, '01:01'],
    [9.999, '00:09.999'],
    [61.444, '01:01.444'],
  ])('Should return correct result for value %p', (value, result) => {
    expect(formatTime(value)).toEqual(result)
  })
})
