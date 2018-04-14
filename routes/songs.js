const router = require('express').Router()

router.get('/songs', (req, res) => {
    const songs = [
      {name: 'Rolling in the deep', artist: 'Adele', emojis: ['😢', '😭']},
      {name: 'Hello', artist: 'Adele',emojis: ['😢']},
      {name: 'Goosebumps', artist: 'Travis Scott',emojis: ['🔥']}
    ]
    res.status(200).json(songs)
})

module.exports = router