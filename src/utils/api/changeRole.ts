import axios from 'axios'

export const changeRole = async (
	token: string,
	login: string,
	newRole: string
) => {
	const res = await axios
		.put(
			'http://127.0.0.1:8000/api/change-role',
			{ login: login, role_name: newRole },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
		.then((data) => {
			return data
		})
		.catch((error) => {
			return error
		})
	return res
}
