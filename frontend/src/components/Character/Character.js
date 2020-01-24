import React, { useContext } from 'react';

import './Character.css';
import HealthBar from '../../components/Bars/HealthBar';
import EnergyBar from '../../components/Bars/EnergyBar';
import ExperienceBar from '../../components/Bars/ExperienceBar';
import MainContext from '../../contexts/MainContext';
import Inventory from '../../components/Inventory/Inventory';
import CharacterSVG from '../../assets/Character.svg';

const Character = props => {

    const { charInfo } = useContext(MainContext);

    return (
        <div className="character-container">
            <div className='character-info'>
                <h3>{charInfo.name}</h3>
                <HealthBar health={charInfo.health} maxHealth={charInfo.maxHealth} />
                <EnergyBar energy={charInfo.energy} maxEnergy={charInfo.maxEnergy}  />
                <ExperienceBar experience={charInfo.experience} nextLevel={charInfo.nextLevel} />
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

export default Character;