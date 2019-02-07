import React, { Component } from 'react'

export default class extends Component {
  render() {
    return (
      <div>
        <h1 className="app-title">{this.props.title}</h1>
        <p className="app-description">{this.props.description}</p>
      </div>
    )
  }
}
