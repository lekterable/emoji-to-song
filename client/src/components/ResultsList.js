import React, { Component } from 'react'
import Result from './Result'

export default class extends Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.search.type === 'artists' ||
        this.props.search.type === 'both'
          ? this.props.artists.map((artist, index) => (
              <Result key={index} artist={artist} type="artist" />
            ))
          : ''}
        {this.props.search.type === 'songs' || this.props.search.type === 'both'
          ? this.props.songs.map((song, index) => (
              <Result key={index} song={song} type="song" />
            ))
          : ''}
      </ul>
    )
  }
}
