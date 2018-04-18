const router = require('express').Router()
const request = require('request')
const { spotifyAuthorize, spotifyGetInfo, spotifySearch, mergeResults } = require('../libs')
const Artist = require('../models/Artist')
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

router.get('/artists', (req, res) => {
  const artists = [
    {id: 1, name: 'Adele', emojis: ['🇬🇧','👩','😢', '😭'], spotify_id:'4dpARuHxo51G3z768sgnrY'},
    {id: 2, name: 'Post Malone', emojis: ['🇲🇽', '👨'], spotify_id:'246dkjvS1zLTtiykXe5h60'},
    {id: 3, name: 'Travis Scott', emojis: ['🇺🇸','👨','🔥'], spotify_id:'0Y5tJX1MQlPlqiwlOH1tJY'},
    {id: 4, name: 'Kanye West', emojis: ['🇺🇸','👨','🔥'], spotify_id:'5K4W6rqBFWDnAN6FQUkS6x'},
    {id: 5, name: 'Beyonce', emojis: ['🇺🇸','👩','🔥'], spotify_id:'6vWDO969PvNqNYHIOW5v0m'}
  ]
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
      artist.save(function (err, artist) {
        if (err)
          return res.status(400).json({success: false, message: 'Bad request'})
        return res.status(201).json({success: true, message: artist})
      })
    })
  })
})

module.exports = router