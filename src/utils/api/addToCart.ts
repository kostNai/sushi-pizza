import axios from 'axios'

export const addToCart = async (order_id: string, product_id: string) => {
	const res = await axios.post('http://127.0.0.1:8000/api/add-to-order', {
		order_id,
		product_id
	})
	return res
}
