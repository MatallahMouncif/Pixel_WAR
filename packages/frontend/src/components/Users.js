import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../query/user';
// import PropTypes from 'prop-types';

export const Users = () => {
	const [user, setUser] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		getAllUsers().then((u) => setUser(u)).catch((err) => setError(err));
	}, []);

	return (
		<section>
			<h1>User List</h1>
			<ul>
				{ user.map((u) => (
					<li key={u.id}>
						{u.name}
					</li>
				))}
			</ul>
			{error && <p>{error.message}</p>}
		</section>
	);
};

// User.propTypes = {

// };
