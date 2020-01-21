import React, { useState } from 'react';

import './Register.css';

const Register = props => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = evt => {
        evt.preventDefault();
        const requestBody = {
            email,
            userName,
            password
        };
        fetch('http://localhost:8000/user/create', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
        setEmail('');
        setUserName('');
        setPassword('');
    };

    const handleChange = evt => {
        const { name, value } = evt.target;
        if(name === 'email') {
            setEmail(value);
        }  else if(name === 'userName') {
            setUserName(value);
        } else if(name === 'password') {
            setPassword(value);
        }
    };

    return (
        <div className='register'>
            <form onSubmit={handleSubmit}>
                <input
                    name='email'
                    value={email}
                    onChange={handleChange}
                    className='input-container' 
                    type="email" 
                    placeholder='Email'
                />
                <input
                    name='userName'
                    value={userName}
                    onChange={handleChange} 
                    className='input-container'
                    type="text" 
                    placeholder='Username'
                />
                <input
                    name='password'
                    value={password}
                    onChange={handleChange} 
                    className='input-container'
                    type="password" 
                    placeholder='Password'
                />
                <button className='btn-1'>REGISTER</button>
            </form>
        </div>
    );
};

export default Register;