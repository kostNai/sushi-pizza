'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'

import styles from './styles.module.scss'
import { getUsers } from '../../../utils/api/getUsers'
import { User } from '../../types/User'
import { deleteUser } from '../../../utils/api/deleteUser'
import { getRoles } from '../../../utils/api/getRoles'
import { Role } from '../../types/Role'
import { changeRole } from '../../../utils/api/changeRole'
import EditRoleRadio from '../../../components/editRoleRadio/EditRoleRadio'
import AddNewRole from '../../../components/addNewRole/AddNewRole'
import AddUserForm from '../../../components/addUserForm/AddUserForm'
import { addNewUser } from '../../../utils/api/addUser'
import { addNewRole } from '../../../utils/api/addNewRole'
import { refresh } from '../../../utils/api/refresh'

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
		email: '',
		password: '',
		phone_number: ''
	})
	const [newRole, setNewRole] = useState<string | undefined>('')

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
			const res = getRoles(token).then((data) => {
				setRoles(data.data.roles)
			})
		}
	}, [token])
	const deleteUserHandler = async (id: string) => {
		const res = await deleteUser(id, token)
		setVersion(version + 1)
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
		const res = await addNewUser(token, user).then((data) => {
			if (data.status === 200) {
				setUser({
					...user,
					login: '',
					email: '',
					password: '',
					phone_number: ''
				})

				setVersion(version + 1)
			}
		})
	}
	const cancelUserHandler = (e: FormEvent) => {
		e.preventDefault()
		setIsAddingUser(false)
	}

	const addnewRoleHandler = async (e: FormEvent, newRole: string) => {
		e.preventDefault()
		const res = await addNewRole(token, newRole)
		if (res.status === 200) {
			setVersion(version + 1)
			setNewRole('')

			refresh(token).then((data) => {
				localStorage.setItem('token', data.data.access_token)
			})
		}
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
										<td>{user?.role?.role_name ? user.role.role_name : ''}</td>
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
								value={newRole}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setNewRole(e.target.value)
								}
								onSubmit={(e) => {
									addnewRoleHandler(e, newRole)
								}}
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
