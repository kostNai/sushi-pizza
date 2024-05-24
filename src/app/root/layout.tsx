'use client'

import Link from 'next/link'
import styles from './styles.module.scss'
import { redirect, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { JwtPayload, jwtDecode } from 'jwt-decode'

export default function RootUserLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const path = usePathname()

	const [data, setData] = useState(null)
	const [token, setToken] = useState<string | undefined>('')

	const session = useSession()

	useEffect(() => {
		if (session.status === 'authenticated') {
			setData(session?.data?.user)
			setToken(data?.token)
		}
	}, [data, session, token])
	if (!token) {
		return null
	}
	const decoded = jwtDecode<JwtPayload>(token!)
	const role = decoded.role

	return role === 'root' ? (
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
	) : (
		redirect('/')
	)
}
