import { Suspense } from 'react'
import LoginForm from '@/components/loginForm/LoginForm'
import Loading from '@/app/root/loading'

export default function Login() {
	return (
		<Suspense fallback={<Loading />}>
			<LoginForm />
		</Suspense>
	)
}
