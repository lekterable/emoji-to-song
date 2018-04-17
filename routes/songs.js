const router = require('express').Router()
const request = require('request')
const { spotifyAuthorize, spotifyGetInfo, mergeResults } = require('../libs')
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

router.get('/songs', (req, res) => {
    const songs = [
      {id: 1 ,name: 'Rolling in the deep', artist: 'Adele', emojis: ['😢', '😭'], spotify_id: '1CkvWZme3pRgbzaxZnTl5X'},
      {id: 2 ,name: 'Hello', artist: 'Adele', emojis: ['😢'], spotify_id: '0ENSn4fwAbCGeFGVUbXEU3'},
      {id: 3 ,name: 'Goosebumps', artist: 'Travis Scott', emojis: ['🔥'], spotify_id: '6gBFPUFcJLzWGx4lenP6h2'}
    ]
    spotifyAuthorize(request, client_id, client_secret, (err, spotifyRes, body) => {
      if(err)
        console.error(err)
      if(!err && spotifyRes.statusCode === 200)
        spotifyGetInfo(request, 'tracks', songs.map((song)=>song.spotify_id).join(), body.access_token, (err, spotifyRes, body)=>{
          if(err)
            console.error(err)
          if(!err && spotifyRes.statusCode === 200)
            return res.status(200).json(mergeResults (songs, body.tracks))
        })
    })
    
})

module.exports = router