'use client'

import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { Product } from './types/Product'
import { getPaginateProducts } from '../utils/api/getPaginateProducts'
import ProductCard from '../components/productCard/ProductCard'
import { useUserContext } from '../context/userContext'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
	const [products, setProducts] = useState<Product[] | undefined>([])
	const [token, setToken] = useState<string | undefined>('')
	const [loginContext, setLoginContext] = useUserContext()
	const [currentPage, setCurrentPage] = useState()
	const [total, setTotal] = useState(0)
	const [productsPerPage, setProductsPerPage] = useState(0)
	const searchParams = useSearchParams()
	const router = useRouter()

	const page = searchParams.get('page')
	useEffect(() => {
		setToken(localStorage.getItem('token'))
		if (token) {
			const arrayToken = token.split('.')
			const payload = JSON.parse(atob(arrayToken[1]))
			const expired = payload.exp - Date.now() / 1000
			if (expired <= 0) {
				localStorage.removeItem('token')
				setLoginContext('')
			}
			setLoginContext(payload.login)
		}
	}, [token, setLoginContext, loginContext])

	useEffect(() => {
		getPaginateProducts(page).then((data) => {
			setProducts(data.data.products.data)
			setCurrentPage(data.data.products?.current_page)
			setProductsPerPage(data.data.products.per_page)
			setTotal(data.data?.products?.total)
		})
	}, [])
	const pagesCount = Math.ceil(total / productsPerPage)
	const paginate = async (page: string) => {
		const res = await getPaginateProducts(page).then((data) => {
			setCurrentPage(data.data.products.current_page)
			setProducts(data.data.products.data)
		})
	}
	let pages: string[] = []
	for (let i = 0; i < pagesCount; i++) {
		pages.push((i + 1).toString())
	}

	return (
		<section>
			<div>
				<div className={styles.container}>
					{products?.map((product: Product) => (
						<ProductCard
							product={product}
							key={product.id}
							onClick={() => router.push(`/${product.id}`)}
						/>
					))}
				</div>
				<div className={styles.pageNmbersContainer}>
					{pages.length > 1 &&
						pages.map((page, indx) => (
							<Link
								href={`/?page=${page}`}
								key={indx}
								className={
									page == currentPage
										? `${styles.pageNumber} ${styles.active}`
										: styles.pageNumber
								}
								onClick={() => paginate(page)}
							>
								{page}
							</Link>
						))}
				</div>
			</div>
		</section>
	)
}
