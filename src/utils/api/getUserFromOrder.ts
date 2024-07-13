import axios from 'axios'

export const getUserFromOrder = async (order_id: string) => {
	const res = await axios.get('http://127.0.0.1:8000/api/get-order-with-user', {
		params: { order_id }
	})
	return res
}
