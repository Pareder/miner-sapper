const express = require('express')

const getRoutes = (db) => {
  const routes = express.Router()

  /** Query for setting new user time and getting top 5 */
  routes.post('/result', (req, res) => {
    const name = req.body.name
    const result = req.body.result
    const mode = req.body.mode.split('/')
    const formattedMode = mode[1] + (mode[2] ? ('_' + mode[2]) : '')

    /** Add new user time
     * @param {String} mode Mode to add time to
     */
    db.get(formattedMode)
      .push({
        name,
        result
      })
      .write()

    /** Get results sorted by time */
    const leaderboard = db.get(formattedMode)
      .sortBy('result')
      .value()

    const topFive = mode.includes('miner') ? leaderboard.slice(0, 5) : leaderboard.slice(-5).reverse()
    const position = leaderboard.findIndex(item => item.name === name) + 1
    const finalPosition = mode.includes('miner') ? position : (leaderboard.length - position + 1)

    res.send({
      leaderboard: topFive,
      position: finalPosition
    })
  })

  return routes
}

module.exports = getRoutes
