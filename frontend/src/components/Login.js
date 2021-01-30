import React from 'react'
import {pageTitle} from '../config/styles'
import Form from './Form'
import axios from 'axios'

const inputs = [
    {name: 'cred', type: 'text', placeholder: 'Enter Your Email or Username'},
    {name: 'password', type: 'password', placeholder: 'Enter A Password'},
]
const submitMsg = "login"

const submitFunc = (formData, resetForm) => { //had to change users.js for this to work properly
    // console.log(formData)
    axios.post('http://localhost:4000/users/login', formData) //need http://
    .then(response => { 
        //seems that no matter the user info inputted, we get a response from backend, so it does not trigger the catch error
        alert("Logged in.")
        console.log(`token: ${response.data}`);
        localStorage.setItem('token', response.data) //when storing object in local storage, need to make it string with stringify and then make it into JSON again with JSON.parse //local storage only stores strings
        //when axios gets a status code 400 or higher, goes straight to catch. and does not run the then block code.
        resetForm()
    })
    .catch(error => { //get correct error when username is wrong, but when the password is wrong, we don't get an error? 
        console.log(error)
        // console.log(error.response)
        alert("Invalid credentials")
    })
    //can use .finally to run code whether error or not
    //.then only runs if no error occurs in axios. axios knows based on whether axios receives status coe above 400. backend needs to send proper status code so axios 
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
