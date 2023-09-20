// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/airbnb-logo.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    // console.log('this is the user: ',sessionUser)
    return (
        <>
            <ul className='navBar'>
                <li>
                    <NavLink exact to="/"><img src={logo} alt='NotAirbnb Logo' id='logo'></img></NavLink>
                </li>
                <div id='navBarRightComp'>
                    {sessionUser && <li>
                        <div id='rentHomeDiv'>
                            <NavLink to='/spots/new' id='createSpotLink'>Rent your home</NavLink>
                        </div>
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