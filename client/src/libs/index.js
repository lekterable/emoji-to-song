module.exports = {
  filterWithEmojis: (emojis, array) =>
    array.filter(item =>
      emojis.every(emoji => item.emojis.indexOf(emoji) > -1)
    ),
  removeLastEmoji: array => array.slice(0, -1)
}
