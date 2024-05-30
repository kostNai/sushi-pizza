import axios from 'axios'
import { User } from '../../app/types/User'

export const editRootUser = async (user: User, token: string) => {
	const res = await axios.patch(
		'http://127.0.0.1:8000/api/user',
		{ ...user },
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)

	return res
}
