import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Home.css'
import MainContext from '../../contexts/MainContext.js';
import CharacterList from '../../components/CharacterList/CharacterList';
import Inventory from '../../components/Inventory/Inventory';
import SetInventory from '../../components/SetInventory/SetInventory';
import CharacterSVG from '../../assets/Character.svg';

const mapStateToProps = state => {
    return {
        userId: state.userId,
        token: state.token,
        user: state.user
    }
};

const ConnectedHome = props => {
    const [charactersList, setCharactersList] = useState([]);
    //here i can create 2 components => characterselector and characterstats to be in the home page, if the character is selected they change
    const { setCharInfo, charId, setCharId, charInfo, setCharSlots } = useContext(MainContext);

    useEffect(() => {
        const requestBody = { userId: props.userId };
        fetch('http://localhost:8000/user/characterslist', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            setCharactersList(data);
        }).catch(err => {
            console.log(err);
        })
    }, [props.userId]);

    const handleCharSelect = (evt, char) => {
        setCharId(char._id);
        setCharInfo(char);
        setCharSlots(char.slots);
    };

    return (
        <div className='home'>
            {!charId? (
                <React.Fragment>
                    <h1>Select your character</h1>
                    <div className='characters-list'>
                        {
                            charactersList.map(character => {
                                return (
                                    <CharacterList key={character._id} name={character.name} level={character.level} goldCoins={character.goldCoins} charInfo={character} handleClick={handleCharSelect}/>
                                );
                            })
                        }
                        <div className='character'> 
                            <h4>Name</h4>
                            <p>Gold: 0</p>
                            <p>Level: 1</p>
                        </div>
                        <div className='character'> 
                            <h4>Name</h4>
                            <p>Gold: 0</p>
                            <p>Level: 1</p>
                        </div>
                        <div className='character'> 
                            <h4>Name</h4>
                            <p>Gold: 0</p>
                            <p>Level: 1</p>
                        </div>
                        <div className='character'> 
                            <h4>Name</h4>
                            <p>Gold: 0</p>
                            <p>Level: 1</p>
                        </div>
                        <div className='character'> 
                            <h4>Name</h4>
                            <p>Gold: 0</p>
                            <p>Level: 1</p>
                        </div>
                        <div className='character'> 
                            <h4>Name</h4>
                            <p>Gold: 0</p>
                            <p>Level: 1</p>
                        </div>
                        <Link to='/charcreation' className='character'>
                            +
                        </Link>
                        {/* <button onClick={handleClickTest}></button> */}
                        {/* {create button} */}
                    </div>  
                </React.Fragment>
               
            ):
            (
                <React.Fragment>
                    <h1>Character</h1>
                    <div className="character-info-container">
                        <h3>{charInfo.name}</h3>
                        <div className='character-info-tables'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Level</td>
                                        <td>{charInfo.level}</td>
                                    </tr>
                                    <tr>
                                        <td>Health</td>
                                        <td>{charInfo.maxHealth}</td>
                                    </tr>
                                    <tr>
                                        <td>Energy</td>
                                        <td>{charInfo.energy}</td>
                                    </tr>
                                    <tr>
                                        <td>Experience</td>
                                        <td>{charInfo.experience}</td>
                                    </tr>
                                    <tr>
                                        <td>Next level</td>
                                        <td>{charInfo.nextLevel}</td>
                                    </tr>
                                    <tr>
                                        <td>Gold coins</td>
                                        <td>{charInfo.goldCoins}</td>
                                    </tr>
                                    <tr>
                                        <td>Armor</td>
                                        <td>{charInfo.stats.armor}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Physical damage</td>
                                        <td>{charInfo.stats.physicalDamage}</td>
                                    </tr>
                                    <tr>
                                        <td>Fire damage</td>
                                        <td>{charInfo.stats.fireDamage}</td>
                                    </tr>
                                    <tr>
                                        <td>Lightning damage</td>
                                        <td>{charInfo.stats.lightningDamage}</td>
                                    </tr>
                                    <tr>
                                        <td>Critical chance</td>
                                        <td>{charInfo.stats.criticalChance}</td>
                                    </tr>
                                    <tr>
                                        <td>Critical multiplier</td>
                                        <td>{charInfo.stats.criticalMultiplier}</td>
                                    </tr>
                                    <tr>
                                        <td>Bleed chance</td>
                                        <td>{charInfo.stats.bleedChance}</td>
                                    </tr>
                                    <tr>
                                        <td>Elemental resistance</td>
                                        <td>{charInfo.stats.elementalResistance}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='character-info-display'>
                            <Inventory />
                            <div className='character-animation'>
                                <img src={CharacterSVG} alt="Character"/>
                            </div>
                            <SetInventory />
                        </div>
                    </div>
                </React.Fragment>
            )
            }
        </div>
    )
};

const Home = connect(mapStateToProps)(ConnectedHome);

export default Home;