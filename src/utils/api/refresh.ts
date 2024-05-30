import axios from 'axios'

export function refresh(token: string) {
	const res = axios.post(
		'http://127.0.0.1:8000/api/refresh',
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)
	return res
}
