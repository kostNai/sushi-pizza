import { Role } from './Role'

export type User = {
	id?: string
	name?: string
	login?: string
	email?: string
	password?: string
	token?: string
	phone_number?: string
	user_image?: string
	role_id?: string
	role?: Role
}
