import React from 'react';

import './CharacterList.css';

const CharacterList = props => {
    return(
        <div className='character' onClick={evt => props.handleClick(evt, props.charInfo)}>
            <h4>{props.name}</h4>
            <p>Gold: {props.goldCoins}</p>
            <p>Level: {props.level}</p>
        </div>
    );
};

export default CharacterList;