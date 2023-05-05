import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

//const MONGODB_URI_LOCAL = process.env.MONGODB_URI_LOCAL
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD

mongoose.connect(MONGODB_URI_PROD, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Connected to database'))

export default db
