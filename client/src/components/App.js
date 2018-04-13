import React, { Component } from 'react'
import Header from './Header'
import { Picker } from 'emoji-mart'
import './App.css'
import 'emoji-mart/css/emoji-mart.css'

export default class App extends Component {
  state = {
    artists: [],
    songs: [],
    search: ''
  }
  componentDidMount(){
    fetch('/api/artists')
    .then((res)=>res.json())
    .then((res)=>this.setState({artists: res}))

    fetch('/api/songs')
    .then((res)=>res.json())
    .then((res)=>this.setState({songs: res}))
  }
  handleSearch = (e)=>{
    this.setState({search:e.target.value})
  }
  handleEmojiInput = (emoji)=>{
    this.setState({search:this.state.search+emoji.native})
  }
  render() {
    const artists = this.state.search?filterWithEmojis(this.state.search, this.state.songs):[]
    const songs = this.state.search?filterWithEmojis(this.state.search, this.state.artists):[]
    return (
      <div className="App">
        <Header/>
        <h1 className="app-title">Hey there! <span role="img" aria-label="hand">👋</span></h1>
        <p className="app-description">Put in some emojis and let me <span role="img" aria-label="loupe">🔎</span>a <span role="img" aria-label="music-note">🎵</span>just for you! </p>
        <div className="form-group col-12">
          <input className="form-control col-12 offset-md-3 col-md-6 offset-lg-5 col-lg-2" value={this.state.search} onChange={this.handleSearch} type="text"/>
        </div>
        <Picker set='apple' showSkinTones={false} showPreview={false} onSelect={this.handleEmojiInput} color='#D9230F'/>
        {artists.map((artist, index)=><div key={index}>{artist.name}</div>)}
        {songs.map((song, index)=><div key={index}>{song.name}</div>)}
      </div>
    )
  }
}
function filterWithEmojis(emojis, array){
  return array.filter((item)=>[...emojis].every((emoji)=>item.emojis.indexOf(emoji)>-1))
}