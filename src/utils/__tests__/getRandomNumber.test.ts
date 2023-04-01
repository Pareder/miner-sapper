import { describe, expect, it } from 'vitest'
import getRandomNumber from '../getRandomNumber'

describe('getRandomNumber utils', () => {
  it('Should return number less than provided or equal', () => {
    const range = 10

    expect(getRandomNumber(range)).toBeLessThanOrEqual(range)
  })
})
