import axios from 'axios'

export const addNewOrder = async (product_id: string, token: string) => {
	const res = await axios.post(
		'http://127.0.0.1:8000/api/new-order',
		{
			product_id
		},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)

	return res
}
