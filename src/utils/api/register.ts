import { User } from '@/src/app/types/User'
import axios from 'axios'

export const register = async (user: User) => {
	const res = await axios.post('http://127.0.0.1:8000/api/register', {
		...user
	})

	return res
}
