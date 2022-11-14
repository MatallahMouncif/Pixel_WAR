const { REACT_APP_BACKEND_URL } = process.env;
const USER_BACKEND_PATH = '/user';

export const getAllUsers = async () => {
	const resp = await fetch(`${REACT_APP_BACKEND_URL}${USER_BACKEND_PATH}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	if (resp.ok) {
		return resp.json();
	}
	throw new Error('Unable to get users');
};
