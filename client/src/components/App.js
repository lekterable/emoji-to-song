import React, { Component } from 'react'
import Header from './Header'
import ResultsList from './ResultsList'
import { Picker } from 'emoji-mart'
import { filterWithEmojis } from '../libs'
import { split } from 'lodash'
import './App.css'
import 'emoji-mart/css/emoji-mart.css'

export default class App extends Component {
  state = {
    artists: [],
    songs: [],
    search: {
      value:'',
      type: 'songs'
    }
  }
  componentDidMount(){
    fetch('/api/artists')
    .then((res)=>res.json())
    .then((res)=>this.setState({artists: res}))

    fetch('/api/songs')
    .then((res)=>res.json())
    .then((res)=>this.setState({songs: res}))
  }
  handleSearchType = (e)=>{
    this.setState({search: {...this.state.search, type:e.target.value}})
  }
  handleSearch = (e)=>{
    this.setState({search: {...this.state.search, value:e.target.value}})
  }
  handleEmojiInput = (emoji)=>{
    this.setState({search:{...this.state.search, value:this.state.search.value+emoji.native}})
  }
  render() {
    const artists = this.state.search.value?filterWithEmojis(split(this.state.search.value, ''), this.state.artists):[]
    const songs = this.state.search.value?filterWithEmojis(split(this.state.search.value, ''), this.state.songs):[]
    return (
      <div className="App">
        <Header/>
        <h1 className="app-title">Hey there! <span role="img" aria-label="hand">👋</span></h1>
        <p className="app-description">Put in some emojis and let me <span role="img" aria-label="loupe">🔎</span> a <span role="img" aria-label="music-note">🎵</span> just for you! </p>
        <div className="form-group col-12" onChange={this.handleSearchType}>
          <input name="type" type="radio" value="songs" defaultChecked/> Songs <input name="type" type="radio" value="artists"/> Artists <input name="type" type="radio" value="both"/> Both
        </div>
        <div className="form-group col-12">
          <input className="form-control col-12 offset-md-3 col-md-6 offset-lg-5 col-lg-2" value={this.state.search.value} onChange={this.handleSearch} type="text"/>
        </div>
        <Picker set='apple' showSkinTones={false} showPreview={false} onSelect={this.handleEmojiInput} color='#D9230F'/>
        <ResultsList songs={songs} artists={artists} search={this.state.search}/>
      </div>
    )
  }
}