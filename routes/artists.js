const router = require('express').Router()
const request = require('request')
const { spotifyAuthorize, spotifyGetInfo, mergeResults } = require('../libs')
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
    if(err)
      console.error(err)
    if(!err && spotifyRes.statusCode === 200)
      spotifyGetInfo(request, 'artists', artists.map((artist)=>artist.spotify_id).join(), body.access_token, (err, spotifyRes, body)=>{
        if(err)
          console.error(err)
        if(!err && spotifyRes.statusCode === 200)
          return res.status(200).json(mergeResults (artists, body.artists))
      })
  })

})

module.exports = router