/* eslint-disable */
import PropsTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignUp.css';
export default function SignUp() {
	const [pseudo, setPseudo] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	const signUp = () => {
		axios({
			method: 'post',
			url: 'http://localhost:3003/sign-up',
			data: {
				name: pseudo,
				email: email,
				password: password,
				role: 1,
			},
			withCredentials: true,
		}).then((res) => { { navigate("/sign-in"); } });
	};

	return (
		<div className="sign-up-wrapper">
			<div className="sign-up-inner">
				<h2>Sign Up</h2>
				<form>
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
					<div style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}>
						<button className="btn btn-primary btn-block mb-4" type="button" onClick={signUp}>Sign up</button>
					</div>

					<div className="text-center">
						<p>Already a member? <Link to="/sign-in">Sign In</Link></p>
					</div>
				</form>
			</div>
		</div>
	);
}

