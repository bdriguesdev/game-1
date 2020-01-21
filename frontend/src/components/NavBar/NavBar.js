import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css';
import MainContext from '../../contexts/MainContext';

const NavBar = props => {

    const { token, charId } = useContext(MainContext);

    return (
        <div className='navbar'>
            <h1>Roboto</h1>
            <nav>
                <ul>
                    {!token && ([
                        <li key='0'><NavLink to='/login'>Login</NavLink></li>,
                        <li key='1'><NavLink to='/register'>Register</NavLink></li>,
                        <li key='2'><NavLink to='/about'>About</NavLink></li>
                    ])}
                    {token && !charId && ([
                        <li key='0'><NavLink to='/home'>Home</NavLink></li>,
                        <li key='1'><NavLink to='/about'>About</NavLink></li>
                    ])}
                    {token && charId && ([
                        <li key='0'><NavLink to='/home'>Home</NavLink></li>,
                        <li key='1'><NavLink to='/huntingplaces'>Hunting Places</NavLink></li>,
                        <li key='2'><NavLink to='/battlefield'>Battle Field</NavLink></li>,
                        <li key='3'><NavLink to='/depot'>Depot</NavLink></li>,
                        <li key='4'><NavLink to='/talents'>Talents</NavLink></li>,
                        <li key='5'><NavLink to='/about'>About</NavLink></li>
                    ])}
                    {/* <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to='/register'>Register</NavLink></li>
                    <li><NavLink to='/about'>About</NavLink></li> */}
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;