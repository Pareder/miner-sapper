import API from '../api'

const httpMock = {
  get: jest.fn(),
  post: jest.fn(async (path, data) => ({ path, data }))
}

function getAPI (http = httpMock) {
  return new API(http)
}

describe('API class', () => {
  describe('create method', () => {
    it('Should be an instance of API class', () => {
      expect(API.create()).toBeInstanceOf(API)
    })
  })

  describe('getLeaderboard method', () => {
    it('Should call http.post with correct parameters', async () => {
      const data = {
        name: 'qwe',
        result: 123,
        mode: 'mode'
      }
      const api = getAPI()
      await api.getLeaderboard(data)

      expect(httpMock.post).toBeCalledWith('/result', data)
    })

    it('Should return correct data', async () => {
      const data = [1, 2, 3]
      const http = {
        post: jest.fn(() => ({ body: data }))
      }
      const api = getAPI(http)
      const result = await api.getLeaderboard({})

      expect(result).toEqual(data)
    })

    it('Should throw error if http.post rejects', async () => {
      const http = {
        post: jest.fn(() => Promise.reject(new Error('error')))
      }
      const api = getAPI(http)
      let message

      try {
        await api.getLeaderboard()
      } catch (e) {
        message = e
      }

      expect(message).toEqual(new Error('error'))
    })
  })
})
