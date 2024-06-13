import axios from 'axios'

export const addNewCategory = async (token: string, category_name: string) => {
	const res = await axios.post(
		'http://127.0.0.1:8000/api/add-category',
		{ category_name },
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)
	return res
}
