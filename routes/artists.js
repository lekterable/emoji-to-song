const router = require('express').Router()

router.get('/artists', (req, res) => {
    const artists = [
      {name: 'Adele', emojis: ['🇬🇧','👩','😢', '😭']},
      {name: 'Post Malone', emojis: ['🇲🇽', '👨']},
      {name: 'Travis Scott', emojis: ['🇺🇸','👨','🔥']}
    ]
    res.status(200).json(artists)
})

module.exports = router