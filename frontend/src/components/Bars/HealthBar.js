import React, { useContext } from 'react';

import './HealthBar.css'
// import MainContext from '../../contexts/MainContext';

const HealthBar = props => {

    // const { charInfo } = useContext(MainContext);

    return (
        <div className="health-bar-container">
            <div className="health-bar">{props.health}/{props.maxHealth}</div>
        </div>
    );
}

export default HealthBar;