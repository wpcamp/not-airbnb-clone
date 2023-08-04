// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";




function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory()


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logoutCloseMenu = () => {
        setShowMenu(false)
    }


    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
        // logoutCloseMenu()
        history.push('/')
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div id="navProfileDiv">
                <button id='menuButton' onClick={openMenu}>
                    <i className="fa-solid fa-bars"></i>
                    <i className="fas fa-user-circle" />
                </button>
                {showMenu && (<ul className={ulClassName} ref={ulRef}>
                    {user ? (
                        <>
                            <div className='modalButton-loggedin'>
                                <li id="loggedInHello">Hello, {user.firstName}</li>
                                <li id="loggedInEmail">{user.email}</li>
                                <li id='loggedInManage'><NavLink to='/spots/current'>Manage Spots</NavLink></li>
                                <li>
                                    <button id='logoutButton' onClick={logout}>Log Out</button>
                                </li>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="modalButton-logsign">
                                <li>
                                    <OpenModalButton
                                        buttonText="Log In"
                                        modalComponent={<LoginFormModal />}
                                    />
                                </li>
                                <li>
                                    <OpenModalButton
                                        buttonText="Sign Up"
                                        modalComponent={<SignupFormModal />}
                                    />
                                </li>
                            </div>
                        </>
                    )}
                </ul>)}
            </div >
        </>
    );
}

export default ProfileButton;