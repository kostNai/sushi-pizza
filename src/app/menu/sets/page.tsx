'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import ProductCard from '../../../components/productCard/ProductCard'
import styles from './styles.module.scss'
import { Product } from '../../types/Product'
import { getProductsByCategory } from '../../../utils/api/getProductssByCategory'
import { usePathname } from 'next/navigation'

export default function Sets() {
	const [products, setProducts] = useState<Product[] | undefined>([])

	useEffect(() => {
		const res = getProductsByCategory('сети').then((data) => {
			setProducts(data.data.products)
		})
	})
	return (
		<section>
			<div className={styles.productContainer}>
				{products.map((product) => (
					<ProductCard product={product} onClick={() => {}} key={product.id} />
				))}
			</div>
		</section>
	)
}
