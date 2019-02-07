const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const config = require('./config')
mongoose.Promise = Promise

mongoose.connect(
  config.database,
  () => console.log('Connected with database')
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './client/build')))

app.use('/api', require('./routes/artists'))
app.use('/api', require('./routes/songs'))

app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname, './client/build', 'index.html'))
})

module.exports = app
