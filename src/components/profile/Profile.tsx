'use client'

import { User } from '@/src/app/types/User'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { getCurrentUser } from '@/src/utils/api/getCurrentUser'
import styles from './Profile.module.scss'
import Image from 'next/image'
import EditUserForm from '@/components/editUserForm/EditUserForm'
import { editCurrentUser } from '@/src/utils/api/editCurrentUser'
import { ToastType } from '@/src/app/types/ToastType'
import { refresh } from '@/src/utils/api/refresh'
import Address from '@/components/address/Address'
import Toast from '../UI/Toast.tsx/Toast'
import { AddressType } from '@/src/app/types/Address'

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
	const [address, setAddress] = useState<AddressType | undefined>()
	const hiddenFileInput = useRef(null)

	useEffect(() => {
		setToken(localStorage.getItem('token'))
		if (token) {
			getCurrentUser(token).then((data) => {
				console.log(data.data.user[0])

				setCurrentUser(data.data.user[0])
				setAddress(data.data.user[0].address)
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
	const handleClick = (event) => {
		console.log(hiddenFileInput.current)

		hiddenFileInput.current.click()
	}
	return (
		currentUser && (
			<section className={styles.profileContainer}>
				<div className={styles.profileUserInfo}>
					<div className={styles.profileImgContainer}>
						<Image
							width={300}
							height={200}
							alt="user image"
							src={
								currentUser?.user_image
									? currentUser?.user_image
									: '/profile-img.svg'
							}
							className={styles.profileImg}
						/>
						<div className={styles.fileUpload}>
							<label htmlFor="userImg" className={styles.changeImgLabel}>
								<input
									type="file"
									name="userImg"
									onChange={(e) => setFile(e.target.files[0])}
									className={styles.profileImgInput}
									ref={hiddenFileInput}
								/>
								<span onClick={handleClick} className={styles.fileSpan}>
									Обрати фото
								</span>
							</label>
						</div>
						<button onClick={editUserHandler} className={styles.btn}>
							Змінити
						</button>
					</div>
					<div className={styles.profileUserTextInfo}>
						<div>
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
										className={styles.btn}
									>
										Змінити
									</button>
								</div>
							) : (
								<button
									onClick={() => {
										onClickHandler('name')
									}}
									className={styles.btn}
								>
									Додати ім&apos;я
								</button>
							)}
						</div>
						<div>
							Логін -
							{currentUser?.login ? (
								<div className={styles.profileFieldContainer}>
									<span className={styles.profileSpan}>
										{currentUser?.login}
									</span>
									<button
										onClick={() => onClickHandler('login')}
										className={styles.btn}
									>
										Змінити
									</button>
								</div>
							) : (
								<button
									onClick={() => onClickHandler('login')}
									className={styles.btn}
								>
									Додати ім&apos;я
								</button>
							)}
						</div>

						<div>
							Номер телефону -
							{currentUser?.phone_number ? (
								<div className={styles.profileFieldContainer}>
									<span className={styles.profileSpan}>
										{currentUser?.phone_number}
									</span>
									<button
										onClick={() => onClickHandler('phone_number')}
										className={styles.btn}
									>
										Змінити
									</button>
								</div>
							) : (
								<button
									onClick={() => onClickHandler('phone_number')}
									className={styles.btn}
								>
									Додати номер телефону
								</button>
							)}
						</div>
					</div>
				</div>
				<div className={styles.addressContainer}>
					{address && <Address address={address} />}
				</div>
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
