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
        console.log('cred:', credential)
        console.log('pass:', password);
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
        return dispatch(sessionActions.login({ credential:'Demo-lition', password:'password' }))
            .then(closeModal)
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
                    <button type="submit" id='loginButton'>Log In</button>
                </form>
                <button type="submit" id='demoUserButton' onClick={handleDemoUser}>Demo User</button>
            </div>
        </>
    );
}

export default LoginFormModal;