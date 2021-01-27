import React from 'react'
import {pageTitle} from '../config/styles'
import Form from './Form'
import axios from 'axios'

const inputs = [
    {name: 'username', type: 'text', placeholder: 'Enter A Username'},
    {name: 'email', type: 'text', placeholder: 'Enter Your Email'},
    {name: 'password', type: 'password', placeholder: 'Enter A Password'},
]

const submitMsg = "sign up"

const submitFunc = (formData) => {
    console.log(formData)
    axios.post('http://localhost:4000/users/signup', formData) //need http://
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })

    // axios.post('localhost:4000/users/signup', formData)
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(error => {
    //     console.log(error);
    // })

}
//cross origin requests: CORs

export default function Signup() { //Home is named from our file name
    return (
        <div id="signup">
            <h1 
                style={{...pageTitle}}
            >
                Signup
            </h1>
            <Form inputs={inputs} submitMsg={submitMsg} submitFunc={submitFunc}/>
        </div>
    )
}

//we need to define inputs and subMsg ourselves.

