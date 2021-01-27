import React, { useState } from 'react'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import buttonConfig from '../config/navButtonsConfig'
import {defaultNavBtn} from '../config/styles'

export default function Navigation() {
    const [page, setPage] = useState('home') //here we have a default of 'home'. how does this get changed when we go to another page?
    const renderPage = () => {
        switch (page) {
            case 'home':
                return <Home /> //breaks are only needed when you don't return
            case 'login':
                return <Login />
            case 'signup':
                return <Signup />
            default:
                return "404 Page Not Defined";
        }
    }

    const renderButtons = () => {
        return buttonConfig.map( btn => {

            console.log(btn)
            
            if (btn.page === page) return null //this page variable comes from the const in the beginning.
            else {return (
                <button 
                    style = {{...defaultNavBtn, color: btn.color}}
                    onClick = {() => {setPage(btn.page)}} //this requires a re-render of the DOM. 
                >{btn.text}
                </button>
            )}
        })
    }

    return (
        <div id="nav"> 
            {renderPage()}
            {renderButtons()}
        </div>
    )
}
