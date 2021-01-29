import React from 'react'
import {pageTitle} from '../config/styles'
import Form from './Form'
import axios from 'axios'

const inputs = [
    {name: 'cred', type: 'text', placeholder: 'Enter Your Email or Username'},
    {name: 'password', type: 'password', placeholder: 'Enter A Password'},
]
const submitMsg = "login"

const submitFunc = (formData) => {
    console.log(formData)
    axios.post('http://localhost:4000/users/login', formData) //need http://
    .then(response => {
        console.log(`token: ${response.data}`);
    })
    .catch(error => {
        console.log(error);
    })
}

export default function Login() { //Home is named from our file name
    return (
        <div id="login">
            <h1 
                style={{...pageTitle}}
            >
                Login
            </h1>
        <Form  inputs={inputs} submitMsg={submitMsg} submitFunc={submitFunc}/>
        </div>
    )
}
