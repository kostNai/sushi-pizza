'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { GrBasket } from 'react-icons/gr'
import { IoSearch } from 'react-icons/io5'
import styles from './Header.module.scss'
import { logout } from '@/utils/api/logout'
import {
	useBasketContext,
	useLoginContext,
	useSearchContext
} from '@/context/userContext'

export default function Header() {
	const [token, setToken] = useState<string | undefined>('')
	const router = useRouter()
	const [loginContext, setLoginContext] = useLoginContext()
	const [role, setRole] = useState('')
	const ref = useRef<HTMLElement>()
	const path = usePathname()
	const [count, setCount] = useBasketContext()
	const [searchProductContext, setSearchProductContext] = useSearchContext()
	const [version, setVersion] = useState(0)

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
			}
			setLoginContext(payload.login)
		} else {
			setLoginContext('')
		}
	}, [loginContext, count, token])

	const logoutHandler = async () => {
		const res = await logout(token)
			.then((data) => {
				if (data.status === 200) {
					localStorage.removeItem('token')
					setLoginContext('')
					router.push('/')
				}
			})
			.catch((err) => {
				console.log(err)
			})
		return res
	}

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
				<IoSearch
					size={24}
					className={styles.searchIcon}
					onClick={() => setSearchProductContext(!searchProductContext)}
				/>
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
						<GrBasket
							className={styles.basketIcon}
							size={25}
							onClick={() => router.push('/cart')}
						/>
						{count > 0 ? <p className={styles.salesCounter}>{count}</p> : false}
					</div>
				</div>
			</div>
		</header>
	)
}
