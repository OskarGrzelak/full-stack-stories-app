const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const userRouter = require('./routes/userRoutes')
const storyRouter = require('./routes/storyRoutes')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/stories', storyRouter)

module.exports = app
