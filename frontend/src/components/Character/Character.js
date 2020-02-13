import React from 'react';
import { connect } from 'react-redux';

import './Character.scss';
import HealthBar from '../../components/Bars/HealthBar';
import EnergyBar from '../../components/Bars/EnergyBar';
import ExperienceBar from '../../components/Bars/ExperienceBar';
import Inventory from '../../components/Inventory/Inventory';
import CharacterSVG from '../../assets/Character.svg';

const mapStateToProps = state => {
    return {
        character: state.character
    };
};

const ConnectedCharacter = props => {

    return (
        <div className="character-container">
            <div className='character-info'>
                <h3>{props.character.name}</h3>
                <HealthBar health={props.character.health} maxHealth={props.character.maxHealth} />
                <EnergyBar energy={props.character.energy} maxEnergy={props.character.maxEnergy}  />
                <ExperienceBar experience={props.character.experience} nextLevel={props.character.nextLevel} />
            </div>
            <div className='character-display'>
                <div className='character-animation'>
                    <img src={CharacterSVG} alt="Character animation"/>
                </div>
                <Inventory /> 
            </div>  
        </div>
    )
}

const Character = connect(mapStateToProps)(ConnectedCharacter);

export default Character;