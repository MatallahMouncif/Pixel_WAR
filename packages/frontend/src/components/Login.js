import PropTypes from 'prop-types';
import React, { useState } from 'react';

import '../styles/Login.css';

async function loginUser(credentials) {
	// TODO: replace with backend call
	return fetch('http://localhost:3003/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	})
		.then((data) => data.json());
}

export default function Login({ setToken }) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = await loginUser({
			email,
			password,
		});

		setToken(token);
	};

	return (
		<div className="login-wrapper">
			<div className="login-inner">
				<h2>Log In</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label className="form-label" htmlFor="email">Email</label>
						<input
							id="email"
							className="form-control"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							placeholder="Enter email"
							required
						/>
					</div>
					<div>
						<label className="form-label" htmlFor="password">Password</label>
						<input
							id="password"
							className="form-control"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="Enter password"
							required
						/>
					</div>

					<a href="/"><button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button></a>
				</form>
			</div>
		</div>
	);
}

Login.propTypes = {
	setToken: PropTypes.func.isRequired,
};
