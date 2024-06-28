'use client'

import styles from './page.module.css'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { IoSearch } from 'react-icons/io5'
import { RxCross1 } from 'react-icons/rx'
import { Product } from './types/Product'
import { getPaginateProducts } from '../utils/api/getPaginateProducts'
import ProductCard from '../components/productCard/ProductCard'
import { useLoginContext, useSearchContext } from '../context/userContext'
import Loading from './admin/loading'

export default function Home() {
	const [products, setProducts] = useState<Product[] | undefined>([])
	const [token, setToken] = useState<string | undefined>('')
	const [currentPage, setCurrentPage] = useState()
	const [total, setTotal] = useState(0)
	const [productsPerPage, setProductsPerPage] = useState(0)
	const [foundedProducts, setFoundedProducts] = useState<Product[] | undefined>(
		[]
	)
	const ref = useRef<HTMLInputElement>()
	const [searchKey, setSearchKey] = useState('')
	const [loginContext, setLoginContext] = useLoginContext()
	const [searchProductContext, setSearchProductContext] = useSearchContext()

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

	const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchKey(e.target.value)
		const test = products.filter((product: Product) => {
			if (ref.current) {
				if (
					product.product_name
						.toLowerCase()
						.includes(ref.current.value.toLowerCase())
				) {
					return product
				}
			}
			return
		})

		setFoundedProducts([...test])
	}

	return !searchProductContext ? (
		<section>
			<div className={styles.banner}>
				<Image
					src={'/banner.jpg'}
					width={1500}
					height={600}
					alt="banner"
					className={styles.bannerImg}
				/>
			</div>
			<div>
				<div className={styles.container}>
					<Suspense fallback={<Loading />}>
						{products?.map((product: Product) => (
							<ProductCard
								product={product}
								key={product.id}
								onClick={() =>
									router.push(`/menu/${product.category.slug}/${product.id}`)
								}
							/>
						))}
					</Suspense>
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
	) : (
		<section className={styles.foundedProductsContainer}>
			<div className={styles.searchProducts}>
				<label className={styles.seachProductsInputContainer}>
					<span className={styles.seachProductsInputSpan}>
						<span className={styles.searchProductsIcon}>
							<IoSearch size={24} />
						</span>
						<input
							type="text"
							value={searchKey}
							onChange={(e) => {
								onChangeHandler(e)
							}}
							ref={ref}
							className={styles.seachProductsInput}
							placeholder="Пошук"
						/>
					</span>
					<button
						onClick={() => setSearchProductContext(false)}
						className={styles.searchProductBtn}
					>
						<RxCross1 size={24} />
					</button>
				</label>
			</div>
			<div className={styles.foundedProducts}>
				{foundedProducts &&
					foundedProducts.map((product, indx) => (
						<ProductCard
							product={product}
							onClick={() => {}}
							key={product.id}
						/>
					))}
			</div>
		</section>
	)
}
