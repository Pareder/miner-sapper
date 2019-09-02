const express = require('express')
const middleware = require('../middleware')

const getRoutes = db => {
  const routes = express.Router()

  /** Query for setting new user time and getting top 5 */
  routes.post('/result', (req, res) => middleware.result(req, res, db))

  return routes
}

module.exports = getRoutes
