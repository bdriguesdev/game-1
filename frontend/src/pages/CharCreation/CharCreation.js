import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createCharacter } from '../../actions/character';
import './CharCreation.css';

const mapStateToProps = state => {
    return {
        userId: state.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createCharacter: (userId, name) => dispatch(createCharacter(userId, name)),
    };
};

const ConnectedCharCreation = props => {
    const [name, setName] = useState('');

    const handleChange = evt => {
        const { name, value } = evt.target;
        if(name === 'name') {
            setName(value);
        }
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        props.createCharacter(props.userId, name).then((isCharacterCreated) => {
            if(isCharacterCreated) {
                props.history.push('/home');
            }
        });
    }

    return (
        <div className='character-creation'>
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

const CharCreation = connect(mapStateToProps, mapDispatchToProps)(ConnectedCharCreation);

export default CharCreation;