import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './NavBar.scss';
import MainContext from '../../contexts/MainContext';

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
        userId: state.userId
    }
};

const ConnectedNavBar = props => {
    const [ width, setWidth ] = useState(null);

    const { charId } = useContext(MainContext);

    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    });

    useEffect(() => {
        let navbar = document.querySelector('.navbar');
        const openMenuIcon = document.querySelector('.open_menu');
        if(width > 1250 && navbar.style.left === '-200px') {
            navbar.style.left = '0px';
            openMenuIcon.style.display = 'none';
        }
    }, [width]);

    const changeWidth = () => {
        setWidth(window.innerWidth);
    };

    const openMenu = () => {
        const navbar = document.querySelector('.navbar');
        const openMenuIcon = document.querySelector('.open_menu');
        openMenuIcon.style.opacity = 0;
        setTimeout(() => {
            openMenuIcon.style.display = 'none';
        }, 100);
        navbar.style.left = '0px';
    };

    const closeMenu = () => {
        const navbar = document.querySelector('.navbar');
        const openMenuIcon = document.querySelector('.open_menu');
        openMenuIcon.style.display = 'block';
        openMenuIcon.style.opacity = 1;
        navbar.style.left = '-200px';
    };

    return (
        <div className='navbar'>
            <svg className="open_menu" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                onClick={openMenu}
            >
                <path fill="#00A5D9" d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"></path>
            </svg>
            <nav>
                <svg className="close_menu" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
                    onClick={closeMenu}
                >
                    <path fill="#00A5D9" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
                </svg>
                <h1>Roboto</h1>
                <ul>
                    {!props.token && ([
                        <li key='0'><NavLink to='/login'>Login</NavLink></li>,
                        <li key='1'><NavLink to='/register'>Register</NavLink></li>
                    ])}
                    {props.token && !charId && ([
                        <li key='0'><NavLink to='/home'>Home</NavLink></li>
                    ])}
                    {props.token && charId && ([
                        <li key='0'><NavLink to='/home'>Home</NavLink></li>,
                        <li key='1'><NavLink to='/huntingplaces'>Hunting Places</NavLink></li>,
                        <li key='2'><NavLink to='/battlefield'>Battle Field</NavLink></li>,
                        <li key='3'><NavLink to='/shop'>Shop</NavLink></li>,
                        <li key='4'><NavLink to='/depot'>Depot</NavLink></li>,
                        <li key='5'><NavLink to='/talents'>Talents</NavLink></li>
                    ])}
                </ul>
            </nav>
        </div>
    );
};

const NavBar = connect(mapStateToProps)(ConnectedNavBar);

export default NavBar;