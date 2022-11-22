import React, { useState } from 'react';
import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';

import './styles/App.css';

import Login from './components/Login';
import Signup from './components/Signup';
import HomeNavBar from './components/HomeNavBar';
import BoardEditor from './components/BoardEditor';

function App() {
	const [token, setToken] = useState();

	if (!token) {
		return <Login setToken={setToken} />;
	}

	return (
		<>
			<HomeNavBar />
			<BrowserRouter>
				<Routes>
					<Route path="/" />
					<Route path="/login" element={<Login />} />
					<Route path="/sign-up" element={<Signup />} />
					<Route path="/pixelBoards/:id" element={<BoardEditor />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
