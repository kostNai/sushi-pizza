'use client'
import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { User } from '@/types/User'
import EditUserForm from '@/components/editUserForm/EditUserForm'
import { refresh } from '@/utils/api/refresh'
import { editUser } from '@/utils/api/editUser'
import Toast from '@/components/UI/Toast.tsx/Toast'
import { ToastType } from '@/types/ToastType'

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
	const [file, setFile] = useState<File | undefined>(null)
	const [message, setMessage] = useState('')
	const [toastType, setToastType] = useState<ToastType | undefined>(null)
	const [isToast, setIsToast] = useState(false)
	useEffect(() => {
		setToken(localStorage.getItem('token'))
		if (token) {
			const arrayToken = token.split('.')
			setPayload(JSON.parse(atob(arrayToken[1])))
		}
	}, [token, version])
	const form = new FormData()
	const resetToastData = () => {
		setTimeout(() => {
			setIsToast(false)
			setToastType(null)
		}, 5000)
	}
	const onChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
		name: string
	) => {
		setUser({
			[name]: e.target.value
		})
	}
	const editUserHandler = async (e: FormEvent) => {
		e.preventDefault()
		form.append('user_img', file)
		const keys = Object.keys(user)
		keys.map((key: string, indx) => {
			form.append(key, Object.values(user)[indx].toString())
		})
		if (token) {
			await editUser(token, form, payload?.id)
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
		setUser({ ...user, name: '', email: '', phone_number: '' })
		setIsEdit(false)
	}
	return (
		<section className={styles.profileMain}>
			<Toast message={message} isToast={isToast} toastType={toastType} />
			<div className={styles.profileContainer}>
				<div className={styles.changeImgContainer}>
					<Image
						src={payload?.user_image ? payload.user_image : '/profile-img.svg'}
						width={100}
						height={100}
						alt={'profile image'}
						priority
						className={styles.profileImg}
					/>
					<input
						className={styles.userImageInput}
						type="file"
						name="user_img"
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<button className={styles.changeBtn} onClick={editUserHandler}>
						Змінити
					</button>
				</div>
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
						onSubmit={editUserHandler}
						value={user[name]}
					/>
				)}
			</div>
		</section>
	)
}
