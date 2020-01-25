import React, { useState } from 'react';
import { connect } from 'react-redux';

import ItemDetails from '../ItemDetails/ItemDetails';
import './SetInventory.css';
import images from '../../utils/images';
import { setCharacter } from '../../actions/character';
import { moveFromSetToInv } from '../../actions/inventory';

const mapStateToProps = state => {
    return {
        character: state.character
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCharacter: character => dispatch(setCharacter(character)),
        moveFromSetToInv: data => dispatch(moveFromSetToInv(data))
    };
};

const ConnectedSetInventory = props => {
    const [itemInfo, setItemInfo] = useState(null);
    const [slotPosition, setSlotPosition] = useState(null);

    const handleDragStart = (evt, data) => {
        console.log('start');
        evt.dataTransfer.setData('location', data.location);
        evt.dataTransfer.setData('position', data.position);
        evt.dataTransfer.setData('quantity', data.quantity);
        console.log(data.position)
    };

    const handleDrop = (evt, data) => {
        console.log('drop');
        //from info
        const location = evt.dataTransfer.getData('location');
        const position = +evt.dataTransfer.getData('position');
        const quantity = evt.dataTransfer.getData('quantity');
        if(!location || !position || !quantity) {
            if(position !== 0) {
                console.log('error!1');
                return;
            }
        }
        if(location === 'set') {
            console.log('error!2');
            return;
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
                position: data.position,
                quantity: data.quantity? +data.quantity: 0
            }
        }
        props.moveFromSetToInv(bodyRequest);
    };

    const handleDragOver = evt => {
        evt.preventDefault();
    };

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

    const itemsSetPosition = ['amulet', 'helmet', 'rune', 'weapon1', 'bodyArmour', 'weapon2', 'gloves', 'legs', 'ring', 'boots']

    return (
        <div className="set-container">
            <ItemDetails itemInfo={itemInfo} slotPosition={slotPosition} />
            <ul>
                {
                    itemsSetPosition.map((key, index) => {
                        return (
                            <li
                                key={index}
                                onDrop={evt => handleDrop(evt, { location: 'set', position: key, quantity: 1 })}
                                onDragOver={handleDragOver}
                                onMouseEnter={evt => handleMouseEnter(evt, props.character.set[key])}
                                onMouseLeave={handleMouseLeave}
                            >
                                {props.character.set[key] === 0 ? <p style={{ backgroundImage: `url('${images[key]}')` }}></p> : <p style={{ backgroundImage: `url('${images[props.character.set[key].id]}')` }} onMouseEnter={evt => handleMouseEnter(evt, props.character.set[key])} draggable={true} onDragStart={evt => handleDragStart(evt, { location: 'set', position: key, quantity: 1 })}></p>}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

const SetInventory = connect(mapStateToProps, mapDispatchToProps)(ConnectedSetInventory);

export default SetInventory;