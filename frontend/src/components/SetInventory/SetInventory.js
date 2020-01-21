import React, { useContext } from 'react';

import './SetInventory.css';
import MainContext from '../../contexts/MainContext';

const SetInventory = props => {

    const { charInfo, setCharInfo, charId } = useContext(MainContext);

    const handleDragStart = (evt, data) => {
        console.log('start');
        evt.dataTransfer.setData('location', data.location);
        evt.dataTransfer.setData('position', data.position);
        evt.dataTransfer.setData('quantity', data.quantity);
    };

    const handleDrop = (evt, data) => {
        console.log('drop');
        //from info
        const location = evt.dataTransfer.getData('location');
        const position = +evt.dataTransfer.getData('position');
        const quantity = evt.dataTransfer.getData('quantity');
        if(!location || !position || !quantity) {
            if(position !== 0) {
                console.log('error!');
                return;
            }
        }
        if(location === 'set') {
            console.log('error!');
            return;
        }
        const bodyRequest = {
            charId,
            from: {
                location,
                position,
                quantity: quantity? +quantity: 0
            },
            to: {
                location: data.location,
                position: data.position,
                quantity: data.quantity? +data.quantity: 0
            }
        }
        fetch('http://localhost:8000/character/set' , {
            method: 'POST',
            body: JSON.stringify(bodyRequest),
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
            setCharInfo(data.character);
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    };

    const handleDragOver = evt => {
        evt.preventDefault();
    };

    return (
        <div className="set-container">
            <ul>
                {
                    Object.keys(charInfo.set).map((key, index) => {
                        return (
                            <li
                                key={index}
                                onDrop={evt => handleDrop(evt, { location: 'set', position: key, quantity: 1 })}
                                onDragOver={handleDragOver}
                            >
                                {charInfo.set[key] === 0 ? 0 : <p draggable={true} onDragStart={evt => handleDragStart(evt, { location: 'set', position: key, quantity: 1 })}>1</p>}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default SetInventory;