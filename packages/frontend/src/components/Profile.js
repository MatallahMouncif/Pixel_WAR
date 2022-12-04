/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { Link } from 'react-router-dom';

export default function Profile() {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [myPixelboards, setMyPixelboards] = useState(0);
	const [myPixels, setMyPixels] = useState(0);

	useEffect(() => {
		const myPixelboardsUrl = `http://localhost:3003/pixelboards/author/${sessionStorage.getItem('user_id')}`;
		const myPixelsUrl = `http://localhost:3003/pixels/author/${sessionStorage.getItem('user_id')}`;

		axios.get(myPixelboardsUrl).then((res) => {
			setMyPixelboards(res.data);
		}, (err) => {
			console.log(err);
		});

		axios.get(myPixelsUrl).then((res) => {
			setMyPixels(res.data.length);
		}, (err) => {
			console.log(err);
		});
	}, []);

	function updateName() {
		const updateNameUrl = `http://localhost:3003/users/${sessionStorage.getItem('user_id')}/update/name`;

		axios(
			{
				method: 'patch',
				url: updateNameUrl,
				data: {
					name,
				},
				withCredentials: true,
			},
		).then((res) => {
			setName(res.data.name);

			document.getElementById('name').value = '';
			document.getElementById('name').placeholder = res.data.name;

			alert(`Name updated successfully: ${res.data.name}`);
		}, (err) => {
			console.log(err);
		});
	}

	function updateEmail() {
		const updateNameUrl = `http://localhost:3003/users/${sessionStorage.getItem('user_id')}/update/email`;

		axios(
			{
				method: 'patch',
				url: updateNameUrl,
				data: {
					email,
				},
				withCredentials: true,
			},
		).then((res) => {
			setEmail(res.data.email);

			document.getElementById('email').value = '';
			document.getElementById('email').placeholder = res.data.email;

			alert(`Email updated successfully: ${res.data.email}`);
		}, (err) => {
			console.log(err);
		});
	}

	function updatePassword() {
		const updatePasswordUrl = `http://localhost:3003/users/${sessionStorage.getItem('user_id')}/update/password`;

		axios(
			{
				method: 'patch',
				url: updatePasswordUrl,
				data: {
					password,
				},
				withCredentials: true,
			},
		).then((res) => {
			setPassword(res.data.password);

			document.getElementById('password').value = '';
			document.getElementById('password').placeholder = 'new password';

			alert('Password updated successfully');
		}, (err) => {
			console.log(err);
		});
	}

	return (
		<div className="profile-wrapper">
			<div className="profile-inner">
				<h2>Profile</h2>

				<div>
					<label className="form-label" htmlFor="name">Name</label>
					<br />
					<input
						id="name"
						className="form-control inline"
						name="name"
						onChange={(e) => setName(e.target.value)}
						type="text"
						style={{ width: '20%' }}
						placeholder={sessionStorage.getItem('user_name')}
						required
					/>
					<button type="button" className="btn btn-primary inline" onClick={updateName}>Update</button>
				</div>
				<div>
					<label className="form-label" htmlFor="email">Email</label>
					<br />
					<input
						id="email"
						className="form-control inline"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						style={{ width: '20%' }}
						placeholder={sessionStorage.getItem('user_email')}
						required
					/>
					<button type="button" className="btn btn-primary inline" onClick={updateEmail}>Update</button>
				</div>
				<div>
					<label className="form-label" htmlFor="password">Password</label>
					<br />
					<input
						id="password"
						className="form-control inline"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
						style={{ width: '20%' }}
						type="password"
						placeholder="new password"
						required
					/>
					<button type="button" className="btn btn-primary inline" onClick={updatePassword}>Update</button>
				</div>
			</div>
			<br />
			<div>
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
				>
					<div className="badge bg-primary text-wrap" style={{ width: `${26}rem` }}>
						<p style={{ textAlign: 'center' }} className="fs-4">Total number of pixels placed: {myPixels}</p>
					</div>
				</div>
				<div className="pixelBoardsGallery">
					{myPixelboards && myPixelboards.map((pixelboard) => (
						<div className="boards-container" key={pixelboard._id}>
							<Link to={{
								pathname: `/pixelBoards/${pixelboard._id}`,
								id: pixelboard._id,
							}}
							>
								<img src={pixelboard.thumbnail} />
							</Link>
							<div className="boarddesc">{pixelboard.title}</div>
							<div className="boarddesc">Creation date : {pixelboard.creation_date.toString()}</div>
							<div className="boarddesc">End date : {pixelboard.end_date}</div>
							<div className="boarddesc">Status : {pixelboard.status}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
