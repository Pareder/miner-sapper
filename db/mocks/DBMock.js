const DBMock = {
  db: {},
  mode: null,
  sorted: null,
  get: jest.fn(function (mode) {
    this.db[mode] = this.db[mode] || []
    this.mode = mode

    return this
  }),
  push: jest.fn(function (value) {
    this.db[this.mode].push(value)

    return this
  }),
  write: jest.fn(function () {
    return this
  }),
  sortBy: jest.fn(function (value) {
    this.sorted = this.db[this.mode].sort((a, b) => a[value] - b[value])

    return this
  }),
  value: jest.fn(function () {
    return this.sorted
  })
}

module.exports = DBMock
