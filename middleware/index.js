const middleware = {
  result: ({ body: { name, result, mode } }, res, db) => {
    if (!name || !result || !mode) {
      return res.status(400).send('An error occurred: Name, result and mode are required')
    }

    const formattedMode = mode.split('/').slice(1).join('_')

    /** Add new user result
     * @param {String} mode Mode to add result to
     */
    db.get(formattedMode)
      .push({
        name,
        result
      })
      .write()

    /** Get records sorted by result */
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
