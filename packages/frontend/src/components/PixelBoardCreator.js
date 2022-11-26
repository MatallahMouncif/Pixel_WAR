import PropsTypes from 'prop-types';
import React, { useState } from 'react';

import '../styles/SignUp.css';

async function pixelBoardCreatorBack(informations) {
	return fetch('http://localhost:3003/pixelboards', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(informations),
	}).then((data) => data.json());
}

export default function PixelBoard({ setData }) {
	const [name, setName] = useState();
	const [author, setAuthor] = useState();
	const [epixel, setEpixel] = useState();
	const [time, setTime] = useState();
	const [Etime, setEtime] = useState();

	function handleSubmit() {
		// e.preventDefault();

		const data = pixelBoardCreatorBack({
			name,
			author,
			epixel,
			time,
			Etime,
		});

		setData(data);
	}

	return (
		<div className="sign-up-wrapper">
			<div className="sign-up-inner">
				<h2>Create a new Pixel Board</h2>
				<form>
					<div>
						<label className="form-label" htmlFor="name">
							Name
						</label>
						<input
							id="name"
							className="form-control"
							name="name"
							onChange={(e) => setName(e.target.value)}
							type="text"
							placeholder="Enter name"
							required
						/>
					</div>
					<div>
						<label className="form-label" htmlFor="author">
							Author
						</label>
						<input
							id="author"
							className="form-control"
							name="author"
							onChange={(e) => setAuthor(e.target.value)}
							type="author"
							placeholder="Enter author"
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
									value="option1"
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
									value="option2"
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
					</div>

					<div>
						<label className="form-label" htmlFor="time">
							Time
						</label>
						<input
							id="time"
							className="form-control"
							name="time"
							onChange={(e) => setTime(e.target.value)}
							type="time"
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
							onChange={(e) => setEtime(e.target.value)}
							type="time"
							placeholder="Enter time"
							required
						/>
					</div>
					<br />
					<div>
						<button
							onClick={handleSubmit}
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

PixelBoard.propTypes = {
	setData: PropsTypes.func.isRequired,
};
