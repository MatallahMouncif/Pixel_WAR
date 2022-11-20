/* eslint-disable */

import React from 'react';
import './styles/App.css';
//import { Users } from './components/Users';
import HomeNavBar from './components/HomeNavBar';
import BoardEditor from './components/BoardEditor';
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";



function App() {
	return (
		<>
			<HomeNavBar />
			<BrowserRouter>
				<Routes>
					<Route path="/" />
					<Route path="/pixelBoards/:id" element={<BoardEditor />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
