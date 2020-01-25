import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './NavBar.css';
import MainContext from '../../contexts/MainContext';

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
        userId: state.userId
    }
};

const ConnectedNavBar = props => {

    const { charId } = useContext(MainContext);

    return (
        <div className='navbar'>
            <h1>Roboto</h1>
            <nav>
                <ul>
                    {!props.token && ([
                        <li key='0'><NavLink to='/login'>Login</NavLink></li>,
                        <li key='1'><NavLink to='/register'>Register</NavLink></li>,
                        <li key='2'><NavLink to='/about'>About</NavLink></li>
                    ])}
                    {props.token && !charId && ([
                        <li key='0'><NavLink to='/home'>Home</NavLink></li>,
                        <li key='1'><NavLink to='/about'>About</NavLink></li>
                    ])}
                    {props.token && charId && ([
                        <li key='0'><NavLink to='/home'>Home</NavLink></li>,
                        <li key='1'><NavLink to='/huntingplaces'>Hunting Places</NavLink></li>,
                        <li key='2'><NavLink to='/battlefield'>Battle Field</NavLink></li>,
                        <li key='3'><NavLink to='/shop'>Shop</NavLink></li>,
                        <li key='4'><NavLink to='/depot'>Depot</NavLink></li>,
                        <li key='5'><NavLink to='/talents'>Talents</NavLink></li>,
                        <li key='6'><NavLink to='/about'>About</NavLink></li>
                    ])}
                    {/* <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to='/register'>Register</NavLink></li>
                    <li><NavLink to='/about'>About</NavLink></li> */}
                </ul>
            </nav>
        </div>
    );
};

const NavBar = connect(mapStateToProps)(ConnectedNavBar);

export default NavBar;