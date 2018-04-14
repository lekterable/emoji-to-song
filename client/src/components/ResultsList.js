import React, { Component } from 'react'
import Result from './Result'

export default class ResultsList extends Component {
    render(){
        return (
            <div>
                {this.props.search.type==='artists'||this.props.search.type==='both'?this.props.artists.map((artist, index)=><Result key={index} name={artist.name}/>):''}
                {this.props.search.type==='songs'||this.props.search.type==='both'?this.props.songs.map((song, index)=><Result key={index} name={song.name}/>):''}
            </div>
            
        )
    }
}