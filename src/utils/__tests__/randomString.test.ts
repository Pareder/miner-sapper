import { describe, expect, test } from 'vitest'
import randomString from '../randomString'

describe('randomString utils', () => {
  test.each([
    2,
    4,
    8,
    16
  ])('Should return correct result for %p length', length => {
    const value = randomString(length)

    expect(value).toEqual(expect.any(String))
    expect(value.length).toEqual(length)
  })
})
