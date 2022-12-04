/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import '../styles/BoardEditor.css';
import { useParams, useNavigate } from 'react-router-dom';
import 'toolcool-color-picker';
import 'bootstrap';
import axios from 'axios';
import { CirclePicker } from 'react-color';
import { exportComponentAsPNG } from 'react-component-export-image';

function BoardEditor() {
	const params = useParams();
	const panelRef = useRef();
	const [cellSize, setCellSize] = useState(20);
	const [editMode, setEditMode] = useState(false);
	let [lastCell, setLastCell] = useState(null);
	let [currentCell, setCurrentCell] = useState(null);
	let [selectedColor, setSelectedColor] = useState('#f44336');
	let [pixels, setPixels] = useState(null);
	let [board, setBoard] = useState({
		title: 'fetching',
		creation_date: '',
		override_available: '',
		end_date: '',
		status: '',
		user_delay: '',
		author_id: '',
		visitor_allowed: [],
	});
	function drawGrid(ctx, size) {
		for (let x = 0; x <= size; x += 20) {
			for (let y = 0; y <= size; y += 20) {
				ctx.moveTo(x, 0);
				ctx.lineTo(x, size);
				ctx.stroke();
				ctx.moveTo(0, y);
				ctx.lineTo(size, y);
				ctx.stroke();
			}
		}
	}
	function fillCellWithColor(x, y, color) {
		const canvas = document.getElementById('boardCanvas');
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = color;
		ctx.fillRect((x * cellSize) + 1, (y * cellSize) + 1, cellSize - 2, cellSize - 2);
	}
	useEffect(() => {
		const canvas = document.getElementById('boardCanvas');
		const grid = document.getElementById('grid');
		const gridCtx = grid.getContext('2d');
		axios.get(`http://localhost:3003/pixelBoards/${params.id}`).then((res) => {
			let pboard = res.data;
			pboard.creation_date = new Date(pboard.creation_date).toLocaleDateString('fr-FR');
			pboard.end_date = new Date(pboard.end_date).toLocaleDateString('fr-FR');
			setBoard(pboard);
			canvas.width = res.data.size * 20;
			canvas.height = res.data.size * 20;
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			gridCtx.canvas.width = canvas.width;
			gridCtx.canvas.height = canvas.height;
			drawGrid(ctx, res.data.size * 20);
			axios.get(`http://localhost:3003/pixelboards/${params.id}/pixels`).then((response) => {
				setPixels(response.data);
				response.data.forEach((pixel) => {
					fillCellWithColor(pixel.x, pixel.y, pixel.color);
				});
			});
		});
		// canvas.width = panelWidth;
		// canvas.height = panelHeight;
		// ctx.fillStyle = '#ffffff';
		// ctx.fillRect(0, 0, panelWidth, panelHeight);

		// gridCtx.canvas.width = panelWidth;
		// gridCtx.canvas.height = panelHeight;
		// drawGrid(ctx);
	}, []);
	function setLastColor(cellX, cellY) {
		for (let i = 0; i < pixels.length; i += 1) {
			if (pixels[i].x === cellX && pixels[i].y === cellY) {
				return pixels[i].color;
			}
		}
		return '#ffffff';
	}
	function fillCell(cellX, cellY) {
		const currentColor = selectedColor;
		const canvas = document.getElementById('boardCanvas');
		const ctx = canvas.getContext('2d');
		currentCell = { cellX, cellY, color: currentColor };
		if (lastCell != null) {
			fillCellWithColor(lastCell.cellX, lastCell.cellY, lastCell.color);
		}
		const startX = cellX * cellSize;
		const startY = cellY * cellSize;
		ctx.fillStyle = currentColor;
		ctx.fillRect(startX + 1, startY + 1, cellSize - 2, cellSize - 2);
		lastCell = { cellX, cellY, color: setLastColor(cellX, cellY) };
		document.getElementById('cellX').textContent = `Cell X : ${cellX}`;
		document.getElementById('cellY').textContent = `Cell Y : ${cellY}`;
		document.getElementById('cellColor').textContent = `Cell Color : ${currentColor}`;
	}

	function switchEditMode() {
		setEditMode(!editMode);
	}
	function handleCanvasMousedown(e) {
		e.preventDefault();
		const canvas = document.getElementById('boardCanvas');
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const cellX = Math.floor(x / cellSize);
		const cellY = Math.floor(y / cellSize);
		fillCell(cellX, cellY, e);
	}

	function updateBoard() {
		const canvas = document.getElementById('boardCanvas');
		const img = canvas.toDataURL('image/png');
		if (currentCell === null) {
			alert('Select a Pixel to update');
			return;
		}
		axios(
			{
				method: 'post',
				url: 'http://localhost:3003/pixels/',
				data: {
					last_update: new Date().getTime(),
					color: selectedColor,
					x: currentCell.cellX,
					y: currentCell.cellY,
					author_id: sessionStorage.getItem('user_id'),
					pixel_board_id: params.id.toString(),
				},
				withCredentials: true,
			},
		).then((res) => {
			if (res.status === 200) {
				axios.patch(`http://localhost:3003/pixelboards/${params.id}/patch`, {
					thumbnail: img,
				});
				alert('Pixel Updated');
				setEditMode(false);
			}
		}).catch((error) => {
			alert('Cant draw yet ;)');
			window.location.reload();
			setEditMode(false);
		});
	}
	function changeColor(color) {
		if (lastCell !== null) { fillCellWithColor(lastCell.cellX, lastCell.cellY, lastCell.color); }
		setSelectedColor(color.hex);
	}
	return (
		<div style={{
			display: 'flex',
			justifyContent: 'space-evenly',
			alignItems: 'center',
			flexDirection: 'row',
		}}
		>
			<div>
				<h2>PixelBoard : {board.title}</h2>
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
				>
					<p className="fs-4">Creation date : <strong>{board.creation_date}</strong></p>
					<p className="fs-4">End date : <strong>{board.end_date}</strong></p>
					<p className="fs-4">Size : <strong>{board.size}</strong></p>
					<p className="fs-4">Visitor allowed : <strong>{board.visitor_allowed ? 'Yes' : 'No'}</strong></p>
					<p className="fs-4">Cooldown : <strong>{Math.floor(board.user_delay / 1000)} S</strong></p>
					<p className="fs-4">Replace Pixel : <strong>{board.override_available ? 'Yes' : 'No'}</strong></p>

				</div>
			</div>
			<div>
				{editMode
					? (
						<>
							<div className="boardEditor">
								<p>&nbsp;</p>
								<canvas id="grid" />
								<canvas id="boardCanvas" onMouseDown={handleCanvasMousedown} ref={panelRef} />

							</div>
							{board.end_date > new Date().toLocaleDateString('fr-FR')
								? (
									<div className="pixelInfo">
										<label>Pick a color : &nbsp;</label>
										<CirclePicker color={selectedColor} onChangeComplete={changeColor} id="colorPicker" />
										<p id="cellX" />
										<p id="cellY" />
										<p id="cellColor" />
										{sessionStorage.getItem('user_id') !== null
											? <><button className="btn btn-success" type="button" onClick={updateBoard}>SAVE PIXEL</button><button className="btn btn-success" type="button" onClick={() => exportComponentAsPNG(panelRef)}>EXPORT TO PNG</button></> : <h2>Sign In to draw a pixel !</h2>}

									</div>
								)
								: <h2>PixelBoard is closed</h2>}

						</>
					)
					: (
						<>
							<div className="boardEditor">
								<p>&nbsp;</p>
								<canvas id="grid" />
								<canvas id="boardCanvas" ref={panelRef} />

							</div>
							{board.end_date > new Date().toLocaleDateString('fr-FR')
								? (
									<div className="pixelInfo">
										{sessionStorage.getItem('user_id') !== null
											? <><button className="btn btn-success" style={{ margin: '15px' }} type="button" onClick={switchEditMode}>DRAW PIXEL</button><button className="btn btn-success" type="button" onClick={() => exportComponentAsPNG(panelRef)}>Export to PNG</button></> : <h2>Sign In to draw a pixel !</h2>}

									</div>
								)
								: <h2>PixelBoard is closed</h2>}

						</>
					)}
			</div>
		</div>
	);
}

export default BoardEditor;
