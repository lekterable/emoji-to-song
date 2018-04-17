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
    handleAddName = (e) => {
        this.setState({add: {...this.state.add, name: e.target.value}})
    }
    handleAddType = (e) => {
        this.setState({add: {...this.state.add, type:e.target.value}})
    }
    handleAddEmoji = (emoji) => {
        this.setState({add: {...this.state.add, emojis: this.state.add.emojis+emoji.native}})
    }
    handleUndoEmoji = () => {
       this.setState({add: {...this.state.add, emojis: removeLastEmoji(split(this.state.add.emojis, ''))}})
    }
    handleAddSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.add)
    }
    render(){
        return (
            <div>
                <Banner title={<span>Feel free to add more {this.state.add.type==='song'?'songs':'artists'} here! <span role="img" aria-label="it">👨‍💻</span></span>} description={<span>Just try to use emojis which describe your {this.state.add.type==='song'?<span role="img" aria-label="music">🎶</span>:<span role="img" aria-label="artist">👨‍🎨</span>}, thanks!</span>}/>
                <form onSubmit={this.handleAddSubmit}>
                    <div className="form-group col-12 add-type" onChange={this.handleAddType}>
                        <input name="type" type="radio" value="song" defaultChecked/> Song <input name="type" type="radio" value="artist"/> Artist
                    </div>
                    <div className="form-group col-12 add-value">
                        <input className="form-control col-12 offset-md-3 col-md-6 offset-lg-5 col-lg-2" required value={this.state.add.name} type="text" onChange={this.handleAddName} placeholder={this.state.add.type==='song'?'Title':'Name'}/>
                    </div>
                    <div className="form-group col-12">
                        <div className="input-group">
                            <input className="form-control offset-md-3 col-md-6 offset-lg-5 col-lg-2" value={this.state.add.emojis} type="text" required disabled placeholder='Emojis'/>
                            <div className="input-group-append">
                                <button onClick={this.handleUndoEmoji} className="btn btn-outline-secondary" type="button"><i className="fa fa-reply"></i></button>
                            </div>
                        </div>
                    </div>
                    <Picker set='apple' showSkinTones={false} showPreview={false} onSelect={this.handleAddEmoji} color='#D9230F'/>
                    <div className="form-group col-12">
                        <input className="btn btn-primary col-md-6 col-lg-1" value="Submit" type="submit"/>
                    </div>
                </form>
            </div>
        )
    }
}