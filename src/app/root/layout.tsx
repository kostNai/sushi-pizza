'use client'

import Link from 'next/link'
import styles from './styles.module.scss'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RootUserLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const path = usePathname()

	const [role, setRole] = useState<string | undefined>('')

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const arrayToken = token.split('.')
			const tokenPayload = JSON.parse(atob(arrayToken[1]))
			setRole(tokenPayload.role)
		}
	}, [])

	return (
		role === 'root' && (
			<section className={styles.rootLayout}>
				<nav className={styles.rootMenu}>
					<ul className={styles.rootList}>
						<li>
							<Link
								href={`/root/profile`}
								className={path === '/root/profile' ? `${styles.active}` : ''}
							>
								Профіль
							</Link>
						</li>
						<li>
							<Link
								href={`/root/users`}
								className={path === '/root/users' ? `${styles.active}` : ''}
							>
								Користувачі
							</Link>
						</li>
						<li>
							<Link
								href={`/root/products`}
								className={path === '/root/products' ? `${styles.active}` : ''}
							>
								Продукти
							</Link>
						</li>
					</ul>
				</nav>
				<section>{children}</section>
			</section>
		)
	)
}
