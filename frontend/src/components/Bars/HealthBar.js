import React from 'react';

import './HealthBar.css'

const HealthBar = props => {


    const calcHealthWidth = () => {
        return (props.health * 100) / props.maxHealth + "%";
    }

    return (
        <div className="health-bar-container">
            <div style={{ width: calcHealthWidth() }} className="health-bar">
                <span className="health-bar-info">{props.health}/{props.maxHealth}</span> 
            </div>
        </div>
    );
}

export default HealthBar;