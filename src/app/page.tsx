'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { Suspense, useEffect, useState } from 'react'
import { Product } from './types/Product'
import { getProducts } from '../utils/api/getProducts'
import ProductCard from '../components/productCard/ProductCard'
import { useUserContext } from '../context/userContext'
import Loading from './root/loading'

export default function Home() {
	const [products, setProducts] = useState<Product[] | undefined>([])
	const [token, setToken] = useState<string | undefined>('')
	const [loginContext, setLoginContext] = useUserContext()

	useEffect(() => {
		setToken(localStorage.getItem('token'))
		if (token) {
			const arrayToken = token.split('.')
			const payload = JSON.parse(atob(arrayToken[1]))
			const expired = payload.exp - Date.now() / 1000
			if (expired <= 0) {
				localStorage.removeItem('token')
				setLoginContext('')
				// router.push('/login')
			}
			setLoginContext(payload.login)
		}
	}, [token, setLoginContext, loginContext])

	useEffect(() => {
		getProducts().then((data) => {
			setProducts(data.data.products)
		})
	})
	return (
		<section>
			<div className={styles.container}>
				<Suspense fallback={<Loading />}>
					{products.map((product: Product) => (
						<ProductCard product={product} key={product.id} />
					))}
				</Suspense>
			</div>
		</section>
	)
}
