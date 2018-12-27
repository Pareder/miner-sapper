const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const compression = require('compression')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

/** DB settings */
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ easy: [], medium: [], hard: [] })
  .write()

/** App settings */
const app = express()
app.use(compression())
app.use(serveStatic((__dirname + "/dist"), {
  maxAge: 604800000,
  setHeaders: function (res, path) {
    res.setHeader('X-FRAME-OPTIONS', 'DENY')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Cache-Control', 'max-age=604800000')
    res.setHeader('Expires', new Date(Date.now() + 2592000000 * 30).toUTCString())
  }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/** Query for setting new user time and getting top 5 */
app.post('/time', (req, res) => {
  const name = req.body.name
  const time = req.body.time
  const mode = req.body.mode
  
  /** Add new user time 
      * @param {String} mode Mode to add time to
      */
  db.get(mode)
    .push({
      name,
      time
    })
    .write()

  /** Get results sorted by time */
  const leaderboard = db.get(mode)
    .sortBy('time')
    .value()

  const topFive = leaderboard.slice(0, 5)
  const position = leaderboard.findIndex(item => item.name === name) + 1

  res.send({
    leaderboard: topFive,
    position
  })
})

/** Setting app port */
const port = process.env.PORT || 5000
app.listen(port)