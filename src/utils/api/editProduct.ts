import axios from 'axios'
import { Product } from '../../app/types/Product'

export const editProduct = async (
	token: string,
	id: string,
	product: Product
) => {
	const res = await axios
		.put(
			`http://127.0.0.1:8000/api/product/${id}`,
			{
				...product
			},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
		.then((data) => {
			return data
		})
		.catch((err) => {
			return err
		})

	return res
}
