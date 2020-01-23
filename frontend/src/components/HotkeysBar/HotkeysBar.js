import React, { useState, useContext } from 'react';

import './HotkeysBar.css';
import MainContext from '../../contexts/MainContext.js';
import images from '../../utils/images';

const HotkeysBar = props => {
    const [isHotkeysExpanded, setIsHotkeysExpanded] = useState(true);

    const { charId, charInfo, setCharInfo } = useContext(MainContext);

    const handleClick = evt => {
        setIsHotkeysExpanded(prev => {
            return !prev;
        });
    };

    const lootDropAnimation = (value) => {
        const lootSlots = document.querySelectorAll('.loot-slot');
        if(lootSlots) {
            for(let x = 0; x < value; x++) {
                lootSlots[x].classList.add('loot-slot-new');
                setTimeout(() => {
                    lootSlots[x].classList.remove('loot-slot-new');
                }, 2000);
            }
        }
    };

    const goldCoinsDropAnimation= (drop) => {
        const container = document.querySelector('.battlefield .character-container');
        const gold = document.createElement('div');
        gold.textContent = "+" + drop;
        gold.classList.add('character-gold-drop');
        container.appendChild(gold);
        setTimeout(() => {
            container.removeChild(gold);
        }, 2000);
    };

    const displayAttackAnimation = (model, stats) => {
        const content = document.querySelector(`.${model}-animation`);
        const attacks = [];
        if(stats.physicalDamage > 0) {
            const physical = document.createElement('div');
            physical.textContent = "-" + stats.physicalDamage;
            physical.classList.add(`${model}-physical-attack`);
            attacks.push(physical);
        }
        if(stats.fireDamage > 0) {
            const fire = document.createElement('div');
            fire.textContent = "-" + stats.fireDamage;
            fire.classList.add(`${model}-fire-attack`);
            attacks.push(fire);
        }
        if(stats.lightningDamage > 0) {
            const lightning = document.createElement('div');
            lightning.textContent = "-" + stats.lightningDamage;
            lightning.classList.add(`${model}-lightning-attack`);
            attacks.push(lightning);
        }
        attacks.forEach(attack => {
            content.appendChild(attack);
            setTimeout(() => {
                content.removeChild(attack);
            }, 1000);
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
            if (data.character.goldCoins - charInfo.goldCoins > 0) {
                goldCoinsDropAnimation(data.character.goldCoins - charInfo.goldCoins);
            }
            setCharInfo(data.character);
            if(data.characterAttack.totalDamage > 0) {
                displayAttackAnimation('enemy', data.characterAttack);
            } 
            if(data.monsterAttack.totalDamage > 0) {
                displayAttackAnimation('character', data.monsterAttack);
            }
            if(data.itemsDroppedQuant && data.itemsDroppedQuant > 0) {
                console.log('DROP');
                lootDropAnimation(data.itemsDroppedQuant);
            }
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
                                                                {slot === 0? "": (<p style={{backgroundImage: `url('${images[slot.hotkey]}')`}} className="hotkey-spell-icon"></p>)}
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