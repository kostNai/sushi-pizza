'use client'

import { useLoginContext } from '../../context/userContext'

export default function RootPage() {
	const [loginContext, setLoginContext] = useLoginContext()

	return (
		<section>
			<div>Привіт, {loginContext}</div>
		</section>
	)
}
