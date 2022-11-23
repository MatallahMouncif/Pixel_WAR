import PropsTypes from 'prop-types';
import React, { useState } from 'react';

import '../styles/SignIn.css';

async function signInUser(credentials) {
	return fetch('http://localhost:3003/sign-in', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	})
		.then((data) => data.json());
}

export default function SignIn({ setToken }) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = await signInUser({
			email,
			password,
		});

		setToken(token);
	};

	return (
		<div className="sign-in-wrapper">
			<div className="sign-in-inner">
				<h2>Sign in</h2>
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
					<br />
					<div>
						<a href="/"><button className="btn btn-primary btn-block mb-4" type="submit">Sign in</button></a>
					</div>

					<div className="text-center">
						<p>Not a member? <a href="/sign-up">Sign up</a></p>
					</div>
				</form>
			</div>
		</div>
	);
}

SignIn.propTypes = {
	setToken: PropsTypes.func.isRequired,
};
