import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Login.css';
import { logIn } from '../../actions/auth';
import MainContext from '../../contexts/MainContext.js';

function mapDispatchToProps(dispatch) {
    return {
        logIn: credentials => dispatch(logIn(credentials))
    };
} 

const ConnectedLogin = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const { setToken, setUserId } = useContext(MainContext);

    // const requestBody = {
    //     email,
    //     password
    // };

    const handleSubmit = evt => {
        evt.preventDefault();
        props.logIn({
            email,
            password
        });
        // fetch('http://localhost:8000/login', {
        //     method: 'POST',
        //     body: JSON.stringify(requestBody),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(res => {
        //     return res.json();
        // }).then(resData => {
        //     if(resData.error) {
        //         console.log(resData.error);
        //     } else {
        //         setUserId(resData.userId);
        //         setToken(resData.token);
        //     }
        // }).catch(err => {
        //     console.log(err);
        // });

        setEmail('');
        setPassword('');
    };
    const handleChange = evt => {
        const { name, value } = evt.target;
        if(name === 'email') {
            setEmail(value);
        } else if(name === 'password') {
            setPassword(value);
        }
    };
    return(
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <input
                    name='email'
                    className='input-container' 
                    type="email" 
                    placeholder='Email'
                    value={email}
                    onChange={handleChange}
                />
                <input 
                    name='password'
                    className='input-container'
                    type="password" 
                    placeholder='Password'
                    value={password}
                    onChange={handleChange}
                />
                <button className='btn-1'>LOGIN</button>
                <p>OR</p>
                {/* <button onClick={handleClick} className='btn-2'>REGISTER</button> */}
                <Link className='btn-2' to='/register'><span>REGISTER</span></Link> 
            </form>
        </div>
    )
};

const Login = connect(
    null,
    mapDispatchToProps
)(ConnectedLogin);

export default Login;