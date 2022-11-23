import React, { useState } from 'react';
import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';

import './styles/App.css';

import SignIn from './components/SignIn';
import Signup from './components/Signup';
import HomeNavBar from './components/HomeNavBar';
import BoardEditor from './components/BoardEditor';

function App() {
	const [isSigned, setIsSigned] = useState();

	if (!isSigned) {
		return <SignIn setIsSigned={setIsSigned} />;
	}

	return (
		<div className="wrapper">
			<HomeNavBar />
			<BrowserRouter>
				<Routes>
					<Route path="/" />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<Signup />} />
					<Route path="/pixelBoards/:id" element={<BoardEditor />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
