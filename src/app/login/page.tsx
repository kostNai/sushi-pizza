'use client'

import Link from 'next/link'
import styles from './styles.module.scss'
import { FormEvent, useState } from 'react'
import { login } from '../../utils/api/fetchLogin'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../../context/userContext'

export default function Login() {
	const [userLogin, setUserLogin] = useState<string | undefined>('')
	const [password, setPassword] = useState<string | undefined>('')

	const [loginContext, setLoginContext] = useUserContext()

	const router = useRouter()

	const onLoginHandler = (e: FormEvent) => {
		e.preventDefault()

		const res = login(userLogin, password).then((res) => {
			const status = res.data.status

			if (status) {
				const token: string = res.data.access_token
				localStorage.setItem('token', token)
				setUserLogin('')
				setPassword('')
				const arrayToken = token.split('.')
				const tokenPayload = JSON.parse(atob(arrayToken[1]))
				setLoginContext(tokenPayload.login)
				const role = tokenPayload.role

				if (role) {
					switch (role) {
						case 'root':
							router.push('/root')
							break
						case 'admin':
							router.push('/admin')
							break

						case 'user':
							router.push('/profile')
							break

						default:
							break
					}
				}
			} else console.log(res.data.message)
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
					<button className={styles.loginBtn} type="submit">
						Вхід
					</button>
				</form>
			</div>

			<Link href={'/register'}>Немає профілю?</Link>
		</section>
	)
}
