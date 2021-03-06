import React, { useState } from 'react';
import { connect } from 'react-redux';

import ItemDetails from '../ItemDetails/ItemDetails';
import './Inventory.css';
import images from '../../utils/images';
import { setCharacter } from '../../actions/character'
import { moveInv, moveFromShopToInv, moveFromPotionsToInv, moveFromSetToInv } from '../../actions/inventory';
import { useItem } from '../../actions/battle';

const mapStateToProps = state => {
    return {
        character: state.character
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCharacter: character => dispatch(setCharacter(character)),
        moveInv: data => dispatch(moveInv(data)),
        moveFromShopToInv: data => dispatch(moveFromShopToInv(data)),
        moveFromPotionsToInv: data => dispatch(moveFromPotionsToInv(data)),
        moveFromSetToInv: data => dispatch(moveFromSetToInv(data)),
        useItem: data => dispatch(useItem(data))
    };
};

const ConnectedInventory = props => {
    const [itemInfo, setItemInfo] = useState(null);
    const [slotPosition, setSlotPosition] = useState(null);

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
        const position = isNaN(+evt.dataTransfer.getData('position'))? evt.dataTransfer.getData('position'): +evt.dataTransfer.getData('position');
        const quantity = evt.dataTransfer.getData('quantity');
        if(!location || !position || !quantity) {
            if(position !== 0) {
                console.log('error!3');
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
        };
        if(location === 'set') {
            props.moveFromSetToInv(bodyRequest);
        } else if( location === 'shop') {
            props.moveFromShopToInv(bodyRequest);
        } else if(location === 'potions') {
            props.moveFromPotionsToInv(bodyRequest);
        } else {
            props.moveInv(bodyRequest);
        }
    }

    const handleMouseOver = (evt, slot) => {
        const { target } = evt;
        if(slot !== 0) {
            setItemInfo(slot);
            setSlotPosition({
                top: target.offsetTop,
                left: target.offsetLeft
            });
        }
    };

    const handleMouseOut = () => {
        setItemInfo(null);
    }

    const handleUseItem = (from) => {
        const bodyRequest = {
            charId: props.character._id,
            from
        };
        props.useItem(bodyRequest);
    };

    return (
        <div className="inventory-container">
            <ItemDetails itemInfo={itemInfo} slotPosition={slotPosition} />
            <ul className='inventory-slots'>
                {
                    props.character.slots.inventory.map((slot, index) => {
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
                                {
                                    slot === 0? 
                                        ""
                                        : 
                                        (<p 
                                            style={{ backgroundImage: `url('${images[slot.id]}')` }} onDoubleClick={() => 
                                            handleUseItem({ location: 'inventory', position: index, quantity: slot.quantity })} 
                                            onMouseEnter={evt => handleMouseOver(evt, slot)} 
                                            onDragStart={evt => handleDragStart(evt, { location: 'inventory', position: index, quantity: slot.quantity })} 
                                            draggable='true'
                                        >
                                        </p>)
                                }
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

const Inventory = connect(mapStateToProps, mapDispatchToProps)(ConnectedInventory);

export default Inventory;