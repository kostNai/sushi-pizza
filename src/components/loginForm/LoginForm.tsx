'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PiWarningCircle } from 'react-icons/pi'
import styles from './LoginForm.module.scss'
import { errorsContext, useLoginContext } from '@/context/userContext'
import { login } from '@/utils/api/fetchLogin'

export default function LoginForm() {
	const [userLogin, setUserLogin] = useState<string | undefined>('')
	const [password, setPassword] = useState<string | undefined>('')
	const [error, setError] = errorsContext()
	const [loginContext, setLoginContext] = useLoginContext()

	const router = useRouter()

	const onLoginHandler = (e: FormEvent) => {
		e.preventDefault()

		const res = login(userLogin, password)
			.then((res) => {
				const status = res.data.status
				if (status) {
					const token: string = res.data.access_token
					localStorage.setItem('token', token)
					setUserLogin('')
					setPassword('')
					const arrayToken = token.split('.')
					const tokenPayload = JSON.parse(atob(arrayToken[1]))
					setLoginContext(tokenPayload.login)
					router.push('/')
				}
			})
			.catch((err) => {
				setError(err.response.data.message)
			})
	}

	return (
		<section className={styles.loginContainer}>
			<h2>Вхід</h2>
			<div>
				<form
					action="login"
					className={styles.loginForm}
					onSubmit={onLoginHandler}
				>
					<label htmlFor="login">Логін</label>
					<input
						type="text"
						value={userLogin}
						onChange={(e) => setUserLogin(e.target.value)}
					/>
					<label htmlFor="password">Пароль</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && (
						<div className={styles.errorsContainer}>
							<PiWarningCircle size={24} className={styles.errorsIcon} />
							<p className={styles.errors}>{error}</p>
						</div>
					)}
					<button className={styles.loginBtn} type="submit">
						Вхід
					</button>
				</form>
			</div>

			<Link href={'/register'}>Немає профілю?</Link>
		</section>
	)
}
