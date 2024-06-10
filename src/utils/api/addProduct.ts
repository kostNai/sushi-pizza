import axios from 'axios'
import { Product } from '../../app/types/Product'

export const addProduct = async (token: string, form: FormData) => {
	const res = await axios
		.post('http://127.0.0.1:8000/api/add-product', form, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data'
			}
		})
		.then((data) => {
			return data
		})
		.catch((err) => {
			return err
		})
	return res
}
