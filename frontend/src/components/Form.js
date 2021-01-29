import React, {useState} from 'react'
import { defaultNavBtn } from "../config/styles"; //defaultNavBtn is an object

export default function Form(props) {
    const {inputs, submitMsg, submitFunc} = props //we get these when we call this function. makes sense.
    const intialState = {} //have name of each input we have (e.g. email, username, password)

    inputs.forEach(input => { //inputs is an array of objects, each which has name, placeholder, and type properties. 
        intialState[input.name] = "" //so adds key-value pair of input.name: "" in the initialState object.
    });

    const [formData, setFormData] = useState(intialState) 

    //example of 'inputs'
    // [
    //     {name: 'username', type: 'text', placeholder: 'Enter A Username'},
    //     {name: 'email', type: 'text', placeholder: 'Enter Your Email'},
    //     {name: 'password', type: 'password', placeholder: 'Enter A Password'},
    // ]

    const renderInputs = () => { 
        return inputs.map((input, index) => { //add second para to add key //'name' property set-up is not in the map loop
        //map returns a new array based on a for loop. it's like a for loop that returns a copy of an array (but can be edited in code block)
            return ( //where does input.type and input.placeholde come from in Signup.js. --> comes from Signup.inputs (automatic) 
                <input 
                    key={index} //index is automatic. with .map, there is first argument (e.g. input), and second argument 'index'
                    //running through loop with new component each time, need key so can track the components
                    type={input.type}
                    placeholder={input.placeholder}
                    value={formData[input.name]} //manually allow us to store in state //formData should update
                    // onChange={changeInput}
                    onChange={env => {
                        console.log(input.name, env.target.name) //where does env.target come from?
                        setFormData({...formData, [input.name]: env.target.value}) //this modifies formData, but what triggers the reconfig? 
                    }}  //^^ my first thought is that there would now be two elements with the key input.name  --does it automatically replace the previous key?
                    //only thing that is similar is when there is key:oldValue and then you do objectOfObjects[key] = newValue to update and now it's kew:newValue
                    name={input.name}
                />
            )
        })
        
    }
    //react able to get an array of JSX components and place it into other JSX code.
    return (
        <div>
            <form>
                {renderInputs()}
            </form>
            <button
                style={{...defaultNavBtn}}
                onClick = {() => (submitFunc(formData))}
            >
                {submitMsg || 'Submit'}
            </button>
        </div>
    )
}
