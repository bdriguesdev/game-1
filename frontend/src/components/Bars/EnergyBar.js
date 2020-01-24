import React from 'react';

import './EnergyBar.css'

const EnergyBar = props => {
    return (
        <div className="energy-bar-container">
            <div className="energy-bar">
                <span className="energy-bar-info">{props.energy}/{props.maxEnergy}</span> 
            </div>
        </div>
    );
}

export default EnergyBar;