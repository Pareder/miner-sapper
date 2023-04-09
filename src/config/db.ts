import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

export const app = initializeApp({ databaseURL: import.meta.env.VITE_DATABASE_URL })
const db = getDatabase(app)

export default db
