module.exports = {
    filterWithEmojis: (emojis, array) => array.filter((item)=>emojis.every((emoji)=>item.emojis.indexOf(emoji)>-1))
}