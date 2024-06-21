'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { GrBasket } from 'react-icons/gr'
import styles from './Header.module.scss'
import { logout } from '../../utils/api/logout'
import { useBasketContext, useUserContext } from '../../context/userContext'

export default function Header() {
	const [token, setToken] = useState<string | undefined>('')
	const router = useRouter()
	const [loginContext, setLoginContext] = useUserContext()
	const [role, setRole] = useState('')
	const ref = useRef<HTMLElement>()
	const path = usePathname()
	const { count, setCount } = useBasketContext()

	useEffect(() => {
		setToken(localStorage.getItem('token'))
		if (token) {
			const arrayToken = token.split('.')
			const payload = JSON.parse(atob(arrayToken[1]))
			setRole(payload.role)
			const expired = payload.exp - Date.now() / 1000
			if (expired <= 0) {
				localStorage.removeItem('token')
				setLoginContext('')
				// router.push('/login')
			}
			setLoginContext(payload.login)
		}
	}, [token, setLoginContext, loginContext])

	const logoutHandler = async () => {
		const res = await logout(token)
		console.log(res.data)

		localStorage.removeItem('token')
		setLoginContext('')
		router.push('/')
		return res
	}
	// if (ref.current) {
	// 	console.log(ref.current.getBoundingClientRect())
	// }

	return (
		<header className={styles.header} ref={ref}>
			<div className={styles.headerContainer}>
				<div>
					<Image src={'/logo.png'} width={50} height={50} alt="logo" />
				</div>
				<nav className={styles.menu}>
					<Link href={'/'} className={path === '/' ? styles.active : ''}>
						Головна
					</Link>
					<Link
						href={'/menu'}
						className={path === '/menu' ? styles.active : ''}
					>
						Меню
					</Link>
					<Link
						href={'/about'}
						className={path === '/about' ? styles.active : ''}
					>
						Про нас
					</Link>
					<Link
						href={'/contacts'}
						className={path === '/contacts' ? styles.active : ''}
					>
						Зв&apos;язатися з нами
					</Link>
				</nav>
				<div className={styles.userTools}>
					{!loginContext ? (
						<div className={styles.login}>
							<Link href={'/login'}>Вхід</Link>
							<Link href={'/register'}>Реєстрація</Link>
						</div>
					) : (
						<div>
							Привіт,{' '}
							<Link
								href={role === 'root' ? '/root' : '/profile'}
								className={styles.userLink}
							>
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
					<div className={styles.basketContainer}>
						<GrBasket className={styles.basketIcon} size={25} />
						<p className={styles.salesCounter}>{count}</p>
					</div>
				</div>
			</div>
		</header>
	)
}
