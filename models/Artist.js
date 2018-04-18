const mongoose = require('mongoose')

let ArtistSchema = mongoose.Schema({
  name: {
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

module.exports = mongoose.model('Artist', ArtistSchema)