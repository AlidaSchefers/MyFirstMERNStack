import React from 'react'
import {homeTitle} from '../config/styles'

export default function Home() { //Home is named from our file name
    return (
        <div>
            <h1 
            style={{...homeTitle, fontSize: 'small'}}
            > 
            {/* ... is spread operator. makes a shallow copy */}
                Welcome To Our Site
            </h1>
        </div>
    )
}
