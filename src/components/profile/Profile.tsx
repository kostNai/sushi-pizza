'use client'

import { User } from '@/src/app/types/User'
import React, { FormEvent, useEffect, useState } from 'react'
import { getCurrentUser } from '@/src/utils/api/getCurrentUser'
import styles from './Profile.module.scss'
import Image from 'next/image'
import EditUserForm from '../editUserForm/EditUserForm'
import { editCurrentUser } from '@/src/utils/api/editCurrentUser'
import { ToastType } from '@/src/app/types/ToastType'
import { refresh } from '@/src/utils/api/refresh'
import Toast from '../UI/Toast.tsx/Toast'

export default function Profile() {
	const [token, setToken] = useState('')
	const [currentUser, setCurrentUser] = useState<User | undefined>()
	const [isEdit, setIsEdit] = useState(false)
	const [name, setName] = useState('')
	const [user, setUser] = useState<User | undefined>({
		name: '',
		login: '',
		email: '',
		user_image: ''
	})
	const [file, setFile] = useState<File | undefined>()
	const form = new FormData()
	const [toastType, setToastType] = useState<ToastType | undefined>()
	const [message, setMessage] = useState('')
	const [isToast, setIsToast] = useState(false)
	const [version, setVersion] = useState(0)

	useEffect(() => {
		setToken(localStorage.getItem('token'))
		if (token) {
			getCurrentUser(token).then((data) => {
				setCurrentUser(data.data.user)
			})
		}
	}, [token, version])

	const resetToastData = () => {
		setTimeout(() => {
			setIsToast(false)
			setToastType(null)
		}, 5000)
	}
	const onChangeHandler = async (
		e: React.ChangeEvent<HTMLInputElement>,
		name: string
	) => {
		console.log(`name - ${name}`)
		setUser({ [name]: e.target.value })
	}
	const editUserHandler = async (e: FormEvent) => {
		e.preventDefault()
		console.log(user)

		form.append('user_img', file)
		const keys = Object.keys(user)
		keys.map((key: string, indx) => {
			form.append(key, Object.values(user)[indx].toString())
		})
		if (token) {
			await editCurrentUser(token, form)
				.then((data) => {
					if (data.status === 200) {
						setToastType('access')
						setIsToast(true)
						setMessage('Дані успішно оновлено')
						setFile(null)
						setUser({
							login: '',
							name: '',
							email: '',
							phone_number: ''
						})
						resetToastData()

						refresh(token).then((data) => {
							localStorage.setItem('token', data.data.access_token)
							setVersion(version + 1)
						})
						setIsEdit(false)
					}
				})
				.catch((err) => {
					setToastType('error')
					setIsToast(true)
					setMessage(err.response.data.message)
					resetToastData()
				})
		}
	}
	const cancelHandler = () => {
		setIsEdit(false)
		setUser({ name: '', login: '', email: '', user_image: '' })
	}
	const onClickHandler = (name: string) => {
		setName(name)
		setIsEdit(true)
	}
	return (
		currentUser && (
			<section className={styles.profileContainer}>
				<div className={styles.profileUserInfo}>
					<div className={styles.profileImg}>
						<Image
							width={300}
							height={200}
							alt="user image"
							src={
								currentUser?.user_image
									? currentUser?.user_image
									: '/profile-img.svg'
							}
						/>
						<label htmlFor="userImg" className={styles.changeImgLabel}>
							Змінити фото
							<input
								type="file"
								name="userImg"
								onChange={(e) => setFile(e.target.files[0])}
							/>
							<button onClick={editUserHandler}>Змінити</button>
						</label>
					</div>
					<div className={styles.profileUserTextInfo}>
						<p>
							Ім&apos;я -
							{currentUser?.name ? (
								<div className={styles.profileFieldContainer}>
									<span className={styles.profileSpan}>
										{currentUser?.name}
									</span>
									<button
										onClick={() => {
											onClickHandler('name')
										}}
									>
										Змінити
									</button>
								</div>
							) : (
								<button
									onClick={() => {
										onClickHandler('name')
									}}
								>
									Додати ім&apos;я
								</button>
							)}
						</p>
						<p>
							Логін -
							{currentUser?.login ? (
								<div className={styles.profileFieldContainer}>
									<span className={styles.profileSpan}>
										{currentUser?.login}
									</span>
									<button onClick={() => onClickHandler('login')}>
										Змінити
									</button>
								</div>
							) : (
								<button onClick={() => onClickHandler('login')}>
									Додати ім&apos;я
								</button>
							)}
						</p>

						<p>
							Номер телефону -
							{currentUser?.phone_number ? (
								<div className={styles.profileFieldContainer}>
									<span className={styles.profileSpan}>
										{currentUser?.phone_number}
									</span>
									<button onClick={() => onClickHandler('phone_number')}>
										Змінити
									</button>
								</div>
							) : (
								<button onClick={() => onClickHandler('phone_number')}>
									Додати номер телефону
								</button>
							)}
						</p>
					</div>
				</div>
				<div></div>
				{isEdit && (
					<EditUserForm
						onChange={(e) => onChangeHandler(e, name)}
						onClick={cancelHandler}
						onSubmit={editUserHandler}
						value={user[name]}
					/>
				)}
				<Toast isToast={isToast} toastType={toastType} message={message} />
			</section>
		)
	)
}
