import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SignIn.css';
import { Link } from 'react-router-dom';

export default function SignIn() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const signIn = () => {
		axios({
			method: 'post',
			data: {
				email,
				password,
			},
			url: 'http://localhost:3003/sign-in',
			withCredentials: true,
		}).then(() => { window.location.href = '/'; }).catch((err) => { console.log(err); });
	};

	return (
		<div className="sign-in-wrapper mt-5">
			<div className="sign-in-inner">
				<h2>Sign In</h2>
				<form>
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
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
					>
						<button className="btn btn-primary btn-block mb-4 center" type="button" onClick={signIn}>Sign-In</button>
					</div>

					<div className="text-center">
						<p>Not a member? <Link to="/sign-up">Sign Up</Link></p>
					</div>
				</form>
			</div>
		</div>
	);
}
