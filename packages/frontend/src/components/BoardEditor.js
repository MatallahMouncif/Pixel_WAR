/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../styles/BoardEditor.css';
import { useParams } from 'react-router-dom';
import 'toolcool-color-picker';

const BoardEditor = () => {
	const [panelWidth, setPanelWidth] = useState(600);
	const [panelHeight, setPanelHeight] = useState(600);
	const [cellSideNumber, setCellSideNumber] = useState(50);
	const [cellSize, setCellSize] = useState(20);
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
		//recuperer les cellules du board depuis la bd ensuite les draw
	});
	function fillCell(cellX, cellY, e) {
		const currentColor = getColor();
		const canvas = document.getElementById('boardCanvas');
		const ctx = canvas.getContext('2d');
		const startX = cellX * cellSize;
		const startY = cellY * cellSize;
		ctx.fillStyle = currentColor;
		ctx.fillRect(startX, startY, cellSize, cellSize);
		console.log({ cellX, cellY, color: currentColor });
		// saving in db
	}
	function handleCanvasMousedown(e) {
		const canvas = document.getElementById('boardCanvas');
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const cellX = Math.floor(x / cellSize);
		const cellY = Math.floor(y / cellSize);
		fillCell(cellX, cellY);
	}
	return (
		<>
			<h2>PixelBoard #{params.id}</h2>
			<div className="boardEditor">
				<label>Pick a color : &nbsp;</label>
				<toolcool-color-picker color="#000000" id="colorPicker" />
				<p>&nbsp;</p>
				<canvas id="grid" />
				<canvas id="boardCanvas" onMouseDown={handleCanvasMousedown} />
			</div>

		</>
	);
};

export default BoardEditor;
