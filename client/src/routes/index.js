import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../components/Header'
import './index.css'
import 'emoji-mart/css/emoji-mart.css'
import Home from './Home';

export default class App extends Component {
  render() {
    return (
     
      <div className="App">
        <Router>
          <div>
            <Header/>
            <Switch>
              <Route path="/" render={()=><Home />}/>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}