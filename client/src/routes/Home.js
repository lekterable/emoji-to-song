import React, { Component } from 'react'
import { Picker } from 'emoji-mart'
import { filterWithEmojis, removeLastEmoji } from '../libs'
import { split } from 'lodash'
import Banner from '../components/Banner'
import ResultsList from '../components/ResultsList'
import './Home.css'

export default class extends Component {
  state = {
    artists: [],
    songs: [],
    search: {
      value: '',
      type: 'both'
    }
  }
  componentDidMount() {
    Promise.all([fetch('/api/songs'), fetch('/api/artists')])
      .then(([songs, artists]) => Promise.all([songs.json(), artists.json()]))
      .then(([songs, artists]) =>
        this.setState({ songs: songs.message, artists: artists.message })
      )
      .catch(err => console.error(err))
  }
  handleSearchType = e => {
    this.setState({ search: { ...this.state.search, type: e.target.value } })
  }
  handleAddEmoji = emoji => {
    if (!split(this.state.search.value, '').find(item => item === emoji.native))
      this.setState({
        search: {
          ...this.state.search,
          value: this.state.search.value + emoji.native
        }
      })
  }
  handleInputKeyDown = e => {
    if (e.which === 8 || e.which === 46)
      this.setState({
        search: {
          ...this.state.search,
          value: removeLastEmoji(split(this.state.search.value, '')).join('')
        }
      })
  }
  render() {
    const artists = this.state.search.value
      ? filterWithEmojis(split(this.state.search.value, ''), this.state.artists)
      : []
    const songs = this.state.search.value
      ? filterWithEmojis(split(this.state.search.value, ''), this.state.songs)
      : []
    return (
      <div>
        <Banner
          title={
            <span>
              Hey there!{' '}
              <span role="img" aria-label="hand">
                👋
              </span>
            </span>
          }
          description={
            <span>
              Put in some emojis and let me{' '}
              <span role="img" aria-label="loupe">
                🔎
              </span>{' '}
              a{' '}
              <span role="img" aria-label="music-note">
                🎵
              </span>{' '}
              just for you!
            </span>
          }
        />
        <div
          className="form-group col-12 search-type"
          onChange={this.handleSearchType}
        >
          <input name="type" type="radio" value="both" defaultChecked /> Both{' '}
          <input name="type" type="radio" value="songs" /> Songs{' '}
          <input name="type" type="radio" value="artists" /> Artists
        </div>
        <div className="form-group col-12 search-value">
          <input
            className="form-control col-12 offset-md-3 col-md-6 offset-lg-5 col-lg-2"
            value={this.state.search.value}
            type="text"
            onKeyDown={this.handleInputKeyDown}
            placeholder="Search..."
          />
        </div>
        <Picker
          set="apple"
          showSkinTones={false}
          showPreview={false}
          onSelect={this.handleAddEmoji}
          color="#D9230F"
          recent={['fire', 'cry', 'sob', 'man', 'woman', 'us', 'flag-mx']}
        />
        <ResultsList
          songs={songs}
          artists={artists}
          search={this.state.search}
        />
      </div>
    )
  }
}
