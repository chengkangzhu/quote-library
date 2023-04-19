import React, { useState } from "react";
import { Link } from "react-router-dom";


import useLogin from "../hooks/useLogin";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, isLoading, error } = useLogin()
    

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(email,password)
	};

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h3 className="text-center ">Log in</h3>

			<div className="form-group">
				<label>Email:</label>
				<input
					className="form-control"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label>Password:</label>
				<input
					className="form-control"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<button className="btn btn-primary " disabled={isLoading}>Login</button>
			<span>Don't have a account? <Link to="/signup">Sign up</Link></span>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default Login;
