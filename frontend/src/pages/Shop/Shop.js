import React from 'react';

import './Shop.css';
import Inventory from '../../components/Inventory/Inventory';
import ShopContainer from '../../components/ShopContainer/ShopContainer';

const Shop = props => {

    return(
        <div className="shop">
            <h1>Shop</h1>
            <div className="shop-container">
                <div className="shop-inv-container">
                    <h2>Inventory</h2>
                    <Inventory />
                </div>
                <div className="shop-vendor-container">
                    <ShopContainer />
                </div>
            </div>
        </div>
    );
};

export default Shop;