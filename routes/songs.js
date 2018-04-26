const router = require('express').Router()
const request = require('request')
const { split } = require('lodash')
const { spotifyAuthorize, spotifyGetInfo, spotifySearch, mergeResults, removeDuplicates } = require('../libs')
const Song = require('../models/Song')
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

router.get('/songs', (req, res) => {
  Song.find((err, songs)=>{
    if(err)
      return console.error(err)
    spotifyAuthorize(request, client_id, client_secret, (err, spotifyRes, body) => {
      if(err || spotifyRes.statusCode !== 200)
        return console.error(err)
      spotifyGetInfo(request, 'tracks', songs.map((song) => song.spotify_id).join(), body.access_token, (err, spotifyRes, body) => {
        if(err || spotifyRes.statusCode !== 200)
          return console.error(err)
        return res.status(200).json({success: true, message: mergeResults(songs, body.tracks)})
      })
    })
  })
})

router.post('/songs', (req, res) => {
  spotifyAuthorize(request, client_id, client_secret, (err, spotifyRes, body) => {
    if(err || spotifyRes.statusCode !== 200)
      return console.error(err)
    spotifySearch(request, 'track', req.body.name, body.access_token, (err, spotifyRes, body)=>{
      if(err || spotifyRes.statusCode !== 200)
        return console.error(err)
      const song = new Song({
        spotify_id: body.tracks.items[0].id,
        title: body.tracks.items[0].name,
        artist: body.tracks.items[0].artists[0].name,
        emojis : req.body.emojis
      })
      Song.findOne({spotify_id: song.spotify_id}, (err, doc)=>{
        if(err)
          return console.error(err.message)
        if(!doc){
          song.save()
          return res.status(201).json({success: true, message: 'Song updated'})
        }
        doc.emojis = removeDuplicates(split(doc.emojis+song.emojis,'')).join('')
        doc.save()
        return res.status(201).json({success: true, message: 'Song saved'})
      })
    })
  })
})

module.exports = router