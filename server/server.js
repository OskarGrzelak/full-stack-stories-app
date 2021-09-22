const mongoose = require('mongoose')
const dotenv = require('dotenv').config({ path: './config.env' })
const app = require('./app')

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Database connected'))

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Start listening on port ${port}`)
})
