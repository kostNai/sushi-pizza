'use client'

import { getUsers } from '../../../utils/api/getUsers'
import styles from './styles.module.scss'
import { FormEvent, Suspense, useEffect, useState } from 'react'
import { User } from '../../types/User'
import { deleteUser } from '../../../utils/api/deleteUser'
import { getRoles } from '../../../utils/api/getRoles'
import { Role } from '../../types/Role'
import { useRouter } from 'next/navigation'
import Loading from '../loading'
import { changeRole } from '../../../utils/api/changeRole'
import EditRoleRadio from '../../../components/editRoleRadio/EditRoleRadio'
import AddNewRole from '../../../components/addNewRole/AddNewRole'
import AddUserForm from '../../../components/addUserForm/AddUserForm'
import { addNewUser } from '../../../utils/api/addUser'

export default function RootUsers() {
	const [users, setUsers] = useState<User[] | undefined>([])
	const [roles, setRoles] = useState<Role[] | undefined>([])
	const [token, setToken] = useState<string | undefined>('')
	const [isRoleChange, setIsRoleChange] = useState<boolean | undefined>(false)
	const [version, setVersion] = useState<number | undefined>(0)
	const [changedRole, setChangedRole] = useState<string | undefined>('')
	const [selectedLogin, setSelectedLogin] = useState<string | undefined>('')
	const [isAddingRole, setIsAddingRole] = useState<boolean | undefined>(false)
	const [isAddingUser, setIsAddingUser] = useState<boolean | undefined>(false)
	const [user, setUser] = useState<User | undefined>({
		login: '',
		name: '',
		password: '',
		phone_number: ''
	})

	const router = useRouter()
	useEffect(() => {
		setToken(localStorage.getItem('token'))

		if (token) {
			const res = getUsers(token).then((data) => {
				if (data.status === 200) {
					setUsers(data.data.users)
				}
				if (data.status === 401) {
					localStorage.removeItem('token')
					router.push('/login')
				}
			})
		}
	}, [token, version, router])
	useEffect(() => {
		if (token) {
			const res = getRoles(token)
				.then((data) => {
					setRoles(data.data.roles)
				})
				.catch((error) => {
					if (error.response.status !== 200) {
					}
				})
		}
	}, [token, version])
	const deleteUserHandler = async (id: string) => {
		const res = await deleteUser(id, token)
		setVersion(version + 1)
	}

	const roleName = (roles: Role[], indx: string): string => {
		const found = roles.find((role: Role) => role.user_id === indx)

		return found?.role_name
	}
	const getRoleName = () => {
		const arrayToken = token.split('.')
		const tokenPayload = JSON.parse(atob(arrayToken[1]))
		console.log(tokenPayload.role)
	}

	const changeRoleHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setChangedRole(e.target.value)
	}
	const startChangingRole = (login: string) => {
		setIsRoleChange(true)
		setSelectedLogin(login)
	}
	const successChangedRole = async (login: string) => {
		if (changedRole) {
			await changeRole(token, login, changedRole).then((data) => {
				if (data.status === 200) {
					setVersion(version + 1)
					setIsRoleChange(false)
				}
			})
		}
	}
	const cancelHandler = (e: FormEvent) => {
		e.preventDefault()
		setIsRoleChange(false)
	}
	const cancelAddingRoleHandler = (e: FormEvent) => {
		e.preventDefault()
		setIsAddingRole(false)
	}

	const onChangeUserHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}
	const addUser = async (e: FormEvent) => {
		e.preventDefault()
		const res = await addNewUser(token, user)
		console.log(res)
	}
	const cancelUserHandler = (e: FormEvent) => {
		e.preventDefault()
		setIsAddingUser(false)
	}
	return (
		users && (
			<div>
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
												<button
													className={`${styles.btn} ${styles.btnEdit}`}
													onClick={() => startChangingRole(user.login)}
												>
													Змінити роль
												</button>
												{isRoleChange && (
													<EditRoleRadio
														options={roles}
														onChange={changeRoleHandler}
														onClickCancel={cancelHandler}
														onClickSuccess={() =>
															successChangedRole(selectedLogin)
														}
													/>
												)}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className={styles.addingDiv}>
							<AddNewRole
								isAddingRole={isAddingRole}
								onClickBtnReset={cancelAddingRoleHandler}
								onClickTitle={() => setIsAddingRole(true)}
								onClickBtnSuccess={() => {}}
							/>
							<AddUserForm
								user={user}
								onChangeHandler={(e) => onChangeUserHandler(e)}
								onSubmit={addUser}
								onCancelClick={cancelUserHandler}
								isAddingUser={isAddingUser}
								onClickTitle={() => setIsAddingUser(true)}
							/>
						</div>
					</div>
				</section>
			</div>
		)
	)
}
