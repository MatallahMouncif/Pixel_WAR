/* eslint-disable */
import React, { useState, useEffect } from 'react';
import '../styles/BoardEditor.css';
import { useParams, useNavigate } from 'react-router-dom';
import 'toolcool-color-picker';
import 'bootstrap';
import axios from 'axios';
import { CirclePicker } from 'react-color';
import { func } from 'prop-types';
function BoardEditor(props) {
	const params = useParams();
	const [panelWidth, setPanelWidth] = useState(0);
	const [panelHeight, setPanelHeight] = useState(0);
	const [cellSideNumber, setCellSideNumber] = useState(0);
	const [cellSize, setCellSize] = useState(20);
	const [editMode, setEditMode] = useState(false);
	let [lastCell, setLastCell] = useState(null);
	let [currentCell, setCurrentCell] = useState(null);
	let [selectedColor, setSelectedColor] = useState('#f44336');
	let [pixels, setPixels] = useState(null);
	let [redirect, setRedirect] = useState(false);
	const navigate = useNavigate();



	function changeColor(color) {
		if (lastCell !== null)
			fillCellWithColor(lastCell.cellX, lastCell.cellY, lastCell.color);
		setSelectedColor(color.hex);
		console.log(selectedColor);
	}
	useEffect(() => {
		const canvas = document.getElementById('boardCanvas');
		const grid = document.getElementById('grid');
		const gridCtx = grid.getContext('2d');
		axios.get('http://localhost:3003/pixelBoards/' + params.id).then((res) => {
			console.log(res.data.size * 20);
			canvas.width = res.data.size * 20;
			canvas.height = res.data.size * 20;
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			gridCtx.canvas.width = canvas.width;
			gridCtx.canvas.height = canvas.height;
			drawGrid(ctx, res.data.size * 20);
			axios.get('http://localhost:3003/pixelboards/' + params.id + "/pixels").then((response) => {
				setPixels(response.data);
				console.log(response.data);
				response.data.forEach(pixel => {
					fillCellWithColor(pixel.x, pixel.y, pixel.color);
				});

			});
		})
		// canvas.width = panelWidth;
		// canvas.height = panelHeight;	
		// ctx.fillStyle = '#ffffff';
		// ctx.fillRect(0, 0, panelWidth, panelHeight);

		// gridCtx.canvas.width = panelWidth;
		// gridCtx.canvas.height = panelHeight;
		// drawGrid(ctx);

	}, []);
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
		document.getElementById('cellX').textContent = "Cell X : " + cellX;
		document.getElementById('cellY').textContent = "Cell Y : " + cellY;
		document.getElementById('cellColor').textContent = "Cell Color : " + currentColor;

	}
	function setLastColor(cellX, cellY) {
		for (let i = 0; i < pixels.length; i++) {
			if (pixels[i].x == cellX && pixels[i].y == cellY) {
				return pixels[i].color;
			}
		}

		return '#ffffff';
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
					pixel_board_id: params.id.toString()
				},
				withCredentials: true
			}
		).then((res) => {
			if (res.status == 200) {
				axios.patch('http://localhost:3003/pixelboards/' + params.id + "/patch", {
					thumbnail: img
				});
			}
			setEditMode(false)
		}).catch((error) => {
			console.log(error);
		});
	}
	return (
		<>
			<h2>PixelBoard #{params.id}</h2>
			{editMode
				? (
					<>
						<div className="boardEditor">
							<p>&nbsp;</p>
							<canvas id="grid" />
							<canvas id="boardCanvas" onMouseDown={handleCanvasMousedown} />

						</div>
						<div className='pixelInfo'>
							<label>Pick a color : &nbsp;</label>
							<CirclePicker color={selectedColor} onChangeComplete={changeColor} id="colorPicker" />
							<p id='cellX'></p>
							<p id='cellY'></p>
							<p id='cellColor'></p>
							<button className="btn btn-success" type="button" onClick={updateBoard}>SAVE PIXEL</button>
						</div>

					</>
				)
				: (
					<>
						<div className="boardEditor">
							<p>&nbsp;</p>
							<canvas id="grid" />
							<canvas id="boardCanvas" />

						</div>
						<div className='pixelInfo'>
							<button className="btn btn-success" style={{ margin: "15px" }} type="button" onClick={switchEditMode}>DRAW PIXEL</button>
						</div>
					</>
				)}
		</>
	);
};

export default BoardEditor;
