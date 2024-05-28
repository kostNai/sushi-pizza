import axios from 'axios'

export async function deleteUser(id: string, token: string) {
	const res = await axios.delete(`http://127.0.0.1:8000/api/user/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	return res
}
