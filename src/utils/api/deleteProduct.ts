import axios from 'axios'

export const deleteProduct = async (token: string, id: string) => {
	const res = await axios
		.delete(`http://127.0.0.1:8000/api/product/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
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
