'use client'

import Link from 'next/link'
import styles from './style.module.scss'
import { FormEvent, useState } from 'react'
import { login } from '../../../../utils/fetchLogin'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Login() {
	const [userLogin, setUserLogin] = useState<string | undefined>('')
	const [password, setPassword] = useState<string | undefined>('')
	const session = useSession()

	const onLoginHandler = async (e: FormEvent) => {
		e.preventDefault()

		const res = await signIn('credentials', {
			login: userLogin,
			password: password,
			redirect: false
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
			<button onClick={() => console.log(session)}>Click</button>
			<Link href={'/register'}>Немає профілю?</Link>
		</section>
	)
}
