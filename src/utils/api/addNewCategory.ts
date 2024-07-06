import { Category } from '@/src/app/types/Category'
import axios from 'axios'

export const addNewCategory = async (token: string, newCategory: Category) => {
	const res = await axios.post(
		'http://127.0.0.1:8000/api/add-category',
		{ ...newCategory },
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)
	return res
}
