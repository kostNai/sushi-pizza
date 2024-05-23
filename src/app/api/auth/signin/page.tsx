'use client'

import Link from 'next/link'
import styles from './style.module.scss'
import { FormEvent, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'

export default function Login() {
	const [userLogin, setUserLogin] = useState<string | undefined>('')
	const [password, setPassword] = useState<string | undefined>('')
	const [version, setVersion] = useState<number | undefined>(0)
	const session = useSession()

	// useEffect(() => {
	// 	console.log(session)
	// }, [session])
	const onLoginHandler = async (e: FormEvent) => {
		e.preventDefault()
		const res = await signIn('credentials', {
			login: userLogin,
			password: password,
			redirect: false
		})
		console.log(res)

		if (res.status === 200) {
			setUserLogin('')
			setPassword('')
		}
		setVersion(version + 1)
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
