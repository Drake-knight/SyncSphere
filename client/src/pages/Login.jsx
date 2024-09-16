import { useState } from "react";
import { authenticate } from "../utils/AuthHandler";
import "./Login.css";
import { useLocation } from "wouter";

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const [, navigate] = useLocation();

    const updateEmail = (event) => {
        setEmail(event.target.value);
    };

    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsDisabled(true);
        setIsLoading(true);
        setErrorMessage("");
        const response = await authenticate({ email, password });
        setIsDisabled(false);
        setIsLoading(false); 
        if (response && response.token) {
            localStorage.setItem("jwtToken", response.token);
            localStorage.setItem("userName", response.name); 
            setIsLoggedIn(true);
            navigate("/");
        } else {
            setErrorMessage("Invalid email or password. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="login">
                <h1>SyncSphere</h1>
                <div className="sign-in-info">Sign in using your email account</div>
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
                <input type="submit" value="LOGIN" id="login-button" disabled={isDisabled} />
                {isLoading && (
                    <div className="loading-message">Logging in...</div> 
                )}
                <div className="login-redirect">
                    Don't have an account? <a href="/register">Register</a>
                </div>
            </div>
        </form>
    );
}

export default Login;