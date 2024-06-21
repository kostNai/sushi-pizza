'use client'

import React, { useEffect, useState } from 'react'
import { Product } from '../../types/Product'
import { Category } from '../../types/Category'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getCategories } from '../../../utils/api/getCategories'
import { getProductsByCategory } from '../../../utils/api/getProductssByCategory'
import styles from './styles.module.scss'
import ProductCard from '../../../components/productCard/ProductCard'
import Link from 'next/link'

export default function Page({ params }: { params: { slug: string } }) {
	const [products, setProducts] = useState<Product[] | undefined>([])
	const [categories, setGategories] = useState<Category[] | undefined>([])
	const [currentPage, setCurrentPage] = useState()
	const [total, setTotal] = useState(0)
	const [productsPerPage, setProductsPerPage] = useState(0)

	const searchParams = useSearchParams()
	const path = usePathname()
	const router = useRouter()
	const slug = searchParams.get('slug')
	const page = searchParams.get('page')

	const pagesCount = Math.ceil(total / productsPerPage)
	let pages: string[] = []
	for (let i = 0; i < pagesCount; i++) {
		pages.push((i + 1).toString())
	}

	useEffect(() => {
		const res = getCategories().then((data) => {
			setGategories(data.data.categories)
		})
	}, [])
	const filteredOptions = categories.map((e) => e.category_name)
	const filteredCategories = categories.filter(
		(e, i) => filteredOptions.indexOf(e.category_name) === i
	)
	const category = filteredCategories.find(
		(category) => category.slug === params.slug
	)
	useEffect(() => {
		if (category) {
			const res = getProductsByCategory(category?.category_name, page).then(
				(data) => {
					console.log(data)

					setProducts(data.data.products.data)
					setCurrentPage(data.data.products?.current_page)
					setProductsPerPage(data.data.products.per_page)
					setTotal(data.data?.products?.total)
				}
			)
		}
	}, [category, params])
	return (
		<section>
			<div className={styles.productContainer}>
				{products.map((product) => (
					<ProductCard
						product={product}
						onClick={() => {
							router.push(`${path}/${product.id}`)
						}}
						key={product.id}
					/>
				))}
			</div>
			<div className={styles.pageNmbersContainer}>
				{pages.length > 1 &&
					pages.map((page, indx) => (
						<Link
							href={`${path}/?page=${page}`}
							key={indx}
							className={
								page == currentPage
									? `${styles.pageNumber} ${styles.active}`
									: styles.pageNumber
							}
							onClick={() =>
								getProductsByCategory(category?.category_name, page)
							}
						>
							{page}
						</Link>
					))}
			</div>
		</section>
	)
}
