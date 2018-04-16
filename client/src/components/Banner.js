import React, { Component } from 'react'

export default class extends Component {
    render(){
        return (
            <div>
                <h1 className="app-title">Hey there! <span role="img" aria-label="hand">👋</span></h1>
                <p className="app-description">Put in some emojis and let me <span role="img" aria-label="loupe">🔎</span> a <span role="img" aria-label="music-note">🎵</span> just for you! </p>
            </div>
        )
    }
}