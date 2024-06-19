'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { Suspense, useEffect, useState } from 'react'
import { Product } from './types/Product'
import { getProducts } from '../utils/api/getProducts'
import ProductCard from '../components/productCard/ProductCard'
import { useUserContext } from '../context/userContext'
import Loading from './root/loading'
import PaginationControls from '../components/paginationControls/PaginationControls'
import axios from 'axios'
import {
	useParams,
	usePathname,
	useSearchParams,
	useRouter
} from 'next/navigation'
import Link from 'next/link'

export default function Home() {
	const [products, setProducts] = useState<Product[] | undefined>([])
	const [token, setToken] = useState<string | undefined>('')
	const [loginContext, setLoginContext] = useUserContext()
	const [currentPage, setCurrentPage] = useState()
	const [total, setTotal] = useState(0)
	const [productsPerPage, setProductsPerPage] = useState(0)
	const [links, setLinks] = useState([])
	const [version, setVersion] = useState(0)
	const params = useParams()
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
		getProducts(page).then((data) => {
			setProducts(data.data.products.data)
			setCurrentPage(data.data.products?.current_page)
			setProductsPerPage(data.data.products.per_page)
			setTotal(data.data?.products?.total)
		})
	}, [version])
	const pagesCount = Math.ceil(total / productsPerPage)
	// const paginate = async (page: string) => {
	// 	if (links) {
	// 		links?.filter((link, indx) => {
	// 			if (indx.toString() === page) {
	// 				console.log(link)

	// 				const res = axios.get(link.url).then((data) => {
	// 					if (data.status === 200) {
	// 						setVersion(version + 1)
	// 					}

	// 					setProducts(data.data.products.data)
	// 				})
	// 			}
	// 		})
	// 	}
	// }
	const paginate = async (page: string) => {
		const res = await getProducts(page).then((data) => {
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
			<div className={styles.container}>
				{products?.map((product: Product) => (
					<ProductCard product={product} key={product.id} />
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
		</section>
	)
}
