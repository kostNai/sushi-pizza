import axios from 'axios'

export const updateOrder = async (orderId: string, token: string) => {
	const res = await axios.patch(
		`http://127.0.0.1:8000/api/order/${orderId}`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)
	return res
}
