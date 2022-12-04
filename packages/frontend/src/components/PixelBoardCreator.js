import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SignUp.css';

export default function PixelBoard() {
	const [title, setTitle] = useState();
	const status = 'in Progress';
	const creationDate = new Date().getTime();
	const [pixel, setPixel] = useState();
	const [author, setAuthor] = useState();
	const [epixel, setEpixel] = useState();
	const [time, setTime] = useState();
	const [endDate, setEtime] = useState();
	const [visitor, setVisitor] = useState();
	useEffect(() => {
		setAuthor(sessionStorage.getItem('user_id'));
	}, []);

	function pixelBoardCreatorBack() {
		if (pixel > 50) {
			alert('Please enter a number less than 50');
		} else {
			axios({
				method: 'POST',
				withCredentials: true,
				url: 'http://localhost:3003/pixelBoards/create',
				data: {
					title,
					status,
					creation_date: creationDate,
					size: pixel,
					end_date: endDate,
					author_id: author,
					override_available: epixel,
					visitor_allowed: visitor,
					user_delay: time * 1000,
				},
			}).then((res) => {
				console.log(res);
			}).catch((err) => {
				console.log(err);
			});
		}
	}

	return (
		<div className="sign-up-wrapper">
			<div className="sign-up-inner">
				<h2>Create a new Pixel Board</h2>
				<form>
					<div>
						<label className="form-label" htmlFor="title">
							title
						</label>
						<input
							id="title"
							className="form-control"
							name="title"
							onChange={(e) => setTitle(e.target.value)}
							type="text"
							placeholder="Enter title"
							required
						/>
					</div>
					<div>
						<label className="form-label" htmlFor="number">
							Resolution
						</label>
						<input
							id="pixel"
							className="form-control"
							name="apixel"
							onChange={(e) => setPixel(e.target.value)}
							type="number"
							placeholder="Enter X"
							required
						/>
					</div>
					<div>
						<label className="form-label" htmlFor="author">
							Edit Pixel
						</label>
						<div className="d-flex justify-content-around">
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name="exampleRadios"
									id="exampleRadios1"
									value="true"
									onChange={(e) => setEpixel(e.target.value)}
								/>
								<label
									className="form-check-label"
									htmlFor="exampleRadios1"
								>
									Yes
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name="exampleRadios"
									id="exampleRadios2"
									value="false"
									onChange={(e) => setEpixel(e.target.value)}
								/>
								<label
									className="form-check-label"
									htmlFor="exampleRadios2"
								>
									No
								</label>
							</div>
						</div>
						<label className="form-label" htmlFor="visitor">
							Visitor allowed
						</label>
						<div className="d-flex justify-content-around">
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name="exampleRadios"
									id="exampleRadios1"
									value="true"
									onChange={(e) => setVisitor(e.target.value)}
								/>
								<label
									className="form-check-label"
									htmlFor="exampleRadios1"
								>
									Yes
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name="exampleRadios"
									id="exampleRadios2"
									value="false"
									onChange={(e) => setVisitor(e.target.value)}
								/>
								<label
									className="form-check-label"
									htmlFor="exampleRadios2"
								>
									No
								</label>
							</div>
						</div>
					</div>

					<div>
						<label className="form-label" htmlFor="time">
							End Date
						</label>
						<input
							id="time"
							className="form-control"
							name="time"
							onChange={(e) => setEtime(new Date(e.target.value).getTime())}
							type="date"
							placeholder="Enter time"
							required
						/>
					</div>
					<div>
						<label className="form-label" htmlFor="time">
							CoolDown
						</label>
						<input
							id="time"
							className="form-control"
							name="time"
							onChange={(e) => setTime(e.target.value)}
							type="number"
							placeholder="Enter time"
							required
						/>
					</div>
					<br />
					<div>
						<button
							onClick={pixelBoardCreatorBack}
							type="button"
							className="btn btn-primary"
						>
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
