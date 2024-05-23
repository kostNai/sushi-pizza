'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

export default function RootPage() {
	const [data, setData] = useState(null)
	const [token, setToken] = useState<string | undefined>()

	const session = useSession()

	useEffect(() => {
		if (session.status === 'authenticated') {
			setData(session?.data?.user)
			setToken(data?.token)
			if (token) {
				const decoded = jwtDecode(token!)
				console.log(decoded)
			}
		}
	}, [data, session, token])

	return (
		<section>
			<div>
				Hello,{data?.user?.login}, Token - {token}
			</div>
		</section>
	)
}
