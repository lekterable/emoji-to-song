import React from 'react'
import './Footer.css'

export default (props) => {
    return (
        <footer className="footer">
            <div className="container">
                <span className="text-muted">{props.content}</span>
            </div>
        </footer>
    )
}