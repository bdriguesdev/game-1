import React, { useContext, useState } from 'react';

import './Loot.css';
import images from '../../utils/images';
import MainContext from '../../contexts/MainContext.js';

const Loot = props => {
    const [isLootExpanded, setIsLootExpanded] = useState(false);
    const [isDetailsActive, setIsDetailsActive] = useState(false);
    const [itemInfo, setItemInfo ] = useState(null);

    const { charInfo } = useContext(MainContext);

    const handleClick = evt => {
        setIsLootExpanded(prev => !prev);
    };
    const handleDragStart = (evt, data) => {
        console.log('start');
        evt.dataTransfer.setData('location', data.location);
        evt.dataTransfer.setData('position', data.position);
        evt.dataTransfer.setData('quantity', data.quantity);
    };
    const handleDragOver = evt => {
        console.log('over');
        evt.preventDefault();
    }
    const handleMouseEnter = (evt, slot) => {
        const { target } = evt;
        const details = document.getElementById('loot-details');
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
    return(
        <div className={isLootExpanded? 'loot-container-active': 'loot-container' }>
            <div className={`loot-details`} hidden={isDetailsActive? false: true} id='loot-details'>
                {
                    itemInfo && ([
                        <p key='item-name'>{itemInfo.name}</p>,
                        <p key='item-type'>{itemInfo.type}</p>,
                        <p key='item-tier'>{itemInfo.tier}</p>
                    ])
                }
            </div>
            {
                isLootExpanded?
                    (
                        <React.Fragment>
                            <ul className="loot-slots">
                                { 
                                    charInfo.slots.loot.map((slot, index) => {
                                        return (
                                            <li 
                                                onDragOver={handleDragOver}
                                                className='loot-slot' 
                                                key={index}
                                                onMouseEnter={evt => handleMouseEnter(evt, slot)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                    {slot === 0? 0 : (<p style={{ backgroundImage: `url('${images[slot.id]}')` }} onMouseEnter={evt => handleMouseEnter(evt, slot)} onDragStart={evt => handleDragStart(evt, { location: 'loot', position: index, quantity: slot.quantity })} draggable='true'></p>)}
                                            </li>
                                        );
                                    })
                                }
                            </ul> 
                            <button className="loot-btn" onClick={handleClick}>-</button> 
                        </React.Fragment>
                    ):
                    (
                        <button className='loot-btn btn2-size' onClick={handleClick}>Loot +</button>
                    )
            }
        </div>
    );
};

export default Loot;