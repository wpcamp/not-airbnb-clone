// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const handleDemoUser = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
            .then(closeModal)
    }

    const handleButtonDisable = () => {
        return (credential.length < 4 || password.length < 6)
    }


    return (
        <>
            <div id='loginModal'>
                <h1 id="logInHeader">Log In</h1>
                {errors.credential && (
                    <p id='errorsLogIn'>{errors.credential}</p>
                )}
                <form className='loginForm' onSubmit={handleSubmit}>
                    <label >
                        <input
                            type="text"
                            id="usernameInput"
                            placeholder="Username or Email"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label >
                        <input
                            type="password"
                            id="passwordInput"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    {/* FIX BELOW, not always working  */}
                    {errors.credential || errors.password || credential.length < 4 || password.length < 6 ? (
                        <button type="submit" id='loginButtonErr' disabled={handleButtonDisable()}>Log In</button>
                    ) : (
                        <button type="submit" id='loginButton' disabled={handleButtonDisable()}>Log In</button>
                    )}
                </form>
                <button type="submit" id='demoUserButton' onClick={handleDemoUser}>Log in as Demo User</button>
            </div>
        </>
    );
}

export default LoginFormModal;