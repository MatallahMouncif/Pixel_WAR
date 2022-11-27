/* eslint-disable */
import React, { useState, useEffect } from 'react';
import '../styles/BoardEditor.css';
import { useParams } from 'react-router-dom';
import 'toolcool-color-picker';
import data from './boards.json';
import 'bootstrap';
const BoardEditor = () => {
	const [panelWidth, setPanelWidth] = useState(600);
	const [panelHeight, setPanelHeight] = useState(600);
	const [cellSideNumber, setCellSideNumber] = useState(50);
	const [cellSize, setCellSize] = useState(20);
	const [editMode, setEditMode] = useState(false);
	let [lastCell, setLastCell] = useState(null);
	let [currentCell, setCurrentCell] = useState(null);
	const params = useParams();

	function getColor() {
		const colorPicker = document.getElementById('colorPicker');
		return colorPicker.hex;
	}
	useEffect(() => {
		const canvas = document.getElementById('boardCanvas');
		canvas.width = panelWidth;
		canvas.height = panelHeight;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, panelWidth, panelHeight);
		const grid = document.getElementById('grid');
		const gridCtx = grid.getContext('2d');
		gridCtx.canvas.width = panelWidth;
		gridCtx.canvas.height = panelHeight;
		drawGrid(ctx);
		//recuperer les cellules du board depuis la bd ensuite les draw
	});
	function drawGrid(ctx) {
		for (let x = 0; x <= panelWidth; x += 20) {
			for (let y = 0; y <= panelHeight; y += 20) {
				ctx.moveTo(x, 0);
				ctx.lineTo(x, panelHeight);
				ctx.stroke();
				ctx.moveTo(0, y);
				ctx.lineTo(panelWidth, y);
				ctx.stroke();
			}
		}
	}
	function fillCell(cellX, cellY) {
		const currentColor = getColor();
		const canvas = document.getElementById('boardCanvas');
		const ctx = canvas.getContext('2d');
		currentCell = { cellX, cellY, color: currentColor };
		if (lastCell != null) {
			const lastX = lastCell.cellX * cellSize;
			const lastY = lastCell.cellY * cellSize;
			ctx.fillStyle = lastCell.color;
			ctx.fillRect(lastX + 1, lastY + 1, cellSize - 2, cellSize - 2);
		}
		const startX = cellX * cellSize;
		const startY = cellY * cellSize;
		ctx.fillStyle = currentColor;
		ctx.fillRect(startX + 1, startY + 1, cellSize - 2, cellSize - 2);
		lastCell = { cellX, cellY, color: "#ffffff" };
		document.getElementById('cellX').textContent = "Cell X : " + cellX;
		document.getElementById('cellY').textContent = "Cell Y : " + cellY;
		document.getElementById('cellColor').textContent = "Cell Color : " + currentColor;
		// saving in db
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
		const id = 3;
		console.log(currentCell);
		console.log(img);
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
							<toolcool-color-picker color="#000000" id="colorPicker" />
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
