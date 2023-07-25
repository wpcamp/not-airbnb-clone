// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/airbnb-logo.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)
    return (
        <>
            <ul className='navBar'>
                <li>
                    <NavLink exact to="/"><img src={logo} alt='NotAirbnb Logo' id='logo'></img></NavLink>
                </li>
                <div id='navBarRightComp'>
                    {sessionUser && <li>
                        <NavLink to='/spots/new' id='createSpotLink'>Create a New Spot</NavLink>
                    </li>}
                    {isLoaded && (
                        <li>
                            <ProfileButton user={sessionUser} />
                        </li>
                    )}
                </div>
            </ul>
            <div id="horizontalLine"></div>
        </>
    );
}

export default Navigation;