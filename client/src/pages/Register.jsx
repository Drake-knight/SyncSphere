import { useState } from "react";
import { register } from "../utils/AuthHandler";
import "./Register.css";
import { useLocation } from "wouter";

function Register({ setIsLoggedIn }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [, navigate] = useLocation();

    const updateName = (event) => {
        setName(event.target.value);
    };

    const updateEmail = (event) => {
        setEmail(event.target.value);
    };

    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }
        setIsDisabled(true);
        setIsLoading(true); 
        setErrorMessage(""); 
        const response = await register({ name, email, password });
        setIsDisabled(false);
        setIsLoading(false); 
        if (response && response.token) {
            localStorage.setItem("jwtToken", response.token);
            localStorage.setItem("userName", response.name); 
            setIsLoggedIn(true);
            navigate("/"); 
        } else {
            setErrorMessage("Registration failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="register">
                <h1>SyncSphere</h1>
                <div className="sign-up-info">Sign up using your email account</div>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={updateName}
                    autoComplete="on"
                    disabled={isDisabled}
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={updateEmail}
                    autoComplete="on"
                    disabled={isDisabled}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={updatePassword}
                    autoComplete="on"
                    disabled={isDisabled}
                />
                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}
                <input type="submit" value="REGISTER" id="register-button" disabled={isDisabled} />
                {isLoading && (
                    <div className="loading-message">Registering...</div> 
                )}
                <div className="login-redirect">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </form>
    );
}

export default Register;