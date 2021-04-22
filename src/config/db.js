import firebase from 'firebase/app'
import 'firebase/database'

const db = firebase
  .initializeApp({ databaseURL: process.env.VUE_APP_DATABASE_URL })
  .database()

export default db
