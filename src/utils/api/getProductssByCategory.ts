import axios from 'axios'

export const getProductsByCategory = async (category_name: string) => {
	const res = await axios.get(
		'http://127.0.0.1:8000/api/products-by-category',
		{
			params: { category_name }
		}
	)
	return res
}
