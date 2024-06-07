import axios from 'axios'

export const getCategories = async () => {
	const res = await axios
		.get('http://127.0.0.1:8000/api/categories')
		.then((data) => {
			return data
		})
		.catch((err) => {
			return err
		})

	return res
}
