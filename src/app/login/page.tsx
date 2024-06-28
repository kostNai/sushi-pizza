import { Suspense } from 'react'
import LoginForm from '@/components/loginForm/LoginForm'
import Loading from '@/src/app/admin/loading'

export default function Login() {
	return (
		<Suspense fallback={<Loading />}>
			<LoginForm />
		</Suspense>
	)
}
