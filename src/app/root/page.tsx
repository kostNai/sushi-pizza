'use client'

import { useUserContext } from '../../context/userContext'

export default function RootPage() {
	const [loginContext, setLoginContext] = useUserContext()

	return (
		<section>
			<div>Привіт, {loginContext}</div>
		</section>
	)
}
