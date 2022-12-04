/* eslint-disable */
import React, { useState, useEffect } from 'react';
import '../styles/PixelBoards.css';
import { useParams, Link } from 'react-router-dom';
import BoardEditor from './BoardEditor';
import axios from 'axios';
import 'bootstrap';

const PixelBoards = () => {
	const [boards, setBoards] = useState(null);
	const [totalUsers, setTotalUsers] = useState(0);
	const [totalPixelBoards, setTotalPixelBoards] = useState(0);
	const params = useParams();

	useEffect(() => {
		axios.get('http://localhost:3003/pixelboards/').then((res) => {
			setBoards(res.data);
		}, (err) => {
			console.log(err);
		});
		axios.get('http://localhost:3003/users/count').then((res) => {
			setTotalUsers(res.data.count);
		}, (err) => {
			console.log(err);
		});
		axios.get('http://localhost:3003/pixelBoards/count').then((res) => {
			setTotalPixelBoards(res.data.count);
		}, (err) => {
			console.log(err);
		});
	}, []);
	return (
		<>
			<div style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}>
				<div className="badge bg-primary text-wrap" style={{ width: 20 + "rem" }}>
					<p style={{ textAlign: "center" }} className="fs-4">Total of users registred : {totalUsers}</p>
				</div>
				<br></br>
				<div className="badge bg-primary text-wrap" style={{ width: 25 + "rem" }}>
					<p style={{ textAlign: "center" }} className="fs-4">Total of Pixel Boards created : {totalPixelBoards}</p>
				</div>
			</div>
			<div className="pixelBoardsGallery">

				{boards && boards.map((board) => (
					<div className={'boards-container'} key={board._id} style={board.status == "in Progress" ? { border: "1px solid green" } : { border: "1px solid red" }}>
						<Link to={{
							pathname: "/pixelBoards/" + board._id,
							id: board._id
						}}>
							<img src={board.thumbnail} style={board.status == "in Progress" ? { border: "3px solid green" } : { border: "3px solid red" }}></img>
						</Link>
						<div className='boarddesc'>{board.title}</div>
						<div className='boarddesc'>Creation date : {board.creation_date}</div>
						<div className='boarddesc'>End date : {board.end_date}</div>
						<div className='boarddesc'>Status : {board.status}</div>
					</div>
				))}
			</div>
		</>
	);
};
export default PixelBoards;
