import React from 'react';
import { connect } from 'react-redux';

import './HuntingPlaces.css';
import { setCharacter } from '../../actions/character'

const mapStateToProps = state => {
    return {
        character: state.character,
        userId: state.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCharacter: character => dispatch(setCharacter(character))
    };
};

const ConnectedHuntingPlaces = props => {

    const places = [
        {
            name: 'Florest',
            minLevel: 1
        },
        {
            name: 'Orcs Village',
            minLevel: 3
        }
    ];

    const handleClick = (evt, placeName) => {
        const requestBody = { 
            userId: props.userId, 
            charId: props.character._id
        };
        fetch(`http://localhost:8000/hunt/${placeName}`, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            if(data.error) {
                console.log(data.error);
                return;
            }
            props.setCharacter(data.character);
        }).catch(err => {
            console.log(err);
        })
    };

    return (
        <div className='hunting-places'>
            <h1>Hunting Places</h1>
            <div className="hunting-places-container">
                {
                    places.map(place => {
                        return (
                            <div className="hunting-place" key={place.name}>
                                <h3>{place.name}</h3>
                                <p>Min. Level: 
                                    <span 
                                        style={{ color: props.character.level >= place.minLevel? "#51FF35": "#F00000" }}
                                    >
                                        {' ' + place.minLevel}
                                    </span>
                                </p>
                                <button 
                                    className='btn-inside' 
                                    onClick={(evt) => handleClick(evt, place.name)}
                                >
                                    Join
                                </button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

const HuntingPlaces = connect(mapStateToProps, mapDispatchToProps)(ConnectedHuntingPlaces);

export default HuntingPlaces;
