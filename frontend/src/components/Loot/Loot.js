import React, { useContext, useState } from 'react';

import './Loot.css';
import MainContext from '../../contexts/MainContext.js';

const Loot = props => {
    const [isLootExpanded, setIsLootExpanded] = useState(false);

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
    return(
        <div className={isLootExpanded? 'loot-container-active': 'loot-container' }>
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
                                            >
                                                    {slot === 0? 0 : (<p onDragStart={evt => handleDragStart(evt, { location: 'loot', position: index, quantity: slot.quantity })} draggable='true'>1</p>)}
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