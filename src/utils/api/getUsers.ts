import axios from 'axios'

export const getUsers = async (token: string) => {
	const res = await axios
		.get('http://127.0.0.1:8000/api/users', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((data) => {
			return data
		})
		.catch((err) => {
			return err.response
		})

	return res
}
