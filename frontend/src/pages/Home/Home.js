import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Home.scss'
import MainContext from '../../contexts/MainContext.js';
import CharacterList from '../../components/CharacterList/CharacterList';
import Inventory from '../../components/Inventory/Inventory';
import SetInventory from '../../components/SetInventory/SetInventory';
import CharacterSVG from '../../assets/Character.svg';
import { setCharacter, getCharacters } from '../../actions/character';
import plusSVG from '../../assets/add.svg';

const mapStateToProps = state => {
    return {
        userId: state.userId,
        charactersList: state.charactersList,
        character: state.character
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setCharacter: character => dispatch(setCharacter(character)),
        getCharacters: userId => dispatch(getCharacters(userId))
    };
};

const ConnectedHome = props => {
    const { setCharInfo, setCharId, setCharSlots } = useContext(MainContext);

    useEffect(() => {
        props.getCharacters(props.userId);
    }, [props.userId]);

    const handleCharSelect = (evt, char) => {
        props.setCharacter(char);
        setCharId(char._id);
        setCharInfo(char);
        setCharSlots(char.slots);
    };

    return (
        <div className='home'>
            {props.charactersList && (!props.character? (
                <React.Fragment>
                    <h1>Select your character</h1>
                    <div className='characters-list'>
                        {
                            props.charactersList.map(character => {
                                return (
                                    <CharacterList key={character._id} name={character.name} level={character.level} goldCoins={character.goldCoins} charInfo={character} handleClick={handleCharSelect}/>
                                );
                            })
                        }
                        <Link to='/charcreation' className='character-create'>
                            <img src={plusSVG} alt="create"/>
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
                        <h3>{props.character.name}</h3>
                        <div className='character-info-tables'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Level</td>
                                        <td>{props.character.level}</td>
                                    </tr>
                                    <tr>
                                        <td>Health</td>
                                        <td>{props.character.maxHealth}</td>
                                    </tr>
                                    <tr>
                                        <td>Energy</td>
                                        <td>{props.character.energy}</td>
                                    </tr>
                                    <tr>
                                        <td>Experience</td>
                                        <td>{props.character.experience}</td>
                                    </tr>
                                    <tr>
                                        <td>Next level</td>
                                        <td>{props.character.nextLevel}</td>
                                    </tr>
                                    <tr>
                                        <td>Gold coins</td>
                                        <td>{props.character.goldCoins}</td>
                                    </tr>
                                    <tr>
                                        <td>Armor</td>
                                        <td>{props.character.stats.armor}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Physical damage</td>
                                        <td>{props.character.stats.physicalDamage}</td>
                                    </tr>
                                    <tr>
                                        <td>Fire damage</td>
                                        <td>{props.character.stats.fireDamage}</td>
                                    </tr>
                                    <tr>
                                        <td>Lightning damage</td>
                                        <td>{props.character.stats.lightningDamage}</td>
                                    </tr>
                                    <tr>
                                        <td>Critical chance</td>
                                        <td>{props.character.stats.criticalChance}</td>
                                    </tr>
                                    <tr>
                                        <td>Critical multiplier</td>
                                        <td>{props.character.stats.criticalMultiplier}</td>
                                    </tr>
                                    <tr>
                                        <td>Bleed chance</td>
                                        <td>{props.character.stats.bleedChance}</td>
                                    </tr>
                                    <tr>
                                        <td>Elemental resistance</td>
                                        <td>{props.character.stats.elementalResistance}</td>
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
            )}
        </div>
    )
};

const Home = connect(mapStateToProps, mapDispatchToProps)(ConnectedHome);

export default Home;