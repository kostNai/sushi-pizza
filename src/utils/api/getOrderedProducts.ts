import axios from 'axios'
import { OrderParam } from '../../app/types/OrderParamType'
import { OrderOption } from '../../app/types/OrderOption'

export const getOrderedProducts = async (
	param: OrderParam,
	order_option: OrderOption
) => {
	const res = await axios.get('http://127.0.0.1:8000/api/get-ordered-product', {
		params: { param, order_option }
	})
	return res
}
