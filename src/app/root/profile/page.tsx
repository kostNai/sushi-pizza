'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

export default function RootProfile() {
	const session = useSession()
	const [userData, setUserData] = useState(null)
	useEffect(() => {
		if (session.status === 'authenticated') setUserData(session?.data?.user)
	}, [session])

	return (
		<section className={styles.profileMain}>
			<div>
				<Image
					src={'/profile-img.svg'}
					width={100}
					height={100}
					alt={'profile image'}
					priority
					className={styles.profileImg}
				/>
				<p>Логін - {userData?.user?.login}</p>
				<p>Email - {userData?.user?.email}</p>
			</div>
		</section>
	)
}
