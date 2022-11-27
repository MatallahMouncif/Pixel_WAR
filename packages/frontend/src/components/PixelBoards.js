/* eslint-disable */
import React, { useState, useEffect } from 'react';
import '../styles/PixelBoards.css';
import { useParams } from 'react-router-dom';
import BoardEditor from './BoardEditor';
import data from './boards.json';
const PixelBoards = () => {
	const params = useParams();
	return (
		<>
			<div className="pixelBoardsGallery">
				{data.PixelBoards.map((board) => (
					<div className='boards-container'>
						<a href={`/pixelBoards/${board.id}`}>
							<img src={board.data}></img>
						</a>
						<div className='boarddesc'>{board.id}</div>
					</div>
				))}
			</div>
		</>
	);
};
export default PixelBoards;
