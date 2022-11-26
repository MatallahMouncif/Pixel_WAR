import PropsTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/SignUp.css';

async function signUpUser(informations) {
	return fetch('http://localhost:3003/sign-up', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(informations),
	})
		.then((data) => data.json());
}

export default function SignUp({ setToken }) {
	const [pseudo, setPseudo] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = await signUpUser({
			pseudo,
			email,
			password,
		});

		setToken(token);
	};

	return (
		<div className="sign-up-wrapper">
			<div className="sign-up-inner">
				<h2>Sign up</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label className="form-label" htmlFor="pseudo">Pseudo</label>
						<input
							id="pseudo"
							className="form-control"
							name="pseudo"
							onChange={(e) => setPseudo(e.target.value)}
							type="text"
							placeholder="Enter pseudo"
							required
						/>
					</div>
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
						<Link to="/"><button className="btn btn-primary btn-block mb-4" type="submit">Sign up</button></Link>
					</div>

					<div className="text-center">
						<p>Already a member? <a href="/sign-in">Sign in</a></p>
					</div>
				</form>
			</div>
		</div>
	);
}

SignUp.propTypes = {
	setToken: PropsTypes.func.isRequired,
};
