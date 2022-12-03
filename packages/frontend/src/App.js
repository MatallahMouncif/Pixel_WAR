import React, { useEffect } from 'react';

import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';

import './styles/App.css';

import axios from 'axios';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HomeNavBar from './components/HomeNavBar';
import BoardEditor from './components/BoardEditor';
import PixelBoard from './components/PixelBoardCreator';
import Users from './components/Users';
import PixelBoards from './components/PixelBoards';

function App() {
	const [user, setUser] = React.useState(null);

	useEffect(() => {
		axios({
			method: 'GET',
			withCredentials: true,
			url: 'http://localhost:3003/users/me',
		}).then((res) => {
			setUser(res.data);
			sessionStorage.setItem('user', JSON.stringify(res.data));
			console.log(res.data);
		}).catch((err) => {
			console.log(err);
		});
	}, []);
	return (
		<div className="wrapper">
			<BrowserRouter>
				<>
					<HomeNavBar user={user} />
					<Routes>
						<Route path="/" element={<PixelBoards />} />
						<Route path="/sign-in" element={<SignIn />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/pixelBoards/:id" element={<BoardEditor />} />
						<Route exact path="/user" element={<Users />} />
						<Route path="/user/createPixelBoard" element={<PixelBoard />} />
					</Routes>
				</>
			</BrowserRouter>
		</div>
	);
}

export default App;
