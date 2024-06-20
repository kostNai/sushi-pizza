import axios from 'axios'
import { refresh } from './refresh'

export const getPaginateProducts = async (page) => {
	const res = await axios.get('http://127.0.0.1:8000/api/paginate-products', {
		params: { page }
	})

	return res
}
