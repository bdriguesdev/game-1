import React, { useContext, useState } from 'react';

import ItemDetails from '../ItemDetails/ItemDetails';
import './DepotContainer.css';
import images from '../../utils/images';
import MainContext from '../../contexts/MainContext'

const DepotContainer = props => {
    const [itemInfo, setItemInfo] = useState(null);
    const [slotPosition, setSlotPosition] = useState(null);

    const { charInfo, setCharInfo, charId } = useContext(MainContext);
    
    const handleDragStart = (evt, data) => {
        handleMouseLeave();
        evt.dataTransfer.setData('location', data.location);
        evt.dataTransfer.setData('position', data.position);
        evt.dataTransfer.setData('quantity', data.quantity);
    };
    const handleDragOver = evt => {
        evt.preventDefault();
    };
    const handleDrop = (evt, data) => {
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
        }).catch(err => {
            console.log(err);
        })
    }

    const handleMouseEnter = (evt, slot) => {
        const { target } = evt;
        if(slot !== 0) {
            setItemInfo(slot);
            setSlotPosition({
                top: target.offsetTop,
                left: target.offsetLeft
            });
        }
    };

    const handleMouseLeave = () => {
        setItemInfo(null);
    }

    return (
        <div className="depot-inventory">
            <ItemDetails itemInfo={itemInfo} slotPosition={slotPosition} />
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
                                onDrop={evt => handleDrop(evt, { location: 'depot', position: index, quantity: slot.quantity })}
                                onMouseEnter={evt => handleMouseEnter(evt, slot)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {slot === 0 ? "" : <p style={{ backgroundImage: `url('${images[slot.id]}')` }} onMouseEnter={evt => handleMouseEnter(evt, slot)} draggable={true} onDragStart={evt => handleDragStart(evt, { location: 'depot', position: index, quantity: slot.quantity})}></p>}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default DepotContainer;