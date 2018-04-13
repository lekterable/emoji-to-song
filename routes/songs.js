const router = require('express').Router()

router.get('/songs', (req, res) => {
    const songs = [
      {name: 'Rolling in the deep', emojis: ['😢', '😭']},
      {name: 'Hello', emojis: ['😢']},
      {name: 'Goosebumps', emojis: ['🔥']}
    ]
    res.status(200).json(songs)
})

module.exports = router