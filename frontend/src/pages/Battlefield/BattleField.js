import React from 'react';
import { connect } from 'react-redux';

import './BattleField.scss';
import Character from '../../components/Character/Character';
import Enemy from '../../components/Enemy/Enemy';
import Loot from '../../components/Loot/Loot';
import HotkeysBar from '../../components/HotkeysBar/HotkeysBar';

const mapStateToProps = state => {
    return {
        character: state.character
    };
};

const ConnectedBattleField = props => {

    return(
        <div className='battlefield'>
            <Loot />
            <div className='battle-container'>
                <Character />
                <div className='versus-img'>X</div>
                {
                    props.character.battle[0] ? 
                        (
                            <Enemy />
                        ):
                        ( 
                            <div className="empty-battle">
                                <p>You need to choose a hunting place.</p>
                            </div>
                        )
                }
                
            </div>
            <HotkeysBar />
        </div>
    )
}

const BattleField = connect(mapStateToProps)(ConnectedBattleField);

export default BattleField;