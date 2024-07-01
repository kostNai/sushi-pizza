import { AddressType } from '@/src/app/types/Address'
import axios from 'axios'

export const editAddress = async (
	token: string,
	addressId: string,
	address: AddressType
) => {
	const res = await axios.patch(
		`http://127.0.0.1:8000/api/address/${addressId}`,
		{ ...address },
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)
	return res
}
