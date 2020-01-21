import React from 'react';

import './Depot.css'
import Inventory from '../../components/Inventory/Inventory';
import DepotContainer from '../../components/DepotContainer/DepotContainer';

const Depot = props => {

    return (
        <div className="depot-container">
            <h1>Depot</h1>
            <div className="depot-boxes">
                <div className="depot-inventory-box">
                    <h3>Inventory</h3>
                   <Inventory /> 
                </div>
                <div className="character-animation"></div>
                <div className='depot-box'>
                    <h3>Depot</h3>
                    <DepotContainer />
                </div>
            </div>
        </div>
    );
}

export default Depot;