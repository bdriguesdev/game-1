import React, { useContext } from 'react';

import './DepotContainer.css';
import MainContext from '../../contexts/MainContext'

const DepotContainer = props => {

    const { charInfo, setCharInfo, charId } = useContext(MainContext);
    
    const handleDragStart = (evt, data) => {
        console.log('start');
        evt.dataTransfer.setData('location', data.location);
        evt.dataTransfer.setData('position', data.position);
        evt.dataTransfer.setData('quantity', data.quantity);
    };
    const handleDragOver = evt => {
        evt.preventDefault();
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
        const bodyRequest = {
            charId,
            from: {
                location,
                position,
                quantity: quantity? +quantity: 0
            },
            to: {
                location: data.location,
                position: +data.position,
                quantity: data.quantity? +data.quantity: 0
            }
        }
        fetch('http://localhost:8000/inventory' , {
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
            console.log(data.message);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="depot-inventory">
            <ul
                className='inventory-slots'
            >
                {
                    charInfo.slots.depot.map((slot, index) => {
                        return (
                            <li
                                key={index}
                                className='inventory-slot'
                                onDragOver={handleDragOver}
                                onDrop={evt => handleDrop(evt, { location: 'inventory', position: index, quantity: slot.quantity })}
                            >
                                {slot === 0 ? 0 : <p draggable={true} onDragStart={evt => handleDragStart(evt, { location: 'depot', position: index, quantity: slot.quantity})}>1</p>}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default DepotContainer;