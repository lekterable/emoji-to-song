const mongoose = require('mongoose')

let SongSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  artist: {
    type: String,
    required: true,
    unique: true
  },
  emojis: {
    type: String,
    required: true,
    unique: true
  },
  spotify_id: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('Song', SongSchema)