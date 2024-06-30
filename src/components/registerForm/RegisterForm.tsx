'use client'

import Link from 'next/link'
import { PiWarningCircle } from 'react-icons/pi'
import styles from './RegisterForm.module.scss'
import { FormEvent, useState } from 'react'
import { User } from '@/src/app/types/User'
import { register } from '@/src/utils/api/register'

export default function RegisterForm() {
	const [user, setUser] = useState<User | undefined>({
		login: '',
		email: '',
		password: ''
	})
	const [rePass, setRePass] = useState('')
	const [errors, setErrors] = useState<string | undefined>()

	const regiseterHandler = (e: FormEvent) => {
		e.preventDefault()
		setErrors('')

		const res = register({ ...user })
			.then((data) => {
				if (data.status === 200) {
					setUser({ login: '', password: '', email: '' })
					setRePass('')
				}
			})
			.catch((err) => {
				setErrors(err.response.data.message)
			})
	}
	return (
		<section className={styles.registerContainer}>
			<h2>Реєстрація</h2>
			<div>
				<form
					action="register"
					className={styles.registerForm}
					onSubmit={regiseterHandler}
				>
					<label htmlFor="login">Логін</label>
					<input
						type="text"
						name="login"
						placeholder="Введіть логін"
						value={user.login}
						onChange={(e) => setUser({ ...user, login: e.target.value })}
					/>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						placeholder="Введіть email"
						value={user.email}
						onChange={(e) => setUser({ ...user, email: e.target.value })}
					/>
					<label htmlFor="password">Пароль</label>
					<input
						type="password"
						name="password"
						value={user.password}
						placeholder="Пароль(мінімум 4 символи)"
						onChange={(e) => setUser({ ...user, password: e.target.value })}
					/>
					<label htmlFor="rePassword">Повторіть пароль</label>
					<input
						type="password"
						name="rePassword"
						placeholder="Повторіть пароль"
						value={rePass}
						onChange={(e) => setRePass(e.target.value)}
					/>
					{errors && (
						<div className={styles.errorsContainer}>
							<PiWarningCircle size={24} className={styles.errorsIcon} />
							<p className={styles.errors}>{errors}</p>
						</div>
					)}
					<button className={styles.registerBtn} type="submit">
						Реєстрація
					</button>
				</form>
			</div>
			<p>Вже маєте профіль?</p>
			<Link href={'/login'} className={styles.loginLink}>
				{' '}
				Увійти
			</Link>
		</section>
	)
}
