import React, { useState } from 'react';
import { connect } from 'react-redux';

import './Loot.css';
import images from '../../utils/images';
import ItemDetails from '../../components/ItemDetails/ItemDetails'

const mapStateToProps = state => {
    return {
        character: state.character
    };
};

const ConnectedLoot = props => {
    const [isLootExpanded, setIsLootExpanded] = useState(false);
    const [itemInfo, setItemInfo ] = useState(null);
    const [slotPosition, setSlotPosition] = useState(null);

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
    return(
        <div className={isLootExpanded? 'loot-container-active': 'loot-container' }>
            <ItemDetails itemInfo={itemInfo} slotPosition={slotPosition} where={"loot"} />
            {
                isLootExpanded?
                    (
                        <React.Fragment>
                            <ul className="loot-slots">
                                { 
                                    props.character.slots.loot.map((slot, index) => {
                                        return (
                                            <li 
                                                onDragOver={handleDragOver}
                                                className='loot-slot' 
                                                key={index}
                                                onMouseEnter={evt => handleMouseEnter(evt, slot)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                    {slot === 0? "" : (<p style={{ backgroundImage: `url('${images[slot.id]}')` }} onMouseEnter={evt => handleMouseEnter(evt, slot)} onDragStart={evt => handleDragStart(evt, { location: 'loot', position: index, quantity: slot.quantity })} draggable='true'></p>)}
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

const Loot = connect(mapStateToProps)(ConnectedLoot);

export default Loot;