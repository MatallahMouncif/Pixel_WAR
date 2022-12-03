/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/SignIn.css';
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

	return (
		<div className="profile-wrapper">
			<div className="profile-inner">
				<h2>Profile</h2>

				<div>
					<label className="form-label" htmlFor="name">Name</label>
					<input
						id="name"
						className="form-control"
						name="name"
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder={sessionStorage.getItem('user_name')}
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
						placeholder={sessionStorage.getItem('user_email')}
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
						placeholder="new password"
						required
					/>

				</div>
			</div>
			<div>
				<div className="badge bg-primary text-wrap" style={{ width: `${14}rem` }}>
					Total number of pixels placed: {myPixels}
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
