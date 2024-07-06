import axios from 'axios'

export const addNewOrder = async (productId: string) => {
	const res = await axios.post('http://127.0.0.1:8000/api/new-order', {
		productId
	})

	return res
}
