import axios from 'axios'

export const editCurrentUser = async (token: string, form: FormData) => {
	const res = await axios.post('http://127.0.0.1:8000/api/user', form, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return res
}
