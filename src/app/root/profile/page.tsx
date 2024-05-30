'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { editRootUser } from '../../../utils/api/editRootUser'
import { User } from '../../types/User'
import EditUserForm from '../../../components/editUserForm/EditUserForm'

export default function RootProfile() {
	const { data: session, status, update } = useSession()
	const [userData, setUserData] = useState(null)
	const [isEdit, setIsEdit] = useState<boolean | undefined>(false)
	const [version, setVersion] = useState<number | undefined>(0)
	const [name, setName] = useState<string | undefined>('')
	const [user, setUser] = useState<User | undefined>({
		name: '',
		email: '',
		phone_number: ''
	})

	useEffect(() => {
		if (status === 'authenticated') setUserData(session.user)
		console.log(session)
	}, [session, status, version])

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

		const token: string = userData?.token

		await editRootUser(user, token).then((data) => {
			if (data.status === 200) {
				update({ user: user })
				setVersion(version + 1)
				setIsEdit(false)
			}
		})
	}

	const cancelHandler = () => {
		setName('')
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
				<p>Логін - {userData?.login}</p>
				<div className={styles.changeContainer}>
					<p>Email - </p>
					{userData?.email ? (
						<div>
							{userData?.email}
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
						<button onClick={() => setIsEdit(true)}>Додати інформацію</button>
					)}
				</div>
				<div className={styles.changeContainer}>
					<p>Ім&apos;я - </p>
					{userData?.name ? (
						<div>
							{userData?.name}
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
						<button onClick={() => setIsEdit(true)}>Додати інформацію</button>
					)}
				</div>
				<div className={styles.changeContainer}>
					<p>Номер телефону - </p>
					{userData?.phone_number ? (
						<div>
							<p>{userData?.phone_number}</p>
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
						<button>Додати інформацію</button>
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
