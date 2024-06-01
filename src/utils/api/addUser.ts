import axios from 'axios'
import { User } from '../../app/types/User'

export const addNewUser = async (token: string, newUser: User) => {
	const res = await axios
		.post(
			'http://127.0.0.1:8000/api/user',
			{ ...newUser },
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
