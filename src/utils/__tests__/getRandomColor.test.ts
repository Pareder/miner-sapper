import { describe, expect, it } from 'vitest'
import getRandomColor from '../getRandomColor'

describe('getRandomColor utils', () => {
  it('Should return correct value', () => {
    expect(getRandomColor()).toMatch(/rgb/)
  })
})
