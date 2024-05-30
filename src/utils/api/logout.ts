import axios from 'axios'

export const logout = async (token: string) => {
	const res = await axios.post(
		'http://127.0.0.1:8000/api/logout',
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)

	return res
}
