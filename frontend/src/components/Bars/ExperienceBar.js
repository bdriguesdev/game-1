import React from 'react';

import './ExperienceBar.css'

const ExperienceBar = props => {


    const calcExperienceWidth = () => {
        return (props.experience * 100) / props.nextLevel + "%";
    }

    return (
        <div className="experience-bar-container">
            <div style={{ width: calcExperienceWidth() }} className="experience-bar">
                <span className="experience-bar-info">{props.experience}/{props.nextLevel}</span> 
            </div>
        </div>
    );
}

export default ExperienceBar;