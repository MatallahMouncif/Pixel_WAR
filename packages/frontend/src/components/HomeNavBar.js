import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomeNavBar() {
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
							<NavDropdown.Item href="/createBoard">
								Create new board
							</NavDropdown.Item>
							<NavDropdown.Item href="/createBoard">
								Logout
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav.Link href="/sign-in">Sign in</Nav.Link>
					<Nav.Link href="/sign-up">Sign up</Nav.Link>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default HomeNavBar;
