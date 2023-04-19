import React, { useState } from "react";
import { Link } from "react-router-dom";

//component
import useSignup from "../hooks/useSignup";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signup, isLoading, error } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(email, password);
	};

	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h3 className="text-center ">Sign up</h3>

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

			<button className="btn btn-primary" disabled={isLoading}>
				Sign up
			</button>
			<span>
				Already have a account? <Link to="/login">Log in</Link>
			</span>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default Signup;
