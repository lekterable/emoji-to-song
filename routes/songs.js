const router = require('express').Router()
const request = require('request')
const { spotifyAuthorize, spotifyGetInfo, spotifySearch, mergeResults } = require('../libs')
const Song = require('../models/Song')
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

router.get('/songs', (req, res) => {
  const songs = [
    {id: 1 ,name: 'Rolling in the deep', artist: 'Adele', emojis: ['😢', '😭'], spotify_id: '1CkvWZme3pRgbzaxZnTl5X'},
    {id: 2 ,name: 'Hello', artist: 'Adele', emojis: ['😢'], spotify_id: '0ENSn4fwAbCGeFGVUbXEU3'},
    {id: 3 ,name: 'Goosebumps', artist: 'Travis Scott', emojis: ['🔥'], spotify_id: '6gBFPUFcJLzWGx4lenP6h2'}
  ]
  spotifyAuthorize(request, client_id, client_secret, (err, spotifyRes, body) => {
    if(err || spotifyRes.statusCode !== 200)
      return console.error(err)
    spotifyGetInfo(request, 'tracks', songs.map((song) => song.spotify_id).join(), body.access_token, (err, spotifyRes, body) => {
      if(err || spotifyRes.statusCode !== 200)
        console.error(err)
      return res.status(200).json({success: true, message: mergeResults(songs, body.tracks)})
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
      song.save(function (err, post) {
        if (err)
          return res.status(400).json({success: false, message: 'Bad request'})
        return res.status(201).json({success: true, message: post})
      })
    })
  })
})

module.exports = router