import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './Talents.scss';
import { setCharacter } from '../../actions/character';
import addSVG from '../../assets/add.svg';
import removeSVG from '../../assets/remove.svg';

const mapStateToProps = state => {
    return {
        character: state.character
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCharacter: character => dispatch(setCharacter(character))
    };
};

const ConnectedTalents = props => {
    const [strength, setStrength] = useState(0);
    const [dexterity, setDexterity] = useState(0);
    const [intelligence, setIntelligence] = useState(0);
    const [resistance, setResistance] = useState(0);
    const [talentsPointsLeft, setTalentsPointsLeft] = useState(0);

    useEffect(() => {
        setStrength(props.character.talents.strength);
        setDexterity(props.character.talents.dexterity);
        setIntelligence(props.character.talents.intelligence);
        setResistance(props.character.talents.resistance);
        const talentPoints = props.character.talentPoints - (props.character.talents.strength + props.character.talents.dexterity + props.character.talents.intelligence + props.character.talents.resistance);
        setTalentsPointsLeft(talentPoints);
    }, [])

    const handleAddClick = (evt, func) => {
        if(talentsPointsLeft > 0) {
            if(func === 'str') {
                setStrength(prev => prev + 1);
                setTalentsPointsLeft(prev => prev - 1);
            } else if (func === 'dex') {
                setDexterity(prev => prev + 1);
                setTalentsPointsLeft(prev => prev - 1);
            } else if (func === 'int') {
                setIntelligence(prev => prev + 1);
                setTalentsPointsLeft(prev => prev - 1);
            } else if (func === 'res') {
                setResistance(prev => prev + 1);
                setTalentsPointsLeft(prev => prev - 1);
            }
        } else {
            console.log('error');
        }
    };

    const handleMinusClick = (evt, func) => {
        if(func === 'str') {
            if(strength > 0) {
               setStrength(prev => prev - 1);
            setTalentsPointsLeft(prev => prev + 1); 
            }
        } else if (func === 'dex') {
            if(dexterity > 0) {
              setDexterity(prev => prev - 1);
            setTalentsPointsLeft(prev => prev + 1);  
            }
        } else if (func === 'int') {
            if(intelligence > 0) {
              setIntelligence(prev => prev - 1);
            setTalentsPointsLeft(prev => prev + 1);  
            }
        } else if (func === 'res') {
            if(resistance > 0) {
                setResistance(prev => prev - 1);
            setTalentsPointsLeft(prev => prev + 1);
            }
        }
    };

    const handleSubmit = evt => {
        const bodyRequest = {
            talents: {
                strength,
                dexterity,
                intelligence,
                resistance
            },
            charId: props.character._id
        };
        fetch('http://localhost:8000/character/talents', {
            method: 'POST',
            body: JSON.stringify(bodyRequest), 
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            props.setCharacter(data);
        }).catch(err => {
            console.log(err);
        })
    };

    return (
        <div className="talents-container">
            <h1>Talents</h1>
            <div className="talents-box">
                <h3>{talentsPointsLeft} talents points left</h3>
                <div className="talents-stats">
                    <div className="talent-box">
                        <div className="talent-circle str"><p>STR</p></div>
                        <div className="talent-selector">
                            <span className="talent-plus" onClick={evt => handleAddClick(evt, 'str')}>
                                <img src={addSVG} alt="Plus" />
                            </span>
                            <span className='talent-value'>{strength}</span>
                            <span className="talent-minus" onClick={evt => handleMinusClick(evt, 'str')}>
                                <img src={removeSVG} alt="Minus" />
                            </span>
                        </div>
                    </div>
                    <div className="talent-box">
                        <div className="talent-circle dex"><p>DEX</p></div>
                        <div className="talent-selector">
                            <span className="talent-plus" onClick={evt => handleAddClick(evt, 'dex')}>
                                <img src={addSVG} alt="Plus" />
                            </span>
                            <span className='talent-value'>{dexterity}</span>
                            <span className="talent-minus" onClick={evt => handleMinusClick(evt, 'dex')}>
                                <img src={removeSVG} alt="Minus" />
                            </span>
                        </div>
                    </div>
                    <div className="talent-box">
                        <div className="talent-circle int"><p>INT</p></div>
                        <div className="talent-selector">
                            <span className="talent-plus" onClick={evt => handleAddClick(evt, 'int')}>
                                <img src={addSVG} alt="Plus" />
                            </span>
                            <span className='talent-value'>{intelligence}</span>
                            <span className="talent-minus" onClick={evt => handleMinusClick(evt, 'int')}>
                                <img src={removeSVG} alt="Minus" />
                            </span>
                        </div>
                    </div>
                    <div className="talent-box">
                        <div className="talent-circle res"><p>RES</p></div>
                        <div className="talent-selector">
                            <span className="talent-plus" onClick={evt => handleAddClick(evt, 'res')}>
                                <img src={addSVG} alt="Plus" />
                            </span>
                            <span className='talent-value'>{resistance}</span>
                            <span className="talent-minus" onClick={evt => handleMinusClick(evt, 'res')}>
                                <img src={removeSVG} alt="Minus" />
                            </span>
                        </div>
                    </div>
                </div>
                <button className='btn-inside' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

const Talents = connect(mapStateToProps, mapDispatchToProps)(ConnectedTalents);

export default Talents;