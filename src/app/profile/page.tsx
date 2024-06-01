'use client'
import { useUserContext } from '../../context/userContext'

export default function Profile() {
	const [loginContext, setLoginContext] = useUserContext()

	return <section>{loginContext && <div>{loginContext}</div>}</section>
}
