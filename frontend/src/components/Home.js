import React from 'react'
import {pageTitle} from '../config/styles'

export default function Home() { //Home is named from our file name
    return (
        <div id="home">
            <h1 
            style={{...pageTitle, fontSize: 'small'}}
            > 
            {/* ... is spread operator. makes a shallow copy */}
                Welcome To Our Site
            </h1>
        </div>
    )
}
