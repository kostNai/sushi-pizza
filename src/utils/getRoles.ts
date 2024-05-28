import axios from 'axios'

export const getRoles = async (token: string) => {
	const res = await axios.get('http://127.0.0.1:8000/api/roles', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return res
}
