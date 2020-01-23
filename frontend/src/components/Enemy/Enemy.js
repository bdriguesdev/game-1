import React, { useContext } from 'react';

import './Enemy.css';
import HealthBar from '../../components/Bars/HealthBar';
import MainContext from '../../contexts/MainContext.js';
import images from '../../utils/images';

const Enemy = props => {

    const { charInfo} = useContext(MainContext);

    return (
        <div className="enemy-container">
            <div className="enemy-info">
                <h3>{charInfo.battle[0].name}</h3>
                <HealthBar health={charInfo.battle[0].health} maxHealth={charInfo.battle[0].maxHealth}/>
            </div>
            <div className="enemy-display">
                <div className='enemy-stats'>
                    <p>Physical damage: {charInfo.battle[0].stats.physicalDamage}</p>
                    <p>Fire damage {charInfo.battle[0].stats.fireDamage}</p>
                    <p>Lightning damage: {charInfo.battle[0].stats.lightningDamage}</p>
                    <p>Armor: {charInfo.battle[0].stats.armor}</p>
                    <p>Elemental resistance: {charInfo.battle[0].stats.elementalResistance}</p>
                </div>
                <div className="enemy-animation">
                    <img src={images[charInfo.battle[0].name]} alt="Monster" />
                </div>
            </div>
        </div>
    )
}

export default Enemy;