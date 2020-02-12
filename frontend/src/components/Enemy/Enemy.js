import React from 'react';
import { connect } from 'react-redux';

import './Enemy.css';
import HealthBar from '../../components/Bars/HealthBar';
import images from '../../utils/images';

const mapStateToProps = state => {
    return {
        character: state.character
    };
};

const ConnectedEnemy = props => {

    return (
        <div className="enemy-container">
            <div className="enemy-info">
                <h3>{props.character.battle[0].name}</h3>
                <HealthBar health={props.character.battle[0].health} maxHealth={props.character.battle[0].maxHealth}/>
            </div>
            <div className="enemy-display">
                <div className='enemy-stats'>
                    <p>Physical damage: {props.character.battle[0].stats.physicalDamage}</p>
                    <p>Fire damage {props.character.battle[0].stats.fireDamage}</p>
                    <p>Lightning damage: {props.character.battle[0].stats.lightningDamage}</p>
                    <p>Armor: {props.character.battle[0].stats.armor}</p>
                    <p>Elemental resistance: {props.character.battle[0].stats.elementalResistance}</p>
                </div>
                <div className="enemy-animation">
                    <img src={images[props.character.battle[0].name.split(' ').join('')]} alt="Monster" />
                </div>
            </div>
        </div>
    )
}

const Enemy = connect(mapStateToProps)(ConnectedEnemy);

export default Enemy;