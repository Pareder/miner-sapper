const middleware = {
  result: ({ body: { name, result, mode } }, res, db) => {
    if (!name || !result || !mode) {
      return res.send('An error occurred: Name, result and mode are required')
    }

    const formattedMode = mode.split('/').join('_')

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
  }
}

module.exports = middleware
