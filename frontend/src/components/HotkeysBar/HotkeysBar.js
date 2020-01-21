import React, { useState, useContext } from 'react';

import './HotkeysBar.css';
import MainContext from '../../contexts/MainContext.js';

const HotkeysBar = props => {
    const [isHotkeysExpanded, setIsHotkeysExpanded] = useState(true);

    const { charId, charInfo, setCharInfo, setCharacterAttack } = useContext(MainContext);

    const handleClick = evt => {
        setIsHotkeysExpanded(prev => {
            return !prev;
        });
    };
    const handleAttack = (evt, spell) => {
        console.log(spell);
        if(spell === 0) {
            console.log('empty');
            return;
        }
        const requestBody = {
            charId,
            spell
        }
        fetch('http://localhost:8000/battle/attack', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            } 
        }).then(res => {
            return res.json();
        }).then(data => {
            setCharInfo(data.character);
            setCharacterAttack(data.characterAttack);
            setTimeout(() => {
                setCharacterAttack(null);
            }, 500);
        }).catch(err => {
            console.log(err);
        })
    };
    return (
        <div className={isHotkeysExpanded? 'hotkeys-container-active': 'hotkeys-container'}>
            {
                isHotkeysExpanded?
                    (
                        <React.Fragment>
                            <div className='hotkeys-btn' onClick={handleClick}>-</div>
                            <div className='hotkeys'>
                                <div className="hotkeys-container-slots" hidden={!isHotkeysExpanded}>
                                    <div className="hotkeys-pots">
                                        <ul className='hotkeys-pots-slots'>
                                            {
                                                charInfo.hotkeys.potions.map((slot, index) => {
                                                    return (
                                                        <li key={index} className='hotkeys-pots-slot'>
                                                            {slot === 0? 0: (<p>1</p>)}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="hotkeys-spells">
                                            <ul className="hotkeys-spells-slots">
                                                {
                                                    charInfo.hotkeys.spells.map((slot, index) => {
                                                        return (
                                                            <li key={index} className="hotkeys-spells-slot" onClick={evt => handleAttack(evt, slot.hotkey)}>
                                                                {slot === 0? 0: (<p>1</p>)}
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ):
                    (
                        <div className='hotkeys-btn btn-size' onClick={handleClick}>Hotkeys +</div>
                    )
            }
            
        </div>
    );
};

export default HotkeysBar;