import React from 'react'
import {pageTitle} from '../config/styles'
import Form from './Form'

const inputs = [
    {name: 'cred', type: 'text', placeholder: 'Enter Your Email or Username'},
    {name: 'password', type: 'password', placeholder: 'Enter A Password'},
]
const submitMsg = "login"

export default function Login() { //Home is named from our file name
    return (
        <div id="login">
            <h1 
                style={{...pageTitle}}
            >
                Login
            </h1>
        <Form  inputs={inputs} submitMsg={submitMsg} />
        </div>
    )
}
