import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function UsersView() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const token = localStorage.getItem('token')
    useEffect(() => {
        const endpoint = 'http://localhost:4000/users/confirmlogin'
        if(!token) return
        
        axios.get(endpoint, {
            headers: {'auth-token': token}
        })
        .then(() => setIsLoggedIn(true))
        .catch()
    },
    [token])

    return (
        <div>
            {isLoggedIn ? 'Logged in.' : 'Not logged in.'}
        </div>
    )
}
