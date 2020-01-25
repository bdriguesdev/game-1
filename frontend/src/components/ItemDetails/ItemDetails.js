import React from 'react';

import './ItemDetails.css';
import statsNames from '../../utils/statsNames';

const ItemDetails = props => {

    return (
        <div 
            className={`item-details`} 
            hidden={props.itemInfo? false: true} 
            id='item-details'
            style={props.slotPosition? { top: props.where? `${props.slotPosition.top}px`: `${props.slotPosition.top - 80}px`, left: `${props.slotPosition.left + 40}px ` }: {}}
        >
            {
                props.itemInfo &&
                (
                    props.itemInfo.type === 'hotkey'?
                        ([
                            <p className="strong" key='item-name'>{props.itemInfo.name}</p>,
                            <div className="detail-line" key="line-one"></div>,
                            <p className="medium" key='item-type'>health {props.itemInfo.health[0] + '-' + props.itemInfo.health[1]}</p>
                        ]):
                        (
                            props.itemInfo.price? 
                                ([
                                    <p className="strong" key='item-name'>T{props.itemInfo.tier} {props.itemInfo.name}</p>,
                                    <div className="detail-line" key="line-one"></div>,
                                    <p className="medium" key='item-type'>{statsNames[props.itemInfo.type]}</p>,
                                    props.itemInfo.base.map((stat, index) => {
                                        return (
                                            <p className="medium" key={"base"+index}>{statsNames[stat.stat]} +{stat.value}</p>
                                        )
                                    }),
                                    <div className="detail-line" key="line-two"></div>,
                                    props.itemInfo.stats.map((stat, index) => {
                                        return (
                                            <p className="light" key={"stat"+index}>{statsNames[stat.stat]} +{stat.value}</p>
                                        )
                                    })
                                ]):
                                ([
                                    <p className="strong" key='item-name'>{props.itemInfo.name}</p>,
                                    <p className="medium" key='item-energy'>{props.itemInfo.energy} energy</p>,
                                    <div className="detail-line" key="line-one"></div>,
                                    props.itemInfo.physicalDamage > 0 && <p className="medium" key='item-physical-dmg'>Physical damage {props.itemInfo.physicalDamage}%</p>,
                                    props.itemInfo.elementalDamage > 0 && <p className="medium" key='item-ele-dmg'>Elemental damage {props.itemInfo.elementalDamage}%</p>,
                                    props.itemInfo.bleedChance > 0 && <p className="medium" key='item-bleed-chance'>Bleeed chance {props.itemInfo.bleedChance}%</p>,
                                    props.itemInfo.criticalChance > 0 && <p className="medium" key='item-crit-chance'>Critical chance {props.itemInfo.criticalChance}%</p>,
                                    props.itemInfo.criticalMultiplier > 0 && <p className="medium" key='item-crit-mult'>Critical multiplier {props.itemInfo.criticalMultiplier}%</p>
                                ])
                        )
                )
            }
        </div>
    )
};

export default ItemDetails;