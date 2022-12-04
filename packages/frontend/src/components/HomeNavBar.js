/* eslint-disable */

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { func } from 'prop-types';

function HomeNavBar(props) {
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	useEffect(() => {
		localStorage.setItem('theme', theme);
		document.body.className = theme;
	}, [theme]);

	function logout() {
		axios({
			method: 'GET',
			withCredentials: true,
			url: 'http://localhost:3003/users/logout',
		}).then((res) => {
			sessionStorage.removeItem('user');
			window.location.href = '/';
		}
		).catch((err) => {
			console.log(err);
		}
		);
	}

	function authButton() {
		if (!props.user) {
			return (
				<ButtonGroup>
					<Button variant={theme} as={Link} to="/sign-in">Login</Button>
					<Button variant={theme} as={Link} to="/sign-up">Signup</Button>
				</ButtonGroup>
			)
		} else {
			return (
				<ButtonGroup>
					<Button variant={theme} as={Link} to="/profile">Profile</Button>
					<Button variant={theme} onClick={logout}>Logout</Button>
				</ButtonGroup>
			)
		}
	}

	return (
		<Navbar bg={theme} variant={theme} expand="lg" id="homeNav">
			<Container>
				<Navbar.Brand href="/">Pixel War</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<NavDropdown title="Profile" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">
								Settings
							</NavDropdown.Item>
							<NavDropdown.Item href="/user">
								Create new board
							</NavDropdown.Item>
							<NavDropdown.Item href="/createBoard">
								Logout
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<div className='mx-3'>
						{authButton()}
					</div>
					<span>☀️</span>
					<label className="toggle-theme">
						{
							theme === 'light'
								? <input className="toggle-checkbox" id="switch" type="checkbox" onChange={toggleTheme} />
								: <input className="toggle-checkbox" id="switch" type="checkbox" onChange={toggleTheme} checked />
						}
						<div className="toggle-switch" />
					</label>
					<span>🌒</span>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default HomeNavBar;
