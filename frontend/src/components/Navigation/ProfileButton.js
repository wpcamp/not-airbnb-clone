// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <div id="navProfileDiv">
                <button id='menuButton' onClick={openMenu}>
                    <i className="fa-solid fa-bars"></i>
                    <i className="fas fa-user-circle"/>
                </button>
                {showMenu && (<ul className={ulClassName} ref={ulRef}>
                    {user ? (
                        <>
                            <div className='modalButton-loggedin'>
                                <li>Hello, {user.username}</li>
                                <li>{user.email}</li>
                                {/* the navlink will bring to get all spots by user id */}
                                <li><NavLink to='/'>Manage Spots</NavLink></li>
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
            </div>
            
        </>
    );
}

export default ProfileButton;