import PropsTypes from 'prop-types';
import React, { useState } from 'react';

import '../styles/SignUp.css';

async function pixelBoardCreatorBack(informations) {
	return fetch('http://localhost:3003/pixelboards/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(informations),
	}).then((data) => data.json());
}

export default function PixelBoard({ setData }) {
	const [title, setTitle] = useState();
	const status = 'in Progress';
	const creationDate = new Date().getTime();
	const [pixel, setPixel] = useState();
	const [author, setAuthor] = useState();
	const [epixel, setEpixel] = useState();
	const [time, setTime] = useState();
	const [endDate, setEtime] = useState();

	function handleSubmit() {
		// e.preventDefault();

		const data = pixelBoardCreatorBack({
			title,
			status,
			creation_date: creationDate,
			size: pixel,
			end_date: endDate,
			author_id: author,
			override_available: epixel,
			user_delay: time,

		});

		setData(data);
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
