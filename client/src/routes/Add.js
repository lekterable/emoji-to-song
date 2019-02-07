import React, { Component } from 'react'
import { Picker } from 'emoji-mart'
import { removeLastEmoji } from '../libs'
import { split } from 'lodash'
import Banner from '../components/Banner'
import './Add.css'

export default class extends Component {
  state = {
    add: {
      type: 'song',
      name: '',
      emojis: ''
    }
  }
  handleAddName = e => {
    this.setState({ add: { ...this.state.add, name: e.target.value } })
  }
  handleAddType = e => {
    this.setState({ add: { ...this.state.add, type: e.target.value } })
  }
  handleAddEmoji = emoji => {
    if (!split(this.state.add.emojis, '').find(item => item === emoji.native))
      this.setState({
        add: { ...this.state.add, emojis: this.state.add.emojis + emoji.native }
      })
  }
  handleUndoEmoji = () => {
    this.setState({
      add: {
        ...this.state.add,
        emojis: removeLastEmoji(split(this.state.add.emojis, '')).join('')
      }
    })
  }
  handleAddSubmit = e => {
    e.preventDefault()
    switch (this.state.add.type) {
      case 'song':
        return fetch('/api/songs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state.add)
        })
          .then(res => res.json())
          .then(res => {
            if (res.success)
              this.setState({
                add: { ...this.state.add, name: '', emojis: '' }
              })
          })
          .catch(err => console.error(err))
      case 'artist':
        return fetch('/api/artists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state.add)
        })
          .then(res => res.json())
          .then(res => {
            if (res.success)
              this.setState({
                add: { ...this.state.add, name: '', emojis: '' }
              })
          })
          .catch(err => console.error(err))
      default:
        return
    }
  }
  handleInputKeyDown = e => {
    if (e.which === 8 || e.which === 46)
      this.setState({
        add: {
          ...this.state.add,
          emojis: removeLastEmoji(split(this.state.add.emojis, ''))
        }
      })
  }
  render() {
    return (
      <div>
        <Banner
          title={
            <span>
              Feel free to add more{' '}
              {this.state.add.type === 'song' ? 'songs' : 'artists'} here!{' '}
              <span role="img" aria-label="it">
                👨‍💻
              </span>
            </span>
          }
          description={
            <span>
              Just try to use emojis which describe your{' '}
              {this.state.add.type === 'song' ? (
                <span role="img" aria-label="music">
                  🎶
                </span>
              ) : (
                <span role="img" aria-label="artist">
                  👨‍🎨
                </span>
              )}
              , thanks!
            </span>
          }
        />
        <form onSubmit={this.handleAddSubmit}>
          <div
            className="form-group col-12 add-type"
            onChange={this.handleAddType}
          >
            <input name="type" type="radio" value="song" defaultChecked /> Song{' '}
            <input name="type" type="radio" value="artist" /> Artist
          </div>
          <div className="form-group col-12 add-value">
            <input
              className="form-control col-12 offset-md-3 col-md-6 offset-lg-5 col-lg-2"
              required
              value={this.state.add.name}
              type="text"
              onChange={this.handleAddName}
              placeholder={
                this.state.add.type === 'song' ? 'Title...' : 'Name...'
              }
            />
          </div>
          <div className="form-group col-12">
            <input
              className="form-control offset-md-3 col-md-6 offset-lg-5 col-lg-2"
              onKeyDown={this.handleInputKeyDown}
              value={this.state.add.emojis}
              type="text"
              required
              placeholder="Emojis..."
            />
          </div>
          <Picker
            set="apple"
            showSkinTones={false}
            showPreview={false}
            onSelect={this.handleAddEmoji}
            color="#D9230F"
          />
          <div className="form-group col-12">
            <input
              className="btn btn-primary col-md-6 col-lg-1"
              value="Submit"
              type="submit"
            />
          </div>
        </form>
      </div>
    )
  }
}
