import axios from 'axios'

export const getProductFromOrder = async (order_id: string) => {
	const res = await axios.get('http://127.0.0.1:8000/api/get-order', {
		params: { order_id }
	})
	return res
}
