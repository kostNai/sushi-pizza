import axios from 'axios'

export const login = async (login: string, password: string) => {
	const res = await axios.post('http://127.0.0.1:8000/api/login', {
		login,
		password
	})

	return res
}
