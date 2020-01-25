import React, { useState } from 'react';
import { connect } from 'react-redux';

import ItemDetails from '../ItemDetails/ItemDetails';
import './DepotContainer.css';
import images from '../../utils/images';
import { setCharacter } from '../../actions/character';
import {moveInv } from '../../actions/inventory';

const mapStateToProps = state => {
    return {
        character: state.character
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCharacter: character => dispatch(setCharacter(character)),
        moveInv: data => dispatch(moveInv(data))
    };
};

const ConnectedDepotContainer = props => {
    const [itemInfo, setItemInfo] = useState(null);
    const [slotPosition, setSlotPosition] = useState(null);
    
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
            charId: props.character._id,
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
        props.moveInv(bodyRequest);
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
                    props.character.slots.depot.map((slot, index) => {
                        return (
                            <li
                                key={index}
                                className='inventory-slot'
                                onDragOver={handleDragOver}
                                onDrop={evt => handleDrop(evt, { location: 'depot', position: index, quantity: slot.quantity })}
                                onMouseEnter={evt => handleMouseEnter(evt, slot)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {
                                    slot === 0 ? 
                                        "" 
                                        : 
                                        <p 
                                            style={{ backgroundImage: `url('${images[slot.id]}')` }} 
                                            onMouseEnter={evt => handleMouseEnter(evt, slot)} 
                                            draggable={true} onDragStart={evt => 
                                            handleDragStart(evt, { location: 'depot', position: index, quantity: slot.quantity})}
                                        >
                                        </p>
                                }
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

const DepotContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedDepotContainer);

export default DepotContainer;