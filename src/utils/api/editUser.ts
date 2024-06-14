import axios from 'axios'

export const editUser = async (token: string, form: FormData, id: string) => {
	const res = await axios.post(`http://127.0.0.1:8000/api/user/${id}`, form, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data'
		}
	})

	return res
}
