import React from 'react'

export default props => {
  return props.type === 'artist' ? (
    <li className="list-group-item col-12 offset-md-3 col-md-6 offset-lg-4 col-lg-4">
      <img
        src={props.artist.images[0].url}
        alt="artist thumbnail"
        className="rounded artist-thumbnail"
      />
      <span className="artist-name">{props.artist.name}</span>
    </li>
  ) : (
    <li className="list-group-item col-12 offset-md-3 col-md-6 offset-lg-4 col-lg-4">
      <img
        src={props.song.album.images[0].url}
        alt="artist thumbnail"
        className="rounded song-thumbnail"
      />
      <span className="song-name">
        {props.song.name}
        <small> - {props.song.artists[0].name}</small>
      </span>
    </li>
  )
}
