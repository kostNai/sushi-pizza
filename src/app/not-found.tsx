import Link from 'next/link'

export default function NotFound() {
	return (
		<div>
			<p>Not Found</p>
			<Link href={'/'}>Повернутися на головну</Link>
		</div>
	)
}
