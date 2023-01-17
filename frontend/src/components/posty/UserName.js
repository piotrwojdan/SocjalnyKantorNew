import React, { useState, useEffect } from 'react';

function UserName({id}) {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:5002/getusers')
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error(error))
    }, []);

    useEffect(() => {
        const user = users.find(user => user.id === id);
        if (user) {
            setUserName(user.login);
        }
    }, [users, id]);

    return <h4>{userName}</h4>;
}

export default UserName;
