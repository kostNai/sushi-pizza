import axios from 'axios'
import { OrderParam } from '@/types/OrderParamType'
import { OrderOption } from '@/types/OrderOption'

export const getOrderedUsers = async (
	param: OrderParam,
	order_option: OrderOption,
	token: string
) => {
	const res = await axios.get('http://127.0.0.1:8000/api/get-ordered-users', {
		params: { param, order_option },
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return res
}
