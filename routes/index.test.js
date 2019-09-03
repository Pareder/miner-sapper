const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')
const getRoutes = require('../routes')
const DBMock = require('../db/mocks/DBMock')

const app = express()
app.use(bodyParser.json())
app.use('/', getRoutes(DBMock))

const data = [
  { name: 'qwe', result: 1, mode: '/tetris' },
  { name: 'asd', result: 2, mode: '/tetris' },
  { name: 'zxc', result: 3, mode: '/tetris' },
  { name: 'rty', result: 4, mode: '/tetris' },
  { name: 'fgh', result: 5, mode: '/tetris' }
]

describe('/result route', () => {
  describe('POST', () => {
    for (let i = 0; i < data.length; i++) {
      it('Should respond with correct json', async () => {
        await request(app)
          .post('/result')
          .send(data[i])
          .expect(200, {
            leaderboard: data.slice(0, i + 1).map(record => ({ name: record.name, result: record.result })).reverse(),
            position: 1
          })
      })
    }

    it('Should respond with error if some arguments are not provided', async () => {
      await request(app)
        .post('/result')
        .send({ name: 'asd' })
        .expect(400, 'An error occurred: Name, result and mode are required')
    })
  })
})
