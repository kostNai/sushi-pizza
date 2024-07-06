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
		(role === 'root' || role === 'admin') && (
			<section className={styles.rootLayout}>
				<nav className={styles.rootMenu}>
					<ul className={styles.rootList}>
						<li>
							<Link
								href={`/admin/profile`}
								className={path === '/admin/profile' ? `${styles.active}` : ''}
							>
								Профіль
							</Link>
						</li>
						<li>
							<Link
								href={`/admin/users`}
								className={path === '/admin/users' ? `${styles.active}` : ''}
							>
								Користувачі
							</Link>
						</li>
						<li>
							<Link
								href={`/admin/products`}
								className={path === '/admin/products' ? `${styles.active}` : ''}
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
