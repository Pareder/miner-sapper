const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const compression = require('compression')
const bodyParser = require('body-parser')
const db = require('./db')
const getRoutes = require('./routes')

/** App settings */
const app = express()
app.use(compression())
app.use(serveStatic(path.join(__dirname, '/dist'), {
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
app.use('/', getRoutes(db))

/** Setting app port */
const port = process.env.PORT || 5000
app.listen(port)
