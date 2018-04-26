const router = require('express').Router()
const request = require('request')
const { spotifyAuthorize, spotifyGetInfo, spotifySearch, mergeResults } = require('../libs')
const Artist = require('../models/Artist')
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

router.get('/artists', (req, res) => {
  Artist.find((err, artists)=>{
    spotifyAuthorize(request, client_id, client_secret, (err, spotifyRes, body) => {
      if(err || spotifyRes.statusCode !== 200)
        console.error(err)
      spotifyGetInfo(request, 'artists', artists.map((artist)=>artist.spotify_id).join(), body.access_token, (err, spotifyRes, body)=>{
        if(err || spotifyRes.statusCode !== 200)
          console.error(err)
        return res.status(200).json({success: true, message: mergeResults (artists, body.artists)})
      })
    })
  })
})
router.post('/artists', (req, res) => {
  spotifyAuthorize(request, client_id, client_secret, (err, spotifyRes, body) => {
    if(err || spotifyRes.statusCode !== 200)
      return console.error(err)
    spotifySearch(request, 'artist', req.body.name, body.access_token, (err, spotifyRes, body)=>{
      if(err || spotifyRes.statusCode !== 200)
        return console.error(err)
      const artist = new Artist({
        spotify_id: body.artists.items[0].id,
        name: body.artists.items[0].name,
        emojis : req.body.emojis
      })
      Artist.findOne({spotify_id: artist.spotify_id}, (err, doc)=>{
        if(err)
          return console.error(err.message)
        if(!doc){
          artist.save()
          return res.status(201).json({success: true, message: 'Artist updated'})
        }
        doc.emojis += artist.emojis
        doc.save()
        return res.status(201).json({success: true, message: 'Artist saved'})
      })
    })
  })
})

module.exports = router