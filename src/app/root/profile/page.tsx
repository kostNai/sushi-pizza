'use client'
import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { editRootUser } from '../../../utils/api/editRootUser'
import { User } from '../../types/User'
import EditUserForm from '../../../components/editUserForm/EditUserForm'
import { refresh } from '../../../utils/api/refresh'

export default function RootProfile() {
	const [token, setToken] = useState<string | undefined>('')
	const [isEdit, setIsEdit] = useState<boolean | undefined>(false)
	const [version, setVersion] = useState<number | undefined>(0)
	const [name, setName] = useState<string | undefined>('')
	const [payload, setPayload] = useState<User | undefined>(null)
	const [user, setUser] = useState<User | undefined>({
		login: '',
		name: '',
		email: '',
		phone_number: ''
	})

	useEffect(() => {
		setToken(localStorage.getItem('token'))
		if (token) {
			const arrayToken = token.split('.')
			setPayload(JSON.parse(atob(arrayToken[1])))
		}
	}, [token, version])

	const onChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
		name: string
	) => {
		setUser({
			[name]: e.target.value
		})
	}
	const editUser = async (e: FormEvent) => {
		e.preventDefault()

		if (token) {
			await editRootUser(user, token).then((data) => {
				if (data.status === 200) {
					refresh(token).then((data) => {
						localStorage.setItem('token', data.data.access_token)
						setVersion(version + 1)
					})
					setIsEdit(false)
				}
			})
		}
	}

	const cancelHandler = () => {
		setUser({ ...user, name: '', email: '', phone_number: '' })
		setIsEdit(false)
	}
	return (
		<section className={styles.profileMain}>
			<div className={styles.profileContainer}>
				<Image
					src={'/profile-img.svg'}
					width={100}
					height={100}
					alt={'profile image'}
					priority
					className={styles.profileImg}
				/>
				<p>Логін - {payload?.login}</p>
				<div className={styles.changeContainer}>
					<p>Email - </p>
					{payload?.email ? (
						<div>
							{payload?.email}
							<button
								onClick={() => {
									setIsEdit(true)
									setName('email')
								}}
								className={styles.changeBtn}
							>
								Змінити
							</button>
						</div>
					) : (
						<button
							onClick={() => setIsEdit(true)}
							className={styles.changeBtn}
						>
							Додати інформацію
						</button>
					)}
				</div>
				<div className={styles.changeContainer}>
					<p>Ім&apos;я - </p>
					{payload?.name ? (
						<div>
							{payload?.name}
							<button
								onClick={() => {
									setIsEdit(true)
									setName('name')
								}}
								className={styles.changeBtn}
							>
								Змінити
							</button>
						</div>
					) : (
						<button
							onClick={() => setIsEdit(true)}
							className={styles.changeBtn}
						>
							Додати інформацію
						</button>
					)}
				</div>
				<div className={styles.changeContainer}>
					<p>Номер телефону - </p>
					{payload?.phone_number ? (
						<div>
							<p>{payload?.phone_number}</p>
							<button
								onClick={() => {
									setIsEdit(true)
									setName('phone_number')
								}}
								className={styles.changeBtn}
							>
								Змінити
							</button>
						</div>
					) : (
						<button className={styles.changeBtn}>Додати інформацію</button>
					)}
				</div>
				{isEdit && (
					<EditUserForm
						onChange={(e) => onChangeHandler(e, name)}
						onClick={cancelHandler}
						onSubmit={editUser}
						value={user[name]}
					/>
				)}
			</div>
		</section>
	)
}
