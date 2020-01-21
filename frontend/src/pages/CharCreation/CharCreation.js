import React, { useState, useContext } from 'react';

import MainContext from '../../contexts/MainContext';
import './CharCreation.css';

const CharCreation = props => {
    const [name, setName] = useState('');

    const { userId, setCharId, setCharInfo } = useContext(MainContext);

    const handleChange = evt => {
        const { name, value } = evt.target;
        if(name === 'name') {
            setName(value);
        }
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        const requestBody = {
            userId,
            name
        };
        fetch('http://localhost:8000/character/create', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data.error){
                console.log(data.error);
                return;
            }
            setCharId(data.character._id);
            setCharInfo(data.character);
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='character-creation'>
            <h3>name: {name}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    name='name'
                    className='input-container' 
                    type="text" 
                    placeholder='Character name'
                    value={name}
                    onChange={handleChange}
                />
                <button className='btn-1'>CREATE</button>
            </form>
        </div>
    );
};

export default CharCreation;