import React, { Component } from 'react'
import { Picker } from 'emoji-mart'
import { filterWithEmojis } from '../libs'
import { split } from 'lodash'
import Banner from '../components/Banner'
import ResultsList from '../components/ResultsList'
import './Home.css'

export default class extends Component {
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
    render(){
        const artists = this.state.search.value?filterWithEmojis(split(this.state.search.value, ''), this.state.artists):[]
        const songs = this.state.search.value?filterWithEmojis(split(this.state.search.value, ''), this.state.songs):[]
        return (
            <div>
                <Banner/>
                <div className="form-group col-12 search-type" onChange={this.handleSearchType}>
                  <input name="type" type="radio" value="songs" defaultChecked/> Songs <input name="type" type="radio" value="artists"/> Artists <input name="type" type="radio" value="both"/> Both
                </div>
                <div className="form-group col-12 search-value">
                  <input className="form-control col-12 offset-md-3 col-md-6 offset-lg-5 col-lg-2" value={this.state.search.value} onChange={this.handleSearch} type="text"/>
                </div>
                <Picker set='apple' showSkinTones={false} showPreview={false} onSelect={this.handleEmojiInput} color='#D9230F'/>
                <ResultsList songs={songs} artists={artists} search={this.state.search}/>
            </div>
        )
    }
}