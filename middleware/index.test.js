const middleware = require('../middleware')
const DBMock = require('../db/mocks/DBMock')

const reqMock = {
  body: {}
}
const resMock = {
  status: jest.fn(function() {
    return this
  }),
  send: jest.fn()
}

describe('middleware', () => {
  describe('result method', () => {
    it('Should send error if no name or result or mode provided', () => {
      middleware.result(reqMock, resMock, DBMock)

      expect(resMock.send).toBeCalledWith('An error occurred: Name, result and mode are required')
    })

    it('Should call db.get with correct name', () => {
      const req = {
        body: {
          name: 'qwe',
          result: 1,
          mode: '/mode/submode'
        }
      }
      middleware.result(req, resMock, DBMock)

      expect(DBMock.get).toBeCalledWith('mode_submode')
    })

    it('Should call db.push with correct parameters', () => {
      const req = {
        body: {
          name: 'qwe',
          result: 1,
          mode: '/mode'
        }
      }
      middleware.result(req, resMock, DBMock)

      expect(DBMock.push).toBeCalledWith({ name: 'qwe', result: 1 })
    })

    it('Should send correct result', () => {
      const req = {
        body: {
          name: 'qwe',
          result: 1,
          mode: '/mode'
        }
      }
      const db = {
        ...DBMock,
        value () {
          return [
            { name: 'qwe', result: 1 },
            { name: 'asd', result: 2 }
          ]
        }
      }
      middleware.result(req, resMock, db)

      expect(resMock.send).toBeCalledWith({
        leaderboard: [
          { name: 'asd', result: 2 },
          { name: 'qwe', result: 1 }
        ],
        position: 2
      })
    })

    it('Should not contain user result in leaderboard property', () => {
      const req = {
        body: {
          name: 'qwe',
          result: 1,
          mode: '/mode'
        }
      }
      const db = {
        ...DBMock,
        value () {
          return [
            { name: 'qwe', result: 1 },
            { name: 'asd', result: 2 },
            { name: 'zxc', result: 3 },
            { name: 'rty', result: 4 },
            { name: 'fgh', result: 5 },
            { name: 'vbn', result: 6 }
          ]
        }
      }
      middleware.result(req, resMock, db)

      expect(resMock.send).toBeCalledWith({
        leaderboard: [
          { name: 'vbn', result: 6 },
          { name: 'fgh', result: 5 },
          { name: 'rty', result: 4 },
          { name: 'zxc', result: 3 },
          { name: 'asd', result: 2 }
        ],
        position: 6
      })
    })
  })
})
