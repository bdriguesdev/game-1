import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './HotkeysBar.scss';
import ItemDetails from '../ItemDetails/ItemDetails';
import images from '../../utils/images';
import { setCharacter } from '../../actions/character';
import { moveFromPotionsToInv } from '../../actions/inventory';
import { useItem, attack } from '../../actions/battle';
import plusSVG from '../../assets/add.svg';
import minusSVG from '../../assets/remove.svg';
 
const mapStateToProps = state => {
    return {
        character: state.character
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCharacter: character => dispatch(setCharacter(character)),
        moveFromPotionsToInv: data => dispatch(moveFromPotionsToInv(data)),
        useItem: data => dispatch(useItem(data)),
        attack: data => dispatch(attack(data))
    };
};

const ConnectedHotkeysBar = props => {
    const [isHotkeysExpanded, setIsHotkeysExpanded] = useState(true);
    const [itemInfo, setItemInfo] = useState(null);
    const [slotPosition, setSlotPosition] = useState(null);
    const [spellCooldown, setSpellCooldown] = useState(false);
    const [spellHotkeys] = useState(['Q', 'W', 'E', 'R', 'T', 'Y']);

    useEffect(() => {
        document.addEventListener('keyup', handleHotkeysKeys);
        return () => {
            document.removeEventListener('keyup', handleHotkeysKeys);
        }
    });

    const handleHotkeysKeys = evt => {
        const keys = {
            '1': [0, 'potions'],
            '2': [1, 'potions'],
            '3': [2, 'potions'],
            '4': [3, 'potions'],
            'Q': [0, 'spells'],
            'W': [1, 'spells'],
            'E': [2, 'spells'],
            'R': [3, 'spells'],
            'T': [4, 'spells'],
            'Y': [5, 'spells']
        };
        const keyPressedInfo = keys[String.fromCharCode(evt.keyCode)];
        if(keyPressedInfo) {
            const action = props.character.hotkeys[keyPressedInfo[1]][keyPressedInfo[0]];
            if(action !== 0) {
                if(keyPressedInfo[1] === 'potions') {
                    props.useItem({ charId: props.character._id, from: { location: 'potions', position: keyPressedInfo[0], quantity: 1 } });
                } else if(!spellCooldown) {
                    props.attack({ charId: props.character._id, spell: action.hotkey })
                        .then(({ data }) => {
                            displayAnimation(data.character, data.itemsDroppedQuant, data.characterAttack, data.monsterAttack);
                            props.setCharacter(data.character);
                            setSpellCooldown(true);
                            setTimeout(() => {
                                setSpellCooldown(false);
                            }, 500);
                        }).catch(err => {
                            console.log(err);
                        });
                }
            }
        }
    };

    const handleClick = () => {
        setIsHotkeysExpanded(prev => {
            return !prev;
        });
    };

    const lootDropAnimation = (value) => {
        const lootSlots = document.querySelectorAll('.loot-slot');
        if(lootSlots.length > 0) {
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
        if(spell === 0) {
            console.log('empty');
            return;
        }
        const requestBody = {
            charId: props.character._id,
            spell
        };
        if(!spellCooldown) {
            console.log(spell);
            props.attack(requestBody)
            .then(({ data }) => {
                displayAnimation(data.character, data.itemsDroppedQuant, data.characterAttack, data.monsterAttack);
                props.setCharacter(data.character);
                setSpellCooldown(true);
                setTimeout(() => {
                    setSpellCooldown(false);
                }, 1000);
            }).catch(err => {
                console.log(err);
            });
        }
    };

    const displayAnimation = (character, itemsDroppedQuant, characterAttack, monsterAttack) => {
        if (character.goldCoins - props.character.goldCoins > 0) {
            goldCoinsDropAnimation(character.goldCoins - props.character.goldCoins);
        }
        if(characterAttack.totalDamage > 0) {
            displayAttackAnimation('enemy', characterAttack);
        } 
        if(monsterAttack.totalDamage > 0) {
            displayAttackAnimation('character', monsterAttack);
        }
        if(itemsDroppedQuant && itemsDroppedQuant > 0) {
            console.log('DROP');
            lootDropAnimation(itemsDroppedQuant);
        }
    };

    const handleDragStart = (evt, data) => {
        // handleMouseOut();
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
            props.moveFromPotionsToInv(bodyRequest);
        }
    }

    const handleUseItem = (from) => {
        const bodyRequest = {
            charId: props.character._id,
            from
        };
        props.useItem(bodyRequest);
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

    return (
        <div className={isHotkeysExpanded? 'hotkeys-container-active': 'hotkeys-container'}>
            {
                isHotkeysExpanded?
                    (
                        <React.Fragment>
                            <div className='hotkeys-btn' onClick={handleClick}>
                                <img src={minusSVG} alt="close"/>
                            </div>
                            <div className='hotkeys'>
                                <div className="hotkeys-container-slots" hidden={!isHotkeysExpanded}>
                                    <ItemDetails itemInfo={itemInfo} slotPosition={slotPosition} />
                                    <div className="hotkeys-pots">
                                        <ul className='hotkeys-pots-slots'>
                                            {
                                                props.character.hotkeys.potions.map((slot, index) => {
                                                    return (
                                                        <li 
                                                            key={index} 
                                                            className='hotkeys-pots-slot'
                                                            data-location={slot === 0? null: 'inventory'} 
                                                            data-position={slot === 0? null: index}
                                                            data-quantity={slot === 0? null: slot.quantity}
                                                            data-name={slot === 0 ? null: slot.name}
                                                            onDragOver={handleDragOver}
                                                            onDrop={evt => handleDrop(evt, { location: 'potions', position: index, quantity: slot.quantity })}
                                                            onMouseEnter={evt => handleMouseEnter(evt, slot)}
                                                            onMouseLeave={handleMouseLeave}
                                                        >
                                                            {
                                                                slot === 0? 
                                                                    <p style={{ backgroundImage: `url('${images['potions']}')` }} >
                                                                        <span className="key-hotkey">{index + 1}</span>
                                                                    </p>
                                                                    : 
                                                                    (<p 
                                                                        style={{ backgroundImage: `url('${images[slot.id]}')` }} 
                                                                        onMouseEnter={evt => handleMouseEnter(evt, slot)} 
                                                                        onDoubleClick={() => handleUseItem({ location: 'potions', position: index, quantity: slot.quantity })} 
                                                                        onDragStart={evt => handleDragStart(evt, { location: 'potions', position: index, quantity: slot.quantity })} 
                                                                        draggable="true" 
                                                                    >
                                                                        <span className="key-hotkey">{index + 1}</span>
                                                                    </p>)
                                                            }
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="hotkeys-spells">
                                            <ul className="hotkeys-spells-slots">
                                                {
                                                    props.character.hotkeys.spells.map((slot, index) => {
                                                        return (
                                                            <li 
                                                                key={index} 
                                                                className="hotkeys-spells-slot" 
                                                                onClick={evt => handleAttack(evt, slot.hotkey)}
                                                                onMouseEnter={evt => handleMouseEnter(evt, slot)}
                                                                onMouseLeave={handleMouseLeave}
                                                            >
                                                                {
                                                                    slot === 0? 
                                                                        <span className="key-hotkey">{spellHotkeys[index]}</span>
                                                                        : 
                                                                        (<p 
                                                                            style={{ backgroundImage: `url('${images[slot.hotkey]}')` }} 
                                                                            onMouseEnter={evt => handleMouseEnter(evt, slot)} 
                                                                            className="hotkey-spell-icon"
                                                                        >
                                                                            <span className="key-hotkey">{spellHotkeys[index]}</span>
                                                                            {
                                                                                spellCooldown && <span className="spell-cooldown"></span>
                                                                            }
                                                                        </p>)
                                                                }
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
                        <div className='hotkeys-btn btn-size' onClick={handleClick}>
                            { 'Hotkeys ' }
                            <img src={plusSVG} alt="open"/>
                        </div>
                    )
            }
            
        </div>
    );
};

const HotkeysBar = connect(mapStateToProps, mapDispatchToProps)(ConnectedHotkeysBar);

export default HotkeysBar;