import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand" href="/">emoji <span role="img" aria-label="hand">✌️</span> song</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/"><span role="img" aria-label="loupe">🔎</span> browse</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/add"><span role="img" aria-label="plus">➕</span> add</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
  }
}
