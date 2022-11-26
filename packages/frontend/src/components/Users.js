import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Button from 'react-bootstrap/Button';

export default function Users() {
	return (
		<div className="sidebar">
			<Nav className="flex-column">
				<NavItem>
					<Nav.Link href="/user">Profile</Nav.Link>
				</NavItem>
				<NavItem>
					<Nav.Link href="/user/createPixelBoard">
						Create Pixel Board
					</Nav.Link>
				</NavItem>
				<NavItem>
					<Nav.Link href="/pixelBoards">Pixel Boards</Nav.Link>
				</NavItem>
				<NavItem>
					<Nav.Link href="/sign-in">
						<Button variant="outline-danger">Logout</Button>
					</Nav.Link>
				</NavItem>
			</Nav>
		</div>
	);
}
// User.propTypes = {

// };
