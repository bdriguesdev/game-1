import React, { useState, useContext } from 'react';

import ItemDetails from '../ItemDetails/ItemDetails';
import MainContext from '../../contexts/MainContext';
import images from '../../utils/images';
import shop from '../../utils/shop';
import './ShopContainer.css';

const ShopContainer = () => {
    const [itemInfo, setItemInfo] = useState(null);
    const [selling, setSelling] = useState(false);
    const [slotPosition, setSlotPosition] = useState(null);

    const { charId, setCharInfo } = useContext(MainContext);

    const changeSellingMode = (value) => {
        const sell = document.querySelector('.shop-sell');
        const buy = document.querySelector('.shop-buy');

        if(value === true) {
            buy.style.borderColor = 'transparent';
            sell.style.borderBottom = '2px solid white';
        } else {
            buy.style.borderBottom = '2px solid white';
            sell.style.borderColor = 'transparent';
        }
        setSelling(value);
    };
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
        if(location === 'inventory') {
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
            fetch('http://localhost:8000/shop' , {
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

    return (
        <div className="shop-slots-container">
            <ItemDetails itemInfo={itemInfo} slotPosition={slotPosition} type={"selling"} />
            <div className="shop-options">
                <p onClick={() => changeSellingMode(true)} className="shop-sell">Sell</p>
                <p onClick={() => changeSellingMode(false)} className="shop-buy">Buy</p>
            </div>
            <ul className='shop-slots'>
                {
                    !selling ?
                    shop.map((item, index) => {
                        return (
                            <li 
                                className='shop-slot'
                                key={index}
                                onDragOver={handleDragOver}
                                onDrop={evt => handleDrop(evt, { location: 'shop', position: index, quantity: item.quantity })}
                                onMouseEnter={evt => handleMouseOver(evt, item)}
                                onMouseLeave={handleMouseOut}
                            >
                                {item === 0? "": (<p style={{ backgroundImage: `url('${images[item.id]}')` }} onMouseEnter={evt => handleMouseOver(evt, item)} onDragStart={evt => handleDragStart(evt, { location: 'shop', position: index, quantity: item.quantity })} draggable='true'></p>)}
                            </li>
                        );
                    }):
                    shop.map((slot, index) => {
                        return (
                            <li 
                                className='shop-slot'
                                key={index}
                                onDragOver={handleDragOver}
                                onDrop={evt => handleDrop(evt, { location: 'shop', position: index, quantity: slot.quantity })}
                            >
                                {""}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default ShopContainer;