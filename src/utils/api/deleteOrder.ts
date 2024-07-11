import axios from 'axios'

export const deleteOrder = async (order_id: string) => {
	const res = await axios.delete(`http://127.0.0.1:8000/api/order/${order_id}`)

	return res
}
