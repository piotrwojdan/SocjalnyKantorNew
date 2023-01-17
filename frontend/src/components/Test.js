import React from 'react'
import { useState, useEffect} from 'react'

function Test() {

    const [user, setUser] = useState({});

    useEffect(() => {
        fetch('http://localhost:5002/user/', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        withCredentials: true
    })
        .then(resp => resp.json())
        .then(resp => setUser(resp))
    },[])
    

    return (
        <p>{user.login}</p>
    )
}

export default Test