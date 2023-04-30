import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

const MONGODB_URI_LOCAL = process.env.MONGODB_URI_LOCAL

//mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true })
mongoose.connect(MONGODB_URI_LOCAL, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Connected to database'))

export default db
