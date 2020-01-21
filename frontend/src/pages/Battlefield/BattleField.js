import React, { useContext } from 'react';

import './BattleField.css';
import Character from '../../components/Character/Character';
import Enemy from '../../components/Enemy/Enemy';
import Loot from '../../components/Loot/Loot';
import MainContext from '../../contexts/MainContext';
import HotkeysBar from '../../components/HotkeysBar/HotkeysBar';

const BattleField = props => {

    const { charInfo } = useContext(MainContext);

    return(
        <div className='battlefield'>
            <Loot />
            <div className='battle-container'>
                <Character />
                <div className='versus-img'>X</div>
                {
                    charInfo.battle[0] ? 
                        (<Enemy />):
                        (<p>Nothing here</p>)
                }
                
            </div>
            <HotkeysBar />
        </div>
    )
}

export default BattleField;