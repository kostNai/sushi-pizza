'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import styles from './Header.module.scss'
import { logout } from '../../utils/api/logout'
import { useUserContext } from '../../context/userContext'

export default function Header() {
	const [token, setToken] = useState<string | undefined>('')
	const [loginContext, setLoginContext] = useUserContext()
	const router = useRouter()

	useEffect(() => {
		setToken(localStorage.getItem('token'))
		if (token) {
			const arrayToken = token.split('.')
			const payload = JSON.parse(atob(arrayToken[1]))
			const expired = payload.exp - Date.now() / 1000
			if (expired <= 0) {
				localStorage.removeItem('token')
				setLoginContext('')
				router.push('/login')
			}
			setLoginContext(payload.login)
		}
	}, [token, setLoginContext, router, loginContext])

	const logoutHandler = async () => {
		const res = await logout(token)
		console.log(res.data)

		localStorage.removeItem('token')
		setLoginContext('')
		router.push('/')
		return res
	}
	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<div>
					<Image src={'/logo.png'} width={50} height={50} alt="logo" />
				</div>
				<nav className={styles.menu}>
					<Link href={'/'}>Головна</Link>
					<Link href={'/menu'}>Меню</Link>
					<Link href={'/about'}>Про нас</Link>
					<Link href={'/contacts'}>Зв&apos;язатися з нами</Link>
				</nav>
				{!loginContext ? (
					<div className={styles.login}>
						<Link href={'/login'}>Вхід</Link>
						<Link href={'/register'}>Реєстрація</Link>
					</div>
				) : (
					<div>
						Привіт,{' '}
						<Link href={'/profile'} className={styles.userLink}>
							{loginContext}
						</Link>
						<div>
							<Link
								href={'/'}
								className={styles.signOutLink}
								onClick={logoutHandler}
							>
								Вихід
							</Link>
						</div>
					</div>
				)}
			</div>
		</header>
	)
}
