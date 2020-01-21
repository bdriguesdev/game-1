import React, { useContext } from 'react';

import './Character.css';
import HealthBar from '../../components/Bars/HealthBar';
import EnergyBar from '../../components/Bars/EnergyBar';
import MainContext from '../../contexts/MainContext';
import Inventory from '../../components/Inventory/Inventory';

const Character = props => {

    const { charInfo } = useContext(MainContext);

    return (
        <div className="character-container">
            <div className='character-info'>
                <h3>{charInfo.name}</h3>
                <HealthBar health={charInfo.health} maxHealth={charInfo.maxHealth} />
                <EnergyBar />
            </div>
            <div className='character-display'>
                <div className='character-animation'></div>
                <Inventory /> 
            </div>  
        </div>
    )
}

export default Character;