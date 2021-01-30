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

const submitFunc = (formData, resetForm) => {
    console.log(formData)
    axios.post('http://localhost:4000/users/signup', formData) //need http://
    .then(response => {
        alert(`User ${response.data.username} was successfully created.`)
        //after user is successfully created, clear the input fields! 
        resetForm() 
    })
    .catch(error => {
        console.log(error);
        // console.log("oh no! It didn't work.")
        const errorsArr = error.response.data.errors
        let alertStr = ""
        for(let i = 0; i < errorsArr.length; i++) {
            alertStr += `${errorsArr[i].msg}\n`
            //could be better/simpler
        }
        alert(alertStr)
    })

    // axios.post('localhost:4000/users/signup', formData)
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(error => {
    //     console.log(error);
    // })
}

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

