import RegisterForm from '@/src/components/registerForm/RegisterForm'
import { Suspense } from 'react'
import Loading from '@/app/loading'

export default async function Register() {
	// const registerHandler = ()=>{
	// 	const res = await
	// }
	return (
		<Suspense fallback={<Loading />}>
			<RegisterForm />
		</Suspense>
	)
}
