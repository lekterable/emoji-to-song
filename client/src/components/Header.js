import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'

export default class extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          emoji{' '}
          <span role="img" aria-label="hand">
            ✌️
          </span>{' '}
          song
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/">
                <span role="img" aria-label="loupe">
                  🔎
                </span>{' '}
                browse
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/add">
                <span role="img" aria-label="plus">
                  ➕
                </span>{' '}
                add
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
