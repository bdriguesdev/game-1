import React, { useContext, useState } from 'react';

import './DepotContainer.css';
import images from '../../utils/images';
import statsNames from '../../utils/statsNames';
import MainContext from '../../contexts/MainContext'

const DepotContainer = props => {
    const [itemInfo, setItemInfo] = useState(null);
    const [isDetailsActive, setIsDetailsActive] = useState(false);

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
        const details = document.getElementById('depot-details');
        if(slot !== 0) {
            details.style.top = `${target.offsetTop - 10}px`
            details.style.left = `${target.offsetLeft + 45}px`
            setItemInfo(slot);
            setIsDetailsActive(true);
        }
    };

    const handleMouseLeave = evt => {
        setIsDetailsActive(false);
    }

    return (
        <div className="depot-inventory">
            <div className={`depot-details`} hidden={isDetailsActive? false: true} id='depot-details'>
                {
                    itemInfo && ([
                        <p className="strong" key='item-name'>T{itemInfo.tier} {itemInfo.name}</p>,
                        <div className="detail-line" key="line-one"></div>,
                        <p className="medium" key='item-type'>{statsNames[itemInfo.type]}</p>,
                        itemInfo.base.map((stat, index) => {
                            return (
                                <p className="medium" key={"base"+index}>{statsNames[stat.stat]} +{stat.value}</p>
                            )
                        }),
                        <div className="detail-line" key="line-two"></div>,
                        itemInfo.stats.map((stat, index) => {
                            return (
                                <p className="light" key={"stat"+index}>{statsNames[stat.stat]} +{stat.value}</p>
                            )
                        }),
                    ])
                }
            </div>
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