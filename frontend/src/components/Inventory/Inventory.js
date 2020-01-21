import React, { useState, useContext } from 'react';

import './Inventory.css';
import images from '../../utils/images';
import MainContext from '../../contexts/MainContext';

const Inventory = props => {
    const [itemInfo, setItemInfo] = useState(null);
    const [isDetailsActive, setIsDetailsActive] = useState(false);

    const { charId, charInfo, setCharInfo } = useContext(MainContext);

    const handleDragStart = (evt, data) => {
        handleMouseOut();
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
        if(location === 'set') {
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
            fetch('http://localhost:8000/characet/set' , {
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
        } else {
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
    }

    const handleMouseOver = (evt, slot) => {
        const { target } = evt;
        const details = document.getElementById('details');
        if(slot !== 0) {
            details.style.top = `${target.offsetTop - 10}px`
            details.style.left = `${target.offsetLeft + 45}px`
            setItemInfo(slot);
            setIsDetailsActive(true);
        }
    };

    const handleMouseOut = evt => {
        setIsDetailsActive(false);
    }

    return (
        <div className="inventory-container">
            <div className={`inventory-details`} hidden={isDetailsActive? false: true} id='details'>
                {
                    itemInfo && ([
                        <p key='item-name'>{itemInfo.name}</p>,
                        <p key='item-type'>{itemInfo.type}</p>,
                        <p key='item-tier'>{itemInfo.tier}</p>
                    ])
                }
            </div>
            <ul className='inventory-slots'>
                {
                    charInfo.slots.inventory.map((slot, index) => {
                        return (
                            <li 
                                data-location={slot === 0? null: 'inventory'} 
                                data-position={slot === 0? null: index}
                                data-quantity={slot === 0? null: slot.quantity}
                                data-name={slot === 0 ? null: slot.name}
                                data-stats={slot === 0 ? null: slot.stats.join(' ')}
                                className='inventory-slot'
                                key={index}
                                onDragOver={handleDragOver}
                                onDrop={evt => handleDrop(evt, { location: 'inventory', position: index, quantity: slot.quantity })}
                                onMouseEnter={evt => handleMouseOver(evt, slot)}
                                onMouseLeave={handleMouseOut}
                            >
                                {slot === 0? 0: (<p style={{ backgroundImage: `url('${images[slot.id]}')` }} onMouseEnter={evt => handleMouseOver(evt, slot)} onDragStart={evt => handleDragStart(evt, { location: 'inventory', position: index, quantity: slot.quantity })} draggable='true'></p>)}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default Inventory;