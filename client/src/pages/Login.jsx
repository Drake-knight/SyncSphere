import { useState } from "react";
import { authenticate } from "../utils/AuthHandler";
import "./Login.css";
import { useLocation } from "wouter";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
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
		const isAuthenticated = await authenticate({ email, password });
		setIsDisabled(false);
		if (isAuthenticated) {
			navigate("/dashboard");
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
				<input type="submit" value="LOGIN" id="login-button" disabled={isDisabled} />
			</div>
		</form>
	);
}

export default Login;
