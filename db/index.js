const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

/** DB settings */
const adapter = new FileSync('db/db.json')
const db = low(adapter)
db.defaults({
  miner_easy: [],
  miner_medium: [],
  miner_hard: [],
  tetris: [],
  snake: [],
  crush: [],
  numbers: []
})
  .write()

module.exports = db
