import React, { useContext } from 'react';

import './HuntingPlaces.css';
import MainContext from '../../contexts/MainContext';

const HuntingPlaces = props => {

    const { userId, charId, charInfo, setCharInfo } = useContext(MainContext);

    const places = [
        {
            name: 'Florest',
            minLevel: 1
        }
    ];

    const handleClick = (evt, placeName) => {
        const requestBody = { userId, charId };
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
            console.log(data);
            setCharInfo(data.character);
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
                                <p>Min. Level: <span style={{ color: charInfo.level >= place.minLevel? "#51FF35": "#F00000" }}>{place.minLevel}</span></p>
                                <button className='btn-inside' onClick={(evt) => handleClick(evt, place.name)}>Join</button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default HuntingPlaces;
