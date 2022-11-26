import React from 'react';
import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';

import './styles/App.css';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HomeNavBar from './components/HomeNavBar';
import BoardEditor from './components/BoardEditor';
import PixelBoard from './components/PixelBoardCreator';
import Users from './components/Users';
import useToken from './components/useToken';

function App() {
	const { token, setToken } = useToken();

	if (!token) {
		return <SignIn setToken={setToken} />;
	}

	return (
		<div className="wrapper">
			<HomeNavBar />
			<BrowserRouter>
				<Routes>
					<Route path="/" />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/pixelBoards/:id" element={<BoardEditor />} />
					<Route exact path="/user" element={<Users />} />
					<Route path="/user/createPixelBoard" element={<PixelBoard />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
