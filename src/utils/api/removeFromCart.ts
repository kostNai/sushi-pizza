import axios from 'axios'

export const removeFromCart = async (product_id: string, order_id: string) => {
	const res = await axios.delete('http://127.0.0.1:8000/api/order', {
		params: { product_id, order_id }
	})
	return res
}
