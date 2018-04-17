import React, { Component } from 'react'
import Banner from '../components/Banner'

export default class extends Component {
    render(){
        return (
            <div>
                <Banner title={<span>Feel free to add more songs here!</span>} description={<span>Just try to use emojis which describe your song, thanks!</span>}/>
            </div>
        )
    }
}