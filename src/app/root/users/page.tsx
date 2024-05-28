'use client'

import { useSession } from 'next-auth/react'
import { getUsers } from '../../../utils/getUsers'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { User } from '../../types/User'
import { deleteUser } from '../../../utils/deleteUser'
import { getRoles } from '../../../utils/getRoles'
import { Role } from '../../types/Role'

export default function RootUsers() {
	const { data: session, status, update } = useSession()
	const [usersData, setUserData] = useState(null)
	const [users, setUsers] = useState<User[] | undefined>([])
	const [roles, setRoles] = useState<Role[] | undefined>([])
	const [token, setToken] = useState<string | undefined>('')
	const [version, setVersion] = useState<number | undefined>(0)
	useEffect(() => {
		if (status === 'authenticated') setUserData(session.user)
		setToken(usersData?.token)

		if (token) {
			const res = getUsers(token).then((data) => {
				if (data.status === 200) {
					setUsers(data.data.users)
				}
			})
		}
	}, [session, status, usersData?.token, token, version])
	useEffect(() => {
		if (token) {
			const res = getRoles(token).then((data) => {
				setRoles(data.data.roles)
			})
		}
	}, [token])
	const deleteUserHandler = async (id: string) => {
		const res = await deleteUser(id, token)
		setVersion(version + 1)
	}

	const roleName = (roles: Role[], indx: string): string => {
		const found = roles.find((role: Role) => role.user_id === indx)

		return found.role_name
	}

	return (
		users && (
			<section className={styles.users}>
				<div>
					<table className={styles.usersTable}>
						<thead>
							<tr>
								<th>id</th>
								<th>Ім&apos;я</th>
								<th>Логін</th>
								<th>Номер телефону</th>
								<th>Роль</th>
								<th>Дії</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id}>
									<td>{user.id}</td>
									<td>{user.name}</td>
									<td>{user.login}</td>
									<td>{user.phone_number}</td>
									<td>{roles.length ? roleName(roles, user.id) : ''}</td>
									<td>
										<div className={styles.actions}>
											<button
												className={`${styles.btn} ${styles.btnDelete}`}
												onClick={() => deleteUserHandler(user.id)}
											>
												Видалити
											</button>
											<button className={`${styles.btn} ${styles.btnEdit}`}>
												Змінити
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		)
	)
}
