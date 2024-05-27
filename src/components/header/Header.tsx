'use client'

import Image from 'next/image'
import Link from 'next/link'

import styles from './Header.module.scss'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
	const [user, setUser] = useState(undefined)
	const session = useSession()
	useEffect(() => {
		setUser(session.data)
	}, [session, user])
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
				{!user?.user ? (
					<div className={styles.login}>
						<Link href={'api/auth/signin'}>Вхід</Link>
						<Link href={'register'}>Реєстрація</Link>
					</div>
				) : (
					<div>
						Привіт,{' '}
						<Link href={'/profile'} className={styles.userLink}>
							{user?.user.login}
						</Link>
						<div>
							<Link
								href={'/'}
								className={styles.signOutLink}
								onClick={() => signOut()}
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
