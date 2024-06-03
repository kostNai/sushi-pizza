import axios from 'axios'

export const addNewRole = async (token: string, newRole: string) => {
	const res = await axios
		.post(
			'http://127.0.0.1:8000/api/role',
			{ role_name: newRole },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
		.then((data) => {
			return data
		})
		.catch((err) => {
			return err
		})

	return res
}
