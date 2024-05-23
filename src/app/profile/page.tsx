'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Profile() {
	const session = useSession()
	const [user, setUser] = useState(null)

	useEffect(() => {
		if (session.status === 'authenticated') {
			setUser(session.data?.user)
		}
	}, [session, user])

	return <section>{user?.user && <div>{user.user.login}</div>}</section>
}
