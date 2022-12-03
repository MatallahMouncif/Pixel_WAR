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

	useEffect(() => {

	});
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
		console.log(props.user);
		if (!props.user) {
			return (
				<ButtonGroup>
					<Button variant="secondary" as={Link} to="/sign-in">Login</Button>
					<Button variant="secondary" as={Link} to="/sign-up">Signup</Button>
				</ButtonGroup>
			)

		} else {
			return <Button variant="secondary" onClick={logout}>Logout</Button>
		}
	}
	return (
		<Navbar bg="light" expand="lg" id="homeNav">
			<Container>
				<Navbar.Brand href="/">Pixel War</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/pixelBoards">Pixel Boards</Nav.Link>
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
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default HomeNavBar;
