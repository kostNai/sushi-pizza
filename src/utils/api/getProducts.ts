import axios from 'axios'
import { refresh } from './refresh'

export const getProducts = async (page) => {
	const res = await axios.get('http://127.0.0.1:8000/api/products', {
		params: { page }
	})

	return res
}
